
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Scissors, Building } from 'lucide-react';

interface Branch {
  id: number;
  name: string;
  address: string;
}

interface LoginPageProps {
  onLogin: (branch: Branch) => void;
}

const mockBranches: Branch[] = [
  { id: 1, name: 'Cabang Utama', address: 'Jl. Sudirman No. 123, Jakarta' },
  { id: 2, name: 'Cabang Mall', address: 'Mall Plaza, Lt. 2, Bandung' },
  { id: 3, name: 'Cabang Timur', address: 'Jl. Ahmad Yani No. 456, Surabaya' },
];

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const handleBranchSelect = (branch: Branch) => {
    onLogin(branch);
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-4xl animate-fade-in">
          <div className="text-center mb-6 sm:mb-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
              <Scissors className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gradient mb-2">Pilih Cabang</h1>
            <p className="text-muted-foreground text-sm sm:text-base">Silakan pilih cabang untuk melanjutkan ke aplikasi</p>
          </div>

          <div className="responsive-grid gap-4 sm:gap-6">
            {mockBranches.map((branch) => (
              <Card 
                key={branch.id} 
                className="cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg border-border/50 hover:border-primary/50"
                onClick={() => handleBranchSelect(branch)}
              >
                <CardHeader className="text-center pb-3 sm:pb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 gradient-primary rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3">
                    <Building className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl text-foreground">{branch.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{branch.address}</p>
                  <Button className="mt-3 sm:mt-4 w-full gradient-primary hover:gradient-primary-hover text-white border-0 text-sm sm:text-base">
                    Pilih Cabang
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-sm sm:max-w-md animate-fade-in border-border/50">
        <CardHeader className="text-center space-y-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 gradient-primary rounded-xl flex items-center justify-center mx-auto">
            <Scissors className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl sm:text-2xl text-gradient">Barbershop POS</CardTitle>
            <p className="text-muted-foreground text-sm sm:text-base mt-2">Masuk ke sistem Point of Sale</p>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email / Username</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@barbershop.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full gradient-primary hover:gradient-primary-hover text-white border-0"
            >
              Masuk
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
