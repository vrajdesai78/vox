import { create } from 'zustand';

export interface ExploreItem {
  id: number;
  title: string;
  bgImage: string;
}

interface ExploreState {
  items: ExploreItem[];
  showAll: boolean;
  isLoading: boolean;
  error: string | null;
  setItems: (items: ExploreItem[]) => void;
  toggleShowAll: () => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useExploreStore = create<ExploreState>((set) => ({
  items: [],
  showAll: false,
  isLoading: false,
  error: null,
  setItems: (items) => set({ items }),
  toggleShowAll: () => set((state) => ({ showAll: !state.showAll })),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));