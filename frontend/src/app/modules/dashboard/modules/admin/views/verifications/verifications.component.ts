import { Component, OnInit } from '@angular/core';
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
    private userService: UserServiceService
  ) { }

  ngOnInit(): void {
    this.getUsersList()
  }

  getUsersList(){
    this.userService.getVerificationPendingsUsers()
    .subscribe({
      next: user => {
        this.initUsersList = user
      },
      error: (err) => {}
    })
  }

  declineVerification(id:number){
    this.userService.updateVerifyStatus(id, 1).subscribe(_ => {this.getUsersList()})
  }

  acceptVerification(id:number){
    this.userService.updateVerifyStatus(id, 3).subscribe(_ => {this.getUsersList()})
  }
  
}
