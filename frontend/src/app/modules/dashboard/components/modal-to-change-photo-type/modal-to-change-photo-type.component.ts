import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventServiceService, TypeServiceService } from '@etp/dashboard/services';

@Component({
  selector: 'etp-modal-to-change-photo-type',
  templateUrl: './modal-to-change-photo-type.component.html',
  styleUrls: ['./modal-to-change-photo-type.component.scss']
})
export class ModalToChangePhotoTypeComponent implements OnInit {

  file!: File
  error: string = ''

  constructor(
    private typeService: TypeServiceService,
    private dialogRef: MatDialogRef<ModalToChangePhotoTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {typeId: number}
  ) {}

  ngOnInit(): void {

  }

  savePhoto(){
    // Validate if the user selected an image
    if (!this.file) {
      this.error = 'Select an image.' 
    } else if (this.file && !(this.file.type).includes("image")) {
      this.error = 'Select an image.' 
    } else {
      // BE API
      this.typeService.updateTypePhoto(this.file, this.data.typeId)
        .subscribe({
          next: () => {this.dialogRef.close(true)},            
          error: ((err: any) => {
            this.error = 'Something went wrong trying to update your photo.';
          })
        })
    }
  }

  // File input manager
  handleFileInput(event: any) {
    const file:File = event.target.files[0];
    this.file = file;
    if (this.file && !(this.file.type).includes("image")) {
      this.error = 'Select an image.' 
    } else{
      this.error = '' 
    }
  }
}
