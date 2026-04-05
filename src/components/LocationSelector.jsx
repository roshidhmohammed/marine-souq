import { MapPin } from 'lucide-react';

export default function LocationSelector({ className = '' }) {
  return (
    <div className={`rounded-[28px] border border-sky-100 bg-gradient-to-r from-white via-[#f2fbff] to-[#e7f7ff] p-5 sm:p-6 shadow-sm ${className}`}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ocean-blue/70">
            Delivery Zone
          </p>
          <h3 className="mt-2 font-poppins text-2xl font-semibold text-gray-900">
            Select your location
          </h3>
          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Check delivery availability and ETA for your area before you order.
          </p>
        </div>

        <button className="inline-flex items-center justify-center gap-2 rounded-full bg-[#66CCFF] px-5 py-3 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-[#4dc4ff]">
          <MapPin size={18} />
          <span>Select Location</span>
        </button>
      </div>
    </div>
  );
}
