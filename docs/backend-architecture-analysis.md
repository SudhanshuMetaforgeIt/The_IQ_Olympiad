# The IQ Olympiad — Backend Architecture Analysis

**Scope:** `apps/api` (NestJS + MongoDB/Mongoose) and frontend API expectations in `apps/web`  
**Date:** 2026-09-03  
**Status:** Analysis only — no schemas, controllers, services, or packages were modified

---

## Executive snapshot (confirmed)

| Item | Finding |
|------|---------|
| Framework | NestJS 12, Mongoose 9, ConfigModule, Argon2 (`PasswordService`) |
| Business APIs | None — only `GET /` hello from `AppController` |
| Feature modules | 14 domain modules register schemas and export `MongooseModule` only |
| DTOs / Guards / JWT / OTP | Not present |
| Dependencies not installed | `class-validator`, `@nestjs/jwt`, passport, swagger, throttler, etc. |
| Config | `MONGODB_URI`, `PORT` via `.env.example` |

## Implementation progress

| Phase | Status | Notes |
|-------|--------|-------|
| Phase 1: Backend Foundation | Done | ValidationPipe, CORS, global prefix `api`, exception filter, response interceptor, pagination DTO helpers |
| Phase 2: Authentication | Done | JWT auth, password login, OTP login (in-memory), student/school register, change password, `/auth/me` |
| Phase 3+: Domain APIs | Pending | Schools lookup-by-code + student `/me` started; remaining CRUD later |

### Auth endpoints (live)

| Method | Path | Auth |
|--------|------|------|
| POST | `/api/auth/register/student` | Public |
| POST | `/api/auth/register/school` | Public |
| POST | `/api/auth/login` | Public (email/password) |
| POST | `/api/auth/otp/send` | Public |
| POST | `/api/auth/otp/verify` | Public |
| GET | `/api/auth/me` | Bearer JWT |
| POST | `/api/auth/password/change` | Bearer JWT |
| GET | `/api/schools/code/:code` | Public |
| GET | `/api/students/me` | Student JWT |
| GET | `/api/health` | Public |

Required env: `MONGODB_URI`, `JWT_SECRET` (see `apps/api/.env.example`).


## 1. Existing Models

There are **17 Mongoose schemas** across **14 domain collections + 3 immutable version/history collections**.

| # | Model | Collection | Module | Purpose (confirmed) |
|---|-------|------------|--------|---------------------|
| 1 | `User` | `users` | `UsersModule` | Single identity for auth/RBAC: email, password hash, roles, optional phone, verification flags |
| 2 | `School` | `schools` | `SchoolsModule` | Educational institution profile, code, address, types, managed classes, status |
| 3 | `SchoolMembership` | `school_memberships` | `SchoolMembershipsModule` | School-scoped auth link: user ↔ school + membership role/status |
| 4 | `StudentProfile` | `student_profiles` | `StudentsModule` | Student academic domain data (separate from User identity); embeds guardian |
| 5 | `Olympiad` | `olympiads` | `OlympiadsModule` | Yearly official competition cycle (registration window, eligible classes) |
| 6 | `OlympiadRegistration` | `olympiad_registrations` | `RegistrationsModule` | Student enrollment in an olympiad cycle |
| 7 | `Question` | `questions` | `QuestionsModule` | Mutable question-bank working copy |
| 8 | `QuestionVersion` | `question_versions` | `QuestionsModule` | Immutable revision snapshot of question content |
| 9 | `Exam` | `exams` | `ExamsModule` | Official olympiad exam config (refs questions; schedule; status) |
| 10 | `ExamVersion` | `exam_versions` | `ExamsModule` | Frozen published exam; pins `QuestionVersion` IDs |
| 11 | `ExamAttempt` | `exam_attempts` | `ExamAttemptsModule` | One official sitting per student/exam; embeds answers & scores |
| 12 | `MockTest` | `mock_tests` | `MockTestsModule` | Practice assessment independent of olympiad registration |
| 13 | `MockTestVersion` | `mock_test_versions` | `MockTestsModule` | Frozen published mock test |
| 14 | `MockTestAttempt` | `mock_test_attempts` | `MockTestAttemptsModule` | Practice sitting; multiple attempts allowed |
| 15 | `Payment` | `payments` | `PaymentsModule` | Polymorphic payment/transaction record |
| 16 | `Entitlement` | `entitlements` | `EntitlementsModule` | Consumable rights (mock attempts, premium) for a student |
| 17 | `EntitlementConsumption` | `entitlement_consumptions` | `EntitlementConsumptionsModule` | Append-only usage ledger for entitlements |

**Embedded subdocuments (not separate collections):**  
`SchoolAddress`, `StudentGuardian`, `QuestionOption`, `QuestionGeneration`, `ExamSection` / `ExamQuestion`, `ExamAttemptAnswer` / `ExamAttemptSectionScore`, and parallel mock-test/attempt structures.

**Also present (not models):**  
- `PasswordService` (Argon2id hash/verify)  
- `protectImmutableHistory` middleware helper  
- `validateQuestionAnswers` / `validateOfficialExamForPublish` (application-level validators)

---

## 2. Model Relationships

```
User 1──1 StudentProfile ──► School
User 1──* SchoolMembership ──► School
StudentProfile 1──* OlympiadRegistration ──► Olympiad
Olympiad 1──* Exam ──► Question (refs)
Exam publish ──► ExamVersion ──► QuestionVersion
StudentProfile + Exam + ExamVersion + OlympiadRegistration ──► ExamAttempt
Question 1──* QuestionVersion (immutable)
MockTest ──► Question; publish ──► MockTestVersion ──► QuestionVersion
StudentProfile + MockTest + MockTestVersion ──► MockTestAttempt (*)
User ──► Payment (polymorphic referenceType/referenceId)
StudentProfile ──► Entitlement
Entitlement + MockTestAttempt? ──► EntitlementConsumption (immutable)
```

### Ownership / lifecycle (confirmed from schema comments & refs)

| Relationship | Type | Notes |
|--------------|------|-------|
| `User` → `StudentProfile` | 1:1 ownership | `student_profiles.userId` unique |
| `School` → `StudentProfile` | N:1 | Required `schoolId` |
| `User` + `School` → `SchoolMembership` | N:M link | Unique `(userId, schoolId)` |
| `Olympiad` → `Exam` | 1:N | Exam requires `olympiadId` |
| `OlympiadRegistration` | Student × Olympiad | Unique `(studentId, olympiadId)` |
| `ExamAttempt` | Student × Exam | Unique `(studentId, examId)`; requires `registrationId` + `examVersionId` |
| `MockTestAttempt` | Student × MockTest | Non-unique — multiple attempts allowed |
| `Question` ↔ `QuestionVersion` | Mutable → immutable history | Versions are insert-only |
| `Exam` ↔ `ExamVersion` | Draft → frozen publish | Attempts must reference version |
| `Payment` | Polymorphic | `referenceType` + `referenceId` (e.g. registration); no hard FK |
| `Entitlement` | Student-owned | System free-mock uniqueness; payment-source uniqueness |
| `EntitlementConsumption` | Append-only | Optional link to `mockTestAttemptId` |

### Lifecycle coupling (confirmed design intent)

1. **Identity first:** `User` exists before profile/membership.  
2. **School before student profile:** `StudentProfile.schoolId` is required.  
3. **Registration before official attempt:** `ExamAttempt.registrationId` is required.  
4. **Publish before attempt:** Attempts reference `ExamVersion` / `MockTestVersion`, not live draft configs alone.  
5. **Payments/entitlements separate:** Registration confirmation and mock access are expected to coordinate with Payment/Entitlement services (schemas prepared; services missing).

---

## 3. Existing Fields (important constraints)

### 3.1 `User`

| Field | Constraints |
|-------|-------------|
| `email` | unique, lowercase, required |
| `passwordHash` | required, `select: false`, stripped in toJSON/toObject |
| `name` | required |
| `roles` | `UserRole[]`, non-empty |
| `phone` | optional, unique sparse, `/^[6-9]\d{9}$/` |
| `isActive` | default true, indexed |
| `isEmailVerified` / `isPhoneVerified` | default false |
| `lastLoginAt` | optional |

Indexes: `roles`, `(isActive, roles)`, `createdAt`.

### 3.2 `School`

| Field | Constraints |
|-------|-------------|
| `code` | unique, uppercase, 6–20, `/^[A-Z0-9-]+$/` |
| `name`, `email` | required |
| `address` | embedded; `city` required; pincode `/^\d{6}$/` |
| `schoolTypes` | `SchoolType[]` |
| `managedClasses` | integers 1–12 |
| `status` | default `PENDING` |

### 3.3 `SchoolMembership`

- Unique `(userId, schoolId)`  
- `role`: currently only `SCHOOL_ADMIN`  
- `status`: `ACTIVE` \| `INACTIVE`

### 3.4 `StudentProfile`

| Field | Constraints |
|-------|-------------|
| `userId` | unique ref User |
| `schoolId` | required ref School |
| `fullName`, `dateOfBirth` | DOB past; age ≤ 30 |
| `academicClass` | `CLASS_7`…`CLASS_12` |
| `section`, `rollNumber`, `academicYear` | year `/^\d{4}-\d{2}$/` |
| `guardian` | required embedded |
| `status` | default `PENDING` |

Unique: `(schoolId, academicYear, rollNumber)`.

### 3.5 `Olympiad`

- Unique: `code`, `slug`, `academicYear`  
- `eligibleClasses` non-empty  
- `registrationEndsAt` > `registrationStartsAt`  
- Status: `DRAFT` → … → `ARCHIVED`

### 3.6 `OlympiadRegistration`

- Unique `(studentId, olympiadId)`  
- Status: `PENDING` \| `CONFIRMED` \| `CANCELLED` \| `REJECTED`  
- Timestamps: `registeredAt`, optional `confirmedAt` / `cancelledAt`, `rejectionReason`

### 3.7 Questions & versions

- Types: `MCQ`, `MULTIPLE_SELECT`, `OPEN_ENDED` with answer validators  
- Domains: THINK, ANALYSE, SOLVE, DECIDE, CREATE  
- Difficulty / status / generation source (`AI` \| `MANUAL`)  
- `QuestionVersion`: immutable via `protectImmutableHistory`; unique `(questionId, version)`

### 3.8 Exams & versions

- Exam refs olympiad; sections by cognitive domain; question refs with marks/order  
- Official publish invariant (application validator, not schema): **5 sections × 10 Q × 20 marks = 50 Q / 100 marks**  
- `ExamVersion` freezes sections + `questionVersionId` pins  
- Status: `DRAFT` \| `PUBLISHED` \| `SCHEDULED` \| `ONGOING` \| `COMPLETED` \| `ARCHIVED`

### 3.9 Attempts

- Official: unique one attempt per `(studentId, examId)`  
- Mock: many attempts; no olympiad registration required  
- Embedded answers + section scores; statuses through `EVALUATED` / `EXPIRED`

### 3.10 Payments / entitlements

- Payment purposes: `OLYMPIAD_REGISTRATION`, `MOCK_TEST`, `OTHER`  
- Providers: Razorpay, Stripe, Manual  
- Partial unique indexes on idempotency & provider IDs  
- Entitlement types: free/paid mock attempts, premium  
- Unique system free-mock entitlement per student; unique payment→entitlement source

---

## 4. Role Architecture

### Confirmed roles

**Global (`User.roles`):**

| Role | Intended scope (from schema design) |
|------|--------------------------------------|
| `SUPER_ADMIN` | Platform-wide: schools, olympiads, questions, exams, mock tests, payments oversight, user activation |
| `SCHOOL_ADMIN` | School-scoped via `SchoolMembership`; manage school students/registrations within membership school(s) |
| `STUDENT` | Own `StudentProfile`, registrations, attempts, entitlements, profile updates |

**School-scoped (`SchoolMembership.role`):**

| Role | Notes |
|------|-------|
| `SCHOOL_ADMIN` | Only membership role defined today |

### Recommended resource access matrix (derived strictly from models — not implemented)

| Resource | STUDENT | SCHOOL_ADMIN (membership) | SUPER_ADMIN |
|----------|---------|---------------------------|-------------|
| Own User / password / verification | CRUD self (limited) | self | all |
| School | read linked school | create/update own school (pending approval flow) | approve/suspend all |
| SchoolMembership | — | read own | manage |
| StudentProfile | create/read/update own | list/approve students in school | all |
| Olympiad | list published/open | list | full CRUD + status |
| OlympiadRegistration | create/cancel own | list/confirm/reject school students | all |
| Question / QuestionVersion | — (no direct student access to answers) | — | full + approve |
| Exam / ExamVersion | list scheduled for registered | list for school students | full + publish |
| ExamAttempt | start/answer/submit own | read school results | all + evaluate |
| MockTest / Version | list published | — | full |
| MockTestAttempt | start/submit own (if entitled) | read school analytics (optional later) | all |
| Payment | create/verify own | school bulk? (not in schema) | all |
| Entitlement / Consumption | read own | — | grant/cancel |

**Confirmed gap:** No AuthModule, guards, or policies exist to enforce this.

---

## 5. API Requirements (per major model)

Only APIs justified by existing schemas and confirmed frontend flows.

### Authentication / User *(foundation — schemas support it; OTP schema missing)*

| API | Why needed |
|-----|------------|
| `POST /auth/register/student` | Creates `User` + `StudentProfile` (and resolves/links `School`) — required by StudentSignupForm |
| `POST /auth/register/school` | Creates `User` (SCHOOL_ADMIN) + `School` + `SchoolMembership` — SchoolAdminSignup |
| `POST /auth/login` (password) | `passwordHash` + `PasswordService` exist; email/password signup exists |
| `POST /auth/otp/send` + `POST /auth/otp/verify` | OtpLoginForm + change-password OTP UI — **no OTP model yet; requires new store or external provider** |
| `POST /auth/password/change` | Profile Security / ChangePasswordModal |
| `GET /users/me` | Session identity for dashboards |
| Status: activate/deactivate user | `isActive` field |

### Schools

| API | Why |
|-----|-----|
| Create / Get / List / Update | School signup + admin management |
| Status transitions (`PENDING`→`ACTIVE`/`SUSPENDED`) | `SchoolStatus` enum |
| Lookup by `code` / search by name+city | Unique `code`; student linking |
| Soft-delete: **not appropriate** | Prefer status `INACTIVE` |

### SchoolMemberships

| API | Why |
|-----|-----|
| Create on school signup | Required link user↔school |
| List by school / by user | Authorization resolution |
| Status ACTIVE/INACTIVE | Membership lifecycle |

### Students (`StudentProfile`)

| API | Why |
|-----|-----|
| Create (with user) / Get me / Update profile | Signup + Profile panel |
| List by school | School admin |
| Status transitions | `PENDING`→`ACTIVE` etc. |
| Delete: **avoid hard delete** | Prefer `INACTIVE`; referenced by attempts/registrations |

### Olympiads

| API | Why |
|-----|-----|
| CRUD (admin) | Cycle management |
| Public/student list of open olympiads | Registration UI |
| Status changes along `OlympiadStatus` | Registration windows |
| Delete: prefer `ARCHIVED` | Historical registrations |

### Olympiad registrations

| API | Why |
|-----|-----|
| Create registration | ExamRegistrationModal / olympiad enroll |
| List mine / list by olympiad / by school | Dashboards |
| Confirm / Cancel / Reject | Status enum + timestamps |
| Get by id | Detail views |
| Delete: **no** | Use `CANCELLED` |

### Questions + QuestionVersions

| API | Why |
|-----|-----|
| Create / Update draft / List / Get | Question bank |
| Approve / Reject / Archive | `QuestionStatus` |
| Publish version (create immutable `QuestionVersion`) | Exam/mock freeze dependency |
| Delete: prefer `ARCHIVED` | Versions are immutable; live question should not vanish under published exams |

### Exams + ExamVersions

| API | Why |
|-----|-----|
| Create / Update draft / List by olympiad | Exam builder |
| Assign questions / sections | Schema structure |
| Publish → `ExamVersion` using `validateOfficialExamForPublish` | Confirmed publish invariants |
| Status transitions | Schedule/ongoing/complete |
| Student: list eligible exams | Dashboard MyExams |

### ExamAttempts

| API | Why |
|-----|-----|
| Start attempt | Requires registration + published version |
| Save answers / Submit | Embedded answers |
| Get own attempt / results | Results UI |
| Admin evaluate / expire | Statuses + open-ended scoring |
| Delete: **no** | Historical record |

### MockTests + versions + attempts

| API | Why |
|-----|-----|
| Admin CRUD + publish version | Practice panel content |
| Student list published | Practice UI |
| Start/submit attempt | Practice engine |
| Gate on entitlement | Entitlement schemas exist for this purpose |

### Payments

| API | Why |
|-----|-----|
| Create order / Confirm webhook / Get status | `Payment` fields for provider IDs, signature, idempotency |
| Link to registration or mock via `referenceType`/`referenceId` | Polymorphic design |
| Refund status update | `REFUNDED` enum |

### Entitlements + Consumptions

| API | Why |
|-----|-----|
| Grant (system/admin/payment) | Schema source types |
| List balance for student | Practice access |
| Consume (transactional with attempt start) | Consumption ledger + `quantityUsed` |
| Consumptions: create only | Immutable history |

---

## 6. API Dependency Order

Adjusted to **actual** schema dependencies (differs from the sample order):

```
1. Backend foundation (config, validation pipe, errors, response shape)
2. Authentication & Users (+ PasswordService wiring)
3. Schools
4. SchoolMemberships
5. Students (StudentProfile)          ← requires User + School
6. Olympiads
7. Olympiad Registrations             ← requires Student + Olympiad
8. Question Bank (+ QuestionVersions)
9. Official Exams (+ ExamVersions)    ← requires Olympiad + Questions
10. Exam Attempts                     ← requires Registration + ExamVersion
11. Mock Tests (+ versions)
12. Payments                          ← can confirm registrations / buy mocks
13. Entitlements + Consumptions       ← gate mock attempts; grant on payment
14. Mock Test Attempts                ← requires MockTestVersion + Entitlement
15. Results/Rankings read APIs        ← derived from ExamAttempt (no separate Results model)
16. Admin aggregate APIs
17. Frontend integration + e2e
```

**Note:** Payments and Entitlements can be stubbed with `MANUAL` / `SYSTEM` grants early so mock attempts are testable before Razorpay/Stripe.

---

## 7. Frontend Integration Map

**Confirmed:** No frontend API client, base URL, or fetch calls to the Nest API. Forms use `console.log`, `alert`, `setTimeout` mocks, or hardcoded `mockData`.

### Priority forms

#### StudentSignupForm  
`apps/web/src/app/(auth)/signup/student-signup/StudentSignupForm.tsx`

| Current behavior | `console.log("Student Signup Submitted:", formData)` |
| Request fields (UI) | `parentName`, `parentMobile`, `parentEmail`, `relation`, `studentName`, `studentGrade`, `city`, `schoolName`, `studentEmail`, `password`, `confirmPassword` |
| Recommended endpoint | `POST /auth/register/student` |
| Maps to backend | `User` (email=studentEmail, password→hash, roles=[STUDENT], optional phone?) + `StudentProfile` (fullName, academicClass, guardian.*) + resolve `School` by name/city **or** school code |
| Expected response (recommended) | `{ user, studentProfile, accessToken? }` |
| **Mismatch (confirmed)** | UI lacks: `dateOfBirth`, `section`, `rollNumber`, `academicYear`, `schoolId`/`school.code` — all **required** on `StudentProfile`. Relation values are lowercase (`father`) vs enum `FATHER`. Grade values `class-7` vs `CLASS_7`. Free-text school name vs required School ref. |

#### OtpLoginForm  
`apps/web/src/app/(auth)/common/OtpLoginForm.tsx`

| Current behavior | Send OTP is client-only; submit `console.log` then `router.push` to dashboard |
| Request | `phone`, `otp`, `role` (`student` \| `school`) |
| Recommended endpoints | `POST /auth/otp/send`, `POST /auth/otp/verify` |
| Maps to backend | `User.phone` exists — **no OTP collection/schema** |
| Expected response | tokens + user roles; redirect student vs school-admin |
| **Mismatch** | Signup is email+password; login UI is phone+OTP only — dual auth strategy not modeled beyond flags |

#### ExamRegistrationModal  
`apps/web/src/app/dashboard/student/components/Common/ExamRegistrationModal.tsx`

| Current behavior | 800ms fake success; `onCompleteRegistration(exam.id)` with **numeric** mock id |
| UI fields | studentId, fullName, class, schoolName, dob, email, mobile (mostly display; hardcoded defaults) |
| Recommended endpoint | `POST /registrations` with `{ olympiadId }` (student identity from auth; profile already stored) |
| Maps to | `OlympiadRegistration` — only needs `studentId` + `olympiadId` (+ status lifecycle) |
| Expected response | `{ id, status, olympiadId, registeredAt, … }` |
| **Mismatch** | Modal re-collects profile fields already on `StudentProfile`/`User`. Uses mock exam `id: number` vs Mongo ObjectId. Treats “exam registration” while schema registers for **Olympiad**, then attempts bind to **Exam**. Class 6 in UI but backend classes start at 7. No payment step though `PaymentPurpose.OLYMPIAD_REGISTRATION` exists. |

### Other frontend → API gaps

| Frontend | Current | Backend need |
|----------|---------|--------------|
| `SchoolAdminSignup` | console.log + alert success | `POST /auth/register/school` → User + School + Membership; verification step |
| `ChangePasswordModal` / Card | Client OTP simulation | OTP verify + password update via `PasswordService` |
| Student Profile / Dashboard / Practice / Results / Olympiad / Certificates | Static `mockData` | Read APIs for profile, olympiads, registrations, attempts, entitlements |
| Practice test UI | Local mock questions | MockTest attempt engine APIs |
| School types in signup UI | Display strings like “Senior Secondary…” | Must map to `SchoolType.SENIOR_SECONDARY` etc. |

---

## 8. Missing Architecture (actually absent)

Confirmed missing for a production API:

| Area | Status |
|------|--------|
| Auth module / login-register controllers | Missing |
| JWT / session strategy | Missing (no `@nestjs/jwt`, passport) |
| OTP storage / SMS/email provider integration | Missing (UI expects OTP) |
| Authorization guards / role & school-scope policies | Missing |
| DTOs + `ValidationPipe` + `class-validator` | Missing (not in package.json) |
| Exception filters / consistent error envelope | Missing |
| Standard API response wrapper | Missing |
| Pagination helpers | Missing |
| Swagger / OpenAPI | Missing |
| Rate limiting (OTP/login) | Missing |
| CORS configuration in `main.ts` | Missing |
| Audit logging | Missing |
| Payment provider verification (Razorpay/Stripe webhooks) | Missing |
| Transactions for entitlement consume + attempt create | Missing (called out in schema comments) |
| Results/Rankings collection | **Not a schema** — derive from `ExamAttempt` or add later intentionally |
| Certificates / coupons models | **Not in backend** — frontend-only mocks |
| Global prefix / versioning | Missing |
| Seed / migration tooling | Missing |
| Business services & controllers in domain modules | Missing (modules are schema shells) |

**Present foundation pieces:** ConfigModule, Mongoose connection, domain schema modules, PasswordService, immutable history protection, question/exam publish validators.

---

## 9. Recommended Development Phases

### Phase 1: Backend Foundation
- Global `ValidationPipe`, exception filter, response conventions, CORS  
- Install/configure only what Phase 1 needs (validators, etc.) when implementation starts  
- Health check beyond hello (optional)

### Phase 2: Authentication and Authorization
- Register/login (password) using `User` + `PasswordService`  
- JWT access/refresh (or chosen session)  
- Role guards (`SUPER_ADMIN` / `SCHOOL_ADMIN` / `STUDENT`)  
- Decide OTP strategy (new collection vs Redis) before wiring OtpLoginForm  
- Email/phone verification endpoints aligning with `isEmailVerified` / `isPhoneVerified`

### Phase 3: Schools + Memberships
- School create/list/status  
- Membership create on school-admin signup  
- School code generation/lookup

### Phase 4: Student APIs
- Student register (transaction: User + StudentProfile)  
- Profile get/update; school admin list/approve  
- **Resolve frontend field gaps** (DOB, roll, section, year, school code) before locking API contract

### Phase 5: Olympiad APIs
- Admin CRUD + status machine  
- Public/student listing of open cycles

### Phase 6: Exam Registration
- Create/list/cancel/confirm/reject `OlympiadRegistration`  
- Wire ExamRegistrationModal to olympiad id (not mock numeric exam id)  
- Optional: payment-required confirmation path

### Phase 7: Question Bank
- Question CRUD + approve  
- Create `QuestionVersion` on content publish/freeze

### Phase 8: Exam Engine (official)
- Exam draft CRUD  
- Publish → `ExamVersion` enforcing `validateOfficialExamForPublish`  
- `ExamAttempt` start/answer/submit/evaluate  
- Results reads from attempts

### Phase 9: Mock Tests + Entitlements
- Mock test publish versions  
- System grant free attempts  
- Consumption + attempt start in a Mongo transaction  
- Student practice APIs

### Phase 10: Payments
- Create order, verify signature/webhook, idempotency  
- On success: confirm registration and/or grant paid entitlements

### Phase 11: Admin APIs
- Aggregations: school students, registration stats, exam monitoring  
- Super-admin user/school suspensions

### Phase 12: Testing and Frontend Integration
- Replace console.log/mocks with API client  
- Align enum/casing and required signup fields  
- E2E: signup → register → attempt → results

---

## 10. Inconsistencies & Risks (resolve before/during implementation)

1. **Student signup vs `StudentProfile` required fields** — UI cannot satisfy schema without product decisions (school selection by code, DOB, roll/section/year).  
2. **Auth channel mismatch** — password signup vs OTP-only login UI; backend has both email password and phone fields but no OTP model.  
3. **Registration target mismatch** — UI “register for exam” vs schema `OlympiadRegistration` then later `ExamAttempt`.  
4. **Enum/value casing** — frontend lowercase/`class-7` vs backend `FATHER`/`CLASS_7`.  
5. **School type labels** — human strings in school signup vs `SchoolType` enum.  
6. **Class 6 in ExamRegistrationModal** — not in `StudentClass`.  
7. **No public student id field** — UI “IQO-2026-8942” is not a schema field (only Mongo `_id` / rollNumber).  
8. **Exam draft flexibility vs publish rigidity** — drafts allow any shape; publish service must call validator or risk invalid `ExamVersion`.  
9. **Immutable collections** — never update QuestionVersion/ExamVersion/MockTestVersion/EntitlementConsumption; always insert.  
10. **Payment ↔ registration** — soft polymorphic link; services must define allowed `referenceType` strings.  
11. **Certificates/coupons/leaderboard** — frontend-only; do not invent APIs until product confirms models.  
12. **SchoolMembershipRole** only has `SCHOOL_ADMIN` — teachers/coordinators not modeled.

---

## Final Summary

### 1. Total models found
**17 Mongoose schemas** (14 mutable domain entities + 3 immutable version/history entities: QuestionVersion, ExamVersion, MockTestVersion; plus immutable EntitlementConsumption).

### 2. Key relationships
`User` ↔ `StudentProfile` (1:1) and `User` ↔ `School` via `SchoolMembership`; `StudentProfile` → `OlympiadRegistration` → `Olympiad` → `Exam` → `ExamVersion` → `ExamAttempt`; parallel `MockTest` → `MockTestVersion` → `MockTestAttempt` gated by `Entitlement`/`EntitlementConsumption`; `Payment` links polymorphically to product entities.

### 3. Missing backend components
Business controllers/services, DTOs/validation, JWT/OTP auth, guards, exception/response standards, pagination, Swagger, rate limiting, CORS, audit logs, payment verification, transactional entitlement consumption.

### 4. Recommended API development order
Foundation → Auth/Users → Schools/Memberships → Students → Olympiads → Registrations → Questions → Exams/Attempts → MockTests → Payments → Entitlements → Mock Attempts → Admin → Frontend integration.

### 5. Frontend forms that currently cannot work
- **StudentSignupForm** (console.log; missing required profile fields)  
- **OtpLoginForm** (no OTP backend; fake redirect)  
- **ExamRegistrationModal** (mock timeout; wrong id model; re-collects profile)  
- **SchoolAdminSignup** (console.log; no verification API)  
- **ChangePasswordModal** (fake OTP)  
- Entire student dashboard panels (static mock data)

### 6. Risks / issues to resolve before implementation
Align signup field contract with `StudentProfile`; choose OTP vs password login strategy; clarify olympiad vs exam registration UX; standardize enums; avoid hard deletes on historical entities; define payment reference conventions; do not invent certificate/coupon schemas until required.

---

*This document is the blueprint for implementing the complete API system. Next step when approved: Phase 1 foundation + Phase 2 auth without altering existing schemas unless product explicitly decides to change them.*
