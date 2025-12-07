/**
 * Compliance Badge Component
 * Displays child labor compliance status for a cooperative
 */

import React, { useState, useEffect } from 'react';
import { Shield, AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';
import ChildLaborService from '@/services/childLaborService';
import type { CooperativeComplianceStatus } from '@/types/child-labor-monitoring-types';
import { useI18n } from '@/lib/i18n/I18nProvider';

interface ComplianceBadgeProps {
  cooperativeId: string;
  className?: string;
}

const ComplianceBadge: React.FC<ComplianceBadgeProps> = ({
  cooperativeId,
  className = '',
}) => {
  const { t } = useI18n();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<CooperativeComplianceStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchComplianceStatus();
  }, [cooperativeId]);

  const fetchComplianceStatus = async () => {
    try {
      setLoading(true);
      setError(null);
      const statuses = await ChildLaborService.getComplianceStatus(cooperativeId);
      if (statuses && statuses.length > 0) {
        setStatus(statuses[0]); // Get the latest status
      } else {
        setStatus(null);
      }
    } catch (err) {
      console.error('Error fetching compliance status:', err);
      setError('Failed to load compliance status');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 ${className}`}>
        <Shield className="h-3 w-3 animate-pulse" />
        <span>{t.cooperative.loading}</span>
      </div>
    );
  }

  if (error || !status) {
    return (
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 ${className}`}>
        <AlertCircle className="h-3 w-3" />
        <span>{t.cooperative.notEvaluated}</span>
      </div>
    );
  }

  const score = status.complianceScore || 0;
  let badgeConfig: {
    text: string;
    bgColor: string;
    textColor: string;
    icon: React.ReactNode;
  };

  if (score >= 90) {
    badgeConfig = {
      text: '✓ Child Labor-Free',
      bgColor: 'bg-green-100',
      textColor: 'text-green-700',
      icon: <CheckCircle className="h-3 w-3" />,
    };
  } else if (score >= 75) {
    badgeConfig = {
      text: 'Good Compliance',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-700',
      icon: <Shield className="h-3 w-3" />,
    };
  } else if (score >= 60) {
    badgeConfig = {
      text: 'Fair Compliance',
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-700',
      icon: <AlertTriangle className="h-3 w-3" />,
    };
  } else {
    badgeConfig = {
      text: 'Needs Improvement',
      bgColor: 'bg-red-100',
      textColor: 'text-red-700',
      icon: <AlertCircle className="h-3 w-3" />,
    };
  }

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${badgeConfig.bgColor} ${badgeConfig.textColor} ${className}`}
      title={`Compliance Score: ${score}/100`}
    >
      {badgeConfig.icon}
      <span>{badgeConfig.text}</span>
    </div>
  );
};

export default ComplianceBadge;

