// Core types for AgroSoluce Marketplace

export type VerificationStatus = 'pending' | 'verified' | 'rejected';
export type TransactionStatus = 'initiated' | 'confirmed' | 'shipped' | 'delivered' | 'completed' | 'cancelled';
export type QualityGrade = 'premium' | 'standard' | 'basic';

export interface Cooperative {
  id: number;
  name: string;
  region: string;
  departement?: string;
  secteur: string;
  registrationNumber: string;
  president?: string;
  contact?: string;
  phone?: string;
  natureActivite?: string;
  status: VerificationStatus;
  latitude?: number;
  longitude?: number;
  // Enriched fields
  regionSlug?: string;
  departementSlug?: string;
  secteurCanonical?: string;
  natureActiviteTags?: string[];
  phonesE164?: string[];
  primaryPhoneE164?: string | null;
  searchKeywords?: string[];
}

export interface Product {
  id: string;
  cooperative_id: string;
  product_name: string;
  quantity_available: number;
  price_per_unit: number;
  quality_grade?: QualityGrade;
  certifications: string[];
  description?: string;
  images?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface Buyer {
  id: string;
  company_name: string;
  country: string;
  email: string;
  verification_status: VerificationStatus;
  created_at?: string;
  updated_at?: string;
}

export interface Transaction {
  id: string;
  cooperative_id: string;
  buyer_id: string;
  product_id: string;
  transaction_ref: string;
  total_amount: number;
  quantity: number;
  status: TransactionStatus;
  commission_amount: number;
  created_at?: string;
  updated_at?: string;
}

export interface CooperativeData {
  cooperatives: Cooperative[];
}

