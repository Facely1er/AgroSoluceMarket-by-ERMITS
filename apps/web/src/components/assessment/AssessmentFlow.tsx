import { useAssessment } from '@/hooks/assessment/useAssessment';
import { ProgressTracker } from './ProgressTracker';
import { QuestionCard } from './QuestionCard';
import { ResultsDashboard } from './ResultsDashboard';
import { NavigationControls } from './NavigationControls';

interface AssessmentFlowProps {
  cooperativeId?: string;
  onComplete?: () => void;
}

export function AssessmentFlow({ cooperativeId, onComplete }: AssessmentFlowProps) {
  const {
    state,
    assessmentSections,
    handleAnswer,
    canProceed,
    nextSection,
    prevSection,
    calculateResults,
    saving,
    saveError
  } = useAssessment({ 
    cooperativeId,
    onComplete: () => {
      if (onComplete) {
        onComplete();
      }
    }
  });

  if (state.isComplete) {
    const results = calculateResults();
    return results ? <ResultsDashboard results={results} /> : null;
  }

  const currentSection = assessmentSections[state.currentSection];
  if (!currentSection) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-green-700">
          AgroSoluce<sup>®</sup> Farm Assessment
        </h1>
        <p className="text-gray-600 italic">Cultivating Secure Agriculture</p>
        <div className="inline-block bg-green-100 px-4 py-2 rounded-full">
          <span className="text-green-700 font-medium">
            ❤️ Farmers First - 100% Free Assessment
          </span>
        </div>
      </div>

      {/* Progress */}
      <ProgressTracker 
        progress={state.progress}
        currentSection={state.currentSection}
        totalSections={assessmentSections.length}
        sections={assessmentSections}
      />

      {/* Assessment Card */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-green-700 flex items-center gap-3">
            <span className="text-3xl">{currentSection.icon}</span>
            {currentSection.title}
          </h2>
          <p className="text-gray-600 mt-2">{currentSection.description}</p>
          <div className="text-sm text-gray-500 mt-2">
            Section {state.currentSection + 1} of {assessmentSections.length}
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-8">
          {currentSection.questions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              selectedOption={state.responses[question.id]?.selectedOption}
              onAnswer={(option) => handleAnswer(question.id, option)}
            />
          ))}
        </div>

        {/* Navigation */}
        <NavigationControls
          canGoBack={state.currentSection > 0}
          canGoForward={canProceed()}
          onBack={prevSection}
          onForward={nextSection}
          isLastSection={state.currentSection === assessmentSections.length - 1}
          currentSection={state.currentSection + 1}
          totalSections={assessmentSections.length}
        />
        
        {/* Save Status */}
        {saving && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 text-sm text-center">
            Saving assessment...
          </div>
        )}
        {saveError && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm text-center">
            Error saving: {saveError}
          </div>
        )}
      </div>
    </div>
  );
}

