import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TypeServiceService } from '@etp/dashboard/services';
import { User } from '@etp/shared/interfaces';
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
    private typesService: TypeServiceService,
    private userService: UserServiceService
  ) { }

  ngOnInit(): void {
    this.getUsersList()
  }

  getUsersList(){
    this.userService.getManyUsers()
    .subscribe({
      next: res => {        
        this.initUsersList = res.users
        this.editedUsersList = res.users
      },
      error: (err) => {}
    })
  }

  // Delete user functionality
  deleteUser(id:number){
    this.userService.deleteUser(id).subscribe(_ => {this.getUsersList()})
  }

  // Filter by user name or email
  async onKeyUp(){
    if (this.filterByUser?.nativeElement.value.length >=1) {
      this.editedUsersList = this.initUsersList
        .filter(user => {
          (user.name.toLowerCase()).includes((this.filterByUser?.nativeElement.value).toLowerCase())
          || (user.email.toLowerCase()).includes((this.filterByUser?.nativeElement.value).toLowerCase()) 
        })
    } else{
      this.editedUsersList = this.initUsersList
    }
  }
}
