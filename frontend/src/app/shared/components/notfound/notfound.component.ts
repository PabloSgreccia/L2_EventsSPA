import { Component, OnInit } from '@angular/core';
import { User } from '@etp/shared/interfaces';
import { UserServiceService } from '../../services/userService/user-service.service';

@Component({
  selector: 'etp-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss']
})
export class NotfoundComponent implements OnInit {

  constructor(
    private userService: UserServiceService
  ) { }

  ngOnInit(): void {
    // this.authService.getLoggedUser().subscribe({
       //       next: (user:User) => {
       //         this.userService.updateUser(user);
       //       }
       //      })
       const user: User = {
         id: 3, 
         name: 'Pablo Sgreccia', 
         email: 'pablosgreccia@gmail.com', 
         role: 'admin', 
         validated: 1, 
         photo: 'https://thumbs.dreamstime.com/b/icono-del-var%C3%B3n-del-usuario-ninguna-cara-43652345.jpg',
       }
       this.userService.updateUser(user);
  }

  }


