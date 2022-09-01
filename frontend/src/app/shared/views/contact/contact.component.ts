import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// Interfaces
import { User } from '@etp/shared/interfaces';
// Services
import { AuthService } from '@etp/auth/services';
import { UserServiceService } from '@etp/shared/services';
import { ModalMsgComponent } from 'src/app/modules/dashboard/components/modal-msg/modal-msg.component';
import { MatDialog } from '@angular/material/dialog';

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
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    
     // this.authService.getLoggedUser().subscribe({
        //       next: (user:User) => {
        //         this.userService.updateUser(user);
        //       }
        //      })
        const user: User = {
          _id: 3, 
          name: 'Pablo Sgreccia', 
          email: 'pablosgreccia@gmail.com', 
          role: 'admin', 
          validated: 1, 
          photo: 'https://thumbs.dreamstime.com/b/icono-del-var%C3%B3n-del-usuario-ninguna-cara-43652345.jpg',
        }
        this.userService.updateUser(user);
        
    this.userService.getUser().subscribe({
      next: (user: User) => {
        this.contactForm.controls.name.setValue(`${user.name}`)
        this.contactForm.controls.email.setValue(`${user.email}`)
    }, error: () => {}})
  }

  sendForm(){
    
    if (this.contactForm.status === 'VALID') {
      // this.contactForm.reset();
      this.contactForm.controls.subject.setValue('')
      this.contactForm.controls.description.setValue('')
      this.contactForm.controls.subject.markAsUntouched;
      this.contactForm.controls.description.markAsUntouched;
      console.log("simulacro de envío terminado");
      
      this.openDialog('Your email was sent. we will contact you shortly.')

      // this.user = {
      //   name: this.eventForm.controls.name.value || '',
      //   email: this.eventForm.controls.email.value || '',
      //   password: this.eventForm.controls.password.value || ''
      // }

    } else {
      this.contactForm.markAllAsTouched;
    }
  }
  
  openDialog(msg: string) {
    this.dialog.open(ModalMsgComponent, {
      data: { msg },
    });
  }

  get email() { return this.contactForm.controls.email }
  get description() { return this.contactForm.controls.description }
}