import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { GlobalVariablesService } from "./global-variables.service";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpBaseService {
  private uri_api = environment.uri_api;  
  private uri_api_Python = environment.uri_apiPython;
  private headers!: HttpHeaders;
  private token:string=sessionStorage.getItem('_sectkn') ?? ''

  constructor(public http: HttpClient,private httpVars:GlobalVariablesService) 
  {  }

  private getHttpHeadersConfigs() {
    let headers: HttpHeaders = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');
    return headers;
  }

  private getUri(pythonapi:boolean,endPoint:string)
  {
    if (this.uri_api_Python === 'https://localhost:8100') {
      this.uri_api_Python = 'https://127.0.0.1:8000';
    } else
      {
        this.uri_api_Python="https://192.168.1.8:8000"
        
      }
      let x = (!pythonapi ? this.uri_api : this.uri_api_Python) + endPoint

    return (!pythonapi ? this.uri_api : this.uri_api_Python) + endPoint;
  }

  usingHttpServices<T>(endPoint: string, type: string, params?: any,pythonapi?:boolean):Observable<T> {
    this.headers = this.getHttpHeadersConfigs();
    let uri =  this.getUri(pythonapi!,endPoint);
    let request;
    switch (type) {
      case 'get':
        let v =  this.httpVars.getProtectedEndpoints()
        let EndProtected = this.httpVars.getProtectedEndpoints().includes(endPoint);
        this.headers = EndProtected ? this.headers.set("Authorization",`Bearer ${this.token}` ):this.headers
        request = this.http.get<T>(uri, { params: params, headers: this.headers });
        break;
      case 'post':
        request = this.http.post<T>(uri, params, { headers: this.headers });
        break;
      case 'put':
        request = this.http.put<T>(uri, params, { headers: this.headers });
        break;
      case 'delete':
        request = this.http.delete<T>(uri, { params: params, headers: this.headers });
        break;
      default:
       throw new Error('Http method not supported.');
    }
    return request;
  }

  
  public get<T>(endPoint: string, params?: any,pythonapi?:boolean): Observable<T> {
    return this.usingHttpServices(endPoint, 'get', params,pythonapi);
  }

  public post<T>(endPoint: string, params?: any,pythonapi?:boolean): Observable<T> {
    return this.usingHttpServices(endPoint, 'post', params,pythonapi);
  }

  public put<T>(endPoint: string, params?: any,pythonapi?:boolean): Observable<T> {
    return this.usingHttpServices(endPoint, 'put', params,pythonapi);
  }

  public delete<T>(endPoint: string, params?: any,pythonapi?:boolean): Observable<T> {
    return this.usingHttpServices(endPoint, 'delete', params,pythonapi);
  }
}
