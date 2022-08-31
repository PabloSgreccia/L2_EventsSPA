import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@etp/auth/services';
import { LocationServiceService, UserServiceService } from '@etp/shared/services';


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
    private authService: AuthService,
    private userService: UserServiceService,
    ) { }

  ngOnInit(): void {
    let user = this.userService.getUserData()
    if (user) {
      this.contactForm.controls.name.setValue(`${user.name}`)
      this.contactForm.controls.email.setValue(`${user.email}`)
    }
  }

  sendForm(){
    
    if (this.contactForm.status === 'VALID') {
      // this.contactForm.reset();
      this.contactForm.controls.subject.setValue('')
      this.contactForm.controls.description.setValue('')
      this.contactForm.controls.subject.markAsUntouched;
      this.contactForm.controls.description.markAsUntouched;
      console.log("simulacro de envío terminado");
      
      // this.user = {
      //   name: this.eventForm.controls.name.value || '',
      //   email: this.eventForm.controls.email.value || '',
      //   password: this.eventForm.controls.password.value || ''
      // }

    } else {
      this.contactForm.markAllAsTouched;
    }
  }

  get email() { return this.contactForm.controls.email }
  get description() { return this.contactForm.controls.description }
}