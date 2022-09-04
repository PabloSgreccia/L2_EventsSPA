import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalErrorComponent } from '@etp/shared/components';
// Interfaces
import { User } from '@etp/shared/interfaces';
// Services
import { UserServiceService } from '@etp/shared/services';

@Component({
  selector: 'etp-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  initUsersList!: User[]
  editedUsersList!: User[]

  @ViewChild("filterByUser") filterByUser: ElementRef | undefined;
  
  constructor(
    private userService: UserServiceService,
    public dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getUsersList()
  }

  getUsersList(){
    this.userService.getManyUsers()
    .subscribe({
      next: res => {        
        this.initUsersList = res.users
        this.editedUsersList = this.initUsersList
      },
      error: (err) => {
        const dialogRef = this.dialog.open(ModalErrorComponent, { data: { msg: 'Something went wrong, try again' } });
        dialogRef.afterClosed().subscribe(_ => { this.router.navigate(['/admin/panel']) });
      }
    })
  }

  // Delete user functionality
  deleteUser(id:number){
    this.userService.deleteUser(id)
    .subscribe({
      next: res => { this.getUsersList()},
      error: (err) => {
        const dialogRef = this.dialog.open(ModalErrorComponent, { data: { msg: 'Something went wrong, try again' } });
        dialogRef.afterClosed().subscribe(_ => { this.router.navigate(['/admin/panel']) });
      }
    })
  }

  // Filter by user name or email
  async onKeyUp(){
    if (this.filterByUser?.nativeElement.value.length >=1) {
      let text = (this.filterByUser?.nativeElement.value).toLowerCase()
      this.editedUsersList = this.initUsersList
        .filter(user => (user.name.toLowerCase()).includes(text) || (user.email.toLowerCase()).includes(text) )
    } else{
      this.editedUsersList = this.initUsersList
    }
  }
}
