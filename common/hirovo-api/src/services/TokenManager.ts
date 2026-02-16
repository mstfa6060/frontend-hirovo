import AsyncStorage from '@react-native-async-storage/async-storage';
import { IAMAPI } from '@api/base_modules/iam';
import axios from 'axios';

export const TokenManager = {
    isTokenExpired: async () => {
        const expiration = await AsyncStorage.getItem('sessionExpirationDate');
        if (!expiration) return true;

        const now = new Date();
        const expDate = new Date(expiration);

        const nowTime = now.getTime();
        const expTime = expDate.getTime();

        console.log('🔥 expDate.getTime():', expTime);
        console.log('🕒 now:', now.toISOString());
        console.log('⏳ exp:', expDate.toISOString());
        console.log('🔍 nowTime:', nowTime);
        console.log('⏳ expTime:', expTime);

        if (isNaN(expTime)) return true;

        // ✅ 1 saniye tolerans eklenmiş hali
        return nowTime >= expTime - 1000;
    },


    refreshToken: async () => {
        console.log('🔄 TokenManager.refreshToken | Token yenileme işlemi başlatılıyor...');
        const token = await AsyncStorage.getItem('refreshToken');
        console.log('🔍 TokenManager | Mevcut refresh token:', token);
        if (!token) {
            console.warn('🔒 Refresh token bulunamadı.');
            return null;
        }

        try {
            // 🧹 Eski Authorization temizleniyor
            delete axios.defaults.headers.common['Authorization'];
            const result = await IAMAPI.Auth.RefreshToken.Request({
                refreshToken: token,
                platform: IAMAPI.Enums.ClientPlatforms.Mobile,
            });

            console.log('🔄 TokenManager.refreshToken | Yeni token alındı:', result);

            await AsyncStorage.setItem('jwt', result.jwt);
            await AsyncStorage.setItem('refreshToken', result.refreshToken);
            await AsyncStorage.setItem(
                'sessionExpirationDate',
                result.sessionExpirationDate.toString()
            );
            await new Promise((r) => setTimeout(r, 200));
            // 🆕 Yeni token'ı axios varsayılan header olarak tanımla
            axios.defaults.headers.common['Authorization'] = `Bearer ${result.jwt}`;

            return result.jwt;
        } catch (err) {
            console.error('❌ TokenManager.refreshToken | Hata:', err);

            // Refresh başarısız → çıkış işlemi
            await AsyncStorage.multiRemove(['jwt', 'refreshToken', 'sessionExpirationDate']);
            return null;
        }
    },
};
