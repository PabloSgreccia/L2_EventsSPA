import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Type } from '../../interfaces/type/type';

@Injectable({
  providedIn: 'root'
})
export class TypeServiceService {

  URL_API_TYPE = "http://localhost:3000/api/type"

  constructor(
    private http: HttpClient,
  ) { }
  
  createType(type: string){
    return this.http.post<any>(`${this.URL_API_TYPE}/`, type)
  }
  
  updateType(type: Type){
    return this.http.patch<any>(`${this.URL_API_TYPE}/`, type)
  }

  deleteType(typeId: number){
    return this.http.delete<any>(`${this.URL_API_TYPE}/${typeId}`)
  }
  
  getTypes(){
    return this.http.get<any>(`${this.URL_API_TYPE}/`)
  }
}
