
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Filter, Receipt, Calendar, DollarSign } from 'lucide-react';

interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
  status: 'paid' | 'pending' | 'overdue';
}

const ExpensesPage: React.FC = () => {
  const [expenses] = useState<Expense[]>([
    { id: 1, description: 'Listrik Bulanan', amount: 1500000, category: 'Utilitas', date: '2024-06-01', status: 'paid' },
    { id: 2, description: 'Sewa Gedung', amount: 8000000, category: 'Sewa', date: '2024-06-01', status: 'paid' },
    { id: 3, description: 'Gaji Karyawan', amount: 15000000, category: 'Gaji', date: '2024-06-01', status: 'pending' },
    { id: 4, description: 'Pembelian Produk', amount: 3500000, category: 'Inventori', date: '2024-06-02', status: 'paid' },
    { id: 5, description: 'Internet & Telepon', amount: 800000, category: 'Utilitas', date: '2024-06-03', status: 'overdue' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const categories = ['all', 'Utilitas', 'Sewa', 'Gaji', 'Inventori', 'Pemasaran', 'Lainnya'];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'default';
      case 'pending': return 'secondary';
      case 'overdue': return 'destructive';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid': return 'Dibayar';
      case 'pending': return 'Pending';
      case 'overdue': return 'Terlambat';
      default: return status;
    }
  };

  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || expense.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const paidExpenses = filteredExpenses.filter(e => e.status === 'paid').reduce((sum, expense) => sum + expense.amount, 0);
  const pendingExpenses = filteredExpenses.filter(e => e.status === 'pending').reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Pengeluaran</h1>
          <p className="text-muted-foreground">Kelola pengeluaran dan biaya operasional</p>
        </div>
        <Button className="gradient-primary hover:gradient-primary-hover">
          <Plus className="h-4 w-4 mr-2" />
          Tambah Pengeluaran
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pengeluaran</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalExpenses)}</div>
            <p className="text-xs text-muted-foreground">Periode ini</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sudah Dibayar</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(paidExpenses)}</div>
            <p className="text-xs text-muted-foreground">Lunas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Belum Dibayar</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(pendingExpenses)}</div>
            <p className="text-xs text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Pengeluaran</CardTitle>
          <CardDescription>Kelola dan pantau semua pengeluaran</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Label htmlFor="search">Cari Pengeluaran</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="search"
                  placeholder="Cari berdasarkan deskripsi..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <Label htmlFor="category">Kategori</Label>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'Semua Kategori' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Expenses List */}
          <div className="space-y-4">
            {filteredExpenses.map((expense) => (
              <div key={expense.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-medium">{expense.description}</h3>
                    <Badge variant="outline">{expense.category}</Badge>
                    <Badge variant={getStatusColor(expense.status)}>{getStatusText(expense.status)}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Tanggal: {new Date(expense.date).toLocaleDateString('id-ID')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">{formatCurrency(expense.amount)}</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Detail
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filteredExpenses.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Tidak ada pengeluaran yang ditemukan</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpensesPage;
