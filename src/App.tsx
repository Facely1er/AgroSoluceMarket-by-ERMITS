import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import MarketplaceHome from './pages/marketplace/MarketplaceHome';
import CooperativeDirectory from './pages/marketplace/CooperativeDirectory';
import CooperativeProfile from './pages/marketplace/CooperativeProfile';
import BuyerPortal from './pages/buyer/BuyerPortal';
import BuyerRequestForm from './pages/buyer/BuyerRequestForm';
import BuyerMatches from './pages/buyer/BuyerMatches';
import CooperativeDashboard from './pages/cooperative/CooperativeDashboard';
import FarmersFirstDashboard from './pages/cooperative/FarmersFirstDashboard';
import DirectoryPage from './pages/directory/DirectoryPage';
import DirectoryDetailPage from './pages/directory/DirectoryDetailPage';
import CooperativeWorkspace from './pages/workspace/CooperativeWorkspace';
import PilotDashboardPage from './pages/pilot/PilotDashboardPage';
import FarmerProtectionPage from './pages/principles/FarmerProtectionPage';
import RegulatoryReferencesPage from './pages/regulatory/RegulatoryReferencesPage';
import NGORegistryPage from './pages/references/NGORegistryPage';
import DueCarePrinciplesPage from './pages/governance/DueCarePrinciplesPage';
import { ChildLaborDashboard, AssessmentForm } from './components/compliance';
import ErrorBoundary from './components/common/ErrorBoundary';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-secondary-50 via-primary-50 to-white">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<MarketplaceHome />} />
            <Route path="/cooperatives" element={<CooperativeDirectory />} />
            <Route path="/cooperatives/:id" element={<CooperativeProfile />} />
            <Route path="/directory" element={<DirectoryPage />} />
            <Route path="/directory/:coop_id" element={<DirectoryDetailPage />} />
            <Route path="/workspace/:coop_id" element={<CooperativeWorkspace />} />
            <Route path="/pilot/:pilot_id" element={<PilotDashboardPage />} />
            <Route path="/buyer" element={<BuyerPortal />} />
            <Route path="/buyer/request" element={<BuyerRequestForm />} />
            <Route path="/buyer/requests/:requestId/matches" element={<BuyerMatches />} />
            <Route path="/buyer/*" element={<BuyerPortal />} />
            <Route path="/cooperative/*" element={<CooperativeDashboard />} />
            <Route path="/cooperative/:id/farmers-first" element={<FarmersFirstDashboard />} />
            <Route path="/principles/farmer-protection" element={<FarmerProtectionPage />} />
            <Route path="/regulatory-references" element={<RegulatoryReferencesPage />} />
            <Route path="/references/ngo" element={<NGORegistryPage />} />
            <Route path="/governance/due-care" element={<DueCarePrinciplesPage />} />
            <Route
              path="/compliance/child-labor"
              element={
                <ErrorBoundary>
                  <ChildLaborDashboard />
                </ErrorBoundary>
              }
            />
            <Route
              path="/compliance/assessments/new"
              element={
                <ErrorBoundary>
                  <AssessmentForm />
                </ErrorBoundary>
              }
            />
            <Route
              path="/compliance/assessments/:id/edit"
              element={
                <ErrorBoundary>
                  <AssessmentForm />
                </ErrorBoundary>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

