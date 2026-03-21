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
    setTimeout(() => {
      const user = localStorage.getItem("user");

      if(user){

        const data = JSON.parse(user);

        this.userName = data.name.split(' ')[0].toUpperCase();
         
        this.userPicture = data.picture;
      }
    }, 100);

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
