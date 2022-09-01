import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// Interfaces
import { User } from '@etp/shared/interfaces';
// Services
import { UserServiceService } from '@etp/shared/services';
// Components
import { ModalToChangePhotoComponent, ModalToChangePwdComponent, ModalToEditComponent } from "@etp/dashboard/components";


@Component({
  selector: 'etp-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  user!: User
  
  constructor(
    private userService: UserServiceService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe({
      next: (user: User) => {
      this.user = user
    }, error: () => {}})
  }

  changePhotoDialog(){
    this.dialog.open(ModalToChangePhotoComponent);
  }

  changeDataDialog(){
    this.dialog.open(ModalToEditComponent, {
      data: { 
        'name': this.user.name,
        'email': this.user.email 
      }
    });
  }

  changePassDialog(){
    this.dialog.open(ModalToChangePwdComponent);
  }

}
