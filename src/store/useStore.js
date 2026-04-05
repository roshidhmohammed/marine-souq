import { create } from 'zustand';

const useStore = create((set) => ({
  cart: [],
  userLocation: null, // { address: '', distance: 0, pincode: '' }
  
  addToCart: (item) => set((state) => {
    const existing = state.cart.find(i => i.id === item.id && i.cleaningOption === item.cleaningOption);
    if (existing) {
      return {
        cart: state.cart.map(i => 
          (i.id === item.id && i.cleaningOption === item.cleaningOption) 
            ? { ...i, quantity: i.quantity + item.quantity } 
            : i
        )
      };
    }
    return { cart: [...state.cart, item] };
  }),
  
  removeFromCart: (cartItemId) => set((state) => ({
    cart: state.cart.filter(i => i.cartItemId !== cartItemId)
  })),

  updateQuantity: (cartItemId, amount) => set((state) => ({
    cart: state.cart.map(i => {
      if (i.cartItemId === cartItemId) {
        const newQty = i.quantity + amount;
        return { ...i, quantity: newQty > 0 ? newQty : 1 };
      }
      return i;
    })
  })),

  clearCart: () => set({ cart: [] }),
  
  setUserLocation: (location) => set({ userLocation: location }),
}));

export default useStore;
