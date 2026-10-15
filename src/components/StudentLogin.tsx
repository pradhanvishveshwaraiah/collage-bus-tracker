import React, { useState } from 'react';
import { 
  ArrowLeftIcon, 
  GraduationCapIcon, 
  MailIcon, 
  UserIcon, 
  HashIcon, 
  AlertCircleIcon, 
  LoaderIcon, 
  SparklesIcon 
} from './icons';
import { StudentFormData, UserSession } from '../types';

interface StudentLoginProps {
  onBack: () => void;
  onSuccess: (session: UserSession) => void;
}

export default function StudentLogin({ onBack, onSuccess }: StudentLoginProps) {
  const [formData, setFormData] = useState<StudentFormData>({
    fullName: '',
    gmailId: '',
    usn: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof StudentFormData, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof StudentFormData, boolean>>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateField = (field: keyof StudentFormData, value: string): string => {
    const trimmed = value.trim();
    if (!trimmed) {
      if (field === 'fullName') return 'Please enter your full name.';
      if (field === 'gmailId') return 'Please enter your Gmail address.';
      if (field === 'usn') return 'Please enter your University Seat Number (USN).';
    }

    if (field === 'fullName' && trimmed.length < 2) {
      return 'Name should be at least 2 characters.';
    }

    if (field === 'gmailId') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmed)) {
        return 'Please enter a valid email address.';
      }
      if (!trimmed.toLowerCase().endsWith('@gmail.com')) {
        return 'Please use your registered Gmail address (must end with @gmail.com).';
      }
    }

    if (field === 'usn') {
      if (trimmed.length < 5) {
        return 'USN must be at least 5 alphanumeric characters (e.g. 1MS21CS042).';
      }
      if (!/^[A-Za-z0-9]+$/.test(trimmed)) {
        return 'USN should contain letters and numbers only.';
      }
    }

    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name as keyof StudentFormData]) {
      const err = validateField(name as keyof StudentFormData, value);
      setErrors((prev) => ({ ...prev, [name]: err }));
    }
  };

  const handleBlur = (field: keyof StudentFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Partial<Record<keyof StudentFormData, string>> = {
      fullName: validateField('fullName', formData.fullName),
      gmailId: validateField('gmailId', formData.gmailId),
      usn: validateField('usn', formData.usn),
    };

    setTouched({ fullName: true, gmailId: true, usn: true });
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((err) => !!err);
    if (hasErrors) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onSuccess({
        role: 'student',
        fullName: formData.fullName.trim(),
        identifier: formData.usn.trim().toUpperCase(),
        identifierLabel: 'University Seat Number (USN)',
        email: formData.gmailId.trim().toLowerCase(),
        secondaryInfo: {
          label: 'Commuter Status',
          value: 'Enrolled Student Commuter',
        },
        loginTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
    }, 500);
  };

  const fillSampleData = () => {
    const sample: StudentFormData = {
      fullName: 'Aarav Sharma',
      gmailId: 'aarav.sharma24@gmail.com',
      usn: '1RV21CS042',
    };
    setFormData(sample);
    setErrors({});
    setTouched({ fullName: true, gmailId: true, usn: true });
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
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#E2F2FF] text-[#202020] text-xs font-semibold mb-2">
              <GraduationCapIcon className="w-3.5 h-3.5" />
              <span>Student Portal</span>
            </div>
            <h2 className="text-2xl font-bold text-[#202020] tracking-tight">Student Login</h2>
            <p className="text-xs text-[#737373] mt-1">
              Enter your student details to simulate access to the campus bus portal.
            </p>
          </div>

          <button
            type="button"
            onClick={fillSampleData}
            title="Auto-fill sample student details for demonstration"
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
            <strong className="text-[#202020] font-medium">Prototype Simulation:</strong> No university password is required. Form validates format and directs to the portal roadmap.
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-xs font-semibold text-[#202020] mb-1.5">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#737373]">
                <UserIcon className="w-4 h-4" />
              </div>
              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                value={formData.fullName}
                onChange={handleChange}
                onBlur={() => handleBlur('fullName')}
                placeholder="e.g. Aarav Sharma"
                aria-invalid={!!errors.fullName}
                aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                className={`w-full pl-9 pr-3.5 py-2.5 text-sm rounded-xl bg-[#FAFAFA] border ${
                  errors.fullName
                    ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                    : 'border-[#EAEAEA] focus:border-[#202020] focus:ring-1 focus:ring-[#202020]'
                } text-[#202020] placeholder-[#737373]/60 focus:bg-white focus:outline-none transition-all`}
              />
            </div>
            {errors.fullName && touched.fullName && (
              <p id="fullName-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <AlertCircleIcon className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.fullName}</span>
              </p>
            )}
          </div>

          {/* Gmail ID */}
          <div>
            <label htmlFor="gmailId" className="block text-xs font-semibold text-[#202020] mb-1.5">
              Gmail ID <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#737373]">
                <MailIcon className="w-4 h-4" />
              </div>
              <input
                id="gmailId"
                name="gmailId"
                type="email"
                autoComplete="email"
                value={formData.gmailId}
                onChange={handleChange}
                onBlur={() => handleBlur('gmailId')}
                placeholder="yourname@gmail.com"
                aria-invalid={!!errors.gmailId}
                aria-describedby={errors.gmailId ? 'gmailId-error' : undefined}
                className={`w-full pl-9 pr-3.5 py-2.5 text-sm rounded-xl bg-[#FAFAFA] border ${
                  errors.gmailId
                    ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                    : 'border-[#EAEAEA] focus:border-[#202020] focus:ring-1 focus:ring-[#202020]'
                } text-[#202020] placeholder-[#737373]/60 focus:bg-white focus:outline-none transition-all`}
              />
            </div>
            {errors.gmailId && touched.gmailId && (
              <p id="gmailId-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <AlertCircleIcon className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.gmailId}</span>
              </p>
            )}
            <p className="mt-1 text-[11px] text-[#737373]">
              Must be your Google account ending with @gmail.com.
            </p>
          </div>

          {/* USN */}
          <div>
            <label htmlFor="usn" className="block text-xs font-semibold text-[#202020] mb-1.5">
              University Seat Number (USN) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#737373]">
                <HashIcon className="w-4 h-4" />
              </div>
              <input
                id="usn"
                name="usn"
                type="text"
                value={formData.usn}
                onChange={handleChange}
                onBlur={() => handleBlur('usn')}
                placeholder="e.g. 1RV21CS042"
                aria-invalid={!!errors.usn}
                aria-describedby={errors.usn ? 'usn-error' : undefined}
                className={`w-full pl-9 pr-3.5 py-2.5 text-sm rounded-xl bg-[#FAFAFA] border ${
                  errors.usn
                    ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                    : 'border-[#EAEAEA] focus:border-[#202020] focus:ring-1 focus:ring-[#202020]'
                } text-[#202020] uppercase placeholder-[#737373]/60 focus:bg-white focus:outline-none transition-all font-mono tracking-wide`}
              />
            </div>
            {errors.usn && touched.usn && (
              <p id="usn-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <AlertCircleIcon className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.usn}</span>
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
                  <span>Validating Student Record...</span>
                </>
              ) : (
                <span>Login to Student Portal</span>
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
            Not a student? <span className="underline">Change role</span>
          </button>
        </div>
      </div>
    </div>
  );
}
