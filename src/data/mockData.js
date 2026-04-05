export const fishes = [
  {
    id: 'f1',
    name: 'Seer Fish (Vanjaram)',
    pricePerKg: 950,
    discountedPrice: 899,
    description: 'Premium quality seer fish, rich in Omega-3 and perfect for frying or curries. Sourced fresh daily.',
    category: 'popular',
    isFreshToday: true,
    image: 'https://t3.ftcdn.net/jpg/05/88/60/84/360_F_588608430_HHtPaMouENJ3pIEM9I5ytlHVJYfSB3vD.jpg',
    cleaningOptions: ['Whole', 'Curry cut', 'Fry cut', 'Cleaned & Gutted']
  },
  {
    id: 'f2',
    name: 'Indian Salmon (Rawas)',
    pricePerKg: 850,
    description: 'Delicious white meat fish with minimal bones. Ideal for tandoori or steamed preparations.',
    category: 'popular',
    isFreshToday: false,
    image: 'https://bombayfreshfish.com/wp-content/uploads/2022/10/Rawas-main-LR.jpg',
    cleaningOptions: ['Whole', 'Curry cut', 'Fry cut', 'Fillet']
  },
  {
    id: 'f3',
    name: 'Silver Pomfret (Vavval)',
    pricePerKg: 1200,
    description: 'Highly sought out fish known for its soft texture and buttery taste. Excellent for frying.',
    category: 'premium',
    isFreshToday: true,
    image: 'https://assets.tendercuts.in/product/S/F/0137cf3f-1d29-46b5-aa2e-bd43bc72998e.jpg',
    cleaningOptions: ['Whole', 'Cleaned & Gutted']
  },
  {
    id: 'f4',
    name: 'Mackerel (Ayala)',
    pricePerKg: 350,
    description: 'Flavorful and nutritious fish, highly popular for daily meals and flavorful tangy curries.',
    category: 'daily',
    isFreshToday: true,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3_RCpzp-3k1xqrbbeHksDhvsFCY7gdLC_8hdu7x2yLdDVQ2PTUkaciDkN7glivfAMM50rtY_h-NcYf-qiE-FcNB_vgbCAvLIcXJ9pAu0&s=10',
    cleaningOptions: ['Whole', 'Curry cut']
  },
  {
    id: 'f5',
    name: 'Tiger Prawns (Iral)',
    pricePerKg: 1100,
    description: 'Large, succulent tiger prawns perfect for biryanis, grilling, or rich gravies.',
    category: 'popular',
    isFreshToday: true,
    image: 'https://t3.ftcdn.net/jpg/00/04/90/12/360_F_4901246_t2dvSSePyn0H8ZyCsxi1iStu9mLUtKGd.jpg',
    cleaningOptions: ['With Shell', 'Peeled & Deveined', 'Tail-on Cleaned']
  },
  {
    id: 'f6',
    name: 'Crab (Nandu)',
    pricePerKg: 650,
    description: 'Fresh sea crabs full of sweet, tender meat. Famous for spicy Chettinad crab roast.',
    category: 'weekend',
    isFreshToday: false,
    image: 'https://www.bbassets.com/media/uploads/p/l/800345841_2-fish-land-crab-blue-nandu-khekada-edi.jpg',
    cleaningOptions: ['Whole', 'Cleaned & Halved']
  }
];

export const comboPacks = [
  {
    id: 'c1',
    name: 'Family Weekend Pack',
    price: 1800,
    originalPrice: 2100,
    items: ['1Kg Seer Fish (Fry cut)', '1Kg Tiger Prawns (Peeled)', '500g Crab (Cleaned)'],
    image: 'https://images.unsplash.com/photo-1553177595-4de2bb0842b9?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'c2',
    name: 'Daily Essentials Combo',
    price: 850,
    originalPrice: 950,
    items: ['1Kg Mackerel (Curry cut)', '1Kg Sardines (Cleaned)', '500g Anchovies'],
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80'
  }
];
