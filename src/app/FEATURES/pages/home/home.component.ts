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
  imports: [IonicModule, CommonModule]
})
export class HomeComponent implements OnInit {

  userName = '';
  userPicture = '';
  showMenu: boolean = false
  constructor(private router: Router,
    private zone: NgZone,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
    setTimeout(() => {
      const user = localStorage.getItem("user");

      if (user) {

        const data = JSON.parse(user);

        this.userName = data.name.split(' ')[0].toUpperCase();

        this.userPicture = data.picture;
      }
    }, 100);
  }

  //#region Log out

  logout() {

    localStorage.clear()

    sessionStorage.clear();

    this.deleteAllCookies();

    this.router.navigate(['login']);
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  deleteAllCookies() {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;

      document.cookie = name +
        "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }
  }

  //#endregion Log out



  goToCatalogo() {
    this.router.navigate(['app/catalog']);
  }

  goToNotaCata() {
    this.zone.run(() => {
      this.router.navigate(['app/note']);
    });
  }

  goToRegions()
  {
    this.zone.run(() => {
      this.router.navigate(['/regions']);
    });

  }

}
