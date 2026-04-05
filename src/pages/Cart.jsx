import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import useStore from '../store/useStore';
import { motion } from 'framer-motion';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useStore();
  const navigate = useNavigate();

  const itemTotal = cart.reduce((total, item) => total + ((item.discountedPrice || item.pricePerKg) * item.quantity), 0);
  const deliveryCharge = itemTotal >= 500 || itemTotal === 0 ? 0 : 50;
  const grandTotal = itemTotal + deliveryCharge;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-light-bg py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="bg-white p-12 rounded-3xl shadow-sm mb-8 flex flex-col items-center">
            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag size={48} className="text-ocean-blue" />
            </div>
            <h2 className="text-3xl font-poppins font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Looks like you haven't added any fresh catches yet.</p>
            <Link to="/products" className="bg-ocean-blue hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-medium transition flex items-center gap-2">
              Start Shopping <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-bg py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-poppins font-bold text-gray-900 mb-8">Shopping Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="divide-y divide-gray-100">
                {cart.map((item, index) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    key={item.cartItemId} 
                    className="p-6 flex flex-col sm:flex-row gap-6 items-center"
                  >
                    <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl" />
                    
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="font-poppins font-semibold text-lg text-gray-900">{item.name}</h3>
                      <p className="text-gray-500 text-sm mt-1">Cut: {item.cleaningOption}</p>
                      <div className="text-ocean-blue font-bold mt-2">
                        ₹{item.discountedPrice || item.pricePerKg} <span className="text-xs text-gray-400 font-normal">/ kg</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-2">
                        <button onClick={() => updateQuantity(item.cartItemId, -1)} className="p-2 text-gray-500 hover:text-black">
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.cartItemId, 1)} className="p-2 text-gray-500 hover:text-black">
                          <Plus size={16} />
                        </button>
                      </div>
                      
                      <div className="font-bold text-gray-900 w-20 text-right">
                        ₹{(item.discountedPrice || item.pricePerKg) * item.quantity}
                      </div>
                      
                      <button onClick={() => removeFromCart(item.cartItemId)} className="text-gray-400 hover:text-red-500 transition p-2">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="w-full lg:w-96">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-poppins font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">₹{itemTotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery fee</span>
                  <span className="font-medium text-gray-900">
                    {deliveryCharge === 0 ? <span className="text-fresh-green">Free</span> : `₹${deliveryCharge}`}
                  </span>
                </div>
                {itemTotal < 500 && (
                  <p className="text-sm text-gray-500 italic mt-1">Add items worth ₹{500 - itemTotal} more for free delivery!</p>
                )}
              </div>
              
              <div className="border-t border-gray-100 pt-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-ocean-blue">₹{grandTotal}</span>
                </div>
              </div>
              
              <button 
                onClick={() => navigate('/checkout')}
                className="w-full bg-ocean-blue hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg transition flex justify-center items-center gap-2 shadow-lg"
              >
                Proceed to Checkout <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
