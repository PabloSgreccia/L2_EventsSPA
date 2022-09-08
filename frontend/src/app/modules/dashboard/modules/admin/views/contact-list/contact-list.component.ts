import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
// Interfaces
import { Contact } from '@etp/shared/interfaces';
// Services
import { ContactServiceService } from '@etp/shared/services';
// Components
import { ModalMsgComponent } from '@etp/shared/components';

@Component({
  selector: 'etp-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  contactList!: Contact[]

  constructor(
    private contactService: ContactServiceService,
    public dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getContactList()
  }

  // Get list of messages forms from BE
  getContactList(){
    this.contactService.listContacts()
    .subscribe({
      next: res => { this.contactList = res.contact},
      error: (err) => {
        const dialogRef = this.dialog.open(ModalMsgComponent, { data: { title: 'Error', msg: 'Ocurrió un error al intentar obtener la lista de mensajes.' } });
        dialogRef.afterClosed().subscribe(_ => { this.router.navigate(['/admin/panel']) });
      }
    })
  }

  // Delete a message
  deleteContact(id:number){
    this.contactService.deteleContact(id)
    .subscribe({
      next: res => { this.getContactList()},
      error: (err) => { 
        this.dialog.open(ModalMsgComponent, { data: { title: 'Error', msg: 'Ocurrió un error al intentar eliminar el mensaje.' } });
      }
    })
  }
}