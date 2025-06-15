
import React from 'react';

interface UsersPageProps {
  userRole: string | null;
  currentClientId: number | null;
}

const UsersPage: React.FC<UsersPageProps> = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Manajemen Pengguna</h1>
          <p className="text-gray-400 mt-2">Kelola akun pengguna sistem</p>
        </div>
        <button className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-medium px-6 py-3 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-0.5">
          Tambah Pengguna
        </button>
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-2xl font-semibold text-white">Daftar Pengguna</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-300">Nama</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-300">Email</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-300">Role</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-300">Cabang</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-300">Status</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-300">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {[
                { name: 'Admin Jakarta', email: 'admin.jakarta@barbershop.com', role: 'Admin', branch: 'Cabang Utama', status: 'Aktif' },
                { name: 'Owner System', email: 'owner@barbershop.com', role: 'Owner', branch: 'Global', status: 'Aktif' },
                { name: 'Kasir Mall', email: 'kasir.mall@barbershop.com', role: 'Kasir', branch: 'Cabang Mall', status: 'Aktif' },
              ].map((user, index) => (
                <tr key={index} className="hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 text-white font-medium">{user.name}</td>
                  <td className="px-6 py-4 text-gray-300">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      user.role === 'Admin' ? 'bg-blue-900/30 text-blue-400' :
                      user.role === 'Owner' ? 'bg-violet-900/30 text-violet-400' :
                      'bg-green-900/30 text-green-400'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{user.branch}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-900/30 text-green-400">
                      {user.status}
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
