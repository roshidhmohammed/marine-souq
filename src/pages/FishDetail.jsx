import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Minus, Plus, ShoppingCart } from 'lucide-react';
import { fishes } from '../data/mockData';
import useStore from '../store/useStore';

export default function FishDetail() {
  const { id } = useParams();
  const fish = fishes.find(f => f.id === id);
  const addToCart = useStore(state => state.addToCart);

  const [quantity, setQuantity] = useState(1);
  const [selectedCleaning, setSelectedCleaning] = useState(fish?.cleaningOptions[0] || 'Whole');

  if (!fish) {
    return <div className="p-20 text-center text-xl">Fish not found!</div>;
  }

  const handleAddToCart = () => {
    addToCart({ 
      ...fish, 
      quantity, 
      cleaningOption: selectedCleaning, 
      cartItemId: Date.now() 
    });
    alert('Added to cart!');
  };

  return (
    <div className="bg-white min-h-screen pb-24 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <Link to="/products" className="inline-flex items-center text-gray-500 hover:text-ocean-blue mb-8 transition">
          <ChevronLeft size={20} />
          <span>Back to Fishes</span>
        </Link>
        
        <div className="flex flex-col md:flex-row gap-12">
          {/* Image */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:w-1/2"
          >
            <div className="rounded-3xl overflow-hidden shadow-lg relative h-96 md:h-[500px]">
              {fish.isFreshToday && (
                 <span className="absolute top-6 left-6 bg-fresh-green text-white text-sm font-bold px-4 py-2 rounded-full z-10 w-fit">Fresh Today</span>
              )}
              <img src={fish.image} alt={fish.name} className="w-full h-full object-cover" />
            </div>
          </motion.div>
          
          {/* Details */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:w-1/2 flex flex-col pt-4"
          >
            <h1 className="text-4xl font-poppins font-bold text-gray-900 mb-4">{fish.name}</h1>
            
            <div className="flex items-end gap-3 mb-6 relative">
              <span className="text-4xl font-bold text-ocean-blue">₹{fish.discountedPrice || fish.pricePerKg}</span>
              {fish.discountedPrice && <span className="text-xl text-gray-400 line-through mb-1">₹{fish.pricePerKg}</span>}
              <span className="text-gray-500 mb-1">/ kg</span>
            </div>
            
            <p className="text-lg text-gray-600 mb-8 font-inter leading-relaxed">{fish.description}</p>
            
            {/* Cleaning Options */}
            <div className="mb-8">
              <h3 className="font-poppins font-semibold text-lg text-gray-900 mb-4">Cleaning & Cut Preference</h3>
              <div className="flex flex-wrap gap-3">
                {fish.cleaningOptions.map(option => (
                  <button 
                    key={option}
                    onClick={() => setSelectedCleaning(option)}
                    className={`px-5 py-3 rounded-xl border-2 font-medium transition ${selectedCleaning === option ? 'border-ocean-blue bg-blue-50 text-ocean-blue' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Quantity */}
            <div className="mb-10">
              <h3 className="font-poppins font-semibold text-lg text-gray-900 mb-4">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-1">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 text-gray-500 hover:text-black">
                    <Minus size={20} />
                  </button>
                  <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-3 text-gray-500 hover:text-black">
                    <Plus size={20} />
                  </button>
                </div>
                <span className="text-gray-500 mt-1">Total: {quantity} kg</span>
              </div>
            </div>
            
            {/* Add to Cart Desktop */}
            <div className="hidden sm:block mt-auto">
              <button 
                onClick={handleAddToCart}
                className="w-full bg-ocean-blue hover:bg-blue-700 text-white py-4 rounded-2xl font-bold text-xl transition flex justify-center items-center gap-3 shadow-lg hover:shadow-xl"
              >
                <ShoppingCart size={24} />
                Add to Cart - ₹{(fish.discountedPrice || fish.pricePerKg) * quantity}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Sticky Bottom CTA Mobile */}
      <div className="sm:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 z-50 flex gap-4">
        <div className="flex flex-col justify-center">
          <span className="text-xs text-gray-500 font-medium">Total Price</span>
          <span className="text-xl font-bold text-ocean-blue">₹{(fish.discountedPrice || fish.pricePerKg) * quantity}</span>
        </div>
        <button 
          onClick={handleAddToCart}
          className="flex-1 bg-ocean-blue text-white py-3 rounded-xl font-bold transition flex justify-center items-center gap-2 shadow-lg"
        >
          <ShoppingCart size={20} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
