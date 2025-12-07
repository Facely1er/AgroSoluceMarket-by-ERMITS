import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  BarChart3, 
  AlertCircle,
  Info,
  Upload,
  X,
  Calendar,
  Download,
  CheckCircle,
  XCircle,
  FileDown,
  Zap,
  Globe,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Sprout,
  ClipboardList
} from 'lucide-react';
import { getCurrentUser } from '../../lib/supabase/client';
import { 
  uploadEvidenceDocument, 
  getEvidenceDocuments, 
  deleteEvidenceDocument,
  type EvidenceDocument 
} from '../../features/evidence/api/evidenceDocumentsApi';
import { EVIDENCE_TYPE_LABELS, EVIDENCE_TYPE_TOOLTIP, EVIDENCE_TYPE_DEFAULT } from '../../features/evidence/types/evidenceType';
import {
  getCoverageMetrics,
  getDocumentPresenceStatus,
} from '../../features/coverage/api/coverageApi';
import type { CoverageMetrics, DocumentPresence } from '../../services/coverageService';
import { getGapGuidanceForTypes } from '../../data/gapGuidanceConfig';
import {
  getLatestReadinessSnapshot,
  getReadinessSnapshots,
  createReadinessSnapshot,
} from '../../features/readiness/api/readinessSnapshotsApi';
import type { ReadinessSnapshot } from '../../services/readinessSnapshotService';
import { getReadinessStatusLabel } from '../../data/readinessThresholdsConfig';
import { getCanonicalDirectoryRecordById, updateCanonicalDirectoryRecord } from '../../features/cooperatives/api/canonicalDirectoryApi';
import { generateDueDiligenceSummary } from '../../services/dueDiligenceSummaryService';
import { REGULATORY_REFERENCES, type Jurisdiction, type RegulatoryReference } from '../../data/regulatoryReferences';
import type { CanonicalCooperativeDirectory } from '../../types';
import { getCountryPackByCode, getCountryPackByName } from '../../data/countryPacks';
import { getCommodityPackByName } from '../../data/commodityPacks';
import { downloadAsJSON, formatExportFilename } from '../../utils/exportUtils';
import { enablementConfig } from '../../data/enablementConfig';
import { getRequiredDocTypes } from '../../data/expectedDocumentsConfig';
import { getDocTypeLabel } from '../../data/gapGuidanceConfig';
import { getToolkitById } from '../../data/fieldOfficerToolkitConfig';
import { getFarmerGuidanceForTypes, getFarmerGuidance } from '../../data/farmerGuidanceConfig';
import { getFarmerDeclarations } from '../../features/farmers/api/farmerDeclarationsApi';
import FarmersFirstDashboard from '../cooperative/FarmersFirstDashboard';
import { getFarmersFirstSummary } from '../../features/farmers/api/farmersFirstApi';
import type { FarmersFirstSummary } from '../../features/farmers/api/farmersFirstApi';
import { AssessmentFlow } from '../../components/assessment/AssessmentFlow';
import { getLatestAssessment } from '../../features/assessment/api/assessmentApi';
import type { AssessmentRecord } from '../../features/assessment/api/assessmentApi';

// NOTE: Authentication check is available via getCurrentUser() but not enforced.
// This workspace is currently unprotected. In production, add auth protection here.

export default function CooperativeWorkspace() {
  const { coop_id } = useParams<{ coop_id: string }>();
  const [activeTab, setActiveTab] = useState<'overview' | 'evidence' | 'coverage' | 'gaps' | 'enablement' | 'farmers-first' | 'assessment'>('overview');

  if (!coop_id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Cooperative ID is required</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { 
      id: 'overview' as const, 
      label: 'Overview', 
      icon: LayoutDashboard 
    },
    { 
      id: 'evidence' as const, 
      label: 'Evidence', 
      icon: FileText 
    },
    { 
      id: 'coverage' as const, 
      label: 'Coverage', 
      icon: BarChart3 
    },
    { 
      id: 'gaps' as const, 
      label: 'Gaps & Guidance', 
      icon: AlertCircle 
    },
    { 
      id: 'enablement' as const, 
      label: 'Enablement', 
      icon: Zap 
    },
    { 
      id: 'farmers-first' as const, 
      label: 'Farmers First', 
      icon: Sprout 
    },
    { 
      id: 'assessment' as const, 
      label: 'Assessment', 
      icon: ClipboardList 
    },
  ];

  return (
    <div className="min-h-screen py-8 bg-gradient-to-br from-secondary-50 via-primary-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-t-4 border-primary-500">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Cooperative Workspace
              </h1>
              <p className="text-gray-600">
                Manage your cooperative's documentation and enablement information
              </p>
            </div>
            <div className="ml-4">
              <div className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                <Info className="inline h-3 w-3 mr-1" />
                Access: Unprotected
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && <OverviewTab cooperativeId={coop_id} onSwitchTab={setActiveTab} />}
            {activeTab === 'evidence' && <EvidenceTab cooperativeId={coop_id} />}
            {activeTab === 'coverage' && <CoverageTab cooperativeId={coop_id} />}
            {activeTab === 'gaps' && <GapsTab cooperativeId={coop_id} />}
            {activeTab === 'enablement' && <EnablementTab cooperativeId={coop_id} />}
            {activeTab === 'farmers-first' && <FarmersFirstTab cooperativeId={coop_id} />}
            {activeTab === 'assessment' && <AssessmentTab cooperativeId={coop_id} onComplete={() => setActiveTab('overview')} />}
          </div>
        </div>
      </div>
    </div>
  );
}

function AssessmentTab({ cooperativeId, onComplete }: { cooperativeId: string; onComplete?: () => void }) {
  return (
    <div>
      <AssessmentFlow 
        cooperativeId={cooperativeId} 
        onComplete={onComplete}
      />
    </div>
  );
}

function FarmersFirstTab({ cooperativeId }: { cooperativeId: string }) {
  return (
    <div>
      <FarmersFirstDashboard cooperativeId={cooperativeId} />
    </div>
  );
}

// Tab Components (Shell only - no logic yet)

/**
 * Map country to jurisdiction for regulatory references
 * Basic mapping only - for informational context
 */
function getJurisdictionFromCountry(country?: string): Jurisdiction[] {
  if (!country) return [];
  
  const countryUpper = country.toUpperCase();
  const jurisdictions: Jurisdiction[] = [];
  
  // EU countries (basic mapping)
  if (['FRANCE', 'FR'].includes(countryUpper)) {
    jurisdictions.push('FR');
  }
  if (['GERMANY', 'DE', 'DEUTSCHLAND'].includes(countryUpper)) {
    jurisdictions.push('DE');
  }
  // EU member states get EU jurisdiction
  const euCountries = [
    'AUSTRIA', 'BELGIUM', 'BULGARIA', 'CROATIA', 'CYPRUS', 'CZECH REPUBLIC', 'DENMARK',
    'ESTONIA', 'FINLAND', 'FRANCE', 'GERMANY', 'GREECE', 'HUNGARY', 'IRELAND',
    'ITALY', 'LATVIA', 'LITHUANIA', 'LUXEMBOURG', 'MALTA', 'NETHERLANDS', 'POLAND',
    'PORTUGAL', 'ROMANIA', 'SLOVAKIA', 'SLOVENIA', 'SPAIN', 'SWEDEN'
  ];
  if (euCountries.some(eu => countryUpper.includes(eu))) {
    jurisdictions.push('EU');
  }
  
  // Côte d'Ivoire
  if (['COTE D\'IVOIRE', 'CÔTE D\'IVOIRE', 'IVORY COAST', 'CI'].includes(countryUpper)) {
    jurisdictions.push('CI');
  }
  
  return jurisdictions;
}

/**
 * Filter regulatory references based on jurisdiction and commodity
 * Basic matching only - for informational context
 */
function getApplicableRegulatoryReferences(
  country?: string,
  commodity?: string
): RegulatoryReference[] {
  const jurisdictions = getJurisdictionFromCountry(country);
  if (jurisdictions.length === 0) {
    return [];
  }
  
  // Filter by jurisdiction
  let filtered = REGULATORY_REFERENCES.filter(ref => 
    jurisdictions.includes(ref.jurisdiction)
  );
  
  // Basic commodity matching (if commodity is cocoa, show CI cocoa references)
  if (commodity) {
    const commodityLower = commodity.toLowerCase();
    if (commodityLower.includes('cocoa') || commodityLower.includes('cacao')) {
      // Include CI cocoa references
      const ciCocoaRefs = REGULATORY_REFERENCES.filter(ref => 
        ref.jurisdiction === 'CI' && ref.regulation_name.toLowerCase().includes('cocoa')
      );
      filtered = [...filtered, ...ciCocoaRefs];
    }
  }
  
  // Remove duplicates
  const uniqueRefs = Array.from(new Map(filtered.map(ref => [ref.ref_id, ref])).values());
  return uniqueRefs;
}

function OverviewTab({ cooperativeId, onSwitchTab }: { cooperativeId: string; onSwitchTab?: (tab: 'overview' | 'evidence' | 'coverage' | 'gaps' | 'enablement' | 'farmers-first' | 'assessment') => void }) {
  const [latestSnapshot, setLatestSnapshot] = useState<ReadinessSnapshot | null>(null);
  const [snapshots, setSnapshots] = useState<ReadinessSnapshot[]>([]);
  const [cooperative, setCooperative] = useState<{ pilot_id?: string | null; pilot_label?: string } | null>(null);
  const [cooperativeFull, setCooperativeFull] = useState<CanonicalCooperativeDirectory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [creatingSnapshot, setCreatingSnapshot] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [editingPilot, setEditingPilot] = useState(false);
  const [pilotIdInput, setPilotIdInput] = useState('');
  const [pilotLabelInput, setPilotLabelInput] = useState('');
  const [updatingPilot, setUpdatingPilot] = useState(false);
  const [countryContextExpanded, setCountryContextExpanded] = useState(false);
  const [commodityContextExpanded, setCommodityContextExpanded] = useState(false);
  const [farmersFirstSummary, setFarmersFirstSummary] = useState<FarmersFirstSummary | null>(null);
  const [loadingFarmersFirst, setLoadingFarmersFirst] = useState(true);
  const [latestAssessment, setLatestAssessment] = useState<AssessmentRecord | null>(null);
  const [loadingAssessment, setLoadingAssessment] = useState(true);

  useEffect(() => {
    loadData();
    loadFarmersFirstSummary();
    loadLatestAssessment();
  }, [cooperativeId]);

  const loadLatestAssessment = async () => {
    setLoadingAssessment(true);
    const result = await getLatestAssessment(cooperativeId);
    if (!result.error && result.data) {
      setLatestAssessment(result.data);
    }
    setLoadingAssessment(false);
  };

  const loadFarmersFirstSummary = async () => {
    setLoadingFarmersFirst(true);
    const result = await getFarmersFirstSummary(cooperativeId);
    if (!result.error && result.data) {
      setFarmersFirstSummary(result.data);
    }
    setLoadingFarmersFirst(false);
  };

  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [latestResult, historyResult, cooperativeResult] = await Promise.all([
        getLatestReadinessSnapshot(cooperativeId),
        getReadinessSnapshots(cooperativeId, 10), // Get last 10 snapshots
        getCanonicalDirectoryRecordById(cooperativeId),
      ]);

      if (latestResult.error) {
        setError(latestResult.error.message);
      } else {
        setLatestSnapshot(latestResult.data);
      }

      if (historyResult.error) {
        console.error('Error loading snapshot history:', historyResult.error);
      } else {
        setSnapshots(historyResult.data || []);
      }

      if (cooperativeResult.error) {
        console.error('Error loading cooperative:', cooperativeResult.error);
      } else if (cooperativeResult.data) {
        setCooperativeFull(cooperativeResult.data);
        setCooperative({
          pilot_id: cooperativeResult.data.pilot_id,
          pilot_label: cooperativeResult.data.pilot_label,
        });
        setPilotIdInput(cooperativeResult.data.pilot_id || '');
        setPilotLabelInput(cooperativeResult.data.pilot_label || '');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSnapshot = async () => {
    setCreatingSnapshot(true);
    try {
      const result = await createReadinessSnapshot(cooperativeId);
      if (result.error) {
        alert(`Error creating snapshot: ${result.error.message}`);
      } else {
        await loadData();
      }
    } catch (err) {
      alert(`Error creating snapshot: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setCreatingSnapshot(false);
    }
  };

  const handleUpdatePilot = async () => {
    setUpdatingPilot(true);
    try {
      const result = await updateCanonicalDirectoryRecord(cooperativeId, {
        pilot_id: pilotIdInput || null,
        pilot_label: pilotLabelInput || undefined,
      });
      if (result.error) {
        alert(`Error updating pilot: ${result.error.message}`);
      } else {
        setCooperative({
          pilot_id: result.data?.pilot_id || null,
          pilot_label: result.data?.pilot_label,
        });
        setEditingPilot(false);
        await loadData(); // Reload to get updated data
      }
    } catch (err) {
      alert(`Error updating pilot: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setUpdatingPilot(false);
    }
  };

  const handleExportSummary = async () => {
    setExporting(true);
    try {
      // Gather all required data
      const [
        cooperativeResult,
        evidenceResult,
        coverageResult,
        presenceResult,
        readinessResult,
      ] = await Promise.all([
        getCanonicalDirectoryRecordById(cooperativeId),
        getEvidenceDocuments(cooperativeId),
        getCoverageMetrics(cooperativeId),
        getDocumentPresenceStatus(cooperativeId),
        getLatestReadinessSnapshot(cooperativeId),
      ]);

      // Check for errors
      if (cooperativeResult.error || !cooperativeResult.data) {
        throw new Error(cooperativeResult.error?.message || 'Failed to load cooperative data');
      }

      if (evidenceResult.error) {
        throw new Error(evidenceResult.error.message || 'Failed to load evidence documents');
      }

      // Generate summary
      const summary = generateDueDiligenceSummary(
        cooperativeResult.data,
        evidenceResult.data || [],
        coverageResult.data,
        presenceResult.data || [],
        readinessResult.data
      );

      // Download as JSON
      const filename = formatExportFilename('due_diligence_summary', cooperativeId);
      downloadAsJSON(summary, filename);
    } catch (err) {
      alert(`Error exporting summary: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setExporting(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="text-center py-12 text-gray-500">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <p>Loading overview...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        <p>Error loading overview: {error}</p>
        <button
          onClick={loadData}
          className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Pilot Information */}
      {cooperative && (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          {!editingPilot ? (
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                <span className="font-medium">Pilot:</span> {cooperative.pilot_label || cooperative.pilot_id || 'none'}
              </div>
              <button
                onClick={() => setEditingPilot(true)}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Edit
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pilot ID
                </label>
                <input
                  type="text"
                  value={pilotIdInput}
                  onChange={(e) => setPilotIdInput(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter pilot ID (e.g., pilot-001)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pilot Label (Optional)
                </label>
                <input
                  type="text"
                  value={pilotLabelInput}
                  onChange={(e) => setPilotLabelInput(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter pilot label (e.g., Pilot A)"
                />
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleUpdatePilot}
                  disabled={updatingPilot}
                  className="px-4 py-2 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {updatingPilot ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={() => {
                    setEditingPilot(false);
                    setPilotIdInput(cooperative.pilot_id || '');
                    setPilotLabelInput(cooperative.pilot_label || '');
                  }}
                  className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Farmers First Snapshot */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1 flex items-center gap-2">
              <Sprout className="h-5 w-5 text-primary-600" />
              Farmers First Snapshot
            </h3>
            <p className="text-sm text-gray-600">Overview of farmers onboarding, declarations, training, and impact tracking</p>
          </div>
          <button
            onClick={() => {
              if (onSwitchTab) {
                onSwitchTab('farmers-first');
              }
            }}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            View Full Dashboard →
          </button>
        </div>
        
        {loadingFarmersFirst ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="animate-pulse">
                <div className="h-20 bg-gray-200 rounded-lg"></div>
              </div>
            ))}
          </div>
        ) : farmersFirstSummary ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="text-xs font-medium text-blue-600 mb-1">Onboarding</div>
              <div className="text-2xl font-bold text-blue-900">
                {farmersFirstSummary.farmersOnboarded} / {farmersFirstSummary.totalFarmers}
              </div>
              <div className="text-xs text-blue-700 mt-1">
                {farmersFirstSummary.onboardingCoveragePercentage.toFixed(1)}% coverage
              </div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="text-xs font-medium text-green-600 mb-1">Declarations</div>
              <div className="text-2xl font-bold text-green-900">
                {farmersFirstSummary.farmersWithDeclarations} / {farmersFirstSummary.totalFarmers}
              </div>
              <div className="text-xs text-green-700 mt-1">
                {farmersFirstSummary.declarationsCoveragePercentage.toFixed(1)}% coverage
              </div>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <div className="text-xs font-medium text-purple-600 mb-1">Training</div>
              <div className="text-2xl font-bold text-purple-900">
                {farmersFirstSummary.completedTrainingSessions} / {farmersFirstSummary.totalTrainingSessions}
              </div>
              <div className="text-xs text-purple-700 mt-1">
                {farmersFirstSummary.trainingCoveragePercentage.toFixed(1)}% completed
              </div>
            </div>
            
            <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
              <div className="text-xs font-medium text-orange-600 mb-1">Impact Data</div>
              <div className="text-2xl font-bold text-orange-900">
                {farmersFirstSummary.impactDataPoints}
              </div>
              <div className="text-xs text-orange-700 mt-1">
                {farmersFirstSummary.hasBaseline ? 'Baseline set' : 'No baseline'}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-4 text-gray-500 text-sm">
            No Farmers First data available
          </div>
        )}
      </div>

      {/* Assessment Snapshot */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1 flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-primary-600" />
              Self-Assessment
            </h3>
            <p className="text-sm text-gray-600">Latest self-assessment results (not a certification or compliance determination)</p>
          </div>
          <button
            onClick={() => {
              if (onSwitchTab) {
                onSwitchTab('assessment');
              }
            }}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            {latestAssessment ? 'View Assessment →' : 'Start Assessment →'}
          </button>
        </div>
        
        {loadingAssessment ? (
          <div className="text-center py-4 text-gray-500 text-sm">
            Loading assessment...
          </div>
        ) : latestAssessment ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Score</div>
                <div className="text-2xl font-semibold text-gray-900">
                  {latestAssessment.overall_score}%
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600 mb-1">Completed</div>
                <div className="text-sm font-medium text-gray-900">
                  {formatDate(latestAssessment.completed_at)}
                </div>
              </div>
            </div>
            <div className="pt-3 border-t border-gray-200">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-xs text-yellow-800">
                  <Info className="inline h-3 w-3 mr-1" />
                  Self-assessment (not certified)
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-4 text-gray-500 text-sm">
            No assessment completed yet
          </div>
        )}
      </div>

      {/* Export Summary Button */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Due-Diligence Summary</h3>
            <p className="text-sm text-gray-600">Export a comprehensive summary of cooperative information</p>
          </div>
          <button
            onClick={handleExportSummary}
            disabled={exporting}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FileDown className="h-5 w-5" />
            {exporting ? 'Exporting...' : 'Export Summary'}
          </button>
        </div>
      </div>

      {/* Readiness Status Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Readiness Status</h3>
          <button
            onClick={handleCreateSnapshot}
            disabled={creatingSnapshot}
            className="px-4 py-2 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {creatingSnapshot ? 'Creating...' : 'Create Snapshot'}
          </button>
        </div>

        {latestSnapshot ? (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="text-sm text-gray-600 mb-1">Current Status</div>
                <div className="text-2xl font-semibold text-gray-900">
                  {getReadinessStatusLabel(latestSnapshot.readiness_status)}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600 mb-1">Last Updated</div>
                <div className="text-sm font-medium text-gray-900">
                  {formatDate(latestSnapshot.created_at)}
                </div>
              </div>
            </div>

            {latestSnapshot.snapshot_reason && (
              <div className="pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600 mb-1">Snapshot Reason</div>
                <div className="text-sm text-gray-700">{latestSnapshot.snapshot_reason}</div>
              </div>
            )}

            <div className="pt-4 border-t border-gray-200">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-800">
                  <Info className="inline h-3 w-3 mr-1" />
                  This is an internal readiness shorthand based on documentation coverage. It is not a compliance determination.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">No readiness snapshot available</p>
            <button
              onClick={handleCreateSnapshot}
              disabled={creatingSnapshot}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {creatingSnapshot ? 'Creating...' : 'Create First Snapshot'}
            </button>
          </div>
        )}
      </div>

      {/* Snapshot History */}
      {snapshots.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h4 className="text-md font-semibold text-gray-900">Snapshot History</h4>
          </div>
          <div className="divide-y divide-gray-200">
            {snapshots.map((snapshot) => (
              <div key={snapshot.snapshot_id} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-900">
                        {getReadinessStatusLabel(snapshot.readiness_status)}
                      </span>
                      {snapshot.snapshot_reason && (
                        <span className="text-xs text-gray-500">• {snapshot.snapshot_reason}</span>
                      )}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatDate(snapshot.created_at)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Country Context Section */}
      {cooperativeFull && (() => {
        const countryPack = cooperativeFull.country 
          ? (getCountryPackByCode(cooperativeFull.country) || getCountryPackByName(cooperativeFull.country))
          : null;
        
        if (!countryPack) {
          return null;
        }
        
        return (
          <div className="bg-white rounded-lg border border-gray-200 mb-6">
            <button
              onClick={() => setCountryContextExpanded(!countryContextExpanded)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary-600" />
                Country Context
              </h3>
              {countryContextExpanded ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>
            
            {countryContextExpanded && (
              <div className="px-6 pb-6 space-y-6 border-t border-gray-200">
                {/* Land Tenure Overview */}
                <div>
                  <h4 className="text-md font-semibold text-gray-900 mb-3">Land Tenure Overview</h4>
                  <div className="prose prose-sm max-w-none">
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                      {countryPack.land_tenure_overview}
                    </p>
                  </div>
                </div>
                
                {/* Commonly Accepted Documents */}
                <div>
                  <h4 className="text-md font-semibold text-gray-900 mb-3">Commonly Accepted Documents</h4>
                  <ul className="space-y-2">
                    {countryPack.commonly_accepted_documents.map((doc, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-primary-600 mt-1">•</span>
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Known Limitations */}
                <div>
                  <h4 className="text-md font-semibold text-gray-900 mb-3">Known Limitations</h4>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <ul className="space-y-2">
                      {countryPack.known_limitations.map((limitation, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                          <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                          <span>{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Language Notes */}
                <div>
                  <h4 className="text-md font-semibold text-gray-900 mb-3">Language Notes</h4>
                  <ul className="space-y-2">
                    {countryPack.language_notes.map((note, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-primary-600 mt-1">•</span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Public Sources */}
                <div>
                  <h4 className="text-md font-semibold text-gray-900 mb-3">Public Sources</h4>
                  <ul className="space-y-2">
                    {countryPack.public_sources.map((source, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <ExternalLink className="h-4 w-4 text-primary-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary-600 hover:text-primary-700 hover:underline"
                          >
                            {source.title}
                          </a>
                          {source.description && (
                            <p className="text-xs text-gray-500 mt-1">{source.description}</p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Disclaimer */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">Informational Content Only</p>
                      <p>
                        This country context information is provided for reference purposes only. 
                        It describes common practices and limitations but does not evaluate compliance 
                        or make determinations about specific cooperatives or farmers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          );
        })()}

      {/* Commodity Context Section */}
      {cooperativeFull && (() => {
        const commodityPack = cooperativeFull.primary_crop 
          ? getCommodityPackByName(cooperativeFull.primary_crop)
          : null;
        
        if (!commodityPack) {
          return null;
        }
        
        return (
          <div className="bg-white rounded-lg border border-gray-200 mb-6">
            <button
              onClick={() => setCommodityContextExpanded(!commodityContextExpanded)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Sprout className="h-5 w-5 text-primary-600" />
                Commodity Context (Informational)
              </h3>
              {commodityContextExpanded ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>
            
            {commodityContextExpanded && (
              <div className="px-6 pb-6 space-y-6 border-t border-gray-200">
                {/* Typical Supply Chain */}
                <div>
                  <h4 className="text-md font-semibold text-gray-900 mb-3">Typical Supply Chain</h4>
                  <div className="prose prose-sm max-w-none">
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                      {commodityPack.typical_supply_chain}
                    </p>
                  </div>
                </div>
                
                {/* Common Document Patterns */}
                <div>
                  <h4 className="text-md font-semibold text-gray-900 mb-3">Common Document Patterns</h4>
                  <ul className="space-y-2">
                    {commodityPack.common_document_patterns.map((pattern, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-primary-600 mt-1">•</span>
                        <span>{pattern}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Buyer Expectations Summary */}
                <div>
                  <h4 className="text-md font-semibold text-gray-900 mb-3">Buyer Expectations Summary</h4>
                  <div className="prose prose-sm max-w-none">
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                      {commodityPack.buyer_expectations_summary}
                    </p>
                  </div>
                </div>
                
                {/* Known Challenges */}
                <div>
                  <h4 className="text-md font-semibold text-gray-900 mb-3">Known Challenges</h4>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <ul className="space-y-2">
                      {commodityPack.known_challenges.map((challenge, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                          <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                          <span>{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Reference Links */}
                <div>
                  <h4 className="text-md font-semibold text-gray-900 mb-3">Reference Links</h4>
                  <ul className="space-y-2">
                    {commodityPack.reference_links.map((link, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <ExternalLink className="h-4 w-4 text-primary-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary-600 hover:text-primary-700 hover:underline"
                          >
                            {link.title}
                          </a>
                          {link.description && (
                            <p className="text-xs text-gray-500 mt-1">{link.description}</p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Disclaimer */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">Informational Content Only</p>
                      <p>
                        This commodity context information is provided for reference purposes only. 
                        It describes common patterns and expectations but does not evaluate adequacy, 
                        sufficiency, or compliance of any specific cooperative's documentation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })()}

      {/* Regulatory Context Section */}
      {cooperativeFull && (() => {
        const applicableReferences = getApplicableRegulatoryReferences(
          cooperativeFull.country,
          cooperativeFull.primary_crop
        );
        
        if (applicableReferences.length === 0) {
          return null;
        }
        
        // Group by regulation name
        const groupedByRegulation = applicableReferences.reduce((acc, ref) => {
          if (!acc[ref.regulation_name]) {
            acc[ref.regulation_name] = [];
          }
          acc[ref.regulation_name].push(ref);
          return acc;
        }, {} as Record<string, RegulatoryReference[]>);
        
        return (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Regulatory Context (Informational)
              </h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-800">
                  <Info className="inline h-3 w-3 mr-1" />
                  This section provides regulatory context only. Determination of compliance and due care remains the responsibility of the buyer.
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              {Object.entries(groupedByRegulation).map(([regulationName, references]) => (
                <div key={regulationName} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-md font-semibold text-gray-900 mb-3">{regulationName}</h4>
                  <div className="space-y-3">
                    {references.map((ref) => (
                      <div key={ref.ref_id} className="pl-4 border-l-2 border-gray-200">
                        <div className="text-sm font-medium text-gray-700 mb-1">
                          {ref.article_reference}
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {ref.due_diligence_expectation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })()}
    </div>
  );
}

function EvidenceTab({ cooperativeId }: { cooperativeId: string }) {
  const [documents, setDocuments] = useState<EvidenceDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    doc_type: '',
    title: '',
    issuer: '',
    issue_date: '',
    expiration_date: '',
    file: null as File | null,
  });

  useEffect(() => {
    loadDocuments();
  }, [cooperativeId]);

  const loadDocuments = async () => {
    setLoading(true);
    const { data, error } = await getEvidenceDocuments(cooperativeId);
    if (error) {
      console.error('Error loading documents:', error);
    } else {
      setDocuments(data || []);
    }
    setLoading(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, file: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.file || !formData.title || !formData.doc_type) {
      setUploadError('Please fill in all required fields');
      return;
    }

    setUploading(true);
    setUploadError(null);

    try {
      const user = await getCurrentUser();
      const result = await uploadEvidenceDocument({
        cooperative_id: cooperativeId,
        doc_type: formData.doc_type,
        title: formData.title,
        issuer: formData.issuer || undefined,
        issue_date: formData.issue_date || undefined,
        expiration_date: formData.expiration_date || undefined,
        uploaded_by: user?.id,
        file: formData.file,
      });

      if (result.error) {
        setUploadError(result.error.message);
      } else {
        // Reset form and reload documents
        setFormData({
          doc_type: '',
          title: '',
          issuer: '',
          issue_date: '',
          expiration_date: '',
          file: null,
        });
        setShowUploadForm(false);
        await loadDocuments();
      }
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (documentId: string) => {
    if (!confirm('Are you sure you want to delete this document?')) {
      return;
    }

    const { error } = await deleteEvidenceDocument(documentId);
    if (error) {
      alert(`Error deleting document: ${error.message}`);
    } else {
      await loadDocuments();
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'N/A';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Evidence Documents</h3>
        <button
          onClick={() => setShowUploadForm(!showUploadForm)}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Upload className="h-5 w-5" />
          Upload Document
        </button>
      </div>

      {/* Upload Form */}
      {showUploadForm && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-md font-semibold text-gray-900">Upload New Document</h4>
            <button
              onClick={() => setShowUploadForm(false)}
              className="text-gray-400 hover:text-gray-600"
              title="Close upload form"
              aria-label="Close upload form"
              type="button"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="doc-type-select" className="block text-sm font-medium text-gray-700 mb-1">
                  Document Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="doc-type-select"
                  required
                  value={formData.doc_type}
                  onChange={(e) => setFormData({ ...formData, doc_type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select type</option>
                  <option value="certification">Certification</option>
                  <option value="policy">Policy</option>
                  <option value="land_evidence">Land Evidence</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Document title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Issuer
                </label>
                <input
                  type="text"
                  value={formData.issuer}
                  onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Issuing organization"
                />
              </div>

              <div>
                <label htmlFor="issue-date-input" className="block text-sm font-medium text-gray-700 mb-1">
                  Issue Date
                </label>
                <input
                  id="issue-date-input"
                  type="date"
                  value={formData.issue_date}
                  onChange={(e) => setFormData({ ...formData, issue_date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="expiration-date-input" className="block text-sm font-medium text-gray-700 mb-1">
                  Expiration Date (Optional)
                </label>
                <input
                  id="expiration-date-input"
                  type="date"
                  value={formData.expiration_date}
                  onChange={(e) => setFormData({ ...formData, expiration_date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="file-input" className="block text-sm font-medium text-gray-700 mb-1">
                  File <span className="text-red-500">*</span>
                </label>
                <input
                  id="file-input"
                  type="file"
                  required
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                {formData.file && (
                  <p className="text-sm text-gray-500 mt-1">{formData.file.name}</p>
                )}
              </div>
            </div>

            {uploadError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {uploadError}
              </div>
            )}

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={uploading}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? 'Uploading...' : 'Upload Document'}
              </button>
              <button
                type="button"
                onClick={() => setShowUploadForm(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Documents List */}
      {loading ? (
        <div className="text-center py-12 text-gray-500">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
          Loading documents...
        </div>
      ) : documents.length === 0 ? (
        <div className="text-center py-12 text-gray-500 bg-white rounded-lg border border-gray-200">
          <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p className="text-lg font-medium">No documents uploaded</p>
          <p className="text-sm mt-2 text-gray-400">
            Upload your first evidence document to get started
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Document
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Evidence Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Issuer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dates
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-gray-400 mr-2" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{doc.title}</div>
                          <div className="text-xs text-gray-500">
                            {doc.file_name || 'N/A'} • {formatFileSize(doc.file_size_bytes)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full capitalize">
                        {doc.doc_type || 'other'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span 
                        className="text-xs text-gray-600"
                        title={EVIDENCE_TYPE_TOOLTIP}
                      >
                        {EVIDENCE_TYPE_LABELS[doc.evidence_type || EVIDENCE_TYPE_DEFAULT]}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {doc.issuer || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="space-y-1">
                        {doc.issue_date && (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>Issued: {formatDate(doc.issue_date)}</span>
                          </div>
                        )}
                        {doc.expiration_date && (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>Expires: {formatDate(doc.expiration_date)}</span>
                          </div>
                        )}
                        {doc.uploaded_at && (
                          <div className="flex items-center gap-1">
                            <Upload className="h-3 w-3" />
                            <span>Uploaded: {formatDate(doc.uploaded_at)}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                        Unverified
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        {doc.file_url && (
                          <a
                            href={doc.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                            title="Download"
                          >
                            <Download className="h-5 w-5" />
                          </a>
                        )}
                        <button
                          onClick={() => handleDelete(doc.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function CoverageTab({ cooperativeId }: { cooperativeId: string }) {
  const [metrics, setMetrics] = useState<CoverageMetrics | null>(null);
  const [documentPresence, setDocumentPresence] = useState<DocumentPresence[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCoverageData();
  }, [cooperativeId]);

  const loadCoverageData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [metricsResult, presenceResult] = await Promise.all([
        getCoverageMetrics(cooperativeId),
        getDocumentPresenceStatus(cooperativeId),
      ]);

      if (metricsResult.error) {
        setError(metricsResult.error.message);
      } else {
        setMetrics(metricsResult.data);
      }

      if (presenceResult.error) {
        console.error('Error loading document presence:', presenceResult.error);
      } else {
        setDocumentPresence(presenceResult.data || []);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getDocTypeLabel = (docType: string) => {
    const labels: Record<string, string> = {
      certification: 'Certification',
      policy: 'Policy',
      land_evidence: 'Land Evidence',
      other: 'Other',
    };
    return labels[docType] || docType;
  };

  if (loading) {
    return (
      <div className="text-center py-12 text-gray-500">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <p>Loading coverage metrics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        <p>Error loading coverage data: {error}</p>
        <button
          onClick={loadCoverageData}
          className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Document Coverage</h3>
        <button
          onClick={loadCoverageData}
          className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Refresh
        </button>
      </div>

      {/* Summary Block */}
      {metrics && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="text-md font-semibold text-gray-900 mb-4">Coverage Summary</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {metrics.required_docs_total}
              </div>
              <div className="text-sm text-gray-600">Required Documents Total</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {metrics.required_docs_present}
              </div>
              <div className="text-sm text-gray-600">Required Documents Present</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {(metrics.coverage_percentage ?? 0).toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">Coverage Percentage</div>
            </div>
          </div>
          {metrics.last_updated && (
            <div className="mt-4 text-xs text-gray-500 text-center">
              Last updated: {formatDate(metrics.last_updated)}
            </div>
          )}
        </div>
      )}

      {/* Document Presence List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h4 className="text-md font-semibold text-gray-900">Required Document Types</h4>
        </div>
        {documentPresence.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <p>No required document types configured</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Document Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {documentPresence.map((item) => (
                  <tr key={item.doc_type} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {getDocTypeLabel(item.doc_type)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.present ? (
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle className="h-5 w-5 text-gray-600" />
                          <span>Present</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <XCircle className="h-5 w-5 text-gray-400" />
                          <span>Missing</span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function GapsTab({ cooperativeId }: { cooperativeId: string }) {
  const [documentPresence, setDocumentPresence] = useState<DocumentPresence[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadGapData();
  }, [cooperativeId]);

  const loadGapData = async () => {
    setLoading(true);
    setError(null);

    try {
      const presenceResult = await getDocumentPresenceStatus(cooperativeId);
      
      if (presenceResult.error) {
        setError(presenceResult.error.message);
      } else {
        setDocumentPresence(presenceResult.data || []);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  // Get missing document types
  const missingDocTypes = documentPresence
    .filter(item => !item.present)
    .map(item => item.doc_type);

  // Get guidance for missing doc types
  const gapGuidance = getGapGuidanceForTypes(missingDocTypes);

  if (loading) {
    return (
      <div className="text-center py-12 text-gray-500">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <p>Loading gap analysis...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        <p>Error loading gap data: {error}</p>
        <button
          onClick={loadGapData}
          className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Disclaimer */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Informational due-diligence support</p>
            <p>This information is provided for reference only. Final decisions remain with the buyer.</p>
          </div>
        </div>
      </div>

      {gapGuidance.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <CheckCircle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p className="text-lg font-medium text-gray-900 mb-2">No Documentation Gaps</p>
          <p className="text-sm text-gray-600">
            All expected document types have evidence documents present.
          </p>
        </div>
      ) : (
        <>
          {/* Section 1: Current Documentation Gaps */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h4 className="text-md font-semibold text-gray-900">Current Documentation Gaps</h4>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                {gapGuidance.map((guidance) => (
                  <li key={guidance.docType} className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-900">{guidance.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section 2: Why This Is Commonly Requested */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h4 className="text-md font-semibold text-gray-900">Why This Is Commonly Requested</h4>
            </div>
            <div className="p-6 space-y-6">
              {gapGuidance.map((guidance) => (
                <div key={guidance.docType} className="border-b border-gray-100 last:border-b-0 pb-6 last:pb-0">
                  <h5 className="text-sm font-semibold text-gray-900 mb-2">{guidance.label}</h5>
                  <p className="text-sm text-gray-700 leading-relaxed">{guidance.whyRequested}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Typical Next Steps */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h4 className="text-md font-semibold text-gray-900">Typical Next Steps</h4>
            </div>
            <div className="p-6 space-y-6">
              {gapGuidance.map((guidance) => (
                <div key={guidance.docType} className="border-b border-gray-100 last:border-b-0 pb-6 last:pb-0">
                  <h5 className="text-sm font-semibold text-gray-900 mb-2">{guidance.label}</h5>
                  <p className="text-sm text-gray-700 leading-relaxed">{guidance.typicalNextStep}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function EnablementTab({ cooperativeId }: { cooperativeId: string }) {
  const [cooperative, setCooperative] = useState<{ pilot_id?: string | null; pilot_label?: string } | null>(null);
  const [cooperativeFull, setCooperativeFull] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [downloadingToolkit, setDownloadingToolkit] = useState(false);
  const [exportingEnablement, setExportingEnablement] = useState(false);
  const [documentPresence, setDocumentPresence] = useState<DocumentPresence[]>([]);

  useEffect(() => {
    loadCooperativeData();
    loadDocumentPresence();
  }, [cooperativeId]);

  const loadCooperativeData = async () => {
    setLoading(true);
    try {
      const cooperativeResult = await getCanonicalDirectoryRecordById(cooperativeId);
      if (cooperativeResult.data) {
        setCooperativeFull(cooperativeResult.data);
        setCooperative({
          pilot_id: cooperativeResult.data.pilot_id,
          pilot_label: cooperativeResult.data.pilot_label,
        });
      }
    } catch (err) {
      console.error('Error loading cooperative data:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadDocumentPresence = async () => {
    try {
      const presenceResult = await getDocumentPresenceStatus(cooperativeId);
      if (presenceResult.data) {
        setDocumentPresence(presenceResult.data);
      }
    } catch (err) {
      console.error('Error loading document presence:', err);
    }
  };

  const handleDownloadToolkit = () => {
    setDownloadingToolkit(true);
    try {
      // Get field officer toolkit
      const fieldOfficerToolkit = getToolkitById('field-officer-basics');
      const coopAdminToolkit = getToolkitById('coop-admin-basics');
      
      // Combine both toolkits for download
      const toolkitData = {
        exported_at: new Date().toISOString(),
        cooperative_id: cooperativeId,
        note: 'This toolkit provides informational guidance only. It does not establish compliance requirements.',
        toolkits: [
          fieldOfficerToolkit,
          coopAdminToolkit,
        ].filter(Boolean),
      };

      const filename = formatExportFilename('field_officer_toolkit', cooperativeId, 'json');
      downloadAsJSON(toolkitData, filename);
    } catch (err) {
      console.error('Error downloading toolkit:', err);
      alert('Error downloading toolkit. Please try again.');
    } finally {
      setDownloadingToolkit(false);
    }
  };

  const handleExportEnablementData = async () => {
    setExportingEnablement(true);
    try {
      // Gather all required data
      const [
        farmerDeclarationsResult,
      ] = await Promise.all([
        getFarmerDeclarations(cooperativeId),
      ]);

      // Get field officer checklist (from toolkit)
      const fieldOfficerToolkit = getToolkitById('field-officer-basics');
      const fieldOfficerChecklist = fieldOfficerToolkit?.sections.find(
        section => section.section_title === 'Simple Field Checklist'
      );

      // Get missing doc_types with farmer-friendly explanations
      const missingDocTypes = documentPresence
        .filter(item => !item.present)
        .map(item => {
          const guidance = getFarmerGuidance(item.doc_type);
          return {
            doc_type: item.doc_type,
            doc_type_label: getDocTypeLabel(item.doc_type),
            farmer_friendly_explanation: guidance?.farmer_explanation || null,
          };
        });

      // Structure enablement export data
      const enablementData = {
        exported_at: new Date().toISOString(),
        disclaimer: 'This export structures cooperative-provided and farmer-declared information for enablement purposes. It is not a compliance determination.',
        cooperative: {
          coop_id: cooperativeFull?.coop_id || cooperativeId,
          name: cooperativeFull?.name || null,
          country: cooperativeFull?.country || null,
          region: cooperativeFull?.region || null,
          department: cooperativeFull?.department || null,
          primary_crop: cooperativeFull?.primary_crop || null,
          pilot_id: cooperative?.pilot_id || null,
          pilot_label: cooperative?.pilot_label || null,
        },
        buyerExpectations: {
          intro: enablementConfig.whatBuyersRequest.intro,
          expected_document_types: commonDocTypes.map(docType => ({
            doc_type: docType,
            doc_type_label: getDocTypeLabel(docType),
          })),
          how_information_used: {
            title: enablementConfig.howInformationUsed.title,
            explanation: enablementConfig.howInformationUsed.explanation,
          },
        },
        fieldOfficerChecklist: fieldOfficerChecklist ? {
          section_title: fieldOfficerChecklist.section_title,
          section_body: fieldOfficerChecklist.section_body,
        } : null,
        farmerDeclarations: {
          total_count: farmerDeclarationsResult.data?.length || 0,
          declarations: (farmerDeclarationsResult.data || []).map(decl => ({
            declaration_id: decl.declaration_id,
            declaration_type: decl.declaration_type,
            declared_at: decl.declared_at,
            created_at: decl.created_at,
            // Note: farmer_reference and declared_value are NOT included per privacy rules
          })),
        },
        missingDocumentTypes: missingDocTypes,
      };

      const filename = formatExportFilename('enablement_data', cooperativeId, 'json');
      downloadAsJSON(enablementData, filename);
    } catch (err) {
      console.error('Error exporting enablement data:', err);
      alert('Error exporting enablement data. Please try again.');
    } finally {
      setExportingEnablement(false);
    }
  };

  // Get common document types (using default/common requirements)
  const commonDocTypes = getRequiredDocTypes();

  // Get pilot-specific document types if in a pilot
  const pilotDocTypes = cooperative?.pilot_id 
    ? getRequiredDocTypes() // Use default/common for now, can be extended with pilot-specific config
    : null;

  if (loading) {
    return (
      <div className="text-center py-12 text-gray-500">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <p>Loading enablement information...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Section 1: What Buyers Usually Request */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">What Buyers Usually Request</h3>
        <p className="text-sm text-gray-600 mb-4">
          {enablementConfig.whatBuyersRequest.intro}
        </p>
        <div className="mt-4">
          <ul className="space-y-2">
            {commonDocTypes.map((docType) => (
              <li key={docType} className="flex items-start gap-2">
                <span className="text-primary-600 mt-1">•</span>
                <span className="text-sm text-gray-700">{getDocTypeLabel(docType)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Section 2: Current Pilot Expectations */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Pilot Expectations</h3>
        {cooperative?.pilot_id ? (
          <div>
            {pilotDocTypes && pilotDocTypes.length > 0 ? (
              <div>
                <p className="text-sm text-gray-600 mb-4">
                  {cooperative.pilot_label 
                    ? `Expected document types for pilot: ${cooperative.pilot_label}`
                    : `Expected document types for pilot: ${cooperative.pilot_id}`
                  }
                </p>
                <ul className="space-y-2">
                  {pilotDocTypes.map((docType) => (
                    <li key={docType} className="flex items-start gap-2">
                      <span className="text-primary-600 mt-1">•</span>
                      <span className="text-sm text-gray-700">{getDocTypeLabel(docType)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-sm text-gray-600">No specific document requirements configured for this pilot.</p>
            )}
          </div>
        ) : (
          <p className="text-sm text-gray-600">No active pilot scope.</p>
        )}
      </div>

      {/* Section 3: How This Information Is Used */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{enablementConfig.howInformationUsed.title}</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          {enablementConfig.howInformationUsed.explanation}
        </p>
      </div>

      {/* Section 4: Farmer Declarations Summary */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Farmer Declarations Summary</h3>
          <button
            onClick={handleExportEnablementData}
            disabled={exportingEnablement || loading}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="h-5 w-5" />
            {exportingEnablement ? 'Exporting...' : 'Export Enablement Data'}
          </button>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Expected document types and farmer-friendly explanations for documentation that may be needed.
        </p>

        {documentPresence.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>Loading document status...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {documentPresence.map((item) => {
              const guidance = getFarmerGuidance(item.doc_type);
              return (
                <div key={item.doc_type} className="border-b border-gray-200 last:border-b-0 pb-4 last:pb-0">
                  <div className="flex items-start gap-3 mb-2">
                    <h4 className="text-md font-semibold text-gray-900 flex-1">
                      {getDocTypeLabel(item.doc_type)}
                    </h4>
                    {item.present ? (
                      <span className="px-3 py-1 text-xs font-medium bg-green-50 text-green-700 rounded-full">
                        Documentation provided by cooperative
                      </span>
                    ) : null}
                  </div>
                  {!item.present && guidance && (
                    <p className="text-sm text-gray-600 leading-relaxed mt-2">
                      {guidance.farmer_explanation}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Section 5: Farmer Guidance (for Field Use) */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Farmer Guidance (for Field Use)</h3>
        <p className="text-sm text-gray-600 mb-4">
          Plain language explanations to help you discuss documentation requirements with farmers. 
          These explanations are designed to be supportive and clear, helping farmers understand what 
          is needed and what is acceptable.
        </p>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-yellow-800">
              <p className="font-medium mb-1">Important Note</p>
              <p>This content is intended to support discussions with farmers. It does not replace legal advice.</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {getFarmerGuidanceForTypes(commonDocTypes).map((guidance) => (
            <div key={guidance.docType} className="border-b border-gray-200 last:border-b-0 pb-6 last:pb-0">
              <h4 className="text-md font-semibold text-gray-900 mb-3">
                {getDocTypeLabel(guidance.docType)}
              </h4>
              
              <div className="space-y-4">
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Explanation</h5>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {guidance.farmer_explanation}
                  </p>
                </div>
                
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-2">What is Usually Acceptable</h5>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {guidance.example_acceptance}
                  </p>
                </div>
                
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Common Misunderstandings</h5>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {guidance.common_misunderstandings}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 6: Field Officer Toolkit */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Field Officer Toolkit</h3>
        <p className="text-sm text-gray-600 mb-4">
          Access practical guidance and checklists for field officers and cooperative administrators. 
          This toolkit includes information about why documentation is requested, acceptable document examples, 
          declaration explanations, and field checklists to help with documentation collection.
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Guidance, not rules</p>
              <p>This toolkit provides informational guidance only. It does not establish requirements or make determinations.</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleDownloadToolkit}
          disabled={downloadingToolkit}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="h-5 w-5" />
          {downloadingToolkit ? 'Preparing download...' : 'Download Field Toolkit (PDF/JSON)'}
        </button>
      </div>

      {/* Section 7: Farmer Protection Principles */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Farmer Protection Principles</h3>
        <p className="text-sm text-gray-600 mb-4">
          Learn about AgroSoluce's approach to protecting farmer privacy, reducing audit burden, 
          and ensuring responsible data use.
        </p>
        <Link
          to="/principles/farmer-protection"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          View Farmer Protection Principles
        </Link>
      </div>
    </div>
  );
}


