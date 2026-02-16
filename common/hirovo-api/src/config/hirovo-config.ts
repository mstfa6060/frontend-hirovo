// @config/hirovo-config.ts
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AxiosInstance = ReturnType<typeof axios.create>;

export const api: AxiosInstance = axios.create({
  baseURL: 'https://api.hirovo.com',
  timeout: 10000
});

// 🔐 Tüm isteklere token ekle
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('jwt');
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


export const AppConfig = {
  BaseApi: "https://api.hirovo.com/",
  HirovoUrl: 'https://api.hirovo.com/hirovo',  // ✅ '/hirovo' eklendi
  IAMUrl: 'https://api.hirovo.com/iam',
  FileProviderUrl: 'https://api.hirovo.com/fileprovider',
  OneSignalAppId: '',
  GoogleWebClientId: '88926208060-rpeal44o63rpqcojr94bdlannd1vko4t.apps.googleusercontent.com',
  DefaultCompanyId: 'c9d8c846-10fc-466d-8f45-a4fa4e856abd',
};