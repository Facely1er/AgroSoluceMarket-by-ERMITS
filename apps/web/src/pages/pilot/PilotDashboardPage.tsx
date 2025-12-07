import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Building2, ArrowLeft, Info } from 'lucide-react';
import { getCanonicalDirectoryRecordsByPilotId } from '../../features/cooperatives/api/canonicalDirectoryApi';
import type { CanonicalCooperativeDirectory } from '../../types';
import { getCoverageMetrics } from '../../features/coverage/api/coverageApi';
import type { CoverageMetrics } from '../../services/coverageService';
import { getLatestReadinessSnapshot } from '../../features/readiness/api/readinessSnapshotsApi';
import type { ReadinessSnapshot } from '../../services/readinessSnapshotService';
import { getReadinessStatusLabel } from '../../data/readinessThresholdsConfig';

interface CooperativeWithMetrics extends CanonicalCooperativeDirectory {
  coverage?: CoverageMetrics | null;
  readiness?: ReadinessSnapshot | null;
}

export default function PilotDashboardPage() {
  const { pilot_id } = useParams<{ pilot_id: string }>();
  const [cooperatives, setCooperatives] = useState<CooperativeWithMetrics[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pilotLabel, setPilotLabel] = useState<string>('');

  useEffect(() => {
    if (!pilot_id) {
      setError('Pilot ID is required');
      setLoading(false);
      return;
    }

    loadPilotData();
  }, [pilot_id]);

  const loadPilotData = async () => {
    if (!pilot_id) return;

    setLoading(true);
    setError(null);

    try {
      // Fetch all cooperatives in this pilot
      const result = await getCanonicalDirectoryRecordsByPilotId(pilot_id);

      if (result.error) {
        throw result.error;
      }

      const coopRecords = result.data || [];

      if (coopRecords.length === 0) {
        setCooperatives([]);
        setLoading(false);
        return;
      }

      // Extract pilot label from first cooperative
      if (coopRecords[0].pilot_label) {
        setPilotLabel(coopRecords[0].pilot_label);
      } else {
        setPilotLabel(pilot_id);
      }

      // Fetch coverage metrics and readiness snapshots for each cooperative
      const cooperativesWithMetrics = await Promise.all(
        coopRecords.map(async (coop) => {
          const [coverageResult, readinessResult] = await Promise.all([
            getCoverageMetrics(coop.coop_id),
            getLatestReadinessSnapshot(coop.coop_id),
          ]);

          return {
            ...coop,
            coverage: coverageResult.data,
            readiness: readinessResult.data,
          };
        })
      );

      setCooperatives(cooperativesWithMetrics);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      console.error('Error loading pilot data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Calculate aggregate metrics
  const aggregateMetrics = (() => {
    if (cooperatives.length === 0) {
      return {
        averageCoverage: 0,
        notReadyCount: 0,
        inProgressCount: 0,
        buyerReadyCount: 0,
        notReadyPercent: 0,
        inProgressPercent: 0,
        buyerReadyPercent: 0,
      };
    }

    const totalCoverage = cooperatives.reduce((sum, coop) => {
      return sum + (coop.coverage?.coverage_percentage || 0);
    }, 0);
    const averageCoverage = totalCoverage / cooperatives.length;

    const notReadyCount = cooperatives.filter(
      (coop) => coop.readiness?.readiness_status === 'not_ready'
    ).length;
    const inProgressCount = cooperatives.filter(
      (coop) => coop.readiness?.readiness_status === 'in_progress'
    ).length;
    const buyerReadyCount = cooperatives.filter(
      (coop) => coop.readiness?.readiness_status === 'buyer_ready'
    ).length;

    const total = cooperatives.length;
    const notReadyPercent = (notReadyCount / total) * 100;
    const inProgressPercent = (inProgressCount / total) * 100;
    const buyerReadyPercent = (buyerReadyCount / total) * 100;

    return {
      averageCoverage,
      notReadyCount,
      inProgressCount,
      buyerReadyCount,
      notReadyPercent,
      inProgressPercent,
      buyerReadyPercent,
    };
  })();

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading pilot data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">{error}</p>
          <Link
            to="/directory"
            className="text-secondary-600 hover:text-secondary-700"
          >
            Back to directory
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          to="/directory"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to directory
        </Link>

        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-t-4 border-primary-500">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Pilot Due-Diligence Snapshot
          </h1>
          <div className="flex items-center gap-4 text-gray-600">
            <div>
              <span className="font-medium">Pilot:</span> {pilotLabel}
            </div>
            <div>
              <span className="font-medium">Cooperatives:</span> {cooperatives.length}
            </div>
          </div>
        </div>

        {/* Aggregate Metrics Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Aggregate Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <div className="text-sm text-gray-600 mb-1">Average Coverage</div>
              <div className="text-2xl font-semibold text-gray-900">
                {aggregateMetrics.averageCoverage.toFixed(1)}%
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Not Ready</div>
              <div className="text-2xl font-semibold text-gray-900">
                {aggregateMetrics.notReadyCount}
              </div>
              <div className="text-xs text-gray-500">
                ({aggregateMetrics.notReadyPercent.toFixed(1)}%)
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">In Progress</div>
              <div className="text-2xl font-semibold text-gray-900">
                {aggregateMetrics.inProgressCount}
              </div>
              <div className="text-xs text-gray-500">
                ({aggregateMetrics.inProgressPercent.toFixed(1)}%)
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Buyer Ready</div>
              <div className="text-2xl font-semibold text-gray-900">
                {aggregateMetrics.buyerReadyCount}
              </div>
              <div className="text-xs text-gray-500">
                ({aggregateMetrics.buyerReadyPercent.toFixed(1)}%)
              </div>
            </div>
          </div>
        </div>

        {/* Cooperative Table Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-xl font-semibold text-gray-900">Cooperatives</h2>
          </div>
          {cooperatives.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <Building2 className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p>No cooperatives found in this pilot</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cooperative Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Country
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Primary Crop
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Coverage %
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Readiness Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Snapshot
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cooperatives.map((coop) => (
                    <tr key={coop.coop_id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link
                          to={`/workspace/${coop.coop_id}`}
                          className="text-sm font-medium text-primary-600 hover:text-primary-800"
                        >
                          {coop.name}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {coop.country || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {coop.primary_crop || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {coop.coverage?.coverage_percentage !== undefined
                          ? `${coop.coverage.coverage_percentage.toFixed(1)}%`
                          : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {coop.readiness?.readiness_status
                          ? getReadinessStatusLabel(coop.readiness.readiness_status)
                          : 'No snapshot'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(coop.readiness?.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Disclaimer Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-6 border-l-4 border-yellow-500">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-gray-700">
              <p className="font-medium text-gray-900 mb-1">Disclaimer</p>
              <p>
                This pilot view summarizes documentation coverage and readiness shorthand for the selected cooperatives. 
                It does not constitute a certification, rating, or compliance decision.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

