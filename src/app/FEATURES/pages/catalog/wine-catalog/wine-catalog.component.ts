import { Component, OnInit } from '@angular/core';
import { environment } from "../../../../../environments/environment";
import { Notes } from "../../../../CORE/service/WINE/notes";
import { ResultModel } from 'src/app/MODELS/result-Models';
import { CommonModule } from '@angular/common';
import { ToastService } from "../../../../CORE/service/toastservice";
import { IonicModule } from '@ionic/angular';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { GlobalVariablesService } from "../../../../CORE/service/global-variables.service";
import { Router } from '@angular/router';



@Component({
  selector: 'app-wine-catalog',
  templateUrl: './wine-catalog.component.html',
  styleUrls: ['./wine-catalog.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, LottieComponent]

})
export class WineCatalogComponent implements OnInit {

  userpictures = environment.wineImages + environment.winesFolder;
  wines: any = []
  stars = [1, 2, 3, 4, 5];
  userName: string = ''
  isLoading = false;

  constructor(private httpnotes: Notes,
    private toastService: ToastService,
    private global: GlobalVariablesService,
    private router: Router
  ) { }

  options: AnimationOptions = {
    animationData: '',
    loop: true,
    autoplay: true
  };

  ngOnInit() {
    const userString = localStorage.getItem('user');
    if (userString) {
      this.userName = (JSON.parse(userString)).email;
      if (this.userName == undefined) {
        this.toastService.error('Opps!!!, el usuario no es válido');
        return
      } else {
        this.getWinesByFilter('todos')
      }
    } else {
      this.toastService.error('Opps!!!, el usuario no es válido');
    }

  }



  getWinesByFilter(filter: any) {
    this.isLoading = true
    let params = { 'filter': filter, 'mail': this.userName }
    this.httpnotes.getWineList(params).subscribe
      (
        (res: ResultModel) => {
          this.isLoading = false
          if (res.isSuccess) {
            this.wines = res.data
            for (let i = 0; i < this.wines.length; i++) {
              this.wines[i].photo = this.userpictures + this.wines[i].photo;
              this.wines[i].rating = (this.wines[i].color_rating +
                this.wines[i].aroma_rating +
                this.wines[i].cuerpo_rating +
                this.wines[i].sabor_rating +
                this.wines[i].final_rating) / 5
              this.wines[i].rating = Number(this.wines[i].rating.toFixed(1));

              this.wines[i].stars = Math.round(this.wines[i].rating)
            }

          } else {
            this.toastService.error("opss!!! algo salio mal")
          }
        }
      )
  }

  goToNote(noteId: number) {
    this.global.note_id = noteId
    this.router.navigateByUrl('app/note')
  }
}