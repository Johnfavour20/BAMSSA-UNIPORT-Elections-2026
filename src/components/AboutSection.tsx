import React from 'react';
import { ShieldCheck, Award } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="bamssa-about-section" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#faf8ff] border-t border-[#eaedff]">
      <div className="container mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column Text */}
          <div className="md:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#eaedff] text-[#003f93] rounded-md text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0055c2]" />
              <span>ELECO Mandate &amp; Mission</span>
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#131b2e] leading-tight tracking-tight">
              Building leadership. Strengthening representation.
            </h3>
            
            {/* Primary Mission Card */}
            <div className="p-6 bg-white rounded-none border border-[#c2c6d5]/80 shadow-xs relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#0055c2]" />
              <p className="text-[16px] sm:text-[17px] text-[#1e293b] leading-[1.8] font-normal">
                The BAMSSA Electoral Commission (ELECO) is committed to conducting free, fair, and credible elections. We leverage technology to ensure every medical student's voice is heard and accurately recorded.
              </p>
            </div>
            
            {/* Mandate Secondary Statement */}
            <div className="p-6 bg-[#f2f3ff] rounded-none border border-[#d2d9f4] space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#003f93]">
                <Award className="w-4 h-4 text-[#0055c2]" />
                <span>Our Constitutional Mandate</span>
              </div>
              <p className="text-[15px] sm:text-[16px] text-[#334155] leading-[1.75] font-normal">
                Our mandate is to uphold the integrity of the association by providing a secure platform where students can seamlessly participate in the democratic process, fostering a community of responsible future medical professionals.
              </p>
            </div>

            {/* Quick Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-white border border-[#c2c6d5]/70 rounded-none p-3.5 text-center shadow-2xs">
                <div className="text-sm font-bold text-[#003f93]">Free &amp; Fair</div>
                <div className="text-[11px] text-[#737785]">Transparent Process</div>
              </div>
              <div className="bg-white border border-[#c2c6d5]/70 rounded-none p-3.5 text-center shadow-2xs">
                <div className="text-sm font-bold text-[#003f93]">1-Student-1-Vote</div>
                <div className="text-[11px] text-[#737785]">Strict Verification</div>
              </div>
              <div className="bg-white border border-[#c2c6d5]/70 rounded-none p-3.5 text-center col-span-2 sm:col-span-1 shadow-2xs">
                <div className="text-sm font-bold text-[#003f93]">100% Secret</div>
                <div className="text-[11px] text-[#737785]">Decoupled Identity</div>
              </div>
            </div>
          </div>

          {/* Right Column Image */}
          <div className="md:col-span-5 rounded-none overflow-hidden border border-[#c2c6d5] shadow-sm h-full min-h-[380px] lg:min-h-[440px] relative group">
            <div
              className="w-full h-full min-h-[380px] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBDqWjbTRbT11NQAiv_2-4oKlX7Xq4a0uEIGw8dzs69UwndLiPsWUM_C6xlg3XcU5u0IRgsjCbpaqKTeBavwCgr2WpunkEn_gkxsoUyhVtsFsvP1RupsXuQ6YbMe7BUkwZxXK4T5o2bopODM6rUbTM_et7fZoSutwPT-Nlpksqr6KgE2gLq08GUrRNUOKcQJ0HIaqqJcIBMT4-mEtN-B9Jh9XzdSM5GrrrNKUflVRgvmbsqHz33X1RA')`
              }}
            ></div>
            <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-[#131b2e]/95 via-[#131b2e]/60 to-transparent text-white">
              <p className="text-xs font-bold text-white/95">Basic Medical Science Students, Faculty of Basic Medical Sciences</p>
              <p className="text-[11px] text-white/75 mt-0.5">University of Port Harcourt, Choba Campus</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
