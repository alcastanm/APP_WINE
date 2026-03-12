import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) {}

  // Método genérico para mostrar cualquier mensaje
  async showToast(
    message: string,
    color: 'success' | 'danger' = 'success',
    duration: number = 2000
  ) {
    const toast = await this.toastController.create({
      message,
      duration,
      color,
      position: 'top'
    });
    await toast.present();
  }

  // Métodos específicos para éxito y error
  success(message: string, duration: number = 2000) {
    this.showToast(message, 'success', duration);
  }

  error(message: string, duration: number = 2000) {
    this.showToast(message, 'danger', duration);
  }
}