import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Filter, ShoppingCart, Fish } from 'lucide-react';
import { fishes } from '../data/mockData';
import useStore from '../store/useStore';
import LocationSelector from '../components/LocationSelector';

export default function FishListing() {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSearchTerm = searchParams.get('search') ?? '';
  const [searchTerm, setSearchTerm] = useState(urlSearchTerm);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const addToCart = useStore(state => state.addToCart);

  useEffect(() => {
    setSearchTerm(urlSearchTerm);
  }, [urlSearchTerm]);

  const handleSearchChange = (event) => {
    const nextSearchTerm = event.target.value;
    const nextSearchParams = new URLSearchParams(searchParams);

    setSearchTerm(nextSearchTerm);

    if (nextSearchTerm.trim()) {
      nextSearchParams.set('search', nextSearchTerm);
    } else {
      nextSearchParams.delete('search');
    }

    setSearchParams(nextSearchParams, { replace: true });
  };

  const filteredFishes = fishes.filter(fish => {
    const matchesSearch = fish.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || fish.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (e, fish) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ 
      ...fish, 
      quantity: 1, 
      cleaningOption: fish.cleaningOptions[0], 
      cartItemId: Date.now() 
    });
    alert('Added to cart!');
  };

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <LocationSelector className="mb-8" />
        
        {/* Header & Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div>
            <h1 className="text-4xl font-poppins font-bold text-gray-900 mb-2">Fresh Fishes</h1>
            <p className="text-gray-500">Select from our daily fresh catch</p>
          </div>
          
          <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
            <div className="relative flex-grow sm:w-64">
              <input 
                type="text" 
                placeholder="Search fish..." 
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-ocean-blue transition"
              />
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            
            <div className="flex gap-2 relative">
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none bg-gray-50 border border-gray-200 pl-10 pr-8 py-3 rounded-xl focus:outline-none focus:border-ocean-blue font-medium"
              >
                <option value="all">All Categories</option>
                <option value="popular">Popular</option>
                <option value="premium">Premium</option>
                <option value="daily">Daily Catch</option>
              </select>
              <Filter size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredFishes.length > 0 ? filteredFishes.map((fish, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: index * 0.1 }}
              key={fish.id} 
              className="bg-light-bg rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition group relative flex flex-col"
            >
              {fish.isFreshToday && (
                 <span className="absolute top-4 left-4 bg-fresh-green text-white text-xs font-bold px-3 py-1 rounded-full z-10 w-fit">Fresh Today</span>
              )}
              
              <Link to={`/products/${fish.id}`} className="h-56 overflow-hidden block">
                <img src={fish.image} alt={fish.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
              </Link>
              
              <div className="p-5 flex flex-col flex-grow">
                <Link to={`/products/${fish.id}`}>
                  <h3 className="font-poppins font-semibold text-lg text-gray-900 group-hover:text-ocean-blue transition">{fish.name}</h3>
                </Link>
                <div className="flex items-center gap-2 mt-2 mb-4">
                  <span className="text-xl font-bold text-ocean-blue">₹{fish.discountedPrice || fish.pricePerKg}</span>
                  {fish.discountedPrice && <span className="text-sm text-gray-400 line-through">₹{fish.pricePerKg}</span>}
                  <span className="text-xs text-gray-500">/ kg</span>
                </div>
                
                <button 
                  onClick={(e) => handleAddToCart(e, fish)}
                  className="mt-auto w-full bg-gray-900 hover:bg-ocean-blue text-white flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition"
                >
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
              </div>
            </motion.div>
          )) : (
            <div className="col-span-full py-20 text-center text-gray-500">
              <Fish size={64} className="mx-auto mb-4 opacity-50" />
              <p className="text-xl">No fishes found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
