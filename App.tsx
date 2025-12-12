import React, { useState } from 'react';
import { AuthMode } from './types';
import { LoginForm } from './components/LoginForm';
import { SignupForm } from './components/SignupForm';
import { CheckCircle } from 'lucide-react';

export default function App() {
  const [mode, setMode] = useState<AuthMode>(AuthMode.LOGIN);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simple authentication simulation
  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white max-w-md w-full rounded-2xl shadow-xl p-8 text-center animate-fade-in-up">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-10 h-10 text-brand-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">You're In!</h1>
          <p className="text-gray-600 mb-8">
            Welcome to the application. This is a secure dashboard view visible only after authentication.
          </p>
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="text-brand-600 hover:text-brand-700 font-semibold"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-brand-50 to-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-2xl p-6 sm:p-10 transition-all duration-300 transform hover:shadow-3xl border border-gray-100">
        
        {/* Header/Logo Area */}
        <div className="flex justify-center mb-8">
            <div className="h-12 w-12 bg-brand-500 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/40">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            </div>
        </div>

        {mode === AuthMode.LOGIN ? (
          <LoginForm 
            onSwitchMode={setMode} 
            onLogin={handleAuthSuccess} 
          />
        ) : (
          <SignupForm 
            onSwitchMode={setMode} 
            onSignup={handleAuthSuccess} 
          />
        )}

      </div>
      
      {/* Footer / Copyright */}
      <div className="absolute bottom-6 text-center w-full text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} ZenAuth Inc. All rights reserved.
      </div>
    </div>
  );
}