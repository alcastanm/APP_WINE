import { Injectable } from '@angular/core';
import { HttpBaseService } from "../http-base.service";
import { ResultModel } from "../../../MODELS/result-Models"
import { Observable,map  } from 'rxjs';
import { PublicClientApplication } from '@azure/msal-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Notes {


  constructor(public http:HttpBaseService) {}



  public addNote(formdata:FormData ):Observable<ResultModel>
  {
    return this.http.post('/wine',formdata,true);
  }  

  public updateNote(formdata:FormData ):Observable<ResultModel>
  {
    return this.http.post('/Updatewine',formdata,true);
  }

  public getWineList(params:any):Observable<ResultModel>
  {
    return this.http.get('/wines',params,true);
  }  

  public getnote(params:any):Observable<ResultModel>
  {
    return this.http.get('/getNote',params,true);
  }   


}
