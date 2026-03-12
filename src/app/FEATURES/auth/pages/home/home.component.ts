import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
})
export class HomeComponent  implements OnInit {

  userName = '';
  userPicture = '';
  constructor(private router: Router,
              private zone: NgZone) { }

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
