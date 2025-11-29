import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import MarketplaceHome from './pages/marketplace/MarketplaceHome';
import CooperativeDirectory from './pages/marketplace/CooperativeDirectory';
import CooperativeProfile from './pages/marketplace/CooperativeProfile';
import BuyerPortal from './pages/buyer/BuyerPortal';
import CooperativeDashboard from './pages/cooperative/CooperativeDashboard';

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
            <Route path="/buyer/*" element={<BuyerPortal />} />
            <Route path="/cooperative/*" element={<CooperativeDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

