import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Truck, Fish, PackageCheck, Star, MapPinned } from 'lucide-react';
import { fishes } from '../data/mockData';
import LocationSelector from '../components/LocationSelector';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Home() {
  const freshToday = fishes.filter(f => f.isFreshToday);
  const softOceanGradient = 'bg-gradient-to-r from-white via-[#f4fbff] to-[#e3f5ff]';
  const lightOceanGradient = 'bg-gradient-to-r from-[#eef9ff] via-[#f8fcff] to-[#dff3ff]';
  const deepOceanGradient = 'bg-gradient-to-r from-[#031521] via-[#03456a] to-[#049dea]';

  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero Section */}
      <section id="home-hero" className="relative bg-slate-950 text-white py-24 sm:py-32 overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src="/hero-background.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-[#049dea]/92 via-[#026c9f]/74 to-[#01486c]/76"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" animate="visible" variants={fadeIn}>
              <h1 className="text-5xl sm:text-6xl font-poppins font-bold leading-tight mb-6">
                Fresh Fish Delivered to Your Door
              </h1>
              <p className="text-xl sm:text-2xl text-blue-100 mb-8 font-inter">
                Premium seafood straight from the ocean to you. Delivery within 7km radius.
              </p>
              <div className="flex gap-4">
                <Link to="/products" className="bg-accent-orange hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition shadow-lg inline-block">
                  Order Now
                </Link>
                <a href="#how-it-works" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold text-lg transition inline-block">
                  How It Works
                </a>
              </div>
            </motion.div>
            
            {/* Hero Animation Placeholder */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block relative h-96 w-full"
            >
              <img src="https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=800&q=80" alt="Fresh Fish Plate" className="w-full h-full object-cover rounded-2xl shadow-2xl rotate-3 my-auto" />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl flex items-center gap-4 text-gray-900">
                <div className="bg-fresh-green text-white p-3 rounded-full"><Truck size={24}/></div>
                <div><p className="font-bold font-poppins">Express Delivery</p><p className="text-sm font-inter text-gray-500">Under 60 Minutes</p></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Today's Catch */}
      <section className={`py-20 ${softOceanGradient}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LocationSelector className="mb-10" />
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-poppins font-bold text-gray-900 mb-2">Today's Catch</h2>
              <p className="text-gray-500">Fresh from the harbor today morning</p>
            </div>
            <Link to="/products" className="text-ocean-blue font-semibold hover:underline">View All</Link>
          </motion.div>
          
          <div className="flex overflow-x-auto gap-6 pb-8 snap-x scrollbar-hide lg:grid lg:grid-cols-4">
            {freshToday.map((fish) => (
              <motion.div key={fish.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="min-w-[280px] lg:min-w-0 bg-light-bg rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition flex-shrink-0 snap-center relative border border-gray-100">
                <span className="absolute top-4 left-4 bg-fresh-green text-white text-xs font-bold px-3 py-1 rounded-full z-10 w-fit">Fresh Today</span>
                <div className="h-48 overflow-hidden">
                  <img src={fish.image} alt={fish.name} className="w-full h-full object-cover hover:scale-110 transition duration-500" />
                </div>
                <div className="p-5">
                  <h3 className="font-poppins font-semibold text-lg text-gray-900">{fish.name}</h3>
                  <div className="flex items-center gap-2 mt-2 mb-4">
                    <span className="text-xl font-bold text-ocean-blue">Rs. {fish.discountedPrice || fish.pricePerKg}</span>
                    {fish.discountedPrice && <span className="text-sm text-gray-400 line-through">Rs. {fish.pricePerKg}</span>}
                    <span className="text-xs text-gray-500">/ kg</span>
                  </div>
                  <Link to={`/products/${fish.id}`} className="block w-full text-center bg-gray-900 hover:bg-ocean-blue text-white py-2.5 rounded-xl font-medium transition">
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className={`py-20 ${lightOceanGradient}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-poppins font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600">Get fresh fish delivered to your home in just three simple steps.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <Fish size={48} className="text-ocean-blue"/>, title: 'Choose Fish', desc: 'Browse our selection of daily fresh catch and premium seafood.' },
              { icon: <PackageCheck size={48} className="text-fresh-green"/>, title: 'We Pack Fresh', desc: 'Expertly cleaned, cut to your preference, and packed hygienically.' },
              { icon: <Truck size={48} className="text-accent-orange"/>, title: 'Delivered Fast', desc: 'Quick 7km radius delivery ensuring ice-cold freshness upon arrival.' }
            ].map((step, idx) => (
              <motion.div key={idx} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: idx * 0.2 }} variants={fadeIn} className="bg-white p-8 rounded-3xl shadow-sm text-center border border-gray-100 hover:border-ocean-blue transition">
                <div className="bg-light-bg w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                  {step.icon}
                </div>
                <h3 className="font-poppins font-semibold text-xl text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-500">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Combo Packs */}
      {/* <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-poppins font-bold text-gray-900 mb-4">Value Combo Packs</h2>
            <p className="text-gray-600">Perfectly curated seafood combination packs for your family meals or weekend parties.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {comboPacks.map((combo) => (
              <motion.div key={combo.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="flex flex-col sm:flex-row bg-light-bg rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition">
                <div className="sm:w-2/5 h-48 sm:h-auto overflow-hidden">
                  <img src={combo.image} alt={combo.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 sm:w-3/5 flex flex-col justify-between">
                  <div>
                    <h3 className="font-poppins font-bold text-xl text-gray-900 mb-2">{combo.name}</h3>
                    <ul className="text-sm text-gray-600 space-y-1 mb-4 list-disc list-inside">
                      {combo.items.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      <span className="text-2xl font-bold text-ocean-blue">Rs. {combo.price}</span>
                      <span className="text-sm text-gray-400 line-through ml-2">Rs. {combo.originalPrice}</span>
                    </div>
                    <Link to={`/combos/${combo.id}`} className="bg-gray-900 hover:bg-ocean-blue text-white px-5 py-2 rounded-xl transition font-medium">Add</Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Delivery Area Section */}
      <section className={`py-20 ${deepOceanGradient} text-white relative overflow-hidden`}>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 opacity-10">
          <MapPinned size={400} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <h2 className="text-4xl font-poppins font-bold mb-6">Checking Delivery?</h2>
              <p className="text-lg text-gray-300 mb-8 font-inter">
                To guarantee maximum freshness, we currently deliver within a <span className="text-fresh-green font-bold">7KM radius</span> from our processing center. Enter your location to see if we can reach you.
              </p>
              <div className="flex bg-white rounded-full p-2 max-w-md">
                <input type="text" placeholder="Enter PIN code or Area" className="flex-1 bg-transparent border-none focus:outline-none px-4 text-gray-900" />
                <button className="bg-accent-orange hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold transition">Check</button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className={`py-20 ${softOceanGradient}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-poppins font-bold text-gray-900 mb-4">Happy Customers</h2>
            <p className="text-gray-600">See what our community has to say about our freshness.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1,2,3].map((i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }} variants={fadeIn} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex text-accent-orange mb-4">
                  {[...Array(5)].map((_, idx) => <Star key={idx} size={18} fill="currentColor" />)}
                </div>
                <p className="text-gray-600 italic mb-6">"The Seer fish I ordered was incredibly fresh. The custom cut was exactly as requested, and it arrived tightly packed in ice under 45 minutes!"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">U{i}</div>
                  <div>
                    <h4 className="font-poppins font-semibold text-gray-900">User {i}</h4>
                    <p className="text-sm text-gray-500">Verified Buyer</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
    </div>
  );
}
