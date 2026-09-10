"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  Building2,
  MapPin,
  User,
  Upload,
  Calendar,
  ChevronDown,
  Save,
} from "lucide-react";

interface AddSchoolFormProps {
  onBack: () => void;
  onSave: (newSchool: any) => void;
}

export function AddSchoolForm({ onBack, onSave }: AddSchoolFormProps) {
  const [formData, setFormData] = useState({
    schoolName: "",
    schoolType: "",
    boardAffiliation: "",
    schoolCode: "",
    officialEmail: "",
    countryCode: "+91",
    mobileNumber: "",
    website: "",
    totalStudents: "",
    establishedYear: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    adminFullName: "",
    adminDesignation: "",
    adminEmail: "",
    adminMobileCode: "+91",
    adminMobile: "",
  });

  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: Date.now().toString(),
      name: formData.schoolName || "New Public School",
      code: formData.schoolCode || "SCH" + Math.floor(100 + Math.random() * 900),
      admin: formData.adminFullName || "School Admin",
      email: formData.officialEmail || "admin@school.edu",
      phone: formData.mobileNumber ? `${formData.countryCode} ${formData.mobileNumber}` : "+91 9876543210",
      location: formData.city && formData.state ? `${formData.city}, ${formData.state}` : "Bengaluru, Karnataka",
      students: formData.totalStudents ? Number(formData.totalStudents).toLocaleString() : "500",
      status: "Active",
      type: formData.schoolType || "Private",
      board: formData.boardAffiliation || "CBSE",
    });
  };

  return (
    <div className="space-y-6 pb-12 font-sans text-slate-900">
      {/* Back Button Only */}
      <div>
        <button
          type="button"
          onClick={onBack}
          className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer inline-flex items-center justify-center shadow-2xs"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: School Basic Information */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-2xs space-y-6">
          <div className="flex items-center gap-3.5 border-b border-slate-100 pb-5">
            <div className="w-11 h-11 rounded-2xl bg-purple-100/80 text-[#3B1EAE] flex items-center justify-center shrink-0 font-bold">
              <Building2 className="w-5.5 h-5.5 stroke-[2.2]" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
                School Basic Information
              </h2>
              <p className="text-xs font-semibold text-slate-400">
                Enter the basic details about the school
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Inputs (9 Cols) */}
            <div className="lg:col-span-9 space-y-5">
              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                    School Name <span className="text-purple-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter school name"
                    value={formData.schoolName}
                    onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                    className="w-full bg-slate-50/80 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-[#3B1EAE] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                    School Type <span className="text-purple-600">*</span>
                  </label>
                  <div className="relative">
                    <select
                      required
                      value={formData.schoolType}
                      onChange={(e) => setFormData({ ...formData, schoolType: e.target.value })}
                      className="w-full bg-slate-50/80 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-[#3B1EAE] transition-all cursor-pointer"
                    >
                      <option value="">Select school type</option>
                      <option value="Private">Private</option>
                      <option value="Public">Public</option>
                      <option value="Government">Government</option>
                      <option value="International">International</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                    Board Affiliation <span className="text-purple-600">*</span>
                  </label>
                  <div className="relative">
                    <select
                      required
                      value={formData.boardAffiliation}
                      onChange={(e) => setFormData({ ...formData, boardAffiliation: e.target.value })}
                      className="w-full bg-slate-50/80 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-[#3B1EAE] transition-all cursor-pointer"
                    >
                      <option value="">Select board affiliation</option>
                      <option value="CBSE">CBSE</option>
                      <option value="ICSE">ICSE</option>
                      <option value="IB">IB</option>
                      <option value="State Board">State Board</option>
                      <option value="Cambridge">Cambridge</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                    School Code <span className="text-purple-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter school code"
                    value={formData.schoolCode}
                    onChange={(e) => setFormData({ ...formData, schoolCode: e.target.value })}
                    className="w-full bg-slate-50/80 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-[#3B1EAE] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                    Email Address <span className="text-purple-600">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Enter official email address"
                    value={formData.officialEmail}
                    onChange={(e) => setFormData({ ...formData, officialEmail: e.target.value })}
                    className="w-full bg-slate-50/80 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-[#3B1EAE] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                    Mobile Number <span className="text-purple-600">*</span>
                  </label>
                  <div className="flex gap-2">
                    <div className="relative shrink-0 w-20">
                      <select
                        value={formData.countryCode}
                        onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                        className="w-full bg-slate-50/80 border border-slate-200/80 rounded-xl px-2.5 py-2.5 text-xs sm:text-sm font-bold text-slate-700 appearance-none focus:outline-none cursor-pointer"
                      >
                        <option value="+91">+91</option>
                        <option value="+1">+1</option>
                        <option value="+44">+44</option>
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                    <input
                      type="tel"
                      required
                      placeholder="Enter mobile number"
                      value={formData.mobileNumber}
                      onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                      className="flex-1 bg-slate-50/80 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-[#3B1EAE] transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                    Website
                  </label>
                  <input
                    type="url"
                    placeholder="Enter website URL (optional)"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full bg-slate-50/80 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-[#3B1EAE] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                    Total Students <span className="text-purple-600">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="Enter total number of students"
                    value={formData.totalStudents}
                    onChange={(e) => setFormData({ ...formData, totalStudents: e.target.value })}
                    className="w-full bg-slate-50/80 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-[#3B1EAE] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                    Established Year <span className="text-purple-600">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="dd/mm/yyyy"
                      value={formData.establishedYear}
                      onChange={(e) => setFormData({ ...formData, establishedYear: e.target.value })}
                      className="w-full bg-slate-50/80 border border-slate-200/80 rounded-xl px-4 py-2.5 pr-10 text-xs sm:text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-[#3B1EAE] transition-all"
                    />
                    <Calendar className="w-4 h-4 text-purple-600 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Upload Logo Box (3 Cols) */}
            <div className="lg:col-span-3 flex flex-col items-center justify-center border-2 border-dashed border-purple-200 bg-purple-50/30 rounded-3xl p-6 text-center group hover:bg-purple-50/60 transition-all cursor-pointer min-h-[220px] relative">
              <input
                type="file"
                accept="image/jpeg,image/png"
                onChange={handleLogoUpload}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="School Logo Preview"
                  className="w-24 h-24 object-contain rounded-2xl mb-2"
                />
              ) : (
                <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6 stroke-[2.2]" />
                </div>
              )}
              <span className="text-xs sm:text-sm font-extrabold text-purple-700 flex items-center gap-1">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload School Logo</span>
              </span>
              <p className="text-[11px] font-semibold text-slate-400 mt-1">
                JPG, PNG (Max 2MB)
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Address Information */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-2xs space-y-6">
          <div className="flex items-center gap-3.5 border-b border-slate-100 pb-5">
            <div className="w-11 h-11 rounded-2xl bg-purple-100/80 text-[#3B1EAE] flex items-center justify-center shrink-0 font-bold">
              <MapPin className="w-5.5 h-5.5 stroke-[2.2]" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
                Address Information
              </h2>
              <p className="text-xs font-semibold text-slate-400">
                Enter the complete address of the school
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-5">
            <div className="md:col-span-1">
              <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                Address Line 1 <span className="text-purple-600">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Enter address line 1"
                value={formData.addressLine1}
                onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                className="w-full bg-slate-50/80 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-[#3B1EAE] transition-all"
              />
            </div>
            <div className="md:col-span-1">
              <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                Address Line 2
              </label>
              <input
                type="text"
                placeholder="Enter address line 2 (optional)"
                value={formData.addressLine2}
                onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
                className="w-full bg-slate-50/80 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-[#3B1EAE] transition-all"
              />
            </div>
            <div className="md:col-span-1">
              <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                City <span className="text-purple-600">*</span>
              </label>
              <div className="relative">
                <select
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-slate-50/80 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-[#3B1EAE] transition-all cursor-pointer"
                >
                  <option value="">Select city</option>
                  <option value="Bengaluru">Bengaluru</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Pune">Pune</option>
                  <option value="Hyderabad">Hyderabad</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
            <div className="md:col-span-1">
              <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                State <span className="text-purple-600">*</span>
              </label>
              <div className="relative">
                <select
                  required
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full bg-slate-50/80 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-[#3B1EAE] transition-all cursor-pointer"
                >
                  <option value="">Select state</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
            <div className="md:col-span-1">
              <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                Pincode <span className="text-purple-600">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Enter pincode"
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                className="w-full bg-slate-50/80 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-[#3B1EAE] transition-all"
              />
            </div>
          </div>
        </div>

        {/* Section 3: School Admin / Contact Person */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-2xs space-y-6">
          <div className="flex items-center gap-3.5 border-b border-slate-100 pb-5">
            <div className="w-11 h-11 rounded-2xl bg-purple-100/80 text-[#3B1EAE] flex items-center justify-center shrink-0 font-bold">
              <User className="w-5.5 h-5.5 stroke-[2.2]" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
                School Admin / Contact Person
              </h2>
              <p className="text-xs font-semibold text-slate-400">
                Enter the details of the school administrator or primary contact
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-5">
            <div>
              <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                Full Name <span className="text-purple-600">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Enter full name"
                value={formData.adminFullName}
                onChange={(e) => setFormData({ ...formData, adminFullName: e.target.value })}
                className="w-full bg-slate-50/80 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-[#3B1EAE] transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                Designation <span className="text-purple-600">*</span>
              </label>
              <div className="relative">
                <select
                  required
                  value={formData.adminDesignation}
                  onChange={(e) => setFormData({ ...formData, adminDesignation: e.target.value })}
                  className="w-full bg-slate-50/80 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-[#3B1EAE] transition-all cursor-pointer"
                >
                  <option value="">Select designation</option>
                  <option value="Principal">Principal</option>
                  <option value="Administrator">Administrator</option>
                  <option value="Vice Principal">Vice Principal</option>
                  <option value="Trustee">Trustee</option>
                  <option value="Director">Director</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                Email Address <span className="text-purple-600">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="Enter email address"
                value={formData.adminEmail}
                onChange={(e) => setFormData({ ...formData, adminEmail: e.target.value })}
                className="w-full bg-slate-50/80 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-[#3B1EAE] transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                Mobile Number <span className="text-purple-600">*</span>
              </label>
              <div className="flex gap-2">
                <div className="relative shrink-0 w-20">
                  <select
                    value={formData.adminMobileCode}
                    onChange={(e) => setFormData({ ...formData, adminMobileCode: e.target.value })}
                    className="w-full bg-slate-50/80 border border-slate-200/80 rounded-xl px-2.5 py-2.5 text-xs sm:text-sm font-bold text-slate-700 appearance-none focus:outline-none cursor-pointer"
                  >
                    <option value="+91">+91</option>
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                <input
                  type="tel"
                  required
                  placeholder="Enter mobile number"
                  value={formData.adminMobile}
                  onChange={(e) => setFormData({ ...formData, adminMobile: e.target.value })}
                  className="flex-1 bg-slate-50/80 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-[#3B1EAE] transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2.5 rounded-xl border border-slate-200 bg-white font-extrabold text-xs sm:text-sm text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#3B1EAE] text-white font-extrabold text-xs sm:text-sm hover:bg-purple-800 transition-colors cursor-pointer shadow-md shadow-purple-600/20"
          >
            <Save className="w-4 h-4" />
            <span>Save School</span>
          </button>
        </div>
      </form>
    </div>
  );
}
