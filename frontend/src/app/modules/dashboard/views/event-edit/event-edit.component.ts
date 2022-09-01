import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
// Services
import { EventServiceService, LocationServiceService } from '@etp/dashboard/services';
import { MatDialog } from '@angular/material/dialog';
import { ModalMsgComponent } from '../../components/modal-msg/modal-msg.component';

interface FilterInput {
  value: string;
  viewValue: string;
}
interface TypeInput {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'etp-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.scss']
})
export class EventEditComponent implements OnInit {

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
    idType: new FormControl(0, {validators: [Validators.required]}),
    photo: new FormControl(''),
  }, {validators: [locationValidator, dateValidator]})

  types: String[] = ['Sports', 'Party', 'Conference', 'Meeting']

  typesId!:TypeInput[]

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

    
    // get event byu observable
    this.eventService.getEvent().subscribe({
      next: event => {
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
        this.eventForm.controls.photo.setValue(event.photo || '' )
      },
      error: (err) => {}
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

  editEvent(){
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
  get init_date() { return this.eventForm.controls.init_date }
  get end_date() { return this.eventForm.controls.end_date }
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

export const dateValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  // this.eventForm.controls.init_date < this.eventForm.controls.end_date

  const init = control.get('init_date');
  const end = control.get('end_date');

  if (init && end && end >= init) {
    return null
  } else {
    return { passDoesntMatch: true } 
  }

};