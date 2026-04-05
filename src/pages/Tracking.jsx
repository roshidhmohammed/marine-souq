import { motion } from 'framer-motion';
import { PackageOpen, UtensilsCrossed, Truck, MapPin, Check, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Tracking() {
  const steps = [
    { id: 1, label: 'Order Confirmed', time: '10:05 AM', icon: <PackageOpen size={24} />, status: 'completed' },
    { id: 2, label: 'Cleaning & Packing', time: '10:15 AM', icon: <UtensilsCrossed size={24} />, status: 'completed' },
    { id: 3, label: 'Out for Delivery', time: '10:30 AM', icon: <Truck size={24} />, status: 'current' },
    { id: 4, label: 'Delivered', time: 'Pending', icon: <MapPin size={24} />, status: 'upcoming' },
  ];

  return (
    <div className="bg-light-bg min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center text-gray-500 hover:text-ocean-blue mb-8 transition">
          <ChevronLeft size={20} />
          <span>Back to Home</span>
        </Link>
        
        <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-sm border border-gray-100 mb-8">
          <div className="flex justify-between items-start mb-8 pb-8 border-b border-gray-100">
            <div>
              <h1 className="text-2xl font-poppins font-bold text-gray-900 mb-1">Track Order</h1>
              <p className="text-gray-500 text-sm">Order ID: #MS-789045</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 mb-1">Estimated Delivery</p>
              <p className="text-xl font-bold text-ocean-blue">10:45 AM</p>
            </div>
          </div>
          
          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute left-8 sm:left-12 top-10 bottom-10 w-1 bg-gray-100 z-0 rounded-full"></div>
            <div className="absolute left-8 sm:left-12 top-10 h-2/3 w-1 bg-fresh-green z-0 rounded-full"></div>
            
            <div className="space-y-12">
              {steps.map((step, index) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15 }}
                  key={step.id} 
                  className="flex items-center relative z-10"
                >
                  <div className={`w-16 h-16 sm:w-24 flex items-center justify-center shrink-0`}>
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition shadow-sm ${
                      step.status === 'completed' ? 'bg-fresh-green text-white' : 
                      step.status === 'current' ? 'bg-ocean-blue text-white ring-4 ring-blue-100' : 
                      'bg-gray-100 text-gray-400'
                    }`}>
                      {step.status === 'completed' ? <Check size={28} /> : step.icon}
                    </div>
                  </div>
                  
                  <div className="ml-4 sm:ml-6 flex-1">
                    <h3 className={`font-poppins font-semibold text-lg ${step.status === 'upcoming' ? 'text-gray-400' : 'text-gray-900'}`}>
                      {step.label}
                    </h3>
                    <p className={`text-sm ${step.status === 'upcoming' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {step.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Delivery Partner Info */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 shrink-0">
             <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150&q=80" alt="Delivery Partner" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <h3 className="font-poppins font-bold text-gray-900">John Smith</h3>
            <p className="text-sm text-gray-500">Your Delivery Partner</p>
          </div>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-3 rounded-xl font-medium transition cursor-not-allowed">
            Call
          </button>
        </div>
      </div>
    </div>
  );
}
