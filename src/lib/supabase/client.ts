// Supabase client configuration for AgroSoluce
// Using Database 3 with agrosoluce schema prefix

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const defaultSchema = import.meta.env.VITE_SUPABASE_SCHEMA || 'agrosoluce';

// Log configuration in development
if (import.meta.env.DEV) {
  console.log('AgroSoluce Supabase initialization:');
  console.log('- URL defined:', !!supabaseUrl);
  console.log('- Key defined:', !!supabaseAnonKey);
  console.log('- Default schema:', defaultSchema);
}

// Warn if environment variables are missing
if (!supabaseUrl || !supabaseAnonKey) {
  if (import.meta.env.DEV) {
    console.warn('Supabase environment variables are missing. App will run without Supabase.');
  }
}

// Create Supabase client with agrosoluce schema
export const supabase: SupabaseClient | null = (!supabaseUrl || !supabaseAnonKey)
  ? null
  : createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
      global: {
        fetch: (...args) => {
          if (import.meta.env.DEV) {
            console.log('Supabase fetch:', args[0]);
          }
          return fetch(...args);
        }
      },
      db: {
        schema: 'agrosoluce'
      }
    });

// Helper function to check if user is authenticated
export const getCurrentUser = async () => {
  if (!supabase) {
    return null;
  }
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

// Helper function to sign out
export const signOut = async () => {
  if (!supabase) {
    return { error: null };
  }
  const { error } = await supabase.auth.signOut();
  return { error };
};

// Export schema manager for future use
export const schemaManager = {
  default: defaultSchema,
  
  // Get the appropriate schema based on context
  getSchema(context: 'default' | 'organization' | 'user' = 'default'): string {
    return defaultSchema;
  },
  
  // Create a client with a specific schema
  createClientWithSchema(schema: string): SupabaseClient | null {
    if (!supabaseUrl || !supabaseAnonKey) {
      return null;
    }
    return createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
      db: {
        schema: schema
      }
    });
  }
};

