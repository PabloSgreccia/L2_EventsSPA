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
    this.typesService.getTypes()
    .subscribe({
      next: user => {
        this.initUsersList = user
        this.editedUsersList = user
      },
      error: (err) => {}
    })
  }

  deleteUser(id:number){
    this.userService.deleteUser(id)
  }

  // Filter by user
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
