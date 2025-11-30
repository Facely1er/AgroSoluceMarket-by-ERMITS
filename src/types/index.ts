// Core types for AgroSoluce Marketplace
// Aligned with database schema in database/migrations/001_initial_schema_setup.sql

export type VerificationStatus = 'pending' | 'verified' | 'rejected';
export type TransactionStatus = 'initiated' | 'confirmed' | 'shipped' | 'delivered' | 'completed' | 'cancelled';
export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type UserType = 'buyer' | 'cooperative' | 'admin';
export type QualityGrade = 'premium' | 'standard' | 'basic';

// Database-aligned Cooperative type
export interface Cooperative {
  id: string; // UUID from database
  name: string;
  region?: string;
  department?: string; // Note: database uses 'department', not 'departement'
  commune?: string;
  sector?: string; // Note: database uses 'sector', not 'secteur'
  phone?: string;
  email?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  description?: string;
  products?: string[]; // Array of product names/descriptions
  certifications?: string[];
  is_verified?: boolean; // Database field
  user_profile_id?: string;
  created_at?: string;
  updated_at?: string;
  metadata?: Record<string, any>;
  
  // Legacy/JSON fields (for backward compatibility during migration)
  departement?: string; // Alias for department
  secteur?: string; // Alias for sector
  registrationNumber?: string;
  president?: string;
  contact?: string;
  natureActivite?: string;
  status?: VerificationStatus; // Legacy status field
  
  // Enriched/computed fields (not in database, added by frontend)
  regionSlug?: string;
  departementSlug?: string;
  secteurCanonical?: string;
  natureActiviteTags?: string[];
  phonesE164?: string[];
  primaryPhoneE164?: string | null;
  searchKeywords?: string[];
}

// Database-aligned Product type
export interface Product {
  id: string; // UUID
  cooperative_id: string;
  category_id?: string;
  name: string;
  description?: string;
  price?: number;
  currency?: string; // Default: 'XOF'
  unit?: string; // kg, ton, bag, etc.
  quantity_available?: number;
  harvest_date?: string; // ISO date string
  organic?: boolean;
  certifications?: string[];
  images?: string[];
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
  metadata?: Record<string, any>;
  
  // Legacy fields
  product_name?: string; // Alias for name
  price_per_unit?: number; // Alias for price
  quality_grade?: QualityGrade;
}

// Product Category
export interface ProductCategory {
  id: string;
  name: string;
  description?: string;
  parent_category_id?: string;
  created_at?: string;
}

// User Profile (from database)
export interface UserProfile {
  id: string;
  user_id: string; // References auth.users
  email: string;
  full_name?: string;
  phone_number?: string;
  user_type: UserType;
  organization_name?: string;
  created_at?: string;
  updated_at?: string;
  last_login?: string;
  is_active?: boolean;
  preferences?: Record<string, any>;
}

// Buyer (extends UserProfile or separate view)
export interface Buyer {
  id: string;
  user_profile_id: string;
  company_name?: string;
  country?: string;
  email: string;
  verification_status?: VerificationStatus;
  created_at?: string;
  updated_at?: string;
}

// Order (from database)
export interface Order {
  id: string;
  buyer_id: string;
  cooperative_id: string;
  status: OrderStatus;
  total_amount: number;
  currency?: string; // Default: 'XOF'
  shipping_address?: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
  completed_at?: string;
}

// Order Item
export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  created_at?: string;
}

// Message
export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  order_id?: string;
  subject?: string;
  content: string;
  is_read?: boolean;
  created_at?: string;
}

// Legacy Transaction type (for backward compatibility)
export interface Transaction {
  id: string;
  cooperative_id: string;
  buyer_id: string;
  product_id: string;
  transaction_ref?: string;
  total_amount: number;
  quantity: number;
  status: TransactionStatus;
  commission_amount?: number;
  created_at?: string;
  updated_at?: string;
}

// JSON data structure (for migration)
export interface CooperativeData {
  cooperatives: Cooperative[];
}

