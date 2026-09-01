import React, { useState, useEffect } from 'react';
import { useElection } from '../context/ElectionContext';
import { BMSDepartment } from '../types';
import { 
  Users, 
  Vote, 
  TrendingUp, 
  Calendar, 
  Clock, 
  RotateCw, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  Info,
  Activity,
  Printer,
  Sparkles,
  Search,
  Filter
} from 'lucide-react';

interface LiveMonitorViewProps {
  onBackToHome: () => void;
  onOpenVotingBooth: () => void;
}

export const LiveMonitorView: React.FC<LiveMonitorViewProps> = ({
  onBackToHome,
  onOpenVotingBooth,
}) => {
  const {
    status,
    positions,
    candidates,
    auditLogs,
    departmentStats,
    totalEligible,
    totalBallotsCast,
    turnoutPercentage,
    simulateVotes,
  } = useElection();

  const [selectedPositionFilter, setSelectedPositionFilter] = useState<string>('ALL');
  const [isSimulating, setIsSimulating] = useState(false);
  const [lastUpdatedTime, setLastUpdatedTime] = useState<string>('Just now');
  const [ticker, setTicker] = useState(0);

  // Update timestamp display on ticker interval
  useEffect(() => {
    const timer = setInterval(() => {
      setTicker((prev) => prev + 1);
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  const handleSimulate = () => {
    setIsSimulating(true);
    simulateVotes(25);
    setLastUpdatedTime('Just now');
    setTimeout(() => setIsSimulating(false), 600);
  };

  const handlePrintTally = () => {
    window.print();
  };

  const displayedPositions = selectedPositionFilter === 'ALL'
    ? positions
    : positions.filter((p) => p.id === selectedPositionFilter);

  return (
    <div className="bg-[#faf8ff] text-[#131b2e] min-h-[calc(100vh-4rem)] font-sans antialiased">
      <main className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
        
        {/* Page Header */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-[#003f93] uppercase tracking-widest mb-1">
                ELECTION MONITOR
              </p>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#131b2e] tracking-tight">
                BAMSSA General Elections 2026
              </h1>
            </div>

            {/* Quick Actions for Admins & Voters */}
            <div className="flex items-center gap-2 self-start sm:self-auto print:hidden">
              <button
                type="button"
                onClick={handleSimulate}
                disabled={isSimulating}
                className="bg-[#eaedff] hover:bg-[#dae2fd] text-[#003f93] font-bold text-xs px-3.5 py-2.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs active:scale-98"
                title="Simulate live incoming ballots for testing"
              >
                <Activity className={`w-3.5 h-3.5 ${isSimulating ? 'animate-pulse text-[#0055c2]' : ''}`} />
                <span>Simulate Votes (+25)</span>
              </button>

              <button
                type="button"
                onClick={handlePrintTally}
                className="bg-white hover:bg-[#f2f3ff] text-[#131b2e] border border-[#c2c6d5] font-semibold text-xs px-3.5 py-2.5 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <Printer className="w-3.5 h-3.5 text-[#003f93]" />
                <span className="hidden sm:inline">Print Tally</span>
              </button>

              <button
                type="button"
                onClick={onOpenVotingBooth}
                className="bg-[#0055c2] hover:bg-[#003f93] text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-98"
              >
                <Vote className="w-3.5 h-3.5" />
                <span>Voter Login / Booth</span>
              </button>
            </div>
          </div>

          {/* Status Sub-bar */}
          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 text-xs sm:text-sm text-[#424653] pt-1">
            <div className="inline-flex items-center gap-2 bg-[#ffdad6] text-[#93000a] px-3 py-1 rounded-full w-fit">
              <span className="w-2 h-2 rounded-full bg-[#ba1a1a] animate-pulse"></span>
              <span className="font-bold uppercase tracking-wider text-xs">LIVE</span>
              <span className="font-medium text-xs">Voting is currently in progress</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-[#424653]">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#737785]" />
                <span>Election Date: <strong>20 August 2026</strong></span>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#737785]" />
                <span>Voting Window: <strong>8:00 AM — 4:00 PM</strong></span>
              </span>
              <span className="flex items-center gap-1.5">
                <RotateCw className="w-3.5 h-3.5 text-[#737785]" />
                <span>Last Updated: <strong>{lastUpdatedTime}</strong></span>
              </span>
            </div>
          </div>
        </div>

        {/* Live Monitor Summary (Bento Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          
          {/* 1. Eligible Voters */}
          <div className="bg-white border border-[#c2c6d5] rounded-2xl p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-bold text-[#424653] uppercase tracking-wider">
                ELIGIBLE VOTERS
              </span>
              <Users className="w-5 h-5 text-[#737785]" />
            </div>
            <div>
              <span className="text-4xl sm:text-5xl font-extrabold text-[#131b2e] tracking-tight">
                {totalEligible.toLocaleString()}
              </span>
            </div>
          </div>

          {/* 2. Ballots Cast */}
          <div className="bg-white border border-[#c2c6d5] rounded-2xl p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-bold text-[#424653] uppercase tracking-wider">
                BALLOTS CAST
              </span>
              <Vote className="w-5 h-5 text-[#737785]" />
            </div>
            <div>
              <span className="text-4xl sm:text-5xl font-extrabold text-[#131b2e] tracking-tight">
                {totalBallotsCast.toLocaleString()}
              </span>
            </div>
          </div>

          {/* 3. Voter Turnout */}
          <div className="bg-white border border-[#c2c6d5] rounded-2xl p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-bold text-[#424653] uppercase tracking-wider">
                VOTER TURNOUT
              </span>
              <TrendingUp className="w-5 h-5 text-[#737785]" />
            </div>
            <div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl sm:text-5xl font-extrabold text-[#131b2e] tracking-tight">
                  {turnoutPercentage}%
                </span>
              </div>
              <div className="w-full bg-[#e2e7ff] rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-[#003f93] h-full rounded-full transition-all duration-1000 ease-out" 
                  style={{ width: `${Math.min(turnoutPercentage, 100)}%` }}
                />
              </div>
            </div>
          </div>

        </div>

        {/* Position Navigation (Pill Scroller) */}
        <div className="w-full overflow-x-auto pb-2 -mb-2 border-b border-[#c2c6d5]/60 scrollbar-none">
          <div className="flex items-center gap-2.5 min-w-max">
            <button
              type="button"
              onClick={() => setSelectedPositionFilter('ALL')}
              className={`text-xs font-bold px-4 py-2 rounded-full transition-all cursor-pointer ${
                selectedPositionFilter === 'ALL'
                  ? 'bg-[#003f93] text-white shadow-xs'
                  : 'bg-white border border-[#c2c6d5] text-[#424653] hover:bg-[#f2f3ff]'
              }`}
            >
              All Positions
            </button>

            {positions.map((pos) => {
              const isSelected = selectedPositionFilter === pos.id;
              return (
                <button
                  key={pos.id}
                  type="button"
                  onClick={() => setSelectedPositionFilter(pos.id)}
                  className={`text-xs font-bold px-4 py-2 rounded-full transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#003f93] text-white shadow-xs'
                      : 'bg-white border border-[#c2c6d5] text-[#424653] hover:bg-[#f2f3ff]'
                  }`}
                >
                  {pos.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Section Header */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#131b2e] uppercase tracking-tight mb-1">
            LIVE RESULTS
          </h2>
          <p className="text-xs sm:text-sm text-[#424653] flex items-center gap-1.5">
            <RotateCw className="w-3.5 h-3.5 animate-spin text-[#0055c2]" style={{ animationDuration: '3s' }} />
            <span>Results are updating as ballots are counted.</span>
          </p>
        </div>

        {/* Positions List */}
        <div className="space-y-6">
          {displayedPositions.map((pos, posIdx) => {
            const posCandidates = candidates
              .filter((c) => c.positionId === pos.id)
              .sort((a, b) => b.votesCount - a.votesCount);

            const totalPosVotes = posCandidates.reduce((acc, c) => acc + c.votesCount, 0);
            const isSingleCandidate = posCandidates.length === 1;
            const posNum = String(positions.findIndex((p) => p.id === pos.id) + 1).padStart(2, '0');

            return (
              <section 
                key={pos.id}
                className="bg-white border border-[#c2c6d5] rounded-2xl overflow-hidden shadow-xs"
              >
                {/* Position Header Banner */}
                <div className="bg-[#f2f3ff] border-b border-[#c2c6d5] px-5 sm:px-6 py-3.5 flex items-center justify-between">
                  <h3 className="text-sm sm:text-base font-bold text-[#131b2e] uppercase tracking-wider flex items-center gap-2">
                    <span className="text-[#737785] font-normal">{posNum}</span>
                    <span>{pos.title}</span>
                  </h3>
                  <span className="text-xs font-semibold text-[#424653]">
                    {totalPosVotes.toLocaleString()} votes cast
                  </span>
                </div>

                {/* Candidates Body */}
                <div className="p-5 sm:p-6 space-y-6">
                  {posCandidates.map((cand, candIdx) => {
                    const votePct = totalPosVotes > 0 
                      ? Math.round((cand.votesCount / totalPosVotes) * 1000) / 10 
                      : 0;
                    
                    const isLeading = candIdx === 0 && totalPosVotes > 0 && !isSingleCandidate;

                    // If single candidate (Unopposed) approval logic
                    if (isSingleCandidate) {
                      const approvalRate = totalBallotsCast > 0 
                        ? Math.round((cand.votesCount / totalBallotsCast) * 1000) / 10 
                        : 88.3; // Default benchmark
                      const thresholdMet = approvalRate >= 75;

                      return (
                        <div key={cand.id} className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-start sm:items-center">
                          {/* Candidate Avatar */}
                          <img
                            src={cand.photoUrl}
                            alt={cand.fullName}
                            className="w-16 h-16 rounded-full object-cover border border-[#c2c6d5] shrink-0 bg-[#eaedff]"
                          />

                          {/* Info & Progress */}
                          <div className="flex-grow w-full space-y-2">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h4 className="text-base sm:text-lg font-bold text-[#131b2e]">
                                    {cand.fullName}
                                  </h4>
                                  <span className="bg-[#dae2fd] text-[#131b2e] px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase border border-[#c2c6d5]">
                                    UNOPPOSED
                                  </span>
                                </div>
                                <p className="text-xs text-[#424653]">
                                  Dept. of {cand.department} ({cand.level})
                                </p>
                              </div>

                              <div className="text-right">
                                <span className="text-xl sm:text-2xl font-bold text-[#003f93] block">
                                  {cand.votesCount}
                                </span>
                                <span className="text-xs text-[#424653]">
                                  approval votes
                                </span>
                              </div>
                            </div>

                            {/* Progress bar with 75% threshold line */}
                            <div className="flex items-center gap-3">
                              <div className="flex-grow bg-[#e2e7ff] rounded-full h-3 overflow-hidden relative">
                                <div 
                                  className="absolute top-0 bottom-0 left-[75%] w-[2px] bg-[#ba1a1a] z-10" 
                                  title="75% Constitutional Approval Threshold"
                                />
                                <div 
                                  className="bg-[#003f93] h-full rounded-full transition-all duration-1000 ease-out" 
                                  style={{ width: `${Math.min(approvalRate, 100)}%` }}
                                />
                              </div>
                              <span className="text-sm font-bold text-[#131b2e] min-w-[50px] text-right">
                                {approvalRate}%
                              </span>
                            </div>

                            {/* Threshold Marker Status Bar */}
                            <div className="flex flex-wrap items-center justify-between text-xs text-[#424653] bg-[#f2f3ff] px-3 py-2 rounded-xl border border-[#c2c6d5]/50 gap-2">
                              <span className="flex items-center gap-1.5">
                                <Info className="w-3.5 h-3.5 text-[#737785]" />
                                <span>75% approval required</span>
                              </span>
                              <span className="text-[#003f93] font-bold flex items-center gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#0055c2]" />
                                <span>{thresholdMet ? 'Threshold currently met' : 'Threshold pending'}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }

                    // Multi-candidate race
                    return (
                      <React.Fragment key={cand.id}>
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-start sm:items-center">
                          {/* Candidate Avatar */}
                          <img
                            src={cand.photoUrl}
                            alt={cand.fullName}
                            className={`w-16 h-16 rounded-full object-cover border border-[#c2c6d5] shrink-0 bg-[#eaedff] ${
                              !isLeading && totalPosVotes > 0 ? 'grayscale opacity-85' : ''
                            }`}
                          />

                          {/* Info & Progress */}
                          <div className="flex-grow w-full space-y-2">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h4 className="text-base sm:text-lg font-bold text-[#131b2e]">
                                    {cand.fullName}
                                  </h4>
                                  {isLeading && (
                                    <span className="bg-[#0055c2]/10 text-[#0055c2] px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase border border-[#0055c2]/20">
                                      LEADING
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-[#424653]">
                                  Dept. of {cand.department} ({cand.level})
                                </p>
                              </div>

                              <div className="text-right">
                                <span className={`text-xl sm:text-2xl font-bold block ${isLeading ? 'text-[#131b2e]' : 'text-[#424653]'}`}>
                                  {cand.votesCount}
                                </span>
                                <span className="text-xs text-[#737785]">
                                  votes
                                </span>
                              </div>
                            </div>

                            {/* Progress bar */}
                            <div className="flex items-center gap-3">
                              <div className="flex-grow bg-[#e2e7ff] rounded-full h-3 overflow-hidden">
                                <div 
                                  className={`h-full rounded-full transition-all duration-1000 ease-out ${
                                    isLeading ? 'bg-[#003f93]' : 'bg-[#737785]'
                                  }`} 
                                  style={{ width: `${Math.min(votePct, 100)}%` }}
                                />
                              </div>
                              <span className={`text-sm font-bold min-w-[50px] text-right ${isLeading ? 'text-[#131b2e]' : 'text-[#737785]'}`}>
                                {votePct}%
                              </span>
                            </div>
                          </div>
                        </div>

                        {candIdx < posCandidates.length - 1 && (
                          <hr className="border-t border-[#eaedff]" />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        {/* Departmental Participation Breakdown */}
        <div className="bg-white border border-[#c2c6d5] rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#eaedff] pb-3">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#131b2e]">
                Faculty Departmental Turnout
              </h3>
              <p className="text-xs text-[#737785]">
                Real-time participation rate across all 4 departments in BMS
              </p>
            </div>
            <span className="text-xs font-bold text-[#003f93] bg-[#eaedff] px-3 py-1 rounded-lg">
              Faculty of Basic Medical Sciences
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(Object.keys(departmentStats) as BMSDepartment[]).map((dept) => {
              const stats = departmentStats[dept];
              const pct = stats.eligible > 0 ? Math.round((stats.voted / stats.eligible) * 100) : 0;

              return (
                <div key={dept} className="p-4 bg-[#faf8ff] border border-[#c2c6d5] rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#131b2e]">{dept}</span>
                    <span className="text-xs font-bold text-[#003f93]">{pct}%</span>
                  </div>

                  <div className="w-full bg-[#e2e7ff] h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#003f93] h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(pct, 100)}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-[11px] text-[#737785]">
                    <span>Voted: <strong className="text-[#131b2e]">{stats.voted}</strong></span>
                    <span>Eligible: <strong className="text-[#131b2e]">{stats.eligible}</strong></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </main>
    </div>
  );
};
