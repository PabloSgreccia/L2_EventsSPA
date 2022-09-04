import { StickyStyler } from '@angular/cdk/table';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
// Interfaces
import { Event, Type } from '@etp/dashboard/interfaces'
// Services
import { EventServiceService, LocationServiceService, TypeServiceService } from '@etp/dashboard/services';
import { ModalErrorComponent } from '../../../../shared/components/modal-error/modal-error.component';

interface FilterInput {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'etp-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  // Filter vars
  provinces!: string[]
  cities!: string[]
  eventTypes!: Type[]
  error: string = ''
  modes: FilterInput[] = [ 
    {
      value: 'site',
      viewValue: 'On Site'
    },{
      value: 'virtual',
      viewValue: 'Virtual'
    } 
  ]

  filtersForm = new FormGroup({
    province: new FormControl(''),
    city: new FormControl(''),
    type: new FormControl(0),
    mode: new FormControl(''),
    user: new FormControl(''),
  })
  get province() { return this.filtersForm.controls.province }

  @ViewChild("filterByUser") filterByUser: ElementRef | undefined;

  // Events vars
  initialEvents!: Event[] 
  filteredEvents!: Event[]

  constructor(
    private locationService: LocationServiceService,
    private eventService: EventServiceService,
    public dialog: MatDialog,
    private typeService: TypeServiceService
  ) {}

  ngOnInit(): void {
    // Get provinces from external API
    this.locationService.getProvinces()
    .subscribe({
      next: res => {
        this.provinces = (res.provincias).map( function(province:any) { return province.nombre })
        this.provinces.sort((a, b) => (a > b) ? 1 : -1)
      },
      error: (err => {
        this.openErrorDialog("Something went wrong trying to get provinces.")
      })
    })

    // Get types of events
    this.typeService.getTypes()
    .subscribe({
      next: res => {        
        if (res.types[0].type) {
          this.eventTypes = res.types
          this.eventTypes.sort( function(a, b) { return b.type < a.type? 1 : -1; });
        } else {
          this.openErrorDialog("There aren't any type of event created. Please wait until the admin creates one first.")
        }
      }
    })

    // Get Events list
    this.eventService.getManyEvent()
    .subscribe({
      next: res => {        
        if (res.events[0].id) {
          this.initialEvents = res.events
          this.filteredEvents = this.initialEvents
          this.filteredEvents.sort( function(a, b) { return b.init_date > a.init_date? 1 : -1; });
        } else {
          this.error = "There aren't any active event"
        }
      }, error: (err) => {
        this.openErrorDialog("Something went wrong trying to get events.")
      }
    })
  }

  // Open error dialog
  openErrorDialog(msg: string) {
    this.dialog.open(ModalErrorComponent, { data: { msg } });
  }

  resetFilters(){
    this.filteredEvents = this.initialEvents
    this.filtersForm.reset()
  }

  // Filter events after press button
  filterEvents(){
    this.filtersForm.controls.user.reset()
    this.filteredEvents = this.initialEvents
    // First filter by province
    if (this.filtersForm.controls.province.value) {
      this.filteredEvents = this.filteredEvents.filter(event => event.province === this.filtersForm.controls.province.value)
    }
    // Then filter by city
    if (this.filtersForm.controls.city.value) {
      this.filteredEvents = this.filteredEvents.filter(event => event.city === this.filtersForm.controls.city.value)
    } 
    // then filter by type
    if (this.filtersForm.controls.type.value) {
      this.filteredEvents = this.filteredEvents.filter(event => event.idType === this.filtersForm.controls.type.value)
    } 
    // At end filter by mode
    if (this.filtersForm.controls.mode.value) {
      this.filteredEvents = this.filteredEvents
        .filter(event => (event.mode === this.filtersForm.controls.mode.value) || (event.mode === "mixed"))
    } 
    if (this.filteredEvents.length === 0) {
      this.openErrorDialog('There arent events with this criteria.')
    }
  }

  // Filter by user
  async onKeyUp(){
    this.filtersForm.controls.city.reset()
    this.filtersForm.controls.province.reset()
    this.filtersForm.controls.type.reset()
    this.filtersForm.controls.mode.reset()
    if (this.filterByUser?.nativeElement.value.length >=1) {
      this.filteredEvents = this.initialEvents.filter(event => (event.user.name.toLowerCase()).includes((this.filterByUser?.nativeElement.value).toLowerCase()))
    } else{
      this.filteredEvents = this.initialEvents
    }
    if (this.filteredEvents.length === 0) {
      this.openErrorDialog('There arent events with this criteria.')
    }
  }

  // Search cityes in external API when province value changes
  changeProvince(){
    this.locationService.getProvincesCities(this.filtersForm.controls.province.value || '')
    .subscribe({
      next: res => {
        this.cities = (res.localidades).map( function(city:any) { return city.nombre })
        // Filter repeated cities
        this.cities = this.cities.filter((city,index)=>{ return this.cities.indexOf(city) === index;})
        this.cities.sort((a, b) => (a > b) ? 1 : -1)
      },
      error: (err => {
        this.openErrorDialog("Something went wrong trying to get cities.")
      })
    })
  }

  // Order the events 
  orderby(event: any){
    if (event.value === 'date') {
      //Order by date (desc)
      this.filteredEvents.sort(
        function(a, b) { return b.init_date > a.init_date? 1 : -1; });
    }else if (event.value === 'people') {
      //Order by people (desc)
      this.filteredEvents.sort(
        function(a, b) {          
           if (a.finished === b.finished) {
              return ((a.cantPeople || 0) < (b.cantPeople || 0)) ? 1 : -1;
           }
           return a.finished > b.finished ? 1 : -1;
        });
    }
  }  
}