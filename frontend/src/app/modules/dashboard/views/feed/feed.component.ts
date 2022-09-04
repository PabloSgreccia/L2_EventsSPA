import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
// Interfaces
import { Event, Type } from '@etp/dashboard/interfaces'
// Services
import { EventServiceService, LocationServiceService, TypeServiceService } from '@etp/dashboard/services';

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
  provinces:FilterInput[] = [
    {value: "", viewValue: ""},
  ]
  
  cities: string[] = []
  eventTypes!: Type[]
  error: string = ''
  
  filtersForm = new FormGroup({
    province: new FormControl(''),
    city: new FormControl(''),
    type: new FormControl(0),
  })

  @ViewChild("cityFilter") cityFilter: ElementRef | undefined;
  @ViewChild("filtersFormDiv") filtersFormDiv: ElementRef | undefined;
  @ViewChild("filterByUser") filterByUser: ElementRef | undefined;

  // Events vars
  initialEvents!: Event[] 
  events!: Event[]

  constructor(
    private locationService: LocationServiceService,
    private eventService: EventServiceService,
    private typeService: TypeServiceService
  ) {}

  ngOnInit(): void {
    // Get provinces from external API
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

    // Get types of events
    this.typeService.getTypes()
    .subscribe({
      next: res => {        
        if (res.types[0].type) {
          this.eventTypes = res.types
          this.eventTypes.sort(
            function(a, b) {                 
              return b.id < a.id? 1 : -1;
            });
        } else {
        }
      }
    })

    // Get types of events
    this.eventService.getManyEvent()
    .subscribe({
      next: res => {        
        if (res.events[0].id) {
          this.events = res.events
          this.events.sort(
            function(a, b) {                 
              return b.init_date > a.init_date? 1 : -1;
            });
        } else {
          this.error = 'there is no event'
        }
      }, error: (err) => {
        console.log(err);
      }
    })


  }
  
  filterEvents(){
    this.events = this.initialEvents
    this.cities = [];
    // First filter by province
    if (this.filtersForm.controls.province.value) {
        this.events = this.events.filter(event => event.province === this.filtersForm.controls.province.value)
    }
    // Then filter by city
    if (this.filtersForm.controls.city.value) {
      this.events = this.events.filter(event => event.city === this.filtersForm.controls.city.value)
    } 
    // At end filter by type
    if (this.filtersForm.controls.type.value) {
      this.events = this.events.filter(event => event.idType === this.filtersForm.controls.type.value)
    } 
    this.filtersForm.reset()
  }

  // Filter by user
  async onKeyUp(){
    if (this.filterByUser?.nativeElement.value.length >=3) {
      this.events = this.initialEvents.filter(event => (event.user.name.toLowerCase()).includes((this.filterByUser?.nativeElement.value).toLowerCase()))
    } else{
      this.events = this.initialEvents
    }
  }

  // Search cityes in external API when province value changes
  changeProvince(){
    this.locationService.getProvincesCities(this.filtersForm.controls.province.value || '')
    .subscribe({
      next: res => {
        this.cities = (res.localidades).map(
          function(city:any) { 
            return city.nombre
          }
        )
        this.cities = this.cities.filter((city,index)=>{
            return this.cities.indexOf(city) === index;
        })
        this.cities.sort((a, b) => (a > b) ? 1 : -1)
      }
    })
  }

  // Order the events 
  orderby(event: any){
    if (event.value === 'date') {
      //Order by date (desc)
      this.events.sort(
        function(a, b) {     
          
          return b.init_date > a.init_date? 1 : -1;

          //  if (a.finished === b.finished) {
          //     return b.init_date > a.init_date? 1 : -1;
          //  }
          //  return a.finished > b.finished ? 1 : -1;
        });
    }else if (event.value === 'people') {
      //Order by people (desc)
      this.events.sort(
        function(a, b) {          
           if (a.finished === b.finished) {
              return ((a.cantPeople || 0) < (b.cantPeople || 0)) ? 1 : -1;
           }
           return a.finished > b.finished ? 1 : -1;
        });
    }
  }
  
  get province() { return this.filtersForm.controls.province }
}