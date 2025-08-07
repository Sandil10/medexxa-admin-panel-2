import React, { useState, useCallback } from 'react';
import { Heart, Activity, Users, ClipboardList, Thermometer, Search, Plus, Save, Clock, AlertCircle, CheckCircle, X, Printer } from 'lucide-react';

const NurseDashboard = ({ onNavigate }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [vitals, setVitals] = useState({
    patientId: '',
    temperature: '',
    bloodPressure: '',
    heartRate: '',
    respiratoryRate: '',
    oxygenSaturation: '',
    weight: '',
    height: '',
    observations: ''
  });
  const [careNote, setCareNote] = useState({
    patientId: '',
    noteType: 'General Care',
    content: '',
    priority: 'Normal'
  });
  const [savedVitals, setSavedVitals] = useState([
    { id: 1, patientName: 'Sarah Johnson', time: '1:30 PM', temp: '98.6°F', bp: '120/80', hr: '72', o2sat: '98%', date: '2024-08-06' },
    { id: 2, patientName: 'Michael Chen', time: '12:45 PM', temp: '99.1°F', bp: '135/85', hr: '78', o2sat: '97%', date: '2024-08-06' },
    { id: 3, patientName: 'Emma Wilson', time: '11:20 AM', temp: '98.4°F', bp: '118/76', hr: '68', o2sat: '99%', date: '2024-08-06' }
  ]);
  const [savedNotes, setSavedNotes] = useState([
    {
      id: 1,
      patientName: 'Sarah Johnson',
      room: '101',
      condition: 'Post-Surgery Care',
      priority: 'High',
      content: 'Patient responding well to post-operative care. Pain level reduced from 7/10 to 4/10 after medication.',
      timestamp: '2 hours ago',
      noteType: 'General Care',
      doctorNotified: true,
      addedToHandover: true
    },
    {
      id: 2,
      patientName: 'Michael Chen',
      room: '102',
      condition: 'Diabetes Monitoring',
      priority: 'Normal',
      content: 'Blood glucose levels stable throughout the day. Patient administered insulin as prescribed.',
      timestamp: '4 hours ago',
      noteType: 'Medication Administration',
      doctorNotified: true,
      addedToHandover: false
    },
    {
      id: 3,
      patientName: 'Emma Wilson',
      room: '103',
      condition: 'Recovery',
      priority: 'Normal',
      content: 'Patient showing excellent recovery progress. Appetite improved, taking oral medications without difficulty.',
      timestamp: '6 hours ago',
      noteType: 'Patient Observation',
      doctorNotified: false,
      addedToHandover: true
    }
  ]);

  const patients = [
    { 
      id: 1, 
      name: 'Sarah Johnson', 
      room: '101', 
      condition: 'Post-surgery care', 
      priority: 'High', 
      doctor: 'Dr. Mitchell',
      age: 34,
      admissionDate: '2024-08-01',
      nextMedication: '2:00 PM',
      status: 'Stable'
    },
    { 
      id: 2, 
      name: 'Michael Chen', 
      room: '102', 
      condition: 'Diabetes monitoring', 
      priority: 'Medium', 
      doctor: 'Dr. Brown',
      age: 45,
      admissionDate: '2024-08-03',
      nextMedication: '3:30 PM',
      status: 'Monitoring'
    },
    { 
      id: 3, 
      name: 'Emma Wilson', 
      room: '103', 
      condition: 'Recovery', 
      priority: 'Low', 
      doctor: 'Dr. Mitchell',
      age: 28,
      admissionDate: '2024-08-04',
      nextMedication: '4:00 PM',
      status: 'Improving'
    },
    { 
      id: 4, 
      name: 'John Davis', 
      room: '104', 
      condition: 'Observation', 
      priority: 'Medium', 
      doctor: 'Dr. Johnson',
      age: 52,
      admissionDate: '2024-08-05',
      nextMedication: '1:00 PM',
      status: 'Stable'
    }
  ];

  const handleLogin = useCallback(() => {
    if (loginData.email && loginData.password) {
      setIsLoggedIn(true);
    }
  }, [loginData.email, loginData.password]);

  const handleSaveVitals = useCallback(() => {
    if (vitals.patientId && vitals.temperature && vitals.bloodPressure && vitals.heartRate) {
      const patient = patients.find(p => p.id.toString() === vitals.patientId);
      const newVital = {
        id: savedVitals.length + 1,
        patientName: patient?.name || 'Unknown Patient',
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        temp: vitals.temperature + '°F',
        bp: vitals.bloodPressure,
        hr: vitals.heartRate,
        o2sat: vitals.oxygenSaturation + '%',
        date: new Date().toISOString().split('T')[0]
      };
      
      setSavedVitals(prev => [newVital, ...prev]);
      setVitals({
        patientId: '',
        temperature: '',
        bloodPressure: '',
        heartRate: '',
        respiratoryRate: '',
        oxygenSaturation: '',
        weight: '',
        height: '',
        observations: ''
      });
      alert('Vitals saved successfully! Doctor has been notified.');
    } else {
      alert('Please fill in all required fields (Patient, Temperature, Blood Pressure, and Heart Rate)');
    }
  }, [vitals, patients, savedVitals.length]);

  const handlePrintReport = useCallback(() => {
    if (vitals.patientId) {
      alert('Vital signs report generated and sent to printer!');
    } else {
      alert('Please select a patient first');
    }
  }, [vitals.patientId]);

  const handleSaveNote = useCallback(() => {
    if (careNote.patientId && careNote.content.trim()) {
      const patient = patients.find(p => p.id.toString() === careNote.patientId);
      const newNote = {
        id: savedNotes.length + 1,
        patientName: patient?.name || 'Unknown Patient',
        room: patient?.room || '000',
        condition: patient?.condition || 'Unknown',
        priority: careNote.priority,
        content: careNote.content,
        timestamp: 'Just now',
        noteType: careNote.noteType,
        doctorNotified: false,
        addedToHandover: false
      };
      
      setSavedNotes(prev => [newNote, ...prev]);
      setCareNote({
        patientId: '',
        noteType: 'General Care',
        content: '',
        priority: 'Normal'
      });
      alert('Care note saved successfully!');
    } else {
      alert('Please select a patient and enter care notes');
    }
  }, [careNote, patients, savedNotes.length]);

  const handleNotifyDoctor = useCallback(() => {
    if (careNote.patientId && careNote.content.trim()) {
      alert('Doctor has been notified via SMS and email about the care note.');
    } else {
      alert('Please select a patient and enter care notes first');
    }
  }, [careNote.patientId, careNote.content]);

  const handleAddToHandover = useCallback(() => {
    if (careNote.patientId && careNote.content.trim()) {
      alert('Care note added to shift handover report successfully!');
    } else {
      alert('Please select a patient and enter care notes first');
    }
  }, [careNote.patientId, careNote.content]);

  const LoginForm = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-teal-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Activity className="h-8 w-8 text-teal-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Nurse Login</h2>
          <p className="text-gray-600 mt-2">Access your patient care dashboard</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Enter your email"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Enter your password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
          >
            Login to Dashboard
          </button>
        </div>

        <div className="text-center mt-6">
          <button 
            onClick={() => onNavigate('landing')}
            className="text-teal-600 hover:text-teal-700 text-sm"
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
              <div className="bg-teal-100 p-2 rounded-lg">
                <Heart className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Medexxa Nurse Portal</h1>
                <p className="text-sm text-gray-600">Patient Care & Support Dashboard</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4">
              <div className="text-left md:text-right">
                <p className="text-sm font-medium text-gray-900">Nurse Jennifer Adams</p>
                <p className="text-xs text-gray-600">ICU Department</p>
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
                activeTab === 'overview' ? 'bg-teal-50 text-teal-700' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Activity className="h-5 w-5" />
              <span>Overview</span>
            </button>
            <button
              onClick={() => setActiveTab('patients')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === 'patients' ? 'bg-teal-50 text-teal-700' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Users className="h-5 w-5" />
              <span>View Patients Assigned</span>
            </button>
            <button
              onClick={() => setActiveTab('vitals')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === 'vitals' ? 'bg-teal-50 text-teal-700' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Thermometer className="h-5 w-5" />
              <span>Record Vitals</span>
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === 'notes' ? 'bg-teal-50 text-teal-700' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <ClipboardList className="h-5 w-5" />
              <span>Update Notes & Support</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6">
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Assigned Patients</p>
                      <p className="text-2xl font-bold text-gray-900">{patients.length}</p>
                    </div>
                    <div className="bg-teal-100 p-3 rounded-lg">
                      <Users className="h-6 w-6 text-teal-600" />
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">High Priority</p>
                      <p className="text-2xl font-bold text-gray-900">{patients.filter(p => p.priority === 'High').length}</p>
                    </div>
                    <div className="bg-red-100 p-3 rounded-lg">
                      <AlertCircle className="h-6 w-6 text-red-600" />
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Vitals Recorded</p>
                      <p className="text-2xl font-bold text-gray-900">{savedVitals.length}</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-lg">
                      <Thermometer className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Care Notes</p>
                      <p className="text-2xl font-bold text-gray-900">{savedNotes.length}</p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <ClipboardList className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h3 className="text-lg font-semibold mb-4">High Priority Patients</h3>
                  <div className="space-y-3">
                    {patients.filter(p => p.priority === 'High').map(patient => (
                      <div key={patient.id} className="flex items-center justify-between p-3 border rounded-lg bg-red-50">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                            <AlertCircle className="h-5 w-5 text-red-600" />
                          </div>
                          <div>
                            <p className="font-medium">{patient.name}</p>
                            <p className="text-sm text-gray-600">Room {patient.room} - {patient.condition}</p>
                          </div>
                        </div>
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">High Priority</span>
                      </div>
                    ))}
                    {patients.filter(p => p.priority === 'High').length === 0 && (
                      <p className="text-gray-500 text-center py-4">No high priority patients at this time</p>
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h3 className="text-lg font-semibold mb-4">Today's Care Tasks</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <input type="checkbox" className="rounded" />
                        <div>
                          <p className="font-medium">Medication Round</p>
                          <p className="text-sm text-gray-600">2:00 PM - All patients</p>
                        </div>
                      </div>
                      <Clock className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <input type="checkbox" className="rounded" />
                        <div>
                          <p className="font-medium">Vitals Check</p>
                          <p className="text-sm text-gray-600">Room 101 - Sarah Johnson</p>
                        </div>
                      </div>
                      <Clock className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <input type="checkbox" className="rounded" />
                        <div>
                          <p className="font-medium">Doctor Handover</p>
                          <p className="text-sm text-gray-600">End of shift notes</p>
                        </div>
                      </div>
                      <Clock className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'patients' && (
            <div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
                <h2 className="text-2xl font-bold text-gray-900">View Patients Assigned</h2>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full md:w-auto">
                  <div className="relative">
                    <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search patients..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 w-full sm:w-auto"
                    />
                  </div>
                  <select className="border border-gray-300 rounded-lg px-3 py-2">
                    <option>All Priorities</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Patient Name</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Room</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Condition</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Doctor</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Priority</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Next Medication</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {patients.map((patient) => (
                        <tr key={patient.id} className="hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">{patient.name}</td>
                          <td className="py-3 px-4">{patient.room}</td>
                          <td className="py-3 px-4">{patient.condition}</td>
                          <td className="py-3 px-4">{patient.doctor}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              patient.priority === 'High' ? 'bg-red-100 text-red-800' :
                              patient.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {patient.priority}
                            </span>
                          </td>
                          <td className="py-3 px-4">{patient.nextMedication}</td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => setSelectedPatient(patient)}
                              className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 rounded text-xs transition-colors"
                            >
                              Care Details
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

          {activeTab === 'vitals' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Record Patient Vitals</h2>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Patient *</label>
                    <select 
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500"
                      value={vitals.patientId}
                      onChange={(e) => setVitals({...vitals, patientId: e.target.value})}
                    >
                      <option value="">Choose patient...</option>
                      {patients.map((patient) => (
                        <option key={patient.id} value={patient.id}>{patient.name} - Room {patient.room}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date & Time</label>
                    <input
                      type="datetime-local"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500"
                      defaultValue={new Date().toISOString().slice(0, 16)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Temperature (°F) *</label>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="98.6"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500"
                      value={vitals.temperature}
                      onChange={(e) => setVitals({...vitals, temperature: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Blood Pressure *</label>
                    <input
                      type="text"
                      placeholder="120/80"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500"
                      value={vitals.bloodPressure}
                      onChange={(e) => setVitals({...vitals, bloodPressure: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Heart Rate (bpm) *</label>
                    <input
                      type="number"
                      placeholder="72"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500"
                      value={vitals.heartRate}
                      onChange={(e) => setVitals({...vitals, heartRate: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Respiratory Rate</label>
                    <input
                      type="number"
                      placeholder="16"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500"
                      value={vitals.respiratoryRate}
                      onChange={(e) => setVitals({...vitals, respiratoryRate: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Oxygen Saturation (%)</label>
                    <input
                      type="number"
                      placeholder="98"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500"
                      value={vitals.oxygenSaturation}
                      onChange={(e) => setVitals({...vitals, oxygenSaturation: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="70.5"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500"
                      value={vitals.weight}
                      onChange={(e) => setVitals({...vitals, weight: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
                    <input
                      type="number"
                      placeholder="165"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500"
                      value={vitals.height}
                      onChange={(e) => setVitals({...vitals, height: e.target.value})}
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Clinical Observations</label>
                  <textarea
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 focus:ring-2 focus:ring-teal-500 resize-none"
                    placeholder="Any additional observations, patient comfort level, pain scale, etc..."
                    value={vitals.observations}
                    onChange={(e) => setVitals({...vitals, observations: e.target.value})}
                  ></textarea>
                </div>

                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                  <button 
                    onClick={handleSaveVitals}
                    className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Vitals</span>
                  </button>
                  <button 
                    onClick={handlePrintReport}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    <Printer className="h-4 w-4" />
                    <span>Print Report</span>
                  </button>
                </div>

                <div className="mt-8 border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Recent Vital Signs</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left py-2 px-3">Patient</th>
                          <th className="text-left py-2 px-3">Time</th>
                          <th className="text-left py-2 px-3">Temp</th>
                          <th className="text-left py-2 px-3">BP</th>
                          <th className="text-left py-2 px-3">HR</th>
                          <th className="text-left py-2 px-3">O2 Sat</th>
                          <th className="text-left py-2 px-3">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {savedVitals.map((vital) => (
                          <tr key={vital.id} className="hover:bg-gray-50">
                            <td className="py-2 px-3 font-medium">{vital.patientName}</td>
                            <td className="py-2 px-3">{vital.time}</td>
                            <td className="py-2 px-3">{vital.temp}</td>
                            <td className="py-2 px-3">{vital.bp}</td>
                            <td className="py-2 px-3">{vital.hr}</td>
                            <td className="py-2 px-3">{vital.o2sat}</td>
                            <td className="py-2 px-3">{vital.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Update Notes & Support Doctor's Care Routine</h2>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Patient *</label>
                    <select 
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500"
                      value={careNote.patientId}
                      onChange={(e) => setCareNote({...careNote, patientId: e.target.value})}
                    >
                      <option value="">Choose patient...</option>
                      {patients.map((patient) => (
                        <option key={patient.id} value={patient.id}>{patient.name} - Room {patient.room}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Note Type</label>
                    <select 
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500"
                      value={careNote.noteType}
                      onChange={(e) => setCareNote({...careNote, noteType: e.target.value})}
                    >
                      <option>General Care</option>
                      <option>Medication Administration</option>
                      <option>Patient Observation</option>
                      <option>Doctor Handover</option>
                      <option>Pain Management</option>
                      <option>Mobility Assessment</option>
                      <option>Wound Care</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority Level</label>
                  <select 
                    className="w-full md:w-1/3 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500"
                    value={careNote.priority}
                    onChange={(e) => setCareNote({...careNote, priority: e.target.value})}
                  >
                    <option>Normal</option>
                    <option>High</option>
                    <option>Urgent</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Care Notes & Updates *</label>
                  <textarea
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 h-32 focus:ring-2 focus:ring-teal-500 resize-none"
                    placeholder="Enter detailed care notes, patient observations, medication responses, or updates to support the doctor's care routine..."
                    value={careNote.content}
                    onChange={(e) => setCareNote({...careNote, content: e.target.value})}
                  ></textarea>
                </div>

                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mb-8">
                  <button 
                    onClick={handleSaveNote}
                    className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Note</span>
                  </button>
                  <button 
                    onClick={handleNotifyDoctor}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Notify Doctor
                  </button>
                  <button 
                    onClick={handleAddToHandover}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Add to Handover
                  </button>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Recent Care Notes & Doctor Support</h3>
                  <div className="space-y-4">
                    {savedNotes.map((note) => (
                      <div key={note.id} className="border rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2 space-y-2 md:space-y-0">
                          <div>
                            <p className="font-medium">{note.patientName} - Room {note.room}</p>
                            <p className="text-sm text-gray-600">{note.condition}</p>
                          </div>
                          <div className="text-left md:text-right">
                            <span className="text-xs text-gray-500">{note.timestamp}</span>
                            <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                              note.priority === 'High' ? 'bg-red-100 text-red-800' :
                              note.priority === 'Urgent' ? 'bg-orange-100 text-orange-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {note.priority} Priority
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{note.content}</p>
                        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                          {note.doctorNotified && (
                            <span className="flex items-center space-x-1">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              <span>Doctor Notified</span>
                            </span>
                          )}
                          {note.addedToHandover && (
                            <span className="flex items-center space-x-1">
                              <CheckCircle className="h-3 w-3 text-blue-500" />
                              <span>Added to Handover</span>
                            </span>
                          )}
                          <span>Type: {note.noteType}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Doctor Care Routine Support</h4>
                  <p className="text-sm text-blue-700 mb-3">
                    Your notes directly support the doctors' care routines by providing real-time patient updates, 
                    medication responses, and critical observations that inform treatment decisions.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="font-medium text-blue-900">How Your Notes Help:</h5>
                      <ul className="list-disc list-inside text-blue-700 space-y-1">
                        <li>Provide continuous patient monitoring data</li>
                        <li>Track medication effectiveness and side effects</li>
                        <li>Document patient comfort and pain levels</li>
                        <li>Support treatment plan adjustments</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-blue-900">Best Practices:</h5>
                      <ul className="list-disc list-inside text-blue-700 space-y-1">
                        <li>Include specific observations and measurements</li>
                        <li>Note patient responses to interventions</li>
                        <li>Flag any concerning changes immediately</li>
                        <li>Use clear, professional medical terminology</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedPatient && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Patient Care Details</h3>
                  <button
                    onClick={() => setSelectedPatient(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Patient Name</p>
                      <p className="font-medium">{selectedPatient.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Room Number</p>
                      <p className="font-medium">{selectedPatient.room}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Age</p>
                      <p className="font-medium">{selectedPatient.age} years</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Status</p>
                      <p className="font-medium">{selectedPatient.status}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Condition</p>
                    <p className="font-medium">{selectedPatient.condition}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Attending Doctor</p>
                    <p className="font-medium">{selectedPatient.doctor}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Admission Date</p>
                      <p className="font-medium">{selectedPatient.admissionDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Next Medication</p>
                      <p className="font-medium">{selectedPatient.nextMedication}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Priority Level</p>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      selectedPatient.priority === 'High' ? 'bg-red-100 text-red-800' :
                      selectedPatient.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {selectedPatient.priority} Priority
                    </span>
                  </div>
                </div>
                <div className="mt-6 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <button 
                    onClick={() => {
                      const patientId = selectedPatient.id.toString();
                      setSelectedPatient(null);
                      setActiveTab('vitals');
                      setVitals(prev => ({...prev, patientId: patientId}));
                    }}
                    className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded text-sm transition-colors"
                  >
                    Record Vitals
                  </button>
                  <button 
                    onClick={() => {
                      const patientId = selectedPatient.id.toString();
                      setSelectedPatient(null);
                      setActiveTab('notes');
                      setCareNote(prev => ({...prev, patientId: patientId}));
                    }}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm transition-colors"
                  >
                    Add Care Note
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

export default NurseDashboard;