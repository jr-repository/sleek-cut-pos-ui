
import React from 'react';

interface POSRentalPlansPageProps {
  userRole: string | null;
  currentClientId: number | null;
}

const POSRentalPlansPage: React.FC<POSRentalPlansPageProps> = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Rencana Sewa POS</h1>
          <p className="text-gray-400 mt-2">Kelola paket langganan sistem POS</p>
        </div>
        <button className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-medium px-6 py-3 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-0.5">
          Tambah Paket
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { id: 1, name: 'Basic Plan', price: 'Rp 500.000', duration: 'Per Bulan', features: ['1 Cabang', 'Basic Features', 'Email Support'] },
          { id: 2, name: 'Pro Plan', price: 'Rp 1.000.000', duration: 'Per Bulan', features: ['5 Cabang', 'Advanced Features', 'Priority Support'] },
          { id: 3, name: 'Enterprise', price: 'Rp 2.000.000', duration: 'Per Bulan', features: ['Unlimited Cabang', 'All Features', '24/7 Support'] },
        ].map((plan) => (
          <div key={plan.id} className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl hover:border-blue-500/50 transition-all duration-300">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <div className="text-3xl font-bold text-blue-400 mb-1">{plan.price}</div>
              <div className="text-gray-400 text-sm">{plan.duration}</div>
            </div>
            
            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-300">
                  <span className="text-green-400 mr-2">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
            
            <div className="flex gap-2">
              <button className="flex-1 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-medium py-2 px-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
                Edit
              </button>
              <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow-lg transition-all duration-300">
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default POSRentalPlansPage;
