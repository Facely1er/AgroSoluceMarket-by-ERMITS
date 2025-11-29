import { useParams, Link } from 'react-router-dom';
import { MapPin, Building2, Phone, User, ArrowLeft, CheckCircle, Clock } from 'lucide-react';
import { useCooperatives } from '../../hooks/useCooperatives';

export default function CooperativeProfile() {
  const { id } = useParams<{ id: string }>();
  const { cooperatives, loading } = useCooperatives();

  const cooperative = cooperatives.find(c => c.id === Number(id));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!cooperative) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Coopérative non trouvée</p>
          <Link
            to="/cooperatives"
            className="text-secondary-600 hover:text-secondary-700"
          >
            Retour à la liste
          </Link>
        </div>
      </div>
    );
  }

  const isVerified = cooperative.status === 'verified';

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/cooperatives"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          Retour à la liste
        </Link>

        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {cooperative.name}
              </h1>
              {isVerified ? (
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                  <CheckCircle className="h-4 w-4" />
                  Vérifiée
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                  <Clock className="h-4 w-4" />
                  En attente de vérification
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-1">Informations Générales</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">{cooperative.region}</div>
                      {cooperative.departement && (
                        <div className="text-sm text-gray-600">{cooperative.departement}</div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Building2 className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">{cooperative.secteur}</div>
                    </div>
                  </div>
                  {cooperative.registrationNumber && (
                    <div>
                      <div className="text-sm text-gray-500">N° d'Enregistrement</div>
                      <div className="font-medium text-gray-900">{cooperative.registrationNumber}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-1">Contact</h3>
                <div className="space-y-3">
                  {cooperative.president && (
                    <div className="flex items-start gap-3">
                      <User className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <div className="text-sm text-gray-500">Président</div>
                        <div className="font-medium text-gray-900">{cooperative.president}</div>
                      </div>
                    </div>
                  )}
                  {cooperative.primaryPhoneE164 && (
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <div className="text-sm text-gray-500">Téléphone</div>
                        <div className="font-medium text-gray-900">{cooperative.primaryPhoneE164}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {cooperative.natureActivite && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-500 mb-2">Nature d'Activité</h3>
              <p className="text-gray-700 bg-gray-50 p-4 rounded-lg border-l-4 border-secondary-500">
                {cooperative.natureActivite}
              </p>
              {cooperative.natureActiviteTags && cooperative.natureActiviteTags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {cooperative.natureActiviteTags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {cooperative.latitude && cooperative.longitude && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-500 mb-2">Coordonnées GPS</h3>
              <p className="text-gray-700">
                {cooperative.latitude.toFixed(4)}, {cooperative.longitude.toFixed(4)}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

