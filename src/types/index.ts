// Core types for the telemedicine app

export interface User {
  id: string;
  name: string;
  phone: string;
  role: 'patient' | 'asha' | 'doctor' | 'pharmacy' | 'admin';
  language: 'en' | 'hi' | 'pa';
  village?: string;
  createdAt: Date;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  sex: 'male' | 'female' | 'other';
  village: string;
  phone: string;
  language: 'en' | 'hi' | 'pa';
  consentFlags: {
    telemedicine: boolean;
    dataSharing: boolean;
    recording: boolean;
  };
  createdAt: Date;
}

export interface Encounter {
  id: string;
  patientId: string;
  doctorId?: string;
  ashaId?: string;
  vitals?: {
    temperature?: number;
    bloodPressure?: string;
    pulse?: number;
    weight?: number;
  };
  symptoms: string[];
  diagnosis?: string;
  advice?: string;
  status: 'queued' | 'in-progress' | 'completed' | 'synced';
  urgency: 'low' | 'medium' | 'high' | 'emergency';
  createdAt: Date;
  completedAt?: Date;
}

export interface Prescription {
  id: string;
  encounterId: string;
  patientId: string;
  drugs: {
    generic: string;
    brand?: string;
    dose: string;
    frequency: string;
    duration: string;
    listType: 'O' | 'A' | 'B'; // Over counter, Prescription A, Prescription B
    notes?: string;
  }[];
  createdAt: Date;
}

export interface Pharmacy {
  id: string;
  name: string;
  location: {
    village: string;
    coordinates: [number, number];
  };
  phone: string;
  stock: PharmacyStock[];
}

export interface PharmacyStock {
  drugId: string;
  genericName: string;
  brandName?: string;
  quantity: number;
  updatedAt: Date;
}

export interface LanguageInfo {
  code: 'en' | 'hi' | 'pa';
  name: string;
  nativeName: string;
  rtl: boolean;
}

export interface AppState {
  user: User | null;
  language: LanguageInfo;
  isOnline: boolean;
  demoMode: boolean;
  syncQueue: any[];
}