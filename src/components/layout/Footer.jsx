import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand & About */}
          <div>
            <h3 className="font-poppins font-bold text-2xl mb-4 text-white">Marine <span className="text-fresh-green">Souq</span></h3>
            <p className="text-gray-400 mb-6 font-inter text-sm leading-relaxed">
              Premium quality fresh fish and seafood delivered straight to your doorstep. We ensure quality, freshness, and the perfect catch every day.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-poppins font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3 font-inter text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-ocean-blue transition">About Us</Link></li>
              <li><Link to="/products" className="hover:text-ocean-blue transition">Fresh Fishes</Link></li>
              <li><Link to="/combos" className="hover:text-ocean-blue transition">Combo Packs</Link></li>
              <li><Link to="/offers" className="hover:text-ocean-blue transition">Special Offers</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-poppins font-semibold text-lg mb-4">Support</h4>
            <ul className="space-y-3 font-inter text-sm text-gray-400">
              <li><Link to="/faq" className="hover:text-ocean-blue transition">FAQ</Link></li>
              <li><Link to="/shipping" className="hover:text-ocean-blue transition">Delivery Info</Link></li>
              <li><Link to="/returns" className="hover:text-ocean-blue transition">Returns & Refunds</Link></li>
              <li><Link to="/contact" className="hover:text-ocean-blue transition">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-poppins font-semibold text-lg mb-4">Contact Info</h4>
            <ul className="space-y-4 font-inter text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <span>123 Marine Drive, Coastal Avenue, City, State 12345</span>
              </li>
              <li className="flex items-center gap-3">
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <span>support@marinesouq.com</span>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Marine Souq. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
