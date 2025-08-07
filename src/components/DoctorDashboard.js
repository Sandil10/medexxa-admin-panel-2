import React, { useState, useCallback } from 'react';
import { Heart, Stethoscope, Users, FileText, Clock, Search, Plus, Eye, CheckCircle, X, Save, Send, Printer } from 'lucide-react';

const DoctorDashboard = ({ onNavigate }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [consentRequested, setConsentRequested] = useState(false);
  const [newDiagnosis, setNewDiagnosis] = useState({
    patientId: '',
    diagnosis: '',
    prescription: '',
    notes: ''
  });
  const [savedDiagnoses, setSavedDiagnoses] = useState([
    {
      id: 1,
      patientName: 'Sarah Johnson',
      diagnosis: 'Hypertension Management',
      prescription: 'Lisinopril 10mg daily',
      date: '2024-08-05'
    },
    {
      id: 2,
      patientName: 'Michael Chen',
      diagnosis: 'Diabetes Type 2 Follow-up',
      prescription: 'Metformin 500mg twice daily',
      date: '2024-08-04'
    }
  ]);

  const patients = [
    { 
      id: 1, 
      name: 'Sarah Johnson', 
      age: 34, 
      condition: 'Hypertension', 
      lastVisit: '2024-08-05', 
      status: 'Active',
      phone: '+94 77 123 4567',
      email: 'sarah.j@email.com',
      bloodType: 'O+',
      allergies: 'Penicillin'
    },
    { 
      id: 2, 
      name: 'Michael Chen', 
      age: 45, 
      condition: 'Diabetes Type 2', 
      lastVisit: '2024-08-04', 
      status: 'Follow-up',
      phone: '+94 77 234 5678',
      email: 'michael.c@email.com',
      bloodType: 'A+',
      allergies: 'None'
    },
    { 
      id: 3, 
      name: 'Emma Wilson', 
      age: 28, 
      condition: 'Migraine', 
      lastVisit: '2024-08-03', 
      status: 'Active',
      phone: '+94 77 345 6789',
      email: 'emma.w@email.com',
      bloodType: 'B+',
      allergies: 'Aspirin'
    },
  ];

  const handleLogin = useCallback(() => {
    if (loginData.email && loginData.password) {
      setIsLoggedIn(true);
    }
  }, [loginData.email, loginData.password]);

  const handleSaveDiagnosis = useCallback(() => {
    if (newDiagnosis.patientId && newDiagnosis.diagnosis && newDiagnosis.prescription) {
      const patient = patients.find(p => p.id.toString() === newDiagnosis.patientId);
      const newEntry = {
        id: savedDiagnoses.length + 1,
        patientName: patient?.name || 'Unknown Patient',
        diagnosis: newDiagnosis.diagnosis,
        prescription: newDiagnosis.prescription,
        notes: newDiagnosis.notes,
        date: new Date().toISOString().split('T')[0]
      };
      
      setSavedDiagnoses(prev => [newEntry, ...prev]);
      setNewDiagnosis({
        patientId: '',
        diagnosis: '',
        prescription: '',
        notes: ''
      });
      alert('Diagnosis saved successfully!');
    } else {
      alert('Please fill in all required fields (Patient, Diagnosis, and Prescription)');
    }
  }, [newDiagnosis, patients, savedDiagnoses.length]);

  const handleGeneratePDF = useCallback(() => {
    if (newDiagnosis.patientId && newDiagnosis.prescription) {
      alert('Prescription PDF generated successfully! Check your downloads folder.');
    } else {
      alert('Please select a patient and enter prescription details first.');
    }
  }, [newDiagnosis.patientId, newDiagnosis.prescription]);

  const handleSendToPharmacy = useCallback(() => {
    if (newDiagnosis.patientId && newDiagnosis.prescription) {
      alert('Prescription sent to pharmacy successfully! The patient will be notified via SMS.');
    } else {
      alert('Please select a patient and enter prescription details first.');
    }
  }, [newDiagnosis.patientId, newDiagnosis.prescription]);

  const handleRequestConsent = useCallback(() => {
    setConsentRequested(true);
    alert('Consent request sent to patient via SMS and email. You will be notified once approved.');
  }, []);

  const LoginForm = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-blue-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Stethoscope className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Doctor Login</h2>
          <p className="text-gray-600 mt-2">Access your patient care dashboard</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
          >
            Login to Dashboard
          </button>
        </div>

        <div className="text-center mt-6">
          <button 
            onClick={() => onNavigate('landing')}
            className="text-blue-600 hover:text-blue-700 text-sm"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );

  const Dashboard = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-4 md:px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Heart className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Medexxa Doctor Portal</h1>
                <p className="text-sm text-gray-600">Patient Care Dashboard</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4">
              <div className="text-left md:text-right">
                <p className="text-sm font-medium text-gray-900">Dr. Sarah Mitchell</p>
                <p className="text-xs text-gray-600">Cardiology Specialist</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => onNavigate('landing')}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  Back to Home
                </button>
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-white shadow-sm md:h-screen md:sticky md:top-0">
          <nav className="p-4 space-y-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === 'overview' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Stethoscope className="h-5 w-5" />
              <span>Overview</span>
            </button>
            <button
              onClick={() => setActiveTab('patients')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === 'patients' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Users className="h-5 w-5" />
              <span>View Assigned Patients</span>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === 'history' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <FileText className="h-5 w-5" />
              <span>View History (Consent)</span>
            </button>
            <button
              onClick={() => setActiveTab('diagnosis')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === 'diagnosis' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Plus className="h-5 w-5" />
              <span>Add Diagnosis & Prescriptions</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6">
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Assigned Patients</p>
                      <p className="text-2xl font-bold text-gray-900">{patients.length}</p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Today's Appointments</p>
                      <p className="text-2xl font-bold text-gray-900">8</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-lg">
                      <Clock className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Pending Reviews</p>
                      <p className="text-2xl font-bold text-gray-900">5</p>
                    </div>
                    <div className="bg-yellow-100 p-3 rounded-lg">
                      <FileText className="h-6 w-6 text-yellow-600" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold mb-4">Today's Schedule</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Sarah Johnson</p>
                        <p className="text-sm text-gray-600">9:00 AM - Routine Checkup</p>
                      </div>
                    </div>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Confirmed</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Michael Chen</p>
                        <p className="text-sm text-gray-600">10:30 AM - Follow-up</p>
                      </div>
                    </div>
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Pending</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'patients' && (
            <div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
                <h2 className="text-2xl font-bold text-gray-900">View Assigned Patients</h2>
                <div className="relative w-full md:w-auto">
                  <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search patients..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
                  />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Patient Name</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Age</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Condition</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Last Visit</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {patients.map((patient) => (
                        <tr key={patient.id}>
                          <td className="py-3 px-4 font-medium">{patient.name}</td>
                          <td className="py-3 px-4">{patient.age}</td>
                          <td className="py-3 px-4">{patient.condition}</td>
                          <td className="py-3 px-4">{patient.lastVisit}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              patient.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {patient.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => setSelectedPatient(patient)}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs transition-colors"
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">View Patient History (With Patient Consent)</h2>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Patient</label>
                  <select className="w-full md:w-1/2 border border-gray-300 rounded-lg px-3 py-2">
                    <option>Choose patient...</option>
                    {patients.map((patient) => (
                      <option key={patient.id} value={patient.id}>{patient.name}</option>
                    ))}
                  </select>
                </div>
                
                {!consentRequested ? (
                  <div className="border-l-4 border-blue-500 pl-4 bg-blue-50 p-4 rounded">
                    <div className="flex items-center space-x-2 mb-3">
                      <Eye className="h-5 w-5 text-blue-600" />
                      <h3 className="font-medium text-blue-900">Patient Consent Required</h3>
                    </div>
                    <p className="text-sm text-blue-700 mb-4">
                      To access this patient's medical history, you must first request and obtain patient consent. 
                      This ensures privacy compliance and maintains patient trust.
                    </p>
                    <button 
                      onClick={handleRequestConsent}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                    >
                      Request Patient Consent
                    </button>
                  </div>
                ) : (
                  <div className="border-l-4 border-green-500 pl-4 bg-green-50 p-4 rounded">
                    <div className="flex items-center space-x-2 mb-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <h3 className="font-medium text-green-900">Consent Request Sent</h3>
                    </div>
                    <p className="text-sm text-green-700 mb-4">
                      Consent request has been sent to the patient via SMS and email. 
                      You will be notified once the patient grants access to their medical history.
                    </p>
                    <div className="bg-white p-4 rounded border">
                      <h4 className="font-medium mb-2">Available Information (No Consent Required):</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Current appointment details</li>
                        <li>• Basic demographic information</li>
                        <li>• Today's visit notes</li>
                        <li>• Emergency contact information</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'diagnosis' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Add Diagnosis & Prescriptions</h2>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Patient *</label>
                    <select 
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      value={newDiagnosis.patientId}
                      onChange={(e) => setNewDiagnosis({...newDiagnosis, patientId: e.target.value})}
                    >
                      <option value="">Choose patient...</option>
                      {patients.map((patient) => (
                        <option key={patient.id} value={patient.id}>{patient.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Diagnosis Date</label>
                    <input
                      type="date"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      defaultValue={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Primary Diagnosis *</label>
                  <textarea
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Enter primary diagnosis details..."
                    value={newDiagnosis.diagnosis}
                    onChange={(e) => setNewDiagnosis({...newDiagnosis, diagnosis: e.target.value})}
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Prescription Details *</label>
                  <textarea
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 h-32 focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Enter prescription details including medication names, dosages, frequency, and duration..."
                    value={newDiagnosis.prescription}
                    onChange={(e) => setNewDiagnosis({...newDiagnosis, prescription: e.target.value})}
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                  <textarea
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 h-20 focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Any additional clinical notes or observations..."
                    value={newDiagnosis.notes}
                    onChange={(e) => setNewDiagnosis({...newDiagnosis, notes: e.target.value})}
                  />
                </div>

                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                  <button 
                    onClick={handleSaveDiagnosis}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Diagnosis</span>
                  </button>
                  <button 
                    onClick={handleGeneratePDF}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    <Printer className="h-4 w-4" />
                    <span>Generate Prescription PDF</span>
                  </button>
                  <button 
                    onClick={handleSendToPharmacy}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    <Send className="h-4 w-4" />
                    <span>Send to Pharmacy</span>
                  </button>
                </div>

                <div className="mt-8 border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Recent Diagnoses</h3>
                  <div className="space-y-3">
                    {savedDiagnoses.map((diagnosis) => (
                      <div key={diagnosis.id} className="border rounded-lg p-4">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2 space-y-2 md:space-y-0">
                          <div>
                            <p className="font-medium">{diagnosis.patientName}</p>
                            <p className="text-sm text-gray-600">{diagnosis.diagnosis}</p>
                          </div>
                          <span className="text-xs text-gray-500">{diagnosis.date}</span>
                        </div>
                        <p className="text-sm text-gray-700">{diagnosis.prescription}</p>
                        {diagnosis.notes && (
                          <p className="text-sm text-gray-600 mt-2 italic">Notes: {diagnosis.notes}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedPatient && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Patient Details</h3>
                  <button
                    onClick={() => setSelectedPatient(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-medium">{selectedPatient.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Age</p>
                    <p className="font-medium">{selectedPatient.age} years</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Primary Condition</p>
                    <p className="font-medium">{selectedPatient.condition}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Blood Type</p>
                    <p className="font-medium">{selectedPatient.bloodType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Known Allergies</p>
                    <p className="font-medium">{selectedPatient.allergies}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Contact</p>
                    <p className="font-medium">{selectedPatient.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Last Visit</p>
                    <p className="font-medium">{selectedPatient.lastVisit}</p>
                  </div>
                </div>
                <div className="mt-6 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <button
                    onClick={() => {
                      setSelectedPatient(null);
                      setActiveTab('diagnosis');
                      setNewDiagnosis({...newDiagnosis, patientId: selectedPatient.id.toString()});
                    }}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm transition-colors"
                  >
                    Add Diagnosis
                  </button>
                  <button
                    onClick={() => setSelectedPatient(null)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded text-sm transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );

  return isLoggedIn ? <Dashboard /> : <LoginForm />;
};

export default DoctorDashboard;