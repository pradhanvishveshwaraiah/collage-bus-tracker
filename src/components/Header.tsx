import React from 'react';
import { BusIcon, LogOutIcon, HelpCircleIcon, UserIcon } from './icons';
import { UserSession } from '../types';

interface HeaderProps {
  currentSession: UserSession | null;
  onLogout: () => void;
  onOpenInfo: (tab: 'help' | 'routes' | 'faq' | 'status') => void;
  onGoHome: () => void;
}

export default function Header({ currentSession, onLogout, onOpenInfo, onGoHome }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-[#EAEAEA]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={onGoHome}
          className="flex items-center gap-2.5 text-left group focus:outline-none focus:ring-2 focus:ring-[#202020] rounded-lg p-1 transition-transform"
        >
          <div className="w-9 h-9 rounded-xl bg-[#FFE0C2] flex items-center justify-center text-[#202020] shadow-sm group-hover:bg-[#ffd6b0] transition-colors">
            <BusIcon className="w-5 h-5 text-[#202020]" />
          </div>
          <span className="text-base font-bold tracking-tight text-[#202020] whitespace-nowrap shrink-0">
            College Bus Tracking System
          </span>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-[#737373]">
          <button
            onClick={() => onOpenInfo('routes')}
            className="hover:text-[#202020] transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Route Schedules
          </button>
          <button
            onClick={() => onOpenInfo('help')}
            className="hover:text-[#202020] transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Transport Desk
          </button>
          <button
            onClick={() => onOpenInfo('faq')}
            className="hover:text-[#202020] transition-colors whitespace-nowrap shrink-0 py-1"
          >
            FAQ
          </button>
          <button
            onClick={() => onOpenInfo('status')}
            className="hover:text-[#202020] transition-colors whitespace-nowrap shrink-0 py-1 flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
            System Status
          </button>
        </nav>

        {/* Zone 3: Action */}
        <div className="flex items-center gap-3 shrink-0">
          {currentSession ? (
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#202020] bg-[#FAFAFA] border border-[#EAEAEA] px-2.5 py-1.5 rounded-lg">
                <UserIcon className="w-3.5 h-3.5 text-[#737373]" />
                <span className="font-medium max-w-[120px] truncate">{currentSession.fullName}</span>
                <span className="text-[#737373]">({currentSession.role})</span>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#202020] bg-white border border-[#EAEAEA] rounded-lg hover:bg-[#FAFAFA] transition-colors whitespace-nowrap shrink-0 focus:outline-none focus:ring-2 focus:ring-[#202020]"
                title="Log out from current demo session"
              >
                <LogOutIcon className="w-3.5 h-3.5 text-[#737373]" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => onOpenInfo('help')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-[#202020] bg-[#FAFAFA] hover:bg-[#EAEAEA] border border-[#EAEAEA] rounded-lg transition-colors whitespace-nowrap shrink-0 focus:outline-none focus:ring-2 focus:ring-[#202020]"
            >
              <HelpCircleIcon className="w-3.5 h-3.5 text-[#737373]" />
              <span>Campus Helpline</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
