import { Component, OnInit } from '@angular/core';
import { AuthService } from '@etp/auth/services';
import { User } from '@etp/shared/interfaces';
import { UserServiceService } from '../../services/userService/user-service.service';

@Component({
  selector: 'etp-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(
    private userService: UserServiceService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // Get and save logged user data (anti refresh)
     this.authService.getLoggedUser().subscribe({
      next: (user:User) => {
        this.userService.updateUser(user);
      }
    })
  }

}
