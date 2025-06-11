
import React from 'react';

interface UsersPageProps {
  userRole: string | null;
}

const UsersPage: React.FC<UsersPageProps> = ({ userRole }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Manajemen Pengguna</h1>
          <p className="text-muted-foreground mt-2">Kelola akun pengguna sistem</p>
        </div>
        <button className="gradient-primary text-white font-medium px-6 py-3 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-0.5">
          Tambah Pengguna
        </button>
      </div>

      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="text-2xl font-semibold text-foreground">Daftar Pengguna</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/30">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Nama</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Email</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Role</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Cabang</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                { id: 1, name: 'Admin User', email: 'admin@barbershop.com', role: 'Admin', branch: 'Global', status: 'Aktif' },
                { id: 2, name: 'Owner User', email: 'owner@barbershop.com', role: 'Owner', branch: 'Global', status: 'Aktif' },
                { id: 3, name: 'Kasir Utama', email: 'kasir1@barbershop.com', role: 'Kasir', branch: 'Cabang Utama', status: 'Aktif' },
                { id: 4, name: 'Kasir Mall', email: 'kasir2@barbershop.com', role: 'Kasir', branch: 'Cabang Mall', status: 'Aktif' },
              ].map((user) => (
                <tr key={user.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4 text-foreground font-medium">{user.name}</td>
                  <td className="px-6 py-4 text-muted-foreground">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      user.role === 'Admin' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                      user.role === 'Owner' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' :
                      'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{user.branch}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="text-primary hover:text-primary/80 font-medium transition-colors">
                        Edit
                      </button>
                      <button className="text-destructive hover:text-destructive/80 font-medium transition-colors">
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
