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
  
  // Crea un tipo de evento
  createType(type: string){
    const body = {
      type: type,
      active: true
    }
    return this.http.post<any>(`${this.URL_API_TYPE}/create`, body)
  }
  
  // Actualiza un tipo de evento
  updateType(id: number, type: string){    
    return this.http.patch<any>(`${this.URL_API_TYPE}/update/${id}`, {type})
  }

  // Elimina un tipo de evento
  deleteType(id: number){
    const active = false
    return this.http.patch<any>(`${this.URL_API_TYPE}/delete/${id}`, {active} )
  }
  
  // Obtiene todos los tipos de evento
  getTypes(){
    return this.http.get<any>(`${this.URL_API_TYPE}/views`)
  }

  // Actualiza la foto de un tipo de evento
  updateTypePhoto(photo: File, typeId:number){
    const formdata = new FormData()
    formdata.append('photo', photo)
      return this.http.post<any>(`${this.URL_API_TYPE}/uploadphoto/${typeId}`, formdata)
}

}
