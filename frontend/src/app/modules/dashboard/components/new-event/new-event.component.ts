import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@etp/auth/services';
import { User } from '@etp/shared/interfaces';
import { LocationServiceService, UserServiceService } from '@etp/shared/services';

interface FilterInput {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'etp-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})

export class NewEventComponent implements OnInit { 
  eventForm = new FormGroup({
    title: new FormControl('', {validators: [Validators.required]}),
    description: new FormControl(''),
    mode: new FormControl('', {validators: [Validators.required]}),
    province: new FormControl(''),
    city: new FormControl(''),
    street: new FormControl(''),
    number: new FormControl(''),
    link: new FormControl(''),
    init_day: new FormControl('', {validators: [Validators.required]}),
    end_day: new FormControl('', {validators: [Validators.required]}),
    type: new FormControl('', {validators: [Validators.required]}),
    photo: new FormControl(''),
  }, {validators: locationValidator})

  types: String[] = ['Sports', 'Party', 'Conference', 'Meeting']

  error: String = '';

  @ViewChild("passwordInput") passwordInput!: ElementRef;
  @ViewChild("reppasswordInput") reppasswordInput!: ElementRef;
  
  provinces:FilterInput[] = [
    {value: "", viewValue: ""},
  ]
  
  cities:FilterInput[] = [
    {value: "", viewValue: ""},
  ]
  
  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserServiceService,
    private locationService: LocationServiceService,
    ) { }

  ngOnInit(): void {
    this.locationService.getProvinces()
    .subscribe({
      next: res => {
        this.provinces = (res.provincias).map(
          function(province:any) { 
            let mapProvince:FilterInput = {
              value: province.nombre,
              viewValue:province.nombre 
            };
            return mapProvince
          }
        )
        this.provinces.sort((a, b) => (a.value > b.value) ? 1 : -1)
      }
    })
  }

  changeProvince(){
    this.locationService.getProvincesCities(this.eventForm.controls.province.value || '')
    .subscribe({
      next: res => {
        this.cities = (res.localidades).map(
          function(city:any) { 
            // console.log(city.nombre);
            let mapCity:FilterInput = {
              value: city.nombre,
              viewValue:city.nombre 
            };
            return mapCity
          }
        )
        this.cities.sort((a, b) => (a.value > b.value) ? 1 : -1)

      }
    })
  }

  signUp(){
    
    if (this.eventForm.status === 'VALID') {
      console.log("simulacro de envío terminado");
      
      // this.user = {
      //   name: this.eventForm.controls.name.value || '',
      //   email: this.eventForm.controls.email.value || '',
      //   password: this.eventForm.controls.password.value || ''
      // }

    }
  }

  // onFileSelected(event: any){
  //    console.log(event);
  //    this.selectedFile = event.target.files[0]
  //    console.log(this.selectedFile);
  // }

  modeChange(){
    this.eventForm.controls.province.reset();
    this.eventForm.controls.city.reset();
    this.eventForm.controls.street.reset();
    this.eventForm.controls.number.reset();
    this.eventForm.controls.link.reset();
  }

  get f() { return this.eventForm }
  // get name() { return this.eventForm.controls.name }
  // get email() { return this.eventForm.controls.email }
  // get password() { return this.eventForm.controls.password }
  get mode() { return this.eventForm.controls.mode }
  get title() { return this.eventForm.controls.title }
  get init_day() { return this.eventForm.controls.init_day }
  get end_day() { return this.eventForm.controls.end_day }
  get province() { return this.eventForm.controls.province }
}

export const locationValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const mode = control.get('mode');
  const link = control.get('link');
  const province = control.get('province');
  const city = control.get('city');

  if (mode && link && (mode.value === 'virtual') && (link.value)) {
    return null
  } else if (mode && province && city && (mode.value === 'site') && (province.value) && (city.value)){
    return null
  } else if (mode && province && city && link && (mode.value === 'mixed') && (province.value) && (city.value) && (link.value)){
    return null
  }
  return { passDoesntMatch: true } 

};