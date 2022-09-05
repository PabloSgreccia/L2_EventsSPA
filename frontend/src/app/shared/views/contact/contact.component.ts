import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
// Interfaces
import { Contact, User } from '@etp/shared/interfaces';
// Services
import { AuthService } from '@etp/auth/services';
// Components
import { ContactServiceService, UserServiceService } from '@etp/shared/services';
import { ModalErrorComponent, ModalMsgComponent } from '@etp/shared/components';
import { Router } from '@angular/router';

@Component({
  selector: 'etp-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactForm = new FormGroup({
    name: new FormControl('', {validators: [Validators.required, Validators.maxLength(50)]}),
    email: new FormControl('', {validators: [Validators.required, Validators.email, Validators.maxLength(100)]}),
    subject: new FormControl('', {validators: [Validators.required, Validators.maxLength(30)]}),
    description: new FormControl('', {validators: [Validators.required, Validators.minLength(10), Validators.maxLength(255)]}),
  })
  get name() { return this.contactForm.controls.name }
  get email() { return this.contactForm.controls.email }
  get subject() { return this.contactForm.controls.subject }
  get description() { return this.contactForm.controls.description }

  error: String = '';
  
  constructor(
    private userService: UserServiceService,
    public dialog: MatDialog,
    private contactService: ContactServiceService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // Save logged user data (anti refresh)
     this.authService.getLoggedUser().subscribe({
      next: (response) => {
        this.userService.updateUser(response.user);
      },
      error: (_ => {}) 
    })
        
    // Get logged user data by observable
    this.userService.getUser().subscribe({
      next: (user: User) => {
        this.contactForm.controls.name.setValue(`${user.name}`)
        this.contactForm.controls.email.setValue(`${user.email}`)
      }, error: () => {}
    })
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
        read: false
      }

      // BE API
      this.contactService.createContact(newContact)
      .subscribe({
        next: res => { 
          // Show dialog
          this.dialog.open(ModalMsgComponent, { data: { msg: 'Your email was sent. we will contact you shortly.' } })
          .afterClosed().subscribe(_ => {
            this.router.navigate(['/dashboard/feed'])
          })
        },
        error: ((err) => { this.openErrorDialog("Something went wrong, try again.") })
      })
    } else {
      this.contactForm.markAllAsTouched;
    }
  }
  
  // Open error dialog
  openErrorDialog(msg: string) {
  this.dialog.open(ModalErrorComponent, { data: { msg } });
  }

}