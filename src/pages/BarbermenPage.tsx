
import React from 'react';

interface BarbermenPageProps {
  userRole: string | null;
  userBranchId: number | null;
  currentClientId: number | null;
}

const BarbermenPage: React.FC<BarbermenPageProps> = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Manajemen Barberman</h1>
          <p className="text-gray-400 mt-2">Kelola data barberman dan jadwal kerja</p>
        </div>
        <button className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-medium px-6 py-3 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-0.5">
          Tambah Barberman
        </button>
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-2xl font-semibold text-white">Daftar Barberman</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-300">Nama</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-300">Email</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-300">Telepon</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-300">Status</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-300">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              <tr className="hover:bg-gray-700/50 transition-colors">
                <td className="px-6 py-4 text-white font-medium">Ahmad Rivaldi</td>
                <td className="px-6 py-4 text-gray-300">ahmad@barbershop.com</td>
                <td className="px-6 py-4 text-gray-300">081234567890</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-900/30 text-green-400">
                    Aktif
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                      Edit
                    </button>
                    <button className="text-red-400 hover:text-red-300 font-medium transition-colors">
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BarbermenPage;
