import React, { useState } from 'react';
import { Mail, Lock, Sparkles, User, RefreshCw } from 'lucide-react';
import { Input } from './Input';
import { Button } from './Button';
import { AuthMode } from '../types';
import { generateSecurePassword } from '../services/geminiService';

interface SignupFormProps {
  onSwitchMode: (mode: AuthMode) => void;
  onSignup: () => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({ onSwitchMode, onSignup }) => {
  const [loading, setLoading] = useState(false);
  const [generatingPassword, setGeneratingPassword] = useState(false);
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate network request
    setTimeout(() => {
      setLoading(false);
      onSignup();
    }, 1500);
  };

  const handleGeneratePassword = async () => {
    setGeneratingPassword(true);
    try {
      const newPassword = await generateSecurePassword();
      setPassword(newPassword);
    } catch (err) {
      console.error(err);
    } finally {
      setGeneratingPassword(false);
    }
  };

  return (
    <div className="animate-fade-in-up">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
        <p className="text-gray-500 mt-2">Join us today! It takes less than a minute.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          type="text"
          placeholder="Full Name"
          icon={<User size={18} />}
          required
        />
        <Input
          type="email"
          placeholder="Email Address"
          icon={<Mail size={18} />}
          required
        />
        
        <div className="space-y-2">
          <Input
            type="text" // Visible text so user can see generated password easily
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<Lock size={18} />}
            required
            rightElement={
              <button
                type="button"
                onClick={handleGeneratePassword}
                disabled={generatingPassword}
                className="text-brand-500 hover:text-brand-600 p-1 hover:bg-brand-50 rounded-full transition-colors"
                title="Generate secure password with AI"
              >
                {generatingPassword ? (
                  <RefreshCw size={18} className="animate-spin" />
                ) : (
                  <Sparkles size={18} />
                )}
              </button>
            }
          />
          <p className="text-xs text-gray-500 text-right">
            {password ? 'AI-suggested strong password' : 'Click the sparkle to generate a strong password'}
          </p>
        </div>

        <Button type="submit" isLoading={loading}>
          Create Account
        </Button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Already have an account?{' '}
          <button 
            onClick={() => onSwitchMode(AuthMode.LOGIN)}
            className="text-brand-600 hover:text-brand-700 font-bold hover:underline transition-all"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
};