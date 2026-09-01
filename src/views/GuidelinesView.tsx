import React from 'react';
import { BookOpen, ShieldCheck, Scale, FileText, HelpCircle, Phone, Mail, CheckCircle2 } from 'lucide-react';

interface GuidelinesViewProps {
  onOpenVotingBooth: () => void;
  onOpenEligibility: () => void;
}

export const GuidelinesView: React.FC<GuidelinesViewProps> = ({
  onOpenVotingBooth,
  onOpenEligibility,
}) => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-[#faf8ff] min-h-[85vh]">
      <div className="container mx-auto max-w-4xl space-y-10">
        {/* Title Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#eaedff] text-[#003f93] rounded-md text-xs font-bold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Official Electoral Guidelines &amp; Charter</span>
          </div>
          <h2 className="text-3xl font-bold text-[#131b2e] tracking-tight">
            BAMSSA UNIPORT Elections 2026/2027
          </h2>
          <p className="text-sm text-[#424653] mt-2">
            Published under the authority of the BAMSSA Electoral Commission (ELECO), Faculty of Basic Medical Sciences, University of Port Harcourt.
          </p>
        </div>

        {/* Section 1: Code of Conduct */}
        <div className="bg-white border border-[#c2c6d5] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-[#eaedff] pb-4">
            <div className="w-10 h-10 rounded-xl bg-[#eaedff] text-[#0055c2] flex items-center justify-center font-bold">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#131b2e]">
                Article IV: Code of Conduct &amp; Secrecy
              </h3>
              <p className="text-xs text-[#737785]">
                General Principles Governing the 2026 E-Voting Exercise
              </p>
            </div>
          </div>

          <div className="space-y-4 text-sm text-[#424653] leading-relaxed">
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-[#eaedff] text-[#0055c2] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                1
              </span>
              <p>
                <strong>One-Student-One-Ballot Principle:</strong> Every accredited student within the departments of Human Anatomy, Human Physiology, Pharmacology, and Medical Biochemistry is entitled to exactly one non-transferable electronic vote.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-[#eaedff] text-[#0055c2] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                2
              </span>
              <p>
                <strong>Ballot Secrecy &amp; Anonymity:</strong> Voting choices are strictly and permanently decoupled from voter identities at the moment of submission. No commissioner, faculty dean, or system operator can view how an individual voted.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-[#eaedff] text-[#0055c2] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                3
              </span>
              <p>
                <strong>Campaign Moratorium on Election Day:</strong> All active digital and physical campaigns must cease precisely 12 hours prior to the opening of polls at 08:00 AM WAT.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Frequently Asked Questions */}
        <div className="bg-white border border-[#c2c6d5] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-[#eaedff] pb-4">
            <div className="w-10 h-10 rounded-xl bg-[#eaedff] text-[#0055c2] flex items-center justify-center font-bold">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#131b2e]">
                Frequently Asked Questions (FAQ)
              </h3>
              <p className="text-xs text-[#737785]">
                Guidance on voting, lost PINs, and election results
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-[#faf8ff] border border-[#c2c6d5]/70 rounded-xl">
              <h4 className="text-sm font-bold text-[#131b2e] mb-1">
                How do I get my 4-digit voting PIN?
              </h4>
              <p className="text-xs text-[#424653] leading-relaxed">
                Click on "Check Eligibility" or "Register" on the navigation bar. Enter your UNIPORT matriculation number (e.g. U2022/5570012). If verified, your 4-digit PIN is displayed securely.
              </p>
            </div>

            <div className="p-4 bg-[#faf8ff] border border-[#c2c6d5]/70 rounded-xl">
              <h4 className="text-sm font-bold text-[#131b2e] mb-1">
                Can I vote from my mobile phone or laptop?
              </h4>
              <p className="text-xs text-[#424653] leading-relaxed">
                Yes. The BAMSSA 2026 electoral system is fully responsive and compatible with mobile smartphones, tablets, and computers across any modern browser.
              </p>
            </div>

            <div className="p-4 bg-[#faf8ff] border border-[#c2c6d5]/70 rounded-xl">
              <h4 className="text-sm font-bold text-[#131b2e] mb-1">
                When will final results be declared?
              </h4>
              <p className="text-xs text-[#424653] leading-relaxed">
                Live vote counts are visible in real time on the Live Monitor. Official certification is published upon poll closure after formal audit reconciliation by the ELECO Chairman.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: ELECO Support & Technical Contact */}
        <div className="bg-[#f2f3ff] border border-[#c2c6d5] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-base font-bold text-[#003f93]">
              Need Immediate Electoral Assistance?
            </h4>
            <p className="text-xs text-[#424653] mt-1">
              ELECO ICT Help Desk is stationed at the BMS Faculty Building, Choba Campus.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-[#131b2e] font-medium">
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#0055c2]" />
                +234 803 123 4567
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#0055c2]" />
                eleco@bamssa.uniport.edu.ng
              </span>
            </div>
          </div>

          <button
            onClick={onOpenEligibility}
            className="bg-[#0055c2] hover:bg-[#003f93] text-white text-xs font-bold px-6 py-3 rounded-xl transition-all shadow-xs shrink-0 cursor-pointer"
          >
            Check My Eligibility Now
          </button>
        </div>
      </div>
    </div>
  );
};
