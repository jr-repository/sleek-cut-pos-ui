
import React, { useState } from 'react';

interface LoginPageProps {
  onLoginSuccess: (role: string, branch_id: number | null, username: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess('admin', null, 'Admin User');
  };

  return (
    <div className="min-h-screen barbershop-gradient flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-card/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-border p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gradient mb-2">Barbershop POS</h1>
          <p className="text-muted-foreground">Masuk ke sistem Point of Sale</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-foreground">
              Email / Username
            </label>
            <input
              id="email"
              type="email"
              placeholder="admin@barbershop.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-input border border-border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-300 text-foreground placeholder-muted-foreground"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-foreground">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-input border border-border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-300 text-foreground placeholder-muted-foreground"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full gradient-primary text-white font-medium py-3 px-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
