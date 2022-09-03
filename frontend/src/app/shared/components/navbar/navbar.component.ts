import { Component, OnInit } from '@angular/core';
// Interfaces
import { User } from '@etp/shared/interfaces';
// Services
import { UserServiceService } from '../../services/userService/user-service.service';
import { AuthService } from '@etp/auth/services';

@Component({
  selector: 'etp-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user!: User

  constructor(
    private authService: AuthService,
    private userService: UserServiceService
  ) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe({
      next: (res:User) => {        
        this.user = res
    }, error: () => {}})
  }

  logOut(){
    this.authService.logOut()
  }

}
