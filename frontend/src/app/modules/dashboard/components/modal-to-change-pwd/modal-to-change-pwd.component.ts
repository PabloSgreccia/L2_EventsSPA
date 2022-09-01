import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UserServiceService } from '@etp/shared/services';

@Component({
  selector: 'etp-modal-to-change-pwd',
  templateUrl: './modal-to-change-pwd.component.html',
  styleUrls: ['./modal-to-change-pwd.component.scss']
})
export class ModalToChangePwdComponent implements OnInit {

  passForm = new FormGroup({
    oldPass: new FormControl('', {validators: [Validators.required]}),
    newPass: new FormControl('', {validators: [Validators.required, Validators.pattern(''), Validators.minLength(8)]}),
    repPass: new FormControl('', {validators: [Validators.required, Validators.pattern(''), Validators.minLength(8)]}),
  }, {validators: passwordsValidator})
  
  error: string = ''

  constructor(private userService: UserServiceService,) {}

  ngOnInit(): void {}

  savePass(){
    if (this.passForm.status === 'VALID') {
      this.userService.editUserPwd(this.passForm.controls.newPass.value || '', this.passForm.controls.oldPass.value  || '', )
        .subscribe({
          next: (res: { status: number; msg: string; }) => {
            if (res.status === 200) {
              // dialogRef.close();
            } 
            else{
              this.error = '';
              this.error = res.msg 
            }       
          },
          error: ((err: any) => {
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