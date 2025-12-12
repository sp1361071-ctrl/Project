import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  label?: string;
  rightElement?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ icon, label, rightElement, className = '', ...props }) => {
  return (
    <div className="w-full mb-4">
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {icon}
          </div>
        )}
        <input
          className={`w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-brand-500 focus:border-brand-500 block p-3 ${icon ? 'pl-10' : ''} ${rightElement ? 'pr-12' : ''} transition-colors ${className}`}
          {...props}
        />
        {rightElement && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
};