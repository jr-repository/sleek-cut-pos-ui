import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Plus, FileText, TrendingUp, DollarSign, Users, Calendar, Download } from 'lucide-react';

interface Sale {
  id: number;
  date: string;
  customer: string;
  barberman: string;
  items: string[];
  total: number;
  branch: string;
  paymentMethod: string;
}

interface Expense {
  id: number;
  date: string;
  description: string;
  category: string;
  amount: number;
  branch: string;
}

interface BarberCommission {
  id: number;
  name: string;
  totalSales: number;
  commission: number;
  commissionRate: number;
  orders: number;
  branch: string;
}

const Reports = () => {
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [dateFrom, setDateFrom] = useState('2024-06-01');
  const [dateTo, setDateTo] = useState('2024-06-09');
  const [isExpenseDialogOpen, setIsExpenseDialogOpen] = useState(false);
  const [expenseForm, setExpenseForm] = useState({
    description: '',
    category: '',
    amount: '',
    branch: ''
  });

  const sales: Sale[] = [
    {
      id: 1,
      date: '2024-06-09',
      customer: 'John Doe',
      barberman: 'Ahmad Rivaldi',
      items: ['Potong Rambut Premium', 'Hair Wash'],
      total: 125000,
      branch: 'Cabang Jakarta',
      paymentMethod: 'Tunai'
    },
    {
      id: 2,
      date: '2024-06-09',
      customer: 'Jane Smith',
      barberman: 'Budi Santoso',
      items: ['Potong Rambut Regular', 'Pomade Premium'],
      total: 135000,
      branch: 'Cabang Bandung',
      paymentMethod: 'E-Wallet'
    },
    {
      id: 3,
      date: '2024-06-08',
      customer: 'Bob Wilson',
      barberman: 'Charlie Wibowo',
      items: ['Cukur Jenggot', 'Hair Tonic'],
      total: 70000,
      branch: 'Cabang Surabaya',
      paymentMethod: 'Kartu Debit'
    }
  ];

  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: 1,
      date: '2024-06-09',
      description: 'Pembelian alat cukur baru',
      category: 'Peralatan',
      amount: 500000,
      branch: 'Cabang Jakarta'
    },
    {
      id: 2,
      date: '2024-06-08',
      description: 'Listrik bulan Mei',
      category: 'Utilitas',
      amount: 350000,
      branch: 'Cabang Bandung'
    },
    {
      id: 3,
      date: '2024-06-07',
      description: 'Gaji karyawan',
      category: 'Gaji',
      amount: 2500000,
      branch: 'Semua Cabang'
    }
  ]);

  const barberCommissions: BarberCommission[] = [
    {
      id: 1,
      name: 'Ahmad Rivaldi',
      totalSales: 5500000,
      commission: 1100000,
      commissionRate: 20,
      orders: 145,
      branch: 'Cabang Jakarta'
    },
    {
      id: 2,
      name: 'Budi Santoso',
      totalSales: 4200000,
      commission: 840000,
      commissionRate: 20,
      orders: 132,
      branch: 'Cabang Bandung'
    },
    {
      id: 3,
      name: 'Charlie Wibowo',
      totalSales: 3800000,
      commission: 760000,
      commissionRate: 20,
      orders: 118,
      branch: 'Cabang Surabaya'
    }
  ];

  const branches = ['Semua Cabang', 'Cabang Jakarta', 'Cabang Bandung', 'Cabang Surabaya'];
  const expenseCategories = ['Peralatan', 'Utilitas', 'Gaji', 'Marketing', 'Maintenance', 'Lainnya'];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newExpense: Expense = {
      id: Math.max(...expenses.map(e => e.id)) + 1,
      date: new Date().toISOString().split('T')[0],
      description: expenseForm.description,
      category: expenseForm.category,
      amount: parseInt(expenseForm.amount),
      branch: expenseForm.branch
    };
    
    setExpenses([...expenses, newExpense]);
    setExpenseForm({ description: '', category: '', amount: '', branch: '' });
    setIsExpenseDialogOpen(false);
  };

  const handleExportPDF = () => {
    // Simple PDF export functionality
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Laporan Barbershop - ${new Date().toLocaleDateString('id-ID')}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              h1, h2 { color: #333; }
              table { width: 100%; border-collapse: collapse; margin: 20px 0; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #f2f2f2; }
              .summary { display: flex; justify-content: space-around; margin: 20px 0; }
              .summary-item { text-align: center; padding: 10px; border: 1px solid #ddd; }
              @media print { .no-print { display: none; } }
            </style>
          </head>
          <body>
            <div style="text-align: center; margin-bottom: 30px;">
              <img src="/assets/image/logo.png" alt="Logo" style="height: 60px; margin-bottom: 10px;" />
              <h1>Laporan Barbershop</h1>
              <p>Periode: ${dateFrom} - ${dateTo}</p>
            </div>
            
            <div class="summary">
              <div class="summary-item">
                <h3>Total Penjualan</h3>
                <p style="font-size: 20px; font-weight: bold;">${formatCurrency(totalSales)}</p>
              </div>
              <div class="summary-item">
                <h3>Total Pengeluaran</h3>
                <p style="font-size: 20px; font-weight: bold;">${formatCurrency(totalExpenses)}</p>
              </div>
              <div class="summary-item">
                <h3>Laba Bersih</h3>
                <p style="font-size: 20px; font-weight: bold; color: ${netProfit >= 0 ? 'green' : 'red'};">${formatCurrency(netProfit)}</p>
              </div>
            </div>

            <h2>Laporan Penjualan</h2>
            <table>
              <thead>
                <tr>
                  <th>Tanggal</th>
                  <th>Customer</th>
                  <th>Barberman</th>
                  <th>Items</th>
                  <th>Cabang</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                ${sales.map(sale => `
                  <tr>
                    <td>${sale.date}</td>
                    <td>${sale.customer}</td>
                    <td>${sale.barberman}</td>
                    <td>${sale.items.join(', ')}</td>
                    <td>${sale.branch}</td>
                    <td>${formatCurrency(sale.total)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>

            <h2>Laporan Pengeluaran</h2>
            <table>
              <thead>
                <tr>
                  <th>Tanggal</th>
                  <th>Deskripsi</th>
                  <th>Kategori</th>
                  <th>Cabang</th>
                  <th>Jumlah</th>
                </tr>
              </thead>
              <tbody>
                ${expenses.map(expense => `
                  <tr>
                    <td>${expense.date}</td>
                    <td>${expense.description}</td>
                    <td>${expense.category}</td>
                    <td>${expense.branch}</td>
                    <td>${formatCurrency(expense.amount)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>

            <h2>Komisi Barberman</h2>
            <table>
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Cabang</th>
                  <th>Total Penjualan</th>
                  <th>Komisi</th>
                  <th>Jumlah Order</th>
                </tr>
              </thead>
              <tbody>
                ${barberCommissions.map(barber => `
                  <tr>
                    <td>${barber.name}</td>
                    <td>${barber.branch}</td>
                    <td>${formatCurrency(barber.totalSales)}</td>
                    <td>${formatCurrency(barber.commission)}</td>
                    <td>${barber.orders}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>

            <div style="margin-top: 30px; text-align: center; color: #666;">
              <p>Laporan dibuat pada: ${new Date().toLocaleString('id-ID')}</p>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      setTimeout(() => {
        printWindow.print();
      }, 500);
    }
  };

  // Calculations
  const totalSales = sales.reduce((total, sale) => total + sale.total, 0);
  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
  const netProfit = totalSales - totalExpenses;

  const salesData = [
    { name: 'Sen', penjualan: 2500000, pengeluaran: 800000 },
    { name: 'Sel', penjualan: 3200000, pengeluaran: 600000 },
    { name: 'Rab', penjualan: 2800000, pengeluaran: 750000 },
    { name: 'Kam', penjualan: 3500000, pengeluaran: 900000 },
    { name: 'Jum', penjualan: 4200000, pengeluaran: 650000 },
    { name: 'Sab', penjualan: 5800000, pengeluaran: 800000 },
    { name: 'Min', penjualan: 6200000, pengeluaran: 700000 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Laporan</h1>
          <p className="text-muted-foreground">Analisis performa dan keuangan barbershop</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Select value={selectedBranch} onValueChange={setSelectedBranch}>
            <SelectTrigger className="w-auto">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {branches.map((branch) => (
                <SelectItem key={branch} value={branch.toLowerCase().replace(' ', '-')}>
                  {branch}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="w-auto"
          />
          
          <Input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="w-auto"
          />
          
          <Button variant="outline">Filter</Button>
          
          <Button onClick={handleExportPDF}>
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Penjualan</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalSales)}</div>
            <p className="text-xs text-muted-foreground">+12.5% dari periode sebelumnya</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pengeluaran</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalExpenses)}</div>
            <p className="text-xs text-muted-foreground">+5.2% dari periode sebelumnya</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Laba Bersih</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(netProfit)}</div>
            <p className="text-xs text-muted-foreground">+18.3% dari periode sebelumnya</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transaksi</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sales.length}</div>
            <p className="text-xs text-muted-foreground">dalam periode ini</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Card>
        <CardHeader>
          <CardTitle>Grafik Penjualan vs Pengeluaran</CardTitle>
          <CardDescription>Perbandingan penjualan dan pengeluaran mingguan</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => `${value / 1000000}M`} />
              <Tooltip formatter={(value) => formatCurrency(value as number)} />
              <Bar dataKey="penjualan" fill="hsl(var(--primary))" name="Penjualan" />
              <Bar dataKey="pengeluaran" fill="hsl(var(--destructive))" name="Pengeluaran" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="sales" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sales">Penjualan</TabsTrigger>
          <TabsTrigger value="expenses">Pengeluaran</TabsTrigger>
          <TabsTrigger value="profit">Laba Rugi</TabsTrigger>
          <TabsTrigger value="commission">Komisi</TabsTrigger>
        </TabsList>

        <TabsContent value="sales">
          <Card>
            <CardHeader>
              <CardTitle>Laporan Penjualan</CardTitle>
              <CardDescription>Detail transaksi penjualan</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Barberman</TableHead>
                    <TableHead>Item</TableHead>
                    <TableHead>Cabang</TableHead>
                    <TableHead>Metode Bayar</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sales.map((sale) => (
                    <TableRow key={sale.id}>
                      <TableCell>{sale.date}</TableCell>
                      <TableCell>{sale.customer}</TableCell>
                      <TableCell>{sale.barberman}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {sale.items.map((item, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{sale.branch}</TableCell>
                      <TableCell>{sale.paymentMethod}</TableCell>
                      <TableCell className="font-medium">{formatCurrency(sale.total)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Laporan Pengeluaran</CardTitle>
                <CardDescription>Detail pengeluaran operasional</CardDescription>
              </div>
              
              <Dialog open={isExpenseDialogOpen} onOpenChange={setIsExpenseDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Tambah Pengeluaran
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Tambah Pengeluaran</DialogTitle>
                    <DialogDescription>Masukkan detail pengeluaran baru</DialogDescription>
                  </DialogHeader>
                  
                  <form onSubmit={handleAddExpense} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="description">Deskripsi</Label>
                      <Textarea
                        id="description"
                        value={expenseForm.description}
                        onChange={(e) => setExpenseForm({ ...expenseForm, description: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="category">Kategori</Label>
                      <Select value={expenseForm.category} onValueChange={(value) => setExpenseForm({ ...expenseForm, category: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih kategori" />
                        </SelectTrigger>
                        <SelectContent>
                          {expenseCategories.map((category) => (
                            <SelectItem key={category} value={category}>{category}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="amount">Jumlah</Label>
                      <Input
                        id="amount"
                        type="number"
                        value={expenseForm.amount}
                        onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="branch">Cabang</Label>
                      <Select value={expenseForm.branch} onValueChange={(value) => setExpenseForm({ ...expenseForm, branch: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih cabang" />
                        </SelectTrigger>
                        <SelectContent>
                          {branches.map((branch) => (
                            <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex gap-2 pt-4">
                      <Button type="submit" className="flex-1">Tambah</Button>
                      <Button type="button" variant="outline" onClick={() => setIsExpenseDialogOpen(false)}>
                        Batal
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Deskripsi</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Cabang</TableHead>
                    <TableHead>Jumlah</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell>{expense.date}</TableCell>
                      <TableCell>{expense.description}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{expense.category}</Badge>
                      </TableCell>
                      <TableCell>{expense.branch}</TableCell>
                      <TableCell className="font-medium text-red-600">
                        -{formatCurrency(expense.amount)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profit">
          <Card>
            <CardHeader>
              <CardTitle>Laporan Laba Rugi</CardTitle>
              <CardDescription>Ringkasan keuangan periode ini</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-green-600">Pendapatan</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Penjualan Layanan:</span>
                        <span>{formatCurrency(280000)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Penjualan Produk:</span>
                        <span>{formatCurrency(50000)}</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-semibold">
                        <span>Total Pendapatan:</span>
                        <span className="text-green-600">{formatCurrency(totalSales)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-red-600">Pengeluaran</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Gaji Karyawan:</span>
                        <span>{formatCurrency(2500000)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Peralatan:</span>
                        <span>{formatCurrency(500000)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Utilitas:</span>
                        <span>{formatCurrency(350000)}</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-semibold">
                        <span>Total Pengeluaran:</span>
                        <span className="text-red-600">{formatCurrency(totalExpenses)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span>Laba Bersih:</span>
                    <span className={netProfit >= 0 ? 'text-green-600' : 'text-red-600'}>
                      {formatCurrency(netProfit)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Margin: {((netProfit / totalSales) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="commission">
          <Card>
            <CardHeader>
              <CardTitle>Komisi Barberman</CardTitle>
              <CardDescription>Pendapatan dan komisi per barberman</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama Barberman</TableHead>
                    <TableHead>Cabang</TableHead>
                    <TableHead>Total Penjualan</TableHead>
                    <TableHead>Persentase Komisi</TableHead>
                    <TableHead>Komisi</TableHead>
                    <TableHead>Jumlah Order</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {barberCommissions.map((barber) => (
                    <TableRow key={barber.id}>
                      <TableCell className="font-medium">{barber.name}</TableCell>
                      <TableCell>{barber.branch}</TableCell>
                      <TableCell>{formatCurrency(barber.totalSales)}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{barber.commissionRate}%</Badge>
                      </TableCell>
                      <TableCell className="font-semibold text-green-600">
                        {formatCurrency(barber.commission)}
                      </TableCell>
                      <TableCell>{barber.orders}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
