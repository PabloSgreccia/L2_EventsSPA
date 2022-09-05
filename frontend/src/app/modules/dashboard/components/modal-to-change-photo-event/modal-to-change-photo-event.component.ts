import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventServiceService } from '../../services/eventService/event-service.service';

@Component({
  selector: 'etp-modal-to-change-photo-event',
  templateUrl: './modal-to-change-photo-event.component.html',
  styleUrls: ['./modal-to-change-photo-event.component.scss']
})
export class ModalToChangePhotoEventComponent implements OnInit {
  
  file!: File
  error: string = ''

  constructor(
    private eventService: EventServiceService,
    private dialogRef: MatDialogRef<ModalToChangePhotoEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {eventId: number}
  ) {  }

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
      this.eventService.updateEventPhoto(this.file, this.data.eventId)
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
