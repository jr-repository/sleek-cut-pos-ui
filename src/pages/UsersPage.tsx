
import React from 'react';

interface UsersPageProps {
  userRole: string | null;
}

const UsersPage: React.FC<UsersPageProps> = ({ userRole }) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Manajemen Pengguna</h1>
        <p className="text-gray-600">Kelola akun pengguna sistem</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Daftar Pengguna</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Tambah Pengguna
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left">Nama</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Role</th>
                <th className="px-4 py-2 text-left">Cabang</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 1, name: 'Admin User', email: 'admin@barbershop.com', role: 'Admin', branch: 'Global', status: 'Aktif' },
                { id: 2, name: 'Owner User', email: 'owner@barbershop.com', role: 'Owner', branch: 'Global', status: 'Aktif' },
                { id: 3, name: 'Kasir Utama', email: 'kasir1@barbershop.com', role: 'Kasir', branch: 'Cabang Utama', status: 'Aktif' },
                { id: 4, name: 'Kasir Mall', email: 'kasir2@barbershop.com', role: 'Kasir', branch: 'Cabang Mall', status: 'Aktif' },
              ].map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      user.role === 'Admin' ? 'bg-red-100 text-red-800' :
                      user.role === 'Owner' ? 'bg-purple-100 text-purple-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-2">{user.branch}</td>
                  <td className="px-4 py-2">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">{user.status}</span>
                  </td>
                  <td className="px-4 py-2">
                    <button className="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
                    <button className="text-red-600 hover:text-red-800">Hapus</button>
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
