import React, { useState } from 'react';
import './App.css';
import MedexxaLanding from './components/MedexxaLanding';
import RegisterPatient from './components/RegisterPatient';
import LoginPatient from './components/LoginPatient';
import SuperAdminDashboard from './components/SuperAdminDashboard';
import DoctorDashboard from './components/DoctorDashboard';
import NurseDashboard from './components/NurseDashboard';
import CenterAdminDashboard from './components/CenterAdminDashboard';

function App() {
  const [currentView, setCurrentView] = useState('landing');

  const handleNavigation = (view) => {
    setCurrentView(view);
  };

  const renderView = () => {
    switch(currentView) {
      case 'patient-register':
        return <RegisterPatient onNavigate={handleNavigation} />;
      case 'login':
        return <LoginPatient onNavigate={handleNavigation} />;
      case 'super-admin':
        return <SuperAdminDashboard onNavigate={handleNavigation} />;
      case 'doctor':
        return <DoctorDashboard onNavigate={handleNavigation} />;
      case 'nurse':
        return <NurseDashboard onNavigate={handleNavigation} />;
      case 'center-admin':
        return <CenterAdminDashboard onNavigate={handleNavigation} />;
      case 'health-center-register':
        // You can create a HealthCenterRegister component later
        return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-4 text-center">Health Center Registration</h2>
            <p className="text-gray-600 mb-6 text-center">Health center registration page coming soon...</p>
            <button 
              onClick={() => handleNavigation('landing')}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>;
      case 'dashboard':
        // You can create a Dashboard component later
        return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-4 text-center">Patient Dashboard</h2>
            <p className="text-gray-600 mb-6 text-center">Welcome to your health dashboard!</p>
            <div className="space-y-3">
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm font-medium">✓ Registration completed successfully</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-sm font-medium">✓ Account verified</p>
              </div>
              <button 
                onClick={() => handleNavigation('landing')}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>;
      default:
        return <MedexxaLanding onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="App">
      {renderView()}
    </div>
  );
}

export default App;