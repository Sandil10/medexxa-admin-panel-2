import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Mail,
  Lock,
  Eye,
  EyeOff,
  Heart,
  Globe
} from 'lucide-react';

const LoginPatient = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSignIn = () => {
    // Handle login logic here
    console.log('Login attempt:', formData);
    
    // For demo purposes, just show success and navigate to dashboard
    if (formData.email && formData.password) {
      alert('Login successful!');
      onNavigate('dashboard');
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleBackToHome = () => {
    onNavigate('landing');
  };

  const handleCreateAccount = () => {
    onNavigate('patient-register');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            <button
              onClick={handleBackToHome}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">Back to Home</span>
            </button>
            
            <div className="flex items-center space-x-3">
              <Globe className="h-4 w-4 text-gray-600" />
              <select className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>English</option>
                <option>සිංහල</option>
                <option>தமிழ்</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] py-12">
        <div className="max-w-md w-full mx-4">
          {/* Login Card */}
          <div className="bg-white rounded-lg shadow-md p-8">
            {/* Logo and Title */}
            <div className="text-center mb-8">
              <div className="bg-blue-600 p-3 rounded-lg inline-block mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                Welcome Back
              </h1>
              <p className="text-sm text-gray-600">
                Sign in to access your health dashboard
              </p>
            </div>

            {/* Login Form */}
            <div className="space-y-5">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5 text-left">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5 text-left">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Sign In Button */}
              <button
                type="button"
                onClick={handleSignIn}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-md font-medium transition-colors text-sm"
              >
                Sign In
              </button>
            </div>

            {/* Divider */}
            <div className="mt-6 mb-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or</span>
                </div>
              </div>
            </div>

            {/* Create Account Link */}
            <div className="text-center">
              <span className="text-sm text-gray-600">Don't have an account? </span>
              <button
                type="button"
                onClick={handleCreateAccount}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Create Account
              </button>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              By signing in, you agree to our{' '}
              <a href="#" className="text-blue-600 hover:text-blue-700">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-blue-600 hover:text-blue-700">Privacy Policy</a>
            </p>
          </div>

          {/* Emergency Contact */}
          <div className="mt-4 text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-xs text-red-800 font-medium mb-1">Medical Emergency?</p>
              <p className="text-sm text-red-700 font-bold">Call 1990</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPatient;