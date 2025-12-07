import { Link } from 'react-router-dom';
import { Mail, UsersRound, Briefcase, Shield, Scale } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-2">
            <img 
              src="/agrosoluce.png" 
              alt="AgroSoluce Logo" 
              className="h-12 w-auto"
            />
            <div className="text-xs">
              <div className="text-primary-600 font-semibold">AgroSoluce™</div>
              <div className="text-gray-500">Source Intelligence</div>
              <div className="text-gray-500">by ERMITS</div>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <Link 
              to="/cooperatives" 
              className="text-gray-600 hover:text-primary-600 transition-colors flex items-center gap-1"
            >
              <UsersRound className="h-3 w-3" />
              {t.nav.cooperatives}
            </Link>
            <Link 
              to="/buyer" 
              className="text-gray-600 hover:text-primary-600 transition-colors flex items-center gap-1"
            >
              <Briefcase className="h-3 w-3" />
              {t.nav.buyers}
            </Link>
            <Link 
              to="/compliance/child-labor" 
              className="text-gray-600 hover:text-primary-600 transition-colors flex items-center gap-1"
            >
              <Shield className="h-3 w-3" />
              {t.nav.compliance}
            </Link>
            <Link 
              to="/principles/farmer-protection" 
              className="text-gray-600 hover:text-primary-600 transition-colors flex items-center gap-1"
            >
              <Scale className="h-3 w-3" />
              {t.footer.principles}
            </Link>
            <a 
              href="mailto:contact@agrosoluce.ci" 
              className="text-gray-600 hover:text-primary-600 transition-colors flex items-center gap-1"
            >
              <Mail className="h-3 w-3" />
              {t.footer.contact}
            </a>
          </div>

          {/* Copyright */}
          <div className="text-xs text-gray-500">
            © {new Date().getFullYear()} AgroSoluce. {t.footer.copyright}
          </div>
        </div>
      </div>
    </footer>
  );
}

