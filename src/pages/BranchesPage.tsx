
import React from 'react';

interface BranchesPageProps {
  userRole: string | null;
}

const BranchesPage: React.FC<BranchesPageProps> = ({ userRole }) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Manajemen Cabang</h1>
        <p className="text-gray-600">Kelola data cabang barbershop</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Daftar Cabang</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Tambah Cabang
          </button>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            { id: 1, name: 'Cabang Utama', address: 'Jl. Sudirman No. 123, Jakarta', status: 'Aktif' },
            { id: 2, name: 'Cabang Mall', address: 'Mall Plaza, Lt. 2, Bandung', status: 'Aktif' },
            { id: 3, name: 'Cabang Timur', address: 'Jl. Ahmad Yani No. 456, Surabaya', status: 'Aktif' },
          ].map((branch) => (
            <div key={branch.id} className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900">{branch.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{branch.address}</p>
              <div className="mt-3 flex justify-between items-center">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">{branch.status}</span>
                <div>
                  <button className="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
                  <button className="text-red-600 hover:text-red-800">Hapus</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BranchesPage;
