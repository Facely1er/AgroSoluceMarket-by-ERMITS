import { Link } from 'react-router-dom';
import { Home, Building2, ShoppingCart, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center gap-3">
            <img 
              src="/agrosoluce.png" 
              alt="AgroSoluce Logo" 
              className="h-10 w-auto"
            />
            <div>
              <div className="text-primary-600 font-bold">AgroSoluce™</div>
              <div className="text-xs text-gray-500">by ERMITS</div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-secondary-600 flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/cooperatives" className="text-gray-600 hover:text-secondary-600 flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Coopératives
                </Link>
              </li>
              <li>
                <Link to="/buyer" className="text-gray-600 hover:text-secondary-600 flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  Acheteurs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
            <div className="space-y-2 text-gray-600">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:contact@agrosoluce.ci" className="hover:text-secondary-600">
                  contact@agrosoluce.ci
                </a>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <Link 
                to="/principles/farmer-protection" 
                className="text-sm text-gray-600 hover:text-secondary-600 block"
              >
                Farmer Protection Principles
              </Link>
              <Link 
                to="/governance/due-care" 
                className="text-sm text-gray-600 hover:text-secondary-600 block"
              >
                Governance & Due-Care Principles
              </Link>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              © {new Date().getFullYear()} AgroSoluce. Tous droits réservés.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

