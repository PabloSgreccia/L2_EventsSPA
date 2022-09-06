import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypeServiceService {

  // URL_API_TYPE = "https://eventoslasegunda.herokuapp.com/api/type"
  URL_API_TYPE = `${environment.HOST}/api/type`
  
  constructor(
    private http: HttpClient,
  ) { }
  
  createType(type: string){
    const body = {
      type: type,
      active: true
    }
    return this.http.post<any>(`${this.URL_API_TYPE}/create`, body)
  }
  
  updateType(id: number, type: string){    
    return this.http.patch<any>(`${this.URL_API_TYPE}/update/${id}`, {type})
  }

  deleteType(id: number){
    const active = false
    return this.http.patch<any>(`${this.URL_API_TYPE}/delete/${id}`, {active} )
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
