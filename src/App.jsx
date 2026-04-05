import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import FishListing from './pages/FishListing';
import FishDetail from './pages/FishDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Tracking from './pages/Tracking';
import Profile from './pages/Profile';
import PageScrollLayout, {
  ScrollProgressBar,
  SmoothScrollShell,
} from './components/motion/PageScrollLayout';

function App() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const withScrollEffect = (page) => <PageScrollLayout>{page}</PageScrollLayout>;

  return (
    <div className="min-h-screen bg-light-bg text-gray-900 font-inter">
      <ScrollProgressBar />
      <Navbar />
      <SmoothScrollShell>
        <main className={`relative overflow-hidden ${!isHome ? 'pt-28' : ''}`}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={withScrollEffect(<Home />)} />
              <Route path="/products" element={withScrollEffect(<FishListing />)} />
              <Route path="/products/:id" element={withScrollEffect(<FishDetail />)} />
              <Route path="/cart" element={withScrollEffect(<Cart />)} />
              <Route path="/checkout" element={withScrollEffect(<Checkout />)} />
              <Route path="/tracking" element={withScrollEffect(<Tracking />)} />
              <Route path="/account" element={withScrollEffect(<Profile />)} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </SmoothScrollShell>
    </div>
  );
}

export default App;
