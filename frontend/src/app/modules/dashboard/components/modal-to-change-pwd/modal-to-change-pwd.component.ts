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

  passForm = new FormGroup({
    oldPassword: new FormControl('', {validators: [Validators.required]}),
    newPassword: new FormControl('', {validators: [Validators.required, Validators.pattern(''), Validators.minLength(8)]}),
    repPassword: new FormControl('', {validators: [Validators.required, Validators.pattern(''), Validators.minLength(8)]}),
  }, {validators: passwordsValidator})
  
  error: string = ''

  constructor(
    private userService: UserServiceService,
    private dialogRef: MatDialogRef<ModalToChangePwdComponent>
  ) {}

  ngOnInit(): void {}

  savePass(){
    if (this.passForm.status === 'VALID' && this.passForm.controls.newPassword.value && this.passForm.controls.oldPassword.value) {
      this.userService.editUserPwd(this.passForm.controls.newPassword.value, this.passForm.controls.oldPassword.value, )
        .subscribe({
          next: (res: { status: number; msg: string; }) => {
            if (res.status === 200) {
              this.dialogRef.close();
            } 
            else{              
              this.error = 'Something went wrong trying to update your password.';
            }       
          },
          error: ((err: any) => {
            this.error = 'Something went wrong trying to update your password.';
            console.log(err);
          })
        })
    }
  }

}

export const passwordsValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const repeatPassword = control.get('repeatpassword');

  return password && repeatPassword && password.value !== repeatPassword.value 
    ? { passDoesntMatch: true } 
    : null;
};