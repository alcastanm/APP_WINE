import { CommonModule } from '@angular/common';
import { Component, NgZone, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { routeAnimation } from "../../../ANIMATIONS/route-animation";
import { addIcons } from 'ionicons';
import { homeOutline, searchOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  standalone:true,
  imports:[IonicModule,  
          RouterModule,
          CommonModule,
        ],
  animations: [routeAnimation]        
          

})
export class TabsComponent  implements OnInit {

  userName = '';
  userPicture = '';

  constructor(private router: Router,
              private zone: NgZone) 
              { 
                addIcons({
                  'my-home':homeOutline,
                  'my-search':searchOutline
                });

              }

  ngOnInit() 
  {
    const user = localStorage.getItem("user");

    if(user){

      const data = JSON.parse(user);

      this.userName = data.name;
      this.userPicture = data.picture;
    }

  }


  goToHome()
  {
      this.zone.run(() => {
        this.router.navigate(['app/home']);
      });
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
