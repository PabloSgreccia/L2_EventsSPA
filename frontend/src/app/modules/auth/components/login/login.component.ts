import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@etp/auth/services';
import { User } from '@etp/shared/interfaces';
import { UserServiceService } from '@etp/shared/services';

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

  // get f() { return this.logInForm }
  get email() { return this.logInForm.controls.email }
  get password() { return this.logInForm.controls.password }
}
