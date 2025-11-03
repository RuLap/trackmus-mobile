import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';

interface UseToast {
  showSuccess: (message: string, description?: string) => void;
  showError: (message: string, description?: string) => void;
  showInfo: (message: string, description?: string) => void;
  handleApiError: (error: unknown) => void;
  hide: () => void;
}

export const useToast = (): UseToast => {
  const { t } = useTranslation();

  const showSuccess = useCallback((message: string, description?: string) => {
    Toast.show({
      type: 'success',
      text1: message,
      text2: description,
      visibilityTime: 2500,
    });
  }, []);

  const showError = useCallback((message: string, description?: string) => {
    Toast.show({
      type: 'error',
      text1: message,
      text2: description,
      visibilityTime: 5000,
    });
  }, []);

  const showInfo = useCallback((message: string, description?: string) => {
    Toast.show({
      type: 'info',
      text1: message,
      text2: description,
      visibilityTime: 3500,
    });
  }, []);

  const handleApiError = useCallback(
    (error: unknown) => {
      let message = t('common.error');

      if (error instanceof Error) message = error.message;
      else if (typeof error === 'string') message = error;
      else if ((error as any)?.response?.data?.message)
        message = (error as any).response.data.message;

      showError('Ошибка', message);
    },
    [showError]
  );  

  return {
    showSuccess,
    showError,
    showInfo,
    handleApiError,
    hide: Toast.hide,
  };
};
