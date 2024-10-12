import events from "@/utils/events";
import buy from "@/utils/buy";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface SellItem {
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

interface SellState {
  items: SellItem[];
  isLoading: boolean;
  error: string | null;
  fetchItems: () => Promise<void>;
}

export const useSellStore = create<SellState>()(
  devtools((set) => ({
    items: [],
    isLoading: false,
    error: null,
    fetchItems: async () => {
      set({ isLoading: true });
      try {
        const data = events;
        set({ items: data, isLoading: false });
      } catch (error) {
        set({ error: "Failed to fetch sell items", isLoading: false });
      }
    },
  }))
);

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
        const data = buy;
        set({ items: data, isLoading: false });
      } catch (error) {
        set({ error: "Failed to fetch buy items", isLoading: false });
      }
    },
  }))
);

interface CheckoutItem {
  eventId: number;
  eventTitle: string;
  showDate: string;
  showTime: string;
  ticketSection: string;
  ticketRow: string;
  quantity: number;
  totalPrice: number;
  currency: string;
}

interface CheckoutState {
  items: CheckoutItem[];
  addToCheckout: (item: CheckoutItem) => void;
  removeFromCheckout: (eventId: number) => void;
  clearCheckout: () => void;
}

export const useCheckoutStore = create<CheckoutState>((set) => ({
  items: [],
  addToCheckout: (item) => set((state) => ({ 
    items: [...state.items, item] 
  })),
  removeFromCheckout: (eventId) => set((state) => ({ 
    items: state.items.filter((item) => item.eventId !== eventId) 
  })),
  clearCheckout: () => set({ items: [] }),
}));