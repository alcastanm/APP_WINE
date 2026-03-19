import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports:[IonicModule,CommonModule]
})
export class HomeComponent  implements OnInit {

  userName = '';
  userPicture = '';
  constructor(private router: Router,
              private zone: NgZone,
              private loadingCtrl: LoadingController) { }

  ngOnInit() 
  {

  }
  
  goToCatalogo(){
    this.router.navigate(['app/catalog']);
  }

  goToNotaCata(){
      this.zone.run(() => {
        this.router.navigate(['app/note']);
      });
  }  

}
