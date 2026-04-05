import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import useStore from '../../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import NavbarActions, { NavbarSearch } from './NavbarActions';

const HOME_HERO_ID = 'home-hero';

export default function Navbar() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const cart = useStore((state) => state.cart);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const updateNavbarState = () => {
      if (!isHomePage) {
        setIsScrolled(true);
        return;
      }

      const heroSection = document.getElementById(HOME_HERO_ID);

      if (!heroSection) {
        setIsScrolled(false);
        return;
      }

      const { top, bottom } = heroSection.getBoundingClientRect();
      const heroFullyOutOfView = top < 0 && bottom <= 0;
      setIsScrolled(heroFullyOutOfView);
    };

    updateNavbarState();
    window.addEventListener('scroll', updateNavbarState, { passive: true });
    window.addEventListener('resize', updateNavbarState);

    return () => {
      window.removeEventListener('scroll', updateNavbarState);
      window.removeEventListener('resize', updateNavbarState);
    };
  }, [isHomePage]);

  return (
    <nav className={`fixed top-0 z-50 w-full transition-all duration-500 ease-in-out ${isScrolled ? 'bg-[#049dea] py-3 md:py-4 shadow-xl pointer-events-auto' : 'pt-4 md:pt-6 pointer-events-none bg-transparent'}`}>
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex w-full items-center justify-between gap-4">
          
          {/* Brand & Desktop Links */}
          <div className="flex min-w-0 flex-1 items-center justify-start gap-3">
            <div className="pointer-events-auto hidden lg:flex items-center gap-1 rounded-[16px] border border-gray-200/50 bg-white/95 p-1.5 shadow-lg backdrop-blur-sm">
              <Link to="/" className="flex items-center gap-2 rounded-[12px] pl-4 pr-5 py-3 transition-colors hover:bg-gray-100">
                <span className="font-poppins font-bold text-lg md:text-xl text-black tracking-tight leading-none pt-0.5">
                  Marine<span className="text-ocean-blue ml-1">Souq</span>
                </span>
              </Link>

              <Link to="/" className="text-gray-700 hover:text-black hover:bg-gray-100 px-4 py-2 rounded-[10px] text-sm font-semibold transition-colors">Home</Link>
              <Link to="/products" className="text-gray-700 hover:text-black hover:bg-gray-100 px-4 py-2 rounded-[10px] text-sm font-semibold transition-colors">All Fishes</Link>
              <div className="ml-1 border-l border-gray-200 pl-2">
                <NavbarSearch className="flex items-center" inputClassName="min-w-[11rem] xl:min-w-[13rem]" />
              </div>
            </div>

            <div className="pointer-events-auto lg:hidden">
              <Link to="/" className="flex items-center gap-2 pl-4 pr-5 py-3 bg-white rounded-[14px] shadow-lg transition-colors">
                <span className="font-poppins font-bold text-lg md:text-xl text-black tracking-tight leading-none pt-0.5">
                  Marine<span className="text-ocean-blue ml-1">Souq</span>
                </span>
              </Link>
            </div>
          </div>

          {/* Right Area */}
          <div className="ml-auto flex flex-shrink-0 items-center justify-end gap-2 md:gap-3 pointer-events-auto">
            <NavbarSearch className="hidden sm:flex lg:hidden items-center" inputClassName="min-w-[8rem] md:min-w-[10rem]" />
            <NavbarActions cartCount={cartCount} />

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden bg-white/95 backdrop-blur-sm text-gray-800 p-3 rounded-[14px] shadow-sm border border-gray-200/50 hover:bg-gray-50 flex-shrink-0"
            >
              <Menu size={20} />
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-40 lg:hidden pointer-events-auto backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 left-0 w-[280px] h-screen bg-white shadow-2xl z-50 lg:hidden flex flex-col pointer-events-auto"
            >
              <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-white">
                <span className="font-poppins font-bold text-xl text-ocean-blue tracking-tight">Marine <span className="text-fresh-green">Souq</span></span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500 hover:text-red-500 bg-gray-50 p-2 rounded-lg">
                  <X size={20} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto py-5">
                <ul className="space-y-2 px-4">
                  <li>
                    <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-ocean-blue rounded-xl font-medium transition">Home</Link>
                  </li>
                  <li>
                    <Link to="/products" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-ocean-blue rounded-xl font-medium transition">All Fishes</Link>
                  </li>
                  <li>
                    <Link to="/account" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-ocean-blue rounded-xl font-medium transition">My Account</Link>
                  </li>
                </ul>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
