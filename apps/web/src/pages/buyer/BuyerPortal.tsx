import { useState } from 'react';
import { Search, UsersRound, Heart, Briefcase } from 'lucide-react';

export default function BuyerPortal() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Espace Acheteur
          </h1>
          <p className="text-gray-600">
            Découvrez et connectez-vous avec des coopératives agricoles en Côte d'Ivoire
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Rechercher des produits, coopératives..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <UsersRound className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Explorer les Coopératives</h3>
            <p className="text-gray-600 text-sm mb-4">
              Parcourez notre répertoire de coopératives agricoles
            </p>
            <a
              href="/cooperatives"
              className="inline-block px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Explorer
            </a>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center border-2 border-primary-500">
            <Briefcase className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Create Buyer Request</h3>
            <p className="text-gray-600 text-sm mb-4">
              Submit your sourcing requirements and get matched with suitable cooperatives
            </p>
            <a
              href="/buyer/request"
              className="inline-block px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Create Request
            </a>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Favoris</h3>
            <p className="text-gray-600 text-sm mb-4">
              Sauvegardez vos coopératives préférées pour un accès rapide
            </p>
            <button className="inline-block px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
              Voir les favoris
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Briefcase className="h-12 w-12 text-secondary-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Mes Commandes</h3>
            <p className="text-gray-600 text-sm mb-4">
              Suivez vos transactions et commandes en cours
            </p>
            <button className="inline-block px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
              Voir les commandes
            </button>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            🚀 Fonctionnalités à venir
          </h3>
          <ul className="space-y-2 text-blue-800">
            <li>• Matching intelligent avec les coopératives</li>
            <li>• Système de commande et transaction sécurisée</li>
            <li>• Gestion des produits et inventaire</li>
            <li>• Messagerie directe avec les coopératives</li>
            <li>• Suivi des commandes en temps réel</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

