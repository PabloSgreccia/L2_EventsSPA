import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalMsgComponent } from 'src/app/modules/dashboard/components/modal-msg/modal-msg.component';
// Interfaces
import { Contact, User } from '@etp/shared/interfaces';
// Services
import { AuthService } from '@etp/auth/services';
import { UserServiceService } from '@etp/shared/services';
import { ContactServiceService } from '../../services/contactService/contact-service.service';

@Component({
  selector: 'etp-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactForm = new FormGroup({
    name: new FormControl('', {validators: [Validators.required]}),
    email: new FormControl('', {validators: [Validators.required, Validators.email]}),
    subject: new FormControl('', {validators: [Validators.required]}),
    description: new FormControl('', {validators: [Validators.required, Validators.minLength(10), Validators.maxLength(255)]}),
  })

  error: String = '';
  
  constructor(
    private userService: UserServiceService,
    public dialog: MatDialog,
    private contactService: ContactServiceService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // Save logged user data (anti refresh)
     this.authService.getLoggedUser().subscribe({
      next: (user:User) => {
        this.userService.updateUser(user);
      }
    })
        
    // Get logged user data byu observable
    this.userService.getUser().subscribe({
      next: (user: User) => {
        this.contactForm.controls.name.setValue(`${user.name}`)
        this.contactForm.controls.email.setValue(`${user.email}`)
    }, error: () => {}})
  }

  // After user confirms form
  sendForm(){
    if (this.contactForm.status === 'VALID') {
      // Create contact with form values and a date
      let newContact: Contact = {
        name: this.contactForm.controls.subject.value || '',
        email: this.contactForm.controls.subject.value || '',
        subject: this.contactForm.controls.subject.value || '',
        description: this.contactForm.controls.subject.value || '',
        date: (new Date()).toString(),
      }

      // BE API
      this.contactService.createContact(newContact)      

      // Reset contact form
      this.contactForm.controls.subject.setValue('')
      this.contactForm.controls.description.setValue('')
      this.contactForm.controls.subject.markAsUntouched;
      this.contactForm.controls.description.markAsUntouched;
      this.openDialog('Your email was sent. we will contact you shortly.')

    } else {
      this.contactForm.markAllAsTouched;
    }
  }
  
  // Show dialog
  openDialog(msg: string) {
    this.dialog.open(ModalMsgComponent, {
      data: { msg },
    });
  }

  get email() { return this.contactForm.controls.email }
  get description() { return this.contactForm.controls.description }
}