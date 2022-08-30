import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EventServiceService, LocationServiceService } from '@etp/shared/services';
import { Event } from '@etp/shared/interfaces'

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
  
  cities:FilterInput[] = [
    {value: "", viewValue: ""},
  ]
  
  topics:FilterInput[] = [
    {value: "Deportes", viewValue: "Deportes"},
    {value: "Fiesta", viewValue: "Fiesta"},
    {value: "Charla", viewValue: "Charla"},
    {value: "Entretenimiento", viewValue: "Entretenimiento"},
  ]
  
  orders:FilterInput[] = [
    {value: "participants", viewValue: "More Participants"},
    {value: "date", viewValue: "Upcoming Date"},
  ]

  filtersForm = new FormGroup({
    province: new FormControl(''),
    city: new FormControl(''),
    topic: new FormControl(''),
  })

  @ViewChild("cityFilter") cityFilter: ElementRef | undefined;
  @ViewChild("filtersFormDiv") filtersFormDiv: ElementRef | undefined;

  // Events vars

  events: Event[] = [{
    _id: 1,
    title: 'AWS - Webinar... Con show de fuegos artificios',
    description: 'Aprende todo sobre amazon web services',
    mode: 'Virtual',
    link: 'amazon.com',
    init_date: new Date(2022, 11, 10, 17, 0, 0),
    end_date: new Date(2022, 11, 10, 22, 0, 0),
    cancelled:false,
    type: 'Charla',
    photo: 'https://www.albertosoler.es/wp-content/uploads/2021/12/charlas.png',
    finished: false,
    adminUser: 'Amazon USA',
    people: 14502,
    verifiedadmin: true, 
    adminPhoto: 'https://s3-symbol-logo.tradingview.com/amazon--600.png',
    valor: 4.5,
    participateDisabled:false,
  },
  {
    _id: 2,
    title: 'Las Pastillas del Abuelo',
    description: 'Vení a ver las pastillas del abuelo al anfiteatro, costo entrada 1000$',
    mode: 'Presencial',
    province: 'Santa Fe',
    city: 'Rosario',
    street: 'Cochabamba',
    number: 1333,
    init_date: new Date(2022, 10, 10, 23, 0, 0),
    end_date: new Date(2022, 10, 10, 7, 0, 0),
    cancelled: false,
    type: 'Fiesta',
    photo: 'https://media.istockphoto.com/photos/dancing-friends-picture-id501387734?k=20&m=501387734&s=612x612&w=0&h=1mli5b7kpDg428fFZfsDPJ9dyVHsWsGK-EVYZUGWHpI=',
    finished: false,
    adminUser: 'Muni de Rosario',
    people: 123,
    verifiedadmin: false, 
    adminPhoto: 'https://cdn-media.italiani.it/site-rosario/sites/48/2020/05/escudo.jpg',
    valor: 2.2,
    participateDisabled:false,
  },
  {
    _id: 3,
    title: 'Chacarita vs Boca Jrs',
    description: 'Recibimos a Boca Jrs por la 8va fecha del torneo nacional. Veni a alentar a Charcarita',
    mode: 'Mixto',
    province: 'Buenos Aires',
    city: 'Retiro',
    street: '3 de Febrero',
    number: 2318,
    link: 'pasionxchacarita.com',
    init_date: new Date(2018, 0O5, 0O5, 17, 23, 42, 11),
    end_date: new Date(2018, 0O5, 0O5, 17, 23, 42, 11),
    cancelled:false,
    type: 'Deporte',
    photo: 'https://img.freepik.com/vector-gratis/equipo-futbol-voleibol-beisbol-rugby_1441-4026.jpg',
    finished: false,
    adminUser: 'Chacarita Jrs',
    people: 45000,
    verifiedadmin: false,
    adminPhoto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Escudo_del_Club_Atl%C3%A9tico_Chacarita_Juniors.svg/1200px-Escudo_del_Club_Atl%C3%A9tico_Chacarita_Juniors.svg.png',
    valor: 1,
    participateDisabled:false,
  }]


  constructor(
    private locationService: LocationServiceService,
    private eventService: EventServiceService
  ) {}

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
  
  filterEvents(){
    
    console.log("eventos filtrados");
    this.eventService.getvalor();
  }

  changeProvince(){
    this.locationService.getProvincesCities(this.filtersForm.controls.province.value || '')
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

  showHideTasks(){
    if (this.filtersFormDiv?.nativeElement.getAttribute('hidden') === null) {
      this.filtersFormDiv?.nativeElement.setAttribute('hidden', '');
    } else {
      this.filtersFormDiv?.nativeElement.removeAttribute('hidden');
    }
  }

  get province() { return this.filtersForm.controls.province }

}