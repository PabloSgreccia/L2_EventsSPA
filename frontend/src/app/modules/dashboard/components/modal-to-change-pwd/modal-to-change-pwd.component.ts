import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserServiceService } from '@etp/shared/services';

@Component({
  selector: 'etp-modal-to-change-pwd',
  templateUrl: './modal-to-change-pwd.component.html',
  styleUrls: ['./modal-to-change-pwd.component.scss']
})
export class ModalToChangePwdComponent implements OnInit {
  
  // Vars
  inputTypeValue: string = "password"
  error: string = '';

  // Form
  passForm = new FormGroup({
    oldPassword: new FormControl('', {validators: [Validators.required, Validators.maxLength(255)]}),
    newPassword: new FormControl('', {validators: [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}')]}),
    repeatPassword: new FormControl('', {validators: [Validators.required]}),
  }, {validators: passwordsValidator})
  get f() { return this.passForm }
  get newPassword() { return this.passForm.controls.newPassword }
  get repPassword() { return this.passForm.controls.repeatPassword }

  constructor(
    private userService: UserServiceService,
    private dialogRef: MatDialogRef<ModalToChangePwdComponent>
  ) {}

  ngOnInit(): void {}

  // Save new password --> BE
  savePass(){
    if (this.passForm.status === 'VALID' && this.passForm.controls.newPassword.value && this.passForm.controls.oldPassword.value) {
      this.userService.editUserPwd(this.passForm.controls.oldPassword.value, this.passForm.controls.newPassword.value, )
        .subscribe({
          next: (res) => { 
            this.dialogRef.close() 
          },
          error: ((err: any) => {
            this.error = err.error.msg 
          })
        })
    }
  }

  // Show or hide password functionality
  showPassword(){
    if (this.inputTypeValue === 'password') {
      this.inputTypeValue = 'text'
    } else {
      this.inputTypeValue = 'password'
    }
  }
}

export const passwordsValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const newPassword = control.get('newPassword');
  const repeatPassword = control.get('repeatPassword');

  return newPassword && repeatPassword && newPassword.value !== repeatPassword.value 
    ? { passDoesntMatch: true } 
    : null;
};