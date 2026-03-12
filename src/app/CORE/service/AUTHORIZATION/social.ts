import { Injectable } from '@angular/core';
import { HttpBaseService } from "../http-base.service";
import { ResultModel } from "../../../MODELS/result-Models"
import { Observable } from 'rxjs';
import { PublicClientApplication } from '@azure/msal-browser';

@Injectable({
  providedIn: 'root',
})
export class Social {

  constructor(public http:HttpBaseService) {  }

  public loginGoogle(params:any):Observable<ResultModel>
  {
     return this.http.post('/auth/social-login',params,true)
  }  

}
