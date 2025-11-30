// API functions for cooperatives
// Connects frontend to Supabase database

import { supabase } from '../../../lib/supabase/client';
import type { Cooperative } from '../../../types';

/**
 * Fetch all cooperatives from database
 * Falls back to JSON if Supabase is not configured
 */
export async function getCooperatives(): Promise<{
  data: Cooperative[] | null;
  error: Error | null;
}> {
  // If Supabase is not configured, return null (will fall back to JSON)
  if (!supabase) {
    return { data: null, error: new Error('Supabase not configured') };
  }

  try {
    const { data, error } = await supabase
      .from('cooperatives')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching cooperatives:', error);
      return { data: null, error: new Error(error.message) };
    }

    // Transform database fields to match frontend expectations
    const transformed = (data || []).map((coop: any) => ({
      ...coop,
      // Map database fields to legacy fields for compatibility
      departement: coop.department,
      secteur: coop.sector,
      status: coop.is_verified ? 'verified' : 'pending',
      // Ensure id is string (UUID)
      id: coop.id.toString(),
    })) as Cooperative[];

    return { data: transformed, error: null };
  } catch (err) {
    const error = err instanceof Error ? err : new Error('Unknown error');
    console.error('Exception fetching cooperatives:', error);
    return { data: null, error };
  }
}

/**
 * Fetch a single cooperative by ID
 */
export async function getCooperativeById(id: string): Promise<{
  data: Cooperative | null;
  error: Error | null;
}> {
  if (!supabase) {
    return { data: null, error: new Error('Supabase not configured') };
  }

  try {
    const { data, error } = await supabase
      .from('cooperatives')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching cooperative:', error);
      return { data: null, error: new Error(error.message) };
    }

    if (!data) {
      return { data: null, error: new Error('Cooperative not found') };
    }

    // Transform to match frontend expectations
    const transformed = {
      ...data,
      departement: data.department,
      secteur: data.sector,
      status: data.is_verified ? 'verified' : 'pending',
      id: data.id.toString(),
    } as Cooperative;

    return { data: transformed, error: null };
  } catch (err) {
    const error = err instanceof Error ? err : new Error('Unknown error');
    return { data: null, error };
  }
}

/**
 * Search cooperatives by name, region, or department
 */
export async function searchCooperatives(query: string): Promise<{
  data: Cooperative[] | null;
  error: Error | null;
}> {
  if (!supabase) {
    return { data: null, error: new Error('Supabase not configured') };
  }

  try {
    const searchTerm = query.toLowerCase().trim();
    
    const { data, error } = await supabase
      .from('cooperatives')
      .select('*')
      .or(`name.ilike.%${searchTerm}%,region.ilike.%${searchTerm}%,department.ilike.%${searchTerm}%,sector.ilike.%${searchTerm}%`)
      .order('name', { ascending: true });

    if (error) {
      console.error('Error searching cooperatives:', error);
      return { data: null, error: new Error(error.message) };
    }

    const transformed = (data || []).map((coop: any) => ({
      ...coop,
      departement: coop.department,
      secteur: coop.sector,
      status: coop.is_verified ? 'verified' : 'pending',
      id: coop.id.toString(),
    })) as Cooperative[];

    return { data: transformed, error: null };
  } catch (err) {
    const error = err instanceof Error ? err : new Error('Unknown error');
    return { data: null, error };
  }
}

/**
 * Filter cooperatives by region
 */
export async function getCooperativesByRegion(region: string): Promise<{
  data: Cooperative[] | null;
  error: Error | null;
}> {
  if (!supabase) {
    return { data: null, error: new Error('Supabase not configured') };
  }

  try {
    const { data, error } = await supabase
      .from('cooperatives')
      .select('*')
      .eq('region', region)
      .order('name', { ascending: true });

    if (error) {
      return { data: null, error: new Error(error.message) };
    }

    const transformed = (data || []).map((coop: any) => ({
      ...coop,
      departement: coop.department,
      secteur: coop.sector,
      status: coop.is_verified ? 'verified' : 'pending',
      id: coop.id.toString(),
    })) as Cooperative[];

    return { data: transformed, error: null };
  } catch (err) {
    const error = err instanceof Error ? err : new Error('Unknown error');
    return { data: null, error };
  }
}

/**
 * Filter cooperatives by department
 */
export async function getCooperativesByDepartment(department: string): Promise<{
  data: Cooperative[] | null;
  error: Error | null;
}> {
  if (!supabase) {
    return { data: null, error: new Error('Supabase not configured') };
  }

  try {
    const { data, error } = await supabase
      .from('cooperatives')
      .select('*')
      .eq('department', department)
      .order('name', { ascending: true });

    if (error) {
      return { data: null, error: new Error(error.message) };
    }

    const transformed = (data || []).map((coop: any) => ({
      ...coop,
      departement: coop.department,
      secteur: coop.sector,
      status: coop.is_verified ? 'verified' : 'pending',
      id: coop.id.toString(),
    })) as Cooperative[];

    return { data: transformed, error: null };
  } catch (err) {
    const error = err instanceof Error ? err : new Error('Unknown error');
    return { data: null, error };
  }
}

/**
 * Get verified cooperatives only
 */
export async function getVerifiedCooperatives(): Promise<{
  data: Cooperative[] | null;
  error: Error | null;
}> {
  if (!supabase) {
    return { data: null, error: new Error('Supabase not configured') };
  }

  try {
    const { data, error } = await supabase
      .from('cooperatives')
      .select('*')
      .eq('is_verified', true)
      .order('name', { ascending: true });

    if (error) {
      return { data: null, error: new Error(error.message) };
    }

    const transformed = (data || []).map((coop: any) => ({
      ...coop,
      departement: coop.department,
      secteur: coop.sector,
      status: 'verified' as const,
      id: coop.id.toString(),
    })) as Cooperative[];

    return { data: transformed, error: null };
  } catch (err) {
    const error = err instanceof Error ? err : new Error('Unknown error');
    return { data: null, error };
  }
}

