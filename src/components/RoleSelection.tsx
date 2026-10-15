import React from 'react';
import { GraduationCapIcon, BookOpenCheckIcon, Building2Icon, BusIcon } from './icons';
import RoleCard from './RoleCard';
import { UserRole } from '../types';

interface RoleSelectionProps {
  onSelectRole: (role: UserRole) => void;
  onOpenInfo?: (tab: 'help' | 'routes' | 'faq' | 'status') => void;
}

export default function RoleSelection({ onSelectRole }: RoleSelectionProps) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Decorative top icon & centered brand title */}
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10 md:mb-12">
        <div className="relative mb-5">
          {/* Subtle decorative background shapes using light orange and very light blue */}
          <div className="absolute -top-3 -left-3 w-16 h-16 rounded-full bg-[#FFE0C2]/50 blur-md pointer-events-none" />
          <div className="absolute -bottom-2 -right-3 w-16 h-16 rounded-full bg-[#E2F2FF] blur-md pointer-events-none" />
          
          <div className="relative w-16 h-16 rounded-2xl bg-white border border-[#EAEAEA] shadow-sm flex items-center justify-center text-[#202020]">
            <BusIcon className="w-8 h-8 text-[#202020]" />
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#202020] tracking-tight mb-3">
          College Bus Tracking System
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl font-medium text-[#202020] mb-2">
          Your campus commute, made simpler.
        </p>

        {/* Supporting text */}
        <p className="text-sm text-[#737373] leading-relaxed max-w-lg">
          Sign in to access your college transportation portal. Select your designated role below to continue to the demo login.
        </p>
      </div>

      {/* Role Selection Cards: 3-column on desktop, stacked on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {/* Student Card */}
        <RoleCard
          role="student"
          title="Student"
          description="Access your student transportation portal."
          badgeText="Learner Commute"
          accentBg="#E2F2FF"
          icon={<GraduationCapIcon className="w-6 h-6 text-[#202020]" />}
          onSelect={onSelectRole}
        />

        {/* Teacher Card */}
        <RoleCard
          role="teacher"
          title="Teacher"
          description="Access transportation information for faculty."
          badgeText="Faculty Transit"
          accentBg="#FFE0C2"
          icon={<BookOpenCheckIcon className="w-6 h-6 text-[#202020]" />}
          onSelect={onSelectRole}
        />

        {/* Others Card */}
        <RoleCard
          role="others"
          title="Others"
          description="Access the portal for college administration and staff."
          badgeText="Campus Operations"
          accentBg="#FAFAFA"
          icon={<Building2Icon className="w-6 h-6 text-[#202020]" />}
          onSelect={onSelectRole}
        />
      </div>
    </div>
  );
}
