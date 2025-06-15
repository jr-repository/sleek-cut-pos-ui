
import React from 'react';
import { UserCheck, Plus, Edit3, Trash2, Search, Shield, User, Crown } from 'lucide-react';

interface UsersPageProps {
  userRole: string | null;
  currentClientId: number | null;
}

const UsersPage: React.FC<UsersPageProps> = ({ userRole, currentClientId }) => {
  const users = [
    { id: 1, name: 'Ahmad Admin', email: 'admin@barbershop.com', role: 'admin', branch: 'Global', status: 'Active' },
    { id: 2, name: 'Budi Owner', email: 'owner@barbershop.com', role: 'owner', branch: 'Global', status: 'Active' },
    { id: 3, name: 'Charlie Kasir', email: 'kasir1@barbershop.com', role: 'kasir', branch: 'Cabang Utama', status: 'Active' },
    { id: 4, name: 'David Kasir', email: 'kasir2@barbershop.com', role: 'kasir', branch: 'Cabang Mall', status: 'Inactive' },
  ];

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Shield className="text-red-500" size={20} />;
      case 'owner': return <Crown className="text-yellow-500" size={20} />;
      case 'kasir': return <User className="text-blue-500" size={20} />;
      default: return <User className="text-gray-500" size={20} />;
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Admin';
      case 'owner': return 'Owner';
      case 'kasir': return 'Kasir';
      default: return role;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-800 to-purple-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <UserCheck className="text-violet-200" size={40} />
            <div>
              <h1 className="text-3xl font-bold text-white">Manajemen Pengguna</h1>
              <p className="text-violet-200">Kelola akses dan permissions pengguna</p>
            </div>
          </div>
          <button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center gap-2">
            <Plus size={20} />
            Tambah Pengguna
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Cari pengguna..."
            className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-10 pr-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Daftar Pengguna</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Nama</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Email</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Role</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Cabang</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-900 font-medium">{user.name}</td>
                  <td className="px-6 py-4 text-gray-600">{user.email}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getRoleIcon(user.role)}
                      <span className="text-gray-800 font-medium">{getRoleLabel(user.role)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{user.branch}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      user.status === 'Active' 
                        ? 'bg-green-100 text-green-800 border border-green-200' 
                        : 'bg-red-100 text-red-800 border border-red-200'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors duration-200">
                        <Edit3 size={16} />
                      </button>
                      <button className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors duration-200">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
