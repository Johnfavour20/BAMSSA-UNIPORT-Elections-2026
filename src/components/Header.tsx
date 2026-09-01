import React from 'react';
import { useElection } from '../context/ElectionContext';
import { ShieldCheck, LogOut, Vote, KeyRound, Menu, X, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  onOpenEligibility: () => void;
  onOpenElecoModal: () => void;
  onOpenVoterModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  setCurrentView,
  onOpenEligibility,
  onOpenElecoModal,
  onOpenVoterModal,
}) => {
  const { currentVoter, logoutVoter, isAdminLoggedIn, logoutAdmin } = useElection();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    ...(currentVoter ? [{ id: 'dashboard', label: 'Dashboard', action: () => setCurrentView('dashboard') }] : []),
    { id: 'elections', label: 'Elections', action: () => setCurrentView('elections') },
    { id: 'eligibility', label: 'Eligibility', action: () => setCurrentView('eligibility') },
    { id: 'live-monitor', label: 'Live Monitor', action: () => setCurrentView('live-monitor') },
    { id: 'results', label: 'Results', action: () => setCurrentView('live-monitor') },
    { 
      id: 'about', 
      label: 'About', 
      action: () => {
        if (currentView !== 'home') {
          setCurrentView('home');
          setTimeout(() => {
            document.getElementById('bamssa-about-section')?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        } else {
          document.getElementById('bamssa-about-section')?.scrollIntoView({ behavior: 'smooth' });
        }
      } 
    },
  ];

  return (
    <header className="sticky top-0 z-50 flex justify-between items-center w-full px-4 sm:px-6 lg:px-8 h-20 bg-white shadow-xs border-b border-[#c2c6d5]/70 transition-all">
      {/* Brand & Logo */}
      <div 
        id="bamssa-brand-logo"
        className="flex items-center gap-3 cursor-pointer select-none"
        onClick={() => {
          if (currentVoter) {
            setCurrentView('dashboard');
          } else {
            setCurrentView('home');
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        <img
          alt="BAMSSA Logo"
          className="h-10 w-10 object-contain rounded-md"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDA9DvvsvOSf0bD4hnzLJ8fOuOc26kxMSibbEFYOiTOnbmnkZF3Niej3JjshkKLJ-nG31Nan0dnDGxNMhYPZOLQRrn9B_gaYDbWTw8FpsC3wl255Zod6WC2bkn3zgtXSKITlrxh6T-GIrnonAw_OkjURVxxWhyLCkFDsWg7UZ6mGoERaI6jiNfBcA_TiLx5rUK7po01U2DGfL4Vuc_ydugilMknknO_p3sOnV1DBvUb2pKXdgWJn8UQ"
        />
        <span className="text-lg font-bold text-[#003f93] tracking-tight">
          BAMSSA ELECTIONS
        </span>
      </div>

      {/* Desktop Navigation Links */}
      <nav id="header-desktop-nav" className="hidden md:flex items-center gap-5 lg:gap-7">
        {navLinks.map((link) => {
          const isActive = currentView === link.id;
          return (
            <button
              key={link.id}
              id={`nav-link-${link.id}`}
              onClick={() => {
                if (link.action) {
                  link.action();
                } else {
                  setCurrentView(link.id);
                }
              }}
              className={`text-xs font-semibold tracking-wider transition-colors cursor-pointer py-1 ${
                isActive
                  ? 'text-[#003f93] font-bold border-b-2 border-[#003f93]'
                  : 'text-[#424653] hover:text-[#003f93]'
              }`}
            >
              {link.label}
            </button>
          );
        })}
      </nav>

      {/* Right Controls / Auth */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Authenticated Voter Profile Block */}
        {currentVoter ? (
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setCurrentView('dashboard');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
              title="View your voter dashboard"
            >
              <div className="text-right hidden sm:block">
                <p className="text-xs font-semibold text-[#131b2e] flex items-center justify-end gap-1 group-hover:text-[#003f93] transition-colors">
                  <span>{currentVoter.fullName}</span>
                  <span className="text-[#424653] font-normal">•</span>
                  <span>Accredited Voter</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] fill-[#16a34a]/15 shrink-0" />
                </p>
                <p className="text-[11px] text-[#424653]">
                  Voter
                </p>
              </div>

              <div className="h-10 w-10 rounded-full bg-[#eaedff] flex items-center justify-center border border-[#c2c6d5] overflow-hidden shadow-2xs group-hover:border-[#003f93] transition-colors shrink-0">
                <img
                  alt="Student Profile Avatar"
                  className="w-full h-full object-cover"
                  src={
                    currentVoter.avatarUrl ||
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuDWlMIrte2-MY7oXEDW1oStZ78EmWlv4m3sSYLK3jxk6iviAh2APlIjBtH6qRbIpEZuT48yc96koIrkawgTaEmX4tiYmwYAE1WFNKaPiAmfJlEQ9_QZhqehvPio0EWIPvVU6wpj7NW74lSnOieXvHoj4ngQ8y-kwhUZyHs5XAVoLHIY8-8YRw0w5zo3nZcknPHLHndesYlIWEIbhAkh9jcbjgXiTvEtCkKcmt7bZ7kLtalKhKgajSBR'
                  }
                />
              </div>
            </button>

            <button
              id="header-voter-logout-btn"
              onClick={logoutVoter}
              title="Sign out of voter session"
              className="p-1.5 text-[#737785] hover:text-[#ba1a1a] hover:bg-[#ffdad6]/40 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            id="header-voter-login-btn"
            onClick={() => {
              setCurrentView('login');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-200 hover:border-[#003f93]/40 text-[#003f93] font-semibold text-xs sm:text-sm hover:bg-[#003f93]/5 transition-all cursor-pointer"
          >
            <KeyRound className="w-3.5 h-3.5 text-[#0055c2]" />
            <span>Voter Login</span>
          </button>
        )}

        {/* ELECO Admin Button */}
        {isAdminLoggedIn ? (
          <div className="flex items-center gap-1.5">
            <button
              id="header-admin-active-btn"
              onClick={() => setCurrentView('admin')}
              className="bg-[#003f93] text-white text-xs font-semibold px-2.5 sm:px-3 py-2 rounded-lg hover:bg-[#001944] transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#8ab0fe]" />
              <span className="hidden sm:inline">ELECO Console</span>
              <span className="sm:hidden">ELECO</span>
            </button>
            <button
              id="header-admin-logout-btn"
              onClick={logoutAdmin}
              title="Lock ELECO console"
              className="p-1.5 text-[#737785] hover:text-[#ba1a1a] hover:bg-[#ffdad6]/40 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            id="header-eleco-login-btn"
            onClick={onOpenElecoModal}
            className="bg-[#003f93] hover:bg-[#001944] text-white text-xs font-medium px-2.5 sm:px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer active:scale-95 shrink-0"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#8ab0fe]" />
            <span>ELECO Login</span>
          </button>
        )}

        {/* Mobile Hamburger */}
        <button
          id="header-mobile-toggle-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#424653] hover:bg-[#f2f3ff] rounded-lg transition-colors"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div id="header-mobile-drawer" className="absolute top-20 left-0 w-full bg-white border-b border-[#c2c6d5] shadow-lg md:hidden p-4 flex flex-col gap-2 animate-in fade-in slide-in-from-top-4 duration-200 z-50">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                if (link.action) {
                  link.action();
                } else {
                  setCurrentView(link.id);
                }
                setMobileMenuOpen(false);
              }}
              className={`text-left px-4 py-2.5 rounded-lg text-sm font-semibold ${
                currentView === link.id
                  ? 'bg-[#eaedff] text-[#003f93]'
                  : 'text-[#424653] hover:bg-[#f2f3ff]'
              }`}
            >
              {link.label}
            </button>
          ))}
          
          <div className="border-t border-[#eaedff] pt-2 mt-1 flex flex-col gap-2">
            {!currentVoter ? (
              <button
                onClick={() => {
                  setCurrentView('login');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold text-[#0055c2] bg-[#f2f3ff] flex items-center gap-2"
              >
                <KeyRound className="w-4 h-4" />
                Voter Accreditation & Login
              </button>
            ) : (
              <button
                onClick={() => {
                  logoutVoter();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold text-[#ba1a1a] bg-[#ffdad6]/30 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out Voter Session
              </button>
            )}
            
            {isAdminLoggedIn && (
              <button
                onClick={() => {
                  setCurrentView('admin');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#003f93] flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-[#8ab0fe]" />
                ELECO Commission Console
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

