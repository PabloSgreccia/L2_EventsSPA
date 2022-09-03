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

  // Vars
  user!: User
  error: string = ''

  // Form
  dataForm = new FormGroup({
    name: new FormControl('', {validators: [Validators.required, Validators.pattern('[a-zA-Z ]*')]}),
  })
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {name: string, email: string},
    private userService: UserServiceService,
    private dialogRef: MatDialogRef<ModalToEditComponent>
  ) {
    this.dataForm.controls.name.setValue(data.name)
   }

  ngOnInit(): void {
  }

  // Change Name
  saveName(){
    if (this.dataForm.status === 'VALID' && this.dataForm.controls.name.value) {
      this.userService.editUserData(this.dataForm.controls.name.value)
        .subscribe({
          next: (res) => { this.dialogRef.close(true) },
          error: ((err: any) => {
            this.error = 'Something went wrong trying to update your name.';
            console.log(err);
          })
        })
    }
  }

}
