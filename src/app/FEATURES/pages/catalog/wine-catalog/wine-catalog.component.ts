import { Component, OnInit } from '@angular/core';
import { environment } from "../../../../../environments/environment";
import { Notes } from "../../../../CORE/service/WINE/notes";
import { ResultModel } from 'src/app/MODELS/result-Models';
import { CommonModule } from '@angular/common';
import { ToastService } from "../../../../CORE/service/toast";
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-wine-catalog',
  templateUrl: './wine-catalog.component.html',
  styleUrls: ['./wine-catalog.component.scss'],
  standalone: true,
  imports: [CommonModule,IonicModule]

})
export class WineCatalogComponent  implements OnInit {

  userpictures = environment.wineImages + environment.winesFolder;

  wines:any=[]

  stars = [1,2,3,4,5];

  constructor(private httpnotes:Notes,
              private toastService: ToastService
  ) { }

  ngOnInit() 
  {
    this.getWinesByFilter('todos')
  }



  getWinesByFilter(filter:any)
  {
    let params = {'filter':filter}
    this.httpnotes.getWineList(params).subscribe
    (
      (res:ResultModel)=>
        {
          if(res.isSuccess)
            {
                this.wines = res.data
                
                for (let i = 0; i < this.wines.length; i++) {
                  this.wines[i].photo = this.userpictures + this.wines[i].photo;
                  this.wines[i].rating = (this.wines[i].color_rating  + 
                                          this.wines[i].aroma_rating   + 
                                          this.wines[i].cuerpo_rating + 
                                          this.wines[i].sabor_rating  + 
                                          this.wines[i].final_rating) / 5
                  this.wines[i].rating =   Number(this.wines[i].rating.toFixed(1));                      

                  this.wines[i].stars = Math.round(this.wines[i].rating)                        
                }

            }else
              {
                this.toastService.error("opss!!! algo salio mal")
              }
        }
    )
  }

}
