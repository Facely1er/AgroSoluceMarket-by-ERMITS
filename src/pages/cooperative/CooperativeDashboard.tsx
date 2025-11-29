import { Building2, Package, ShoppingCart, MessageSquare } from 'lucide-react';

export default function CooperativeDashboard() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Tableau de Bord Coopérative
          </h1>
          <p className="text-gray-600">
            Gérez vos produits, commandes et communications avec les acheteurs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <Package className="h-8 w-8 text-primary-600 mb-4" />
            <div className="text-2xl font-bold text-gray-900 mb-1">0</div>
            <div className="text-sm text-gray-600">Produits listés</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <ShoppingCart className="h-8 w-8 text-secondary-600 mb-4" />
            <div className="text-2xl font-bold text-gray-900 mb-1">0</div>
            <div className="text-sm text-gray-600">Commandes actives</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <MessageSquare className="h-8 w-8 text-blue-600 mb-4" />
            <div className="text-2xl font-bold text-gray-900 mb-1">0</div>
            <div className="text-sm text-gray-600">Messages non lus</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <Building2 className="h-8 w-8 text-green-600 mb-4" />
            <div className="text-2xl font-bold text-gray-900 mb-1">0</div>
            <div className="text-sm text-gray-600">Acheteurs connectés</div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            🚀 Fonctionnalités à venir
          </h3>
          <ul className="space-y-2 text-blue-800">
            <li>• Gestion des produits et inventaire</li>
            <li>• Système de commande et transaction</li>
            <li>• Messagerie avec les acheteurs</li>
            <li>• Tableaux de bord analytiques</li>
            <li>• Gestion des certifications et conformité EUDR</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

