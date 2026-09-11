"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ApiError,
  GUARDIAN_RELATIONS,
  STUDENT_CLASSES,
  getSchoolByCode,
  patchStudentProfile,
  searchSchools,
  type GuardianRelation,
  type SchoolByCodeResponse,
  type StudentClass,
} from "@/lib/api";
import { getAccessToken } from "@/lib/auth/token-storage";
import { useStudentMe } from "../../../StudentMeProvider";
import { getAcademicYearOptions } from "@/lib/academicYear";
import { formatDateOfBirth } from "../../../lib/mapStudentMe";

const FIELD_CLASS =
  "w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-800 font-bold text-xs outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20";

const CLASS_LABELS: Record<StudentClass, string> = {
  CLASS_7: "Class 7",
  CLASS_8: "Class 8",
  CLASS_9: "Class 9",
  CLASS_10: "Class 10",
  CLASS_11: "Class 11",
  CLASS_12: "Class 12",
};

const RELATION_LABELS: Record<GuardianRelation, string> = {
  FATHER: "Father",
  MOTHER: "Mother",
  GUARDIAN: "Guardian",
  MENTOR: "Mentor",
  OTHER: "Other",
};

const PHONE_REGEX = /^[6-9]\d{9}$/;
const AADHAR_REGEX = /^\d{12}$/;

type CompleteProfileForm = {
  schoolCode: string;
  dateOfBirth: string;
  academicClass: StudentClass | "";
  section: string;
  rollNumber: string;
  aadharNumber: string;
  academicYear: string;
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
  guardianRelation: GuardianRelation | "";
};

export function CompleteProfileCard() {
  const { data, refetch } = useStudentMe();
  const completion = data?.profileCompletion;
  const isComplete = completion?.isComplete ?? false;
  const [form, setForm] = useState<CompleteProfileForm>({
    schoolCode: "",
    dateOfBirth: "",
    academicClass: "",
    section: "",
    rollNumber: "",
    aadharNumber: "",
    academicYear: "",
    guardianName: "",
    guardianPhone: "",
    guardianEmail: "",
    guardianRelation: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [schoolHint, setSchoolHint] = useState<string | null>(null);
  const [schoolSearch, setSchoolSearch] = useState("");
  const [schoolResults, setSchoolResults] = useState<SchoolByCodeResponse[]>([]);
  const [isSearchingSchools, setIsSearchingSchools] = useState(false);
  const [showSchoolResults, setShowSchoolResults] = useState(false);
  const schoolSearchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!data) return;
    setForm({
      schoolCode: data.school?.code ?? "",
      dateOfBirth: formatDateOfBirth(data.profile?.dateOfBirth),
      academicClass: data.profile?.academicClass ?? "",
      section: data.profile?.section ?? "",
      rollNumber: data.profile?.rollNumber ?? "",
      aadharNumber: data.profile?.aadharNumber ?? "",
      academicYear: data.profile?.academicYear ?? "",
      guardianName: data.profile?.guardian?.name ?? "",
      guardianPhone: data.profile?.guardian?.phone ?? "",
      guardianEmail: data.profile?.guardian?.email ?? "",
      guardianRelation: data.profile?.guardian?.relation ?? "",
    });
    if (data.school?.name) {
      setSchoolSearch(data.school.name);
      setSchoolHint(`Selected: ${data.school.name} (${data.school.code})`);
    }
  }, [data]);

  useEffect(() => {
    if (schoolSearch.trim().length < 2) {
      setSchoolResults([]);
      setIsSearchingSchools(false);
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(() => {
      setIsSearchingSchools(true);
      void searchSchools(schoolSearch, controller.signal)
        .then((results) => {
          if (controller.signal.aborted) return;
          setSchoolResults(results);
        })
        .catch((err) => {
          if (controller.signal.aborted) return;
          if (err instanceof ApiError) {
            setSchoolResults([]);
          }
        })
        .finally(() => {
          if (!controller.signal.aborted) {
            setIsSearchingSchools(false);
          }
        });
    }, 300);

    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [schoolSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        schoolSearchRef.current &&
        !schoolSearchRef.current.contains(event.target as Node)
      ) {
        setShowSchoolResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (
    field: keyof CompleteProfileForm,
    value: string
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSelectSchool = (school: SchoolByCodeResponse) => {
    setForm((prev) => ({ ...prev, schoolCode: school.code }));
    setSchoolSearch(school.name);
    setSchoolHint(`Selected: ${school.name} (${school.code})`);
    setShowSchoolResults(false);
    setSchoolResults([]);
  };

  const handleVerifySchool = async () => {
    const code = form.schoolCode.trim().toUpperCase();
    if (code.length < 6) {
      setSchoolHint("Enter a valid school code");
      return;
    }
    try {
      const school = await getSchoolByCode(code);
      setForm((prev) => ({ ...prev, schoolCode: code }));
      setSchoolSearch(school.name);
      setSchoolHint(`Verified: ${school.name}`);
    } catch (err) {
      setSchoolHint(
        err instanceof ApiError ? err.message : "Unable to verify school code"
      );
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const token = getAccessToken();
    if (!token) {
      setError("Please sign in again to update your profile.");
      return;
    }

    if (form.guardianPhone && !PHONE_REGEX.test(form.guardianPhone)) {
      setError("Guardian phone must be a valid 10-digit Indian mobile number.");
      return;
    }

    if (form.aadharNumber && !AADHAR_REGEX.test(form.aadharNumber)) {
      setError("Aadhar number must be a 12-digit number.");
      return;
    }

    setIsSaving(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const guardianReady =
        form.guardianName.trim() &&
        form.guardianPhone.trim() &&
        form.guardianRelation;

      await patchStudentProfile(token, {
        ...(form.schoolCode.trim()
          ? { schoolCode: form.schoolCode.trim().toUpperCase() }
          : {}),
        ...(form.dateOfBirth ? { dateOfBirth: form.dateOfBirth } : {}),
        ...(form.academicClass ? { academicClass: form.academicClass } : {}),
        ...(form.section.trim() ? { section: form.section.trim() } : {}),
        ...(form.rollNumber.trim() ? { rollNumber: form.rollNumber.trim() } : {}),
        ...(form.aadharNumber.trim()
          ? { aadharNumber: form.aadharNumber.trim() }
          : {}),
        ...(form.academicYear.trim()
          ? { academicYear: form.academicYear.trim() }
          : {}),
        ...(guardianReady
          ? {
              guardian: {
                name: form.guardianName.trim(),
                phone: form.guardianPhone.trim(),
                relation: form.guardianRelation as GuardianRelation,
                ...(form.guardianEmail.trim()
                  ? { email: form.guardianEmail.trim().toLowerCase() }
                  : {}),
              },
            }
          : {}),
      });
      setSuccessMessage("Profile saved successfully.");
      refetch();
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.errors.length > 0
            ? err.errors.join(" ")
            : err.message
          : "Unable to save profile. Please try again."
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (isComplete) {
    return null;
  }

  const percentage = completion?.percentage ?? 0;

  return (
    <div
      id="complete-your-profile"
      className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-200/80 shadow-2xs"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="text-xs sm:text-sm font-black text-slate-900 tracking-tight leading-none">
            Complete your profile
          </h3>
          <p className="text-[10px] font-medium text-slate-400 mt-1">
            School, academic, and guardian details are saved to your student profile.
          </p>
        </div>
        <span className="shrink-0 rounded-full px-2.5 py-1 text-[10px] font-black bg-violet-50 text-violet-700">
          {percentage}% complete
        </span>
      </div>

      <div className="h-1.5 w-full rounded-full bg-slate-100 mb-4">
        <div
          className="h-1.5 rounded-full bg-violet-600 transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {error ? (
        <p className="mb-3 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-[11px] font-semibold text-rose-700">
          {error}
        </p>
      ) : null}

      {successMessage ? (
        <p className="mb-3 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-[11px] font-semibold text-emerald-700">
          {successMessage}
        </p>
      ) : null}

      <form onSubmit={(event) => void handleSubmit(event)} className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div ref={schoolSearchRef} className="relative">
            <label className="text-[10px] font-bold text-slate-600 block mb-0.5">
              Search School
            </label>
            <input
              type="text"
              value={schoolSearch}
              onChange={(e) => {
                setSchoolSearch(e.target.value);
                setShowSchoolResults(true);
              }}
              onFocus={() => setShowSchoolResults(true)}
              placeholder="Search by school name or city"
              className={FIELD_CLASS}
              autoComplete="off"
            />
            {showSchoolResults && schoolSearch.trim().length >= 2 ? (
              <div className="absolute z-20 mt-1 w-full max-h-48 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-lg">
                {isSearchingSchools ? (
                  <p className="px-3 py-2 text-[11px] font-semibold text-slate-400">
                    Searching…
                  </p>
                ) : schoolResults.length === 0 ? (
                  <p className="px-3 py-2 text-[11px] font-semibold text-slate-400">
                    No schools found
                  </p>
                ) : (
                  schoolResults.map((school) => (
                    <button
                      key={school.id}
                      type="button"
                      onClick={() => handleSelectSchool(school)}
                      className="w-full text-left px-3 py-2 hover:bg-violet-50 cursor-pointer"
                    >
                      <p className="text-[11px] font-black text-slate-800">
                        {school.name}
                      </p>
                      <p className="text-[10px] font-semibold text-slate-400">
                        {school.code}
                        {school.address?.city ? ` · ${school.address.city}` : ""}
                      </p>
                    </button>
                  ))
                )}
              </div>
            ) : null}
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-600 block mb-0.5">
              School Code
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={form.schoolCode}
                onChange={(e) =>
                  handleChange("schoolCode", e.target.value.toUpperCase())
                }
                placeholder="Filled from search or enter code"
                className={`${FIELD_CLASS} uppercase`}
              />
              <button
                type="button"
                onClick={() => void handleVerifySchool()}
                className="shrink-0 rounded-lg border border-violet-200 bg-violet-50 px-3 text-[10px] font-extrabold text-violet-700 hover:bg-violet-100 cursor-pointer"
              >
                Verify
              </button>
            </div>
            {schoolHint ? (
              <p className="mt-1 text-[10px] font-semibold text-slate-500">
                {schoolHint}
              </p>
            ) : null}
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-600 block mb-0.5">
              Date of Birth
            </label>
            <input
              type="date"
              value={form.dateOfBirth}
              onChange={(e) => handleChange("dateOfBirth", e.target.value)}
              className={FIELD_CLASS}
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-600 block mb-0.5">
              Class / Grade
            </label>
            <select
              value={form.academicClass}
              onChange={(e) => handleChange("academicClass", e.target.value)}
              className={FIELD_CLASS}
            >
              <option value="">Select class</option>
              {STUDENT_CLASSES.map((studentClass) => (
                <option key={studentClass} value={studentClass}>
                  {CLASS_LABELS[studentClass]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-600 block mb-0.5">
              Section
            </label>
            <input
              type="text"
              value={form.section}
              onChange={(e) =>
                handleChange("section", e.target.value.toUpperCase())
              }
              placeholder="e.g. A"
              className={`${FIELD_CLASS} uppercase`}
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-600 block mb-0.5">
              Roll Number
            </label>
            <input
              type="text"
              value={form.rollNumber}
              onChange={(e) => handleChange("rollNumber", e.target.value)}
              placeholder="Enter roll number"
              className={FIELD_CLASS}
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-600 block mb-0.5">
              Academic Year
            </label>
            <select
              value={form.academicYear}
              onChange={(e) => handleChange("academicYear", e.target.value)}
              className={`${FIELD_CLASS} cursor-pointer`}
            >
              <option value="">Select academic year</option>
              {getAcademicYearOptions(form.academicYear).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-600 block mb-0.5">
              Aadhar Number
            </label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={12}
              value={form.aadharNumber}
              onChange={(e) =>
                handleChange(
                  "aadharNumber",
                  e.target.value.replace(/\D/g, "").slice(0, 12)
                )
              }
              placeholder="Enter 12-digit Aadhar number"
              className={FIELD_CLASS}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div>
            <label className="text-[10px] font-bold text-slate-600 block mb-0.5">
              Guardian Name
            </label>
            <input
              type="text"
              value={form.guardianName}
              onChange={(e) => handleChange("guardianName", e.target.value)}
              placeholder="Enter guardian name"
              className={FIELD_CLASS}
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-600 block mb-0.5">
              Guardian Phone
            </label>
            <input
              type="tel"
              maxLength={10}
              value={form.guardianPhone}
              onChange={(e) =>
                handleChange(
                  "guardianPhone",
                  e.target.value.replace(/\D/g, "").slice(0, 10)
                )
              }
              placeholder="10-digit mobile number"
              className={FIELD_CLASS}
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-600 block mb-0.5">
              Guardian Email
            </label>
            <input
              type="email"
              value={form.guardianEmail}
              onChange={(e) => handleChange("guardianEmail", e.target.value)}
              placeholder="Optional email"
              className={FIELD_CLASS}
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-600 block mb-0.5">
              Relation
            </label>
            <select
              value={form.guardianRelation}
              onChange={(e) => handleChange("guardianRelation", e.target.value)}
              className={FIELD_CLASS}
            >
              <option value="">Select relation</option>
              {GUARDIAN_RELATIONS.map((relation) => (
                <option key={relation} value={relation}>
                  {RELATION_LABELS[relation]}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end pt-1">
          <button
            type="submit"
            disabled={isSaving}
            className="rounded-xl bg-violet-600 px-4 py-2 text-[11px] font-extrabold text-white hover:bg-violet-700 disabled:opacity-60 cursor-pointer"
          >
            {isSaving ? "Saving…" : "Save profile"}
          </button>
        </div>
      </form>
    </div>
  );
}
