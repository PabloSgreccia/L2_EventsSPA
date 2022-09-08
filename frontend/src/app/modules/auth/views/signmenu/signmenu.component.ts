import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'etp-signmenu',
  templateUrl: './signmenu.component.html',
  styleUrls: ['./signmenu.component.scss']
})
export class SignmenuComponent implements OnInit {

  msg!:string

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      if (typeof param['success'] !== 'undefined') {
          this.msg = 'Validación exitosa';
          setTimeout(()=>{ this.msg = '' }, 4000);     
      } 
     });
  }

}
