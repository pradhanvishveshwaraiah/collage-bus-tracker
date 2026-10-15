import React, { useState } from 'react';
import Header from './components/Header';
import RoleSelection from './components/RoleSelection';
import StudentLogin from './components/StudentLogin';
import TeacherLogin from './components/TeacherLogin';
import OthersLogin from './components/OthersLogin';
import UnderDevelopment from './components/UnderDevelopment';
import InfoModal from './components/InfoModal';
import { UserRole, UserSession } from './types';

type ViewState = 'landing' | 'login' | 'under-development';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [session, setSession] = useState<UserSession | null>(null);

  // Info modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<'help' | 'routes' | 'faq' | 'status'>('help');

  const handleSelectRole = (role: UserRole) => {
    setSelectedRole(role);
    setCurrentView('login');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToRoles = () => {
    setSelectedRole(null);
    setCurrentView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = (newSession: UserSession) => {
    setSession(newSession);
    setCurrentView('under-development');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setSession(null);
    setSelectedRole(null);
    setCurrentView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    setCurrentView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenInfo = (tab: 'help' | 'routes' | 'faq' | 'status') => {
    setModalTab(tab);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#202020] selection:bg-[#FFE0C2] selection:text-[#202020]">
      {/* Universal Top Bar */}
      <Header
        currentSession={session}
        onLogout={handleLogout}
        onOpenInfo={handleOpenInfo}
        onGoHome={handleGoHome}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col justify-center">
        {currentView === 'landing' && (
          <RoleSelection
            onSelectRole={handleSelectRole}
            onOpenInfo={handleOpenInfo}
          />
        )}

        {currentView === 'login' && selectedRole === 'student' && (
          <StudentLogin
            onBack={handleBackToRoles}
            onSuccess={handleLoginSuccess}
          />
        )}

        {currentView === 'login' && selectedRole === 'teacher' && (
          <TeacherLogin
            onBack={handleBackToRoles}
            onSuccess={handleLoginSuccess}
          />
        )}

        {currentView === 'login' && selectedRole === 'others' && (
          <OthersLogin
            onBack={handleBackToRoles}
            onSuccess={handleLoginSuccess}
          />
        )}

        {currentView === 'under-development' && session && (
          <UnderDevelopment
            session={session}
            onGoHome={handleGoHome}
            onLogout={handleLogout}
            onOpenInfo={handleOpenInfo}
          />
        )}
      </main>

      {/* Info & Helpline Modal */}
      <InfoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        activeTab={modalTab}
        setActiveTab={setModalTab}
      />
    </div>
  );
}
