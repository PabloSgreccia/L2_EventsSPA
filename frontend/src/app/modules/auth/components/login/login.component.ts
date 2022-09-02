import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '@etp/auth/services';
import { User } from '@etp/shared/interfaces';
import { UserServiceService } from '@etp/shared/services';
import { ModalMsgComponent } from 'src/app/modules/dashboard/components/modal-msg/modal-msg.component';

@Component({
  selector: 'etp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  logInForm = new FormGroup({
    email: new FormControl('', {validators: [Validators.required, Validators.email]}),
    password: new FormControl('', {validators: [Validators.required, Validators.pattern(''), Validators.minLength(8)]}),
  })

  error: String = '';

  @ViewChild("passwordInput") passwordInput!: ElementRef;
  
  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserServiceService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if (this.authService.loggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  logIn(){
    if (this.logInForm.status === 'VALID') {
      
      this.authService.logIn(this.logInForm.controls.email.value || '', this.logInForm.controls.password.value || '')
      .subscribe({
        next: (res) => {
          if (res.status === 200) {
            localStorage.setItem('token', res.token);

            // Otra peticion
           /*
             this.authService.getUser().subscribe({
              next: (user:User) => {
                this.userService.updateUser(user);
              }
             })
           */
            
            // Cambiar por la respuesta del BE
            const user: User = {
              id: 3, 
              name: 'Pablo Sgreccia', 
              email: 'pablosgreccia@gmail.com', 
              role: 'user', 
              validated: 1, 
              photo: 'https://thumbs.dreamstime.com/b/icono-del-var%C3%B3n-del-usuario-ninguna-cara-43652345.jpg',
            }
            // this.userService.storeUserData(user);
            this.userService.updateUser(user);
            
            this.router.navigate(['/dashboard']);
          }       
        },
        error: ((err) => {
            this.error = '';
            this.logInForm.controls.password.reset();
            this.error = err.error.msg 
          })
        })
    }
  }

  showPassword(){
    if (this.passwordInput.nativeElement.type === 'password') {
      this.passwordInput.nativeElement.type = 'text'
    } else {
      this.passwordInput.nativeElement.type = 'password'
    }
  }

  forgotPass(){
    if (this.logInForm.controls.email.value && this.logInForm.controls.email.valid) {
      this.userService.forgotPassword(this.logInForm.controls.email.value)
        .subscribe({
          next: (res) => {
            if (res.status === 200) {
              this.openDialog(`We sent and email to ${this.email.value}, check it to reset your password`)
            } 
            else{
              this.error = 'Something went wrong trying to reset your password'
            }       
          },
          error: ((err: any) => {
            this.error = 'Something went wrong trying to reset your password'
            console.log(err);
          })
        })
    } else {
      this.error = 'Please, fill the email input before'
    }

  }
  
  // Show dialog
  openDialog(msg: string) {
    this.dialog.open(ModalMsgComponent, {
      data: { msg },
    });
  }


  // get f() { return this.logInForm }
  get email() { return this.logInForm.controls.email }
  get password() { return this.logInForm.controls.password }
}
