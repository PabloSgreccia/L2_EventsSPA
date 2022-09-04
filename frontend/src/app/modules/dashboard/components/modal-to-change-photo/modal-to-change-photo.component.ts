import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserServiceService } from '@etp/shared/services';

@Component({
  selector: 'etp-modal-to-change-photo',
  templateUrl: './modal-to-change-photo.component.html',
  styleUrls: ['./modal-to-change-photo.component.scss']
})

export class ModalToChangePhotoComponent implements OnInit {

  file!: File
  error: string = ''

  constructor(
    private userService: UserServiceService,
    private dialogRef: MatDialogRef<ModalToChangePhotoComponent>
  ) { }

  ngOnInit(): void {

  }

  savePhoto() {
    // Validate if the user selected an image
    if (!this.file) {
      this.error = 'Select an image.'
    } else if (this.file && !(this.file.type).includes("image")) {
      this.error = 'Select an image.'
    } else {
      // BE API
      this.userService.editUserPhoto(this.file)
        .subscribe({
          next: (res) => {
            this.dialogRef.close(true);
          },
          error: ((err: any) => {
            this.error = 'Something went wrong trying to update your photo.';
            console.log(err);
          })
        })
    }

  }

  // File input manager
  handleFileInput(event: any) {
    const file: File = event.target.files[0];
    this.file = file;
    if (this.file && !(this.file.type).includes("image")) {
      this.error = 'Select an image.'
    } else {
      this.error = ''
    }
  }
}
