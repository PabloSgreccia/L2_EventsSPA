import {Component, OnInit} from '@angular/core';
// Interfaces
import { Event } from '@etp/dashboard/interfaces'
import { User } from '@etp/shared/interfaces'
// Services
import { EventServiceService, LocationServiceService } from '@etp/dashboard/services';

@Component({
  selector: 'etp-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User = {
    _id: 0,
    name: 'Pablo Sgreccia',
    photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1WeNyqqvZ4xPqhmoF5Jcz3UYO_Gk2AUNgSKU59LJYLETM8tElgPD2931E8-7dauowdAQ&usqp=CAU',
    validated: 3,
    cantEvents: 2
  }

  // Events vars

  createdEvents: Event[] = [{
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
    type: 'Cumpleaños',
    photo: 'https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2018/01/283709-crear-tarjetas-felicitar-cumpleanos.jpg',
    finished: false,
    adminUser: 'Pablo Sgreccia',
    adminUserId: 24,
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
    type: 'Fiesta',
    photo: 'https://www.competize.com/blog/wp-content/uploads/2019/12/crear-torneos-basquet-baloncesto-scaled.jpg',
    finished: false,
    adminUser: 'Pablo Sgreccia',
    adminUserId: 24,
    people: 67,
    verifiedadmin: true, 
    adminPhoto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1WeNyqqvZ4xPqhmoF5Jcz3UYO_Gk2AUNgSKU59LJYLETM8tElgPD2931E8-7dauowdAQ&usqp=CAU',
    participateDisabled:false,
  }]

  followedEvents: Event[] = [{
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
    adminUserId: 645,
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
    adminUserId: 43,
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
    finished: true,
    adminUser: 'Chacarita Jrs',
    adminUserId: 45,
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
    // get user info --> BE
    // get created events  --> BE
    // get followed events --> BE

    this.createdEvents.sort(
      function(a, b) {          
         if (a.finished === b.finished) {
            // Price is only important when cities are the same
            return b.init_date > a.init_date? 1 : -1;
         }
         return a.finished > b.finished ? 1 : -1;
      });
      
    this.followedEvents.sort(
      function(a, b) {          
         if (a.finished === b.finished) {
            // Price is only important when cities are the same
            return b.init_date > a.init_date? 1 : -1;
         }
         return a.finished > b.finished ? 1 : -1;
      });

  }
 
}
