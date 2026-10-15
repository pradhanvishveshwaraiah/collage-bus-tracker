import React from 'react';
import { 
  BusIcon, 
  ClockIcon, 
  MapPinIcon, 
  RadioIcon, 
  BellIcon, 
  LogOutIcon, 
  HomeIcon, 
  CheckCircleIcon, 
  CompassIcon, 
  ShieldAlertIcon 
} from './icons';
import { UserSession } from '../types';

interface UnderDevelopmentProps {
  session: UserSession;
  onGoHome: () => void;
  onLogout: () => void;
  onOpenInfo: (tab: 'help' | 'routes' | 'faq' | 'status') => void;
}

export default function UnderDevelopment({
  session,
  onGoHome,
  onLogout,
  onOpenInfo,
}: UnderDevelopmentProps) {
  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'student':
        return 'Student Commuter';
      case 'teacher':
        return 'Faculty Member';
      case 'others':
        return 'Campus Staff & Administration';
      default:
        return role;
    }
  };

  const getRoleBadgeStyle = (role: string) => {
    switch (role) {
      case 'student':
        return 'bg-[#E2F2FF] text-[#202020] border-[#EAEAEA]';
      case 'teacher':
        return 'bg-[#FFE0C2] text-[#202020] border-[#EAEAEA]';
      default:
        return 'bg-[#FAFAFA] text-[#202020] border-[#EAEAEA]';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Session Confirmation Banner */}
      <div className="mb-8 p-4 rounded-2xl bg-[#FAFAFA] border border-[#EAEAEA] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white border border-[#EAEAEA] flex items-center justify-center text-[#202020] shrink-0 shadow-sm">
            <CheckCircleIcon className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs text-[#737373]">
              <span>Demo Session Active</span>
              <span aria-hidden="true">·</span>
              <span>Logged in at {session.loginTime}</span>
            </div>
            <div className="text-sm font-bold text-[#202020] flex items-center gap-2">
              <span>{session.fullName}</span>
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${getRoleBadgeStyle(session.role)}`}>
                {getRoleDisplayName(session.role)}
              </span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onGoHome}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#202020] bg-white hover:bg-[#FAFAFA] border border-[#EAEAEA] rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-[#202020]"
          >
            <HomeIcon className="w-3.5 h-3.5 text-[#737373]" />
            <span>Back to Home</span>
          </button>
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#202020] hover:bg-black rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#202020]"
          >
            <LogOutIcon className="w-3.5 h-3.5 text-[#FFE0C2]" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Under Development Container */}
      <div className="bg-white rounded-3xl border border-[#EAEAEA] p-6 sm:p-10 shadow-sm text-center relative overflow-hidden">
        {/* Decorative soft glows */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFE0C2]/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#E2F2FF]/60 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto">
          {/* Status Indicator */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFE0C2]/80 border border-[#EAEAEA] text-xs font-semibold text-[#202020] mb-6">
            <RadioIcon className="w-3 h-3 text-[#202020] animate-pulse" />
            <span>Coming Soon</span>
          </div>

          {/* Simple transportation illustration / bus icon */}
          <div className="w-20 h-20 mx-auto rounded-3xl bg-[#E2F2FF] border border-[#EAEAEA] shadow-sm flex items-center justify-center text-[#202020] mb-6">
            <BusIcon className="w-10 h-10 text-[#202020]" />
          </div>

          {/* Required Heading */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#202020] tracking-tight mb-4">
            We're Building Something Useful.
          </h1>

          {/* Required Supporting Text */}
          <p className="text-base text-[#737373] leading-relaxed mb-8">
            The College Bus Tracking System is currently under development. Bus locations, route information, and live tracking will be available in a future update.
          </p>

          {/* Verified Session Identity Details Card */}
          <div className="rounded-2xl bg-[#FAFAFA] border border-[#EAEAEA] p-5 mb-8 text-left">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#737373] mb-3">
              Authenticated Profile Parameters
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-[#737373] block mb-0.5">Assigned Role:</span>
                <span className="font-semibold text-[#202020] capitalize">{session.role}</span>
              </div>
              <div>
                <span className="text-[#737373] block mb-0.5">{session.identifierLabel}:</span>
                <span className="font-semibold text-[#202020] font-mono tracking-wide">{session.identifier}</span>
              </div>
              {session.secondaryInfo && (
                <div>
                  <span className="text-[#737373] block mb-0.5">{session.secondaryInfo.label}:</span>
                  <span className="font-semibold text-[#202020]">{session.secondaryInfo.value}</span>
                </div>
              )}
              {session.email && (
                <div className="sm:col-span-3">
                  <span className="text-[#737373] block mb-0.5">Notification Channel:</span>
                  <span className="font-semibold text-[#202020] font-mono">{session.email}</span>
                </div>
              )}
            </div>
          </div>

          {/* Explicit Notice: GPS is NOT available yet */}
          <div className="p-4 rounded-2xl bg-[#E2F2FF]/50 border border-[#EAEAEA] text-left flex items-start gap-3 mb-8">
            <ShieldAlertIcon className="w-5 h-5 text-[#202020] shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <span className="font-bold text-[#202020] block">GPS Telemetry Scope Notice</span>
              <p className="text-[#737373] leading-relaxed">
                As per system design specifications, live tracking and vehicle telemetry are strictly disabled during this phase. No simulated or misleading GPS positions are shown. Real-time updates will be activated once hardware validation on all 18 campus buses is finalized.
              </p>
            </div>
          </div>

          {/* What to Expect in Phase 2 */}
          <div className="text-left mb-8">
            <h3 className="text-xs font-semibold text-[#202020] uppercase tracking-wider mb-3">
              Upcoming Transportation Features
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl border border-[#EAEAEA] bg-white flex items-start gap-2.5">
                <CompassIcon className="w-4 h-4 text-[#202020] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#202020] block mb-0.5">Live Bus Journey Status</span>
                  <span className="text-[#737373]">Real-time trip departure confirmations directly from campus drivers.</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-[#EAEAEA] bg-white flex items-start gap-2.5">
                <MapPinIcon className="w-4 h-4 text-[#202020] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#202020] block mb-0.5">Geofenced Stop Alerts</span>
                  <span className="text-[#737373]">Notifications when your bus approaches your pickup landmark.</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-[#EAEAEA] bg-white flex items-start gap-2.5">
                <ClockIcon className="w-4 h-4 text-[#202020] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#202020] block mb-0.5">Dynamic ETA Calculations</span>
                  <span className="text-[#737373]">Accurate arrival predictions factoring in morning campus traffic.</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-[#EAEAEA] bg-white flex items-start gap-2.5">
                <BellIcon className="w-4 h-4 text-[#202020] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#202020] block mb-0.5">Emergency & Delay Broadcasts</span>
                  <span className="text-[#737373]">Instant notifications regarding route diversions or mechanical delays.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onGoHome}
              className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-[#202020] bg-white hover:bg-[#FAFAFA] border border-[#EAEAEA] rounded-xl transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#202020]"
            >
              Back to Home
            </button>
            <button
              onClick={onLogout}
              className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-white bg-[#202020] hover:bg-black rounded-xl transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#202020]"
            >
              Logout Demo Session
            </button>
            <button
              onClick={() => onOpenInfo('routes')}
              className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-[#202020] bg-[#FFE0C2] hover:bg-[#ffd6b0] rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-[#202020]"
            >
              View Route Schedules
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
