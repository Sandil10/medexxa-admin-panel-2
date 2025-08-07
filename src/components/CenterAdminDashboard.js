import React, { useState, useCallback } from 'react';
import { Heart, Building, Users, UserPlus, Clock, Settings, Search, Plus, Edit, Trash2, Save, MapPin, Phone, Mail, Filter, CheckCircle, X } from 'lucide-react';

const CenterAdminDashboard = ({ onNavigate }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [showAddUser, setShowAddUser] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showRegisterCenter, setShowRegisterCenter] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'doctor',
    specialization: '',
    phone: '',
    licenseNumber: '',
    experience: ''
  });
  const [newCenter, setNewCenter] = useState({
    name: '',
    type: 'Hospital',
    address: '',
    phone: '',
    email: '',
    website: '',
    services: '',
    bedCapacity: '',
    emergencyServices: false
  });
  const [centerProfile, setCenterProfile] = useState({
    name: 'City General Hospital',
    type: 'Hospital',
    address: '123 Main Street, Colombo 07, Sri Lanka',
    phone: '+94 11 234 5678',
    email: 'info@citygeneral.lk',
    website: 'www.citygeneral.lk',
    services: 'Cardiology, General Medicine, Emergency Care, Surgery, Radiology',
    specialNotice: 'COVID-19 safety protocols in place. Please wear masks.',
    establishedYear: '1985',
    bedCapacity: '200',
    emergencyServices: true
  });
  const [workingHours, setWorkingHours] = useState([
    { day: 'Monday', open: '08:00', close: '18:00', status: 'Open', emergencyOnly: false },
    { day: 'Tuesday', open: '08:00', close: '18:00', status: 'Open', emergencyOnly: false },
    { day: 'Wednesday', open: '08:00', close: '18:00', status: 'Open', emergencyOnly: false },
    { day: 'Thursday', open: '08:00', close: '18:00', status: 'Open', emergencyOnly: false },
    { day: 'Friday', open: '08:00', close: '18:00', status: 'Open', emergencyOnly: false },
    { day: 'Saturday', open: '09:00', close: '14:00', status: 'Open', emergencyOnly: false },
    { day: 'Sunday', open: '24/7', close: '24/7', status: 'Emergency Only', emergencyOnly: true },
  ]);
  const [staff, setStaff] = useState([
    { 
      id: 1, 
      name: 'Dr. Sarah Mitchell', 
      email: 'sarah.mitchell@citygeneral.lk', 
      role: 'Doctor', 
      specialization: 'Cardiology', 
      status: 'Active',
      phone: '+94 77 123 4567',
      licenseNumber: 'MD-2018-1234',
      joinDate: '2020-03-15',
      experience: '8 years'
    },
    { 
      id: 2, 
      name: 'Dr. John Brown', 
      email: 'john.brown@citygeneral.lk', 
      role: 'Doctor', 
      specialization: 'General Medicine', 
      status: 'Active',
      phone: '+94 77 234 5678',
      licenseNumber: 'MD-2019-5678',
      joinDate: '2021-01-10',
      experience: '6 years'
    },
    { 
      id: 3, 
      name: 'Nurse Jennifer Adams', 
      email: 'jennifer.adams@citygeneral.lk', 
      role: 'Nurse', 
      specialization: 'ICU', 
      status: 'Active',
      phone: '+94 77 345 6789',
      licenseNumber: 'RN-2020-9012',
      joinDate: '2022-06-01',
      experience: '4 years'
    },
    { 
      id: 4, 
      name: 'Nurse Mary Johnson', 
      email: 'mary.johnson@citygeneral.lk', 
      role: 'Nurse', 
      specialization: 'Emergency', 
      status: 'On Leave',
      phone: '+94 77 456 7890',
      licenseNumber: 'RN-2021-3456',
      joinDate: '2023-02-15',
      experience: '2 years'
    },
  ]);

  const handleLogin = useCallback(() => {
    if (loginData.email && loginData.password) {
      setIsLoggedIn(true);
    }
  }, [loginData.email, loginData.password]);

  const handleAddUser = useCallback(() => {
    if (newUser.name && newUser.email && newUser.phone && newUser.licenseNumber) {
      const newStaffMember = {
        id: staff.length + 1,
        ...newUser,
        role: newUser.role === 'doctor' ? 'Doctor' : 'Nurse',
        status: 'Active',
        joinDate: new Date().toISOString().split('T')[0]
      };
      setStaff(prev => [...prev, newStaffMember]);
      setNewUser({
        name: '',
        email: '',
        role: 'doctor',
        specialization: '',
        phone: '',
        licenseNumber: '',
        experience: ''
      });
      setShowAddUser(false);
      alert('Clinical user added successfully!');
    } else {
      alert('Please fill in all required fields');
    }
  }, [newUser, staff.length]);

  const handleDeleteUser = useCallback((id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setStaff(prev => prev.filter(member => member.id !== id));
      alert('User deleted successfully!');
    }
  }, []);

  const handleRegisterCenter = useCallback(() => {
    if (newCenter.name && newCenter.address && newCenter.phone && newCenter.email) {
      alert('Center registration submitted successfully! It will be reviewed by our team.');
      setNewCenter({
        name: '',
        type: 'Hospital',
        address: '',
        phone: '',
        email: '',
        website: '',
        services: '',
        bedCapacity: '',
        emergencyServices: false
      });
      setShowRegisterCenter(false);
    } else {
      alert('Please fill in all required fields');
    }
  }, [newCenter]);

  const handleUpdateWorkingHours = useCallback(() => {
    alert('Working hours updated successfully!');
  }, []);

  const handleSaveProfile = useCallback(() => {
    alert('Center profile updated successfully!');
    setShowEditProfile(false);
  }, []);

  const updateWorkingHour = useCallback((index, field, value) => {
    setWorkingHours(prev => prev.map((hour, i) => 
      i === index ? { ...hour, [field]: value } : hour
    ));
  }, []);

  const LoginForm = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-green-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Building className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Center Admin Login</h2>
          <p className="text-gray-600 mt-2">Access your center management dashboard</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter your email"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter your password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
          >
            Login to Dashboard
          </button>
        </div>

        <div className="text-center mt-6">
          <button 
            onClick={() => onNavigate('landing')}
            className="text-green-600 hover:text-green-700 text-sm"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );

  const Dashboard = () => (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="px-4 md:px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <Heart className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Medexxa Center Admin</h1>
                <p className="text-sm text-gray-600">{centerProfile.name} Management</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4">
              <div className="text-left md:text-right">
                <p className="text-sm font-medium text-gray-900">Admin Manager</p>
                <p className="text-xs text-gray-600">Center Administrator</p>
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
        <aside className="w-full md:w-64 bg-white shadow-sm md:h-screen md:sticky md:top-0">
          <nav className="p-4 space-y-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === 'overview' ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Building className="h-5 w-5" />
              <span>Center Overview</span>
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === 'register' ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Plus className="h-5 w-5" />
              <span>Register Center</span>
            </button>
            <button
              onClick={() => setActiveTab('staff')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === 'staff' ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Users className="h-5 w-5" />
              <span>Add Clinical Users</span>
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === 'schedule' ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Clock className="h-5 w-5" />
              <span>Manage Working Hours</span>
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === 'profile' ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Settings className="h-5 w-5" />
              <span>Center Profile</span>
            </button>
          </nav>
        </aside>

        <main className="flex-1 p-4 md:p-6">
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Center Overview</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Staff</p>
                      <p className="text-2xl font-bold text-gray-900">{staff.length}</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-lg">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Active Doctors</p>
                      <p className="text-2xl font-bold text-gray-900">{staff.filter(s => s.role === 'Doctor' && s.status === 'Active').length}</p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Heart className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Active Nurses</p>
                      <p className="text-2xl font-bold text-gray-900">{staff.filter(s => s.role === 'Nurse' && s.status === 'Active').length}</p>
                    </div>
                    <div className="bg-teal-100 p-3 rounded-lg">
                      <UserPlus className="h-6 w-6 text-teal-600" />
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Center Status</p>
                      <p className="text-lg font-bold text-green-600">Active</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-lg">
                      <Building className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h3 className="text-lg font-semibold mb-4">Recent Staff Activity</h3>
                  <div className="space-y-3">
                    {staff.slice(0, 3).map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Heart className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-gray-600">{member.status === 'Active' ? 'Online' : 'Offline'}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          member.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {member.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h3 className="text-lg font-semibold mb-4">Center Performance</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Patient Appointments Today</span>
                      <span className="font-semibold">42</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Average Wait Time</span>
                      <span className="font-semibold">15 mins</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Staff Utilization</span>
                      <span className="font-semibold">85%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Patient Satisfaction</span>
                      <span className="font-semibold">4.7/5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Bed Occupancy</span>
                      <span className="font-semibold">78%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'register' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Register Center</h2>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <Building className="h-5 w-5 text-blue-600" />
                      <h3 className="font-medium text-blue-900">Center Registration Status</h3>
                    </div>
                    <p className="text-sm text-blue-700">
                      Your center ({centerProfile.name}) is already registered and active in the Medexxa system. 
                      You can update your center information in the Center Profile section.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-3">Current Registration Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Center Name:</span>
                        <span className="font-medium">{centerProfile.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium">{centerProfile.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Registration Status:</span>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Active</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">License Valid:</span>
                        <span className="font-medium">Until 2025-12-31</span>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-3">Registration Benefits</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span>Patient appointment booking system</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span>Digital prescription management</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span>Staff management dashboard</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span>Patient records system</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span>Analytics and reporting</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold mb-3">Need to Register Additional Centers?</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    If you need to register additional healthcare centers under your organization, 
                    please contact our support team or use the registration form below.
                  </p>
                  <button 
                    onClick={() => setShowRegisterCenter(true)}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Register New Center
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'staff' && (
            <div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
                <h2 className="text-2xl font-bold text-gray-900">Add Clinical Users (Doctor/Nurse)</h2>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full md:w-auto">
                  <div className="relative">
                    <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search staff..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 w-full sm:w-auto"
                    />
                  </div>
                  <button
                    onClick={() => setShowAddUser(true)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Clinical User</span>
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Name</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Role</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Specialization</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">License</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Experience</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {staff.map((member) => (
                        <tr key={member.id}>
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium">{member.name}</p>
                              <p className="text-sm text-gray-500">{member.email}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4">{member.role}</td>
                          <td className="py-3 px-4">{member.specialization}</td>
                          <td className="py-3 px-4">{member.licenseNumber}</td>
                          <td className="py-3 px-4">{member.experience}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              member.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {member.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => alert(`Edit functionality for ${member.name}`)}
                                className="text-blue-600 hover:text-blue-700"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button 
                                onClick={() => handleDeleteUser(member.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'schedule' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Manage Working Hours</h2>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Center Operating Hours</h3>
                  <p className="text-sm text-gray-600">
                    Set your center's operating hours for each day of the week. Emergency services can be configured separately.
                  </p>
                </div>
                
                <div className="space-y-4">
                  {workingHours.map((schedule, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center p-4 border rounded-lg">
                      <div className="font-medium">{schedule.day}</div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Opening Time</label>
                        <input
                          type="time"
                          className="w-full border border-gray-300 rounded px-3 py-2"
                          value={schedule.open}
                          disabled={schedule.emergencyOnly}
                          onChange={(e) => updateWorkingHour(index, 'open', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Closing Time</label>
                        <input
                          type="time"
                          className="w-full border border-gray-300 rounded px-3 py-2"
                          value={schedule.close}
                          disabled={schedule.emergencyOnly}
                          onChange={(e) => updateWorkingHour(index, 'close', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Status</label>
                        <select 
                          className="w-full border border-gray-300 rounded px-3 py-2"
                          value={schedule.status}
                          onChange={(e) => updateWorkingHour(index, 'status', e.target.value)}
                        >
                          <option value="Open">Open</option>
                          <option value="Closed">Closed</option>
                          <option value="Emergency Only">Emergency Only</option>
                        </select>
                      </div>
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id={`emergency-${index}`}
                          className="mr-2"
                          checked={schedule.emergencyOnly}
                          onChange={(e) => updateWorkingHour(index, 'emergencyOnly', e.target.checked)}
                        />
                        <label htmlFor={`emergency-${index}`} className="text-sm text-gray-600">
                          Emergency Only
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 border-t pt-6">
                  <h4 className="font-semibold mb-3">Special Hours & Holidays</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Public Holidays</label>
                      <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                        <option>Emergency Services Only</option>
                        <option>Normal Operating Hours</option>
                        <option>Reduced Hours</option>
                        <option>Closed</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
                      <input
                        type="tel"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        placeholder="+94 11 234 5678"
                        defaultValue="+94 11 234 5678"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button 
                    onClick={handleUpdateWorkingHours}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Update Working Hours
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
                <h2 className="text-2xl font-bold text-gray-900">Center Profile</h2>
                <button
                  onClick={() => setShowEditProfile(true)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit Profile</span>
                </button>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Center Name</label>
                        <p className="text-gray-900 font-medium">{centerProfile.name}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Center Type</label>
                        <p className="text-gray-900">{centerProfile.type}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Established Year</label>
                        <p className="text-gray-900">{centerProfile.establishedYear}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bed Capacity</label>
                        <p className="text-gray-900">{centerProfile.bedCapacity} beds</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <p className="text-gray-900">{centerProfile.phone}</p>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <p className="text-gray-900">{centerProfile.email}</p>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                        <p className="text-blue-600 hover:text-blue-700 cursor-pointer">{centerProfile.website}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Services</label>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          centerProfile.emergencyServices ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {centerProfile.emergencyServices ? 'Available 24/7' : 'Not Available'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Location & Address</h3>
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                    <p className="text-gray-900">{centerProfile.address}</p>
                  </div>
                </div>

                <div className="mt-6 border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Services Offered</h3>
                  <p className="text-gray-700">{centerProfile.services}</p>
                </div>

                <div className="mt-6 border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Special Notice</h3>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="text-blue-800">{centerProfile.specialNotice}</p>
                  </div>
                </div>

                <div className="mt-6 border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">{staff.length}</p>
                      <p className="text-sm text-gray-600">Total Staff</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">{staff.filter(s => s.role === 'Doctor').length}</p>
                      <p className="text-sm text-gray-600">Doctors</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-bold text-teal-600">{staff.filter(s => s.role === 'Nurse').length}</p>
                      <p className="text-sm text-gray-600">Nurses</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-bold text-purple-600">4.7</p>
                      <p className="text-sm text-gray-600">Rating</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Register New Center Modal */}
          {showRegisterCenter && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Register New Center</h3>
                  <button
                    onClick={() => setShowRegisterCenter(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Center Name *</label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        value={newCenter.name}
                        onChange={(e) => setNewCenter({...newCenter, name: e.target.value})}
                        placeholder="Enter center name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Center Type *</label>
                      <select
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        value={newCenter.type}
                        onChange={(e) => setNewCenter({...newCenter, type: e.target.value})}
                      >
                        <option value="Hospital">Hospital</option>
                        <option value="Clinic">Clinic</option>
                        <option value="Diagnostic Center">Diagnostic Center</option>
                        <option value="Pharmacy">Pharmacy</option>
                        <option value="Laboratory">Laboratory</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                    <textarea
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 h-20"
                      value={newCenter.address}
                      onChange={(e) => setNewCenter({...newCenter, address: e.target.value})}
                      placeholder="Enter complete address"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        value={newCenter.phone}
                        onChange={(e) => setNewCenter({...newCenter, phone: e.target.value})}
                        placeholder="+94 11 234 5678"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                      <input
                        type="email"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        value={newCenter.email}
                        onChange={(e) => setNewCenter({...newCenter, email: e.target.value})}
                        placeholder="info@center.lk"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                      <input
                        type="url"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        value={newCenter.website}
                        onChange={(e) => setNewCenter({...newCenter, website: e.target.value})}
                        placeholder="www.center.lk"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Bed Capacity</label>
                      <input
                        type="number"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        value={newCenter.bedCapacity}
                        onChange={(e) => setNewCenter({...newCenter, bedCapacity: e.target.value})}
                        placeholder="100"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Services Offered</label>
                    <textarea
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24"
                      value={newCenter.services}
                      onChange={(e) => setNewCenter({...newCenter, services: e.target.value})}
                      placeholder="List the medical services and specializations available..."
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="new-emergency-services"
                      checked={newCenter.emergencyServices}
                      onChange={(e) => setNewCenter({...newCenter, emergencyServices: e.target.checked})}
                    />
                    <label htmlFor="new-emergency-services" className="text-sm font-medium text-gray-700">
                      24/7 Emergency Services Available
                    </label>
                  </div>
                </div>
                <div className="mt-6 flex space-x-3">
                  <button
                    onClick={handleRegisterCenter}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    Register Center
                  </button>
                  <button
                    onClick={() => setShowRegisterCenter(false)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Add User Modal */}
          {showAddUser && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Add New Clinical User</h3>
                  <button
                    onClick={() => setShowAddUser(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        value={newUser.name}
                        onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                        placeholder="Dr. John Smith"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Role *</label>
                      <select
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        value={newUser.role}
                        onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                      >
                        <option value="doctor">Doctor</option>
                        <option value="nurse">Nurse</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      value={newUser.email}
                      onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                      placeholder="doctor@citygeneral.lk"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        value={newUser.phone}
                        onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                        placeholder="+94 77 123 4567"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">License Number *</label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        value={newUser.licenseNumber}
                        onChange={(e) => setNewUser({...newUser, licenseNumber: e.target.value})}
                        placeholder="MD-2024-1234"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        value={newUser.specialization}
                        onChange={(e) => setNewUser({...newUser, specialization: e.target.value})}
                        placeholder="Cardiology"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        value={newUser.experience}
                        onChange={(e) => setNewUser({...newUser, experience: e.target.value})}
                        placeholder="5 years"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex space-x-3">
                  <button
                    onClick={handleAddUser}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    Add Clinical User
                  </button>
                  <button
                    onClick={() => setShowAddUser(false)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Edit Profile Modal */}
          {showEditProfile && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Edit Center Profile</h3>
                  <button
                    onClick={() => setShowEditProfile(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Center Name</label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        value={centerProfile.name}
                        onChange={(e) => setCenterProfile({...centerProfile, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Center Type</label>
                      <select
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        value={centerProfile.type}
                        onChange={(e) => setCenterProfile({...centerProfile, type: e.target.value})}
                      >
                        <option value="Hospital">Hospital</option>
                        <option value="Clinic">Clinic</option>
                        <option value="Diagnostic Center">Diagnostic Center</option>
                        <option value="Pharmacy">Pharmacy</option>
                        <option value="Laboratory">Laboratory</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        value={centerProfile.phone}
                        onChange={(e) => setCenterProfile({...centerProfile, phone: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        value={centerProfile.email}
                        onChange={(e) => setCenterProfile({...centerProfile, email: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                      <input
                        type="url"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        value={centerProfile.website}
                        onChange={(e) => setCenterProfile({...centerProfile, website: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Bed Capacity</label>
                      <input
                        type="number"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        value={centerProfile.bedCapacity}
                        onChange={(e) => setCenterProfile({...centerProfile, bedCapacity: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <textarea
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 h-20"
                      value={centerProfile.address}
                      onChange={(e) => setCenterProfile({...centerProfile, address: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Services Offered</label>
                    <textarea
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24"
                      value={centerProfile.services}
                      onChange={(e) => setCenterProfile({...centerProfile, services: e.target.value})}
                      placeholder="List the medical services and specializations available..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Special Notice</label>
                    <textarea
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 h-20"
                      value={centerProfile.specialNotice}
                      onChange={(e) => setCenterProfile({...centerProfile, specialNotice: e.target.value})}
                      placeholder="Any special announcements or notices for patients..."
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="emergency-services-edit"
                      checked={centerProfile.emergencyServices}
                      onChange={(e) => setCenterProfile({...centerProfile, emergencyServices: e.target.checked})}
                    />
                    <label htmlFor="emergency-services-edit" className="text-sm font-medium text-gray-700">
                      24/7 Emergency Services Available
                    </label>
                  </div>
                </div>
                <div className="mt-6 flex space-x-3">
                  <button
                    onClick={handleSaveProfile}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Changes</span>
                  </button>
                  <button
                    onClick={() => setShowEditProfile(false)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    Cancel
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

export default CenterAdminDashboard;