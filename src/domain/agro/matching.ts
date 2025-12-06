// Matching logic for AgroSoluce v1 scope
// Simple, explicit matching algorithm

import type { Cooperative } from '../../types';
import { BuyerRequest, MatchingResult } from './types';

/**
 * Match cooperatives to a buyer request
 * Returns sorted list of matches with scores
 */
export function matchCooperativesToRequest(
  request: BuyerRequest,
  coops: Cooperative[]
): MatchingResult[] {
  // Filter by commodity first
  let matches = coops.filter(c => c.commodity === request.commodity);

  // Filter by certifications if required
  if (request.requirements.certifications?.length) {
    matches = matches.filter(c =>
      request.requirements.certifications!.every(req =>
        c.certifications.includes(req)
      )
    );
  }

  // Filter by EUDR requirement
  if (request.requirements.eudrRequired) {
    matches = matches.filter(c => c.complianceFlags.eudrReady === true);
  }

  // Filter by child labor zero tolerance
  if (request.requirements.childLaborZeroTolerance) {
    matches = matches.filter(
      c => c.complianceFlags.childLaborRisk === 'low' || 
           c.complianceFlags.childLaborRisk === 'unknown'
    );
  }

  // Calculate scores and add reasons
  const scoredMatches = matches.map(coop => {
    const score = computeScore(request, coop);
    const reasons = getMatchReasons(request, coop);
    
    return {
      cooperative: coop,
      matchScore: score,
      reasons
    };
  });

  // Sort by score (highest first)
  return scoredMatches.sort((a, b) => b.matchScore - a.matchScore);
}

/**
 * Compute match score for a cooperative
 * Returns a score from 0-100
 */
function computeScore(request: BuyerRequest, coop: Cooperative): number {
  let score = 0;

  // Country match (20 points)
  if (coop.country === request.targetCountry) {
    score += 20;
  }

  // EUDR ready (20 points)
  if (coop.complianceFlags.eudrReady) {
    score += 20;
  }

  // Child labor risk (20 points)
  if (coop.complianceFlags.childLaborRisk === 'low') {
    score += 20;
  } else if (coop.complianceFlags.childLaborRisk === 'medium') {
    score += 10;
  }

  // Volume match (20 points)
  if (coop.annualVolumeTons && request.minVolumeTons && request.maxVolumeTons) {
    if (
      coop.annualVolumeTons >= request.minVolumeTons &&
      coop.annualVolumeTons <= request.maxVolumeTons
    ) {
      score += 20;
    } else if (coop.annualVolumeTons >= request.minVolumeTons * 0.8) {
      score += 10; // Partial match
    }
  } else if (coop.annualVolumeTons && request.minVolumeTons) {
    if (coop.annualVolumeTons >= request.minVolumeTons) {
      score += 15;
    }
  }

  // Certification bonus (10 points per matching certification)
  if (request.requirements.certifications?.length && coop.certifications.length) {
    const matchingCerts = request.requirements.certifications.filter(cert =>
      coop.certifications.includes(cert)
    );
    score += Math.min(matchingCerts.length * 10, 20); // Cap at 20 points
  }

  // Additional certifications bonus (5 points)
  if (coop.certifications.length > (request.requirements.certifications?.length || 0)) {
    score += 5;
  }

  return Math.min(score, 100); // Cap at 100
}

/**
 * Get human-readable reasons for the match
 */
function getMatchReasons(request: BuyerRequest, coop: Cooperative): string[] {
  const reasons: string[] = [];

  if (coop.country === request.targetCountry) {
    reasons.push('Matches target country');
  }

  if (coop.complianceFlags.eudrReady) {
    reasons.push('EUDR context available');
  }

  if (coop.complianceFlags.childLaborRisk === 'low') {
    reasons.push('Low child labor risk');
  }

  if (coop.annualVolumeTons && request.minVolumeTons) {
    if (coop.annualVolumeTons >= request.minVolumeTons) {
      reasons.push('Meets volume requirements');
    }
  }

  if (coop.certifications.length > 0) {
    const matchingCerts = request.requirements.certifications?.filter(cert =>
      coop.certifications.includes(cert)
    ) || [];
    if (matchingCerts.length > 0) {
      reasons.push(`Has ${matchingCerts.length} required certification(s)`);
    }
  }

  return reasons;
}

