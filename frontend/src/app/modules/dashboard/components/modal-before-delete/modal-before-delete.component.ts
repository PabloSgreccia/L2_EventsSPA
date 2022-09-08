import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'etp-modal-before-delete',
  templateUrl: './modal-before-delete.component.html',
  styleUrls: ['./modal-before-delete.component.scss']
})
export class ModalBeforeDeleteComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {model: string, id: number},
  ) { }

  ngOnInit(): void {
  }

}
