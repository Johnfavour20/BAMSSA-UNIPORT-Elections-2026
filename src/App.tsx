import React, { useState } from 'react';
import { ElectionProvider, useElection } from './context/ElectionContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { StatusStrip } from './components/StatusStrip';
import { AboutSection } from './components/AboutSection';
import { VotingProcess } from './components/VotingProcess';
import { IntegritySection } from './components/IntegritySection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';

import { EligibilityModal } from './components/EligibilityModal';
import { VoterLoginModal } from './components/VoterLoginModal';
import { ElecoAdminModal } from './components/ElecoAdminModal';

import { VotingBoothView } from './views/VotingBoothView';
import { LiveMonitorView } from './views/LiveMonitorView';
import { RegistrationView } from './views/RegistrationView';
import { AdminPortalView } from './views/AdminPortalView';
import { GuidelinesView } from './views/GuidelinesView';
import { ElectionDetailsView } from './views/ElectionDetailsView';
import { EligibilityView } from './views/EligibilityView';
import { VoterLoginView } from './views/VoterLoginView';
import { ForgotPasswordView } from './views/ForgotPasswordView';
import { VoterDashboardView } from './views/VoterDashboardView';
import { AccreditationStatusView } from './views/AccreditationStatusView';

function ElectionAppContent() {
  const { currentVoter, isAdminAuthenticated, logoutAdmin, loginVoter } = useElection();

  const [currentView, setCurrentView] = useState<string>('home');
  const [showEligibilityModal, setShowEligibilityModal] = useState(false);
  const [showVoterLoginModal, setShowVoterLoginModal] = useState(false);
  const [showElecoAdminModal, setShowElecoAdminModal] = useState(false);

  const handleStepClick = (stepIndex: number) => {
    if (stepIndex === 1) {
      setCurrentView('eligibility');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (stepIndex === 2) {
      setCurrentView('register');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (stepIndex === 3) {
      setCurrentView('vote');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (stepIndex === 4) {
      setCurrentView('live-monitor');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8ff] text-[#131b2e] selection:bg-[#dae2fd] selection:text-[#003f93]">
      {/* Universal Header */}
      <Header
        currentView={currentView}
        setCurrentView={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenEligibilityModal={() => setShowEligibilityModal(true)}
        onOpenVoterModal={() => setShowVoterLoginModal(true)}
        onOpenElecoModal={() => {
          if (isAdminAuthenticated) {
            setCurrentView('admin');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            setShowElecoAdminModal(true);
          }
        }}
      />

      {/* Main View Switcher */}
      <main className="flex-1">
        {currentView === 'home' && (
          <div className="space-y-0">
            {/* Hero Section */}
            <Hero
              onCheckEligibility={() => {
                setCurrentView('eligibility');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onCastVote={() => {
                setCurrentView('vote');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onLiveResults={() => {
                setCurrentView('live-monitor');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Real-time Status Strip */}
            <StatusStrip
              onOpenLiveMonitor={() => {
                setCurrentView('live-monitor');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* About / Mission Section */}
            <AboutSection />

            {/* How Voting Works 4-Step Grid */}
            <VotingProcess onStepClick={handleStepClick} />

            {/* Electoral Integrity & Biometric Security Section */}
            <IntegritySection />

            {/* Final Call to Action */}
            <FinalCTA
              onCheckEligibility={() => {
                setCurrentView('eligibility');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onViewGuidelines={() => {
                setCurrentView('guidelines');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {currentView === 'elections' && (
          <ElectionDetailsView
            onCheckEligibility={() => {
              setCurrentView('eligibility');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenLiveMonitor={() => {
              setCurrentView('live-monitor');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenVotingBooth={() => {
              setCurrentView('vote');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateHome={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateResults={() => {
              setCurrentView('live-monitor');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'vote' && (
          <VotingBoothView
            onBackToHome={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenLiveMonitor={() => {
              setCurrentView('live-monitor');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenEligibility={() => setShowEligibilityModal(true)}
          />
        )}

        {currentView === 'live-monitor' && (
          <LiveMonitorView
            onBackToHome={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenVotingBooth={() => {
              setCurrentView('vote');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'register' && (
          <RegistrationView
            onSuccessNavigateToVote={() => {
              setCurrentView('vote');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenEligibility={() => {
              setCurrentView('eligibility');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToLogin={() => {
              setCurrentView('login');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToAccreditationStatus={() => {
              setCurrentView('accreditation-status');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'dashboard' && (
          <VoterDashboardView
            onNavigateToElections={() => {
              setCurrentView('elections');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToLiveMonitor={() => {
              setCurrentView('live-monitor');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToGuidelines={() => {
              setCurrentView('guidelines');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToVote={() => {
              setCurrentView('vote');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'accreditation-status' && (
          <AccreditationStatusView
            onNavigateToDashboard={() => {
              setCurrentView(currentVoter ? 'dashboard' : 'home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToElectionDetails={() => {
              setCurrentView('elections');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'login' && (
          <VoterLoginView
            onSuccessNavigateToVote={() => {
              setCurrentView('dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToRegister={() => {
              setCurrentView('register');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToEligibility={() => {
              setCurrentView('eligibility');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToForgotPassword={() => {
              setCurrentView('forgot-password');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'forgot-password' && (
          <ForgotPasswordView
            onNavigateToLogin={() => {
              setCurrentView('login');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToRegister={() => {
              setCurrentView('register');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'admin' && (
          <AdminPortalView
            onLogout={() => {
              logoutAdmin();
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'guidelines' && (
          <GuidelinesView
            onOpenVotingBooth={() => {
              setCurrentView('vote');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenEligibility={() => setShowEligibilityModal(true)}
          />
        )}

        {currentView === 'eligibility' && (
          <EligibilityView
            onNavigateToLogin={(voter) => {
              if (voter) {
                loginVoter(voter.matricNumber, voter.voterPin);
                setCurrentView('dashboard');
              } else {
                setCurrentView('login');
              }
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToRegister={() => {
              setCurrentView('register');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Universal Footer */}
      <Footer
        setCurrentView={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenEligibility={() => setShowEligibilityModal(true)}
        onOpenElecoModal={() => {
          if (isAdminAuthenticated) {
            setCurrentView('admin');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            setShowElecoAdminModal(true);
          }
        }}
        onOpenVoterModal={() => setShowVoterLoginModal(true)}
      />

      {/* Global Modals */}
      <EligibilityModal
        isOpen={showEligibilityModal}
        onClose={() => setShowEligibilityModal(false)}
        onProceedToVote={(voter) => {
          loginVoter(voter.matricNumber, voter.voterPin);
          setCurrentView('vote');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      <VoterLoginModal
        isOpen={showVoterLoginModal}
        onClose={() => setShowVoterLoginModal(false)}
        onSuccess={() => {
          setCurrentView('vote');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenCheckEligibility={() => setShowEligibilityModal(true)}
      />

      <ElecoAdminModal
        isOpen={showElecoAdminModal}
        onClose={() => setShowElecoAdminModal(false)}
        onSuccess={() => {
          setCurrentView('admin');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <ElectionProvider>
      <ElectionAppContent />
    </ElectionProvider>
  );
}
