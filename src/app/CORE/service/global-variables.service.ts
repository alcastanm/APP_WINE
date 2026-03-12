import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class GlobalVariablesService {
  public nomusu!:string;
  public image!:string;
  public _endPoints:string[]

  

  constructor() {
      this._endPoints = 
      [
        'Users'
      ]

   }

  // Método para obtener los endpoints protegidos
  getProtectedEndpoints(): string[] {
    return this._endPoints;
  }   

  
}
