import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Building2, Filter, Download, CheckCircle, Users, Shield, TrendingUp, Globe, Info, ArrowRight, Eye } from 'lucide-react';
import { useCooperatives } from '@/hooks/useCooperatives';
import { normalizeText } from '@/lib/utils/cooperativeUtils';
import CooperativeMap from '@/features/cooperatives/components/CooperativeMap';
import CooperativeCard from '@/features/cooperatives/components/CooperativeCard';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import type { Cooperative } from '@/types';

export default function CooperativeDirectory() {
  const { cooperatives, loading, error } = useCooperatives();
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [commodityFilter, setCommodityFilter] = useState('');
  const [certificationFilter, setCertificationFilter] = useState<string[]>([]);
  const [eudrFilter, setEudrFilter] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<'list' | 'map' | 'stats'>('map'); // Map is default landing view

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
      
      // v1 scope filters
      const matchesCountry = !countryFilter || 
        (coop as any).country === countryFilter || 
        coop.country === countryFilter;
      
      const matchesCommodity = !commodityFilter || 
        (coop as any).commodity === commodityFilter;
      
      const matchesCertifications = certificationFilter.length === 0 ||
        certificationFilter.every(cert => 
          (coop.certifications || []).includes(cert)
        );
      
      const matchesEudr = eudrFilter === null ||
        ((coop as any).complianceFlags?.eudrReady === eudrFilter);

      return matchesSearch && matchesRegion && matchesDept && 
             matchesCountry && matchesCommodity && matchesCertifications && matchesEudr;
    });
  }, [cooperatives, searchTerm, regionFilter, departmentFilter, countryFilter, commodityFilter, certificationFilter, eudrFilter]);

  const regions = useMemo(() => {
    return [...new Set(cooperatives.map(c => c.region))].sort();
  }, [cooperatives]);

  const departments = useMemo(() => {
    return [...new Set(cooperatives.map(c => c.departement).filter(Boolean))].sort();
  }, [cooperatives]);

  const countries = useMemo(() => {
    return [...new Set(cooperatives.map(c => (c as any).country || 'Côte d\'Ivoire').filter(Boolean))].sort();
  }, [cooperatives]);

  const commodities = useMemo(() => {
    return [...new Set(cooperatives.map(c => (c as any).commodity || '').filter(Boolean))].sort();
  }, [cooperatives]);

  const availableCertifications = useMemo(() => {
    const allCerts = new Set<string>();
    cooperatives.forEach(c => {
      (c.certifications || []).forEach(cert => allCerts.add(cert));
    });
    return Array.from(allCerts).sort();
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
    <div className="min-h-screen py-8 bg-gradient-to-br from-secondary-50 via-primary-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[
          { label: 'Home', path: '/' },
          { label: 'Cooperatives', path: '/cooperatives' }
        ]} />

        {/* Enhanced Header */}
        <div className="bg-gradient-to-r from-secondary-500 via-secondary-600 to-primary-600 rounded-xl shadow-2xl p-8 md:p-12 mb-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="h-8 w-8 text-white/90" />
              <span className="text-sm font-semibold text-white/80 uppercase tracking-wider">Cooperative Space</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              🇨🇮 Répertoire des Coopératives
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-6 max-w-3xl">
              Système de Traçabilité et Sourcing des Filières Agricoles
            </p>
            <p className="text-base text-white/80 max-w-3xl mb-6 leading-relaxed">
              Explorez un répertoire structuré de coopératives agricoles en Côte d'Ivoire. 
              Découvrez qui elles sont, où elles opèrent, quelles cultures elles produisent, 
              et quelles informations sont disponibles aujourd'hui pour soutenir votre due diligence.
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              <Link
                to="/monitoring"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all border border-white/30 font-medium"
              >
                <Shield className="h-5 w-5" />
                Monitoring & Compliance
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/buyers"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-all border border-white/20 font-medium"
              >
                <Eye className="h-5 w-5" />
                For Buyers
              </Link>
            </div>
          </div>
        </div>

        {/* Informative Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Structured Directory</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Accédez à des profils stables et partageables de coopératives avec leur identité, 
                  contexte de sourcing, et informations régionales.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-secondary-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Due Diligence Support</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Identifiez les écarts de documentation, visualisez les signaux d'engagement des agriculteurs, 
                  et suivez les efforts d'amélioration dans le temps.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Progress Tracking</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Suivez les améliorations visibles et les écarts restants pour prendre des décisions 
                  de sourcing basées sur la transparence et le progrès.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-4">
            <Info className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">À propos de ce répertoire</h3>
              <p className="text-blue-800 text-sm leading-relaxed mb-3">
                Ce répertoire est conçu pour rendre les coopératives visibles et structurer la réalité au niveau 
                des coopératives. Nous commençons par l'agriculteur et agrégeons les informations pour fournir 
                une vue transparente de l'engagement des agriculteurs sans exposer de données personnelles sensibles.
              </p>
              <p className="text-blue-700 text-xs leading-relaxed">
                <strong>Note importante:</strong> Les informations affichées sont basées sur les données disponibles 
                et les auto-évaluations. Ce répertoire ne certifie pas les résultats et ne remplace pas les audits 
                ou vérifications indépendantes. Les décisions finales de sourcing restent la responsabilité des acheteurs.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center border-l-4 border-primary-500 hover:shadow-xl transition-shadow">
            <div className="text-3xl font-bold text-primary-600 mb-1">
              {stats.total.toLocaleString()}
            </div>
            <div className="text-gray-600 text-sm">Coopératives Enregistrées</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center border-l-4 border-secondary-500 hover:shadow-xl transition-shadow">
            <div className="text-3xl font-bold text-secondary-600 mb-1">
              {stats.regions}
            </div>
            <div className="text-gray-600 text-sm">Régions Couvertes</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center border-l-4 border-green-500 hover:shadow-xl transition-shadow">
            <div className="text-3xl font-bold text-green-600 mb-1">
              {stats.verified.toLocaleString()}
            </div>
            <div className="text-gray-600 text-sm">Enregistrées</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {stats.departments}
            </div>
            <div className="text-gray-600 text-sm">Départements</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
          <div className="space-y-4">
            {/* Search and Basic Filters */}
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
              <div>
                <label htmlFor="region-filter" id="region-filter-label" className="sr-only">Filtrer par région</label>
                <select
                  title="Filtrer par région"
                  id="region-filter"
                  value={regionFilter}
                  onChange={(e) => setRegionFilter(e.target.value)}
                  aria-label="Filtrer par région"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                >
                  <option value="">Toutes les régions</option>
                  {regions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="department-filter" id="department-filter-label" className="sr-only">Filtrer par département</label>
                <select
                  title="Filtrer par département"
                  id="department-filter"
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                  aria-label="Filtrer par département"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                >
                  <option value="">Tous les départements</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={exportToCSV}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-colors"
              >
                <Download className="h-5 w-5" />
                Exporter CSV
              </button>
            </div>

            {/* v1 Scope Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t">
              <div>
                <label htmlFor="country-filter" id="country-filter-label" className="sr-only">Filtrer par pays</label>
                <select
                  title="Filtrer par pays"
                  id="country-filter"
                  value={countryFilter}
                  onChange={(e) => setCountryFilter(e.target.value)}
                  aria-label="Filtrer par pays"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                >
                  <option value="">All Countries</option>
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="commodity-filter" id="commodity-filter-label" className="sr-only">Filtrer par produit</label>
                <select
                  title="Filtrer par produit"
                  id="commodity-filter"
                  value={commodityFilter}
                  onChange={(e) => setCommodityFilter(e.target.value)}
                  aria-label="Filtrer par produit"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                >
                  <option value="">All Commodities</option>
                  {commodities.map(commodity => (
                    <option key={commodity} value={commodity}>{commodity}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="eudr-filter" id="eudr-filter-label" className="sr-only">Filtrer par disponibilité EUDR</label>
                <select
                  title="Filtrer par disponibilité EUDR"
                  id="eudr-filter"
                  value={eudrFilter === null ? '' : eudrFilter ? 'yes' : 'no'}
                  onChange={(e) => setEudrFilter(e.target.value === '' ? null : e.target.value === 'yes')}
                  aria-label="Filtrer par disponibilité EUDR"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                >
                  <option value="">EUDR: All</option>
                  <option value="yes">EUDR Context Available</option>
                  <option value="no">EUDR Context Not Available</option>
                </select>
              </div>
              <div className="flex flex-wrap gap-2">
                {availableCertifications.slice(0, 3).map(cert => (
                  <button
                    key={cert}
                    type="button"
                    onClick={() => {
                      setCertificationFilter(prev =>
                        prev.includes(cert)
                          ? prev.filter(c => c !== cert)
                          : [...prev, cert]
                      );
                    }}
                    className={`px-3 py-1 text-sm rounded-lg border transition-colors ${
                      certificationFilter.includes(cert)
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-primary-500'
                    }`}
                  >
                    {cert}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-6 border border-gray-100">
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
              <CooperativeMap 
                cooperatives={filteredCooperatives} 
                onRegionClick={(region) => {
                  setRegionFilter(region);
                  setActiveTab('list'); // Switch to list view when region is selected
                }}
              />
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
                              className="bg-secondary-500 h-4 rounded-full transition-all"
                              style={{ width: `${percentage}%` } as React.CSSProperties}
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

