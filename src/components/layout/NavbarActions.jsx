import { useEffect, useState } from 'react';
import { Search, ShoppingCart, User } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export function NavbarSearch({
  className = 'flex items-center',
  inputClassName = 'min-w-[10rem]',
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (location.pathname !== '/products') {
      return;
    }

    const params = new URLSearchParams(location.search);
    setSearchTerm(params.get('search') ?? '');
  }, [location.pathname, location.search]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const trimmedSearch = searchTerm.trim();
    const params = new URLSearchParams();

    if (trimmedSearch) {
      params.set('search', trimmedSearch);
    }

    navigate({
      pathname: '/products',
      search: params.toString() ? `?${params.toString()}` : '',
    });
  };

  return (
    <form onSubmit={handleSearchSubmit} className={className}>
      <div className="flex items-center gap-2 rounded-[14px] bg-gray-50 px-4 py-2.5 transition focus-within:bg-white focus-within:ring-2 focus-within:ring-[#66CCFF]">
        <Search size={18} className="text-gray-400" />
        <input
          type="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search fish"
          className={`${inputClassName} bg-transparent text-sm font-medium text-gray-700 outline-none placeholder:text-gray-400`}
        />
        <button
          type="submit"
          className="rounded-full bg-[#66CCFF] px-3 py-1.5 text-xs font-semibold text-slate-950 transition hover:bg-[#4dc4ff]"
        >
          Go
        </button>
      </div>
    </form>
  );
}

export default function NavbarActions({ cartCount }) {
  const navigate = useNavigate();

  return (
    <div className="pointer-events-auto flex items-center gap-2 rounded-[18px] border border-gray-200/60 bg-white/95 px-2 py-1.5 shadow-lg backdrop-blur-sm">

      <button
        type="button"
        onClick={() => navigate('/products')}
        aria-label="Search fishes"
        className="flex sm:hidden rounded-[14px] p-3 text-gray-600 transition hover:bg-gray-100 hover:text-ocean-blue"
      >
        <Search size={18} />
      </button>

      <Link
        to="/account"
        aria-label="Profile"
        className="rounded-[14px] p-3 text-gray-600 transition hover:bg-gray-100 hover:text-ocean-blue"
      >
        <User size={18} />
      </Link>

      <Link
        to="/cart"
        className="flex items-center gap-2 rounded-[18px] bg-[#22c55e] px-4 py-3 text-sm font-bold text-black transition hover:bg-[#16a34a]"
      >
        <span className="pt-0.5 whitespace-nowrap">Cart</span>
        <ShoppingCart size={16} className="text-black/80" />
        {cartCount > 0 && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white">
            {cartCount}
          </span>
        )}
      </Link>
    </div>
  );
}
