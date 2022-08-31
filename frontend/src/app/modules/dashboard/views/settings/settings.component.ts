import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// Interfaces
import { User } from '@etp/shared/interfaces';
// Services
import { UserServiceService } from '@etp/shared/services';
// Components
import { ModalToEditComponent } from "@etp/dashboard/components";


@Component({
  selector: 'etp-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  user: User = {
    _id: 0,
    name: '',
    email: '',
    photo: '',
    validated: 1,
  }
  
  photoSection: boolean = false
  dataSection: boolean = false
  passwordSection: boolean = false

  dataForm = new FormGroup({
    name: new FormControl('', {validators: [Validators.required]}),
    email: new FormControl('', {validators: [Validators.required, Validators.email]}),
  })

  passForm = new FormGroup({
    oldPass: new FormControl('', {validators: [Validators.required]}),
    newPass: new FormControl('', {validators: [Validators.required, Validators.pattern(''), Validators.minLength(8)]}),
    repPass: new FormControl('', {validators: [Validators.required, Validators.pattern(''), Validators.minLength(8)]}),
  })

  constructor(
    private userService: UserServiceService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.user = this.userService.getUserData()
  }

  changePhotoDialog(){
    this.photoSection = true;
    this.dataSection = false
    this.passwordSection = false
  }

  changeDataDialog(){
    
    this.dialog.open(ModalToEditComponent);

    // this.photoSection = false;
    // this.dataSection = true
    // this.passwordSection = false

    // if (this.user.name) {
    //   this.dataForm.controls.name.setValue(this.user.name)
    // }
    // if (this.user.email) {
    //   this.dataForm.controls.email.setValue(this.user.email)
    // }
  }

  changePassDialog(){
    this.photoSection = false;
    this.dataSection = false
    this.passwordSection = true
  }

  savePhoto(){
    
  }
  saveData(){
    
  }
  savePass(){
    
  }

}
