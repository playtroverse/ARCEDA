
import React, { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

interface AdminLoginProps {
  onLogin: (password: string) => boolean;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useLocalStorage('adminRememberMe', false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onLogin(password)) {
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-gray-800 rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-sm border border-indigo-500/50">
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-400">Admin Access</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 text-lg mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-700 text-white rounded-lg p-4 text-lg border-2 border-transparent focus:border-indigo-500 focus:outline-none focus:ring-0"
              placeholder="••••••••"
              required
            />
          </div>
          {error && <p className="text-red-400 text-center mb-4">{error}</p>}
          <div className="mb-6">
            <label className="flex items-center text-lg text-gray-300">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-6 w-6 rounded bg-gray-700 border-gray-600 text-indigo-500 focus:ring-indigo-500"
              />
              <span className="ml-3">Remember Me</span>
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold text-xl py-4 rounded-lg hover:bg-indigo-700 transition-all transform active:scale-95"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
