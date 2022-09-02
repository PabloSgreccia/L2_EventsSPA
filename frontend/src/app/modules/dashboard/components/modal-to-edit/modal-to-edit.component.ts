import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '@etp/shared/interfaces';
import { UserServiceService } from '@etp/shared/services';

@Component({
  selector: 'etp-modal-to-edit',
  templateUrl: './modal-to-edit.component.html',
  styleUrls: ['./modal-to-edit.component.scss']
})
export class ModalToEditComponent implements OnInit {

  dataForm = new FormGroup({
    name: new FormControl('', {validators: [Validators.required, Validators.pattern('[a-zA-Z ]*')]}),
  })
  
  user!: User
  error: string = ''

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {name: string, email: string},
    private userService: UserServiceService,
    private dialogRef: MatDialogRef<ModalToEditComponent>
  ) {
    this.dataForm.controls.name.setValue(data.name)
   }

  ngOnInit(): void {
  }

  saveName(){
    if (this.dataForm.status === 'VALID') {
      this.userService.editUserData(this.dataForm.controls.name.value || '')
        .subscribe({
          next: (res: { status: number; msg: string; }) => {
            if (res.status === 200) {
              this.dialogRef.close(true);
            } 
            else{
              this.error = 'Something went wrong trying to update your name.';
            }       
          },
          error: ((err: any) => {
            this.error = 'Something went wrong trying to update your name.';
            console.log(err);
          })
        })
    }
  }

}
