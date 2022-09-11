import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalBeforeDeleteComponent } from '@etp/dashboard/components';
import { ModalMsgComponent } from '@etp/shared/components';
// Interfaces
import { User } from '@etp/shared/interfaces';
// Services
import { UserServiceService } from '@etp/shared/services';

@Component({
  selector: 'etp-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  initUsersList!: User[]
  editedUsersList!: User[]
  msg!:string

  @ViewChild("filterByUser") filterByUser: ElementRef | undefined;
  
  constructor(
    private userService: UserServiceService,
    public dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getUsersList()
  }

  // Get user list from BE
  getUsersList(){
    this.userService.getManyUsers()
    .subscribe({
      next: res => {        
        this.initUsersList = res.users.filter( (user: User) => user.role != 'admin')
        this.editedUsersList = this.initUsersList
      },
      error: (err) => {
        const dialogRef = this.dialog.open(ModalMsgComponent, { data: { title: 'Error', msg: 'Ocurrió un error al intentar obtener la lista de usuarios.' } });
        dialogRef.afterClosed().subscribe(_ => { this.router.navigate(['/admin/panel']) });
      }
    })
  }

  // Delete user functionality
  deleteUser(id:number, name:string){
    const dialogRef = this.dialog.open(ModalBeforeDeleteComponent, { data: { model: `usuario "${name}"`, id: id } });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(id).subscribe({
          next: res => {
            this.initUsersList = this.initUsersList.filter(user => user.id !== id);
            this.editedUsersList = this.editedUsersList.filter(user => user.id !== id);
            this.msg = `Usuario con ID ${id} eliminado`;
            setTimeout(()=>{ this.msg = '' }, 3000);     
          },
          error: (err) => {
            this.dialog.open(ModalMsgComponent, { data: { title: 'Error', msg: 'Ocurrió un error al intentar borrar el usuario.' } });
          }
        }) 
      }}
    )
  }

  // Filter by user name or email
  async onKeyUp(){
    if (this.filterByUser?.nativeElement.value.length >=1) {
      let text = (this.filterByUser?.nativeElement.value).toLowerCase()
      this.editedUsersList = this.initUsersList
        .filter(user => (user.name.toLowerCase()).includes(text) || (user.email.toLowerCase()).includes(text) )
    } else{
      this.editedUsersList = this.initUsersList
    }
  }
}
