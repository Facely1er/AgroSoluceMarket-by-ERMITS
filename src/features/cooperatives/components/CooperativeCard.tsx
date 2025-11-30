import { Link } from 'react-router-dom';
import { MapPin, Building2, CheckCircle, Clock } from 'lucide-react';
import type { Cooperative } from '../../../types';

interface CooperativeCardProps {
  cooperative: Cooperative;
}

export default function CooperativeCard({ cooperative }: CooperativeCardProps) {
  // Support both database (is_verified) and legacy (status) verification fields
  const isVerified = cooperative.is_verified ?? cooperative.status === 'verified';
  
  // Support both database (sector/department) and legacy (secteur/departement) fields
  const sector = cooperative.sector || cooperative.secteur || '';
  const department = cooperative.department || cooperative.departement;

  return (
    <Link
      to={`/cooperatives/${cooperative.id}`}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-secondary-500 hover:border-primary-500"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 flex-1">
          {cooperative.name}
        </h3>
        {isVerified ? (
          <span className="flex items-center gap-1 text-green-600 text-sm">
            <CheckCircle className="h-4 w-4" />
            Vérifié
          </span>
        ) : (
          <span className="flex items-center gap-1 text-yellow-600 text-sm">
            <Clock className="h-4 w-4" />
            En attente
          </span>
        )}
      </div>

      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-gray-400" />
          <span>{cooperative.region}</span>
          {department && (
            <>
              <span className="text-gray-300">•</span>
              <span>{department}</span>
            </>
          )}
        </div>
        {sector && (
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-gray-400" />
            <span>{sector}</span>
          </div>
        )}
      </div>

      {cooperative.natureActiviteTags && cooperative.natureActiviteTags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {cooperative.natureActiviteTags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}

