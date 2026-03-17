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

  public getWineList(params:any):Observable<ResultModel>
  {
    return this.http.get('/wines',params,true);
  }  

  // private uri_api_Python = "https://milliary-polyphyletically-hertha.ngrok-free.dev";
  
  // public getWineList(params: any): Observable<ResultModel> {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json; charset=utf-8'
  //   });

  //   // Usamos responseType 'text' y luego parseamos manualmente para evitar errores de parsing en WebView
  //   return this.http.get(this.uri_api_Python + '/wines', { params, headers, responseType: 'text' })
  //     .pipe(
  //       map(resText => JSON.parse(resText as string) as ResultModel)
  //     );
  // }  
  
}
