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
  }

  islogged(){
    if (this.authService.loggedIn()) {
      let token = this.authService.getToken() || ''
      this.user = jwt_decode(token);
      // console.log(this.user);
      return true
    } else {
      return false
    }
  }

  logOut(){
    this.authService.logOut()
  }

}
