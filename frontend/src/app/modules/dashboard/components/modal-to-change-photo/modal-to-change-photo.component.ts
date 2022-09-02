import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '@etp/shared/services';

@Component({
  selector: 'etp-modal-to-change-photo',
  templateUrl: './modal-to-change-photo.component.html',
  styleUrls: ['./modal-to-change-photo.component.scss']
})
export class ModalToChangePhotoComponent implements OnInit {
  
  fileToUpload!: File | null;
  fileName = '';
  file!: File

  photo = ''
  
  error: string = ''

  constructor(private userService: UserServiceService,) {}

  ngOnInit(): void {

  }

  savePhoto(){
    if (this.file && (this.file.type).includes("image")) {
      const formData = new FormData();
      formData.append("thumbnail", this.file);

      this.userService.editUserPhoto(this.file)
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

  handleFileInput(event: any) {
    const file:File = event.target.files[0];
    console.log(event.target.files[0]);
    console.log((event.target.files[0].type).includes("image"));

    this.file = file;

    if (file) {
        this.fileName = file.name;
    }
  
  }

}
