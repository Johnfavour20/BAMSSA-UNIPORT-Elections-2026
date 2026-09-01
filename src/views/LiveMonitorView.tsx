import React, { useState } from 'react';
import { useElection } from '../context/ElectionContext';
import { BMSDepartment } from '../types';
import { 
  BarChart3, 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  Vote, 
  Clock, 
  Activity, 
  Printer, 
  RefreshCw, 
  Filter, 
  Lock, 
  CheckCircle2, 
  Award,
  Radio,
  FileSpreadsheet
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

  const [selectedDeptFilter, setSelectedDeptFilter] = useState<string>('ALL');
  const [logCategoryFilter, setLogCategoryFilter] = useState<string>('ALL');
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSimulate = () => {
    setIsSimulating(true);
    simulateVotes(25);
    setTimeout(() => setIsSimulating(false), 500);
  };

  const handlePrintTally = () => {
    window.print();
  };

  const filteredLogs = auditLogs.filter((log) => {
    if (logCategoryFilter === 'ALL') return true;
    return log.category === logCategoryFilter;
  });

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 bg-[#faf8ff] min-h-[85vh]">
      <div className="container mx-auto max-w-[1280px] space-y-8">
        {/* Top Control & Header Strip */}
        <div className="bg-white border border-[#c2c6d5] rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#0055c2] text-white flex items-center justify-center font-bold shadow-xs">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-[#131b2e] tracking-tight">
                  Official Live Election Monitor
                </h2>
                <span className="flex items-center gap-1.5 bg-[#dcfce7] text-[#15803d] text-xs font-bold px-2.5 py-0.5 rounded-full border border-[#86efac]">
                  <Radio className="w-3 h-3 animate-pulse" />
                  LIVE TALLY
                </span>
              </div>
              <p className="text-xs text-[#424653] mt-0.5">
                BAMSSA UNIPORT 2026/2027 Executive Electoral Dashboard &amp; Audit Feed
              </p>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleSimulate}
              disabled={isSimulating}
              className="bg-[#eaedff] hover:bg-[#dae2fd] text-[#003f93] font-bold text-xs px-3.5 py-2.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
              title="Simulate incoming votes across all departments"
            >
              <Activity className={`w-3.5 h-3.5 ${isSimulating ? 'animate-pulse text-[#0055c2]' : ''}`} />
              <span>Simulate Live Votes (+25)</span>
            </button>

            <button
              onClick={handlePrintTally}
              className="bg-white hover:bg-[#f2f3ff] text-[#131b2e] border border-[#c2c6d5] font-semibold text-xs px-3.5 py-2.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5 text-[#0055c2]" />
              <span>Print Tally Sheet</span>
            </button>

            <button
              onClick={onOpenVotingBooth}
              className="bg-[#2563eb] hover:bg-[#003f93] text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <Vote className="w-3.5 h-3.5" />
              <span>Cast Ballot</span>
            </button>
          </div>
        </div>

        {/* Aggregate Key Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-[#c2c6d5] p-5 rounded-2xl shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#737785] uppercase tracking-wider block mb-1">
                Total Registered Voters
              </span>
              <div className="text-2xl font-bold text-[#131b2e]">
                {totalEligible.toLocaleString()}
              </div>
              <span className="text-[11px] text-[#424653]">4 Faculty Departments</span>
            </div>
            <div className="w-11 h-11 rounded-xl bg-[#eaedff] text-[#0055c2] flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white border border-[#c2c6d5] p-5 rounded-2xl shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#737785] uppercase tracking-wider block mb-1">
                Valid Ballots Cast
              </span>
              <div className="text-2xl font-bold text-[#003f93]">
                {totalBallotsCast.toLocaleString()}
              </div>
              <span className="text-[11px] text-[#15803d] font-semibold">100% Anonymous &amp; Confidential</span>
            </div>
            <div className="w-11 h-11 rounded-xl bg-[#dcfce7] text-[#15803d] flex items-center justify-center">
              <Vote className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white border border-[#c2c6d5] p-5 rounded-2xl shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#737785] uppercase tracking-wider block mb-1">
                Overall Voter Turnout
              </span>
              <div className="text-2xl font-bold text-[#131b2e]">
                {turnoutPercentage}%
              </div>
              <div className="w-24 bg-[#eaedff] h-2 rounded-full mt-1 overflow-hidden">
                <div 
                  className="bg-[#2563eb] h-full rounded-full transition-all duration-500" 
                  style={{ width: `${Math.min(turnoutPercentage, 100)}%` }}
                ></div>
              </div>
            </div>
            <div className="w-11 h-11 rounded-xl bg-[#dae2fd] text-[#003f93] flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white border border-[#c2c6d5] p-5 rounded-2xl shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#737785] uppercase tracking-wider block mb-1">
                Audit Trail Entries
              </span>
              <div className="text-2xl font-bold text-[#131b2e]">
                {auditLogs.length}
              </div>
              <span className="text-[11px] text-[#0055c2] font-semibold">0 Discrepancies</span>
            </div>
            <div className="w-11 h-11 rounded-xl bg-[#f2f3ff] text-[#0055c2] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Departmental Turnout Breakdown */}
        <div className="bg-white border border-[#c2c6d5] rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#eaedff] pb-3">
            <div>
              <h3 className="text-lg font-bold text-[#131b2e] tracking-tight">
                Departmental Voter Participation
              </h3>
              <p className="text-xs text-[#737785]">
                Turnout across all 4 departments in the Faculty of Basic Medical Sciences
              </p>
            </div>
            <span className="text-xs font-bold text-[#0055c2] bg-[#eaedff] px-2.5 py-1 rounded-md">
              UniPort BMS Faculty
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
                      className="bg-[#0055c2] h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(pct, 100)}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between text-[11px] text-[#737785]">
                    <span>Voted: <strong>{stats.voted}</strong></span>
                    <span>Eligible: <strong>{stats.eligible}</strong></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Position-by-Position Live Results Cards */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-[#131b2e] tracking-tight">
              Executive Positions Live Tally
            </h3>
            <span className="text-xs text-[#737785]">
              Real-time verified vote counting
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {positions.map((pos) => {
              const posCandidates = candidates
                .filter((c) => c.positionId === pos.id)
                .sort((a, b) => b.votesCount - a.votesCount);
              
              const totalPosVotes = posCandidates.reduce((acc, c) => acc + c.votesCount, 0);
              const leader = posCandidates[0];

              return (
                <div
                  key={pos.id}
                  id={`live-tally-pos-${pos.id}`}
                  className="bg-white border border-[#c2c6d5] rounded-2xl p-6 shadow-xs space-y-4 flex flex-col justify-between"
                >
                  {/* Position Header */}
                  <div className="flex items-start justify-between border-b border-[#eaedff] pb-3">
                    <div>
                      <h4 className="text-lg font-bold text-[#131b2e] tracking-tight">
                        {pos.title}
                      </h4>
                      <p className="text-xs text-[#737785]">
                        {pos.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-[#003f93] bg-[#eaedff] px-2.5 py-1 rounded-md">
                        {totalPosVotes} Total Votes
                      </span>
                    </div>
                  </div>

                  {/* Candidates Tally Bars */}
                  <div className="space-y-3.5">
                    {posCandidates.map((cand, idx) => {
                      const votePct = totalPosVotes > 0 ? Math.round((cand.votesCount / totalPosVotes) * 100) : 0;
                      const isLeading = idx === 0 && totalPosVotes > 0;

                      return (
                        <div
                          key={cand.id}
                          className={`p-3.5 rounded-xl border transition-all ${
                            isLeading
                              ? 'bg-[#f2f3ff] border-[#b0c6ff]'
                              : 'bg-[#faf8ff] border-[#c2c6d5]/60'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2.5">
                              <img
                                src={cand.photoUrl}
                                alt={cand.fullName}
                                className="w-8 h-8 rounded-lg object-cover border border-[#c2c6d5]"
                              />
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-bold text-[#131b2e]">
                                    {cand.fullName}
                                  </span>
                                  {isLeading && (
                                    <span className="bg-[#dcfce7] text-[#15803d] text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                                      <Award className="w-3 h-3" />
                                      LEAD
                                    </span>
                                  )}
                                </div>
                                <span className="text-[11px] text-[#0055c2] font-medium">
                                  Dept. of {cand.department} ({cand.level})
                                </span>
                              </div>
                            </div>

                            <div className="text-right">
                              <span className="text-base font-bold text-[#131b2e] block">
                                {cand.votesCount} votes
                              </span>
                              <span className="text-xs font-semibold text-[#0055c2]">
                                {votePct}%
                              </span>
                            </div>
                          </div>

                          {/* Progress Bar */}
                          <div className="w-full bg-[#e2e7ff] h-2.5 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${
                                isLeading ? 'bg-[#0055c2]' : 'bg-[#8ab0fe]'
                              }`}
                              style={{ width: `${votePct}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Electoral Audit Stream */}
        <div className="bg-white border border-[#c2c6d5] rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#eaedff] pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#001944] text-white flex items-center justify-center font-bold">
                <Lock className="w-5 h-5 text-[#8ab0fe]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#131b2e] tracking-tight">
                  Official Electoral Audit Log
                </h3>
                <p className="text-xs text-[#737785]">
                  Public verified transaction records for transparent election oversight
                </p>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {['ALL', 'VOTE', 'ACCREDITATION', 'SECURITY', 'SYSTEM'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setLogCategoryFilter(cat)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    logCategoryFilter === cat
                      ? 'bg-[#003f93] text-white'
                      : 'bg-[#f2f3ff] text-[#424653] hover:bg-[#e2e7ff]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Log Stream Container */}
          <div className="divide-y divide-[#eaedff] max-h-[360px] overflow-y-auto pr-1">
            {filteredLogs.map((log) => (
              <div key={log.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        log.category === 'VOTE'
                          ? 'bg-[#dcfce7] text-[#15803d]'
                          : log.category === 'SECURITY'
                          ? 'bg-[#fee2e2] text-[#991b1b]'
                          : log.category === 'ACCREDITATION'
                          ? 'bg-[#dbeafe] text-[#1e40af]'
                          : 'bg-[#eaedff] text-[#003f93]'
                      }`}
                    >
                      {log.category}
                    </span>
                    <span className="font-bold text-[#131b2e]">{log.action}</span>
                    <span className="text-[#737785]">• {log.actor}</span>
                  </div>
                  {log.details && (
                    <p className="text-[11px] text-[#424653]">{log.details}</p>
                  )}
                </div>

                <div className="text-right sm:shrink-0">
                  <div className="font-mono text-[11px] text-[#0055c2] font-semibold">
                    {log.encryptedHash.slice(0, 16)}...
                  </div>
                  <div className="text-[10px] text-[#737785]">
                    {new Date(log.timestamp).toLocaleTimeString('en-GB')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
