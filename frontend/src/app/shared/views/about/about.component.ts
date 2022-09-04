import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@etp/auth/services';
import { UserServiceService } from '../../services/userService/user-service.service';

@Component({
  selector: 'etp-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

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
        // this.router.navigate(['/signmenu'])
      }) 
    })
  }

}
