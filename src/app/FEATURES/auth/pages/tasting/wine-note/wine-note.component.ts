import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Notes } from "../../../../../CORE/service/WINE/notes";
import { ToastService } from "../../../../../CORE/service/toast";
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ResultModel } from 'src/app/MODELS/result-Models';
import { IonContent } from '@ionic/angular';


@Component({
  selector: 'app-wine-note',
  templateUrl: './wine-note.component.html',
  styleUrls: ['./wine-note.component.scss'],
  standalone:true,
  imports: [IonicModule,CommonModule,FormsModule],
})
export class WineNoteComponent  implements OnInit {

  photo: string = "";
  colorRating = 0;
  aromaRating = 0;
  cuerpoRating = 0;
  saborRating = 0;
  finalRating = 0;

  notes = "";
  wineType=""
  wineName=""

 @ViewChild('ioncontent', { static: false }) ioncontent!: IonContent;

  constructor(private httpnotes:Notes,private toastService: ToastService) { }

  ngOnInit() 
  {
    
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
        this.toastService.error("Ingrese nombre para el vino")
        return
      } 
    if(this.wineType=='')
      {
        this.toastService.error("Tipo de vino? Blanco, Tinto o Rosé")
        return
      }     

    this.httpnotes.addNote(formData).subscribe
    (
      (res:ResultModel)=>
        {
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
    this.ioncontent.scrollToTop(300);
  
  }  
}
