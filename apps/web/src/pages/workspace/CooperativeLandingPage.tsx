import { Link } from 'react-router-dom';
import { Building2, ArrowRight, CheckCircle, FileText, BarChart3, Shield, Users, Sprout } from 'lucide-react';

interface CooperativeLandingPageProps {
  cooperativeId?: string;
}

export default function CooperativeLandingPage({ cooperativeId }: CooperativeLandingPageProps) {
  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-secondary-50 via-primary-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 rounded-full mb-6">
            <Building2 className="h-10 w-10 text-primary-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Welcome to Cooperative Space
          </h1>
          <p className="text-xl text-gray-600 mb-2 max-w-2xl mx-auto">
            Your cooperative workspace is ready, but we need to register your cooperative first.
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Register your cooperative to access documentation management, compliance tracking, and farmer engagement tools.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary-500">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <FileText className="h-8 w-8 text-primary-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Evidence Management</h3>
                <p className="text-sm text-gray-600">
                  Upload and organize compliance documentation including land rights, farmer registrations, and certificates.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-secondary-500">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <BarChart3 className="h-8 w-8 text-secondary-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Coverage Tracking</h3>
                <p className="text-sm text-gray-600">
                  Monitor your documentation coverage metrics and see how complete your evidence collection is.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Compliance Readiness</h3>
                <p className="text-sm text-gray-600">
                  View readiness scores and maturity levels for EUDR, CMMC, and other regulatory frameworks.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <Sprout className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Farmers First</h3>
                <p className="text-sm text-gray-600">
                  Track and manage farmer registrations, training programs, and engagement initiatives.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits List */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            What You'll Get Access To
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Documentation Management</h4>
                <p className="text-sm text-gray-600">
                  Upload, organize, and manage evidence documents for compliance and due diligence.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Gap Analysis</h4>
                <p className="text-sm text-gray-600">
                  Identify missing documentation with specific guidance on what's needed.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Enablement Resources</h4>
                <p className="text-sm text-gray-600">
                  Access toolkits, templates, and guidance materials to improve your practices.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Transparency & Visibility</h4>
                <p className="text-sm text-gray-600">
                  Make your progress visible to buyers and partners while maintaining transparency.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-secondary-500 rounded-xl shadow-lg p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-white/95 max-w-2xl mx-auto">
            Register your cooperative to unlock the full power of AgroSoluce™ workspace tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/cooperatives"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Register Your Cooperative
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/20 transition-colors border border-white/20"
            >
              Learn More
            </Link>
          </div>
          <p className="text-sm text-white/80 mt-6">
            Free for cooperatives • Transparent • Progress-focused
          </p>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Already registered? Make sure you're using the correct cooperative ID.
          </p>
          <p className="text-sm text-gray-500">
            If you believe this is an error, please contact support or check the{' '}
            <Link to="/cooperatives" className="text-primary-600 hover:text-primary-700 underline">
              Cooperative Directory
            </Link>
            {' '}to find your cooperative.
          </p>
        </div>
      </div>
    </div>
  );
}

