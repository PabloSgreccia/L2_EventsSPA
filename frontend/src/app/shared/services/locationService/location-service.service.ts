import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
// import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LocationServiceService {

  // URL_API_LOCATION = "https://apis.datos.gob.ar/georef/api/provincias"

  constructor(
    private http: HttpClient,
    // private router: Router
  ) { }
  
  getProvinces(){
    return this.http.get<any>(`https://apis.datos.gob.ar/georef/api/provincias`)
  }

  getProvincesCities(province: string){
    return this.http.get<any>(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${province}&max=2000`)
  }

}
