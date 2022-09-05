import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypeServiceService {

  // URL_API_TYPE = "http://localhost:3000/api/type"
  URL_API_TYPE = `${environment.HOST}/api/type`
  
  constructor(
    private http: HttpClient,
  ) { }
  
  createType(type: string){
    return this.http.post<any>(`${this.URL_API_TYPE}/create`, {type})
  }
  
  updateType(id: number, type: string){    
    return this.http.patch<any>(`${this.URL_API_TYPE}/update/${id}`, {type})
  }

  deleteType(id: number){
    return this.http.delete<any>(`${this.URL_API_TYPE}/delete/${id}`)
  }
  
  getTypes(){
    return this.http.get<any>(`${this.URL_API_TYPE}/views`)
  }

  updateTypePhoto(photo: File, typeId:number){
    const formdata = new FormData()
    formdata.append('photo', photo)
      return this.http.post<any>(`${this.URL_API_TYPE}/uploadphoto/${typeId}`, formdata)
}

}
