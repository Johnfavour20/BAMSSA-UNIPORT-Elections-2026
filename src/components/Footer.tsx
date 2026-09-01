import React from 'react';
import { Shield, Lock, CheckCircle2, Clock, ExternalLink, HelpCircle, FileText } from 'lucide-react';

interface FooterProps {
  setCurrentView: (view: string) => void;
  onOpenEligibility: () => void;
  onOpenElecoModal: () => void;
  onOpenVoterModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setCurrentView,
  onOpenEligibility,
  onOpenElecoModal,
  onOpenVoterModal,
}) => {
  return (
    <footer id="bamssa-main-footer" className="bg-[#ffffff] border-t border-[#c2c6d5] py-16 px-4 sm:px-6 lg:px-8 mt-auto w-full">
      <div className="container mx-auto max-w-[1280px]">
        {/* Top 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 mb-12">
          {/* Column 1: Brand & Tagline */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img
                alt="BAMSSA Logo"
                className="h-11 w-11 object-contain rounded-md"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDA9DvvsvOSf0bD4hnzLJ8fOuOc26kxMSibbEFYOiTOnbmnkZF3Niej3JjshkKLJ-nG31Nan0dnDGxNMhYPZOLQRrn9B_gaYDbWTw8FpsC3wl255Zod6WC2bkn3zgtXSKITlrxh6T-GIrnonAw_OkjURVxxWhyLCkFDsWg7UZ6mGoERaI6jiNfBcA_TiLx5rUK7po01U2DGfL4Vuc_ydugilMknknO_p3sOnV1DBvUb2pKXdgWJn8UQ"
              />
              <div>
                <h2 className="text-xl font-bold text-[#003f93] leading-none">BAMSSA UNIPORT</h2>
                <span className="inline-block mt-1 bg-[#0055c2] text-white text-[10px] px-2 py-0.5 rounded-none font-bold">
                  2026
                </span>
              </div>
            </div>
            <p className="text-sm text-[#424653] leading-relaxed">
              Official democratic voting portal for the Basic Medical Science Students' Association, University of Port Harcourt Chapter. Built for zero-compromise ballot secrecy and live transparency.
            </p>
            <div className="text-xs text-[#737785] pt-2">
              Faculty of Basic Medical Sciences • College of Health Sciences
            </div>
          </div>

          {/* Column 2: Security & Trust */}
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-bold text-[#131b2e] tracking-tight">
              Security &amp; Trust Pillars
            </h3>
            <div className="flex flex-col gap-3.5">
              <div className="flex items-center gap-2.5 text-[#424653] text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#0055c2]" />
                <span className="font-medium">1-Student-1-Ballot Guarantee</span>
              </div>
              <div className="flex items-center gap-2.5 text-[#424653] text-sm">
                <Lock className="w-4 h-4 text-[#0055c2]" />
                <span className="font-medium">100% Anonymous Ballot Secrecy</span>
              </div>
              <div className="flex items-center gap-2.5 text-[#424653] text-sm">
                <Clock className="w-4 h-4 text-[#0055c2]" />
                <span className="font-medium">Strict Scheduled Polling Hours</span>
              </div>
              <div className="flex items-center gap-2.5 text-[#424653] text-sm">
                <Shield className="w-4 h-4 text-[#0055c2]" />
                <span className="font-medium">Independent Auditing by ELECO</span>
              </div>
            </div>
          </div>

          {/* Column 3: Navigation Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-bold text-[#131b2e] tracking-tight">
              Navigation Links
            </h3>
            <nav className="flex flex-col gap-2.5 text-sm">
              <button
                onClick={onOpenEligibility}
                className="text-left text-[#424653] hover:text-[#003f93] transition-colors font-medium cursor-pointer"
              >
                Check Voter Eligibility
              </button>
              <button
                onClick={() => setCurrentView('live-monitor')}
                className="text-left text-[#424653] hover:text-[#003f93] transition-colors font-medium cursor-pointer"
              >
                Live Results Monitor
              </button>
              <button
                onClick={() => setCurrentView('register')}
                className="text-left text-[#424653] hover:text-[#003f93] transition-colors font-medium cursor-pointer"
              >
                Student Voter Registration
              </button>
              <button
                onClick={onOpenVoterModal}
                className="text-left text-[#424653] hover:text-[#003f93] transition-colors font-medium cursor-pointer"
              >
                Voter Portal Login
              </button>
              <button
                onClick={onOpenElecoModal}
                className="text-left text-[#424653] hover:text-[#003f93] transition-colors font-medium cursor-pointer"
              >
                ELECO Admin Access
              </button>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#c2c6d5]/70 pt-8 flex flex-col lg:flex-row justify-between items-center gap-4 text-center lg:text-left">
          <div className="flex flex-col gap-1">
            <p className="text-xs font-semibold text-[#131b2e]">
              © 2026 BAMSSA Electoral Commission (ELECO).
            </p>
            <p className="text-[11px] text-[#737785]">
              Official Electoral Platform • Secure &amp; Confidential Voting
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium">
            <button
              onClick={() => setCurrentView('guidelines')}
              className="text-[#424653] hover:text-[#003f93] transition-colors"
            >
              Election Guidelines
            </button>
            <button
              onClick={() => setCurrentView('guidelines')}
              className="text-[#424653] hover:text-[#003f93] transition-colors"
            >
              Privacy &amp; Ballot Policy
            </button>
            <button
              onClick={() => setCurrentView('guidelines')}
              className="text-[#424653] hover:text-[#003f93] transition-colors"
            >
              Technical Support
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
