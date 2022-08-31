import { Component, OnInit } from '@angular/core';
import { AuthService } from '@etp/auth/services';
import { User } from '@etp/shared/interfaces';
import { UserServiceService } from '../../services/userService/user-service.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'etp-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user: User = {
    _id: 0,
    name: '',
    email: '',
    role: ''
  }

  constructor(
    private authService: AuthService,
    private userService: UserServiceService
  ) { }

  ngOnInit(): void {
    // if (this.authService.loggedIn()) {
    //   this.userService.getUserData()
    //   .subscribe({
    //     next: res => {
    //       console.log("BBBBBBBBBBBBBBBBBBB");
    //       console.log(res);
    //       console.log("BBBBBBBBBBBBBBBBBBB");
    //       this.user = res
    //     }
    //   })
    // } else{
    //   console.log("CCCCCCCCCCCCCC");
    // }
  }

  islogged(){
    if (this.authService.loggedIn()) {
      this.user = this.userService.getUserData()
      return true
    } else {
      return false
    }
  }

  logOut(){
    this.authService.logOut()
  }

}
