import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
// Interfaces
import { Contact, User } from '@etp/shared/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactServiceService {
  
  // URL_API_CONTACT = "https://eventoslasegunda.herokuapp.com/api/contact"
  URL_API_CONTACT = `${environment.HOST}/api/contact`

  constructor(
    private http: HttpClient,
  ){}

  // User sends contact form
  createContact(contact: Contact) {
    return this.http.post<any>(`${this.URL_API_CONTACT}/create`, contact)
  }

  // Admin deletes a contact form
  deteleContact(id:number) {
    console.log(id);
    
    return this.http.delete<any>(`${this.URL_API_CONTACT}/delete/${id}`)
  }

  // Admin wantts to see all the contacts forms
  listContacts() {
    return this.http.get<any>(`${this.URL_API_CONTACT}/views`)
  }

}

