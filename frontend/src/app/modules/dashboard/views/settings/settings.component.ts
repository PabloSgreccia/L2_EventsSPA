import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// Interfaces
import { User } from '@etp/shared/interfaces';
// Services
import { UserServiceService } from '@etp/shared/services';
// Components
import { ModalToChangePhotoComponent, ModalToChangePwdComponent, ModalToEditComponent } from "@etp/dashboard/components";
import { AuthService } from '@etp/auth/services';
import { Router } from '@angular/router';


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
    //  this.authService.getLoggedUser().subscribe({
    //   next: (response) => {
    //     this.userService.updateUser(response.user);
    //   },
    //   error: ((err) => {
    //     this.router.navigate(['/signmenu'])
    //   }) 
    // })

    // Get user from observable
    this.userService.getUser().subscribe({
      next: (user: User) => {
        this.user = user
    }, error: () => {}})

    console.log(this.user);
    
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
    this.userService.updateVerifyStatus(this.user.id, 2).subscribe({
      next: (res) => {
        this.askDisabled = true
    }, error: () => {
      this.error = 'Something went wrong trying to process your request.'
    }})
  }

  // This functions WON'T delete an user, only the admin can delete users. the user will be marked as unactive
  deleteUser(){
    this.userService.desactivateUser(true).subscribe({
      next: (res) => {
        this.askDisabled = true
    }, error: () => {
      this.authService.logOut()
    }})
  }

}
