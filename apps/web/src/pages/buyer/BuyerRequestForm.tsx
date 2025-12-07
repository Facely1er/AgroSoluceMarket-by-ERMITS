import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Mail, MapPin, Package, CheckCircle, AlertCircle } from 'lucide-react';
import { createBuyerRequest } from '@/features/buyers/api';
import { matchCooperativesToRequest } from '@/domain/agro/matching';
import { createRequestMatches } from '@/features/buyers/api';
import { useCooperatives } from '@/hooks/useCooperatives';
import type { BuyerRequest } from '@/domain/agro/types';

export default function BuyerRequestForm() {
  const navigate = useNavigate();
  const { cooperatives, loading: coopsLoading } = useCooperatives();
  
  const [formData, setFormData] = useState<Omit<BuyerRequest, 'id' | 'status' | 'createdAt'>>({
    buyerOrg: '',
    buyerContactEmail: '',
    targetCountry: '',
    commodity: '',
    minVolumeTons: undefined,
    maxVolumeTons: undefined,
    requirements: {
      certifications: [],
      eudrRequired: false,
      childLaborZeroTolerance: false
    }
  });

  const [selectedCertifications, setSelectedCertifications] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const availableCertifications = [
    'Fairtrade',
    'Rainforest Alliance',
    'Organic',
    'UTZ',
    '4C',
    'RFA'
  ];

  const commodities = ['cocoa', 'coffee', 'cashew', 'palm oil', 'rubber', 'cotton'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Validate form
      if (!formData.buyerOrg || !formData.buyerContactEmail || !formData.targetCountry || !formData.commodity) {
        setError('Please fill in all required fields');
        setLoading(false);
        return;
      }

      // Create buyer request
      const { data: request, error: requestError } = await createBuyerRequest({
        ...formData,
        requirements: {
          ...formData.requirements,
          certifications: selectedCertifications
        }
      });

      if (requestError || !request) {
        throw requestError || new Error('Failed to create request');
      }

      // Run matching logic
      if (cooperatives.length > 0) {
        const matches = matchCooperativesToRequest(request, cooperatives);
        
        // Create match records (top 20 matches)
        const topMatches = matches.slice(0, 20).map(m => ({
          cooperativeId: m.cooperative.id,
          matchScore: m.matchScore
        }));

        if (topMatches.length > 0) {
          await createRequestMatches(request.id, topMatches);
        }
      }

      // Navigate to results page
      navigate(`/buyer/requests/${request.id}/matches`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  };

  const toggleCertification = (cert: string) => {
    setSelectedCertifications(prev =>
      prev.includes(cert)
        ? prev.filter(c => c !== cert)
        : [...prev, cert]
    );
  };

  if (coopsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading cooperatives...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 bg-gradient-to-br from-secondary-50 via-primary-50 to-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-t-4 border-primary-500">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <Building2 className="h-8 w-8 text-primary-600" />
            Create Buyer Request
          </h1>
          <p className="text-gray-600">
            Submit your sourcing requirements and we'll match you with suitable cooperatives
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
              <div>
                <p className="text-red-800 font-medium">Error</p>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Organization Name */}
          <div>
            <label htmlFor="buyerOrg" className="block text-sm font-medium text-gray-700 mb-2">
              Organization Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="buyerOrg"
              required
              value={formData.buyerOrg}
              onChange={(e) => setFormData({ ...formData, buyerOrg: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Your company or organization name"
            />
          </div>

          {/* Contact Email */}
          <div>
            <label htmlFor="buyerContactEmail" className="block text-sm font-medium text-gray-700 mb-2">
              <Mail className="inline h-4 w-4 mr-1" />
              Contact Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="buyerContactEmail"
              required
              value={formData.buyerContactEmail}
              onChange={(e) => setFormData({ ...formData, buyerContactEmail: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="your.email@company.com"
            />
          </div>

          {/* Target Country */}
          <div>
            <label htmlFor="targetCountry" className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="inline h-4 w-4 mr-1" />
              Target Country <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="targetCountry"
              required
              value={formData.targetCountry}
              onChange={(e) => setFormData({ ...formData, targetCountry: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="e.g., Côte d'Ivoire"
            />
          </div>

          {/* Commodity */}
          <div>
            <label htmlFor="commodity" className="block text-sm font-medium text-gray-700 mb-2">
              <Package className="inline h-4 w-4 mr-1" />
              Commodity <span className="text-red-500">*</span>
            </label>
            <select
              id="commodity"
              required
              value={formData.commodity}
              onChange={(e) => setFormData({ ...formData, commodity: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Select a commodity</option>
              {commodities.map(comm => (
                <option key={comm} value={comm}>{comm.charAt(0).toUpperCase() + comm.slice(1)}</option>
              ))}
            </select>
          </div>

          {/* Volume Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="minVolume" className="block text-sm font-medium text-gray-700 mb-2">
                Min Volume (tons)
              </label>
              <input
                type="number"
                id="minVolume"
                min="0"
                step="0.01"
                value={formData.minVolumeTons || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  minVolumeTons: e.target.value ? parseFloat(e.target.value) : undefined
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="0"
              />
            </div>
            <div>
              <label htmlFor="maxVolume" className="block text-sm font-medium text-gray-700 mb-2">
                Max Volume (tons)
              </label>
              <input
                type="number"
                id="maxVolume"
                min="0"
                step="0.01"
                value={formData.maxVolumeTons || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  maxVolumeTons: e.target.value ? parseFloat(e.target.value) : undefined
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="0"
              />
            </div>
          </div>

          {/* Requirements Section */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Requirements</h3>

            {/* Certifications */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Required Certifications
              </label>
              <div className="flex flex-wrap gap-2">
                {availableCertifications.map(cert => (
                  <button
                    key={cert}
                    type="button"
                    onClick={() => toggleCertification(cert)}
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      selectedCertifications.includes(cert)
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-primary-500'
                    }`}
                  >
                    {selectedCertifications.includes(cert) && (
                      <CheckCircle className="inline h-4 w-4 mr-1" />
                    )}
                    {cert}
                  </button>
                ))}
              </div>
            </div>

            {/* EUDR Requirement */}
            <div className="mb-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.requirements.eudrRequired || false}
                  onChange={(e) => setFormData({
                    ...formData,
                    requirements: {
                      ...formData.requirements,
                      eudrRequired: e.target.checked
                    }
                  })}
                  className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Requires EUDR-aligned supply
                </span>
              </label>
              <p className="text-xs text-gray-500 ml-8 mt-1">
                Only show cooperatives with EUDR-aligned documentation and due diligence context
              </p>
            </div>

            {/* Child Labor Zero Tolerance */}
            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.requirements.childLaborZeroTolerance || false}
                  onChange={(e) => setFormData({
                    ...formData,
                    requirements: {
                      ...formData.requirements,
                      childLaborZeroTolerance: e.target.checked
                    }
                  })}
                  className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Zero tolerance on child labor
                </span>
              </label>
              <p className="text-xs text-gray-500 ml-8 mt-1">
                Only show cooperatives with low child labor risk
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4 border-t">
            <button
              type="button"
              onClick={() => navigate('/cooperatives')}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Request...' : 'Create Request & Find Matches'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

