import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
// Services
import { EventServiceService, LocationServiceService, TypeServiceService } from '@etp/dashboard/services';
import { MatDialog } from '@angular/material/dialog';
import { ModalMsgComponent } from '../../components/modal-msg/modal-msg.component';
import { Type } from '../../interfaces/type/type';

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
    number: new FormControl(0),
    link: new FormControl(''),
    init_date: new FormControl('', {validators: [Validators.required]}),
    end_date: new FormControl('', {validators: [Validators.required]}),
    init_hour: new FormControl(0, {validators: [Validators.required]}),
    end_hour: new FormControl(0, {validators: [Validators.required]}),
    idType: new FormControl(0, {validators: [Validators.required]}),
  }, {validators: [locationValidator]})

  types!: Type[]

  file!: File

  error: String = '';
  
  provinces:FilterInput[] = [
    {value: "", viewValue: ""},
  ]
  
  cities:FilterInput[] = [
    {value: "", viewValue: ""},
  ]
  
  constructor(
    private locationService: LocationServiceService,
    private eventService: EventServiceService,
    private typeService: TypeServiceService,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    // Get external API info about provinces and cities in Argentina
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

    // Get types of events from BE
    this.typeService.getTypes()
    .subscribe({
      next: (res) => {
        if (res.status === 200) {
          this.types = res.type
        } 
        else{
          this.error = res.msg 
        }       
      },
      error: ((err: any) => {
        this.error = 'Something went wrong trying to get data.';
      })
    })
  }

  // When a user select a province, we search the cities of that province
  changeProvince(){
    this.locationService.getProvincesCities(this.eventForm.controls.province.value || '')
    .subscribe({
      next: res => {
        this.cities = (res.localidades).map(
          function(city:any) { 
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

  // Craete an event
  createEvent(){
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
      // Validate if the file isnt an image
      } else if (this.file && !(this.file.type).includes("image")) {
        this.error = 'Error in File.' 
      } else {
                
        let newEvent = this.eventForm.value;
        newEvent.init_date = startevent.toString()
        newEvent.end_date = endevent.toString()

        // BE API
        this.eventService.createEvent(newEvent, this.file)
          .subscribe({
            next: (res: { status: number; msg: String; }) => {
              if (res.status === 200 || res.status === 201 ) {
                this.openDialog('Event successfully created')
              } 
              else{
                this.error = res.msg 
              }       
            },            
            error: ((err: any) => {
              this.error = 'Something went wrong trying to create the event.';
              console.log(err);
            })
          })
      }
    }
  }

  // Show dialog
  openDialog(msg: string) {
    this.dialog.open(ModalMsgComponent, {
      data: { msg },
    });
  }

  // File input manager
  handleFileInput(event: any) {
    const file:File = event.target.files[0];
    this.file = file;
  }

  // Reset form data when user changes the event mode (virtual/on-site/mixed)
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
  get province() { return this.eventForm.controls.province }
}

const locationValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
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

