
import React from 'react';

interface BarbermanPageProps {
  userRole: string | null;
  userBranchId: number | null;
}

const BarbermanPage: React.FC<BarbermanPageProps> = ({ userRole, userBranchId }) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Manajemen Barberman</h1>
        <p className="text-gray-600">Kelola data barberman dan jadwal kerja</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Daftar Barberman</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Tambah Barberman
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left">Nama</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Telepon</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-2">Ahmad Rivaldi</td>
                <td className="px-4 py-2">ahmad@barbershop.com</td>
                <td className="px-4 py-2">081234567890</td>
                <td className="px-4 py-2">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">Aktif</span>
                </td>
                <td className="px-4 py-2">
                  <button className="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
                  <button className="text-red-600 hover:text-red-800">Hapus</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BarbermanPage;
