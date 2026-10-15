import React, { useState } from 'react';
import { 
  ArrowLeftIcon, 
  Building2Icon, 
  UserIcon, 
  KeyRoundIcon, 
  BriefcaseIcon, 
  AlertCircleIcon, 
  LoaderIcon, 
  SparklesIcon 
} from './icons';
import { OthersFormData, UserSession } from '../types';

interface OthersLoginProps {
  onBack: () => void;
  onSuccess: (session: UserSession) => void;
}

const DESIGNATIONS: Array<OthersFormData['designation']> = [
  'Clerk',
  'College Administrator',
  'Subordinate Staff',
  'Bus Staff',
  'Other',
];

export default function OthersLogin({ onBack, onSuccess }: OthersLoginProps) {
  const [formData, setFormData] = useState<OthersFormData>({
    fullName: '',
    staffId: '',
    designation: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof OthersFormData, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof OthersFormData, boolean>>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateField = (field: keyof OthersFormData, value: string): string => {
    const trimmed = value.trim();
    if (!trimmed) {
      if (field === 'fullName') return 'Please enter your full name.';
      if (field === 'staffId') return 'Please enter your Staff ID.';
      if (field === 'designation') return 'Please select your role or designation.';
    }

    if (field === 'fullName' && trimmed.length < 2) {
      return 'Name should be at least 2 characters.';
    }

    if (field === 'staffId' && trimmed.length < 3) {
      return 'Staff ID should be at least 3 characters (e.g. STF-4029).';
    }

    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value as any }));

    if (touched[name as keyof OthersFormData]) {
      const err = validateField(name as keyof OthersFormData, value);
      setErrors((prev) => ({ ...prev, [name]: err }));
    }
  };

  const handleBlur = (field: keyof OthersFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Partial<Record<keyof OthersFormData, string>> = {
      fullName: validateField('fullName', formData.fullName),
      staffId: validateField('staffId', formData.staffId),
      designation: validateField('designation', formData.designation),
    };

    setTouched({ fullName: true, staffId: true, designation: true });
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((err) => !!err);
    if (hasErrors) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onSuccess({
        role: 'others',
        fullName: formData.fullName.trim(),
        identifier: formData.staffId.trim().toUpperCase(),
        identifierLabel: 'Staff ID',
        secondaryInfo: {
          label: 'Designation',
          value: formData.designation,
        },
        loginTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
    }, 500);
  };

  const fillSampleData = () => {
    const sample: OthersFormData = {
      fullName: 'Rajesh K. Gowda',
      staffId: 'STF-ADM-402',
      designation: 'College Administrator',
    };
    setFormData(sample);
    setErrors({});
    setTouched({ fullName: true, staffId: true, designation: true });
  };

  return (
    <div className="w-full max-w-lg mx-auto px-4 sm:px-6 py-8 md:py-12">
      {/* Back button */}
      <div className="mb-6">
        <button
          onClick={onBack}
          type="button"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#737373] hover:text-[#202020] transition-colors focus:outline-none focus:ring-2 focus:ring-[#202020] rounded-md px-2 py-1 -ml-2"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>Back to roles</span>
        </button>
      </div>

      {/* Card container */}
      <div className="bg-white rounded-2xl border border-[#EAEAEA] p-6 sm:p-8 shadow-sm">
        {/* Header inside card */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FAFAFA] border border-[#EAEAEA] text-[#202020] text-xs font-semibold mb-2">
              <Building2Icon className="w-3.5 h-3.5" />
              <span>Staff & Operations</span>
            </div>
            <h2 className="text-2xl font-bold text-[#202020] tracking-tight">Staff & Administration</h2>
            <p className="text-xs text-[#737373] mt-1">
              For clerks, administrators, transit coordinators, and support staff.
            </p>
          </div>

          <button
            type="button"
            onClick={fillSampleData}
            title="Auto-fill sample staff details for demonstration"
            className="flex items-center gap-1 text-[11px] font-medium text-[#737373] hover:text-[#202020] bg-[#FAFAFA] hover:bg-[#EAEAEA] border border-[#EAEAEA] px-2.5 py-1 rounded-md transition-colors shrink-0"
          >
            <SparklesIcon className="w-3 h-3 text-[#202020]" />
            <span>Sample Data</span>
          </button>
        </div>

        {/* Demo Disclaimer Box */}
        <div className="mb-6 p-3 rounded-xl bg-[#FAFAFA] border border-[#EAEAEA] flex items-start gap-2.5 text-xs text-[#737373]">
          <AlertCircleIcon className="w-4 h-4 text-[#202020] shrink-0 mt-0.5" />
          <span>
            <strong className="text-[#202020] font-medium">Prototype Simulation:</strong> Personnel verification is simulated for prototype demonstration.
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Full Name */}
          <div>
            <label htmlFor="staffFullName" className="block text-xs font-semibold text-[#202020] mb-1.5">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#737373]">
                <UserIcon className="w-4 h-4" />
              </div>
              <input
                id="staffFullName"
                name="fullName"
                type="text"
                autoComplete="name"
                value={formData.fullName}
                onChange={handleChange}
                onBlur={() => handleBlur('fullName')}
                placeholder="e.g. Rajesh K. Gowda"
                aria-invalid={!!errors.fullName}
                aria-describedby={errors.fullName ? 'staffFullName-error' : undefined}
                className={`w-full pl-9 pr-3.5 py-2.5 text-sm rounded-xl bg-[#FAFAFA] border ${
                  errors.fullName
                    ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                    : 'border-[#EAEAEA] focus:border-[#202020] focus:ring-1 focus:ring-[#202020]'
                } text-[#202020] placeholder-[#737373]/60 focus:bg-white focus:outline-none transition-all`}
              />
            </div>
            {errors.fullName && touched.fullName && (
              <p id="staffFullName-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <AlertCircleIcon className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.fullName}</span>
              </p>
            )}
          </div>

          {/* Staff ID */}
          <div>
            <label htmlFor="staffId" className="block text-xs font-semibold text-[#202020] mb-1.5">
              Staff ID <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#737373]">
                <KeyRoundIcon className="w-4 h-4" />
              </div>
              <input
                id="staffId"
                name="staffId"
                type="text"
                value={formData.staffId}
                onChange={handleChange}
                onBlur={() => handleBlur('staffId')}
                placeholder="e.g. STF-ADM-402"
                aria-invalid={!!errors.staffId}
                aria-describedby={errors.staffId ? 'staffId-error' : undefined}
                className={`w-full pl-9 pr-3.5 py-2.5 text-sm rounded-xl bg-[#FAFAFA] border ${
                  errors.staffId
                    ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                    : 'border-[#EAEAEA] focus:border-[#202020] focus:ring-1 focus:ring-[#202020]'
                } text-[#202020] uppercase placeholder-[#737373]/60 focus:bg-white focus:outline-none transition-all font-mono tracking-wide`}
              />
            </div>
            {errors.staffId && touched.staffId && (
              <p id="staffId-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <AlertCircleIcon className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.staffId}</span>
              </p>
            )}
          </div>

          {/* Designation Dropdown */}
          <div>
            <label htmlFor="designation" className="block text-xs font-semibold text-[#202020] mb-1.5">
              Designation or Role <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#737373]">
                <BriefcaseIcon className="w-4 h-4" />
              </div>
              <select
                id="designation"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                onBlur={() => handleBlur('designation')}
                aria-invalid={!!errors.designation}
                aria-describedby={errors.designation ? 'designation-error' : undefined}
                className={`w-full pl-9 pr-8 py-2.5 text-sm rounded-xl bg-[#FAFAFA] border appearance-none ${
                  errors.designation
                    ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                    : 'border-[#EAEAEA] focus:border-[#202020] focus:ring-1 focus:ring-[#202020]'
                } text-[#202020] focus:bg-white focus:outline-none transition-all`}
              >
                <option value="" disabled>Select your designation or role</option>
                {DESIGNATIONS.filter(Boolean).map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-[#737373]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            {errors.designation && touched.designation && (
              <p id="designation-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <AlertCircleIcon className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.designation}</span>
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-[#202020] hover:bg-black text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#202020]"
            >
              {isLoading ? (
                <>
                  <LoaderIcon className="w-4 h-4 text-[#FFE0C2]" />
                  <span>Verifying Staff Credentials...</span>
                </>
              ) : (
                <span>Login to Staff Portal</span>
              )}
            </button>
          </div>
        </form>

        {/* Back link */}
        <div className="mt-6 pt-5 border-t border-[#EAEAEA] text-center">
          <button
            onClick={onBack}
            type="button"
            className="text-xs text-[#737373] hover:text-[#202020] font-medium transition-colors"
          >
            Not campus staff? <span className="underline">Change role</span>
          </button>
        </div>
      </div>
    </div>
  );
}
