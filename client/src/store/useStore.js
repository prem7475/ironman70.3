import { create } from 'zustand';

const useStore = create((set) => ({
  user: null,
  selectedCity: 'Select City',
  cart: [],
  searchQuery: '',
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
  setSelectedCity: (city) => set({ selectedCity: city }),
  addToCart: (item) => set((state) => {
    const existingItem = state.cart.find((i) => i.id === item.id);
    if (existingItem) {
      return {
        cart: state.cart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      };
    }
    return { cart: [...state.cart, { ...item, quantity: 1 }] };
  }),
  removeFromCart: (id) => set((state) => ({
    cart: state.cart.filter((i) => i.id !== id),
  })),
  clearCart: () => set({ cart: [] }),
  setSearchQuery: (query) => set({ searchQuery: query }),
}));

export default useStore;
