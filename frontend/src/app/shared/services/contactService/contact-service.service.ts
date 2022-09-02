import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
// Interfaces
import { Contact, User } from '@etp/shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ContactServiceService {
 
  URL_API_CONTACT = "http://localhost:3000/api/contact"

  constructor(
    private http: HttpClient,
  ){}


  createContact(contact: Contact) {
    return this.http.post<any>(`${this.URL_API_CONTACT}/create`, contact)
  }

  deteleContact(id:number) {
    return this.http.delete<any>(`${this.URL_API_CONTACT}/delete/${id}`)
  }

  listContacts() {
    return this.http.get<any>(`${this.URL_API_CONTACT}`)
  }


}

