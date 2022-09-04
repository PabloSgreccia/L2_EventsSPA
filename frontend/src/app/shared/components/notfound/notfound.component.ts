import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// Services
import { AuthService } from '@etp/auth/services';
import { UserServiceService } from '@etp/shared/services';

@Component({
  selector: 'etp-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss']
})
export class NotfoundComponent implements OnInit {

  constructor(
    private userService: UserServiceService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Get and save logged user data (anti refresh)
     this.authService.getLoggedUser().subscribe({
      next: (response) => {
        this.userService.updateUser(response.user);
      },
      error: ((err) => {
        this.router.navigate(['/signmenu'])
      }) 
    })
  }
}