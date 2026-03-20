import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'mobile-app',
  webDir: 'www',
  server: {
    androidScheme: 'http'
  },

  plugins: {
    Keyboard: {
      resize: 'body' as any,
      resizeOnFullScreen: true
    }
  } as any
};

export default config;