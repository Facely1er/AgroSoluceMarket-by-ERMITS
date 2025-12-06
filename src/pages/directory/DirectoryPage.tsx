import { useState, useEffect, useMemo } from 'react';
import { Search, Building2, Filter, X } from 'lucide-react';
import {
  getCanonicalDirectoryRecords,
  getCanonicalDirectoryRecordsByStatus,
  getCanonicalDirectoryRecordsByCountry,
  getCanonicalDirectoryRecordsByPrimaryCrop,
  getCanonicalDirectoryRecordsByPilotId,
  searchCanonicalDirectoryRecords,
} from '../../features/cooperatives/api/canonicalDirectoryApi';
import CanonicalDirectoryCard from '../../features/cooperatives/components/CanonicalDirectoryCard';
import type { CanonicalCooperativeDirectory } from '../../types';

export default function DirectoryPage() {
  const [records, setRecords] = useState<CanonicalCooperativeDirectory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [cropFilter, setCropFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<'active' | 'all'>('active');
  const [pilotFilter, setPilotFilter] = useState('');

  // Fetch records on mount and when filters change
  useEffect(() => {
    const fetchRecords = async () => {
      setLoading(true);
      setError(null);

      try {
        let result;

        // Apply filters in priority order
        // Note: Pilot filter is applied client-side to avoid breaking existing filter logic
        if (countryFilter && cropFilter) {
          // If both filters are set, fetch by country first, then filter by crop client-side
          const countryResult = await getCanonicalDirectoryRecordsByCountry(countryFilter);
          if (countryResult.error) throw countryResult.error;
          const filtered = (countryResult.data || []).filter(
            r => r.primary_crop?.toLowerCase() === cropFilter.toLowerCase()
          );
          result = { data: filtered, error: null };
        } else if (countryFilter) {
          result = await getCanonicalDirectoryRecordsByCountry(countryFilter);
        } else if (cropFilter) {
          result = await getCanonicalDirectoryRecordsByPrimaryCrop(cropFilter);
        } else if (pilotFilter) {
          result = await getCanonicalDirectoryRecordsByPilotId(pilotFilter);
        } else if (statusFilter === 'active') {
          result = await getCanonicalDirectoryRecordsByStatus('active');
        } else {
          result = await getCanonicalDirectoryRecords();
        }

        if (result.error) {
          throw result.error;
        }

        setRecords(result.data || []);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
        console.error('Error fetching directory records:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, [countryFilter, cropFilter, statusFilter, pilotFilter]);

  // Apply search filter and pilot filter client-side
  const filteredRecords = useMemo(() => {
    let filtered = records;

    // Apply pilot filter if set (client-side to avoid breaking existing filters)
    if (pilotFilter) {
      filtered = filtered.filter(record => 
        record.pilot_id === pilotFilter || 
        record.pilot_label?.toLowerCase() === pilotFilter.toLowerCase()
      );
    }

    // Apply search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(record =>
        record.name.toLowerCase().includes(search) ||
        record.country?.toLowerCase().includes(search) ||
        record.region?.toLowerCase().includes(search) ||
        record.department?.toLowerCase().includes(search) ||
        record.primary_crop?.toLowerCase().includes(search) ||
        record.source_registry?.toLowerCase().includes(search)
      );
    }

    return filtered;
  }, [records, searchTerm, pilotFilter]);

  // Extract unique values for filter dropdowns
  const availableCountries = useMemo(() => {
    const countries = new Set<string>();
    records.forEach(r => {
      if (r.country) countries.add(r.country);
    });
    return Array.from(countries).sort();
  }, [records]);

  const availableCrops = useMemo(() => {
    const crops = new Set<string>();
    records.forEach(r => {
      if (r.primary_crop) crops.add(r.primary_crop);
    });
    return Array.from(crops).sort();
  }, [records]);

  const availablePilots = useMemo(() => {
    const pilots = new Map<string, string>(); // Map pilot_id to pilot_label
    records.forEach(r => {
      if (r.pilot_id) {
        pilots.set(r.pilot_id, r.pilot_label || r.pilot_id);
      }
    });
    return Array.from(pilots.entries())
      .map(([id, label]) => ({ id, label }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [records]);

  const stats = useMemo(() => {
    const active = records.filter(r => r.record_status === 'active').length;
    const uniqueCountries = new Set(records.map(r => r.country).filter(Boolean)).size;
    const uniqueCrops = new Set(records.map(r => r.primary_crop).filter(Boolean)).size;
    return {
      total: records.length,
      active,
      countries: uniqueCountries,
      crops: uniqueCrops,
    };
  }, [records]);

  const clearFilters = () => {
    setCountryFilter('');
    setCropFilter('');
    setSearchTerm('');
    setStatusFilter('active');
    setPilotFilter('');
  };

  const hasActiveFilters = countryFilter || cropFilter || searchTerm || statusFilter !== 'active' || pilotFilter;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du répertoire...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>Erreur de chargement: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-t-4 border-secondary-500">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            📋 Répertoire Canonique des Coopératives
          </h1>
          <p className="text-gray-600">
            Répertoire standardisé des coopératives agricoles
          </p>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md text-center border-l-4 border-primary-500">
            <div className="text-3xl font-bold text-primary-600 mb-1">
              {stats.total.toLocaleString()}
            </div>
            <div className="text-gray-600 text-sm">Enregistrements Totaux</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center border-l-4 border-green-500">
            <div className="text-3xl font-bold text-green-600 mb-1">
              {stats.active.toLocaleString()}
            </div>
            <div className="text-gray-600 text-sm">Actifs</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center border-l-4 border-secondary-500">
            <div className="text-3xl font-bold text-secondary-600 mb-1">
              {stats.countries}
            </div>
            <div className="text-gray-600 text-sm">Pays</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center border-l-4 border-blue-500">
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {stats.crops}
            </div>
            <div className="text-gray-600 text-sm">Cultures</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-900">Filtres</h2>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="ml-auto flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-4 w-4" />
                Réinitialiser
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Rechercher par nom, région..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
              />
            </div>

            {/* Country Filter */}
            <select
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
            >
              <option value="">Tous les pays</option>
              {availableCountries.map(country => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>

            {/* Crop Filter */}
            <select
              value={cropFilter}
              onChange={(e) => setCropFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
            >
              <option value="">Toutes les cultures</option>
              {availableCrops.map(crop => (
                <option key={crop} value={crop}>
                  {crop}
                </option>
              ))}
            </select>

            {/* Pilot Filter */}
            <select
              value={pilotFilter}
              onChange={(e) => setPilotFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
            >
              <option value="">Tous les pilotes</option>
              {availablePilots.map(pilot => (
                <option key={pilot.id} value={pilot.id}>
                  {pilot.label}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'active' | 'all')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
            >
              <option value="active">Actifs uniquement</option>
              <option value="all">Tous les statuts</option>
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Résultats ({filteredRecords.length})
            </h2>
          </div>

          {filteredRecords.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Building2 className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p>Aucune coopérative trouvée</p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="mt-4 text-secondary-600 hover:text-secondary-700 underline"
                >
                  Réinitialiser les filtres
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredRecords.map(record => (
                <CanonicalDirectoryCard key={record.coop_id} record={record} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

