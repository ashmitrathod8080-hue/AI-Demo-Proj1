import React, { useState } from 'react';
import './App.css';

const Login = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [showOTP, setShowOTP] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    // Simulate Google login process
    setTimeout(() => {
      onLogin({ name: 'User', email: 'user@gmail.com', loginMethod: 'google' });
      setIsLoading(false);
    }, 2000);
  };

  const handlePhoneLogin = async () => {
    if (!showOTP) {
      setIsLoading(true);
      // Simulate sending OTP
      setTimeout(() => {
        setShowOTP(true);
        setIsLoading(false);
      }, 1500);
    } else {
      setIsLoading(true);
      // Simulate OTP verification
      setTimeout(() => {
        onLogin({ name: 'User', phone: phoneNumber, loginMethod: 'phone' });
        setIsLoading(false);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-orii-primary to-orii-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">O</span>
          </div>
          <h1 className="text-3xl font-bold text-orii-dark mb-2">Welcome to Orii-O1</h1>
          <p className="text-gray-600">Sign in to start your AI conversation</p>
        </div>

        {/* Login Card */}
        <div className="card">
          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 mb-4 disabled:opacity-50"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {isLoading ? 'Signing in...' : 'Continue with Google'}
          </button>

          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">OR</span>
            </div>
          </div>

          {/* Phone Login */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orii-primary focus:border-transparent transition-colors"
                placeholder="+1 (555) 123-4567"
                disabled={showOTP}
              />
            </div>

            {showOTP && (
              <div className="animate-fade-in">
                <label className="block text-sm font-medium text-gray-700 mb-2">Enter OTP</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orii-primary focus:border-transparent transition-colors"
                  placeholder="123456"
                  maxLength={6}
                />
                <p className="text-sm text-gray-500 mt-2">
                  OTP sent to {phoneNumber}
                </p>
              </div>
            )}

            <button
              onClick={handlePhoneLogin}
              disabled={isLoading || !phoneNumber}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Processing...' : showOTP ? 'Verify OTP' : 'Send OTP'}
            </button>
          </div>

          <p className="text-xs text-gray-500 text-center mt-6">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>New to Orii-O1? Get started with our free plan!</p>
        </div>
      </div>
    </div>
  );
};

export default Login;