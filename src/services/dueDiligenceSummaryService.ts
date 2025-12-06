// Due-Diligence Summary Service
// Generates structured summary data for export
// Reuses existing logic for evidence, coverage, and readiness

import type { CanonicalCooperativeDirectory } from '../types';
import type { EvidenceDocument } from '../features/evidence/api/evidenceDocumentsApi';
import type { CoverageMetrics } from './coverageService';
import type { DocumentPresence } from './coverageService';
import type { ReadinessSnapshot } from './readinessSnapshotService';
import {
  computeContextualRisks,
  computeRegulatoryContext,
} from './enrichmentService';
import {
  HIGH_DEFORESTATION_RISK_COUNTRIES,
  MEDIUM_DEFORESTATION_RISK_COUNTRIES,
  EUDR_PRODUCER_COUNTRIES,
  CHILD_LABOR_RISK_CROPS,
} from '../config/enrichmentConfig';

export interface DueDiligenceSummary {
  cooperative_identity: {
    coop_id: string;
    name: string;
    country?: string;
    region?: string;
    department?: string;
    primary_crop?: string;
    source_registry?: string;
    record_status?: string;
  };
  market_context_snapshot: {
    country?: string;
    region?: string;
    primary_crop?: string;
    is_high_deforestation_risk: boolean;
    is_medium_deforestation_risk: boolean;
    is_eudr_producer_country: boolean;
    is_child_labor_risk_crop: boolean;
    deforestation_zone?: string;
    protected_area_overlap?: string;
    climate_risk?: string;
    eudr_applicable?: boolean;
  };
  evidence_summary: {
    total_documents: number;
    documents_by_type: Record<string, number>;
  };
  coverage_metrics: {
    required_docs_total: number;
    required_docs_present: number;
    coverage_percentage: number;
    last_updated?: string;
  };
  documentation_gaps: {
    missing_doc_types: string[];
  };
  readiness: {
    readiness_status?: string;
    snapshot_timestamp?: string;
    snapshot_reason?: string;
  };
  disclaimer: string;
  generated_at: string;
}

/**
 * Generate due-diligence summary for a cooperative
 */
export function generateDueDiligenceSummary(
  cooperative: CanonicalCooperativeDirectory,
  evidenceDocuments: EvidenceDocument[],
  coverageMetrics: CoverageMetrics | null,
  documentPresence: DocumentPresence[],
  readinessSnapshot: ReadinessSnapshot | null
): DueDiligenceSummary {
  // Cooperative Identity
  const cooperativeIdentity = {
    coop_id: cooperative.coop_id,
    name: cooperative.name,
    country: cooperative.country,
    region: cooperative.region,
    department: cooperative.department,
    primary_crop: cooperative.primary_crop,
    source_registry: cooperative.source_registry,
    record_status: cooperative.record_status,
  };

  // Market Context Snapshot
  const cooperativeLike = {
    country: cooperative.country || '',
    commodity: cooperative.primary_crop || '',
    region: cooperative.region,
    department: cooperative.department,
  } as any;

  const contextualRisks = computeContextualRisks(cooperativeLike);
  const regulatoryContext = computeRegulatoryContext(cooperativeLike, ['EU']);

  const marketContextSnapshot = {
    country: cooperative.country,
    region: cooperative.region,
    primary_crop: cooperative.primary_crop,
    is_high_deforestation_risk: HIGH_DEFORESTATION_RISK_COUNTRIES.includes(cooperative.country as any),
    is_medium_deforestation_risk: MEDIUM_DEFORESTATION_RISK_COUNTRIES.includes(cooperative.country as any),
    is_eudr_producer_country: EUDR_PRODUCER_COUNTRIES.includes(cooperative.country as any),
    is_child_labor_risk_crop: CHILD_LABOR_RISK_CROPS.some(crop =>
      (cooperative.primary_crop || '').toLowerCase().includes(crop.toLowerCase())
    ),
    deforestation_zone: contextualRisks.deforestation_zone,
    protected_area_overlap: contextualRisks.protected_area_overlap,
    climate_risk: contextualRisks.climate_risk,
    eudr_applicable: regulatoryContext.eudr_applicable,
  };

  // Evidence Summary
  const documentsByType: Record<string, number> = {};
  evidenceDocuments.forEach(doc => {
    const docType = doc.doc_type || 'other';
    documentsByType[docType] = (documentsByType[docType] || 0) + 1;
  });

  const evidenceSummary = {
    total_documents: evidenceDocuments.length,
    documents_by_type: documentsByType,
  };

  // Coverage Metrics
  const coverageMetricsData = coverageMetrics ? {
    required_docs_total: coverageMetrics.required_docs_total,
    required_docs_present: coverageMetrics.required_docs_present,
    coverage_percentage: coverageMetrics.coverage_percentage,
    last_updated: coverageMetrics.last_updated,
  } : {
    required_docs_total: 0,
    required_docs_present: 0,
    coverage_percentage: 0,
  };

  // Documentation Gaps
  const missingDocTypes = documentPresence
    .filter(item => !item.present)
    .map(item => item.doc_type);

  const documentationGaps = {
    missing_doc_types: missingDocTypes,
  };

  // Readiness
  const readiness = readinessSnapshot ? {
    readiness_status: readinessSnapshot.readiness_status,
    snapshot_timestamp: readinessSnapshot.created_at,
    snapshot_reason: readinessSnapshot.snapshot_reason,
  } : {};

  // Disclaimer
  const disclaimer = 'This summary structures supplier-provided information to support due-diligence processes. It is not a certification or compliance determination. Responsibility for due care and final sourcing decisions remains with the buyer.';

  return {
    cooperative_identity: cooperativeIdentity,
    market_context_snapshot: marketContextSnapshot,
    evidence_summary: evidenceSummary,
    coverage_metrics: coverageMetricsData,
    documentation_gaps: documentationGaps,
    readiness: readiness,
    disclaimer: disclaimer,
    generated_at: new Date().toISOString(),
  };
}

