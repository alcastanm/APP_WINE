import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'mobile-app',
  webDir: 'www',
  server: {
    androidScheme: 'http'
  }  
};

export default config;
