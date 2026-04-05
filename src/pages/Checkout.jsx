import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MapPin, CreditCard, Banknote, ChevronLeft, CheckCircle2, ShieldAlert } from 'lucide-react';
import useStore from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';

export default function Checkout() {
  const { cart, clearCart } = useStore();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    pincode: '',
    slot: 'Today, 2:00 PM - 5:00 PM',
    instructions: '',
    paymentMode: 'cod'
  });

  const [validationStage, setValidationStage] = useState('idle'); // idle, checking, valid, invalid
  const [orderPlaced, setOrderPlaced] = useState(false);

  const itemTotal = cart.reduce((total, item) => total + ((item.discountedPrice || item.pricePerKg) * item.quantity), 0);
  const deliveryCharge = itemTotal >= 500 || itemTotal === 0 ? 0 : 50;
  const grandTotal = itemTotal + deliveryCharge;

  // Mock 7KM logic
  const handlePincodeBlur = () => {
    if (formData.pincode.length >= 6) {
      setValidationStage('checking');
      setTimeout(() => {
        // Mock logic: Valid if it starts with '600' (Simulating within 7km)
        if (formData.pincode.startsWith('600')) {
          setValidationStage('valid');
        } else {
          setValidationStage('invalid');
        }
      }, 1500);
    } else {
      setValidationStage('idle');
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (validationStage !== 'valid') {
      alert("Please ensure your delivery location is within our 7KM radius before placing the order.");
      return;
    }
    
    setOrderPlaced(true);
    setTimeout(() => {
      clearCart();
      navigate('/tracking'); // We'll create Tracking next
    }, 3000);
  };

  const updateForm = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-light-bg py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link to="/products" className="text-ocean-blue underline">Go back to shopping</Link>
      </div>
    );
  }

  return (
    <div className="bg-light-bg min-h-screen py-12 relative">
      <AnimatePresence>
        {orderPlaced && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center p-4 text-center"
          >
            <motion.div 
              initial={{ scale: 0.8 }} 
              animate={{ scale: 1 }} 
              transition={{ type: "spring" }}
              className="w-24 h-24 bg-fresh-green rounded-full flex items-center justify-center text-white mb-6"
            >
              <CheckCircle2 size={48} />
            </motion.div>
            <h1 className="text-4xl font-poppins font-bold text-gray-900 mb-4">Order Confirmed!</h1>
            <p className="text-gray-500 text-lg max-w-md">Your fresh seafood order has been successfully placed. We're packing it in ice right now.</p>
            <p className="text-ocean-blue mt-8 font-medium animate-pulse">Redirecting to tracking...</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/cart" className="inline-flex items-center text-gray-500 hover:text-ocean-blue mb-8 transition">
          <ChevronLeft size={20} />
          <span>Back to Cart</span>
        </Link>
        
        <h1 className="text-3xl font-poppins font-bold text-gray-900 mb-8">Checkout</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <form onSubmit={handlePlaceOrder} className="flex-1 space-y-6">
            
            {/* Delivery Address Section */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-poppins font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <MapPin className="text-ocean-blue" /> Delivery Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input required type="text" value={formData.name} onChange={e => updateForm('name', e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-ocean-blue transition" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input required type="tel" value={formData.phone} onChange={e => updateForm('phone', e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-ocean-blue transition" placeholder="+91 98765 43210" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Complete Address</label>
                  <textarea required value={formData.address} onChange={e => updateForm('address', e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-ocean-blue transition min-h-[100px]" placeholder="House No., Street, Area..." />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pincode (7KM Check)</label>
                  <input 
                    required 
                    type="text" 
                    value={formData.pincode} 
                    onChange={e => updateForm('pincode', e.target.value)} 
                    onBlur={handlePincodeBlur}
                    className={`w-full bg-gray-50 border rounded-xl px-4 py-3 focus:outline-none transition ${validationStage === 'invalid' ? 'border-red-500' : validationStage === 'valid' ? 'border-fresh-green' : 'border-gray-200 focus:border-ocean-blue'}`} 
                    placeholder="Enter pincode (e.g. 600001)" 
                  />
                  
                  {/* Validation Feedback */}
                  <AnimatePresence>
                    {validationStage === 'checking' && (
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-gray-500 mt-2 flex items-center md:gap-1"><span className="animate-spin mr-2">⟳</span> Checking distance...</motion.p>
                    )}
                    {validationStage === 'invalid' && (
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-red-500 mt-2 flex items-center gap-1"><ShieldAlert size={16}/> Outside 7KM radius. We do not deliver here yet.</motion.p>
                    )}
                    {validationStage === 'valid' && (
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-fresh-green mt-2 flex items-center gap-1"><CheckCircle2 size={16}/> Service available in your area!</motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Delivery Slot */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-poppins font-semibold text-gray-900 mb-6">Delivery Slot</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['Today, 2:00 PM - 5:00 PM', 'Today, 5:00 PM - 8:00 PM', 'Tomorrow, 9:00 AM - 12:00 PM', 'Tomorrow, 12:00 PM - 3:00 PM'].map(slot => (
                  <div 
                    key={slot} 
                    onClick={() => updateForm('slot', slot)}
                    className={`border-2 rounded-xl p-4 cursor-pointer transition ${formData.slot === slot ? 'border-ocean-blue bg-blue-50' : 'border-gray-200 hover:border-blue-200'}`}
                  >
                    <div className="font-medium text-gray-900">{slot.split(',')[0]}</div>
                    <div className="text-sm text-gray-500">{slot.split(',')[1]}</div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Instructions (Optional)</label>
                <input type="text" value={formData.instructions} onChange={e => updateForm('instructions', e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-ocean-blue transition" placeholder="e.g. Leave with security guard" />
              </div>
            </div>

            {/* Payment Options */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-poppins font-semibold text-gray-900 mb-6">Payment Method</h2>
              <div className="space-y-4">
                <label className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition ${formData.paymentMode === 'cod' ? 'border-ocean-blue bg-blue-50' : 'border-gray-200'}`}>
                  <input type="radio" name="payment" checked={formData.paymentMode === 'cod'} onChange={() => updateForm('paymentMode', 'cod')} className="mr-4 h-5 w-5 text-ocean-blue focus:ring-ocean-blue outline-none" />
                  <Banknote className="text-gray-500 mr-3" />
                  <div>
                    <div className="font-semibold text-gray-900">Cash on Delivery</div>
                    <div className="text-sm text-gray-500">Pay when your fresh catch arrives</div>
                  </div>
                </label>
                <label className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition ${formData.paymentMode === 'online' ? 'border-ocean-blue bg-blue-50' : 'border-gray-200'}`}>
                  <input type="radio" name="payment" checked={formData.paymentMode === 'online'} onChange={() => updateForm('paymentMode', 'online')} className="mr-4 h-5 w-5 text-ocean-blue focus:ring-ocean-blue outline-none" />
                  <CreditCard className="text-gray-500 mr-3" />
                  <div>
                    <div className="font-semibold text-gray-900">UPI / Card / Netbanking</div>
                    <div className="text-sm text-gray-500">Pay securely online right now</div>
                  </div>
                </label>
              </div>
            </div>
            
            {/* Hidden Submit for Enter Key */}
            <button type="submit" className="hidden">Submit</button>

          </form>
          
          {/* Summary Panel */}
          <div className="w-full lg:w-96">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24 border border-gray-100">
              <h2 className="text-xl font-poppins font-bold text-gray-900 mb-6">Order Total</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Cart Items ({cart.length})</span>
                  <span className="font-medium text-gray-900">₹{itemTotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery fee</span>
                  <span className="font-medium text-gray-900">
                    {deliveryCharge === 0 ? <span className="text-fresh-green">Free</span> : `₹${deliveryCharge}`}
                  </span>
                </div>
              </div>
              
              <div className="border-t border-gray-100 pt-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Amount to Pay</span>
                  <span className="text-2xl font-bold text-ocean-blue">₹{grandTotal}</span>
                </div>
              </div>
              
              <button 
                onClick={handlePlaceOrder}
                disabled={validationStage !== 'valid'}
                className={`w-full py-4 rounded-xl font-bold text-lg transition flex justify-center items-center shadow-lg ${validationStage === 'valid' ? 'bg-ocean-blue hover:bg-blue-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              >
                Place Order
              </button>
              {validationStage !== 'valid' && (
                <p className="text-center text-sm text-gray-500 mt-4">Please verify PIN code to enable placing order.</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
