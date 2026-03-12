import { Injectable } from '@angular/core';
import { PublicClientApplication, AuthenticationResult } from '@azure/msal-browser';

@Injectable({
  providedIn: 'root'
})
export class SocialMicrosoft {

  private msalInstance: PublicClientApplication;

  constructor(){

    this.msalInstance = new PublicClientApplication({
      auth: {
        clientId: "39f75910-2f09-4323-b94c-9a0c2f6ce814",
        authority: "https://login.microsoftonline.com/common",
        redirectUri: "http://localhost:8100"
      },
      cache: {
        cacheLocation: "sessionStorage"
      }
    });

  }

  async initialize(): Promise<AuthenticationResult | null> {

    await this.msalInstance.initialize();

    const response = await this.msalInstance.handleRedirectPromise();

    return response;

  }

  login(): void {

    this.msalInstance.loginRedirect({
      scopes: ["openid","profile","email"]
    });

  }

}