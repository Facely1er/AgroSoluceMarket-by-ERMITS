import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Building2, ShoppingCart, User } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="/agrosoluce.png" 
              alt="AgroSoluce Logo" 
              className="h-10 w-auto"
            />
            <div>
              <h2 className="text-primary-600 font-bold text-lg">AgroSoluce™</h2>
              <p className="text-xs text-gray-500">by ERMITS</p>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'text-secondary-600 border-b-2 border-secondary-600' 
                  : 'text-gray-700 hover:text-secondary-600'
              }`}
            >
              <Home className="h-4 w-4" />
              Accueil
            </Link>
            <Link
              to="/cooperatives"
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/cooperatives') 
                  ? 'text-secondary-600 border-b-2 border-secondary-600' 
                  : 'text-gray-700 hover:text-secondary-600'
              }`}
            >
              <Building2 className="h-4 w-4" />
              Coopératives
            </Link>
            <Link
              to="/buyer"
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname.startsWith('/buyer') 
                  ? 'text-secondary-600 border-b-2 border-secondary-600' 
                  : 'text-gray-700 hover:text-secondary-600'
              }`}
            >
              <ShoppingCart className="h-4 w-4" />
              Acheteurs
            </Link>
            <Link
              to="/cooperative"
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname.startsWith('/cooperative') 
                  ? 'text-secondary-600 border-b-2 border-secondary-600' 
                  : 'text-gray-700 hover:text-secondary-600'
              }`}
            >
              <User className="h-4 w-4" />
              Espace Coopérative
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

