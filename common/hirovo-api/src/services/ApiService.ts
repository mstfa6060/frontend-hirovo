// @services/ApiService.ts
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { api } from '@config/hirovo-config';
import { TokenManager } from './TokenManager';
import i18next from 'i18next';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import crashlytics from '@react-native-firebase/crashlytics';
import { CommonActions } from '@react-navigation/native';
import { navigationRef } from '../../../../src/navigation/navigationRef';

export class ApiService {
  // Enhanced error logging with Crashlytics
  private static logApiError(error: any, context: string, additionalData?: any) {
    console.error(`🚨 API Error [${context}]:`, error);

    // Log to Crashlytics - ensure error is Error instance
    const errorToLog = error instanceof Error ? error : new Error(
      typeof error === 'string' ? error :
        error?.message ||
        JSON.stringify(error) ||
        'Unknown API Error'
    );
    crashlytics().recordError(errorToLog);

    // Set context attributes
    crashlytics().setAttributes({
      'api_error': 'true',
      'context': context,
      'error_type': error?.response?.status ? 'http_error' : 'network_error',
      'status_code': error?.response?.status?.toString() || 'unknown',
      'url': error?.config?.url || 'unknown',
      'method': error?.config?.method || 'unknown',
      'timestamp': new Date().toISOString(),
      ...(additionalData || {})
    });

    // Set user context if available
    AsyncStorage.getItem('jwt').then(token => {
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          crashlytics().setUserId(payload.userId || 'unknown');
          crashlytics().setAttributes({
            'user_id': payload.userId || 'unknown',
            'company_id': payload.companyId || 'unknown'
          });
        } catch (e) {
          console.warn('Could not parse JWT for user context');
        }
      }
    });
  }

  static async call<T>(
    promise: Promise<AxiosResponse<{ payload: T; error: any; hasError: boolean }>>
  ): Promise<T> {
    try {
      const response = await promise;

      const { hasError, error, payload } = response.data;

      if (hasError) {
        const backendKey = error?.code || error?.message;

        const errorMessage = backendKey
          ? i18next.t(`error.${backendKey}`, `⚠ ${backendKey}`)
          : i18next.t('ui.common.unknownError');

        // Log backend error to Crashlytics
        this.logApiError(error, 'backend_error', {
          'backend_error_code': backendKey,
          'backend_error_message': error?.message,
          'response_status': 'hasError_true'
        });

        Alert.alert(i18next.t('common.errorTitle'), errorMessage);

        const enrichedError = new Error(errorMessage);
        (enrichedError as any).original = error;
        throw enrichedError;
      }

      return payload;
    } catch (err: any) {
      if (err?.response?.status === 401) {
        const expired = await TokenManager.isTokenExpired();

        if (expired) {
          console.log('🔐 Token expired, attempting to refresh...');

          const newJwt = await TokenManager.refreshToken();
          if (newJwt) {
            const retryConfig = err.config;
            retryConfig.headers['Authorization'] = `Bearer ${newJwt}`;
            const retryResponse = await api.request(retryConfig);
            return retryResponse.data.payload;
          }

          // Refresh başarısız → kullanıcıyı Login'e yönlendir
          await AsyncStorage.multiRemove(['jwt', 'refreshToken', 'sessionExpirationDate']);
          if (navigationRef.isReady()) {
            navigationRef.dispatch(
              CommonActions.reset({ index: 0, routes: [{ name: 'Login' as never }] })
            );
          }
          const authError = new Error('SessionExpired');
          (authError as any).code = 'SESSION_EXPIRED';
          throw authError;
        } else {
          console.warn('🔁 401 geldi ama token süresi dolmamış. Muhtemelen token backend tarafından geçersiz sayıldı.');
          // Geçersiz token → temizle ve Login'e yönlendir
          await AsyncStorage.multiRemove(['jwt', 'refreshToken', 'sessionExpirationDate']);
          if (navigationRef.isReady()) {
            navigationRef.dispatch(
              CommonActions.reset({ index: 0, routes: [{ name: 'Login' as never }] })
            );
          }
          const invalidError = new Error('InvalidToken');
          (invalidError as any).code = 'INVALID_TOKEN';
          throw invalidError;
        }
      }

      // Log network/general errors to Crashlytics
      this.logApiError(err, 'network_error', {
        'error_message': err?.message,
        'error_name': err?.name,
        'network_error': 'true'
      });

      throw err;
    }
  }

  // ✅ Yeni: multipart/form-data destekleyen çağrı
  static async callMultipart<T>(
    url: string,
    formData: FormData,
    config: AxiosRequestConfig = {}
  ): Promise<T> {
    const token = await AsyncStorage.getItem('jwt');
    const response = await axios.post(url, formData, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
        ...(config.headers || {}),
      },
    });

    const { hasError, error, payload } = response.data;

    if (hasError) {
      const backendKey = error?.code || error?.message;
      const errorMessage = backendKey
        ? i18next.t(`error.${backendKey}`, `⚠ ${backendKey}`)
        : i18next.t('ui.common.unknownError');

      // Log multipart error to Crashlytics
      this.logApiError(error, 'multipart_error', {
        'backend_error_code': backendKey,
        'backend_error_message': error?.message,
        'multipart_upload': 'true'
      });

      Alert.alert(i18next.t('common.errorTitle'), errorMessage);

      const enrichedError = new Error(errorMessage);
      (enrichedError as any).original = error;
      throw enrichedError;
    }

    return payload;
  }
}
