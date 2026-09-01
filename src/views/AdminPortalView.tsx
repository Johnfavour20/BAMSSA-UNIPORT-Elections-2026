import React, { useState } from 'react';
import { useElection } from '../context/ElectionContext';
import { ElectionStatus, BMSDepartment, AcademicLevel } from '../types';
import { 
  ShieldCheck, 
  Settings, 
  Users, 
  Vote, 
  Lock, 
  FileSpreadsheet, 
  Plus, 
  RotateCcw, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  LogOut,
  PlayCircle,
  Download,
  Trash2
} from 'lucide-react';

interface AdminPortalViewProps {
  onLogout: () => void;
}

export const AdminPortalView: React.FC<AdminPortalViewProps> = ({ onLogout }) => {
  const {
    status,
    setElectionStatus,
    voters,
    candidates,
    positions,
    auditLogs,
    addCandidate,
    registerVoter,
    accreditVoter,
    resetElectionData,
    simulateVotes,
  } = useElection();

  const [activeTab, setActiveTab] = useState<'STATUS' | 'VOTERS' | 'CANDIDATES' | 'AUDIT'>('STATUS');
  const [voterSearch, setVoterSearch] = useState('');
  const [showAddVoter, setShowAddVoter] = useState(false);
  const [showAddCandidate, setShowAddCandidate] = useState(false);

  // New Candidate Form State
  const [newCandName, setNewCandName] = useState('');
  const [newCandPosId, setNewCandPosId] = useState(positions[0]?.id || 'pres');
  const [newCandDept, setNewCandDept] = useState<BMSDepartment>('Human Anatomy');
  const [newCandLevel, setNewCandLevel] = useState<AcademicLevel>('400L');
  const [newCandTagline, setNewCandTagline] = useState('');
  const [newCandPhoto, setNewCandPhoto] = useState('');
  const [newCandManifesto, setNewCandManifesto] = useState('');

  // New Voter Form State
  const [newVoterName, setNewVoterName] = useState('');
  const [newVoterMatric, setNewVoterMatric] = useState('');
  const [newVoterDept, setNewVoterDept] = useState<BMSDepartment>('Human Anatomy');
  const [newVoterLevel, setNewVoterLevel] = useState<AcademicLevel>('300L');

  const filteredVoters = voters.filter(
    (v) =>
      v.fullName.toLowerCase().includes(voterSearch.toLowerCase()) ||
      v.matricNumber.toLowerCase().includes(voterSearch.toLowerCase()) ||
      v.department.toLowerCase().includes(voterSearch.toLowerCase())
  );

  const handleStatusChange = (newStatus: ElectionStatus) => {
    setElectionStatus(newStatus);
  };

  const handleCreateCandidate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCandName.trim()) return;

    addCandidate({
      fullName: newCandName,
      positionId: newCandPosId,
      department: newCandDept,
      level: newCandLevel,
      tagline: newCandTagline || 'Dedicated to student welfare and academic excellence.',
      photoUrl: newCandPhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      manifesto: newCandManifesto ? newCandManifesto.split('\n').filter(Boolean) : ['Promote academic conferences and research workshops.'],
      cgpaRange: '4.50 – 5.00 First Class',
    });

    setNewCandName('');
    setNewCandTagline('');
    setNewCandPhoto('');
    setNewCandManifesto('');
    setShowAddCandidate(false);
  };

  const handleCreateVoter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVoterName.trim() || !newVoterMatric.trim()) return;

    registerVoter({
      fullName: newVoterName,
      matricNumber: newVoterMatric,
      department: newVoterDept,
      level: newVoterLevel,
      email: `${newVoterMatric.toLowerCase().replace('/', '')}@uniport.edu.ng`,
      phone: '+234 800 000 0000',
    });

    setNewVoterName('');
    setNewVoterMatric('');
    setShowAddVoter(false);
  };

  const exportAuditCSV = () => {
    const headers = 'ID,Timestamp,Actor,Action,Category,EncryptedHash,Details\n';
    const rows = auditLogs
      .map(
        (l) =>
          `"${l.id}","${l.timestamp}","${l.actor}","${l.action}","${l.category}","${l.encryptedHash}","${l.details || ''}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ELECO_Audit_Trail_${Date.now()}.csv`;
    a.click();
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 bg-[#faf8ff] min-h-[85vh]">
      <div className="container mx-auto max-w-[1280px] space-y-8">
        {/* Admin Header Bar */}
        <div className="bg-[#001944] text-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#0055c2] text-white flex items-center justify-center font-bold shadow-xs">
              <ShieldCheck className="w-6 h-6 text-[#8ab0fe]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  ELECO Commission Admin Console
                </h2>
                <span className="bg-[#0055c2] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Master Clearance
                </span>
              </div>
              <p className="text-xs text-white/80 mt-0.5">
                BAMSSA UNIPORT 2026/2027 General Elections Authority
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onLogout}
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Exit Admin Portal</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-[#c2c6d5] pb-2">
          {[
            { id: 'STATUS', label: 'Electoral Lifecycle Status', icon: Settings },
            { id: 'VOTERS', label: `Voter Roster (${voters.length})`, icon: Users },
            { id: 'CANDIDATES', label: `Candidates (${candidates.length})`, icon: Vote },
            { id: 'AUDIT', label: `Audit Log Feed (${auditLogs.length})`, icon: Lock },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#0055c2] text-white shadow-xs'
                    : 'bg-white text-[#424653] hover:bg-[#f2f3ff] border border-[#c2c6d5]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: ELECTION LIFECYCLE CONTROLS */}
        {activeTab === 'STATUS' && (
          <div className="space-y-6">
            <div className="bg-white border border-[#c2c6d5] rounded-2xl p-6 shadow-xs space-y-6">
              <div>
                <h3 className="text-lg font-bold text-[#131b2e] tracking-tight">
                  Global Election State Controller
                </h3>
                <p className="text-xs text-[#737785]">
                  Select the active operational stage for the entire BAMSSA student voting portal
                </p>
              </div>

              {/* Status Switcher Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    key: 'STANDBY',
                    title: 'Standby / Warmup',
                    desc: 'Pre-election mode. Accreditation lookup allowed, voting booth locked.',
                  },
                  {
                    key: 'ACCREDITATION_OPEN',
                    title: 'Accreditation Only',
                    desc: 'Students can register & generate voter PINs.',
                  },
                  {
                    key: 'LIVE',
                    title: 'Polls Open (LIVE)',
                    desc: 'Ballot booth active, real-time live vote counting stream enabled.',
                  },
                  {
                    key: 'CLOSED',
                    title: 'Polls Closed',
                    desc: 'Voting concluded. Commission auditing tallies before final certification.',
                  },
                ].map((s) => {
                  const isCurrent = status === s.key;
                  return (
                    <div
                      key={s.key}
                      onClick={() => handleStatusChange(s.key as ElectionStatus)}
                      className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                        isCurrent
                          ? 'border-[#0055c2] bg-[#f2f3ff] shadow-sm ring-2 ring-[#0055c2]/20'
                          : 'border-[#c2c6d5]/70 bg-white hover:border-[#8ab0fe]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                              isCurrent
                                ? 'bg-[#0055c2] text-white'
                                : 'bg-[#eaedff] text-[#003f93]'
                            }`}
                          >
                            {s.key}
                          </span>
                          {isCurrent && <CheckCircle2 className="w-4 h-4 text-[#0055c2]" />}
                        </div>
                        <h4 className="text-sm font-bold text-[#131b2e] mb-1">
                          {s.title}
                        </h4>
                        <p className="text-xs text-[#424653] leading-relaxed">
                          {s.desc}
                        </p>
                      </div>

                      <div className="mt-4 pt-2 border-t border-[#c2c6d5]/40 text-right">
                        <span className="text-xs font-bold text-[#0055c2]">
                          {isCurrent ? 'Current Active Mode' : 'Set to Active →'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Test Utilities & Simulation Controls */}
            <div className="bg-white border border-[#c2c6d5] rounded-2xl p-6 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-[#131b2e]">
                Demo &amp; Testing Utilities
              </h3>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => simulateVotes(30)}
                  className="bg-[#eaedff] hover:bg-[#dae2fd] text-[#003f93] font-bold text-xs px-4 py-2.5 rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <PlayCircle className="w-4 h-4 text-[#0055c2]" />
                  <span>Simulate 30 Random Ballots</span>
                </button>

                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to reset all votes and restore factory initial data?')) {
                      resetElectionData();
                    }
                  }}
                  className="bg-[#fff5f5] hover:bg-[#fee2e2] text-[#ba1a1a] border border-[#ffdad6] font-bold text-xs px-4 py-2.5 rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset All Votes to Default Initial State</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: VOTER ROSTER */}
        {activeTab === 'VOTERS' && (
          <div className="bg-white border border-[#c2c6d5] rounded-2xl p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-[#131b2e] tracking-tight">
                  Accredited Voter Roll ({voters.length} Total)
                </h3>
                <p className="text-xs text-[#737785]">
                  Search, accredit, or register students in the Faculty of Basic Medical Sciences
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setShowAddVoter(!showAddVoter)}
                  className="bg-[#0055c2] hover:bg-[#003f93] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Voter</span>
                </button>
              </div>
            </div>

            {/* Add Voter Form Modal/Collapse */}
            {showAddVoter && (
              <form onSubmit={handleCreateVoter} className="p-4 bg-[#f2f3ff] border border-[#c2c6d5] rounded-xl space-y-3">
                <h4 className="text-xs font-bold text-[#003f93] uppercase tracking-wider">
                  Quick Enlist Student Voter
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={newVoterName}
                    onChange={(e) => setNewVoterName(e.target.value)}
                    className="px-3 py-2 bg-white border border-[#c2c6d5] rounded-lg text-xs"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Matric (e.g. U2023/5580000)"
                    value={newVoterMatric}
                    onChange={(e) => setNewVoterMatric(e.target.value)}
                    className="px-3 py-2 bg-white border border-[#c2c6d5] rounded-lg text-xs font-mono"
                    required
                  />
                  <select
                    value={newVoterDept}
                    onChange={(e) => setNewVoterDept(e.target.value as BMSDepartment)}
                    className="px-3 py-2 bg-white border border-[#c2c6d5] rounded-lg text-xs"
                  >
                    <option value="Human Anatomy">Human Anatomy</option>
                    <option value="Human Physiology">Human Physiology</option>
                    <option value="Pharmacology">Pharmacology</option>
                    <option value="Medical Biochemistry">Medical Biochemistry</option>
                  </select>
                  <select
                    value={newVoterLevel}
                    onChange={(e) => setNewVoterLevel(e.target.value as AcademicLevel)}
                    className="px-3 py-2 bg-white border border-[#c2c6d5] rounded-lg text-xs"
                  >
                    <option value="200L">200L</option>
                    <option value="300L">300L</option>
                    <option value="400L">400L</option>
                    <option value="500L">500L</option>
                  </select>
                </div>
                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowAddVoter(false)}
                    className="px-3 py-1.5 text-xs text-[#424653]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-[#0055c2] text-white text-xs font-bold rounded-lg"
                  >
                    Save &amp; Generate PIN
                  </button>
                </div>
              </form>
            )}

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-[#737785] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by name, matric number, or department..."
                value={voterSearch}
                onChange={(e) => setVoterSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#faf8ff] border border-[#c2c6d5] rounded-xl text-xs"
              />
            </div>

            {/* Voters Table */}
            <div className="overflow-x-auto border border-[#eaedff] rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#f2f3ff] text-[#131b2e] uppercase font-bold text-[10px] tracking-wider border-b border-[#eaedff]">
                  <tr>
                    <th className="p-3">Matric Number</th>
                    <th className="p-3">Full Name</th>
                    <th className="p-3">Department &amp; Level</th>
                    <th className="p-3">Voter PIN</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eaedff]">
                  {filteredVoters.map((voter) => (
                    <tr key={voter.id} className="hover:bg-[#faf8ff] transition-colors">
                      <td className="p-3 font-mono font-bold text-[#003f93]">
                        {voter.matricNumber}
                      </td>
                      <td className="p-3 font-semibold text-[#131b2e]">
                        {voter.fullName}
                      </td>
                      <td className="p-3 text-[#424653]">
                        {voter.department} ({voter.level})
                      </td>
                      <td className="p-3 font-mono text-[#0055c2]">
                        {voter.voterPin}
                      </td>
                      <td className="p-3">
                        {voter.hasVoted ? (
                          <span className="bg-[#dcfce7] text-[#15803d] px-2 py-0.5 rounded text-[10px] font-bold">
                            Voted
                          </span>
                        ) : voter.isAccredited ? (
                          <span className="bg-[#dbeafe] text-[#1e40af] px-2 py-0.5 rounded text-[10px] font-bold">
                            Accredited
                          </span>
                        ) : (
                          <span className="bg-[#fef3c7] text-[#92400e] px-2 py-0.5 rounded text-[10px] font-bold">
                            Unaccredited
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-right">
                        {!voter.isAccredited && (
                          <button
                            onClick={() => accreditVoter(voter.matricNumber)}
                            className="text-[11px] font-bold text-[#0055c2] hover:underline"
                          >
                            Accredit
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: CANDIDATES MANAGEMENT */}
        {activeTab === 'CANDIDATES' && (
          <div className="bg-white border border-[#c2c6d5] rounded-2xl p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-[#131b2e] tracking-tight">
                  Executive Candidates Registry ({candidates.length} Certified)
                </h3>
                <p className="text-xs text-[#737785]">
                  Manage certified aspirants across all contested portfolios
                </p>
              </div>

              <button
                onClick={() => setShowAddCandidate(!showAddCandidate)}
                className="bg-[#0055c2] hover:bg-[#003f93] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Certify New Candidate</span>
              </button>
            </div>

            {/* New Candidate Form */}
            {showAddCandidate && (
              <form onSubmit={handleCreateCandidate} className="p-5 bg-[#f2f3ff] border border-[#c2c6d5] rounded-xl space-y-4">
                <h4 className="text-xs font-bold text-[#003f93] uppercase tracking-wider">
                  New Candidate Screening &amp; Certification Form
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-[#131b2e]">Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Sandra O. Douglas"
                      value={newCandName}
                      onChange={(e) => setNewCandName(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#c2c6d5] rounded-lg text-xs"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-[#131b2e]">Contested Position</label>
                    <select
                      value={newCandPosId}
                      onChange={(e) => setNewCandPosId(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#c2c6d5] rounded-lg text-xs"
                    >
                      {positions.map((p) => (
                        <option key={p.id} value={p.id}>{p.title}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-[#131b2e]">Department</label>
                    <select
                      value={newCandDept}
                      onChange={(e) => setNewCandDept(e.target.value as BMSDepartment)}
                      className="w-full px-3 py-2 bg-white border border-[#c2c6d5] rounded-lg text-xs"
                    >
                      <option value="Human Anatomy">Human Anatomy</option>
                      <option value="Human Physiology">Human Physiology</option>
                      <option value="Pharmacology">Pharmacology</option>
                      <option value="Medical Biochemistry">Medical Biochemistry</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-[#131b2e]">Campaign Motto / Tagline</label>
                    <input
                      type="text"
                      placeholder="e.g. Building a healthier future together."
                      value={newCandTagline}
                      onChange={(e) => setNewCandTagline(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#c2c6d5] rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-[#131b2e]">Photo URL</label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={newCandPhoto}
                      onChange={(e) => setNewCandPhoto(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#c2c6d5] rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#131b2e]">Manifesto Points (One per line)</label>
                  <textarea
                    rows={3}
                    placeholder="Enter policy goals, one on each line..."
                    value={newCandManifesto}
                    onChange={(e) => setNewCandManifesto(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#c2c6d5] rounded-lg text-xs"
                  ></textarea>
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddCandidate(false)}
                    className="px-4 py-2 text-xs text-[#424653]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#0055c2] text-white text-xs font-bold rounded-lg"
                  >
                    Certify Candidate
                  </button>
                </div>
              </form>
            )}

            {/* Candidates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {candidates.map((cand) => {
                const pos = positions.find((p) => p.id === cand.positionId);
                return (
                  <div key={cand.id} className="p-4 bg-[#faf8ff] border border-[#c2c6d5] rounded-xl flex items-start gap-3">
                    <img
                      src={cand.photoUrl}
                      alt={cand.fullName}
                      className="w-14 h-14 rounded-xl object-cover border border-[#c2c6d5] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-[#003f93] bg-[#eaedff] px-2 py-0.5 rounded">
                        {pos?.title || cand.positionId}
                      </span>
                      <h4 className="text-sm font-bold text-[#131b2e] truncate mt-1">
                        {cand.fullName}
                      </h4>
                      <p className="text-xs text-[#737785]">
                        Dept. of {cand.department}
                      </p>
                      <div className="mt-2 text-xs font-bold text-[#0055c2]">
                        {cand.votesCount} Total Votes
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: AUDIT LEDGER */}
        {activeTab === 'AUDIT' && (
          <div className="bg-white border border-[#c2c6d5] rounded-2xl p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-[#131b2e] tracking-tight">
                  Official Electoral Audit Log ({auditLogs.length} Records)
                </h3>
                <p className="text-xs text-[#737785]">
                  Official log of all election events, logins, accreditations, and ballots
                </p>
              </div>

              <button
                onClick={exportAuditCSV}
                className="bg-[#0055c2] hover:bg-[#003f93] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <Download className="w-4 h-4" />
                <span>Export Audit CSV</span>
              </button>
            </div>

            <div className="divide-y divide-[#eaedff] border border-[#eaedff] rounded-xl max-h-[460px] overflow-y-auto">
              {auditLogs.map((log) => (
                <div key={log.id} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs hover:bg-[#faf8ff]">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#131b2e]">{log.action}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-[#eaedff] text-[#003f93] rounded-full">
                        {log.category}
                      </span>
                      <span className="text-[#737785]">by {log.actor}</span>
                    </div>
                    {log.details && (
                      <p className="text-[11px] text-[#424653] mt-0.5">{log.details}</p>
                    )}
                  </div>

                  <div className="text-right sm:shrink-0 font-mono text-[11px]">
                    <div className="text-[#0055c2] font-semibold">{log.encryptedHash}</div>
                    <div className="text-[10px] text-[#737785]">
                      {new Date(log.timestamp).toLocaleString('en-GB')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
