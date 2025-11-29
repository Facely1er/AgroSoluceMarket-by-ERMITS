import { Link } from 'react-router-dom';
import { Building2, Shield, TrendingUp, Globe, ArrowRight } from 'lucide-react';

export default function MarketplaceHome() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="pt-20 pb-16 md:pt-28 md:pb-24 bg-gradient-to-r from-primary-600 to-secondary-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg')] bg-cover bg-center opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              🌾 AgroSoluce® Marketplace
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Connect West African Cooperatives with Global Buyers
            </p>
            <p className="text-lg mb-8 text-white/80 max-w-3xl mx-auto">
              The secure agricultural marketplace platform that transforms farming 
              operations through technology, compliance, and global market access.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/cooperatives"
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
              >
                Explorer les Coopératives
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/buyer"
                className="bg-secondary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary-700 transition-colors flex items-center justify-center gap-2"
              >
                Espace Acheteur
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-primary-50 rounded-lg">
              <div className="text-4xl font-bold text-primary-600 mb-2">3,797+</div>
              <div className="text-gray-600">Coopératives Enregistrées</div>
            </div>
            <div className="text-center p-6 bg-secondary-50 rounded-lg">
              <div className="text-4xl font-bold text-secondary-600 mb-2">31</div>
              <div className="text-gray-600">Régions Couvertes</div>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="text-4xl font-bold text-green-600 mb-2">98%+</div>
              <div className="text-gray-600">Taux de Vérification</div>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="text-4xl font-bold text-blue-600 mb-2">€3.2B+</div>
              <div className="text-gray-600">Marché Potentiel</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Pourquoi AgroSoluce?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Building2 className="h-12 w-12 text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Marché Global</h3>
              <p className="text-gray-600">
                Connectez-vous avec des acheteurs internationaux recherchant des produits agricoles de qualité
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Shield className="h-12 w-12 text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Transactions Sécurisées</h3>
              <p className="text-gray-600">
                Système d'escrow avec intégration mobile money pour une protection complète
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <TrendingUp className="h-12 w-12 text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Matching Intelligent</h3>
              <p className="text-gray-600">
                Connexions acheteur-vendeur alimentées par l'IA en temps réel
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

