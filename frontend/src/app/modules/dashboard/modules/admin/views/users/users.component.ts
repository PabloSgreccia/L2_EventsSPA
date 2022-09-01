import { Component, OnInit } from '@angular/core';
import { User } from '@etp/shared/interfaces';

@Component({
  selector: 'etp-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  usersList!: User[]

  constructor() { }

  ngOnInit(): void {
    
  }

}
