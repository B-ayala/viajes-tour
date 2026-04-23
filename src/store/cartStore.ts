import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { QuotationResult } from '@/types';

export interface CartItem {
  id: string;
  packageId: string;
  title: string;
  image: string;
  result: QuotationResult;
  addedAt: number;
}

interface CartState {
  items: CartItem[];
  add: (item: Omit<CartItem, 'id' | 'addedAt'>) => string;
  remove: (id: string) => void;
  clear: () => void;
  total: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item) => {
        const id = crypto.randomUUID();
        set((s) => ({
          items: [...s.items, { ...item, id, addedAt: Date.now() }],
        }));
        return id;
      },
      remove: (id) =>
        set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      clear: () => set({ items: [] }),
      total: () => get().items.reduce((acc, i) => acc + i.result.total, 0),
    }),
    { name: 'yopi-cart' },
  ),
);
