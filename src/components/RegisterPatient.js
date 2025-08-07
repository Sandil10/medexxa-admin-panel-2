import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Check, 
  ChevronDown, 
  Calendar,
  Upload,
  Camera,
  Globe
} from 'lucide-react';

const RegisterPatient = ({ onNavigate }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Personal Details
    fullName: '',
    nationalId: '',
    gender: '',
    dateOfBirth: '',
    preferredLanguage: 'English',
    
    // Step 2: Contact Info
    mobileNumber: '+94714010920',
    email: 'chathurya@techgates.lk',
    address: 'NO 75 , Welyaya Rd , Navinna',
    district: 'Jaffna',
    province: 'Uva',
    
    // Step 3: Photo Upload
    profilePhoto: null,
    
    // Step 4: Verification
    otp: '',
    agreeToTerms: false
  });

  const steps = [
    { number: 1, title: 'Personal Details', completed: currentStep > 1 },
    { number: 2, title: 'Contact Info', completed: currentStep > 2 },
    { number: 3, title: 'Photo Upload', completed: currentStep > 3 },
    { number: 4, title: 'Verification', completed: currentStep > 4 }
  ];

  const districts = [
    'Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 'Nuwara Eliya', 
    'Galle', 'Matara', 'Hambantota', 'Jaffna', 'Kilinochchi', 'Mannar',
    'Vavuniya', 'Mullaitivu', 'Batticaloa', 'Ampara', 'Trincomalee',
    'Kurunegala', 'Puttalam', 'Anuradhapura', 'Polonnaruwa', 'Badulla',
    'Moneragala', 'Ratnapura', 'Kegalle'
  ];

  const provinces = [
    'Western', 'Central', 'Southern', 'Northern', 'Eastern', 
    'North Western', 'North Central', 'Uva', 'Sabaragamuwa'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleInputChange('profilePhoto', file);
    }
  };

  const handleComplete = () => {
    // Handle registration completion
    console.log('Registration completed:', formData);
    alert('Registration completed successfully!');
    // Navigate to dashboard after registration
    onNavigate('dashboard');
  };

  const handleBackToHome = () => {
    // Navigate back to home using the prop function
    onNavigate('landing');
  };

  const handleSignIn = () => {
    // Navigate to login using the prop function
    onNavigate('login');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5 text-left">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5 text-left">
                National ID / Birth Certificate No <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.nationalId}
                onChange={(e) => handleInputChange('nationalId', e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                placeholder="Enter your NIC or Birth Certificate number"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5 text-left">
                  Gender <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white text-sm"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5 text-left">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5 text-left">
                Preferred Language
              </label>
              <div className="relative">
                <select
                  value={formData.preferredLanguage}
                  onChange={(e) => handleInputChange('preferredLanguage', e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white text-sm"
                >
                  <option value="English">English</option>
                  <option value="Sinhala">සිංහල</option>
                  <option value="Tamil">தமிழ்</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5 text-left">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={formData.mobileNumber}
                onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-blue-50 text-sm"
                placeholder="+94714010920"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5 text-left">
                Email Address (Optional)
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-blue-50 text-sm"
                placeholder="chathurya@techgates.lk"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5 text-left">
                Address (Optional)
              </label>
              <textarea
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                rows={3}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-blue-50 resize-none text-sm"
                placeholder="NO 75 , Welyaya Rd , Navinna"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5 text-left">
                  District <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.district}
                    onChange={(e) => handleInputChange('district', e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-blue-50 text-sm"
                  >
                    <option value="">Select District</option>
                    {districts.map(district => (
                      <option key={district} value={district}>{district}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5 text-left">
                  Province <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.province}
                    onChange={(e) => handleInputChange('province', e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-blue-50 text-sm"
                  >
                    <option value="">Select Province</option>
                    {provinces.map(province => (
                      <option key={province} value={province}>{province}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2 text-left">
                Upload Face Photo <span className="text-red-500">*</span>
              </h3>
              <p className="text-sm text-gray-600 mb-6 text-left">
                Please upload a clear photo of your face. No avatars.
              </p>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label
                  htmlFor="photo-upload"
                  className="cursor-pointer flex flex-col items-center space-y-3"
                >
                  <div className="bg-gray-100 rounded-full p-3">
                    <Camera className="h-6 w-6 text-gray-600" />
                  </div>
                  <div className="text-center">
                    <span className="text-blue-600 font-medium text-sm">Browse Files</span>
                    <p className="text-gray-500 text-xs mt-1">
                      or drag and drop your photo here
                    </p>
                  </div>
                </label>
              </div>

              {formData.profilePhoto && (
                <div className="mt-3 text-left">
                  <p className="text-green-600 text-sm">
                    ✓ Photo uploaded: {formData.profilePhoto.name}
                  </p>
                </div>
              )}

              <div className="bg-blue-50 rounded-lg p-4 mt-4">
                <h4 className="font-medium text-gray-900 mb-2 text-sm">Photo Guidelines:</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Use a clear, recent photo of your face</li>
                  <li>• Ensure good lighting and no shadows</li>
                  <li>• Face should be clearly visible (no sunglasses)</li>
                  <li>• Accepted formats: JPG, PNG, GIF (max 5MB)</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-6 text-left">
                OTP Verification
              </h3>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md font-medium transition-colors mb-6 text-sm">
                Send OTP
              </button>

              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={formData.agreeToTerms}
                    onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 mt-0.5"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-700 leading-relaxed">
                    I agree to Medexxa's terms, and I consent to the use of my health and personal data.{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-700 underline">Terms of Use</a>
                    {' '}and{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-700 underline">Privacy Policy</a>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
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
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Patient Registration
          </h1>
          <p className="text-sm text-gray-600">
            Create your Medexxa patient account
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                    step.completed
                      ? 'bg-blue-600 text-white'
                      : currentStep === step.number
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step.completed ? <Check className="h-4 w-4" /> : step.number}
                </div>
                <div className="text-center mt-1.5">
                  <div className="text-xs font-medium text-gray-900">
                    {step.title}
                  </div>
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-3 ${
                  step.completed ? 'bg-blue-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`px-5 py-2.5 rounded-md font-medium transition-colors text-sm ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Previous Step
          </button>

          {currentStep < 4 ? (
            <button
              onClick={handleNext}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-md font-medium transition-colors text-sm"
            >
              Next Step
            </button>
          ) : (
            <button
              onClick={handleComplete}
              disabled={!formData.agreeToTerms}
              className={`px-5 py-2.5 rounded-md font-medium transition-colors text-sm ${
                formData.agreeToTerms
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Complete Registration
            </button>
          )}
        </div>

        {/* Sign In Link */}
        <div className="text-center mt-6">
          <span className="text-sm text-gray-600">Already have an account? </span>
          <button
            onClick={handleSignIn}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Sign in here
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPatient;