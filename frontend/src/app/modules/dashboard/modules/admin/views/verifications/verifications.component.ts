import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalErrorComponent } from '@etp/shared/components';
import { User } from '@etp/shared/interfaces';
import { UserServiceService } from '@etp/shared/services';

@Component({
  selector: 'etp-verifications',
  templateUrl: './verifications.component.html',
  styleUrls: ['./verifications.component.scss']
})
export class VerificationsComponent implements OnInit {

  initUsersList!: User[]
  selectedUser!: User

  constructor(
    private userService: UserServiceService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getUsersList()
  }

  getUsersList(){
    this.userService.getVerificationPendingsUsers()
    .subscribe({
      next: res => {
        this.initUsersList = res.users
      },
      error: (err) => {}
    })
  }

  declineVerification(id:number){
    this.userService.updateVerifyStatus(id, 1)
    .subscribe({
      next: (res) => { this.getUsersList() },
      error: ((err) => { this.openErrorDialog("Something went wrong, try again.") }) 
    })
  }

  acceptVerification(id:number){
    this.userService.updateVerifyStatus(id, 3)
    .subscribe({
      next: (res) => { this.getUsersList() },
      error: ((err) => { this.openErrorDialog("Something went wrong, try again.") }) 
    })
  }

  // Open error dialog
  openErrorDialog(msg: string) {
    this.dialog.open(ModalErrorComponent, { data: { msg } });
  }

}
