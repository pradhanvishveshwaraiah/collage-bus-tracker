import React from 'react';
import { 
  XIcon, 
  PhoneIcon, 
  ClockIcon, 
  AlertCircleIcon 
} from './icons';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: 'help' | 'routes' | 'faq' | 'status';
  setActiveTab: (tab: 'help' | 'routes' | 'faq' | 'status') => void;
}

export default function InfoModal({ isOpen, onClose, activeTab, setActiveTab }: InfoModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-[#EAEAEA] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EAEAEA] bg-[#FAFAFA]">
          <h2 id="modal-title" className="text-base font-semibold text-[#202020]">
            Campus Transportation Information
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 text-[#737373] hover:text-[#202020] hover:bg-[#EAEAEA] rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#202020]"
            aria-label="Close dialog"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Tab navigation */}
        <div className="flex items-center gap-1 px-6 pt-3 border-b border-[#EAEAEA] bg-white text-xs font-medium">
          <button
            onClick={() => setActiveTab('help')}
            className={`pb-2.5 px-3 border-b-2 transition-colors ${
              activeTab === 'help'
                ? 'border-[#202020] text-[#202020] font-semibold'
                : 'border-transparent text-[#737373] hover:text-[#202020]'
            }`}
          >
            Help & Contacts
          </button>
          <button
            onClick={() => setActiveTab('routes')}
            className={`pb-2.5 px-3 border-b-2 transition-colors ${
              activeTab === 'routes'
                ? 'border-[#202020] text-[#202020] font-semibold'
                : 'border-transparent text-[#737373] hover:text-[#202020]'
            }`}
          >
            General Route Info
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`pb-2.5 px-3 border-b-2 transition-colors ${
              activeTab === 'faq'
                ? 'border-[#202020] text-[#202020] font-semibold'
                : 'border-transparent text-[#737373] hover:text-[#202020]'
            }`}
          >
            FAQ
          </button>
          <button
            onClick={() => setActiveTab('status')}
            className={`pb-2.5 px-3 border-b-2 transition-colors ${
              activeTab === 'status'
                ? 'border-[#202020] text-[#202020] font-semibold'
                : 'border-transparent text-[#737373] hover:text-[#202020]'
            }`}
          >
            System Status
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto text-sm text-[#202020] space-y-4">
          {activeTab === 'help' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#FAFAFA] border border-[#EAEAEA] space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#737373]">
                  <PhoneIcon className="w-4 h-4 text-[#202020]" />
                  Central Transport Cell
                </div>
                <p className="text-xs text-[#737373]">
                  For urgent campus transport queries, bus passes, or lost-and-found items aboard college buses:
                </p>
                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="font-semibold block text-[#202020]">Chief Transport Officer:</span>
                    <span className="text-[#737373]">+91 (080) 2360-1122 (Ext. 402)</span>
                  </div>
                  <div>
                    <span className="font-semibold block text-[#202020]">Helpline / Control Room:</span>
                    <span className="text-[#737373]">+91 98450 12345</span>
                  </div>
                  <div>
                    <span className="font-semibold block text-[#202020]">Transport Desk Email:</span>
                    <span className="text-[#737373]">transport-office@college.edu</span>
                  </div>
                  <div>
                    <span className="font-semibold block text-[#202020]">Office Location:</span>
                    <span className="text-[#737373]">Block 4, Ground Floor, Gate 2</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#E2F2FF]/60 border border-[#EAEAEA] flex items-start gap-3">
                <AlertCircleIcon className="w-5 h-5 text-[#202020] shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <div className="font-semibold text-[#202020]">Prototype Notice</div>
                  <div className="text-[#737373]">
                    This application is currently in its initial phase (Login & Interface Architecture). No real credentials or student passwords are collected or verified against institutional databases.
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'routes' && (
            <div className="space-y-3">
              <div className="text-xs text-[#737373]">
                The college operates 18 dedicated commuter routes connecting major transit junctions across the city.
              </div>
              <div className="space-y-2">
                {[
                  { route: 'Route 1 - North Corridor', start: 'Majestic Metro Station', dept: '07:15 AM', stops: 'Hebbal, Yelahanka, Campus Gate 1' },
                  { route: 'Route 4 - Tech Park Express', start: 'Electronic City Phase 1', dept: '07:05 AM', stops: 'Silk Board, Koramangala, Indiranagar, Campus Gate 2' },
                  { route: 'Route 7 - West Line', start: 'Rajajinagar 1st Block', dept: '07:30 AM', stops: 'Malleshwaram, Yeshwantpur, Campus Gate 1' },
                  { route: 'Route 11 - South Hub', start: 'Banashankari BDA Complex', dept: '07:10 AM', stops: 'Jayanagar 4th Block, Lalbagh, Campus Gate 3' },
                ].map((item, idx) => (
                  <div key={idx} className="p-3 rounded-lg border border-[#EAEAEA] bg-[#FAFAFA] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div>
                      <div className="font-semibold text-[#202020]">{item.route}</div>
                      <div className="text-[#737373]">Starts: {item.start} · Stops: {item.stops}</div>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#202020] shrink-0 font-medium bg-white px-2.5 py-1 rounded border border-[#EAEAEA]">
                      <ClockIcon className="w-3.5 h-3.5 text-[#737373]" />
                      Departs {item.dept}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-[#737373] italic">
                * Real-time GPS movement and driver telemetry will become live in Phase 2.
              </p>
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-lg border border-[#EAEAEA] bg-[#FAFAFA] space-y-1">
                <div className="font-semibold text-xs text-[#202020]">How do I register for college bus transportation?</div>
                <div className="text-xs text-[#737373]">
                  Bus pass applications open during semester enrollment through the Student Affairs / Transport Cell at Gate 2.
                </div>
              </div>
              <div className="p-3.5 rounded-lg border border-[#EAEAEA] bg-[#FAFAFA] space-y-1">
                <div className="font-semibold text-xs text-[#202020]">When will live bus tracking be enabled?</div>
                <div className="text-xs text-[#737373]">
                  GPS onboard units are currently being installed and calibrated across the 18 buses. The live map interface is scheduled for release in the upcoming semester release.
                </div>
              </div>
              <div className="p-3.5 rounded-lg border border-[#EAEAEA] bg-[#FAFAFA] space-y-1">
                <div className="font-semibold text-xs text-[#202020]">Can faculty and non-teaching staff use the tracking portal?</div>
                <div className="text-xs text-[#737373]">
                  Yes. Dedicated role profiles exist for Teachers and Other Staff members (Administration, Clerks, Bus staff) with role-relevant schedules.
                </div>
              </div>
            </div>
          )}

          {activeTab === 'status' && (
            <div className="space-y-3">
              <div className="p-4 rounded-xl border border-[#EAEAEA] bg-[#FAFAFA] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#202020]">Phase 1: User Experience & Authentication UI</span>
                  <span className="text-xs font-medium text-[#202020] bg-[#FFE0C2] px-2 py-0.5 rounded">Active Prototype</span>
                </div>
                <div className="w-full bg-[#EAEAEA] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#202020] h-full w-2/5 rounded-full" />
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-[#737373] pt-1">
                  <div>· Role-Specific Login Forms: Complete</div>
                  <div>· Form Validation: Active</div>
                  <div>· Hardware GPS Transponders: In Fleet Testing</div>
                  <div>· Map Dashboard: Under Development</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#EAEAEA] bg-[#FAFAFA] flex items-center justify-between">
          <span className="text-xs text-[#737373]">College Campus Transport Portal</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-white bg-[#202020] hover:bg-black rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#202020]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
