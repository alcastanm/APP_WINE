import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Notes } from "../../../../CORE/service/WINE/notes";
import { ToastService } from "../../../../CORE/service/toastservice";
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ResultModel } from 'src/app/MODELS/result-Models';
import { NgZone } from '@angular/core';
import { AnimationOptions,LottieComponent  } from 'ngx-lottie';
import bottleAnimation from '../../../../../assets/animations/bottle.json';
import { Keyboard } from '@capacitor/keyboard';
import { StatusBar } from '@capacitor/status-bar';
StatusBar.setOverlaysWebView({ overlay: false });

import {
  IonContent,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
  IonIcon
} from '@ionic/angular/standalone';




@Component({
  selector: 'app-wine-note',
  templateUrl: './wine-note.component.html',
  styleUrls: ['./wine-note.component.scss'],
  standalone:true,
  imports: [    CommonModule,
    FormsModule,
    IonContent,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonButton,
    IonIcon,
    IonicModule,
    LottieComponent],
})
export class WineNoteComponent  implements OnInit {

  @ViewChildren('focusable', { read: ElementRef }) focusables!: QueryList<ElementRef>;
  @ViewChild('ioncontent', { static: false }) content!: IonContent;

  focusInput(index: number) {
    setTimeout(() => {
      const el = this.focusables.toArray()[index].nativeElement;
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300); // espera a que aparezca el teclado
  } 
  photo: string = "";
  colorRating = 0;
  aromaRating = 0;
  cuerpoRating = 0;
  saborRating = 0;
  finalRating = 0;

  notes = "";
  wineType=""
  wineName=""

 
  isLoading = false;
  lottieOk = true;

   private focusHandler: any;
  constructor(private zone: NgZone,
              private httpnotes:Notes,
              private toastService: ToastService
            ) {
                  
              }


    options: AnimationOptions = {
    animationData: bottleAnimation,
    loop: true,
    autoplay: true
  };            

      
  stars = [1, 2, 3, 4, 5];

  
ngOnInit() {}

ngAfterViewInit() {

  // 🔥 Listener global de focus
  this.focusHandler = (event: any) => {
    const target = event.target;
    const tag = target.tagName;

    if (tag === 'ION-INPUT' || tag === 'ION-TEXTAREA') {

      setTimeout(async () => {

        const y = await this.getElementY(target);

        const offset = 140; // 👈 subí un poco para evitar footer

        this.content.scrollToPoint(0, y - offset, 300);

      }, 350); // 👈 más tiempo = teclado ya abierto
    }
  };

  document.addEventListener('focusin', this.focusHandler);

  // 🔥 💣 ESTE ES EL FIX DEL PRIMER FOCUS
  Keyboard.addListener('keyboardWillShow', () => {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 0);
  });

}

  async getElementY(el: any): Promise<number> {
    const rect = el.getBoundingClientRect();

    const scrollEl = await this.content.getScrollElement();

    return rect.top + scrollEl.scrollTop;
  }

  ngOnDestroy() {
    document.removeEventListener('focusin', this.focusHandler);
  }    





  onWineNameInput(event: any) {
    // Convierte a mayúsculas mientras se escribe
    this.wineName = event.target.value.toUpperCase();
  }  

  
  async takePhoto(){

    const image = await Camera.getPhoto({

      quality:90,

      allowEditing:false,

      resultType:CameraResultType.DataUrl,

      source:CameraSource.Camera

    });

    this.photo = image.dataUrl!;

  }

  setRating(type: string, value: number) {

    switch(type){

      case 'color':
        this.colorRating = value;
        break;

      case 'aroma':
        this.aromaRating = value;
        break;

      case 'cuerpo':
        this.cuerpoRating = value;
        break;

      case 'sabor':
        this.saborRating = value;
        break;

      case 'final':
        this.finalRating = value;
        break;

    }

  }  

  async selectPhoto() {

    const image = await Camera.getPhoto({

      quality: 90,

      allowEditing: false,

      resultType: CameraResultType.DataUrl,

      source: CameraSource.Photos

    });

    this.photo = image.dataUrl!;

  }

  setWineType(type:string){
    this.wineType = type;
  }



  saveWineNote() {
    this.isLoading=true
    const userString = localStorage.getItem("user");
    let email = ''
    if (userString) {
      const user = JSON.parse(userString);
      email = user.email
    }
    const formData = new FormData();

    formData.append('wine_name', this.wineName);
    formData.append('wine_type', this.wineType);
    formData.append('color_rating', this.colorRating.toString());
    formData.append('aroma_rating', this.aromaRating.toString());
    formData.append('cuerpo_rating', this.cuerpoRating.toString());
    formData.append('sabor_rating', this.saborRating.toString());
    formData.append('final_rating', this.finalRating.toString());
    formData.append('notes', this.notes);
    formData.append('email',email)
    formData.append('regionId','32')

    if (this.photo) {

      const blob = this.base64ToBlob(this.photo);

      const safeWineName = this.wineName
        .toLowerCase()
        .replace(/\s+/g, "_")
        .replace(/[^a-z0-9_]/g, "");

      const uniqueNumber = Date.now();

      const fileName = `${safeWineName}_${uniqueNumber}.jpg`;      

      formData.append('photo', blob, fileName);
    }

    if(this.wineName=='')
      {
          this.isLoading=false

          this.zone.run(() => {
            this.toastService.error("Ingrese nombre para el vino");
          }); 
    
        return
      } 
    if(this.wineType=='')
      {
        this.isLoading=false
        this.toastService.error("Tipo de vino? Blanco, Tinto o Rosé");
        return
      }    
      
    this.httpnotes.addNote(formData).subscribe
    (
      (res:ResultModel)=>
        {
          this.isLoading=false
          if(res.isSuccess)
            {
              this.toastService.success("Nota agregada")
              this.cleanNote()
            }else
              {
                this.toastService.error("Opss!!! algo salió mal")
              }
        }
    )

  }


  base64ToBlob(base64: string): Blob {

    const arr = base64.split(',');
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);

    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], { type: mime });

  }  
  
  cleanNote()
  {
     this.wineName=''
    this.wineType = ''
    this.colorRating=0
    this.aromaRating=0
    this.cuerpoRating=0
    this.saborRating=0
    this.finalRating=0
    this.notes=''
    this.photo=''
    this.content.scrollToTop(300);
  
  }  

  
}
