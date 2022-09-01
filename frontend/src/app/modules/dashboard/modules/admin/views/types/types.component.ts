import { Component, OnInit } from '@angular/core';

interface Type {
  id: number;
  type: string;
}

@Component({
  selector: 'etp-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.scss']
})
export class TypesComponent implements OnInit {

  typesList!: Type[]

  constructor() { }

  ngOnInit(): void {
  }

}
