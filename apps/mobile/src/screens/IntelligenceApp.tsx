/**
 * AgroSoluce Intelligence Mobile App - Three-Tier Interface
 * 
 * Web-compatible PWA version with 3 user profiles:
 * 1. ERMITS Team Command Center
 * 2. Cooperative Management Dashboard
 * 3. Farmer Field App
 */

import { useState } from 'react';
import './IntelligenceApp.css';

type UserRole = 'ermits_team' | 'cooperative' | 'farmer' | null;

// Mock data
const MOCK_WEATHER = {
  current: { temp: 28, condition: 'Partly Cloudy', humidity: 72, rainfall: 0 },
  forecast: [
    { day: 'Mon', high: 31, low: 22, rain: 20, icon: '⛅' },
    { day: 'Tue', high: 29, low: 21, rain: 60, icon: '🌧️' },
    { day: 'Wed', high: 32, low: 23, rain: 10, icon: '☀️' },
    { day: 'Thu', high: 30, low: 22, rain: 40, icon: '⛈️' },
    { day: 'Fri', high: 28, low: 20, rain: 70, icon: '🌧️' },
  ]
};

const MOCK_MARKET_PRICES = [
  { crop: 'Cocoa', price: 2850, change: '+5.2%', trend: '📈', unit: 'XOF/kg' },
  { crop: 'Coffee', price: 3200, change: '-2.1%', trend: '📉', unit: 'XOF/kg' },
  { crop: 'Cashew', price: 1950, change: '+8.7%', trend: '📈', unit: 'XOF/kg' },
  { crop: 'Palm Oil', price: 1500, change: '+3.4%', trend: '📈', unit: 'XOF/L' },
];

const MOCK_COOPERATIVES = [
  { id: '1', name: 'SCAC Abidjan', region: 'Lagunes', members: 487, status: 'compliant', lastSync: '2 hrs ago' },
  { id: '2', name: 'COOPAGRI San-Pedro', region: 'Bas-Sassandra', members: 1203, status: 'warning', lastSync: '5 hrs ago' },
  { id: '3', name: 'UCODEC Daloa', region: 'Sassandra-Marahoué', members: 856, status: 'compliant', lastSync: '1 hr ago' },
];

const MOCK_COMPLIANCE_ALERTS = [
  { type: 'EUDR', message: 'GPS verification required for 23 farms', priority: 'high', cooperative: 'SCAC Abidjan' },
  { type: 'Child Labor', message: 'School enrollment documents pending', priority: 'medium', cooperative: 'COOPAGRI San-Pedro' },
  { type: 'Fair Trade', message: 'Annual audit scheduled Dec 15', priority: 'low', cooperative: 'UCODEC Daloa' },
];

const MOCK_TRENDS = [
  { title: 'Cocoa Demand Surge in EU', impact: 'Prices up 12% this month', action: 'Consider early harvest' },
  { title: 'EUDR Deadline Approaching', impact: '45 days until compliance required', action: 'Complete GPS mapping' },
  { title: 'Drought Risk in Bas-Sassandra', impact: 'Rainfall 30% below average', action: 'Implement water conservation' },
];

// Role Selector Component
const RoleSelector = ({ onSelectRole }: { onSelectRole: (role: UserRole) => void }) => (
  <div className="role-selector">
    <div className="role-selector-content">
      <h1 className="role-selector-title">AgroSoluce Intelligence™</h1>
      <p className="role-selector-subtitle">Select Your Role</p>
      
      <button 
        className="role-button role-button-ermits"
        onClick={() => onSelectRole('ermits_team')}
      >
        <span className="role-button-icon">🎯</span>
        <span className="role-button-title">ERMITS Team</span>
        <span className="role-button-desc">Command Center • 3,797 Cooperatives</span>
      </button>

      <button 
        className="role-button role-button-coop"
        onClick={() => onSelectRole('cooperative')}
      >
        <span className="role-button-icon">🏢</span>
        <span className="role-button-title">Cooperative</span>
        <span className="role-button-desc">Management Dashboard • Members & Sales</span>
      </button>

      <button 
        className="role-button role-button-farmer"
        onClick={() => onSelectRole('farmer')}
      >
        <span className="role-button-icon">👨‍🌾</span>
        <span className="role-button-title">Farmer</span>
        <span className="role-button-desc">Field App • Voice Guided • Offline</span>
      </button>
    </div>
  </div>
);

// ERMITS Team Dashboard
const ERMITSTeamDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  
  return (
    <div className="dashboard-container">
      <header className="header-ermits">
        <div>
          <h1 className="header-title">ERMITS Command</h1>
          <p className="header-subtitle">Managing 3,797 Cooperatives</p>
        </div>
        <div className="sync-badge">
          <span>⚡ Live</span>
        </div>
      </header>

      <nav className="tab-bar">
        {['overview', 'cooperatives', 'alerts', 'trends'].map((tab) => (
          <button
            key={tab}
            className={`tab ${selectedTab === tab ? 'tab-active' : ''}`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </nav>

      <main className="dashboard-content">
        {selectedTab === 'overview' && (
          <>
            <div className="metrics-grid">
              <div className="metric-card metric-card-forest">
                <span className="metric-icon">🏢</span>
                <div className="metric-content">
                  <p className="metric-label">Active Cooperatives</p>
                  <p className="metric-value">3,797</p>
                  <p className="metric-trend">+12 this week</p>
                </div>
              </div>
              <div className="metric-card metric-card-leaf">
                <span className="metric-icon">👨‍🌾</span>
                <div className="metric-content">
                  <p className="metric-label">Total Farmers</p>
                  <p className="metric-value">524,203</p>
                  <p className="metric-trend">+1,847 this month</p>
                </div>
              </div>
              <div className="metric-card metric-card-success">
                <span className="metric-icon">✅</span>
                <div className="metric-content">
                  <p className="metric-label">EUDR Compliant</p>
                  <p className="metric-value">98.2%</p>
                  <p className="metric-trend">+2.1% this month</p>
                </div>
              </div>
              <div className="metric-card metric-card-warning">
                <span className="metric-icon">⚠️</span>
                <div className="metric-content">
                  <p className="metric-label">Action Required</p>
                  <p className="metric-value">127</p>
                  <p className="metric-trend">23 urgent</p>
                </div>
              </div>
            </div>

            <div className="weather-card">
              <div className="weather-header">
                <h3 className="weather-title">🌤️ Climate Intelligence</h3>
                <span className="weather-temp">{MOCK_WEATHER.current.temp}°C</span>
              </div>
              <p className="weather-condition">{MOCK_WEATHER.current.condition}</p>
              <div className="weather-details">
                <span>💧 {MOCK_WEATHER.current.humidity}% Humidity</span>
                <span>🌧️ {MOCK_WEATHER.current.rainfall}mm Rain</span>
              </div>
              <div className="forecast-scroll">
                {MOCK_WEATHER.forecast.map((day, idx) => (
                  <div key={idx} className="forecast-day">
                    <span className="forecast-day-name">{day.day}</span>
                    <span className="forecast-icon">{day.icon}</span>
                    <span className="forecast-temp">{day.high}°</span>
                    <span className="forecast-rain">{day.rain}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="market-card">
              <h3 className="section-title">💰 Market Prices</h3>
              {MOCK_MARKET_PRICES.map((item, idx) => (
                <div key={idx} className="price-row">
                  <div className="price-info">
                    <p className="price-crop">{item.crop}</p>
                    <p className="price-unit">{item.unit}</p>
                  </div>
                  <div className="price-values">
                    <p className="price-amount">{item.price.toLocaleString()}</p>
                    <p className={`price-change ${item.change.startsWith('+') ? 'price-up' : 'price-down'}`}>
                      {item.trend} {item.change}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {selectedTab === 'cooperatives' && (
          <div className="list-container">
            <h3 className="section-title">📋 Cooperative Directory</h3>
            {MOCK_COOPERATIVES.map((coop) => (
              <div key={coop.id} className="coop-card">
                <div className="coop-header">
                  <h4 className="coop-name">{coop.name}</h4>
                  <div className={`status-indicator ${coop.status === 'compliant' ? 'status-compliant' : 'status-warning'}`} />
                </div>
                <p className="coop-region">📍 {coop.region}</p>
                <div className="coop-stats">
                  <span>👥 {coop.members} members</span>
                  <span>🔄 {coop.lastSync}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedTab === 'alerts' && (
          <div className="list-container">
            <h3 className="section-title">🚨 Compliance Alerts</h3>
            {MOCK_COMPLIANCE_ALERTS.map((alert, idx) => (
              <div key={idx} className="alert-card">
                <div className="alert-header">
                  <span className={`alert-badge alert-${alert.priority}`}>{alert.type}</span>
                  <span className="alert-coop">{alert.cooperative}</span>
                </div>
                <p className="alert-message">{alert.message}</p>
                <button className="alert-action">Take Action →</button>
              </div>
            ))}
          </div>
        )}

        {selectedTab === 'trends' && (
          <div className="list-container">
            <h3 className="section-title">📊 Agricultural Trends</h3>
            {MOCK_TRENDS.map((trend, idx) => (
              <div key={idx} className="trend-card">
                <h4 className="trend-title">{trend.title}</h4>
                <p className="trend-impact">Impact: {trend.impact}</p>
                <div className="trend-action">
                  <p className="trend-action-label">Recommended Action:</p>
                  <p className="trend-action-text">{trend.action}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

// Cooperative Dashboard
const CooperativeDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('dashboard');
  
  return (
    <div className="dashboard-container">
      <header className="header-coop">
        <div>
          <h1 className="header-title">SCAC Abidjan</h1>
          <p className="header-subtitle">487 Members • Lagunes Region</p>
        </div>
        <div className="compliance-badge">
          <span>✓ Compliant</span>
        </div>
      </header>

      <nav className="tab-bar">
        {['dashboard', 'members', 'sales', 'compliance'].map((tab) => (
          <button
            key={tab}
            className={`tab ${selectedTab === tab ? 'tab-active' : ''}`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </nav>

      <main className="dashboard-content">
        {selectedTab === 'dashboard' && (
          <>
            <div className="metrics-grid">
              <div className="metric-card metric-card-wheat">
                <span className="metric-icon">💰</span>
                <div className="metric-content">
                  <p className="metric-label">Monthly Revenue</p>
                  <p className="metric-value">€127,500</p>
                  <p className="metric-trend">+18% vs last month</p>
                </div>
              </div>
              <div className="metric-card metric-card-terracotta">
                <span className="metric-icon">📦</span>
                <div className="metric-content">
                  <p className="metric-label">Production</p>
                  <p className="metric-value">23.4 tons</p>
                  <p className="metric-trend">Cocoa, Coffee, Cashew</p>
                </div>
              </div>
            </div>

            <div className="weather-card">
              <div className="weather-header">
                <h3 className="weather-title">🌤️ Climate Intelligence</h3>
                <span className="weather-temp">{MOCK_WEATHER.current.temp}°C</span>
              </div>
              <p className="weather-condition">{MOCK_WEATHER.current.condition}</p>
            </div>

            <div className="market-card">
              <h3 className="section-title">💰 Market Prices</h3>
              {MOCK_MARKET_PRICES.map((item, idx) => (
                <div key={idx} className="price-row">
                  <div className="price-info">
                    <p className="price-crop">{item.crop}</p>
                    <p className="price-unit">{item.unit}</p>
                  </div>
                  <div className="price-values">
                    <p className="price-amount">{item.price.toLocaleString()}</p>
                    <p className={`price-change ${item.change.startsWith('+') ? 'price-up' : 'price-down'}`}>
                      {item.trend} {item.change}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="actions-card">
              <h3 className="section-title">⚡ Quick Actions</h3>
              <button className="action-button">📸 Submit Harvest Report</button>
              <button className="action-button">📍 Update GPS Coordinates</button>
              <button className="action-button">💬 Contact ERMITS Team</button>
            </div>
          </>
        )}

        {selectedTab === 'members' && (
          <div className="list-container">
            <h3 className="section-title">👨‍🌾 Member Directory</h3>
            <input type="text" className="search-input" placeholder="Search members..." />
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="member-card">
                <div className="member-info">
                  <h4 className="member-name">Farmer {i}</h4>
                  <p className="member-details">Plot {i} • 2.3 hectares • Cocoa</p>
                </div>
                <button className="member-action">View →</button>
              </div>
            ))}
          </div>
        )}

        {selectedTab === 'sales' && (
          <div className="list-container">
            <h3 className="section-title">💰 Sales & Orders</h3>
            <div className="sales-summary">
              <div className="sales-stat">
                <p className="sales-stat-label">This Month</p>
                <p className="sales-stat-value">€127,500</p>
              </div>
              <div className="sales-stat">
                <p className="sales-stat-label">Pending Orders</p>
                <p className="sales-stat-value">12</p>
              </div>
            </div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="order-card">
                <div className="order-header">
                  <h4 className="order-buyer">International Buyer {i}</h4>
                  <span className="order-status">Pending</span>
                </div>
                <p className="order-details">5 tons Cocoa • €12,500</p>
                <p className="order-date">Delivery: Dec 15, 2024</p>
              </div>
            ))}
          </div>
        )}

        {selectedTab === 'compliance' && (
          <div className="list-container">
            <h3 className="section-title">✅ Compliance Status</h3>
            <div className="compliance-card">
              <div className="compliance-row">
                <span className="compliance-label">EUDR Certification</span>
                <span className="compliance-status status-valid">✅ Valid</span>
              </div>
              <div className="compliance-row">
                <span className="compliance-label">Fair Trade</span>
                <span className="compliance-status status-valid">✅ Valid</span>
              </div>
              <div className="compliance-row">
                <span className="compliance-label">Child Labor Verification</span>
                <span className="compliance-status status-warning">⚠️ Update Required</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

// Farmer Field App
const FarmerFieldApp = () => {
  const [selectedTab, setSelectedTab] = useState('home');
  const [language, setLanguage] = useState('baoule');
  
  return (
    <div className="dashboard-container">
      <header className="header-farmer">
        <div>
          <h1 className="header-title-farmer">🌾 AgroSoluce</h1>
          <p className="header-subtitle-farmer">Offline Mode • Baoule</p>
        </div>
        <button className="voice-button">
          <span className="voice-icon">🎤</span>
        </button>
      </header>

      <nav className="farmer-nav">
        {[
          { key: 'home', icon: '🏠', label: 'Home' },
          { key: 'weather', icon: '🌤️', label: 'Weather' },
          { key: 'prices', icon: '💰', label: 'Prices' },
          { key: 'help', icon: '📞', label: 'Help' },
        ].map((tab) => (
          <button
            key={tab.key}
            className={`farmer-tab ${selectedTab === tab.key ? 'farmer-tab-active' : ''}`}
            onClick={() => setSelectedTab(tab.key)}
          >
            <span className="farmer-tab-icon">{tab.icon}</span>
            <span className="farmer-tab-label">{tab.label}</span>
          </button>
        ))}
      </nav>

      <main className="dashboard-content">
        {selectedTab === 'home' && (
          <>
            <div className="greeting-card">
              <p className="greeting-text">🎙️ "Ani sɔrɔ! Welcome!"</p>
              <p className="greeting-subtext">Tap microphone to use voice commands</p>
            </div>

            <div className="tasks-card">
              <h3 className="section-title-farmer">📋 Today's Tasks</h3>
              {[
                { task: 'Check cocoa pods', icon: '🍫', time: 'Morning' },
                { task: 'Water young plants', icon: '💧', time: 'Afternoon' },
                { task: 'Report harvest', icon: '📸', time: 'Evening' },
              ].map((item, idx) => (
                <div key={idx} className="task-item">
                  <span className="task-icon">{item.icon}</span>
                  <div className="task-info">
                    <p className="task-text">{item.task}</p>
                    <p className="task-time">{item.time}</p>
                  </div>
                  <div className="task-check" />
                </div>
              ))}
            </div>

            <div className="stats-card">
              <div className="stat-item">
                <span className="stat-icon">🌱</span>
                <p className="stat-value">2.3 ha</p>
                <p className="stat-label">Farm Size</p>
              </div>
              <div className="stat-item">
                <span className="stat-icon">🍫</span>
                <p className="stat-value">850 kg</p>
                <p className="stat-label">This Season</p>
              </div>
            </div>
          </>
        )}

        {selectedTab === 'weather' && (
          <>
            <div className="weather-card-farmer">
              <span className="weather-icon-large">⛅</span>
              <p className="weather-temp-large">28°C</p>
              <p className="weather-condition-large">Partly Cloudy</p>
              <div className="weather-details-farmer">
                <div className="weather-detail-item">
                  <span className="weather-detail-icon">💧</span>
                  <p className="weather-detail-text">72%</p>
                  <p className="weather-detail-label">Humidity</p>
                </div>
                <div className="weather-detail-item">
                  <span className="weather-detail-icon">🌧️</span>
                  <p className="weather-detail-text">0mm</p>
                  <p className="weather-detail-label">Rain</p>
                </div>
              </div>
            </div>

            <div className="alert-card-farmer">
              <span className="alert-icon-farmer">⚠️</span>
              <p className="alert-text-farmer">Rain expected Tuesday</p>
              <p className="alert-subtext-farmer">Good time to plant</p>
            </div>

            <div className="forecast-card-farmer">
              <h3 className="section-title-farmer">📅 This Week</h3>
              {MOCK_WEATHER.forecast.map((day, idx) => (
                <div key={idx} className="forecast-row-farmer">
                  <span className="forecast-icon-farmer">{day.icon}</span>
                  <span className="forecast-day-farmer">{day.day}</span>
                  <span className="forecast-temp-farmer">{day.high}°/{day.low}°</span>
                  <span className="forecast-rain-farmer">💧{day.rain}%</span>
                </div>
              ))}
            </div>
          </>
        )}

        {selectedTab === 'prices' && (
          <>
            <div className="prices-card-farmer">
              <h3 className="section-title-farmer">💰 Today's Prices</h3>
              {MOCK_MARKET_PRICES.map((item, idx) => (
                <div key={idx} className="price-row-farmer">
                  <div className="price-left-farmer">
                    <p className="price-crop-farmer">{item.crop}</p>
                    <p className="price-unit-farmer">{item.unit}</p>
                  </div>
                  <div className="price-right-farmer">
                    <p className="price-amount-farmer">{item.price.toLocaleString()}</p>
                    <p className={`price-change-farmer ${item.change.startsWith('+') ? 'price-up' : 'price-down'}`}>
                      {item.change}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button className="voice-explain-button">
              <span className="voice-explain-icon">🎙️</span>
              <span className="voice-explain-text">Tap to hear price explanation</span>
            </button>
          </>
        )}

        {selectedTab === 'help' && (
          <>
            <div className="help-card">
              <h3 className="section-title-farmer">📞 Need Help?</h3>
              <button className="help-button">
                <span className="help-button-icon">☎️</span>
                <span className="help-button-text">Call Cooperative</span>
              </button>
              <button className="help-button">
                <span className="help-button-icon">💬</span>
                <span className="help-button-text">Send Message</span>
              </button>
              <button className="help-button">
                <span className="help-button-icon">📹</span>
                <span className="help-button-text">Watch Training Videos</span>
              </button>
            </div>

            <div className="language-card">
              <h3 className="section-title-farmer">🌍 Language</h3>
              {['Baoule', 'Agni', 'Dioula', 'Français'].map((lang) => (
                <button
                  key={lang}
                  className={`language-button ${language.toLowerCase() === lang.toLowerCase() ? 'language-button-active' : ''}`}
                  onClick={() => setLanguage(lang.toLowerCase())}
                >
                  {lang}
                </button>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

// Main App Component
export const IntelligenceApp = () => {
  const [userRole, setUserRole] = useState<UserRole>(null);

  if (!userRole) {
    return <RoleSelector onSelectRole={setUserRole} />;
  }

  if (userRole === 'ermits_team') return <ERMITSTeamDashboard />;
  if (userRole === 'cooperative') return <CooperativeDashboard />;
  if (userRole === 'farmer') return <FarmerFieldApp />;

  return null;
};

