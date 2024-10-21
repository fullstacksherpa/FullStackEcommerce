import { create } from "zustand";

export const useCart = create((set) => ({
  items: [],

  addProduct: (product: any) =>
    //if already in cart increase quantity else add new item
    set((state) => ({
      items: [...state.items, { product, quantity: 1 }],
    })),

  resetCart: () => set({ items: [] }),
}));
