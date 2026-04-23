import { create } from 'zustand';

export type NotificationSeverity = 'success' | 'info' | 'warning' | 'error';

export interface Notification {
  id: string;
  message: string;
  severity: NotificationSeverity;
}

interface NotificationState {
  current: Notification | null;
  notify: (message: string, severity?: NotificationSeverity) => void;
  dismiss: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  current: null,
  notify: (message, severity = 'info') =>
    set({ current: { id: crypto.randomUUID(), message, severity } }),
  dismiss: () => set({ current: null }),
}));
