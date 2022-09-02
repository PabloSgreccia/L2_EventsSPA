import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    // Get and save logged user data (anti refresh)
    //  this.authService.getLoggedUser().subscribe({
    //   next: (user:User) => {        
    //     this.userService.updateUser(user);
    //     this.user = user
    //   }
    // })

    // console.log(this.user);

    this.userService.getUser().subscribe({
      next: (user: User) => {
        this.user = user
    }, error: () => {}})

    this.user.validated = 1

    console.log(this.user);
    
  }

  changePhotoDialog(){
    const dialogRef = this.dialog.open(ModalToChangePhotoComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.getOneUser(this.user.id).subscribe({
          next: (user: User) => {
            this.user = user
        }, error: () => {
          this.router.navigate(['/error']);
        }})
      }
    });
  }

  changeDataDialog(){
    const dialogRef = this.dialog.open(ModalToEditComponent, {
      data: { 
        'id': this.user.id,
        'name': this.user.name
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.getOneUser(this.user.id).subscribe({
          next: (user: User) => {
            this.user = user
        }, error: () => {
          this.router.navigate(['/error']);
        }})
      }
    });
  }

  changePassDialog(){
    this.dialog.open(ModalToChangePwdComponent);
  }

  askForValidation(){    
    this.userService.updateVerifyStatus(this.user.id, 2).subscribe({
      next: (res) => {
        this.askDisabled = true
    }, error: () => {
      this.error = 'Something went wrong trying to process your request.'
    }})
  }

  deleteUser(){
    this.userService.desactivateUser(true).subscribe({
      next: (res) => {
        this.askDisabled = true
    }, error: () => {
      this.authService.logOut()
    }})
  }

}
