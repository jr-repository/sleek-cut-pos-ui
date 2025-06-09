
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Branch {
  id: number;
  name: string;
  address: string;
}

interface LoginPageProps {
  onLogin: (selectedBranch: Branch) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showBranchSelection, setShowBranchSelection] = useState(false);

  const branches: Branch[] = [
    { id: 1, name: 'Cabang Utama Jakarta', address: 'Jl. Sudirman No. 123, Jakarta Pusat' },
    { id: 2, name: 'Cabang Bandung', address: 'Jl. Braga No. 45, Bandung' },
    { id: 3, name: 'Cabang Surabaya', address: 'Jl. Tunjungan No. 67, Surabaya' },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setShowBranchSelection(true);
  };

  const handleBranchSelect = (branch: Branch) => {
    onLogin(branch);
  };

  if (showBranchSelection) {
    return (
      <div className="min-h-screen flex items-center justify-center barbershop-gradient p-4">
        <div className="w-full max-w-2xl animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">Pilih Cabang Aktif</h1>
            <p className="text-muted-foreground">Pilih cabang yang akan Anda operasikan</p>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {branches.map((branch) => (
              <Card 
                key={branch.id} 
                className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-primary/50"
                onClick={() => handleBranchSelect(branch)}
              >
                <CardHeader>
                  <CardTitle className="text-lg">{branch.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{branch.address}</p>
                  <Button className="w-full mt-4" variant="outline">
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
    <div className="min-h-screen flex items-center justify-center barbershop-gradient p-4">
      <Card className="w-full max-w-md animate-fade-in">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 gold-gradient rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-barbershop-dark">✂️</span>
          </div>
          <CardTitle className="text-2xl font-bold">Barbershop POS</CardTitle>
          <CardDescription>Masuk ke sistem Point of Sale</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email/Username</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@barbershop.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Masuk
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
