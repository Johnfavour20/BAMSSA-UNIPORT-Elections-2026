import React from 'react';
import { useElection } from '../context/ElectionContext';

interface StatusStripProps {
  onOpenAdminPrompt?: () => void;
}

export const StatusStrip: React.FC<StatusStripProps> = () => {
  const { totalEligible, totalBallotsCast, turnoutPercentage } = useElection();

  return (
    <section 
      id="bamssa-status-strip" 
      className="bg-[#edf4fc] border-y border-[#d2d9f4] py-8 sm:py-10 px-4 sm:px-6 lg:px-8"
    >
      <div className="container mx-auto max-w-[1280px]">
        {/* 4 Clean Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Card 1: Eligible Voters */}
          <div className="bg-white border border-[#c2c6d5]/70 rounded-none py-8 px-6 text-center shadow-xs hover:border-[#0055c2]/40 transition-colors">
            <div className="text-3xl sm:text-4xl md:text-[38px] font-bold text-[#003f93] tracking-tight leading-none mb-3">
              {totalEligible > 0 ? totalEligible.toLocaleString() : '2,450'}
            </div>
            <div className="text-sm md:text-base font-normal text-[#424653]">
              Eligible Voters
            </div>
          </div>

          {/* Card 2: Ballots Cast */}
          <div className="bg-white border border-[#c2c6d5]/70 rounded-none py-8 px-6 text-center shadow-xs hover:border-[#0055c2]/40 transition-colors">
            <div className="text-3xl sm:text-4xl md:text-[38px] font-bold text-[#003f93] tracking-tight leading-none mb-3">
              {totalBallotsCast > 0 ? totalBallotsCast.toLocaleString() : '1,005'}
            </div>
            <div className="text-sm md:text-base font-normal text-[#424653]">
              Ballots Cast
            </div>
          </div>

          {/* Card 3: Turnout */}
          <div className="bg-white border border-[#c2c6d5]/70 rounded-none py-8 px-6 text-center shadow-xs hover:border-[#0055c2]/40 transition-colors">
            <div className="text-3xl sm:text-4xl md:text-[38px] font-bold text-[#003f93] tracking-tight leading-none mb-3">
              {turnoutPercentage}%
            </div>
            <div className="text-sm md:text-base font-normal text-[#424653]">
              Turnout
            </div>
          </div>

          {/* Card 4: Election Day */}
          <div className="bg-white border border-[#c2c6d5]/70 rounded-none py-8 px-6 text-center shadow-xs hover:border-[#0055c2]/40 transition-colors">
            <div className="text-2xl sm:text-3xl md:text-[32px] font-bold text-[#003f93] tracking-tight leading-none mb-3">
              20 Aug, 2026
            </div>
            <div className="text-sm md:text-base font-normal text-[#424653]">
              Election Day
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

