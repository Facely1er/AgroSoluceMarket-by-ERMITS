import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  BookOpen, 
  MessageSquare, 
  TrendingUp, 
  Users, 
  CheckCircle,
  Clock,
  BarChart3
} from 'lucide-react';
import { OnboardingWizard, OnboardingProgress } from '../../features/onboarding/components';
import { SatisfactionSurvey, FeedbackForm } from '../../features/feedback/components';
import { BaselineAssessment, MonthlyProgressReport, ImpactDashboard } from '../../features/value-tracking/components';
import { TrainingList } from '../../features/training/components';

export default function FarmersFirstDashboard() {
  const { id: cooperativeId } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'overview' | 'onboarding' | 'baseline' | 'survey' | 'training' | 'progress' | 'impact' | 'feedback'>('overview');

  if (!cooperativeId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Cooperative ID is required</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 bg-gradient-to-br from-secondary-50 via-primary-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-t-4 border-primary-500">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Farmers First Dashboard
          </h1>
          <p className="text-gray-600">
            Outils et ressources pour maximiser l'impact d'AgroSoluce
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-3 text-sm font-medium border-b-2 ${
                  activeTab === 'overview'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <BarChart3 className="inline h-4 w-4 mr-2" />
                Vue d'ensemble
              </button>
              <button
                onClick={() => setActiveTab('onboarding')}
                className={`px-6 py-3 text-sm font-medium border-b-2 ${
                  activeTab === 'onboarding'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <BookOpen className="inline h-4 w-4 mr-2" />
                Onboarding
              </button>
              <button
                onClick={() => setActiveTab('baseline')}
                className={`px-6 py-3 text-sm font-medium border-b-2 ${
                  activeTab === 'baseline'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <TrendingUp className="inline h-4 w-4 mr-2" />
                Évaluation de Base
              </button>
              <button
                onClick={() => setActiveTab('survey')}
                className={`px-6 py-3 text-sm font-medium border-b-2 ${
                  activeTab === 'survey'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <MessageSquare className="inline h-4 w-4 mr-2" />
                Enquête de Satisfaction
              </button>
              <button
                onClick={() => setActiveTab('training')}
                className={`px-6 py-3 text-sm font-medium border-b-2 ${
                  activeTab === 'training'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <BookOpen className="inline h-4 w-4 mr-2" />
                Formation
              </button>
              <button
                onClick={() => setActiveTab('progress')}
                className={`px-6 py-3 text-sm font-medium border-b-2 ${
                  activeTab === 'progress'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <TrendingUp className="inline h-4 w-4 mr-2" />
                Progrès Mensuel
              </button>
              <button
                onClick={() => setActiveTab('impact')}
                className={`px-6 py-3 text-sm font-medium border-b-2 ${
                  activeTab === 'impact'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <BarChart3 className="inline h-4 w-4 mr-2" />
                Impact
              </button>
              <button
                onClick={() => setActiveTab('feedback')}
                className={`px-6 py-3 text-sm font-medium border-b-2 ${
                  activeTab === 'feedback'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <MessageSquare className="inline h-4 w-4 mr-2" />
                Feedback
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Onboarding Progress */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Progrès de l'Onboarding</h2>
                  <OnboardingProgress cooperativeId={cooperativeId} />
                </div>

                {/* Impact Dashboard Preview */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Impact d'AgroSoluce</h2>
                  <ImpactDashboard cooperativeId={cooperativeId} />
                </div>

                {/* Quick Actions */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Actions Rapides</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <button
                      onClick={() => setActiveTab('onboarding')}
                      className="bg-blue-50 border border-blue-200 rounded-lg p-4 hover:bg-blue-100 transition-colors text-left"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <BookOpen className="h-6 w-6 text-blue-600" />
                        <h3 className="font-semibold text-blue-900">Onboarding</h3>
                      </div>
                      <p className="text-sm text-blue-700">
                        Complétez votre processus d'onboarding
                      </p>
                    </button>

                    <button
                      onClick={() => setActiveTab('training')}
                      className="bg-green-50 border border-green-200 rounded-lg p-4 hover:bg-green-100 transition-colors text-left"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <BookOpen className="h-6 w-6 text-green-600" />
                        <h3 className="font-semibold text-green-900">Formation</h3>
                      </div>
                      <p className="text-sm text-green-700">
                        Accédez aux modules de formation
                      </p>
                    </button>

                    <button
                      onClick={() => setActiveTab('progress')}
                      className="bg-purple-50 border border-purple-200 rounded-lg p-4 hover:bg-purple-100 transition-colors text-left"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <TrendingUp className="h-6 w-6 text-purple-600" />
                        <h3 className="font-semibold text-purple-900">Progrès Mensuel</h3>
                      </div>
                      <p className="text-sm text-purple-700">
                        Soumettez votre rapport mensuel
                      </p>
                    </button>

                    <button
                      onClick={() => setActiveTab('survey')}
                      className="bg-orange-50 border border-orange-200 rounded-lg p-4 hover:bg-orange-100 transition-colors text-left"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <MessageSquare className="h-6 w-6 text-orange-600" />
                        <h3 className="font-semibold text-orange-900">Enquête</h3>
                      </div>
                      <p className="text-sm text-orange-700">
                        Complétez l'enquête de satisfaction
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'onboarding' && (
              <div>
                <OnboardingWizard 
                  cooperativeId={cooperativeId}
                  onComplete={() => {
                    setActiveTab('overview');
                  }}
                />
              </div>
            )}

            {activeTab === 'baseline' && (
              <div>
                <BaselineAssessment 
                  cooperativeId={cooperativeId}
                  onComplete={() => {
                    setActiveTab('overview');
                  }}
                />
              </div>
            )}

            {activeTab === 'survey' && (
              <div>
                <SatisfactionSurvey 
                  cooperativeId={cooperativeId}
                  onComplete={() => {
                    setActiveTab('overview');
                  }}
                />
              </div>
            )}

            {activeTab === 'training' && (
              <div>
                <TrainingList cooperativeId={cooperativeId} />
              </div>
            )}

            {activeTab === 'progress' && (
              <div>
                <MonthlyProgressReport 
                  cooperativeId={cooperativeId}
                  onComplete={() => {
                    setActiveTab('overview');
                  }}
                />
              </div>
            )}

            {activeTab === 'impact' && (
              <div>
                <ImpactDashboard cooperativeId={cooperativeId} />
              </div>
            )}

            {activeTab === 'feedback' && (
              <div>
                <FeedbackForm 
                  cooperativeId={cooperativeId}
                  onComplete={() => {
                    setActiveTab('overview');
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

