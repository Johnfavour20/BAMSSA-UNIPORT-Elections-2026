import React, { useState } from 'react';
import { useElection } from '../context/ElectionContext';
import { ElectionStatus, BMSDepartment, AcademicLevel, Candidate, Voter } from '../types';
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
  Trash2,
  LayoutDashboard,
  UserCheck,
  ListOrdered,
  UserPlus,
  BarChart3,
  Award,
  History,
  Bell,
  HelpCircle,
  Calendar,
  Clock,
  ArrowRight,
  Check,
  FileCheck2,
  XCircle,
  Eye,
  Sliders,
  Sparkles,
  Printer,
  ChevronRight,
  Filter,
  CheckCircle
} from 'lucide-react';

interface AdminPortalViewProps {
  onLogout: () => void;
}

type AdminTab = 
  | 'dashboard'
  | 'verification'
  | 'voters'
  | 'positions'
  | 'candidates'
  | 'monitoring'
  | 'results'
  | 'certification'
  | 'audit'
  | 'settings';

export const AdminPortalView: React.FC<AdminPortalViewProps> = ({ onLogout }) => {
  const {
    status,
    setElectionStatus,
    voters,
    candidates,
    positions,
    auditLogs,
    departmentStats,
    totalEligible,
    totalBallotsCast,
    turnoutPercentage,
    addCandidate,
    registerVoter,
    accreditVoter,
    resetElectionData,
    simulateVotes,
  } = useElection();

  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [voterSearch, setVoterSearch] = useState('');
  const [voterDeptFilter, setVoterDeptFilter] = useState<string>('ALL');
  const [showAddVoter, setShowAddVoter] = useState(false);
  const [showAddCandidate, setShowAddCandidate] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Settings State
  const [adminReviewCompleted, setAdminReviewCompleted] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);

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

  // Stats calculation
  const approvedVotersCount = voters.filter(v => v.isAccredited).length;
  const pendingVotersCount = voters.filter(v => !v.isAccredited).length;
  const rejectedVotersCount = 45; // Benchmark historical rejected records
  const totalRegisteredCount = approvedVotersCount + pendingVotersCount + rejectedVotersCount;

  const approvedPct = totalRegisteredCount > 0 ? Math.round((approvedVotersCount / totalRegisteredCount) * 100) : 93;
  const pendingPct = totalRegisteredCount > 0 ? Math.round((pendingVotersCount / totalRegisteredCount) * 100) : 5;
  const rejectedPct = Math.max(0, 100 - approvedPct - pendingPct);

  const filteredVoters = voters.filter((v) => {
    const matchesSearch = 
      v.fullName.toLowerCase().includes(voterSearch.toLowerCase()) ||
      v.matricNumber.toLowerCase().includes(voterSearch.toLowerCase()) ||
      v.department.toLowerCase().includes(voterSearch.toLowerCase());
    const matchesDept = voterDeptFilter === 'ALL' || v.department === voterDeptFilter;
    return matchesSearch && matchesDept;
  });

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
    const headers = 'ID,Timestamp,Actor,Action,Category,ReceiptHash,Details\n';
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
    a.download = `BAMSSA_ELECO_Audit_Log_${Date.now()}.csv`;
    a.click();
  };

  const handleSimulateVotes = () => {
    setIsSimulating(true);
    simulateVotes(25);
    setTimeout(() => setIsSimulating(false), 500);
  };

  const navItems: { id: AdminTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'verification', label: 'Voter Verification', icon: UserCheck },
    { id: 'voters', label: 'Voters', icon: Users },
    { id: 'positions', label: 'Positions', icon: ListOrdered },
    { id: 'candidates', label: 'Candidates', icon: UserPlus },
    { id: 'monitoring', label: 'Monitoring', icon: BarChart3 },
    { id: 'results', label: 'Results Management', icon: Vote },
    { id: 'certification', label: 'Certification', icon: Award },
    { id: 'audit', label: 'Audit Logs', icon: History },
  ];

  return (
    <div className="flex bg-[#F8FAFC] min-h-screen text-[#131b2e] antialiased font-sans">
      
      {/* SideNavBar (Desktop & Mobile Drawer) */}
      <aside 
        className={`w-[270px] bg-[#faf8ff] border-r border-[#c2c6d5] flex flex-col py-5 px-3 fixed left-0 top-0 h-screen z-50 transition-transform duration-200 lg:translate-x-0 ${
          mobileNavOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="mb-6 px-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#003f93] text-white flex items-center justify-center shrink-0 shadow-xs">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-base font-extrabold text-[#003f93] tracking-tight leading-tight">
                BAMSSA ELECO
              </h1>
              <p className="text-[11px] font-semibold text-[#424653] uppercase tracking-wider">
                Administrative Portal
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Items List */}
        <ul className="flex-1 space-y-1 overflow-y-auto pr-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileNavOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                    isActive
                      ? 'bg-[#d9e2ff] text-[#003f93] shadow-xs'
                      : 'text-[#424653] hover:bg-[#eaedff] hover:text-[#131b2e]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#003f93]' : 'text-[#737785]'}`} />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Bottom Menu Items */}
        <div className="mt-auto border-t border-[#c2c6d5] pt-3 space-y-1">
          <button
            type="button"
            onClick={() => {
              setActiveTab('settings');
              setMobileNavOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors text-left cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-[#d9e2ff] text-[#003f93]'
                : 'text-[#424653] hover:bg-[#eaedff]'
            }`}
          >
            <Settings className="w-4 h-4 text-[#737785]" />
            <span>Settings</span>
          </button>

          <button
            type="button"
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-[#ba1a1a] hover:bg-[#ffdad6] transition-colors text-left cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {mobileNavOpen && (
        <div 
          onClick={() => setMobileNavOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-[270px] min-h-screen flex flex-col">
        
        {/* TopAppBar */}
        <header className="bg-white border-b border-[#c2c6d5] sticky top-0 z-30 flex justify-between items-center px-4 sm:px-6 py-3 shadow-2xs">
          
          <div className="flex items-center gap-3">
            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="lg:hidden p-2 rounded-lg text-[#424653] hover:bg-[#f2f3ff]"
            >
              <LayoutDashboard className="w-5 h-5" />
            </button>
            
            <h2 className="text-base sm:text-lg font-bold text-[#003f93]">
              BAMSSA Portal
            </h2>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* Status Pill Badge */}
            <div className="flex items-center bg-[#F1F5F9] rounded-full px-3 py-1 border border-[#E2E8F0] select-none">
              <span className={`w-2 h-2 rounded-full mr-2 ${
                status === 'LIVE' ? 'bg-[#ba1a1a] animate-pulse' : 'bg-[#475569]'
              }`}></span>
              <span className="text-[11px] font-bold text-[#475569] uppercase tracking-wider">
                {status === 'LIVE' ? 'LIVE' : status}
              </span>
            </div>

            {/* Icons */}
            <div className="hidden sm:flex items-center gap-1 text-[#424653]">
              <button 
                type="button"
                className="p-1.5 rounded-full hover:bg-[#f2f3ff] transition-colors"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
              </button>
              <button 
                type="button"
                className="p-1.5 rounded-full hover:bg-[#f2f3ff] transition-colors"
                title="Help & Documentation"
              >
                <HelpCircle className="w-4 h-4" />
              </button>
            </div>

            {/* Admin Profile Area */}
            <div className="flex items-center gap-2.5 border-l border-[#c2c6d5] pl-3 sm:pl-4">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-[#131b2e]">John Doe</p>
                <p className="text-[10px] text-[#424653] font-semibold">Administrator</p>
              </div>
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQMLnMaG8L8AGMVyPztLVci5vraUfQ_2g-GM_pXz4dpDZWHoMkeyoxsoArduySODKDxbL81uFTivMBdJ-A1vixsQ1BiMYRGhnR6zZR1x-joOXlWT6WAUeUp2RelfExpGue9V-EY8HE8eTZa5gnFxOwTSQ3NSGzxdCyPPVFQA3AftI8IKC3sPASa9ZWzAAv6Cz0y4qiwLfIkm1KdczHVHCCZIsq9Jbpw-5XpuXkcNbTRGlxOsmiSf0K"
                alt="John Doe"
                className="w-8 h-8 rounded-full border border-[#c2c6d5] object-cover"
              />
            </div>
          </div>
        </header>

        {/* Page Main Canvas */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1280px] w-full mx-auto space-y-6">

          {/* TAB 1: DASHBOARD (Matching the User Design Screenshot Exactly) */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              
              {/* Welcome Area */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#131b2e] tracking-tight">
                  Good morning, John.
                </h1>
                <p className="text-sm sm:text-base text-[#424653] mt-1">
                  Here's the current overview of the BAMSSA 2026 election.
                </p>
              </div>

              {/* Dashboard Grid */}
              <div className="grid grid-cols-12 gap-6">
                
                {/* Left Column (8 of 12 cols on desktop) */}
                <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
                  
                  {/* Primary Election Status Card */}
                  <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden border border-[#E2E8F0] shadow-xs">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#d9e2ff] opacity-25 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
                    
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8 relative z-10">
                      <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-[#131b2e] mb-1.5">
                          BAMSSA General Elections 2026
                        </h2>
                        <p className="text-xs sm:text-sm text-[#424653] flex items-center gap-2 flex-wrap">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4 text-[#737785]" />
                            <span>20 August 2026</span>
                          </span>
                          <span className="text-[#c2c6d5]">|</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-[#737785]" />
                            <span>8:00 AM — 4:00 PM</span>
                          </span>
                        </p>
                      </div>

                      <div className="bg-[#F1F5F9] border border-[#E2E8F0] text-[#475569] px-3 py-1 rounded-full flex items-center gap-1.5 self-start select-none">
                        <span className={`w-2 h-2 rounded-full ${status === 'LIVE' ? 'bg-[#ba1a1a] animate-pulse' : 'bg-[#475569]'}`}></span>
                        <span className="text-xs font-bold uppercase tracking-wider">{status}</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 relative z-10">
                      <div>
                        <p className="text-xs font-bold text-[#737785] uppercase tracking-wider mb-1">
                          Time Remaining
                        </p>
                        <p className="text-4xl sm:text-5xl font-extrabold text-[#003f93] tracking-tight">
                          {status === 'LIVE' ? 'Polls Active' : '3 Days'}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setActiveTab('settings')}
                          className="bg-[#0055c2] hover:bg-[#003f93] text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
                        >
                          Election Settings
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Metric Grid (Bento Style) */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    
                    {/* Card 1: Eligible Voters */}
                    <div className="bg-white/95 rounded-xl p-4 sm:p-5 flex flex-col border border-[#E2E8F0] shadow-xs">
                      <Users className="w-5 h-5 text-[#003f93] mb-3" />
                      <p className="text-2xl sm:text-3xl font-extrabold text-[#131b2e]">
                        {totalEligible.toLocaleString()}
                      </p>
                      <p className="text-xs font-bold text-[#424653] mt-1">Eligible Voters</p>
                      <p className="text-[10px] text-[#737785] mt-auto pt-2">(Approved accounts)</p>
                    </div>

                    {/* Card 2: Pending Verification */}
                    <div className="bg-white/95 rounded-xl p-4 sm:p-5 flex flex-col border border-[#E2E8F0] border-l-4 border-l-[#F59E0B] shadow-xs">
                      <Clock className="w-5 h-5 text-[#F59E0B] mb-3" />
                      <p className="text-2xl sm:text-3xl font-extrabold text-[#131b2e]">
                        {pendingVotersCount}
                      </p>
                      <p className="text-xs font-bold text-[#424653] mt-1">Pending Verification</p>
                      <p className="text-[10px] text-[#92400E] font-medium mt-auto pt-2">Awaiting review</p>
                    </div>

                    {/* Card 3: Candidates */}
                    <div className="bg-white/95 rounded-xl p-4 sm:p-5 flex flex-col border border-[#E2E8F0] shadow-xs">
                      <Vote className="w-5 h-5 text-[#003f93] mb-3" />
                      <p className="text-2xl sm:text-3xl font-extrabold text-[#131b2e]">
                        {candidates.length}
                      </p>
                      <p className="text-xs font-bold text-[#424653] mt-1">Candidates</p>
                      <p className="text-[10px] text-[#737785] mt-auto pt-2">(Approved)</p>
                    </div>

                    {/* Card 4: Positions */}
                    <div className="bg-white/95 rounded-xl p-4 sm:p-5 flex flex-col border border-[#E2E8F0] shadow-xs">
                      <ListOrdered className="w-5 h-5 text-[#003f93] mb-3" />
                      <p className="text-2xl sm:text-3xl font-extrabold text-[#131b2e]">
                        {positions.length}
                      </p>
                      <p className="text-xs font-bold text-[#424653] mt-1">Positions</p>
                      <p className="text-[10px] text-[#737785] mt-auto pt-2">(Configured)</p>
                    </div>

                  </div>

                  {/* Voter Accreditation Summary */}
                  <div className="bg-white/95 rounded-2xl p-5 sm:p-6 border border-[#E2E8F0] shadow-xs space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-base sm:text-lg font-bold text-[#131b2e]">
                        Voter Accreditation
                      </h3>
                      <button 
                        type="button"
                        onClick={() => setActiveTab('verification')}
                        className="text-[#003f93] font-bold text-xs hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>Review</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Stats summary legend */}
                    <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-xs bg-[#003f93]" />
                        <span>Approved: <strong>{approvedVotersCount.toLocaleString()}</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-xs bg-[#FEF3C7] border border-[#F59E0B]" />
                        <span>Pending: <strong>{pendingVotersCount.toLocaleString()}</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-xs bg-[#DC2626]" />
                        <span>Rejected: <strong>{rejectedVotersCount}</strong></span>
                      </div>
                    </div>

                    {/* Segmented Multi-Color Progress Bar */}
                    <div className="w-full h-3.5 bg-[#e2e7ff] rounded-full overflow-hidden flex">
                      <div className="h-full bg-[#003f93] transition-all duration-700" style={{ width: `${approvedPct}%` }} />
                      <div className="h-full bg-[#F59E0B] transition-all duration-700" style={{ width: `${pendingPct}%` }} />
                      <div className="h-full bg-[#DC2626] transition-all duration-700" style={{ width: `${rejectedPct}%` }} />
                    </div>

                    <p className="text-xs text-right text-[#737785]">
                      Total Registered: {totalRegisteredCount.toLocaleString()}
                    </p>
                  </div>

                </div>

                {/* Right Column (4 of 12 cols on desktop) */}
                <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
                  
                  {/* Quick Actions */}
                  <div className="bg-white/95 rounded-2xl p-5 sm:p-6 border border-[#E2E8F0] shadow-xs space-y-3">
                    <h3 className="text-base font-bold text-[#131b2e]">
                      Quick Actions
                    </h3>
                    <div className="space-y-2.5">
                      <button
                        type="button"
                        onClick={() => setActiveTab('verification')}
                        className="w-full border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] text-[#131b2e] font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-2xs"
                      >
                        <UserCheck className="w-4 h-4 text-[#003f93]" />
                        <span>Review Voters</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveTab('candidates')}
                        className="w-full border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] text-[#131b2e] font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-2xs"
                      >
                        <UserPlus className="w-4 h-4 text-[#003f93]" />
                        <span>Manage Candidates</span>
                      </button>
                    </div>
                  </div>

                  {/* Readiness Checklist */}
                  <div className="bg-white/95 rounded-2xl p-5 sm:p-6 border border-[#E2E8F0] shadow-xs space-y-4">
                    <h3 className="text-base font-bold text-[#131b2e] border-b border-[#c2c6d5]/50 pb-2.5">
                      Readiness Checklist
                    </h3>
                    
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="w-5 h-5 text-[#003f93] shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs sm:text-sm font-semibold text-[#131b2e]">Election Details</p>
                        </div>
                      </li>

                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="w-5 h-5 text-[#003f93] shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs sm:text-sm font-semibold text-[#131b2e]">Positions Configured</p>
                        </div>
                      </li>

                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="w-5 h-5 text-[#003f93] shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs sm:text-sm font-semibold text-[#131b2e]">Candidates Approved</p>
                        </div>
                      </li>

                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="w-5 h-5 text-[#003f93] shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs sm:text-sm font-semibold text-[#131b2e]">Window Scheduling</p>
                        </div>
                      </li>

                      <li className="flex items-start gap-2.5 cursor-pointer" onClick={() => setAdminReviewCompleted(!adminReviewCompleted)}>
                        {adminReviewCompleted ? (
                          <CheckCircle className="w-5 h-5 text-[#003f93] shrink-0 mt-0.5" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-[#475569] shrink-0 mt-0.5" />
                        )}
                        <div>
                          <p className="text-xs sm:text-sm font-semibold text-[#131b2e]">Final Admin Review</p>
                          <p className="text-[11px] text-[#475569]">
                            {adminReviewCompleted ? 'Completed' : 'Pending completion'}
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  {/* Election Turnout Card */}
                  <div className="bg-[#F8FAFC] rounded-2xl p-6 flex flex-col items-center justify-center min-h-[160px] text-center border-2 border-dashed border-[#c2c6d5] space-y-2">
                    <h3 className="text-xs sm:text-sm font-bold text-[#131b2e]">
                      Election Turnout
                    </h3>
                    <p className="text-4xl sm:text-5xl font-extrabold text-[#003f93] leading-none">
                      {status === 'LIVE' ? `${turnoutPercentage}%` : '—'}
                    </p>
                    <p className="text-xs text-[#737785]">
                      {status === 'LIVE' 
                        ? `${totalBallotsCast} ballots cast so far` 
                        : 'Data will appear when voting begins.'}
                    </p>
                  </div>

                </div>

              </div>
            </div>
          )}

          {/* TAB 2: VOTER VERIFICATION QUEUE */}
          {activeTab === 'verification' && (
            <div className="bg-white border border-[#c2c6d5] rounded-2xl p-6 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#eaedff] pb-4">
                <div>
                  <h3 className="text-xl font-bold text-[#131b2e]">
                    Voter Accreditation Queue
                  </h3>
                  <p className="text-xs text-[#737785]">
                    Review and verify student medical faculty accreditation submissions
                  </p>
                </div>
                <span className="text-xs font-bold bg-[#eaedff] text-[#003f93] px-3 py-1.5 rounded-lg w-fit">
                  {pendingVotersCount} pending verification
                </span>
              </div>

              <div className="space-y-4">
                {voters.filter(v => !v.isAccredited).map((voter) => (
                  <div 
                    key={voter.id}
                    className="p-4 bg-[#faf8ff] border border-[#c2c6d5] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-[#131b2e]">{voter.fullName}</h4>
                        <span className="bg-[#FEF3C7] text-[#92400E] text-[10px] font-bold px-2 py-0.5 rounded border border-[#F59E0B]/30">
                          PENDING
                        </span>
                      </div>
                      <p className="text-xs text-[#424653] mt-1">
                        Matric: <strong>{voter.matricNumber}</strong> • Dept: <strong>{voter.department} ({voter.level})</strong>
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => accreditVoter(voter.matricNumber)}
                        className="bg-[#0055c2] hover:bg-[#003f93] text-white text-xs font-bold px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve &amp; Issue PIN</span>
                      </button>
                    </div>
                  </div>
                ))}

                {voters.filter(v => !v.isAccredited).length === 0 && (
                  <div className="text-center py-12 text-[#737785] space-y-2">
                    <CheckCircle2 className="w-10 h-10 text-[#0055c2] mx-auto opacity-70" />
                    <p className="font-bold text-sm text-[#131b2e]">All Accreditation Requests Cleared</p>
                    <p className="text-xs">There are currently no voters waiting in the verification queue.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: VOTERS ROSTER */}
          {activeTab === 'voters' && (
            <div className="bg-white border border-[#c2c6d5] rounded-2xl p-6 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-[#131b2e]">
                    Voter Registry &amp; Accreditation
                  </h3>
                  <p className="text-xs text-[#737785]">
                    Authorized student voter database for Faculty of Basic Medical Sciences
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAddVoter(!showAddVoter)}
                  className="bg-[#0055c2] hover:bg-[#003f93] text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Enroll New Student Voter</span>
                </button>
              </div>

              {/* Add Voter Form Accordion */}
              {showAddVoter && (
                <form onSubmit={handleCreateVoter} className="p-5 bg-[#faf8ff] border border-[#c2c6d5] rounded-xl space-y-4">
                  <h4 className="text-sm font-bold text-[#131b2e]">Enroll Single Student Voter</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-[#424653]">Full Legal Name</label>
                      <input
                        type="text"
                        required
                        value={newVoterName}
                        onChange={(e) => setNewVoterName(e.target.value)}
                        placeholder="e.g. John C. Doe"
                        className="w-full mt-1 px-3 py-2 text-xs border border-[#c2c6d5] rounded-lg bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#424653]">Matriculation Number</label>
                      <input
                        type="text"
                        required
                        value={newVoterMatric}
                        onChange={(e) => setNewVoterMatric(e.target.value)}
                        placeholder="e.g. U2021/5530999"
                        className="w-full mt-1 px-3 py-2 text-xs border border-[#c2c6d5] rounded-lg bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#424653]">Department</label>
                      <select
                        value={newVoterDept}
                        onChange={(e) => setNewVoterDept(e.target.value as BMSDepartment)}
                        className="w-full mt-1 px-3 py-2 text-xs border border-[#c2c6d5] rounded-lg bg-white"
                      >
                        <option value="Human Anatomy">Human Anatomy</option>
                        <option value="Human Physiology">Human Physiology</option>
                        <option value="Medical Biochemistry">Medical Biochemistry</option>
                        <option value="Pharmacology">Pharmacology</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#424653]">Academic Level</label>
                      <select
                        value={newVoterLevel}
                        onChange={(e) => setNewVoterLevel(e.target.value as AcademicLevel)}
                        className="w-full mt-1 px-3 py-2 text-xs border border-[#c2c6d5] rounded-lg bg-white"
                      >
                        <option value="100L">100L</option>
                        <option value="200L">200L</option>
                        <option value="300L">300L</option>
                        <option value="400L">400L</option>
                        <option value="500L">500L</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAddVoter(false)}
                      className="px-3.5 py-1.5 text-xs text-[#424653] font-semibold hover:bg-white rounded-lg border border-[#c2c6d5]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 text-xs bg-[#003f93] text-white font-bold rounded-lg shadow-xs"
                    >
                      Save &amp; Enroll
                    </button>
                  </div>
                </form>
              )}

              {/* Filters & Search */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-[#737785] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={voterSearch}
                    onChange={(e) => setVoterSearch(e.target.value)}
                    placeholder="Search by student name, matric number, or department..."
                    className="w-full pl-9 pr-4 py-2 text-xs border border-[#c2c6d5] rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0055c2]/20"
                  />
                </div>

                <select
                  value={voterDeptFilter}
                  onChange={(e) => setVoterDeptFilter(e.target.value)}
                  className="px-3 py-2 text-xs border border-[#c2c6d5] rounded-xl bg-white font-semibold text-[#424653]"
                >
                  <option value="ALL">All Departments</option>
                  <option value="Human Anatomy">Human Anatomy</option>
                  <option value="Human Physiology">Human Physiology</option>
                  <option value="Medical Biochemistry">Medical Biochemistry</option>
                  <option value="Pharmacology">Pharmacology</option>
                </select>
              </div>

              {/* Table */}
              <div className="overflow-x-auto border border-[#c2c6d5] rounded-xl">
                <table className="w-full text-left text-xs text-[#131b2e]">
                  <thead className="bg-[#f2f3ff] border-b border-[#c2c6d5] font-bold text-[#424653] uppercase tracking-wider">
                    <tr>
                      <th className="px-4 py-3">Student Name</th>
                      <th className="px-4 py-3">Matric No.</th>
                      <th className="px-4 py-3">Department &amp; Level</th>
                      <th className="px-4 py-3">Accreditation</th>
                      <th className="px-4 py-3">Ballot Status</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#eaedff]">
                    {filteredVoters.map((voter) => (
                      <tr key={voter.id} className="hover:bg-[#faf8ff] transition-colors">
                        <td className="px-4 py-3 font-bold">{voter.fullName}</td>
                        <td className="px-4 py-3 font-mono text-[#003f93]">{voter.matricNumber}</td>
                        <td className="px-4 py-3 text-[#424653]">{voter.department} ({voter.level})</td>
                        <td className="px-4 py-3">
                          {voter.isAccredited ? (
                            <span className="bg-[#eaedff] text-[#003f93] px-2 py-0.5 rounded-full font-bold text-[10px]">
                              ACCREDITED
                            </span>
                          ) : (
                            <span className="bg-[#ffdad6] text-[#93000a] px-2 py-0.5 rounded-full font-bold text-[10px]">
                              UNVERIFIED
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {voter.hasVoted ? (
                            <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-bold text-[10px]">
                              VOTED
                            </span>
                          ) : (
                            <span className="text-[#737785] text-[11px]">NOT YET CAST</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right">
                          {!voter.isAccredited && (
                            <button
                              type="button"
                              onClick={() => accreditVoter(voter.matricNumber)}
                              className="text-[#0055c2] font-bold hover:underline text-[11px] cursor-pointer"
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

          {/* TAB 4: POSITIONS */}
          {activeTab === 'positions' && (
            <div className="bg-white border border-[#c2c6d5] rounded-2xl p-6 shadow-xs space-y-6">
              <div className="flex justify-between items-center border-b border-[#eaedff] pb-4">
                <div>
                  <h3 className="text-xl font-bold text-[#131b2e]">
                    Configured Executive Positions ({positions.length})
                  </h3>
                  <p className="text-xs text-[#737785]">
                    Constitutional executive offices for BAMSSA 2026/2027 administration
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {positions.map((pos, idx) => {
                  const posCands = candidates.filter(c => c.positionId === pos.id);
                  return (
                    <div key={pos.id} className="p-5 bg-[#faf8ff] border border-[#c2c6d5] rounded-xl space-y-2">
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-bold text-[#003f93] bg-[#eaedff] px-2 py-0.5 rounded">
                          0{idx + 1}
                        </span>
                        <span className="text-xs font-semibold text-[#424653]">
                          {posCands.length} Candidate{posCands.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-[#131b2e]">{pos.title}</h4>
                      <p className="text-xs text-[#424653] leading-relaxed">{pos.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 5: CANDIDATES */}
          {activeTab === 'candidates' && (
            <div className="bg-white border border-[#c2c6d5] rounded-2xl p-6 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#eaedff] pb-4">
                <div>
                  <h3 className="text-xl font-bold text-[#131b2e]">
                    Electoral Candidates ({candidates.length})
                  </h3>
                  <p className="text-xs text-[#737785]">
                    Screened and cleared contestants across all executive positions
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAddCandidate(!showAddCandidate)}
                  className="bg-[#0055c2] hover:bg-[#003f93] text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Register Candidate</span>
                </button>
              </div>

              {/* Add Candidate Modal/Accordion */}
              {showAddCandidate && (
                <form onSubmit={handleCreateCandidate} className="p-5 bg-[#faf8ff] border border-[#c2c6d5] rounded-xl space-y-4">
                  <h4 className="text-sm font-bold text-[#131b2e]">Register New Candidate</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-[#424653]">Candidate Full Name</label>
                      <input
                        type="text"
                        required
                        value={newCandName}
                        onChange={(e) => setNewCandName(e.target.value)}
                        placeholder="e.g. David O. Adeyemi"
                        className="w-full mt-1 px-3 py-2 text-xs border border-[#c2c6d5] rounded-lg bg-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#424653]">Position</label>
                      <select
                        value={newCandPosId}
                        onChange={(e) => setNewCandPosId(e.target.value)}
                        className="w-full mt-1 px-3 py-2 text-xs border border-[#c2c6d5] rounded-lg bg-white"
                      >
                        {positions.map(p => (
                          <option key={p.id} value={p.id}>{p.title}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#424653]">Department</label>
                      <select
                        value={newCandDept}
                        onChange={(e) => setNewCandDept(e.target.value as BMSDepartment)}
                        className="w-full mt-1 px-3 py-2 text-xs border border-[#c2c6d5] rounded-lg bg-white"
                      >
                        <option value="Human Anatomy">Human Anatomy</option>
                        <option value="Human Physiology">Human Physiology</option>
                        <option value="Medical Biochemistry">Medical Biochemistry</option>
                        <option value="Pharmacology">Pharmacology</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-xs font-semibold text-[#424653]">Campaign Tagline / Slogan</label>
                      <input
                        type="text"
                        value={newCandTagline}
                        onChange={(e) => setNewCandTagline(e.target.value)}
                        placeholder="e.g. Advancing Academic Excellence & Welfare"
                        className="w-full mt-1 px-3 py-2 text-xs border border-[#c2c6d5] rounded-lg bg-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#424653]">Photo URL (Optional)</label>
                      <input
                        type="url"
                        value={newCandPhoto}
                        onChange={(e) => setNewCandPhoto(e.target.value)}
                        placeholder="https://..."
                        className="w-full mt-1 px-3 py-2 text-xs border border-[#c2c6d5] rounded-lg bg-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAddCandidate(false)}
                      className="px-3.5 py-1.5 text-xs text-[#424653] font-semibold hover:bg-white rounded-lg border border-[#c2c6d5]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 text-xs bg-[#003f93] text-white font-bold rounded-lg shadow-xs"
                    >
                      Save Candidate
                    </button>
                  </div>
                </form>
              )}

              {/* Candidates Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {candidates.map((c) => {
                  const pos = positions.find(p => p.id === c.positionId);
                  return (
                    <div key={c.id} className="p-4 bg-[#faf8ff] border border-[#c2c6d5] rounded-xl flex items-start gap-3">
                      <img
                        src={c.photoUrl}
                        alt={c.fullName}
                        className="w-14 h-14 rounded-full object-cover border border-[#c2c6d5] shrink-0 bg-[#eaedff]"
                      />
                      <div className="space-y-1 flex-1">
                        <span className="text-[10px] font-bold text-[#003f93] bg-[#eaedff] px-2 py-0.5 rounded">
                          {pos?.title || 'Contestant'}
                        </span>
                        <h4 className="text-sm font-bold text-[#131b2e] leading-tight">{c.fullName}</h4>
                        <p className="text-xs text-[#737785]">{c.department} • {c.level}</p>
                        <p className="text-xs font-bold text-[#131b2e] pt-1">{c.votesCount} votes recorded</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 6: MONITORING */}
          {activeTab === 'monitoring' && (
            <div className="bg-white border border-[#c2c6d5] rounded-2xl p-6 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#eaedff] pb-4">
                <div>
                  <h3 className="text-xl font-bold text-[#131b2e]">
                    Real-Time Ballots &amp; Turnout Monitoring
                  </h3>
                  <p className="text-xs text-[#737785]">
                    Simulate and inspect live incoming ballots from accredited voters
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleSimulateVotes}
                  disabled={isSimulating}
                  className="bg-[#0055c2] hover:bg-[#003f93] text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs transition-all active:scale-98"
                >
                  <Sparkles className={`w-4 h-4 ${isSimulating ? 'animate-spin' : ''}`} />
                  <span>Simulate Incoming Votes (+25)</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-[#faf8ff] border border-[#c2c6d5] rounded-xl">
                  <p className="text-xs font-bold text-[#737785] uppercase">Total Ballots Cast</p>
                  <p className="text-3xl font-extrabold text-[#131b2e] mt-1">{totalBallotsCast}</p>
                </div>
                <div className="p-4 bg-[#faf8ff] border border-[#c2c6d5] rounded-xl">
                  <p className="text-xs font-bold text-[#737785] uppercase">Overall Turnout</p>
                  <p className="text-3xl font-extrabold text-[#003f93] mt-1">{turnoutPercentage}%</p>
                </div>
                <div className="p-4 bg-[#faf8ff] border border-[#c2c6d5] rounded-xl">
                  <p className="text-xs font-bold text-[#737785] uppercase">Eligible Accounts</p>
                  <p className="text-3xl font-extrabold text-[#131b2e] mt-1">{totalEligible}</p>
                </div>
              </div>

              {/* Departmental Breakdown */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-[#131b2e]">Departmental Turnout Progress</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(Object.keys(departmentStats) as BMSDepartment[]).map(dept => {
                    const stats = departmentStats[dept];
                    const pct = stats.eligible > 0 ? Math.round((stats.voted / stats.eligible) * 100) : 0;
                    return (
                      <div key={dept} className="p-4 bg-[#faf8ff] border border-[#c2c6d5] rounded-xl space-y-2">
                        <div className="flex justify-between text-xs font-bold">
                          <span>{dept}</span>
                          <span className="text-[#003f93]">{pct}% ({stats.voted}/{stats.eligible})</span>
                        </div>
                        <div className="w-full bg-[#e2e7ff] h-2 rounded-full overflow-hidden">
                          <div className="bg-[#003f93] h-full rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: RESULTS MANAGEMENT */}
          {activeTab === 'results' && (
            <div className="bg-white border border-[#c2c6d5] rounded-2xl p-6 shadow-xs space-y-6">
              <div className="flex justify-between items-center border-b border-[#eaedff] pb-4">
                <div>
                  <h3 className="text-xl font-bold text-[#131b2e]">
                    Official Vote Tally &amp; Standing
                  </h3>
                  <p className="text-xs text-[#737785]">
                    Decisive vote counts by position and candidate
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="bg-[#eaedff] hover:bg-[#dae2fd] text-[#003f93] font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Tally Sheet</span>
                </button>
              </div>

              <div className="space-y-6">
                {positions.map(pos => {
                  const posCands = candidates
                    .filter(c => c.positionId === pos.id)
                    .sort((a, b) => b.votesCount - a.votesCount);
                  const totalVotes = posCands.reduce((acc, c) => acc + c.votesCount, 0);

                  return (
                    <div key={pos.id} className="border border-[#c2c6d5] rounded-xl overflow-hidden">
                      <div className="bg-[#f2f3ff] px-4 py-2.5 font-bold text-xs text-[#131b2e] flex justify-between">
                        <span>{pos.title.toUpperCase()}</span>
                        <span>{totalVotes} Votes Cast</span>
                      </div>
                      <div className="p-4 divide-y divide-[#eaedff]">
                        {posCands.map((c, i) => {
                          const pct = totalVotes > 0 ? Math.round((c.votesCount / totalVotes) * 100) : 0;
                          return (
                            <div key={c.id} className="py-2 flex items-center justify-between text-xs">
                              <div className="flex items-center gap-2">
                                <span className="font-bold">{i + 1}. {c.fullName}</span>
                                {i === 0 && totalVotes > 0 && (
                                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded">
                                    ELECTED
                                  </span>
                                )}
                              </div>
                              <span className="font-mono font-bold text-[#003f93]">
                                {c.votesCount} votes ({pct}%)
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 8: CERTIFICATION */}
          {activeTab === 'certification' && (
            <div className="bg-white border border-[#c2c6d5] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6 text-center max-w-2xl mx-auto">
              <Award className="w-14 h-14 text-[#003f93] mx-auto" />
              <div>
                <h3 className="text-2xl font-extrabold text-[#131b2e]">
                  Official Election Certification
                </h3>
                <p className="text-xs text-[#737785] mt-1">
                  BAMSSA UNIPORT Electoral Commission (ELECO 2026)
                </p>
              </div>

              <div className="p-6 bg-[#faf8ff] border border-[#c2c6d5] rounded-2xl text-left space-y-3 text-xs leading-relaxed text-[#424653]">
                <p>
                  This document certifies that the General Elections for the 2026/2027 Executive Council of the Basic Medical Science Students' Association (BAMSSA), University of Port Harcourt Chapter, have been conducted in accordance with the constitution.
                </p>
                <p>
                  Total Ballots Audited: <strong>{totalBallotsCast}</strong> | Turnout Rate: <strong>{turnoutPercentage}%</strong>
                </p>
                <div className="pt-4 border-t border-[#c2c6d5] flex justify-between items-end">
                  <div>
                    <p className="font-bold text-[#131b2e]">Dr. ELECO Returning Officer</p>
                    <p className="text-[10px] text-[#737785]">Chief Electoral Commissioner</p>
                  </div>
                  <span className="bg-[#eaedff] text-[#003f93] text-[10px] font-bold px-3 py-1 rounded-full border border-[#003f93]/20">
                    SEALED &amp; RECORDED
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => window.print()}
                className="bg-[#0055c2] hover:bg-[#003f93] text-white font-bold text-xs px-6 py-3 rounded-xl transition-colors cursor-pointer inline-flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official Certificate</span>
              </button>
            </div>
          )}

          {/* TAB 9: AUDIT LOGS */}
          {activeTab === 'audit' && (
            <div className="bg-white border border-[#c2c6d5] rounded-2xl p-6 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#eaedff] pb-4">
                <div>
                  <h3 className="text-xl font-bold text-[#131b2e]">
                    Tamper-Proof Audit Trail Feed ({auditLogs.length})
                  </h3>
                  <p className="text-xs text-[#737785]">
                    Immutable verification records of all ballots, voter authentications, and admin actions
                  </p>
                </div>

                <button
                  type="button"
                  onClick={exportAuditCSV}
                  className="bg-[#eaedff] hover:bg-[#dae2fd] text-[#003f93] font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Export CSV Log</span>
                </button>
              </div>

              <div className="space-y-3">
                {auditLogs.slice(0, 50).map((log) => (
                  <div key={log.id} className="p-3.5 bg-[#faf8ff] border border-[#c2c6d5] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#131b2e]">{log.action}</span>
                        <span className="bg-[#eaedff] text-[#003f93] text-[10px] font-bold px-2 py-0.5 rounded">
                          {log.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#737785] mt-0.5">
                        Actor: <strong>{log.actor}</strong> • {log.details}
                      </p>
                    </div>
                    <div className="text-right font-mono text-[10px] text-[#737785]">
                      <span>{log.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 10: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="bg-white border border-[#c2c6d5] rounded-2xl p-6 shadow-xs space-y-6">
              <div>
                <h3 className="text-xl font-bold text-[#131b2e]">
                  Global Election Lifecycle Controller
                </h3>
                <p className="text-xs text-[#737785]">
                  Configure active operational phases, voting windows, and database maintenance
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    key: 'STANDBY',
                    title: 'Standby / Warmup',
                    desc: 'Pre-election mode. Voter verification lookup allowed, voting booth locked.',
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
                    desc: 'Voting concluded. Commission auditing tallies before certification.',
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
                          <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                            isCurrent ? 'bg-[#0055c2] text-white' : 'bg-[#eaedff] text-[#003f93]'
                          }`}>
                            {s.key}
                          </span>
                          {isCurrent && <CheckCircle2 className="w-4 h-4 text-[#0055c2]" />}
                        </div>
                        <h4 className="text-sm font-bold text-[#131b2e] mb-1">{s.title}</h4>
                        <p className="text-xs text-[#424653] leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Maintenance Tools */}
              <div className="border-t border-[#eaedff] pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-[#131b2e]">Reset Election Database</h4>
                  <p className="text-xs text-[#737785]">Clear all registered test votes and reset voter statuses</p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to reset all votes and return to factory demo data?')) {
                      resetElectionData();
                    }
                  }}
                  className="bg-[#ffdad6] hover:bg-[#ffb4ab] text-[#93000a] font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer w-fit"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Reset Demo Data</span>
                </button>
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
};
