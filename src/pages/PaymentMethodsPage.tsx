
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Plus, CreditCard, Smartphone, Banknote, Edit, Trash2 } from 'lucide-react';

interface PaymentMethod {
  id: number;
  name: string;
  type: 'cash' | 'card' | 'digital';
  isActive: boolean;
  feePercentage: number;
  description: string;
}

const PaymentMethodsPage: React.FC = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { id: 1, name: 'Tunai', type: 'cash', isActive: true, feePercentage: 0, description: 'Pembayaran menggunakan uang tunai' },
    { id: 2, name: 'Kartu Kredit/Debit', type: 'card', isActive: true, feePercentage: 2.5, description: 'Visa, Mastercard, dan kartu lokal' },
    { id: 3, name: 'GoPay', type: 'digital', isActive: true, feePercentage: 1.5, description: 'Pembayaran digital GoPay' },
    { id: 4, name: 'OVO', type: 'digital', isActive: true, feePercentage: 1.5, description: 'Pembayaran digital OVO' },
    { id: 5, name: 'DANA', type: 'digital', isActive: false, feePercentage: 1.5, description: 'Pembayaran digital DANA' },
    { id: 6, name: 'ShopeePay', type: 'digital', isActive: true, feePercentage: 1.8, description: 'Pembayaran digital ShopeePay' },
  ]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'cash': return <Banknote className="h-5 w-5" />;
      case 'card': return <CreditCard className="h-5 w-5" />;
      case 'digital': return <Smartphone className="h-5 w-5" />;
      default: return <CreditCard className="h-5 w-5" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'cash': return 'Tunai';
      case 'card': return 'Kartu';
      case 'digital': return 'Digital';
      default: return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'cash': return 'default';
      case 'card': return 'secondary';
      case 'digital': return 'outline';
      default: return 'default';
    }
  };

  const togglePaymentMethod = (id: number) => {
    setPaymentMethods(methods =>
      methods.map(method =>
        method.id === id ? { ...method, isActive: !method.isActive } : method
      )
    );
  };

  const activeMethodsCount = paymentMethods.filter(method => method.isActive).length;
  const digitalMethodsCount = paymentMethods.filter(method => method.type === 'digital' && method.isActive).length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Metode Pembayaran</h1>
          <p className="text-muted-foreground">Kelola metode pembayaran yang tersedia</p>
        </div>
        <Button className="gradient-primary hover:gradient-primary-hover">
          <Plus className="h-4 w-4 mr-2" />
          Tambah Metode
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Metode</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{paymentMethods.length}</div>
            <p className="text-xs text-muted-foreground">Metode tersedia</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Metode Aktif</CardTitle>
            <Smartphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeMethodsCount}</div>
            <p className="text-xs text-muted-foreground">Sedang digunakan</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Digital Wallet</CardTitle>
            <Banknote className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{digitalMethodsCount}</div>
            <p className="text-xs text-muted-foreground">E-wallet aktif</p>
          </CardContent>
        </Card>
      </div>

      {/* Payment Methods List */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Metode Pembayaran</CardTitle>
          <CardDescription>Atur metode pembayaran yang tersedia untuk pelanggan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-muted rounded-lg">
                    {getTypeIcon(method.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-medium">{method.name}</h3>
                      <Badge variant={getTypeColor(method.type)}>{getTypeLabel(method.type)}</Badge>
                      {method.isActive ? (
                        <Badge variant="default">Aktif</Badge>
                      ) : (
                        <Badge variant="secondary">Nonaktif</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{method.description}</p>
                    {method.feePercentage > 0 && (
                      <p className="text-xs text-muted-foreground">
                        Biaya: {method.feePercentage}%
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={method.isActive}
                      onCheckedChange={() => togglePaymentMethod(method.id)}
                    />
                    <Label className="text-sm">Aktif</Label>
                  </div>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add New Payment Method Form */}
      <Card>
        <CardHeader>
          <CardTitle>Tambah Metode Pembayaran Baru</CardTitle>
          <CardDescription>Daftarkan metode pembayaran baru untuk pelanggan</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="method-name">Nama Metode</Label>
              <Input id="method-name" placeholder="Contoh: LinkAja" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="method-fee">Biaya (%)</Label>
              <Input id="method-fee" type="number" placeholder="1.5" step="0.1" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="method-description">Deskripsi</Label>
            <Input id="method-description" placeholder="Deskripsi metode pembayaran" />
          </div>
          <Button className="gradient-primary hover:gradient-primary-hover">
            <Plus className="h-4 w-4 mr-2" />
            Tambah Metode
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentMethodsPage;
