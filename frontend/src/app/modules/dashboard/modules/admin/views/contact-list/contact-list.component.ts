import { Component, OnInit } from '@angular/core';
import { Contact } from '@etp/shared/interfaces';
import { ContactServiceService } from 'src/app/shared/services/contactService/contact-service.service';

@Component({
  selector: 'etp-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  // contactList!: Contact[]
  contactList!: Contact[]

  constructor(
    private contactService: ContactServiceService
  ) { }

  ngOnInit(): void {
    this.getContactList()
  }

  getContactList(){
    this.contactService.listContacts()
    .subscribe({
      next: contact => {
        this.contactList = contact
      },
      error: (err) => {}
    })
  }

  deleteContact(id:number){
    this.contactService.deteleContact(id).subscribe(_ => {this.getContactList()})
  }
}