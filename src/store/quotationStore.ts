import { create } from 'zustand';
import type { QuotationInput, QuotationResult } from '@/types';

interface QuotationState {
  input: QuotationInput | null;
  result: QuotationResult | null;
  setQuotation: (input: QuotationInput, result: QuotationResult) => void;
  clear: () => void;
}

export const useQuotationStore = create<QuotationState>((set) => ({
  input: null,
  result: null,
  setQuotation: (input, result) => set({ input, result }),
  clear: () => set({ input: null, result: null }),
}));
