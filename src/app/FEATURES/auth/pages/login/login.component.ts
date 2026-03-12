import { AfterViewInit, Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Social } from "../../../../CORE/service/AUTHORIZATION/social";
import { Router } from '@angular/router';
import { ResultModel } from 'src/app/MODELS/result-Models';
import { SocialMicrosoft } from '../../../../CORE/service/AUTHORIZATION/social-microsoft';
import { NgZone } from '@angular/core';


declare const google: any;
declare global {
  interface Window {
    google: any;
  }}
@Component({
  selector: 'app-login',
    standalone: true,
  imports: [IonicModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements AfterViewInit  {

  glbProvider:any=''
  constructor(private httpAuth: Social,
              private httpSocMicrosoft:SocialMicrosoft,
              private router: Router,
              private zone: NgZone) { }

 async ngOnInit(){

    const response = await this.httpSocMicrosoft.initialize();

    if(response){

      const params = {
        provider: "microsoft",
        token: response.idToken
      };

      this.getAppToken(params)
    }
  }              

  ngAfterViewInit(): void {
    this.loadGoogleButton();    
  }


loadGoogleButton(){

  const interval = setInterval(()=>{

    const btn = document.getElementById("googleBtn");

    if(window.google && btn){

      btn.innerHTML = "";

      google.accounts.id.initialize({
        client_id: "813595942451-rljrc5fiefhkvrbrru0f14uqfebokcl0.apps.googleusercontent.com",
        callback: this.loginGoogle.bind(this)
      });

      google.accounts.id.renderButton(
        btn,
        {
          theme:"outline",
          size:"large",
          width:250
        }
      );

      clearInterval(interval);

    }

  },100);

}  

  loginGoogle(response: any)
  {
     let params = {'provider':'google','token':response.credential} 
     this.getAppToken(params)
  }

getAppToken(params: any) {

  this.httpAuth.loginGoogle(params).subscribe({

    next: (res: ResultModel) => {

      const jwt = res.data.access_token;
      const user= res.data.user
      localStorage.setItem("token", jwt);
      localStorage.setItem("user", JSON.stringify(user));
      this.zone.run(() => {
        this.router.navigate(['/app/home']);
      });

    },

    error: (err) => {

      console.error("ERROR loginGoogle:", err);

    }

  });

}

async loginMicrosoft()
  {
    this.httpSocMicrosoft.login()
  }


}
