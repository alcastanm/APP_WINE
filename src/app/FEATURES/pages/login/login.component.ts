import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Capacitor } from '@capacitor/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { ToastService } from "../../../CORE/service/toast";
import { Social } from "../../../CORE/service/AUTHORIZATION/social";
import { SocialMicrosoft } from '../../../CORE/service/AUTHORIZATION/social-microsoft';
import { ResultModel } from 'src/app/MODELS/result-Models';
import { AnimationOptions,LottieComponent  } from 'ngx-lottie';
import bottleAnimation from '../../../../assets/animations/bottle.json';


declare global {
  interface Window {
    google?: any;
  }
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonicModule, CommonModule,LottieComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  // === Configuración de clientes ===
  webClientGoogle = "813595942451-rljrc5fiefhkvrbrru0f14uqfebokcl0.apps.googleusercontent.com";
  isWeb: boolean = false;
  isLoading = false;
  lottieOk = true;
  
  constructor(
    private httpAuth: Social,
    private httpSocMicrosoft: SocialMicrosoft,
    private router: Router,
    private zone: NgZone,
    private toastService: ToastService ) {}

    options: AnimationOptions = {
    animationData: bottleAnimation,
    loop: true,
    autoplay: true
  };     


  async ngOnInit() {
    // Detectamos plataforma
    this.isWeb = Capacitor.getPlatform() === 'web';

    // Inicializar Microsoft
    const msResponse = await this.httpSocMicrosoft.initialize();
    if (msResponse) {
      const params = { provider: "microsoft", token: msResponse.idToken };
      this.getAppToken(params);
    }

    // Inicializar Google
    if (this.isWeb) {
      this.loadGoogleWebButton(); // botón web
    } else {
        GoogleAuth.initialize({
          clientId: "600105232081-69d49eheefcseqgth4mpu5kjev3i9k2r.apps.googleusercontent.com",
          scopes: ["profile", "email"],
          grantOfflineAccess: false
        });
    }
  }

  // ============================
  // LOGIN GOOGLE - MÓVIL
  // ============================
  async loginGoogle() {
    try {
      const user = await GoogleAuth.signIn();

      if (!user || !user.authentication) {
        this.toastService.error("Error en la autienticacion")
        return;
      }
      const params = { provider: "google", token: user.authentication.idToken };
      this.getAppToken(params);
    } catch (error) {
      this.toastService.error("ERROR Google Login (Mobile):")
    }
  }

  // ============================
  // LOGIN GOOGLE - WEB
  // ============================
  loadGoogleWebButton() {
    const checkGoogle = setInterval(() => {
      const btn = document.getElementById("googleBtn");
      if (window.google && btn) {
        clearInterval(checkGoogle);

        btn.innerHTML = "";

        window.google.accounts.id.initialize({
          client_id: this.webClientGoogle,
          callback: (response: any) => this.loginWebGoogle(response)
        });

        window.google.accounts.id.renderButton(btn, {
          theme: "outline",
          size: "large",
          width: 250
        });
      }
    }, 300);
  }

  loginWebGoogle(response: any) {
    if (!response || !response.credential) {
      this.toastService.error(response);
      return;
    }
    const params = { provider: 'google', token: response.credential };
    this.getAppToken(params);
  }

  // ============================
  // ENVÍA TOKEN AL BACKEND
  // ============================

  getAppToken(params: any)
  {
    this.isLoading=true
    this.httpAuth.loginGoogle(params).subscribe
    (
      (res:ResultModel)=>
        {
          this.isLoading=false
          this.isLoading=false
          if(res.isSuccess)
            {
              const jwt = res.data.access_token;
              const user = res.data.user;

              localStorage.setItem("token", jwt);
              localStorage.setItem("user", JSON.stringify(user));

              this.zone.run(() => this.router.navigate(['/app/home']));
            }else
              {
                this.toastService.error(res.returnedMessage)
              }
        }
    )

  }

 
  // ============================
  // BOTÓN DE LOGIN GOOGLE (llamado desde HTML)
  // ============================
  async onGoogleLogin() {
    if (this.isWeb) {
      // Muestra el popup web
      if (window.google) {
        window.google.accounts.id.prompt();
      }
    } else {
      // Móvil
      await this.loginGoogle();
    }
  }

  // ============================
  // LOGIN MICROSOFT
  // ============================
  async loginMicrosoft() {
    this.httpSocMicrosoft.login();
  }
}


// import { AfterViewInit, Component, OnInit } from '@angular/core';
// import { IonicModule } from '@ionic/angular';
// import { Social } from "../../../../CORE/service/AUTHORIZATION/social";
// import { Router } from '@angular/router';
// import { ResultModel } from 'src/app/MODELS/result-Models';
// import { SocialMicrosoft } from '../../../../CORE/service/AUTHORIZATION/social-microsoft';
// import { NgZone } from '@angular/core';
// import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';



// declare const google: any;
// declare global {
//   interface Window {
//     google: any;
//   }}
// @Component({
//   selector: 'app-login',
//     standalone: true,
//   imports: [IonicModule],
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss'],
// })
// export class LoginComponent  implements OnInit  {

//   glbProvider:any=''
//   constructor(private httpAuth: Social,
//               private httpSocMicrosoft:SocialMicrosoft,
//               private router: Router,
//               private zone: NgZone) { }

//  async ngOnInit(){

//     const response = await this.httpSocMicrosoft.initialize();

//     if(response){

//       const params = {
//         provider: "microsoft",
//         token: response.idToken
//       };

//       this.getAppToken(params)
//     }
//   }              

//   ionViewDidEnter() {
//     this.loadGoogleButton();
//   }


// loadGoogleButton() {

//   const checkGoogle = setInterval(() => {

//     if (window.google && document.getElementById("googleBtn")) {

//       clearInterval(checkGoogle);

//       const btn = document.getElementById("googleBtn");

//       if (!btn) return;

//       btn.innerHTML = "";

//       window.google.accounts.id.initialize({
//         client_id: "813595942451-rljrc5fiefhkvrbrru0f14uqfebokcl0.apps.googleusercontent.com",
//         callback: (response: any) => this.loginGoogle(response)
//       });

//       window.google.accounts.id.renderButton(
//         btn,
//         {
//           theme: "outline",
//           size: "large",
//           width: 250
//         }
//       );

//     }

//   }, 300);

// }  

//   loginGoogle(response: any)
//   {
//      let params = {'provider':'google','token':response.credential} 
//      this.getAppToken(params)
//   }

// getAppToken(params: any) {

//   this.httpAuth.loginGoogle(params).subscribe({

//     next: (res: ResultModel) => {

//       const jwt = res.data.access_token;
//       const user= res.data.user
//       localStorage.setItem("token", jwt);
//       localStorage.setItem("user", JSON.stringify(user));
//       this.zone.run(() => {
//         this.router.navigate(['/app/home']);
//       });

//     },

//     error: (err) => {

//       console.error("ERROR loginGoogle:", err);

//     }

//   });

// }

// async loginMicrosoft()
//   {
//     this.httpSocMicrosoft.login()
//   }


// }
