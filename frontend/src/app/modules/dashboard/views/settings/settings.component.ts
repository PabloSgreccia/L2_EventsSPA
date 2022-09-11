import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
// Interfaces
import { User } from '@etp/shared/interfaces';
// Services
import { UserServiceService } from '@etp/shared/services';
import { AuthService } from '@etp/auth/services';
// Components
import { ModalBeforeDeleteComponent, ModalToChangePhotoComponent, ModalToChangePwdComponent, ModalToEditComponent } from "@etp/dashboard/components";
import { ModalMsgComponent } from '@etp/shared/components';


@Component({
  selector: 'etp-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})

export class SettingsComponent implements OnInit {

  user!: User
  askDisabled: boolean = false;
  error: string = ''

  constructor(
    private router: Router,
    private userService: UserServiceService,
    private dialog: MatDialog,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // Get user from observable
    this.userService.getUser().subscribe({
      next: (user: User) => {
        this.user = user
    }, error: () => {}})

  }

  // Open modal to change photo
  changePhotoDialog(){
    const dialogRef = this.dialog.open(ModalToChangePhotoComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authService.getLoggedUser().subscribe({
         next: (response) => {            
           this.userService.updateUser(response.user);
         },
         error: ((err) => {
           this.router.navigate(['/signmenu'])
         }) 
       })
      }
    });
  }

  // Open modal to change name
  changeDataDialog(){
    const dialogRef = this.dialog.open(ModalToEditComponent, {
      data: { 
        'id': this.user.id,
        'name': this.user.name
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
         this.authService.getLoggedUser().subscribe({
          next: (response) => {            
            this.userService.updateUser(response.user);
          },
          error: ((err) => {
            this.router.navigate(['/signmenu'])
          }) 
        })
      }
    });
  }

  // Open modal to change password
  changePassDialog(){
    this.dialog.open(ModalToChangePwdComponent);
  }

  // Sends request to admin to validate his account
  askForValidation(){    
    this.userService.updateVerifyStatusUser(2).subscribe({
      next: (res) => { this.askDisabled = true }, 
      error: () => { 
        this.dialog.open(ModalMsgComponent, { data: { title: 'Error', msg: 'Ocurrió un error, reintente.' } });
      }})
  }

  // This functions WON'T delete an user, only the admin can delete users. the user will be marked as unactive
  deleteUser(){
    const dialogRef = this.dialog.open(ModalBeforeDeleteComponent, { data: { model: 'usuario', id: 0 } });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.desactivateUser(false).subscribe({
          next: res => { this.authService.logOut() },
          error: (err) => {
            this.dialog.open(ModalMsgComponent, { data: { title: 'Error', msg: 'Ocurrió un error, reintente.' } });
          }
        }) 
      }}
    )
  }
}
