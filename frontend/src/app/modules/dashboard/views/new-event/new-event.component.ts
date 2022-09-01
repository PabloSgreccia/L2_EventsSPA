import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// Services
import { AuthService } from '@etp/auth/services';
import { UserServiceService } from '@etp/shared/services';
import { EventServiceService, LocationServiceService } from '@etp/dashboard/services';
import { Event } from '../../interfaces/event/event';
import { MatDialog } from '@angular/material/dialog';
import { ModalMsgComponent } from '../../components/modal-msg/modal-msg.component';

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
    init_date: new FormControl('', {validators: [Validators.required]}),
    end_date: new FormControl('', {validators: [Validators.required]}),
    idType: new FormControl('', {validators: [Validators.required]}),
    photo: new FormControl(''),
  }, {validators: locationValidator})

  types: String[] = ['Sports', 'Party', 'Conference', 'Meeting']

  fileToUpload!: File | null;
  fileName = '';
  file!: File


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
    private locationService: LocationServiceService,
    private eventService: EventServiceService,
    public dialog: MatDialog
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

  createEvent(){
    // console.log(this.eventForm.controls.photo);
    
    if (this.eventForm.status === 'VALID') {
      if (this.file) {
        const formData = new FormData();
        formData.append("thumbnail", this.file);
      }
      this.eventService.createEvent(this.eventForm.value, this.file)
        .subscribe({
          next: (res: { status: number; msg: String; }) => {
            if (res.status === 200) {

              this.openDialog('Event successfully created')
            } 
            else{
              this.error = '';
              this.error = res.msg 
            }       
          }
          ,
          error: ((err: any) => {
            console.log(err);
          })
        })
      
    }
  }

  openDialog(msg: string) {
    this.dialog.open(ModalMsgComponent, {
      data: { msg },
    });
  }

  handleFileInput(event: any) {
    const file:File = event.target.files[0];
    console.log(event.target.files[0]);
    console.log((event.target.files[0].type).includes("image"));

    this.file = file;

    if (file) {
        this.fileName = file.name;
    }
  
  }


  modeChange(){
    this.eventForm.controls.province.reset();
    this.eventForm.controls.city.reset();
    this.eventForm.controls.street.reset();
    this.eventForm.controls.number.reset();
    this.eventForm.controls.link.reset();
  }

  get f() { return this.eventForm }
  get mode() { return this.eventForm.controls.mode }
  get title() { return this.eventForm.controls.title }
  get init_day() { return this.eventForm.controls.init_date }
  get end_day() { return this.eventForm.controls.end_date }
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