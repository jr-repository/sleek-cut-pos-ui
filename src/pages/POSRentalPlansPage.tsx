
import React from 'react';
import { CreditCard, Plus, Edit3, Trash2, Crown, Star, Zap } from 'lucide-react';

interface POSRentalPlansPageProps {
  userRole: string | null;
  currentClientId: number | null;
}

const POSRentalPlansPage: React.FC<POSRentalPlansPageProps> = ({ userRole, currentClientId }) => {
  const plans = [
    { 
      id: 1, 
      name: 'Basic', 
      price: 500000, 
      features: ['1 Cabang', 'POS Dasar', 'Laporan Standar'], 
      icon: Star,
      color: 'blue' 
    },
    { 
      id: 2, 
      name: 'Standard', 
      price: 1000000, 
      features: ['5 Cabang', 'POS Advanced', 'Laporan Detail', 'Support Email'], 
      icon: Zap,
      color: 'green' 
    },
    { 
      id: 3, 
      name: 'Premium', 
      price: 2000000, 
      features: ['Unlimited Cabang', 'Full Features', 'Priority Support', 'Custom Reports'], 
      icon: Crown,
      color: 'purple' 
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-800 to-teal-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <CreditCard className="text-green-200" size={40} />
            <div>
              <h1 className="text-3xl font-bold text-white">Paket Sewa POS</h1>
              <p className="text-green-200">Kelola paket dan harga sewa sistem POS</p>
            </div>
          </div>
          <button className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center gap-2">
            <Plus size={20} />
            Tambah Paket
          </button>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const Icon = plan.icon;
          return (
            <div key={plan.id} className={`bg-white rounded-xl shadow-lg border-2 border-gray-200 hover:border-${plan.color}-300 transition-all duration-300 overflow-hidden`}>
              <div className={`bg-gradient-to-r from-${plan.color}-500 to-${plan.color}-600 p-6 text-white`}>
                <div className="flex items-center justify-between mb-4">
                  <Icon size={32} />
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Paket</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-3xl font-bold">{formatCurrency(plan.price)}</p>
                <p className="text-sm opacity-90">/bulan</p>
              </div>
              
              <div className="p-6">
                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className={`w-2 h-2 bg-${plan.color}-500 rounded-full`}></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <button className={`flex-1 bg-gradient-to-r from-${plan.color}-600 to-${plan.color}-700 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2`}>
                    <Edit3 size={16} />
                    Edit
                  </button>
                  <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default POSRentalPlansPage;
