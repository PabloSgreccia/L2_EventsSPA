import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalMsgComponent } from '@etp/shared/components';
// Interfaces
import { User } from '@etp/shared/interfaces';
// Services
import { UserServiceService } from '@etp/shared/services';

@Component({
  selector: 'etp-verifications',
  templateUrl: './verifications.component.html',
  styleUrls: ['./verifications.component.scss']
})
export class VerificationsComponent implements OnInit {

  initUsersList!: User[]
  selectedUser!: User
  msg!:string

  constructor(
    private userService: UserServiceService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getUsersList()
  }

  // Get list of users with pending verification
  getUsersList(){
    this.userService.getVerificationPendingsUsers()
    .subscribe({
      next: res => {
        this.initUsersList = res.users
      },
      error: (err) => {}
    })
  }

  updateVerification(id:number, status:number){
    this.userService.updateVerifyStatus(id, status)
    .subscribe({
      next: (res) => { 
        this.getUsersList() 
        this.initUsersList = this.initUsersList.filter(user => user.id !== id);
        if (status === 1) {
          this.msg = `Verificacion a usuario con ID ${id} rechazada`;
        } else {
          this.msg = `Verificacion a usuario con ID ${id} aceptada`;
        }
        setTimeout(()=>{ this.msg = '' }, 3000);     
      },
      error: ((err) => { 
        this.dialog.open(ModalMsgComponent, { data: { title: 'Error', msg: 'Ocurrió un error, vuelva a intentar.'} });
      }) 
    })

  }
}
