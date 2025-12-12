import React, { useState } from 'react';
import { User, Lock, ArrowRight } from 'lucide-react';
import { Input } from './Input';
import { Button } from './Button';
import { AuthMode } from '../types';

interface LoginFormProps {
  onSwitchMode: (mode: AuthMode) => void;
  onLogin: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSwitchMode, onLogin }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate network request
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 1500);
  };

  return (
    <div className="animate-fade-in-up">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
        <p className="text-gray-500 mt-2">Please enter your details to sign in.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          type="text"
          placeholder="Username or Email"
          icon={<User size={18} />}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          icon={<Lock size={18} />}
          required
        />
        
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center text-gray-600 cursor-pointer">
            <input type="checkbox" className="mr-2 rounded text-brand-500 focus:ring-brand-500" />
            Remember me
          </label>
          <a href="#" className="text-brand-600 hover:text-brand-700 font-medium">Forgot Password?</a>
        </div>

        <Button type="submit" isLoading={loading}>
          <span>Sign In</span>
          <ArrowRight size={18} className="ml-2" />
        </Button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <button 
            onClick={() => onSwitchMode(AuthMode.SIGNUP)}
            className="text-brand-600 hover:text-brand-700 font-bold hover:underline transition-all"
          >
            Sign up now
          </button>
        </p>
      </div>
    </div>
  );
};