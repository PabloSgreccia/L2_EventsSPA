import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
// Interfaces
import { Event } from '@etp/dashboard/interfaces'
// Services
import { EventServiceService, LocationServiceService, TypeServiceService } from '@etp/dashboard/services';

interface FilterInput {
  value: string;
  viewValue: string;
}
interface TypeInput {
  value: number;
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
  
  eventTypes:TypeInput[] = [
    {value: 1, viewValue: "Deportes"},
    {value: 2, viewValue: "Fiesta"},
    {value: 3, viewValue: "Charla"},
    {value: 4, viewValue: "Entretenimiento"},
  ]
  
  filtersForm = new FormGroup({
    province: new FormControl(''),
    city: new FormControl(''),
    type: new FormControl(0),
  })

  @ViewChild("cityFilter") cityFilter: ElementRef | undefined;
  @ViewChild("filtersFormDiv") filtersFormDiv: ElementRef | undefined;
  @ViewChild("filterByUser") filterByUser: ElementRef | undefined;

  // Events vars
  // initialEvents!: Event[]
  
  events: Event[] = [{
    _id: 1,
    title: 'AWS - Webinar... Con show de fuegos artificios',
    description: 'Aprende todo sobre amazon web services',
    mode: 'Virtual',
    link: 'amazon.com',
    init_date: new Date(2022, 11, 10, 17, 0, 0),
    end_date: new Date(2022, 11, 10, 22, 0, 0),
    cancelled:false,
    idType: 2,
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
    idType: 2,
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
    init_date: new Date(2018, 5, 12, 17, 0, 0, 0),
    end_date: new Date(2018, 5, 12, 19, 0, 0, 0),
    cancelled:false,
    idType: 2,
    photo: 'https://img.freepik.com/vector-gratis/equipo-futbol-voleibol-beisbol-rugby_1441-4026.jpg',
    finished: true,
    adminUser: 'Chacarita Jrs',
    people: 45000,
    verifiedadmin: false,
    adminPhoto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Escudo_del_Club_Atl%C3%A9tico_Chacarita_Juniors.svg/1200px-Escudo_del_Club_Atl%C3%A9tico_Chacarita_Juniors.svg.png',
    valor: 1,
    participateDisabled:false,
  },
  {
    _id: 3,
    title: 'Chacarita vs NOB',
    description: 'Recibimos a NOB por la 7ma fecha del torneo nacional. Veni a alentar a Charcarita',
    mode: 'Mixto',
    province: 'Buenos Aires',
    city: 'Retiro',
    street: '3 de Febrero',
    number: 2318,
    link: 'pasionxchacarita.com',
    init_date: new Date(2018, 5, 5, 17, 0, 0, 0),
    end_date: new Date(2018, 5, 5, 19, 0, 0, 0),
    cancelled:false,
    idType: 2,
    photo: 'https://img.freepik.com/vector-gratis/equipo-futbol-voleibol-beisbol-rugby_1441-4026.jpg',
    finished: true,
    adminUser: 'Chacarita Jrs',
    people: 38854,
    verifiedadmin: false,
    adminPhoto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Escudo_del_Club_Atl%C3%A9tico_Chacarita_Juniors.svg/1200px-Escudo_del_Club_Atl%C3%A9tico_Chacarita_Juniors.svg.png',
    valor: 1,
    participateDisabled:false,
  },{
    _id: 1,
    title: 'Mi Cumpleaños',
    description: 'Traer su propia comida, yo pongo la bebida',
    province: 'Santa Fe',
    city: 'Rosario',
    street: 'Cochabamba',
    number: 1333,
    init_date: new Date(2022, 23, 6, 11, 0, 0),
    end_date: new Date(2022, 23, 6, 21, 0, 0),
    cancelled:false,
    idType: 2,
    photo: 'https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2018/01/283709-crear-tarjetas-felicitar-cumpleanos.jpg',
    finished: false,
    adminUser: 'Pablo Sgreccia',    
    mode: "virtual",
    idUser: 24,
    people: 12,
    verifiedadmin: true, 
    adminPhoto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1WeNyqqvZ4xPqhmoF5Jcz3UYO_Gk2AUNgSKU59LJYLETM8tElgPD2931E8-7dauowdAQ&usqp=CAU',
    valor: 0,
    participateDisabled:false,
  },
  {
    _id: 2,
    title: 'Partido vs Atalaya',
    province: 'Santa Fe',
    city: 'Rosario',
    street: 'San Juan',
    number: 3550,
    init_date: new Date(2022, 9, 2, 23, 0, 0),
    end_date: new Date(2022, 10, 10, 7, 0, 0),
    cancelled: false,
    idType: 2,
    photo: 'https://www.competize.com/blog/wp-content/uploads/2019/12/crear-torneos-basquet-baloncesto-scaled.jpg',
    finished: false,
    adminUser: 'Pablo Sgreccia',
    mode: "virtual",
    idUser: 24,
    people: 67,
    verifiedadmin: true, 
    adminPhoto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1WeNyqqvZ4xPqhmoF5Jcz3UYO_Gk2AUNgSKU59LJYLETM8tElgPD2931E8-7dauowdAQ&usqp=CAU',
    participateDisabled:false,
  }]

  initialEvents: Event[] = this.events

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
    this.typeService.getTypes().subscribe({
      next: type => {
        this.eventTypes = type
      },
      error: (err) => {}
    })
    
    // Get list of events
    this.eventService.getManyEvent().subscribe({
      next: events => {
        this.initialEvents = events
          // Sort events by date
          this.initialEvents.sort(
            function(a, b) {          
              if (a.finished === b.finished) {
                  return b.init_date > a.init_date? 1 : -1;
              }
              return a.finished > b.finished ? 1 : -1;
            });
        this.events = this.initialEvents
      },
      error: (err) => {}
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
      this.events = this.initialEvents.filter(event => (event.adminUser.toLowerCase()).includes((this.filterByUser?.nativeElement.value).toLowerCase()))
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
           if (a.finished === b.finished) {
              return b.init_date > a.init_date? 1 : -1;
           }
           return a.finished > b.finished ? 1 : -1;
        });
    }else if (event.value === 'people') {
      //Order by people (desc)
      this.events.sort(
        function(a, b) {          
           if (a.finished === b.finished) {
              return ((a.people || 0) < (b.people || 0)) ? 1 : -1;
           }
           return a.finished > b.finished ? 1 : -1;
        });
    }
  }
  
  get province() { return this.filtersForm.controls.province }
}