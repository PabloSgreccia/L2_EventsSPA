import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
// Interfaces
import { User } from '@etp/shared/interfaces';
// Services
import { AuthService } from '@etp/auth/services';
import { UserServiceService } from '@etp/shared/services';
// Components
import { ModalMsgComponent } from '../modal-msg/modal-msg.component';

@Component({
  selector: 'etp-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user!: User

  constructor(
    private authService: AuthService,
    private userService: UserServiceService,
    public dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // Get user data
    this.userService.getUser().subscribe({
      next: (res:User) => {        
        this.user = res
    }, error: () => {
      const dialogRef = this.dialog.open(ModalMsgComponent, { data: { title: 'Error', msg: 'Ocurrió un error al intentar obtener los datos del usuario.' } });
      dialogRef.afterClosed().subscribe(_ => { this.router.navigate(['/signmenu']) });
    }})
  }

  logOut(){
    this.authService.logOut()
  }

}
