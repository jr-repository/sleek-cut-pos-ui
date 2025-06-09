
import React, { useState } from 'react';
import { Plus, Edit, Eye, Trash2, User, Scissors, Users, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface Barberman {
  id: number;
  name: string;
  commission: number;
  totalEarnings: number;
  totalCustomers: number;
  commissionEarned: number;
  branchId: number;
  branchName: string;
  phone: string;
  joinDate: string;
}

const BarbermanManagement = () => {
  const [barbermen] = useState<Barberman[]>([
    {
      id: 1,
      name: 'Ahmad Rizki',
      commission: 30,
      totalEarnings: 15000000,
      totalCustomers: 450,
      commissionEarned: 4500000,
      branchId: 1,
      branchName: 'Cabang Utama',
      phone: '081234567890',
      joinDate: '2024-01-15',
    },
    {
      id: 2,
      name: 'Budi Santoso',
      commission: 25,
      totalEarnings: 12000000,
      totalCustomers: 380,
      commissionEarned: 3000000,
      branchId: 1,
      branchName: 'Cabang Utama',
      phone: '081234567891',
      joinDate: '2024-02-10',
    },
    {
      id: 3,
      name: 'Charlie Rahman',
      commission: 35,
      totalEarnings: 18000000,
      totalCustomers: 520,
      commissionEarned: 6300000,
      branchId: 2,
      branchName: 'Cabang Kedua',
      phone: '081234567892',
      joinDate: '2024-01-20',
    },
  ]);

  const [selectedBarberman, setSelectedBarberman] = useState<Barberman | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleDetail = (barberman: Barberman) => {
    setSelectedBarberman(barberman);
    setIsDetailDialogOpen(true);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gradient">Manajemen Barberman</h1>
          <p className="text-muted-foreground mt-1">Kelola data barberman dan komisi</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-primary hover:gradient-primary-hover text-primary-foreground font-medium shadow-lg transition-all duration-300 hover:shadow-xl w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Tambah Barberman
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-gradient">Tambah Barberman Baru</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nama Barberman</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  placeholder="Masukkan nama barberman"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Nomor Telepon</label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  placeholder="Masukkan nomor telepon"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Komisi (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  placeholder="Masukkan persentase komisi"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Cabang</label>
                <select className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground">
                  <option value="">Pilih Cabang</option>
                  <option value="1">Cabang Utama</option>
                  <option value="2">Cabang Kedua</option>
                </select>
              </div>
              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                  className="flex-1"
                >
                  Batal
                </Button>
                <Button
                  className="gradient-primary hover:gradient-primary-hover text-primary-foreground flex-1"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Simpan
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-card border border-border rounded-lg p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Barberman</p>
              <p className="text-2xl font-bold text-gradient">{barbermen.length}</p>
            </div>
            <User className="h-8 w-8 text-primary" />
          </div>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Pendapatan</p>
              <p className="text-xl sm:text-2xl font-bold text-gradient">
                {formatRupiah(barbermen.reduce((sum, b) => sum + b.totalEarnings, 0))}
              </p>
            </div>
            <Scissors className="h-8 w-8 text-primary" />
          </div>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Customer</p>
              <p className="text-2xl font-bold text-gradient">
                {barbermen.reduce((sum, b) => sum + b.totalCustomers, 0)}
              </p>
            </div>
            <Users className="h-8 w-8 text-primary" />
          </div>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Komisi</p>
              <p className="text-xl sm:text-2xl font-bold text-gradient">
                {formatRupiah(barbermen.reduce((sum, b) => sum + b.commissionEarned, 0))}
              </p>
            </div>
            <BarChart3 className="h-8 w-8 text-primary" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-border">
          <h2 className="text-lg sm:text-xl font-semibold text-gradient">Daftar Barberman</h2>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Nama</TableHead>
                <TableHead className="hidden sm:table-cell">Cabang</TableHead>
                <TableHead className="text-center">Komisi (%)</TableHead>
                <TableHead className="text-right">Total Pendapatan</TableHead>
                <TableHead className="text-center hidden md:table-cell">Customer</TableHead>
                <TableHead className="text-right">Komisi Earned</TableHead>
                <TableHead className="text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {barbermen.map((barberman) => (
                <TableRow key={barberman.id}>
                  <TableCell className="font-medium">
                    <div>
                      <p className="font-semibold">{barberman.name}</p>
                      <p className="text-xs text-muted-foreground sm:hidden">{barberman.branchName}</p>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{barberman.branchName}</TableCell>
                  <TableCell className="text-center">
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                      {barberman.commission}%
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {formatRupiah(barberman.totalEarnings)}
                  </TableCell>
                  <TableCell className="text-center hidden md:table-cell">
                    {barberman.totalCustomers}
                  </TableCell>
                  <TableCell className="text-right font-semibold text-gradient">
                    {formatRupiah(barberman.commissionEarned)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDetail(barberman)}
                        className="h-8 w-8 p-0 hover:bg-primary/10"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-primary/10"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-destructive/10 text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          {selectedBarberman && (
            <>
              <DialogHeader>
                <DialogTitle className="text-gradient">Detail Barberman</DialogTitle>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gradient">{selectedBarberman.name}</h3>
                    <p className="text-muted-foreground">{selectedBarberman.branchName}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Telepon</p>
                    <p className="font-medium">{selectedBarberman.phone}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Bergabung</p>
                    <p className="font-medium">{new Date(selectedBarberman.joinDate).toLocaleDateString('id-ID')}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Komisi</p>
                    <p className="font-medium text-primary">{selectedBarberman.commission}%</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Total Customer</p>
                    <p className="font-medium">{selectedBarberman.totalCustomers}</p>
                  </div>
                </div>

                <div className="space-y-4 p-4 bg-secondary/50 rounded-lg">
                  <h4 className="font-semibold text-gradient">Ringkasan Pendapatan</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Pendapatan:</span>
                      <span className="font-semibold">{formatRupiah(selectedBarberman.totalEarnings)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Komisi ({selectedBarberman.commission}%):</span>
                      <span className="font-bold text-gradient">{formatRupiah(selectedBarberman.commissionEarned)}</span>
                    </div>
                    <div className="flex justify-between border-t border-border pt-2">
                      <span className="font-medium">Rata-rata per Customer:</span>
                      <span className="font-medium">
                        {formatRupiah(selectedBarberman.totalEarnings / selectedBarberman.totalCustomers)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsDetailDialogOpen(false)}
                    className="flex-1"
                  >
                    Tutup
                  </Button>
                  <Button className="gradient-primary hover:gradient-primary-hover text-primary-foreground flex-1">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BarbermanManagement;
