
import React, { useState } from 'react';
import { Plus, Search, Filter, MapPin, Phone, Users, DollarSign, Edit, Trash2, MoreHorizontal } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface BranchesPageProps {
  userRole: string | null;
}

const BranchesPage: React.FC<BranchesPageProps> = ({ userRole }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const mockBranches = [
    { 
      id: 1, 
      name: 'Cabang Utama', 
      address: 'Jl. Sudirman No. 123, Jakarta', 
      phone: '021-12345678',
      status: 'Aktif',
      revenue: 25000000,
      customers: 145,
      barbermen: 5,
      manager: 'Ahmad Rizki'
    },
    { 
      id: 2, 
      name: 'Cabang Mall', 
      address: 'Mall Plaza, Lt. 2, Bandung', 
      phone: '022-87654321',
      status: 'Aktif',
      revenue: 18500000,
      customers: 120,
      barbermen: 4,
      manager: 'Budi Santoso'
    },
    { 
      id: 3, 
      name: 'Cabang Timur', 
      address: 'Jl. Ahmad Yani No. 456, Surabaya', 
      phone: '031-98765432',
      status: 'Aktif',
      revenue: 22000000,
      customers: 135,
      barbermen: 4,
      manager: 'Candra Wijaya'
    },
    { 
      id: 4, 
      name: 'Cabang Barat', 
      address: 'Jl. Gajah Mada No. 789, Medan', 
      phone: '061-11223344',
      status: 'Tidak Aktif',
      revenue: 0,
      customers: 0,
      barbermen: 0,
      manager: '-'
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const filteredBranches = mockBranches.filter(branch => {
    const matchesSearch = branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         branch.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || branch.status.toLowerCase() === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = mockBranches.reduce((sum, branch) => sum + branch.revenue, 0);
  const activeBranches = mockBranches.filter(branch => branch.status === 'Aktif').length;

  return (
    <div className="space-y-6 p-6 bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white">Manajemen Cabang</h1>
          <p className="text-gray-400 mt-2">Kelola data cabang barbershop dan monitor performa</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-6 py-3 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-0.5">
          <Plus size={18} className="mr-2" />
          Tambah Cabang
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Cabang</p>
                <p className="text-2xl font-bold text-blue-400">{mockBranches.length}</p>
                <p className="text-green-400 text-sm">{activeBranches} cabang aktif</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <MapPin className="text-blue-400" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Pendapatan</p>
                <p className="text-2xl font-bold text-green-400">{formatCurrency(totalRevenue)}</p>
                <p className="text-green-400 text-sm">Semua cabang aktif</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <DollarSign className="text-green-400" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Barbermen</p>
                <p className="text-2xl font-bold text-purple-400">
                  {mockBranches.reduce((sum, branch) => sum + branch.barbermen, 0)}
                </p>
                <p className="text-purple-400 text-sm">Tersebar di {activeBranches} cabang</p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <Users className="text-purple-400" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari nama cabang atau alamat..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-gray-700 border border-gray-600 rounded-lg text-white px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="all">Semua Status</option>
                <option value="aktif">Aktif</option>
                <option value="tidak aktif">Tidak Aktif</option>
              </select>
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                <Filter size={18} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Branches Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredBranches.map((branch) => (
          <Card key={branch.id} className="bg-gray-800 border-gray-700 hover:border-blue-500/50 transition-all duration-300 group">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                    <MapPin className="text-blue-400" size={20} />
                  </div>
                  <div>
                    <CardTitle className="text-white text-lg">{branch.name}</CardTitle>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      branch.status === 'Aktif' 
                        ? 'bg-green-900/30 text-green-400 border border-green-700' 
                        : 'bg-red-900/30 text-red-400 border border-red-700'
                    }`}>
                      {branch.status}
                    </span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <MoreHorizontal size={16} />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-400">
                  <MapPin size={14} className="mr-2" />
                  {branch.address}
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <Phone size={14} className="mr-2" />
                  {branch.phone}
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <Users size={14} className="mr-2" />
                  Manager: {branch.manager}
                </div>
              </div>

              {branch.status === 'Aktif' && (
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-700">
                  <div className="text-center">
                    <p className="text-green-400 font-semibold">{formatCurrency(branch.revenue)}</p>
                    <p className="text-xs text-gray-400">Pendapatan</p>
                  </div>
                  <div className="text-center">
                    <p className="text-blue-400 font-semibold">{branch.customers}</p>
                    <p className="text-xs text-gray-400">Pelanggan</p>
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <Button variant="outline" size="sm" className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700">
                  <Edit size={14} className="mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="border-red-600 text-red-400 hover:bg-red-900/20">
                  <Trash2 size={14} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBranches.length === 0 && (
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-12 text-center">
            <MapPin size={48} className="mx-auto text-gray-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">Tidak ada cabang ditemukan</h3>
            <p className="text-gray-500">Coba ubah kriteria pencarian atau filter Anda</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BranchesPage;
