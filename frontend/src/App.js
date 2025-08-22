import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './Login';
import ChatInterface from './ChatInterface';

const App = () => {
  const [modelInfo, setModelInfo] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  useEffect(() => {
    fetchModelInfo();
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setShowChat(false);
  };

  const handleGetStarted = () => {
    if (user) {
      setShowChat(true);
    } else {
      // Show login modal or redirect to login
    }
  };

  // If user is logged in and wants to chat, show chat interface
  if (user && showChat) {
    return <ChatInterface user={user} onLogout={handleLogout} />;
  }

  // If no user is logged in, show login page
  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  const fetchModelInfo = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/model-info`);
      const data = await response.json();
      setModelInfo(data);
    } catch (error) {
      console.error('Error fetching model info:', error);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactForm),
      });
      
      if (response.ok) {
        alert('Thank you! We\'ll get back to you soon.');
        setContactForm({ name: '', email: '', company: '', message: '' });
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('Error sending message. Please try again.');
    }
  };

  const Header = () => (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orii-primary to-orii-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">O</span>
            </div>
            <span className="text-xl font-bold text-orii-dark">Orii-O1</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-orii-primary transition-colors">Features</a>
            <a href="#specifications" className="text-gray-600 hover:text-orii-primary transition-colors">Specifications</a>
            <a href="#pricing" className="text-gray-600 hover:text-orii-primary transition-colors">Pricing</a>
            <a href="#about" className="text-gray-600 hover:text-orii-primary transition-colors">About</a>
            <a href="#contact" className="text-gray-600 hover:text-orii-primary transition-colors">Contact</a>
            <button className="btn-primary">Get Started</button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <a href="#features" className="text-gray-600 hover:text-orii-primary transition-colors">Features</a>
              <a href="#specifications" className="text-gray-600 hover:text-orii-primary transition-colors">Specifications</a>
              <a href="#pricing" className="text-gray-600 hover:text-orii-primary transition-colors">Pricing</a>
              <a href="#about" className="text-gray-600 hover:text-orii-primary transition-colors">About</a>
              <a href="#contact" className="text-gray-600 hover:text-orii-primary transition-colors">Contact</a>
              <button className="btn-primary w-full">Get Started</button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );

  const HeroSection = () => (
    <section className="pt-24 pb-12 gradient-bg min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-orii-dark mb-6 leading-tight">
            Meet <span className="text-gradient">Orii-O1</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            The next generation of AI reasoning. Advanced large language model designed for 
            superior understanding, creativity, and problem-solving capabilities.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="btn-primary text-lg px-8 py-4">
              Try Orii-O1 Now
            </button>
            <button className="btn-secondary text-lg px-8 py-4">
              View Documentation
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
            <div className="card animate-slide-up">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-orii-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
              <p className="text-gray-600">Optimized for speed without compromising quality or accuracy.</p>
            </div>
            
            <div className="card animate-slide-up" style={{animationDelay: '0.1s'}}>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Advanced Reasoning</h3>
              <p className="text-gray-600">Complex problem-solving with deep contextual understanding.</p>
            </div>
            
            <div className="card animate-slide-up" style={{animationDelay: '0.2s'}}>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure & Reliable</h3>
              <p className="text-gray-600">Enterprise-grade security with consistent performance.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const FeaturesSection = () => (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-orii-dark mb-4">Powerful Capabilities</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Orii-O1 combines cutting-edge AI research with practical applications to deliver 
            unprecedented performance across diverse tasks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modelInfo?.capabilities?.map((capability, index) => (
            <div key={index} className="card group hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-orii-primary to-orii-accent rounded-lg flex items-center justify-center mb-4 group-hover:animate-pulse-slow">
                <span className="text-white font-bold">{index + 1}</span>
              </div>
              <h3 className="text-lg font-semibold text-orii-dark mb-2">{capability}</h3>
              <p className="text-gray-600">
                {capability.includes('Language') && 'Understand and generate human-like text with exceptional context awareness.'}
                {capability.includes('Code') && 'Write, review, and debug code across multiple programming languages.'}
                {capability.includes('Reasoning') && 'Tackle complex logical problems with step-by-step analytical thinking.'}
                {capability.includes('Multi-language') && 'Communicate effectively in dozens of languages worldwide.'}
                {capability.includes('Context') && 'Maintain coherent conversations with extended context memory.'}
                {capability.includes('Creative') && 'Generate original content from stories to marketing copy.'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const SpecificationsSection = () => (
    <section id="specifications" className="py-20 gradient-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-orii-dark mb-4">Technical Excellence</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Built on state-of-the-art architecture with industry-leading performance metrics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="card">
            <h3 className="text-2xl font-bold text-orii-dark mb-6">Model Specifications</h3>
            <div className="space-y-4">
              {modelInfo?.specifications && Object.entries(modelInfo.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-medium text-gray-700 capitalize">{key.replace('_', ' ')}</span>
                  <span className="text-orii-primary font-semibold">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="text-2xl font-bold text-orii-dark mb-6">Performance Metrics</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">Accuracy Score</span>
                  <span className="text-orii-primary font-semibold">97.8%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-orii-primary to-orii-accent h-2 rounded-full" style={{width: '97.8%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">Response Speed</span>
                  <span className="text-orii-primary font-semibold">95.2%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-orii-primary to-orii-accent h-2 rounded-full" style={{width: '95.2%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">Context Retention</span>
                  <span className="text-orii-primary font-semibold">99.1%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-orii-primary to-orii-accent h-2 rounded-full" style={{width: '99.1%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const PricingSection = () => (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-orii-dark mb-4">Choose Your Plan</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start free and scale as you grow. Enterprise solutions available for teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Free Plan */}
          <div className="card border-2 border-gray-200 relative">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-orii-dark mb-2">Free</h3>
              <div className="text-3xl font-bold text-orii-primary mb-2">$0</div>
              <div className="text-gray-600">per month</div>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Limited Usage
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Basic Performance
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Community Support
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                API Access
              </li>
            </ul>
            <button className="btn-secondary w-full">Get Started</button>
          </div>

          {/* Pro Plan */}
          <div className="card border-2 border-orii-primary relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-orii-primary text-white px-3 py-1 rounded-full text-sm font-medium">Popular</span>
            </div>
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-orii-dark mb-2">Pro</h3>
              <div className="text-3xl font-bold text-orii-primary mb-2">$29</div>
              <div className="text-gray-600">per month</div>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Enhanced Usage Limits
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Improved Performance
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Priority Support
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Advanced Features
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Analytics Dashboard
              </li>
            </ul>
            <button className="btn-primary w-full">Choose Pro</button>
          </div>

          {/* Enterprise Basic */}
          <div className="card border-2 border-gray-200 relative">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-orii-dark mb-2">Enterprise Basic</h3>
              <div className="text-3xl font-bold text-orii-primary mb-2">$100</div>
              <div className="text-gray-600">per month</div>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                High Usage Limits
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Enterprise Performance
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Dedicated Support
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                SLA Guarantees
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Custom Integration
              </li>
            </ul>
            <button className="btn-secondary w-full">Contact Sales</button>
          </div>

          {/* Enterprise Plus */}
          <div className="card border-2 border-gray-200 relative">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-orii-dark mb-2">Enterprise Plus</h3>
              <div className="text-3xl font-bold text-orii-primary mb-2">$200</div>
              <div className="text-gray-600">per month</div>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Unlimited Usage
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Maximum Performance
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                White-glove Support
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Custom Solutions
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Dedicated Account Manager
              </li>
            </ul>
            <button className="btn-secondary w-full">Contact Sales</button>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Need a custom solution? We're here to help.</p>
          <a href="#contact" className="btn-primary">Contact Us</a>
        </div>
      </div>
    </section>
  );

  const AboutSection = () => (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-orii-dark mb-6">About Orii-Gen</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Orii-Gen is an innovative AI startup focused on developing cutting-edge language models. 
              Our mission is to make advanced AI capabilities accessible and practical for everyone, 
              from individuals to enterprises.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              With Orii-O1, we're building the next generation of intelligent systems that understand 
              context, reason effectively, and provide meaningful solutions to real-world challenges.
            </p>
            
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-2xl font-bold text-orii-dark mb-4">Meet the Founder</h3>
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orii-primary to-orii-accent rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">AR</span>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-orii-dark">Ashmit Rathod</h4>
                  <p className="text-gray-600 mb-2">Founder & CEO</p>
                  <p className="text-gray-600 leading-relaxed">
                    2nd year Computer Science Engineering student at KLE Tech University Belagavi. 
                    Passionate about artificial intelligence and building innovative solutions that 
                    push the boundaries of what's possible with modern AI technology.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="card bg-gradient-to-br from-orii-primary to-orii-accent text-white">
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="text-lg opacity-90 mb-6">
              "To democratize access to advanced AI capabilities and empower individuals and 
              organizations to harness the transformative power of artificial intelligence."
            </p>
            
            <div className="border-t border-white/20 pt-6">
              <h4 className="font-semibold mb-2">Key Principles</h4>
              <ul className="space-y-2 opacity-90">
                <li>• Innovation through responsible AI development</li>
                <li>• Transparency in model capabilities and limitations</li>
                <li>• Commitment to ethical AI practices</li>
                <li>• Continuous learning and improvement</li>
              </ul>
            </div>

            <div className="border-t border-white/20 pt-6 mt-6">
              <h4 className="font-semibold mb-3">Why Choose Orii-O1?</h4>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  <span className="opacity-90">Student-founded startup with fresh perspectives</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  <span className="opacity-90">Affordable pricing for all user types</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  <span className="opacity-90">Focused on practical, real-world applications</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const ContactSection = () => (
    <section id="contact" className="py-20 gradient-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-orii-dark mb-4">Get in Touch</h2>
          <p className="text-xl text-gray-600">
            Ready to integrate Orii-O1 into your workflow? Let's discuss your needs.
          </p>
        </div>

        <div className="card">
          <form onSubmit={handleContactSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
              <input
                type="text"
                required
                value={contactForm.name}
                onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orii-primary focus:border-transparent transition-colors"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
              <input
                type="email"
                required
                value={contactForm.email}
                onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orii-primary focus:border-transparent transition-colors"
                placeholder="your.email@company.com"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
              <input
                type="text"
                value={contactForm.company}
                onChange={(e) => setContactForm({...contactForm, company: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orii-primary focus:border-transparent transition-colors"
                placeholder="Your company name"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
              <textarea
                required
                rows={4}
                value={contactForm.message}
                onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orii-primary focus:border-transparent transition-colors"
                placeholder="Tell us about your project or how you'd like to use Orii-O1..."
              ></textarea>
            </div>
            
            <div className="md:col-span-2">
              <button type="submit" className="btn-primary w-full text-lg py-4">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );

  const Footer = () => (
    <footer className="bg-orii-dark text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-orii-primary to-orii-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">O</span>
              </div>
              <span className="text-xl font-bold">Orii-O1</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Advanced large language model designed for superior understanding, 
              creativity, and problem-solving capabilities.
            </p>
            <p className="text-sm text-gray-500">
              © 2025 Orii-Gen. All rights reserved.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Use Cases</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="App">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <SpecificationsSection />
      <PricingSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default App;