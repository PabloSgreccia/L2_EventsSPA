import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TypeServiceService {

  URL_API_TYPE = "http://localhost:3000/api/type"

  constructor(
    private http: HttpClient,
  ) { }
  
  // TODO: add photo 
  createType(type: string){
    return this.http.post<any>(`${this.URL_API_TYPE}/create`, type)
  }
  
  // TODO: add photo 
  updateType(id: number, type: string){
    return this.http.patch<any>(`${this.URL_API_TYPE}/update/${id}`, type)
  }

  deleteType(id: number){
    return this.http.delete<any>(`${this.URL_API_TYPE}/delete/${id}`)
  }
  
  getTypes(){
    return this.http.get<any>(`${this.URL_API_TYPE}/views`)
  }
}
