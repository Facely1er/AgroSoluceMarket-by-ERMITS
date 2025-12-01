import { useState, useEffect } from 'react';
import { Building2, Package, ShoppingCart, MessageSquare, Users, Shield, FileText, Route } from 'lucide-react';
import FarmerList from '../../features/producers/components/FarmerList';
import ComplianceDashboard from '../../features/compliance/components/ComplianceDashboard';
import AuditList from '../../features/evidence/components/AuditList';
import FieldDeclarationForm from '../../features/evidence/components/FieldDeclarationForm';
import { BatchCard } from '../../features/traceability/components';
import { getBatchesByCooperative } from '../../features/traceability/api/traceabilityApi';

// Mock cooperative ID - in real app, get from auth/context
const MOCK_COOPERATIVE_ID = 'cooperative-id-placeholder';

export default function CooperativeDashboard() {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'farmers' | 'products' | 'traceability' | 'compliance' | 'evidence'
  >('overview');
  const [showFieldDeclarationForm, setShowFieldDeclarationForm] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: Building2 },
    { id: 'farmers', label: 'Producteurs', icon: Users },
    { id: 'products', label: 'Produits', icon: Package },
    { id: 'traceability', label: 'Traçabilité', icon: Route },
    { id: 'compliance', label: 'Conformité', icon: Shield },
    { id: 'evidence', label: 'Preuves', icon: FileText },
  ];

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Tableau de Bord Coopérative
          </h1>
          <p className="text-gray-600">
            Gérez vos producteurs, produits, traçabilité, conformité et preuves
          </p>
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
                    onClick={() => setActiveTab(tab.id as any)}
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
            {activeTab === 'overview' && <OverviewTab />}
            {activeTab === 'farmers' && <FarmerList cooperativeId={MOCK_COOPERATIVE_ID} />}
            {activeTab === 'products' && <ProductsTab />}
            {activeTab === 'traceability' && <TraceabilityTab cooperativeId={MOCK_COOPERATIVE_ID} />}
            {activeTab === 'compliance' && <ComplianceDashboard cooperativeId={MOCK_COOPERATIVE_ID} />}
            {activeTab === 'evidence' && (
              <EvidenceTab
                cooperativeId={MOCK_COOPERATIVE_ID}
                showFieldDeclarationForm={showFieldDeclarationForm}
                onShowForm={() => setShowFieldDeclarationForm(true)}
                onHideForm={() => setShowFieldDeclarationForm(false)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function OverviewTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary-500">
          <Users className="h-8 w-8 text-primary-600 mb-4" />
          <div className="text-2xl font-bold text-gray-900 mb-1">-</div>
          <div className="text-sm text-gray-600">Producteurs</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-secondary-500">
          <Package className="h-8 w-8 text-secondary-600 mb-4" />
          <div className="text-2xl font-bold text-gray-900 mb-1">0</div>
          <div className="text-sm text-gray-600">Produits listés</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <ShoppingCart className="h-8 w-8 text-green-600 mb-4" />
          <div className="text-2xl font-bold text-gray-900 mb-1">0</div>
          <div className="text-sm text-gray-600">Commandes actives</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <Shield className="h-8 w-8 text-blue-600 mb-4" />
          <div className="text-2xl font-bold text-gray-900 mb-1">-</div>
          <div className="text-sm text-gray-600">Statut Conformité</div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">
          Bienvenue sur votre tableau de bord
        </h3>
        <p className="text-blue-800 mb-4">
          Utilisez les onglets ci-dessus pour gérer vos producteurs, produits, traçabilité, conformité et preuves.
        </p>
        <ul className="space-y-2 text-blue-800">
          <li>• <strong>Producteurs:</strong> Gérez votre registre de producteurs</li>
          <li>• <strong>Produits:</strong> Listez et gérez vos produits</li>
          <li>• <strong>Traçabilité:</strong> Suivez vos lots et chaînes d'approvisionnement</li>
          <li>• <strong>Conformité:</strong> Gérez vos certifications et vérifications EUDR</li>
          <li>• <strong>Preuves:</strong> Déclarations de champs, audits et attestations</li>
        </ul>
      </div>
    </div>
  );
}

function ProductsTab() {
  return (
    <div className="text-center py-12 text-gray-500">
      <Package className="h-12 w-12 mx-auto mb-4 text-gray-400" />
      <p>Gestion des produits - À implémenter</p>
      <p className="text-sm mt-2">Cette section permettra de créer et gérer vos produits</p>
    </div>
  );
}

function TraceabilityTab({ cooperativeId }: { cooperativeId: string }) {
  const [batches, setBatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBatches();
  }, [cooperativeId]);

  const loadBatches = async () => {
    const { data } = await getBatchesByCooperative(cooperativeId);
    setBatches(data || []);
    setLoading(false);
  };

  if (loading) {
    return <div className="text-center py-12 text-gray-500">Chargement des lots...</div>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Lots et Traçabilité</h3>
      {batches.length === 0 ? (
        <div className="text-center py-12 text-gray-500">Aucun lot enregistré</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {batches.map((batch) => (
            <BatchCard key={batch.id} batch={batch} />
          ))}
        </div>
      )}
    </div>
  );
}

function EvidenceTab({
  cooperativeId,
  showFieldDeclarationForm,
  onShowForm,
  onHideForm,
}: {
  cooperativeId: string;
  showFieldDeclarationForm: boolean;
  onShowForm: () => void;
  onHideForm: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Preuves et Attestations</h3>
        <button
          onClick={onShowForm}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Nouvelle Déclaration
        </button>
      </div>

      {showFieldDeclarationForm && (
        <FieldDeclarationForm
          cooperativeId={cooperativeId}
          onSuccess={onHideForm}
          onCancel={onHideForm}
        />
      )}

      <div className="space-y-6">
        <div>
          <h4 className="text-md font-semibold text-gray-900 mb-4">Audits</h4>
          <AuditList cooperativeId={cooperativeId} />
        </div>
      </div>
    </div>
  );
}
