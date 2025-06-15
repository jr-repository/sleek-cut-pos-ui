
import React from 'react';
import { Building2, Plus, Edit3, Trash2, Search, Crown } from 'lucide-react';

interface ClientsPageProps {
  userRole: string | null;
  currentClientId: number | null;
}

const ClientsPage: React.FC<ClientsPageProps> = ({ userRole, currentClientId }) => {
  const clients = [
    { id: 1, name: 'Barbershop Jakarta', email: 'admin@jakarta.com', branches: 5, status: 'Active', plan: 'Premium' },
    { id: 2, name: 'Salon Bandung', email: 'admin@bandung.com', branches: 3, status: 'Active', plan: 'Standard' },
    { id: 3, name: 'Cut & Style Surabaya', email: 'admin@surabaya.com', branches: 7, status: 'Inactive', plan: 'Premium' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-800 to-indigo-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Building2 className="text-purple-200" size={40} />
            <div>
              <h1 className="text-3xl font-bold text-white">Manajemen Client</h1>
              <p className="text-purple-200">Kelola semua client barbershop</p>
            </div>
          </div>
          <button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center gap-2">
            <Plus size={20} />
            Tambah Client
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Cari client..."
            className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-10 pr-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((client) => (
          <div key={client.id} className="bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl hover:border-purple-300 transition-all duration-300">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                  <Building2 className="text-white" size={24} />
                </div>
                <div className="flex flex-col gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    client.status === 'Active' 
                      ? 'bg-green-100 text-green-800 border border-green-200' 
                      : 'bg-red-100 text-red-800 border border-red-200'
                  }`}>
                    {client.status}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    client.plan === 'Premium' 
                      ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' 
                      : 'bg-blue-100 text-blue-800 border border-blue-200'
                  }`}>
                    {client.plan}
                  </span>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-2">{client.name}</h3>
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <p>Email: {client.email}</p>
                <p>Cabang: {client.branches}</p>
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

export default ClientsPage;
