import { useEffect, useMemo, useRef, useState } from 'react';
import type { QuotationInput, QuotationResult } from '@/types';
import { quote, QuotationError } from '@/services/quotationService';

interface UseQuotationState {
  result: QuotationResult | null;
  error: string | null;
  isComputing: boolean;
}

/**
 * Recalcula la cotización cuando cambian los inputs.
 * Debounce implícito via useEffect sin bloquear UI. Si querés agregar retraso,
 * envolver `input` con un `useDebouncedValue`.
 */
export const useQuotation = (input: QuotationInput | null): UseQuotationState => {
  const [state, setState] = useState<UseQuotationState>({
    result: null,
    error: null,
    isComputing: false,
  });

  const stableKey = useMemo(() => (input ? JSON.stringify(input) : null), [input]);
  const lastKey = useRef<string | null>(null);

  useEffect(() => {
    if (!input || !stableKey) return;
    if (stableKey === lastKey.current) return;
    lastKey.current = stableKey;

    setState((s) => ({ ...s, isComputing: true }));
    try {
      const result = quote(input);
      setState({ result, error: null, isComputing: false });
    } catch (err) {
      const message =
        err instanceof QuotationError ? err.message : 'Error inesperado al cotizar.';
      setState({ result: null, error: message, isComputing: false });
    }
  }, [stableKey, input]);

  return state;
};
