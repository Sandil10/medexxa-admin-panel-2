import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Users, 
  Shield, 
  Clock, 
  Star, 
  MapPin, 
  Building, 
  Search, 
  Calendar, 
  FileText, 
  Activity, 
  Bell, 
  Video, 
  Lock, 
  Download, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Phone, 
  Mail, 
  Globe, 
  Menu, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Stethoscope,
  Tablet,
  CheckCircle,
  Award
} from 'lucide-react';

const MedexxaLanding = ({ onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  // Navigation functions using the prop-based system
  const handlePatientRegister = () => {
    onNavigate('patient-register');
  };

  const handleHealthCenterRegister = () => {
    onNavigate('health-center-register');
  };

  const handleLogin = () => {
    onNavigate('login');
  };

  // PWA Installation Logic
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallPWA = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        setShowInstallPrompt(false);
      }
    } else {
      alert('To install this app:\n\n1. Click the menu button (⋮) in your browser\n2. Select "Install app" or "Add to Home screen"\n3. Follow the prompts to install');
    }
  };

  const handleAddToHomeScreen = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Medexxa - Digital Health Platform',
        text: 'Install Medexxa PWA for better healthcare management',
        url: window.location.href,
      });
    } else {
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      const isAndroid = /Android/.test(navigator.userAgent);
      
      if (isIOS) {
        alert('To add to home screen on iOS:\n\n1. Tap the Share button (⏏)\n2. Scroll down and tap "Add to Home Screen"\n3. Tap "Add" to confirm');
      } else if (isAndroid) {
        alert('To add to home screen on Android:\n\n1. Tap the menu button (⋮)\n2. Tap "Add to Home screen"\n3. Tap "Add" to confirm');
      } else {
        alert('To install this app:\n\n1. Click the menu button in your browser\n2. Look for "Install" or "Add to Home screen"\n3. Follow the prompts to install');
      }
    }
  };

  const topRatedCenters = [
    {
      id: 1,
      name: "Asiri Hospital Colombo",
      location: "Colombo 05",
      type: "Private Hospital",
      rating: 4.8,
      reviews: 324,
      image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      name: "Lanka Hospital",
      location: "Colombo 10", 
      type: "Private Hospital",
      rating: 4.6,
      reviews: 198,
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      name: "Nawaloka Hospitals",
      location: "Colombo 02",
      type: "Private Hospital", 
      rating: 4.7,
      reviews: 267,
      image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=300&h=200&fit=crop"
    },
    {
      id: 4,
      name: "Ayurveda Wellness Center",
      location: "Kandy",
      type: "Ayurveda Center",
      rating: 4.5,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=300&h=200&fit=crop"
    }
  ];

  const features = [
    {
      icon: <FileText className="h-12 w-12 text-blue-600" />,
      title: "Digital Prescriptions",
      description: "Secure, paperless prescriptions accessible anywhere, anytime"
    },
    {
      icon: <Activity className="h-12 w-12 text-green-600" />,
      title: "Role-based Dashboards",
      description: "Customized interfaces for patients, doctors, and health centers"
    },
    {
      icon: <Calendar className="h-12 w-12 text-blue-600" />,
      title: "Online Appointments",
      description: "Book and manage appointments with your preferred healthcare providers"
    },
    {
      icon: <MapPin className="h-12 w-12 text-green-600" />,
      title: "Health Center Locator",
      description: "Find nearby hospitals, clinics, and pharmacies with real-time availability"
    },
    {
      icon: <Bell className="h-12 w-12 text-yellow-600" />,
      title: "Real-time Notifications",
      description: "Stay updated with appointment reminders and health alerts"
    },
    {
      icon: <Video className="h-12 w-12 text-green-600" />,
      title: "Telemedicine",
      description: "Consult with doctors remotely through secure video calls"
    },
    {
      icon: <Lock className="h-12 w-12 text-blue-600" />,
      title: "Privacy & Security",
      description: "HIPAA-compliant platform ensuring your health data remains secure"
    },
    {
      icon: <Clock className="h-12 w-12 text-gray-600" />,
      title: "24/7 Access",
      description: "Access your health records and services round the clock"
    }
  ];

  const howItWorksSteps = [
    {
      step: 1,
      title: "Register",
      description: "Create your free account as a patient or register your health center with verified credentials.",
      icon: <Users className="h-12 w-12 text-blue-600" />
    },
    {
      step: 2,
      title: "Search or Book Appointments",
      description: "Find nearby healthcare providers, view their profiles, and book appointments that fit your schedule.",
      icon: <Search className="h-12 w-12 text-blue-600" />
    },
    {
      step: 3,
      title: "Get Care and Prescriptions",
      description: "Receive quality healthcare services and get digital prescriptions sent directly to your device.",
      icon: <Heart className="h-12 w-12 text-blue-600" />
    },
    {
      step: 4,
      title: "Follow-Up Digitally",
      description: "Stay connected with your healthcare providers through secure messaging and virtual consultations.",
      icon: <Activity className="h-12 w-12 text-blue-600" />
    }
  ];

  const whyChooseFeatures = [
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: "Secure Medical History Access",
      description: "Your health data is encrypted and protected with enterprise-grade security."
    },
    {
      icon: <FileText className="h-8 w-8 text-blue-600" />,
      title: "Digital Prescriptions",
      description: "Get paperless prescriptions that you can access anytime, anywhere."
    },
    {
      icon: <Star className="h-8 w-8 text-blue-600" />,
      title: "Center Ratings & Reviews",
      description: "Make informed decisions with verified ratings and patient reviews."
    },
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Role-based Clinical Access",
      description: "Customized experience for patients, doctors, and healthcare administrators."
    },
    {
      icon: <Globe className="h-8 w-8 text-blue-600" />,
      title: "Supports Sinhala, Tamil & English",
      description: "Use the platform in your preferred language for better accessibility."
    }
  ];

  const nearbyHealthCenters = [
    {
      id: 1,
      name: "National Hospital of Sri Lanka",
      distance: "2.1 km",
      status: "Open Now",
      rating: 4.5,
      phone: "+94 11 269 1111",
      type: "hospital"
    },
    {
      id: 2,
      name: "Asiri Medical Hospital",
      distance: "1.8 km", 
      status: "Open Now",
      rating: 4.8,
      phone: "+94 11 546 6666",
      type: "hospital"
    },
    {
      id: 3,
      name: "Colombo Medical Center",
      distance: "1.5 km",
      status: "Closed",
      rating: 4.3,
      phone: "+94 11 258 8888",
      type: "clinic"
    },
    {
      id: 4,
      name: "Osu Sala Pharmacy",
      distance: "0.9 km",
      status: "Open Now",
      rating: 4.2,
      phone: "+94 11 234 5678",
      type: "pharmacy"
    }
  ];

  const testimonials = [
    {
      text: "Seamless integration with digital prescriptions. Our customers love how easy it is to collect their medications using the app.",
      author: "Lanka Pharmacy Chain",
      position: "Pharmacy Network",
      date: "1/2/2024",
      rating: 5
    },
    {
      text: "Medexxa has revolutionized how I manage patient records and prescriptions. The digital platform is intuitive and saves valuable time during consultations.",
      author: "Dr. Amara Perera",
      position: "Cardiologist - Asiri Hospital",
      date: "1/15/2024",
      rating: 5
    },
    {
      text: "Amazing app! I can easily book appointments, access my prescriptions, and find nearby pharmacies. The notification system keeps me updated about my health checkups.",
      author: "Sachini Fernando",
      position: "Patient",
      date: "1/10/2024",
      rating: 5
    }
  ];

  const stats = [
    { icon: <Shield className="h-6 w-6" />, text: "Secure & HIPAA Compliant" },
    { icon: <Users className="h-6 w-6" />, text: "Trusted by 1000+ Patients" },
    { icon: <Building className="h-6 w-6" />, text: "200+ Health Centers" }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">Medexxa</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
              <a href="#centers" className="text-gray-600 hover:text-blue-600 transition-colors">Find Centers</a>
              <a href="#reviews" className="text-gray-600 hover:text-blue-600 transition-colors">Reviews</a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600"></span>
                <select className="bg-gray-100 text-gray-900 border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>English</option>
                  <option>Sinhala</option>
                  <option>Tamil</option>
                </select>
              </div>
              <button 
                onClick={handleLogin}
                className="text-blue-600 hover:text-blue-700 px-4 py-2 rounded-lg transition-colors text-sm font-medium border border-blue-600 hover:bg-blue-50"
              >
                Login
              </button>
              <button 
                onClick={handlePatientRegister}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
              >
                Register
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-600 hover:text-blue-600 p-2"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <div className="flex flex-col space-y-4">
                <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
                <a href="#centers" className="text-gray-600 hover:text-blue-600 transition-colors">Find Centers</a>
                <a href="#reviews" className="text-gray-600 hover:text-blue-600 transition-colors">Reviews</a>
                <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
                <div className="flex flex-col space-y-2">
                  <button 
                    onClick={handleLogin}
                    className="text-blue-600 hover:text-blue-700 px-4 py-2 rounded-lg transition-colors text-sm font-medium border border-blue-600 hover:bg-blue-50 w-full"
                  >
                    Login
                  </button>
                  <button 
                    onClick={handlePatientRegister}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium w-full"
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Welcome to Medexxa
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Your Digital Health Gateway
            </p>
            <p className="text-lg text-blue-200 mb-12 max-w-4xl mx-auto">
              Connect with healthcare providers, manage prescriptions, and access medical services with Sri Lanka's most trusted digital health platform offering secure care.
            </p>

            {/* Search Section */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-12 max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search for a health center by name or location..."
                    className="w-full px-6 py-4 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:w-48">
                  <select className="w-full px-6 py-4 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>All Center Types</option>
                    <option>Hospital</option>
                    <option>Clinic</option>
                    <option>Laboratory</option>
                    <option>Pharmacy</option>
                  </select>
                </div>
                <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
                  Find Centers
                </button>
              </div>
            </div>

            {/* Registration Options */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button 
                onClick={handlePatientRegister}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <Users className="h-5 w-5" />
                <span>Register as Patient</span>
              </button>
              <button 
                onClick={handleHealthCenterRegister}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <Building className="h-5 w-5" />
                <span>Register Health Center</span>
              </button>
            </div>

            <div className="mb-8">
              <button 
                onClick={handleLogin}
                className="text-blue-200 hover:text-white transition-colors"
              >
                Already have an account? Login
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center space-x-2">
                  {stat.icon}
                  <span className="text-blue-200">{stat.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top-Rated Health Centers Section */}
      <section id="centers" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold text-gray-900 mb-4">
              Top-Rated Health Centers
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover trusted healthcare providers in your area with verified ratings and reviews from our community of patients. All facilities are verified and licensed by the Sri Lankan Ministry of Health.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {topRatedCenters.map((center) => (
              <div key={center.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img
                  src={center.image}
                  alt={center.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-1">
                      <Star className="h-5 w-5 text-yellow-500 fill-current" />
                      <span className="text-lg font-semibold text-gray-900">{center.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">{center.reviews} reviews</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{center.name}</h3>
                  <div className="flex items-center space-x-2 text-gray-600 mb-2">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{center.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600 mb-4">
                    <Building className="h-4 w-4" />
                    <span className="text-sm">{center.type}</span>
                  </div>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Getting started with Medexxa is simple and straightforward. Follow these four easy steps to transform your healthcare experience and connect with trusted medical professionals across Sri Lanka.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorksSteps.map((step, index) => (
              <div key={step.step} className="text-center">
                <div className="relative mb-8">
                  <div className="bg-blue-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">{step.step}</span>
                  </div>
                  {index < howItWorksSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-blue-200 transform translate-x-1/2"></div>
                  )}
                </div>
                <div className="mb-4">{step.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold text-gray-900 mb-6 tracking-tight">
              Comprehensive Healthcare Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Everything you need to manage your health and connect with healthcare providers in one secure, easy-to-use platform designed for modern healthcare delivery in Sri Lanka.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 cursor-pointer border border-gray-100 hover:border-transparent overflow-hidden"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-2xl blur-xl -z-10"></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left rounded-t-2xl"></div>
                
                <div className="relative mb-8 transform group-hover:scale-125 group-hover:rotate-3 transition-all duration-500">
                  <div className="relative">
                    {feature.icon}
                    <div className="absolute inset-0 bg-blue-400 opacity-0 group-hover:opacity-20 rounded-full blur-xl transition-opacity duration-500"></div>
                  </div>
                </div>
                
                <div className="relative text-left space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 leading-relaxed text-base">
                    {feature.description}
                  </p>
                </div>

                <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                <div className="absolute bottom-4 left-4 w-1 h-1 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Medexxa Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-semibold text-gray-900 mb-6">
                Why Choose Medexxa?
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Experience healthcare like never before with our comprehensive digital platform designed specifically for Sri Lankan healthcare needs. Our platform connects patients, healthcare providers, and medical institutions seamlessly.
              </p>
              
              <div className="space-y-6">
                {whyChooseFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      {feature.icon}
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-green-600 rounded-2xl p-8 text-white">
              <div className="text-left">
                <Shield className="h-16 w-16 mb-6 text-white" />
                <h3 className="text-2xl font-semibold mb-4">Trusted Platform</h3>
                <p className="text-blue-100 mb-8 leading-relaxed">Join thousands of satisfied users across Sri Lanka who trust Medexxa for their healthcare needs.</p>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-left">
                    <div className="text-3xl font-semibold">1000+</div>
                    <div className="text-sm text-blue-100">Active Patients</div>
                  </div>
                  <div className="text-left">
                    <div className="text-3xl font-semibold">200+</div>
                    <div className="text-sm text-blue-100">Health Centers</div>
                  </div>
                  <div className="text-left">
                    <div className="text-3xl font-semibold">50+</div>
                    <div className="text-sm text-blue-100">Doctors</div>
                  </div>
                  <div className="text-left">
                    <div className="text-3xl font-semibold">4.8★</div>
                    <div className="text-sm text-blue-100">App Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Find Nearby Health Centers Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold text-gray-900 mb-4">
              Find Nearby Health Centers
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Locate hospitals, clinics, and pharmacies near you with real-time availability and ratings across Sri Lanka
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="text-left mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Sri Lanka Health Centers Map</h3>
                <p className="text-gray-600 leading-relaxed">
                  Interactive map showing verified health centers across all provinces of Sri Lanka. Click on markers to view facility details and get directions.
                </p>
              </div>
              
              <div className="relative rounded-lg overflow-hidden h-96 border border-gray-200">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2022748.7193354527!2d80.78590087890625!3d8.031779006593679!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2593cf65a1e9d%3A0xe13da4b400e2d38c!2sSri%20Lanka!5e0!3m2!1sen!2slk!4v1754545152084!5m2!1sen!2slk"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Sri Lanka Health Centers Map"
                />
              </div>
              
              <div className="mt-4 bg-gray-50 rounded-lg p-4">
                <div className="text-gray-700 font-medium mb-3">Health Centers Legend</div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Major Hospitals</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">General Hospitals</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Teaching Hospitals</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">District Hospitals</span>
                  </div>
                </div>
              </div>
              
              <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>Enable My Location</span>
              </button>
            </div>

            <div>
              <div className="text-left mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Filter by Type</h3>
                <p className="text-gray-600 leading-relaxed">
                  Browse healthcare facilities by category to find the right care for your needs.
                </p>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                  All Centers
                </button>
                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200">
                  Hospitals
                </button>
                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200">
                  Clinics
                </button>
                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200">
                  Pharmacies
                </button>
              </div>

              <div className="space-y-4">
                {nearbyHealthCenters.map((center) => (
                  <div key={center.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {center.type === 'hospital' && <Building className="h-5 w-5 text-red-500" />}
                          {center.type === 'clinic' && <Stethoscope className="h-5 w-5 text-blue-500" />}
                          {center.type === 'pharmacy' && <Tablet className="h-5 w-5 text-green-500" />}
                          <h4 className="font-medium text-gray-900">{center.name}</h4>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>📍 {center.distance}</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            center.status === 'Open Now' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {center.status}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 mb-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{center.rating}</span>
                        </div>
                        <p className="text-xs text-gray-500">{center.phone}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="reviews" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold text-gray-900 mb-6">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Trusted by patients, doctors, and healthcare centers across Sri Lanka. Read real testimonials from our satisfied users.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="text-center mb-8">
                <div className="flex justify-center space-x-1 mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-yellow-500 fill-current" />
                  ))}
                </div>
                <blockquote className="text-xl text-gray-700 italic mb-6 leading-relaxed">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>
                <div className="flex items-center justify-center space-x-3">
                  <div className="bg-blue-600 rounded-full p-3">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-gray-900">
                      {testimonials[currentTestimonial].author}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonials[currentTestimonial].position}
                    </div>
                    <div className="text-xs text-gray-500">
                      {testimonials[currentTestimonial].date}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow"
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>

            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-center">
            <div>
              <div className="text-4xl font-semibold text-blue-600 mb-2">4.8</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div>
              <div className="text-4xl font-semibold text-green-600 mb-2">1000+</div>
              <div className="text-gray-600">Happy Patients</div>
            </div>
            <div>
              <div className="text-4xl font-semibold text-blue-600 mb-2">200+</div>
              <div className="text-gray-600">Health Centers</div>
            </div>
            <div>
              <div className="text-4xl font-semibold text-green-600 mb-2">50+</div>
              <div className="text-gray-600">Pharmacies</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile App Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-semibold text-gray-900 mb-6">
                Get the Mobile App
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Download the Medexxa mobile app for on-the-go access to your health records, appointments, and healthcare providers. Available for both Android and iOS devices with full offline capabilities.
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Download className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-gray-900 mb-2">Native Mobile Experience</h3>
                    <p className="text-gray-600 leading-relaxed">Optimized for mobile devices with intuitive touch controls and responsive design for seamless healthcare management.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Download className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-gray-900 mb-2">Offline Access</h3>
                    <p className="text-gray-600 leading-relaxed">Access key information without internet connection including medical records, prescriptions, and emergency contacts.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Bell className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-gray-900 mb-2">Push Notifications</h3>
                    <p className="text-gray-600 leading-relaxed">Get instant updates and reminders for appointments, medication schedules, and important health alerts.</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center space-x-2 bg-gray-100 px-6 py-3 rounded-lg">
                  <div className="bg-green-500 rounded p-1">
                    <Download className="h-4 w-4 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-gray-600">Coming Soon</div>
                    <div className="text-sm font-medium">Google Play</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 bg-gray-100 px-6 py-3 rounded-lg">
                  <div className="bg-black rounded p-1">
                    <Download className="h-4 w-4 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-gray-600">Coming Soon</div>
                    <div className="text-sm font-medium">App Store</div>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-500 mt-4">
                * Mobile apps are currently in development and will be available soon for download
              </p>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-b from-blue-600 to-blue-800 rounded-3xl p-8 shadow-2xl transform rotate-3">
                <div className="bg-white rounded-2xl p-6 transform -rotate-3">
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-blue-600 font-bold">9:41</div>
                    <div className="text-blue-600 font-bold">Medexxa</div>
                    <div className="text-blue-600 font-bold">100%</div>
                  </div>
                  <div className="text-center mb-6">
                    <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                      <Heart className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Welcome Back!</h3>
                    <p className="text-gray-600">Your health dashboard</p>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-blue-100 rounded-lg p-3">
                      <div className="h-2 bg-blue-300 rounded w-3/4"></div>
                    </div>
                    <div className="bg-green-100 rounded-lg p-3">
                      <div className="h-2 bg-green-300 rounded w-1/2"></div>
                    </div>
                    <div className="bg-yellow-100 rounded-lg p-3">
                      <div className="h-2 bg-yellow-300 rounded w-2/3"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PWA Install Section */}
      <section className="py-12 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-3xl mx-auto">
              <Download className="h-12 w-12 text-white mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-4">Install Medexxa PWA</h2>
              <p className="text-lg text-blue-100 mb-6 leading-relaxed">
                Get the full app experience on your device. Install our Progressive Web App for faster access and offline capabilities.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button 
                  onClick={handleInstallPWA}
                  className="bg-white hover:bg-gray-100 text-blue-600 px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <Download className="h-4 w-4" />
                  <span>Install PWA</span>
                </button>
                <button 
                  onClick={handleAddToHomeScreen}
                  className="bg-blue-700 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <Download className="h-4 w-4" />
                  <span>Add to Home Screen</span>
                </button>
              </div>
              {!showInstallPrompt && (
                <p className="text-sm text-blue-200 mt-4">
                  PWA installation is available. Use the buttons above to install or add to home screen.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Ready to Transform Your Healthcare Experience?
          </h2>
          <p className="text-lg text-blue-100 mb-6 max-w-3xl mx-auto leading-relaxed">
            Join thousands of patients and healthcare providers already using Medexxa for better healthcare management
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button 
              onClick={handlePatientRegister}
              className="bg-white hover:bg-gray-100 text-blue-600 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Get Started Today
            </button>
            <button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <span className="text-2xl font-bold">Medexxa</span>
              </div>
              <p className="text-gray-400 mb-6">
                Your Digital Health Partner. Connecting patients, doctors, and healthcare providers across Sri Lanka with secure, innovative digital solutions.
              </p>
              <div className="flex space-x-4">
                <Facebook className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer" />
                <Twitter className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer" />
                <Instagram className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer" />
                <Linkedin className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer" />
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">For Patients</a></li>
                <li><a href="#" className="hover:text-white transition-colors">For Doctors</a></li>
                <li><a href="#" className="hover:text-white transition-colors">For Health Centers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pharmacies</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5" />
                  <span>Colombo 07, Sri Lanka</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5" />
                  <span>+94 11 234 5678</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5" />
                  <span>support@medexxa.lk</span>
                </div>
              </div>
              
              <div className="mt-6 bg-blue-800 rounded-lg p-4">
                <h5 className="font-semibold mb-2">Emergency Hotline</h5>
                <div className="text-2xl font-bold text-blue-300">1990</div>
                <div className="text-sm text-gray-300">24/7 Medical Emergency</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400">
                &copy; 2025 Medexxa. All rights reserved. Licensed under Sri Lankan Health Ministry.
              </p>
              <div className="flex items-center space-x-6 mt-4 md:mt-0">
                <span className="text-gray-400">Made with ❤️ in Sri Lanka</span>
                <span className="text-green-400">HIPAA Compliant</span>
                <span className="text-blue-400">SSL Secured</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MedexxaLanding;