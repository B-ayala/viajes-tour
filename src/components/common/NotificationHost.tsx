import { Snackbar, Alert } from '@mui/material';
import { useNotificationStore } from '@/store/notificationStore';

export const NotificationHost = () => {
  const { current, dismiss } = useNotificationStore();

  return (
    <Snackbar
      open={!!current}
      autoHideDuration={3500}
      onClose={dismiss}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      {current ? (
        <Alert
          onClose={dismiss}
          severity={current.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {current.message}
        </Alert>
      ) : undefined}
    </Snackbar>
  );
};
