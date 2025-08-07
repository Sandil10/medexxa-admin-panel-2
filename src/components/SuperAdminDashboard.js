import React, { useState, useCallback } from 'react';
import { Heart, Shield, Users, Settings, BarChart3, Ban, CheckCircle, X, Eye, Search, Filter, TrendingUp, Calendar, Activity, AlertCircle } from 'lucide-react';

const SuperAdminDashboard = ({ onNavigate }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  
  const [centers, setCenters] = useState([
    { id: 1, name: 'City General Hospital', location: 'Colombo', type: 'Hospital', status: 'Pending', submissionDate: '2024-08-01' },
    { id: 2, name: 'Metro Clinic', location: 'Kandy', type: 'Clinic', status: 'Pending', submissionDate: '2024-08-02' },
    { id: 3, name: 'Central Medical Center', location: 'Galle', type: 'Hospital', status: 'Approved', submissionDate: '2024-07-28' },
    { id: 4, name: 'Quick Care Clinic', location: 'Negombo', type: 'Clinic', status: 'Rejected', submissionDate: '2024-07-30' },
    { id: 5, name: 'Lanka Diagnostic Center', location: 'Matara', type: 'Diagnostic Center', status: 'Pending', submissionDate: '2024-08-03' }
  ]);
  
  const [users, setUsers] = useState([
    { id: 1, name: 'Dr. John Smith', role: 'Doctor', center: 'City Hospital', status: 'Active', email: 'john@city.lk' },
    { id: 2, name: 'Nurse Mary Johnson', role: 'Nurse', center: 'General Ward', status: 'Active', email: 'mary@general.lk' },
    { id: 3, name: 'Dr. Sarah Brown', role: 'Doctor', center: 'Metro Clinic', status: 'Inactive', email: 'sarah@metro.lk' },
    { id: 4, name: 'Admin Mike Wilson', role: 'Center Admin', center: 'Central Medical', status: 'Active', email: 'mike@central.lk' },
    { id: 5, name: 'Dr. Emma Davis', role: 'Doctor', center: 'Quick Care', status: 'Banned', email: 'emma@quick.lk' }
  ]);
  
  const [globalSettings, setGlobalSettings] = useState({
    maintenanceMode: 'Disabled',
    autoApproval: 'Manual Approval Required',
    userRegistration: 'Open Registration',
    backupFrequency: 'Daily',
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    emailNotifications: true,
    smsAlerts: false,
    autoReports: true,
    maxCentersPerAdmin: 10,
    maxAppointmentsPerDay: 100
  });

  const handleLogin = useCallback(() => {
    if (loginData.email && loginData.password) {
      setIsLoggedIn(true);
    }
  }, [loginData.email, loginData.password]);

  const handleApproveCenter = useCallback((id) => {
    setCenters(prev => prev.map(center => 
      center.id === id ? { ...center, status: 'Approved' } : center
    ));
    alert('Center approved successfully!');
  }, []);

  const handleRejectCenter = useCallback((id) => {
    if (window.confirm('Are you sure you want to reject this center?')) {
      setCenters(prev => prev.map(center => 
        center.id === id ? { ...center, status: 'Rejected' } : center
      ));
      alert('Center rejected.');
    }
  }, []);

  const handleBanUser = useCallback((id) => {
    if (window.confirm('Are you sure you want to ban this user?')) {
      setUsers(prev => prev.map(user => 
        user.id === id ? { ...user, status: 'Banned' } : user
      ));
      alert('User banned.');
    }
  }, []);

  const handleUnbanUser = useCallback((id) => {
    if (window.confirm('Are you sure you want to unban this user?')) {
      setUsers(prev => prev.map(user => 
        user.id === id ? { ...user, status: 'Active' } : user
      ));
      alert('User unbanned.');
    }
  }, []);

  const handleSaveSettings = useCallback(() => {
    alert('Settings saved successfully!');
  }, []);

  const clearFilters = useCallback(() => {
    setFilterStatus('all');
    setSearchTerm('');
  }, []);

  const filteredCenters = centers.filter(center => {
    const matchesSearch = center.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || center.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const analyticsData = {
    monthlyGrowth: [
      { month: 'Jan', centers: 15, revenue: 145000 },
      { month: 'Feb', centers: 18, revenue: 168000 },
      { month: 'Mar', centers: 22, revenue: 195000 },
      { month: 'Apr', centers: 28, revenue: 220000 },
      { month: 'May', centers: 35, revenue: 265000 },
      { month: 'Jun', centers: 42, revenue: 295000 }
    ],
    centerTypes: [
      { type: 'Hospitals', count: 120 },
      { type: 'Clinics', count: 85 },
      { type: 'Pharmacies', count: 30 },
      { type: 'Labs', count: 15 }
    ]
  };

  const BarChart = ({ data, title, dataKey }) => {
    const maxValue = Math.max(...data.map(d => d[dataKey]));
    return (
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <div className="space-y-3">
          {data.map((item, index) => (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">{item.month || item.type}</span>
                <span className="text-sm font-bold">{item[dataKey]}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(item[dataKey] / maxValue) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const LoginForm = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-purple-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Shield className="h-8 w-8 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Super Admin Login</h2>
          <p className="text-gray-600 mt-2">Access system management panel</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
          >
            Login
          </button>
        </div>

        <div className="text-center mt-6">
          <button 
            onClick={() => onNavigate && onNavigate('landing')}
            className="text-purple-600 hover:text-purple-700 text-sm"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );

  if (!isLoggedIn) return <LoginForm />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-4 md:px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Heart className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Medexxa Super Admin</h1>
                <p className="text-sm text-gray-600">System Management Panel</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onNavigate && onNavigate('landing')}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm"
              >
                Home
              </button>
              <button
                onClick={() => setIsLoggedIn(false)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-white shadow-sm">
          <nav className="p-4 space-y-2">
            {[
              { key: 'overview', icon: BarChart3, label: 'Analytics' },
              { key: 'centers', icon: CheckCircle, label: 'Centers' },
              { key: 'users', icon: Users, label: 'Users' },
              { key: 'logs', icon: Eye, label: 'Logs' },
              { key: 'settings', icon: Settings, label: 'Settings' }
            ].map(({ key, icon: Icon, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === key ? 'bg-purple-50 text-purple-700' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6">
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Platform Analytics</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Centers</p>
                      <p className="text-2xl font-bold">{centers.length}</p>
                      <div className="flex items-center mt-1">
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-sm text-green-500">+12%</span>
                      </div>
                    </div>
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Active Patients</p>
                      <p className="text-2xl font-bold">12,456</p>
                      <div className="flex items-center mt-1">
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-sm text-green-500">+8.5%</span>
                      </div>
                    </div>
                    <Heart className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Pending Approvals</p>
                      <p className="text-2xl font-bold">{centers.filter(c => c.status === 'Pending').length}</p>
                      <div className="flex items-center mt-1">
                        <AlertCircle className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="text-sm text-yellow-500">Action needed</span>
                      </div>
                    </div>
                    <CheckCircle className="h-8 w-8 text-yellow-600" />
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">System Health</p>
                      <p className="text-2xl font-bold text-green-600">99.9%</p>
                      <div className="flex items-center mt-1">
                        <Activity className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-sm text-green-500">Excellent</span>
                      </div>
                    </div>
                    <Shield className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <BarChart data={analyticsData.monthlyGrowth} title="Center Growth" dataKey="centers" />
                <BarChart data={analyticsData.centerTypes} title="Center Types" dataKey="count" />
              </div>
            </div>
          )}

          {activeTab === 'centers' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Center Registrations</h2>
                <div className="flex space-x-3">
                  <div className="relative">
                    <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="pl-10 pr-4 py-2 border rounded-lg"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <select 
                    className="border rounded-lg px-3 py-2"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-yellow-600" />
                    <div>
                      <p className="text-sm text-yellow-600">Pending</p>
                      <p className="text-lg font-bold text-yellow-700">{centers.filter(c => c.status === 'Pending').length}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm text-green-600">Approved</p>
                      <p className="text-lg font-bold text-green-700">{centers.filter(c => c.status === 'Approved').length}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <X className="h-5 w-5 text-red-600" />
                    <div>
                      <p className="text-sm text-red-600">Rejected</p>
                      <p className="text-lg font-bold text-red-700">{centers.filter(c => c.status === 'Rejected').length}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-blue-600">Total</p>
                      <p className="text-lg font-bold text-blue-700">{centers.length}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium">Center Name</th>
                      <th className="text-left py-3 px-4 font-medium">Location</th>
                      <th className="text-left py-3 px-4 font-medium">Type</th>
                      <th className="text-left py-3 px-4 font-medium">Date</th>
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                      <th className="text-left py-3 px-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredCenters.map((center) => (
                      <tr key={center.id} className="hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{center.name}</td>
                        <td className="py-3 px-4">{center.location}</td>
                        <td className="py-3 px-4">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                            {center.type}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">{center.submissionDate}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            center.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                            center.status === 'Approved' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {center.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {center.status === 'Pending' ? (
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => handleApproveCenter(center.id)}
                                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs"
                              >
                                Approve
                              </button>
                              <button 
                                onClick={() => handleRejectCenter(center.id)}
                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
                              >
                                Reject
                              </button>
                            </div>
                          ) : (
                            <span className="text-xs text-gray-500">No actions</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Manage Users</h2>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="space-y-3">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-gray-600">{user.role} - {user.center}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.status === 'Active' ? 'bg-green-100 text-green-800' :
                          user.status === 'Inactive' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {user.status}
                        </span>
                        {user.status === 'Banned' ? (
                          <button 
                            onClick={() => handleUnbanUser(user.id)}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs"
                          >
                            Unban
                          </button>
                        ) : (
                          <button 
                            onClick={() => handleBanUser(user.id)}
                            className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50"
                          >
                            <Ban className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'logs' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">System Logs</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm">New center registration</span>
                      </div>
                      <span className="text-xs text-gray-500">2 min ago</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm">User login: Dr. Smith</span>
                      </div>
                      <span className="text-xs text-gray-500">5 min ago</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-sm">Center approved: Metro Clinic</span>
                      </div>
                      <span className="text-xs text-gray-500">15 min ago</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h3 className="text-lg font-semibold mb-4">System Health</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">CPU Usage</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div className="w-3/5 h-2 bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-semibold">60%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Memory Usage</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div className="w-3/4 h-2 bg-yellow-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-semibold">75%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Global Settings</h2>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Platform Configuration</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Maintenance Mode</label>
                        <select 
                          className="w-full border rounded-lg px-3 py-2"
                          value={globalSettings.maintenanceMode}
                          onChange={(e) => setGlobalSettings({...globalSettings, maintenanceMode: e.target.value})}
                        >
                          <option value="Disabled">Disabled</option>
                          <option value="Enabled">Enabled</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Auto Approval</label>
                        <select 
                          className="w-full border rounded-lg px-3 py-2"
                          value={globalSettings.autoApproval}
                          onChange={(e) => setGlobalSettings({...globalSettings, autoApproval: e.target.value})}
                        >
                          <option value="Manual Approval Required">Manual</option>
                          <option value="Auto Approval Enabled">Auto</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Session Timeout (min)</label>
                        <input
                          type="number"
                          className="w-full border rounded-lg px-3 py-2"
                          value={globalSettings.sessionTimeout}
                          onChange={(e) => setGlobalSettings({...globalSettings, sessionTimeout: parseInt(e.target.value) || 30})}
                          min="5"
                          max="480"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Max Login Attempts</label>
                        <input
                          type="number"
                          className="w-full border rounded-lg px-3 py-2"
                          value={globalSettings.maxLoginAttempts}
                          onChange={(e) => setGlobalSettings({...globalSettings, maxLoginAttempts: parseInt(e.target.value) || 5})}
                          min="3"
                          max="10"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-3">Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-gray-600">Send email alerts for system events</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={globalSettings.emailNotifications}
                            onChange={(e) => setGlobalSettings({...globalSettings, emailNotifications: e.target.checked})}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">SMS Alerts</p>
                          <p className="text-sm text-gray-600">Send SMS for critical issues</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={globalSettings.smsAlerts}
                            onChange={(e) => setGlobalSettings({...globalSettings, smsAlerts: e.target.checked})}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <button 
                      onClick={handleSaveSettings}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2"
                    >
                      <Settings className="h-4 w-4" />
                      <span>Save Settings</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Filter Modal */}
          {showFilterModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Advanced Filters</h3>
                  <button
                    onClick={() => setShowFilterModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Center Type</label>
                    <select className="w-full border rounded-lg px-3 py-2">
                      <option>All Types</option>
                      <option>Hospital</option>
                      <option>Clinic</option>
                      <option>Diagnostic Center</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <select className="w-full border rounded-lg px-3 py-2">
                      <option>All Locations</option>
                      <option>Colombo</option>
                      <option>Kandy</option>
                      <option>Galle</option>
                    </select>
                  </div>
                </div>
                <div className="mt-6 flex space-x-3">
                  <button
                    onClick={() => setShowFilterModal(false)}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg"
                  >
                    Apply
                  </button>
                  <button
                    onClick={() => setShowFilterModal(false)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg"
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
};

export default SuperAdminDashboard;