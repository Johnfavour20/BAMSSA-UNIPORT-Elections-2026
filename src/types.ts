export type ElectionStatus = 'STANDBY' | 'ACCREDITATION_OPEN' | 'LIVE' | 'CLOSED' | 'CERTIFIED';

export type BMSDepartment = 
  | 'Human Anatomy'
  | 'Human Physiology'
  | 'Pharmacology'
  | 'Medical Biochemistry'
  | 'Medicine & Surgery';

export type AcademicLevel = '100L' | '200L' | '300L' | '400L' | '500L';

export type VerificationStatus = 'pending' | 'approved' | 'rejected';

export interface Voter {
  id: string;
  matricNumber: string;
  fullName: string;
  department: BMSDepartment;
  level: AcademicLevel;
  email: string;
  phone: string;
  isEligible: boolean;
  isAccredited: boolean;
  hasVoted: boolean;
  voterPin: string; // 4-digit biometric PIN
  accreditationTime?: string;
  votedTime?: string;
  ballotReceiptHash?: string;
  avatarUrl?: string;
  verificationStatus?: VerificationStatus;
  registeredAt?: string;
  rejectionReason?: string;
  idCardUrl?: string;
  registrationId?: string;
  reviewNotes?: string;
}

export interface Candidate {
  id: string;
  positionId: string;
  fullName: string;
  department: BMSDepartment;
  level: AcademicLevel;
  cgpaRange: string;
  photoUrl: string;
  tagline: string;
  manifesto: string[];
  runningMate?: {
    name: string;
    department: BMSDepartment;
    level: AcademicLevel;
  };
  votesCount: number;
  approvedByEleco: boolean;
}

export interface ElectionPosition {
  id: string;
  title: string;
  description: string;
  order: number;
  maxSelections: number;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  action: string;
  actor: string;
  encryptedHash: string;
  category: 'SECURITY' | 'ACCREDITATION' | 'VOTE' | 'ADMIN' | 'SYSTEM';
  details?: string;
}

export interface BallotSubmission {
  matricNumber: string;
  votes: Record<string, string>; // positionId -> candidateId
  timestamp: string;
  verificationHash: string;
  deviceFingerprint: string;
}

export interface DepartmentTurnout {
  department: BMSDepartment;
  eligible: number;
  accredited: number;
  voted: number;
}
