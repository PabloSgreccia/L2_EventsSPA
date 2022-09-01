import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '@etp/shared/interfaces';
import { UserServiceService } from '@etp/shared/services';

@Component({
  selector: 'etp-modal-to-edit',
  templateUrl: './modal-to-edit.component.html',
  styleUrls: ['./modal-to-edit.component.scss']
})
export class ModalToEditComponent implements OnInit {

  dataForm = new FormGroup({
    name: new FormControl('', {validators: [Validators.required]}),
  })
  
  user!: User

  editResult = false;

  error: string = ''

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {name: string, email: string},
    private userService: UserServiceService,
  ) {
    this.dataForm.controls.name.setValue(data.name)
   }

  ngOnInit(): void {
  }

  saveData(){
    if (this.dataForm.status === 'VALID') {
      this.userService.editUserData(this.dataForm.controls.name.value || '')
        .subscribe({
          next: (res: { status: number; msg: string; }) => {
            if (res.status === 200) {
              this.userService.getUser().subscribe({
                next: user => {
                  this.user = user
                },
                error: (err) => {}
              })
              this.user.name = this.dataForm.controls.name.value || ''
              this.userService.updateUser(this.user),
              this.editResult = true
              // dialogRef.close();
            } 
            else{
              this.error = '';
              this.error = res.msg 
            }       
          }
          ,
          error: ((err: any) => {
            console.log(err);
          })
        })
    }

  }

}
