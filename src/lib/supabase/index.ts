// Export Supabase client and utilities
export { supabase, getCurrentUser, signOut, schemaManager } from './client';

// Database types (to be defined when schema is created)
export interface Cooperative {
  id: string;
  name: string;
  region?: string;
  department?: string;
  sector?: string;
  contact?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Product {
  id: string;
  cooperative_id: string;
  name: string;
  description?: string;
  price?: number;
  unit?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Transaction {
  id: string;
  buyer_id: string;
  cooperative_id: string;
  product_id: string;
  quantity: number;
  total_amount: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at?: string;
  updated_at?: string;
}

