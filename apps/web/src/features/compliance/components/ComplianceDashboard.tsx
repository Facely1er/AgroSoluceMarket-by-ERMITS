import { useState, useEffect } from 'react';
import { Shield, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import { getComplianceStatus, getComplianceRequirements } from '../api/complianceApi';
import CertificationBadge from './CertificationBadge';
import type { Certification, ComplianceRequirement } from '@/types';

interface ComplianceDashboardProps {
  cooperativeId: string;
}

export default function ComplianceDashboard({ cooperativeId }: ComplianceDashboardProps) {
  const [status, setStatus] = useState<{
    certifications: Certification[];
    eudrCompliant: boolean;
    overallStatus: 'compliant' | 'non_compliant' | 'pending';
  } | null>(null);
  const [requirements, setRequirements] = useState<ComplianceRequirement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, [cooperativeId]);

  const loadData = async () => {
    setLoading(true);
    setError(null);

    const [statusResult, requirementsResult] = await Promise.all([
      getComplianceStatus(cooperativeId),
      getComplianceRequirements('cooperative'),
    ]);

    if (statusResult.error) {
      setError(statusResult.error.message);
      setLoading(false);
      return;
    }

    if (requirementsResult.error) {
      setError(requirementsResult.error.message);
      setLoading(false);
      return;
    }

    setStatus(statusResult.data);
    setRequirements(requirementsResult.data || []);
    setLoading(false);
  };

  const getOverallStatusIcon = () => {
    if (!status) return null;

    switch (status.overallStatus) {
      case 'compliant':
        return <CheckCircle className="h-6 w-6 text-green-600" />;
      case 'non_compliant':
        return <AlertTriangle className="h-6 w-6 text-red-600" />;
      case 'pending':
        return <Clock className="h-6 w-6 text-yellow-600" />;
      default:
        return null;
    }
  };

  const getOverallStatusColor = () => {
    if (!status) return 'bg-gray-100 text-gray-700';

    switch (status.overallStatus) {
      case 'compliant':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'non_compliant':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-gray-500">Chargement du tableau de bord de conformité...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        Erreur: {error}
      </div>
    );
  }

  if (!status) {
    return (
      <div className="text-center py-12 text-gray-500">
        Aucune donnée de conformité disponible
      </div>
    );
  }

  const activeCertifications = status.certifications.filter((c) => c.status === 'active');
  const expiredCertifications = status.certifications.filter((c) => c.status === 'expired');

  return (
    <div className="space-y-6">
      {/* Overall Status */}
      <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary-500">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-primary-600" />
            <h2 className="text-2xl font-bold text-gray-900">Statut de Conformité</h2>
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${getOverallStatusColor()}`}>
            {getOverallStatusIcon()}
            <span className="font-semibold capitalize">
              {status.overallStatus === 'compliant'
                ? 'Conforme'
                : status.overallStatus === 'non_compliant'
                ? 'Non Conforme'
                : 'En Attente'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-500 mb-1">Certifications Actives</div>
            <div className="text-2xl font-bold text-gray-900">{activeCertifications.length}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-1">Conformité EUDR</div>
            <div className="flex items-center gap-2">
              {status.eudrCompliant ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-red-600" />
              )}
              <span className="font-medium">{status.eudrCompliant ? 'Conforme' : 'Non Conforme'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Certifications</h3>
        {status.certifications.length === 0 ? (
          <p className="text-gray-500 text-sm">Aucune certification enregistrée</p>
        ) : (
          <div className="space-y-4">
            {activeCertifications.length > 0 && (
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">Actives</div>
                <div className="flex flex-wrap gap-2">
                  {activeCertifications.map((cert) => (
                    <CertificationBadge key={cert.id} certification={cert} />
                  ))}
                </div>
              </div>
            )}
            {expiredCertifications.length > 0 && (
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">Expirées</div>
                <div className="flex flex-wrap gap-2">
                  {expiredCertifications.map((cert) => (
                    <CertificationBadge key={cert.id} certification={cert} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Requirements */}
      {requirements.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Exigences Réglementaires</h3>
          <div className="space-y-3">
            {requirements.map((req) => (
              <div key={req.id} className="border-l-4 border-primary-500 pl-4 py-2">
                <div className="font-medium text-gray-900 mb-1">{req.requirement_type}</div>
                <p className="text-sm text-gray-600">{req.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

