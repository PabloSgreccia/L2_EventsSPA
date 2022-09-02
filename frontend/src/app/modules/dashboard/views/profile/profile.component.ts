import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// Interfaces
import { Event } from '@etp/dashboard/interfaces'
import { User } from '@etp/shared/interfaces'
// Services
import { EventServiceService } from '@etp/dashboard/services';
import { UserServiceService } from '@etp/shared/services';

@Component({
  selector: 'etp-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User = {
    id: 0,
    name: 'Pablo Sgreccia',
    email: 'asd@asd.com',
    photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1WeNyqqvZ4xPqhmoF5Jcz3UYO_Gk2AUNgSKU59LJYLETM8tElgPD2931E8-7dauowdAQ&usqp=CAU',
    validated: 3,
    role: 'user'
  }

  cantEvents!: number

  createdEvents: Event[] = [{
    id: 1,
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
    id: 2,
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

  followedEvents: Event[] = [{
    id: 1,
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
    idUser: 24,
    people: 14502,
    verifiedadmin: true, 
    adminPhoto: 'https://s3-symbol-logo.tradingview.com/amazon--600.png',
    valor: 4.5,
    participateDisabled:false,
  },
  {
    id: 2,
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
    idType: 3,
    photo: 'https://media.istockphoto.com/photos/dancing-friends-picture-id501387734?k=20&m=501387734&s=612x612&w=0&h=1mli5b7kpDg428fFZfsDPJ9dyVHsWsGK-EVYZUGWHpI=',
    finished: false,
    adminUser: 'Muni de Rosario',
    idUser: 24,
    people: 123,
    verifiedadmin: false, 
    adminPhoto: 'https://cdn-media.italiani.it/site-rosario/sites/48/2020/05/escudo.jpg',
    valor: 2.2,
    participateDisabled:false,
  },
  {
    id: 3,
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
    idType: 2,
    photo: 'https://img.freepik.com/vector-gratis/equipo-futbol-voleibol-beisbol-rugby_1441-4026.jpg',
    finished: true,
    adminUser: 'Chacarita Jrs',
    idUser: 24,
    people: 45000,
    verifiedadmin: false,
    adminPhoto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Escudo_del_Club_Atl%C3%A9tico_Chacarita_Juniors.svg/1200px-Escudo_del_Club_Atl%C3%A9tico_Chacarita_Juniors.svg.png',
    valor: 1,
    participateDisabled:false,
  }]


  constructor(
    private eventService: EventServiceService,
    private userService: UserServiceService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    
    // get user info --> BE
    if (id) {  
      this.userService.getOneUser(parseInt(id, 10))
      .subscribe({
        next: (res) => {
          if (res.status === 200) {
            this.user = res.user
          } 
          else{
            console.log(res.msg);
            this.router.navigate(['/notfound']);
          }       
        },
        error: ((err: any) => {
          console.log(err);
          this.router.navigate(['/notfound']);
        })
      })

      // get created events ny this user  --> BE
      this.userService.getEventsCreatedByUser(parseInt(id, 10))
      .subscribe({
        next: (res) => {
          if (res.status === 200) {
            this.createdEvents = res.events
            // Sort created events by init date
            this.createdEvents.sort(
              function(a, b) {          
                    return b.init_date > a.init_date? 1 : -1;
              });
            this.cantEvents = this.createdEvents.length
          } 
          else{
            console.log(res.msg);
            this.router.navigate(['/notfound']);
          }       
        },
        error: ((err: any) => {
          console.log(err);
          this.router.navigate(['/notfound']);
        })
      })
      
      // get followed events --> BE
      this.userService.getEventsFollowedByUser(parseInt(id, 10))
      .subscribe({
        next: (res) => {
          if (res.status === 200) {
            this.followedEvents = res.events
            // Sort followed events by init date
            this.followedEvents.sort(
              function(a, b) {          
                    return b.init_date > a.init_date? 1 : -1;
              });
        
          } 
          else{
            console.log(res.msg);
            this.router.navigate(['/notfound']);
          }       
        },
        error: ((err: any) => {
          console.log(err);
          this.router.navigate(['/notfound']);
        })
      })
    }
  }
}
