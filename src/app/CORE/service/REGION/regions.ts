import { Injectable } from '@angular/core';
import { HttpBaseService } from "../http-base.service";
import { ResultModel } from "../../../MODELS/result-Models"
import { Observable,map  } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Regions {


  constructor(private http:HttpBaseService) { }


  public getregions(params:any):Observable<ResultModel>
  {
    return this.http.get('/regions',params,true);
  }  

  
}
