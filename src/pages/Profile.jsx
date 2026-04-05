import { motion } from 'framer-motion';
import { Package, MapPin, User as UserIcon, Settings, LogOut, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Profile() {
  const pastOrders = [
    { id: '#MS-789045', date: 'Today', items: 'Seer Fish, Tiger Prawns', total: '₹2100', status: 'In Transit' },
    { id: '#MS-789041', date: '12 Aug 2026', items: 'Mackerel (Ayala)', total: '₹400', status: 'Delivered' },
    { id: '#MS-788930', date: '01 Aug 2026', items: 'Family Weekend Pack', total: '₹1800', status: 'Delivered' }
  ];

  return (
    <div className="bg-light-bg min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-poppins font-bold text-gray-900 mb-8">My Account</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 border border-gray-100 bg-white rounded-2xl shadow-sm overflow-hidden h-fit">
            <div className="p-6 border-b border-gray-100 text-center">
              <div className="w-20 h-20 bg-ocean-blue text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4 tracking-tighter">
                MR
              </div>
              <h2 className="font-poppins font-bold text-lg text-gray-900">Mohammed Roshidh</h2>
              <p className="text-sm text-gray-500">+91 98765 43210</p>
            </div>
            <div className="flex flex-col">
              <button className="flex items-center gap-3 px-6 py-4 text-left font-medium text-ocean-blue bg-blue-50/50 border-l-4 border-ocean-blue">
                <Package size={20} /> My Orders
              </button>
              <button className="flex items-center gap-3 px-6 py-4 text-left font-medium text-gray-600 hover:bg-gray-50 border-l-4 border-transparent transition">
                <MapPin size={20} /> Saved Addresses
              </button>
              <button className="flex items-center gap-3 px-6 py-4 text-left font-medium text-gray-600 hover:bg-gray-50 border-l-4 border-transparent transition">
                <Settings size={20} /> Settings
              </button>
              <button className="flex items-center gap-3 px-6 py-4 text-left font-medium text-red-500 hover:bg-red-50 border-l-4 border-transparent transition border-t border-gray-100">
                <LogOut size={20} /> Logout
              </button>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <h2 className="text-2xl font-poppins font-bold text-gray-900 mb-4">Recent Orders</h2>
            
            {pastOrders.map((order, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                key={order.id} 
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-6 sm:items-center justify-between hover:shadow-md transition"
              >
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-bold text-lg text-gray-900">{order.id}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'In Transit' ? 'bg-blue-100 text-ocean-blue' : 'bg-green-100 text-fresh-green'}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-1">Ordered: {order.date}</p>
                  <p className="text-gray-700 font-medium">{order.items}</p>
                </div>
                
                <div className="flex flex-col sm:items-end gap-3">
                  <span className="text-xl font-bold text-gray-900">{order.total}</span>
                  <div className="flex gap-2">
                    {order.status === 'In Transit' ? (
                      <Link to="/tracking" className="px-4 py-2 bg-ocean-blue text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition">Track</Link>
                    ) : (
                      <button className="px-4 py-2 border-2 border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:border-ocean-blue hover:text-ocean-blue transition">Reorder</button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
