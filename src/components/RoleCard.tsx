import React from 'react';
import { ArrowRightIcon } from './icons';
import { UserRole } from '../types';

interface RoleCardProps {
  role: UserRole;
  title: string;
  description: string;
  icon: React.ReactNode;
  accentBg: string;
  badgeText: string;
  onSelect: (role: UserRole) => void;
}

export default function RoleCard({
  role,
  title,
  description,
  icon,
  accentBg,
  badgeText,
  onSelect,
}: RoleCardProps) {
  return (
    <div
      onClick={() => onSelect(role)}
      className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white border border-[#EAEAEA] hover:border-[#202020] transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md text-left"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(role);
        }
      }}
      aria-label={`Select ${title} role`}
    >
      <div>
        {/* Top Icon and Badge indicator */}
        <div className="flex items-center justify-between mb-5">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-105"
            style={{ backgroundColor: accentBg }}
          >
            {icon}
          </div>
          <span className="text-[11px] font-medium text-[#737373] tracking-wider uppercase">
            {badgeText}
          </span>
        </div>

        {/* Role Name */}
        <h3 className="text-xl font-bold text-[#202020] mb-2 tracking-tight group-hover:text-black">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-[#737373] leading-relaxed mb-6">
          {description}
        </p>
      </div>

      {/* Action / Continue button */}
      <div className="pt-4 border-t border-[#EAEAEA] flex items-center justify-between">
        <span className="text-xs font-semibold text-[#202020] group-hover:underline flex items-center gap-1.5">
          Continue as {title}
        </span>
        <div className="w-8 h-8 rounded-lg bg-[#FAFAFA] border border-[#EAEAEA] flex items-center justify-center text-[#202020] group-hover:bg-[#202020] group-hover:text-white transition-colors duration-200">
          <ArrowRightIcon className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </div>
      </div>
    </div>
  );
}
