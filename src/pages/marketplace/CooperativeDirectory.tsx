import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Building2, Filter, Download } from 'lucide-react';
import { useCooperatives } from '../../hooks/useCooperatives';
import { normalizeText } from '../../lib/utils/cooperativeUtils';
import CooperativeMap from '../../features/cooperatives/components/CooperativeMap';
import CooperativeCard from '../../features/cooperatives/components/CooperativeCard';
import type { Cooperative } from '../../types';

export default function CooperativeDirectory() {
  const { cooperatives, loading, error } = useCooperatives();
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [activeTab, setActiveTab] = useState<'list' | 'map' | 'stats'>('list');

  const filteredCooperatives = useMemo(() => {
    return cooperatives.filter(coop => {
      const search = normalizeText(searchTerm);
      const name = normalizeText(coop.name);
      const dept = normalizeText(coop.departement || '');
      const pres = normalizeText(coop.president || '');

      const matchesSearch = !searchTerm ||
        name.includes(search) ||
        dept.includes(search) ||
        pres.includes(search);

      const matchesRegion = !regionFilter || coop.region === regionFilter;
      const matchesDept = !departmentFilter || coop.departement === departmentFilter;

      return matchesSearch && matchesRegion && matchesDept;
    });
  }, [cooperatives, searchTerm, regionFilter, departmentFilter]);

  const regions = useMemo(() => {
    return [...new Set(cooperatives.map(c => c.region))].sort();
  }, [cooperatives]);

  const departments = useMemo(() => {
    return [...new Set(cooperatives.map(c => c.departement).filter(Boolean))].sort();
  }, [cooperatives]);

  const stats = useMemo(() => {
    const verified = cooperatives.filter(c => c.status === 'verified').length;
    const uniqueRegions = new Set(cooperatives.map(c => c.region)).size;
    const uniqueDepartments = new Set(cooperatives.map(c => c.departement).filter(Boolean)).size;
    return {
      total: cooperatives.length,
      verified,
      regions: uniqueRegions,
      departments: uniqueDepartments
    };
  }, [cooperatives]);

  const exportToCSV = () => {
    const header = ['ID', 'Nom', 'Région', 'Département', 'Secteur', 'Statut'];
    const rows = filteredCooperatives.map(c => [
      c.id,
      `"${c.name.replace(/"/g, '""')}"`,
      c.region,
      `"${c.departement || ''}"`,
      c.secteur,
      c.status
    ].join(','));
    const csv = [header.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cooperatives_cote_ivoire.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des données...</p>
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
            🇨🇮 Répertoire des Coopératives - Côte d'Ivoire
          </h1>
          <p className="text-gray-600">
            Système de Traçabilité et Sourcing des Filières Agricoles
          </p>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md text-center border-l-4 border-primary-500">
            <div className="text-3xl font-bold text-primary-600 mb-1">
              {stats.total.toLocaleString()}
            </div>
            <div className="text-gray-600 text-sm">Coopératives Enregistrées</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center border-l-4 border-secondary-500">
            <div className="text-3xl font-bold text-secondary-600 mb-1">
              {stats.regions}
            </div>
            <div className="text-gray-600 text-sm">Régions Couvertes</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center border-l-4 border-green-500">
            <div className="text-3xl font-bold text-green-600 mb-1">
              {stats.verified.toLocaleString()}
            </div>
            <div className="text-gray-600 text-sm">Vérifiées</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center border-l-4 border-blue-500">
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {stats.departments}
            </div>
            <div className="text-gray-600 text-sm">Départements</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Rechercher par nom, département..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
              />
            </div>
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
            >
              <option value="">Toutes les régions</option>
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
            >
              <option value="">Tous les départements</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            <button
              onClick={exportToCSV}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-colors"
            >
              <Download className="h-5 w-5" />
              Exporter CSV
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('list')}
                className={`px-6 py-3 text-sm font-medium border-b-2 ${
                  activeTab === 'list'
                    ? 'border-secondary-500 text-secondary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Building2 className="inline h-4 w-4 mr-2" />
                Liste ({filteredCooperatives.length})
              </button>
              <button
                onClick={() => setActiveTab('map')}
                className={`px-6 py-3 text-sm font-medium border-b-2 ${
                  activeTab === 'map'
                    ? 'border-secondary-500 text-secondary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <MapPin className="inline h-4 w-4 mr-2" />
                Carte
              </button>
              <button
                onClick={() => setActiveTab('stats')}
                className={`px-6 py-3 text-sm font-medium border-b-2 ${
                  activeTab === 'stats'
                    ? 'border-secondary-500 text-secondary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Statistiques
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'list' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCooperatives.length === 0 ? (
                  <div className="col-span-full text-center py-12 text-gray-500">
                    <Building2 className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p>Aucune coopérative trouvée</p>
                  </div>
                ) : (
                  filteredCooperatives.map(coop => (
                    <CooperativeCard key={coop.id} cooperative={coop} />
                  ))
                )}
              </div>
            )}

            {activeTab === 'map' && (
              <CooperativeMap cooperatives={filteredCooperatives} />
            )}

            {activeTab === 'stats' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Distribution par Région</h3>
                  <div className="space-y-2">
                    {regions.slice(0, 10).map(region => {
                      const count = cooperatives.filter(c => c.region === region).length;
                      const percentage = (count / cooperatives.length) * 100;
                      return (
                        <div key={region} className="flex items-center gap-4">
                          <div className="w-48 text-sm text-gray-700">{region}</div>
                          <div className="flex-1 bg-gray-200 rounded-full h-4">
                            <div
                              className="bg-secondary-500 h-4 rounded-full"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <div className="w-16 text-sm font-semibold text-right">{count}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

