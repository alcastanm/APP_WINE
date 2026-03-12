import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { Social } from "../CORE/service/AUTHORIZATION/social";
import { ResultModel } from '../MODELS/result-Models';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage implements OnInit {
  constructor(private httpsocial:Social) {}

  ngOnInit(): void {
    this.httplogin()
  }


  httplogin()
  {
    let params={'provider':"google",'token':"id_token_here" }

    this.httpsocial.socialLogin(params).subscribe
    (
      (res:ResultModel)=>
        {
          alert(res.data.access_token)
        }
    )
  }
}
