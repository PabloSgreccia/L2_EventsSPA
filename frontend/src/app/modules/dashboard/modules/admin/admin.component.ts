import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@etp/auth/services';
import { UserServiceService } from '@etp/shared/services';

@Component({
  selector: 'etp-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    private userService: UserServiceService,
    private authService: AuthService,
    private router: Router,
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