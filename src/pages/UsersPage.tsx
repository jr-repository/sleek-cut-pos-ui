
import React, { useState } from 'react';
import { Users, Plus, Edit3, Trash2, Search, Filter, Shield, UserCheck } from 'lucide-react';

interface UsersPageProps {
  userRole: string | null;
}

const UsersPage: React.FC<UsersPageProps> = ({ userRole }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  const users = [
    { 
      id: 1, 
      name: 'Super Admin', 
      email: 'admin@barbershop.com', 
      role: 'admin', 
      branch: 'Global',
      status: 'Aktif',
      lastLogin: '2024-01-15 14:30',
      createdAt: '2023-01-01'
    },
    { 
      id: 2, 
      name: 'Owner Utama', 
      email: 'owner@barbershop.com', 
      role: 'owner', 
      branch: 'Global',
      status: 'Aktif',
      lastLogin: '2024-01-15 10:15',
      createdAt: '2023-01-01'
    },
    { 
      id: 3, 
      name: 'Kasir Cabang Utama', 
      email: 'kasir1@barbershop.com', 
      role: 'kasir', 
      branch: 'Cabang Utama',
      status: 'Aktif',
      lastLogin: '2024-01-15 16:45',
      createdAt: '2023-02-15'
    },
    { 
      id: 4, 
      name: 'Kasir Cabang Mall', 
      email: 'kasir2@barbershop.com', 
      role: 'kasir', 
      branch: 'Cabang Mall',
      status: 'Aktif',
      lastLogin: '2024-01-15 12:20',
      createdAt: '2023-03-10'
    },
    { 
      id: 5, 
      name: 'Manager Cabang', 
      email: 'manager@barbershop.com', 
      role: 'kasir', 
      branch: 'Cabang Timur',
      status: 'Nonaktif',
      lastLogin: '2024-01-10 09:30',
      createdAt: '2023-04-20'
    },
  ];

  const getRoleDisplay = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrator';
      case 'owner': return 'Owner';
      case 'kasir': return 'Kasir';
      default: return role;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'owner': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'kasir': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Shield className="w-5 h-5" />;
      case 'owner': return <Users className="w-5 h-5" />;
      case 'kasir': return <UserCheck className="w-5 h-5" />;
      default: return <Users className="w-5 h-5" />;
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.branch.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Users size={32} />
              Manajemen Pengguna
            </h1>
            <p className="text-gray-300">Kelola akses dan hak pengguna sistem</p>
          </div>
          <button className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center gap-2">
            <Plus size={20} />
            Tambah Pengguna
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Cari pengguna..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="text-gray-400" size={20} />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Semua Role</option>
              <option value="admin">Administrator</option>
              <option value="owner">Owner</option>
              <option value="kasir">Kasir</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <div key={user.id} className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-violet-600 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    {getRoleIcon(user.role)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{user.name}</h3>
                    <p className="text-blue-100 text-sm">{user.email}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  user.status === 'Aktif' 
                    ? 'bg-green-500/20 text-green-100 border border-green-400/30' 
                    : 'bg-red-500/20 text-red-100 border border-red-400/30'
                }`}>
                  {user.status}
                </span>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Role:</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}>
                    {getRoleDisplay(user.role)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Cabang:</span>
                  <span className="text-white font-medium">{user.branch}</span>
                </div>

                <div className="bg-gray-700 rounded-lg p-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Login Terakhir:</span>
                    <span className="text-gray-300">{new Date(user.lastLogin).toLocaleDateString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Dibuat:</span>
                    <span className="text-gray-300">{new Date(user.createdAt).toLocaleDateString('id-ID')}</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-6">
                  <button className="flex-1 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2">
                    <Edit3 size={16} />
                    Edit
                  </button>
                  <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="bg-gray-800 rounded-2xl p-12 text-center shadow-xl border border-gray-700">
          <Users className="mx-auto text-gray-500 mb-4" size={64} />
          <h3 className="text-xl font-bold text-gray-400 mb-2">Tidak ada pengguna ditemukan</h3>
          <p className="text-gray-500">Coba ubah kriteria pencarian atau filter Anda</p>
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Pengguna</p>
              <p className="text-2xl font-bold text-white">{users.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <Users className="text-blue-400" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Administrator</p>
              <p className="text-2xl font-bold text-red-400">{users.filter(u => u.role === 'admin').length}</p>
            </div>
            <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
              <Shield className="text-red-400" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Owner</p>
              <p className="text-2xl font-bold text-purple-400">{users.filter(u => u.role === 'owner').length}</p>
            </div>
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
              <Users className="text-purple-400" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Kasir</p>
              <p className="text-2xl font-bold text-blue-400">{users.filter(u => u.role === 'kasir').length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <UserCheck className="text-blue-400" size={24} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
