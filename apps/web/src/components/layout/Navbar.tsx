import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Home, UsersRound, Briefcase, User, Shield, Menu, X, Globe } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';
import type { Language } from '@/lib/i18n/translations';

export default function Navbar() {
  const location = useLocation();
  const { t, language, setLanguage } = useI18n();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;
  const isActivePath = (path: string) => location.pathname.startsWith(path);

  const toggleLanguage = (lang: Language) => {
    setLanguage(lang);
    setLangMenuOpen(false);
  };

  const navLinks = [
    { to: '/', icon: Home, label: t.nav.home, exact: true },
    { to: '/cooperatives', icon: UsersRound, label: t.nav.cooperatives, exact: true },
    { to: '/buyer', icon: Briefcase, label: t.nav.buyers, exact: false },
    { to: '/cooperative', icon: User, label: t.nav.cooperativeSpace, exact: false },
    { to: '/compliance/child-labor', icon: Shield, label: t.nav.compliance, exact: false },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 hover:opacity-80 transition-opacity group"
          >
            <img 
              src="/agrosoluce.png" 
              alt="AgroSoluce Logo" 
              className="h-14 w-auto transition-transform group-hover:scale-105"
            />
            <div>
              <h2 className="text-primary-600 font-bold text-lg leading-tight">AgroSoluce™</h2>
              <p className="text-xs text-gray-500 leading-tight">Source Intelligence</p>
              <p className="text-xs text-gray-500 leading-tight">by ERMITS</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, icon: Icon, label, exact }) => {
              const active = exact ? isActive(to) : isActivePath(to);
              return (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    active
                      ? 'text-primary-600 bg-primary-50 border border-primary-200 shadow-sm'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </Link>
              );
            })}
            
            {/* Language Switcher */}
            <div className="relative ml-2">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-all"
                aria-label="Change language"
              >
                <Globe className="h-4 w-4" />
                <span className="uppercase font-semibold">{language}</span>
              </button>
              
              {langMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setLangMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                    <button
                      onClick={() => toggleLanguage('en')}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                        language === 'en' ? 'text-primary-600 font-semibold bg-primary-50' : 'text-gray-700'
                      }`}
                    >
                      🇬🇧 English
                    </button>
                    <button
                      onClick={() => toggleLanguage('fr')}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                        language === 'fr' ? 'text-primary-600 font-semibold bg-primary-50' : 'text-gray-700'
                      }`}
                    >
                      🇫🇷 Français
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-2">
            {navLinks.map(({ to, icon: Icon, label, exact }) => {
              const active = exact ? isActive(to) : isActivePath(to);
              return (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{label}</span>
                </Link>
              );
            })}
            
            {/* Mobile Language Switcher */}
            <div className="px-4 py-2 border-t border-gray-200 mt-2">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Globe className="h-4 w-4" />
                <span>Language</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleLanguage('en')}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    language === 'en'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  🇬🇧 EN
                </button>
                <button
                  onClick={() => toggleLanguage('fr')}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    language === 'fr'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  🇫🇷 FR
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

