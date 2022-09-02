import { Component, OnInit } from '@angular/core';
import { User } from '@etp/shared/interfaces';
import { UserServiceService } from '@etp/shared/services';
import { AuthService } from '../auth/services/auth/auth.service';

@Component({
  selector: 'etp-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

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