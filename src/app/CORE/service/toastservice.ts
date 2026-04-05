import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastCtrl: ToastController) {}

  async success(message: string) {
    await this.showToast(message, 'success');
  }

  async error(message: string) {
    await this.showToast(message, 'danger');
  }

  async warning(message: string) {
    await this.showToast(message, 'warning');
  }

  async info(message: string) {
    await this.showToast(message, 'primary');
  }

  private async showToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2500,
      position: 'bottom',
      color, // 👈 clave para diferenciar
      buttons: [
        {
          text: '✕',
          role: 'cancel'
        }
      ]
    });

    await toast.present();
  }  

}