import { Injectable } from '@angular/core';
import { Toast } from '@capacitor/toast';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() {}

  // Mostrar mensaje de éxito
  async success(message: string) {
    await Toast.show({
      text: `✅ ${message}`,
      duration: 'long'
    });
  }

  // Mostrar mensaje de error
  async error(message: string) {
    await Toast.show({
      text: `❌ ${message}`,
      duration: 'long'
    });
  }

  // Mensaje informativo (opcional)
  async info(message: string) {
    await Toast.show({
      text: `ℹ️ ${message}`,
      duration: 'long'
    });
  }

}