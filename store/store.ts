import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface SellItem {
  id: number;
  title: string;
  bgImage: string;
}

interface SellState {
  items: SellItem[];
  showAll: boolean;
  isLoading: boolean;
  error: string | null;
  setItems: (items: SellItem[]) => void;
  toggleShowAll: () => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useSellStore = create<SellState>((set) => ({
  items: [],
  showAll: false,
  isLoading: false,
  error: null,
  setItems: (items) => set({ items }),
  toggleShowAll: () => set((state) => ({ showAll: !state.showAll })),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));

export interface BuyItem {
  id: number;
  title: string;
  bgImage: string;
  description: string;
  location: string;
  dateRange: string;
  trending: {
    status: boolean;
    metric: string;
  };
  shows: Array<{
    date: string;
    day: string;
    time: string;
    price: number;
    currency: string;
    bestSelling?: boolean;
  }>;
  mostSoldTickets: Array<{
    section: string;
    row: string;
    view: string;
    remaining: number;
  }>;
  otherLocations: string[];
}

interface BuyState {
  items: BuyItem[];
  isLoading: boolean;
  error: string | null;
  fetchItems: () => Promise<void>;
}

export const useBuyStore = create<BuyState>()(
  devtools((set) => ({
    items: [],
    isLoading: false,
    error: null,
    fetchItems: async () => {
      set({ isLoading: true });
      try {
        const response = await fetch('/api/buy');
        const data = await response.json();
        set({ items: data, isLoading: false });
      } catch (error) {
        set({ error: 'Failed to fetch buy items', isLoading: false });
      }
    },
  }))
);