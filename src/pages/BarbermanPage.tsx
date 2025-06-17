
import React, { useState } from 'react';
import { Plus, Search, Filter, Users, Star, Calendar, Phone, Mail, MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface BarbermanPageProps {
  userRole: string | null;
  userBranchId: number | null;
}

const BarbermanPage: React.FC<BarbermanPageProps> = ({ userRole, userBranchId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const mockBarbermen = [
    {
      id: 1,
      name: 'Ahmad Rivaldi',
      email: 'ahmad@barbershop.com',
      phone: '081234567890',
      status: 'Aktif',
      branch: 'Cabang Utama',
      rating: 4.8,
      experience: '3 tahun',
      totalCustomers: 245,
      monthlyRevenue: 8500000,
      avatar: '👨‍💼'
    },
    {
      id: 2,
      name: 'Budi Santoso',
      email: 'budi@barbershop.com',
      phone: '081987654321',
      status: 'Aktif',
      branch: 'Cabang Mall',
      rating: 4.6,
      experience: '2 tahun',
      totalCustomers: 189,
      monthlyRevenue: 6200000,
      avatar: '👨‍🎨'
    },
    {
      id: 3,
      name: 'Candra Wijaya',
      email: 'candra@barbershop.com',
      phone: '082123456789',
      status: 'Aktif',
      branch: 'Cabang Timur',
      rating: 4.9,
      experience: '5 tahun',
      totalCustomers: 312,
      monthlyRevenue: 9800000,
      avatar: '👨‍🔧'
    },
    {
      id: 4,
      name: 'Deni Pratama',
      email: 'deni@barbershop.com',
      phone: '083456789012',
      status: 'Cuti',
      branch: 'Cabang Utama',
      rating: 4.5,
      experience: '1 tahun',
      totalCustomers: 98,
      monthlyRevenue: 0,
      avatar: '👨‍💻'
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const filteredBarbermen = mockBarbermen.filter(barberman => {
    const matchesSearch = barberman.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         barberman.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || barberman.status.toLowerCase() === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const activeBarbermen = mockBarbermen.filter(b => b.status === 'Aktif').length;
  const totalRevenue = mockBarbermen.reduce((sum, b) => sum + b.monthlyRevenue, 0);
  const avgRating = mockBarbermen.reduce((sum, b) => sum + b.rating, 0) / mockBarbermen.length;

  return (
    <div className="space-y-6 p-6 bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white">Manajemen Barberman</h1>
          <p className="text-gray-400 mt-2">Kelola data barberman dan monitor performa</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-6 py-3 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-0.5">
          <Plus size={18} className="mr-2" />
          Tambah Barberman
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Barberman</p>
                <p className="text-2xl font-bold text-blue-400">{mockBarbermen.length}</p>
                <p className="text-green-400 text-sm">{activeBarbermen} aktif</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Users className="text-blue-400" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Rating Rata-rata</p>
                <p className="text-2xl font-bold text-yellow-400">{avgRating.toFixed(1)}</p>
                <div className="flex items-center text-sm text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className={i < Math.round(avgRating) ? 'fill-current' : ''} />
                  ))}
                </div>
              </div>
              <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                <Star className="text-yellow-400" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Pendapatan Bulan Ini</p>
                <p className="text-2xl font-bold text-green-400">{formatCurrency(totalRevenue)}</p>
                <p className="text-green-400 text-sm">Semua barberman</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <Calendar className="text-green-400" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Pelanggan</p>
                <p className="text-2xl font-bold text-purple-400">
                  {mockBarbermen.reduce((sum, b) => sum + b.totalCustomers, 0)}
                </p>
                <p className="text-purple-400 text-sm">Semua barberman</p>
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
                  placeholder="Cari nama atau email barberman..."
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
                <option value="cuti">Cuti</option>
                <option value="tidak aktif">Tidak Aktif</option>
              </select>
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                <Filter size={18} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Barbermen Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredBarbermen.map((barberman) => (
          <Card key={barberman.id} className="bg-gray-800 border-gray-700 hover:border-blue-500/50 transition-all duration-300 group">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center text-2xl group-hover:bg-blue-500/30 transition-colors">
                    {barberman.avatar}
                  </div>
                  <div>
                    <CardTitle className="text-white text-lg">{barberman.name}</CardTitle>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      barberman.status === 'Aktif' 
                        ? 'bg-green-900/30 text-green-400 border border-green-700' 
                        : barberman.status === 'Cuti'
                        ? 'bg-yellow-900/30 text-yellow-400 border border-yellow-700'
                        : 'bg-red-900/30 text-red-400 border border-red-700'
                    }`}>
                      {barberman.status}
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
                  <Mail size={14} className="mr-2" />
                  {barberman.email}
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <Phone size={14} className="mr-2" />
                  {barberman.phone}
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <Users size={14} className="mr-2" />
                  {barberman.branch} • {barberman.experience}
                </div>
              </div>

              <div className="flex items-center space-x-1">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      className={`${i < Math.round(barberman.rating) ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-400">({barberman.rating})</span>
              </div>

              {barberman.status === 'Aktif' && (
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-700">
                  <div className="text-center">
                    <p className="text-green-400 font-semibold">{formatCurrency(barberman.monthlyRevenue)}</p>
                    <p className="text-xs text-gray-400">Pendapatan</p>
                  </div>
                  <div className="text-center">
                    <p className="text-blue-400 font-semibold">{barberman.totalCustomers}</p>
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

      {filteredBarbermen.length === 0 && (
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-12 text-center">
            <Users size={48} className="mx-auto text-gray-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">Tidak ada barberman ditemukan</h3>
            <p className="text-gray-500">Coba ubah kriteria pencarian atau filter Anda</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BarbermanPage;
