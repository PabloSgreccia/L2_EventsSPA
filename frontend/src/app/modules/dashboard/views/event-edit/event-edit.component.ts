import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import {Location} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
// Services
import { EventServiceService, LocationServiceService, TypeServiceService } from '@etp/dashboard/services';
//Interfaces
import { Type } from '@etp/dashboard/interfaces';
// Components
import { ModalErrorComponent, ModalMsgComponent } from '@etp/shared/components';
import { ModalToChangePhotoEventComponent } from '@etp/dashboard/components';


@Component({
  selector: 'etp-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.scss']
})

export class EventEditComponent implements OnInit {
  types!: Type[]
  file!: File
  error: String = '';
  provinces!:string[]
  cities!:string[]
  spinner: boolean = false

  // Form
  eventForm = new FormGroup({
    id: new FormControl('', {validators: [Validators.required]}),
    title: new FormControl('', {validators: [Validators.required, Validators.maxLength(40)]}),
    description: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    mode: new FormControl('', {validators: [Validators.required]}),
    province: new FormControl(''),
    city: new FormControl(''),
    street: new FormControl('', [Validators.maxLength(20)]),
    number: new FormControl(0, [Validators.max(9999)]),
    link: new FormControl('', [Validators.maxLength(30)]),
    init_date: new FormControl('', {validators: [Validators.required]}),
    end_date: new FormControl('', {validators: [Validators.required]}),
    init_hour: new FormControl(0, {validators: [Validators.required, Validators.min(0), Validators.max(23)]}),
    end_hour: new FormControl(0, {validators: [Validators.required, Validators.min(0), Validators.max(23)]}),
    idType: new FormControl(0, {validators: [Validators.required]}),
  }, {validators: [locationValidator]})
  get f() { return this.eventForm }
  get mode() { return this.eventForm.controls.mode }
  get title() { return this.eventForm.controls.title }
  get province() { return this.eventForm.controls.province }
  get description() { return this.eventForm.controls.province }
  get street() { return this.eventForm.controls.province }
  get number() { return this.eventForm.controls.province }
  get link() { return this.eventForm.controls.province }
  get init_hour() { return this.eventForm.controls.province }
  get end_hour() { return this.eventForm.controls.province }

  descType!: string
  
  constructor(
    private locationService: LocationServiceService,
    private eventService: EventServiceService,
    private typeService: TypeServiceService,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location
    ) { }

  ngOnInit(): void {
    // Get external API info about provinces and cities in Argentina
    this.locationService.getProvinces()
    .subscribe({
      next: res => {
        this.provinces = (res.provincias).map(function(province:any) { return province.nombre })
        this.provinces.sort()//(a, b) => (a.value > b.value) ? 1 : -1)
      },
      error: ((err: any) => {
        this.dialog.open(ModalErrorComponent, { data: { msg: 'Something went wrong trying to get provinces' } });
      })
    })


    // Get types of events from BE
    this.typeService.getTypes()
    .subscribe({
      next: res => {        
          if (res.types[0].type) {
            this.types = res.types
            this.types.sort(function(a, b) { return b.id < a.id? 1 : -1; });
          } else { 
            this.error = res.msg 
          }       
        },
        error: ((err: any) => {
          const dialogRef = this.dialog.open(ModalErrorComponent, { data: { msg: 'Something went wrong, try again' } });
          dialogRef.afterClosed().subscribe(_ => { this.location.back() });
        })
      })
      
    // get event info by observable
    this.eventService.getEvent().subscribe({
      next: event => {
        const eventId = this.activatedRoute.snapshot.paramMap.get("id");
        this.eventForm.controls.id.setValue(eventId)
        this.eventForm.controls.title.setValue(event.title || '')
        this.eventForm.controls.description.setValue(event.description || '')
        this.eventForm.controls.mode.setValue(event.mode || '')
        this.eventForm.controls.province.setValue(event.province || '')
        this.eventForm.controls.city.setValue(event.city || '')
        this.eventForm.controls.street.setValue(event.street || '')
        this.eventForm.controls.number.setValue(event.number || 0)
        this.eventForm.controls.link.setValue(event.link || '')
        this.eventForm.controls.init_date.setValue((event.init_date).toString())
        this.eventForm.controls.end_date.setValue((event.end_date).toString())
        this.eventForm.controls.idType.setValue(event.idType)
        this.descType = event.type.type
      },
      error: (err) => {
        this.dialog.open(ModalErrorComponent, { data: { msg: 'Something went wrong trying to get preloaded data' } });
      }
    })
  }

  // When a user select a province, we search the cities of that province
  changeProvince(){
    this.locationService.getProvincesCities(this.eventForm.controls.province.value || '')
    .subscribe({
      next: res => {
        this.cities = (res.localidades).map( function(city:any) { return city.nombre})
        this.cities.sort()
      },
      error: ((err: any) => {
        this.dialog.open(ModalErrorComponent, { data: { msg: 'Something went wrong trying to get cities' } });
      })
    })
  }

  // Edit an event
  editEvent(){
    if (this.eventForm.status === 'VALID') {
      // Formatting dates
        const startevent = new Date(`${this.eventForm.controls.init_date.value}`);
        startevent.setHours(this.eventForm.controls.init_hour.value || 0);
        const endevent = new Date(`${this.eventForm.controls.end_date.value}`);
        endevent.setHours(this.eventForm.controls.end_hour.value || 0);     
  
        // Validate if some hour is higer than 23
        if (
          this.eventForm.controls.init_hour.value 
          && this.eventForm.controls.end_hour.value   
          && (this.eventForm.controls.init_hour.value > 23 || this.eventForm.controls.end_hour.value > 23) ) {
            this.error = 'Error in hours.' 
        // Validate if there is end date is lower than init date
        } else if (startevent > endevent) {
          this.error = 'Error in dates.' 
        // Validate if the init day is highen than today
        } else if (startevent < new Date()) {
          this.error = 'Init day is lower than today.' 
        // Validate if the file isnt an image
        } else if (this.file && !(this.file.type).includes("image")) {
          this.error = 'Error in File.' 
        } else {

          let newEvent = this.eventForm.value;
          newEvent.init_date = startevent.toString()
          newEvent.end_date = endevent.toString()

          // BE API
          this.spinner = true;
          this.eventService.updateEvent(newEvent)
            .subscribe({
              next: (res: { status: number; msg: String; }) => {
                  this.spinner = false
                  const dialogRef = this.dialog.open(ModalMsgComponent, { data: { msg: 'Event successfully updated.' } });
                  dialogRef.afterClosed().subscribe(_ => { this.location.back() });
              },            
              error: ((err: any) => {
                this.spinner = false
                this.dialog.open(ModalErrorComponent, { data: { msg: 'Something went wrong, try again' } });
              })
            })
        }
    }
  }

  // Change event photo
  changePhoto(){
    const dialogRef = this.dialog.open(ModalToChangePhotoEventComponent, { data: { eventId: this.eventForm.controls.id.value } });
    dialogRef.afterClosed()
    .subscribe(result => {
        if (result) { this.dialog.open(ModalMsgComponent, { data: { msg: 'Event photo successfully updated.' } });
      }
    });
  }

  // Reset form data when user changes the event mode (virtual/on-site/mixed)
  modeChange(){
    this.eventForm.controls.province.reset();
    this.eventForm.controls.city.reset();
    this.eventForm.controls.street.reset();
    this.eventForm.controls.number.reset();
    this.eventForm.controls.link.reset();
  }

}

const locationValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const mode = control.get('mode');
  const link = control.get('link');
  const province = control.get('province');
  const city = control.get('city');
  const street = control.get('street');
  const number = control.get('number');

  if (mode && link && (mode.value === 'virtual') && (link.value)) {
    return null
  } else if (mode && province && city && street && number && (mode.value === 'site') && (province.value) && (city.value) && (street.value) && (number.value)){
    return null
  } else if (mode && province && city && street && number && link && (mode.value === 'mixed') && (province.value) && (city.value) && (street.value) && (number.value) && (link.value)){
    return null
  }
  return { passDoesntMatch: true } 
};

