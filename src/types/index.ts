/**
 * AIROX 2026 Website - Core Types & Interfaces
 * Source of truth data model for JJCET AI & DS Department National Level Technical Symposium
 */

export interface CollegeInfo {
  name: string;
  autonomyStatus: string;
  institutionGroup: string;
  location: string;
  establishedYear: number;
  department: {
    name: string;
    code: string;
    establishedYear: number;
    programme: string;
    facultyCount: string;
    pastEditionParticipants: string;
    vision: string;
    mission: string[];
    overview: string;
    highlights: string[];
  };
}

export interface SymposiumInfo {
  name: string;
  edition: string;
  theme: string;
  date: string;
  isoDate: string;
  venue: string;
  registration: {
    onlineFee: number;
    onSpotFee: number;
    closingDate: string;
    currency: string;
  };
  eventCounts: {
    technical: number;
    nonTechnical: number;
  };
}

export type EventCategory = 'technical' | 'non-technical';

export interface SymposiumEvent {
  id: string;
  title: string;
  category: EventCategory;
  shortDescription: string;
  fullDescription: string;
  isPlaceholder: boolean;
  imageUrl?: string;
  timeSlot?: string;
  venue?: string;
  teamSize?: string;
  prizes?: {
    first?: string;
    second?: string;
    third?: string;
    special?: string;
  };
  rules?: string[];
  coordinators?: {
    faculty?: { name: string; phone?: string; email?: string }[];
    student?: { name: string; phone?: string; role?: string }[];
  };
  tags?: string[];
  submissionRequired?: boolean;
  participationMode?: 'individual' | 'team' | 'both';
  isOnlineRegistrationClosed?: boolean;
  closedNotice?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department?: string;
  photoUrl?: string;
  bio?: string;
  contact?: {
    email?: string;
    phone?: string;
  };
  socials?: {
    linkedin?: string;
    github?: string;
    instagram?: string;
    website?: string;
  };
  isPlaceholder?: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'registration' | 'events' | 'venue';
}

export interface RegistrationFormData {
  fullName: string;
  email: string;
  phone: string;
  collegeName: string;
  yearOfStudy: string;
  major: string;
  majorOther?: string;
  department: string;
  departmentOther: string;
  participationType: 'Individual' | 'Team';
  teamName: string;
  technicalEvents: string[];
  nonTechnicalEvents: string[];
  utrNumber: string;
  paymentScreenshot: File | null;
}

export interface OptionalSectionPlaceholder {
  id: string;
  title: string;
  category: 'accreditation' | 'achievements' | 'laboratories' | 'sponsors' | 'gallery' | 'brochure' | 'certificates' | 'newsletter';
  description: string;
  isAvailable: boolean;
}
