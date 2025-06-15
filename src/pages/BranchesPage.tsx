
import React from 'react';
import { Building2, Plus, Edit3, Trash2, Search } from 'lucide-react';

interface BranchesPageProps {
  userRole: string | null;
  currentClientId: number | null;
}

const BranchesPage: React.FC<BranchesPageProps> = ({ userRole, currentClientId }) => {
  const branches = [
    { id: 1, name: 'Cabang Utama', address: 'Jl. Sudirman No. 123, Jakarta', status: 'Aktif', manager: 'Ahmad Rivaldi' },
    { id: 2, name: 'Cabang Mall', address: 'Mall Plaza, Lt. 2, Bandung', status: 'Aktif', manager: 'Budi Santoso' },
    { id: 3, name: 'Cabang Timur', address: 'Jl. Ahmad Yani No. 456, Surabaya', status: 'Aktif', manager: 'Charlie Wijaya' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Building2 className="text-emerald-200" size={40} />
            <div>
              <h1 className="text-3xl font-bold text-white">Manajemen Cabang</h1>
              <p className="text-emerald-200">Kelola data cabang barbershop</p>
            </div>
          </div>
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center gap-2">
            <Plus size={20} />
            Tambah Cabang
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Cari cabang..."
            className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-10 pr-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Branches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {branches.map((branch) => (
          <div key={branch.id} className="bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl hover:border-emerald-300 transition-all duration-300">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <Building2 className="text-white" size={24} />
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  branch.status === 'Aktif' 
                    ? 'bg-green-100 text-green-800 border border-green-200' 
                    : 'bg-red-100 text-red-800 border border-red-200'
                }`}>
                  {branch.status}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-2">{branch.name}</h3>
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <p>Alamat: {branch.address}</p>
                <p>Manager: {branch.manager}</p>
              </div>
              
              <div className="flex gap-2">
                <button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                  <Edit3 size={16} />
                  Edit
                </button>
                <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BranchesPage;
