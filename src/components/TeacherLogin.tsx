import React, { useState } from 'react';
import { 
  ArrowLeftIcon, 
  BookOpenCheckIcon, 
  UserIcon, 
  Building2Icon, 
  BadgeCheckIcon, 
  AlertCircleIcon, 
  LoaderIcon, 
  SparklesIcon 
} from './icons';
import { TeacherFormData, UserSession } from '../types';

interface TeacherLoginProps {
  onBack: () => void;
  onSuccess: (session: UserSession) => void;
}

const DEPARTMENTS = [
  'Computer Science & Engineering',
  'Information Science & Engineering',
  'Electronics & Communication',
  'Electrical & Electronics',
  'Mechanical Engineering',
  'Civil Engineering',
  'Biotechnology',
  'Physics & Chemistry (Basic Sciences)',
  'Mathematics & Humanities',
  'Master of Business Administration (MBA)',
  'Other Department',
];

export default function TeacherLogin({ onBack, onSuccess }: TeacherLoginProps) {
  const [formData, setFormData] = useState<TeacherFormData>({
    teacherName: '',
    department: '',
    teacherId: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof TeacherFormData, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof TeacherFormData, boolean>>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateField = (field: keyof TeacherFormData, value: string): string => {
    const trimmed = value.trim();
    if (!trimmed) {
      if (field === 'teacherName') return 'Please enter your faculty/teacher name.';
      if (field === 'department') return 'Please select or enter your academic department.';
      if (field === 'teacherId') return 'Please enter your Teacher / Faculty ID.';
    }

    if (field === 'teacherName' && trimmed.length < 2) {
      return 'Name should be at least 2 characters.';
    }

    if (field === 'teacherId') {
      if (trimmed.length < 3) {
        return 'Teacher ID should be at least 3 characters (e.g. FAC-2041).';
      }
    }

    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name as keyof TeacherFormData]) {
      const err = validateField(name as keyof TeacherFormData, value);
      setErrors((prev) => ({ ...prev, [name]: err }));
    }
  };

  const handleBlur = (field: keyof TeacherFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Partial<Record<keyof TeacherFormData, string>> = {
      teacherName: validateField('teacherName', formData.teacherName),
      department: validateField('department', formData.department),
      teacherId: validateField('teacherId', formData.teacherId),
    };

    setTouched({ teacherName: true, department: true, teacherId: true });
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((err) => !!err);
    if (hasErrors) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onSuccess({
        role: 'teacher',
        fullName: formData.teacherName.trim(),
        identifier: formData.teacherId.trim().toUpperCase(),
        identifierLabel: 'Faculty ID',
        secondaryInfo: {
          label: 'Department',
          value: formData.department,
        },
        loginTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
    }, 500);
  };

  const fillSampleData = () => {
    const sample: TeacherFormData = {
      teacherName: 'Dr. Priya V. Raman',
      department: 'Computer Science & Engineering',
      teacherId: 'FAC-CS-108',
    };
    setFormData(sample);
    setErrors({});
    setTouched({ teacherName: true, department: true, teacherId: true });
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
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FFE0C2] text-[#202020] text-xs font-semibold mb-2">
              <BookOpenCheckIcon className="w-3.5 h-3.5" />
              <span>Faculty Portal</span>
            </div>
            <h2 className="text-2xl font-bold text-[#202020] tracking-tight">Teacher Login</h2>
            <p className="text-xs text-[#737373] mt-1">
              Sign in with your faculty details to access college transport schedules.
            </p>
          </div>

          <button
            type="button"
            onClick={fillSampleData}
            title="Auto-fill sample faculty details for demonstration"
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
            <strong className="text-[#202020] font-medium">Prototype Simulation:</strong> Faculty identity verification is simulated for testing the transit interface.
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Teacher Name */}
          <div>
            <label htmlFor="teacherName" className="block text-xs font-semibold text-[#202020] mb-1.5">
              Teacher Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#737373]">
                <UserIcon className="w-4 h-4" />
              </div>
              <input
                id="teacherName"
                name="teacherName"
                type="text"
                value={formData.teacherName}
                onChange={handleChange}
                onBlur={() => handleBlur('teacherName')}
                placeholder="e.g. Dr. Priya V. Raman"
                aria-invalid={!!errors.teacherName}
                aria-describedby={errors.teacherName ? 'teacherName-error' : undefined}
                className={`w-full pl-9 pr-3.5 py-2.5 text-sm rounded-xl bg-[#FAFAFA] border ${
                  errors.teacherName
                    ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                    : 'border-[#EAEAEA] focus:border-[#202020] focus:ring-1 focus:ring-[#202020]'
                } text-[#202020] placeholder-[#737373]/60 focus:bg-white focus:outline-none transition-all`}
              />
            </div>
            {errors.teacherName && touched.teacherName && (
              <p id="teacherName-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <AlertCircleIcon className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.teacherName}</span>
              </p>
            )}
          </div>

          {/* Department */}
          <div>
            <label htmlFor="department" className="block text-xs font-semibold text-[#202020] mb-1.5">
              Academic Department <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#737373]">
                <Building2Icon className="w-4 h-4" />
              </div>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                onBlur={() => handleBlur('department')}
                aria-invalid={!!errors.department}
                aria-describedby={errors.department ? 'department-error' : undefined}
                className={`w-full pl-9 pr-8 py-2.5 text-sm rounded-xl bg-[#FAFAFA] border appearance-none ${
                  errors.department
                    ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                    : 'border-[#EAEAEA] focus:border-[#202020] focus:ring-1 focus:ring-[#202020]'
                } text-[#202020] focus:bg-white focus:outline-none transition-all`}
              >
                <option value="" disabled>Select your academic department</option>
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-[#737373]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            {errors.department && touched.department && (
              <p id="department-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <AlertCircleIcon className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.department}</span>
              </p>
            )}
          </div>

          {/* Teacher ID */}
          <div>
            <label htmlFor="teacherId" className="block text-xs font-semibold text-[#202020] mb-1.5">
              Teacher ID / Faculty Code <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#737373]">
                <BadgeCheckIcon className="w-4 h-4" />
              </div>
              <input
                id="teacherId"
                name="teacherId"
                type="text"
                value={formData.teacherId}
                onChange={handleChange}
                onBlur={() => handleBlur('teacherId')}
                placeholder="e.g. FAC-CS-108"
                aria-invalid={!!errors.teacherId}
                aria-describedby={errors.teacherId ? 'teacherId-error' : undefined}
                className={`w-full pl-9 pr-3.5 py-2.5 text-sm rounded-xl bg-[#FAFAFA] border ${
                  errors.teacherId
                    ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                    : 'border-[#EAEAEA] focus:border-[#202020] focus:ring-1 focus:ring-[#202020]'
                } text-[#202020] uppercase placeholder-[#737373]/60 focus:bg-white focus:outline-none transition-all font-mono tracking-wide`}
              />
            </div>
            {errors.teacherId && touched.teacherId && (
              <p id="teacherId-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <AlertCircleIcon className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.teacherId}</span>
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
                  <span>Verifying Faculty Record...</span>
                </>
              ) : (
                <span>Login as Faculty</span>
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
            Not a teacher? <span className="underline">Change role</span>
          </button>
        </div>
      </div>
    </div>
  );
}
