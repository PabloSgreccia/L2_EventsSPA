import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'etp-modal-error',
  templateUrl: './modal-error.component.html',
  styleUrls: ['./modal-error.component.scss']
})
export class ModalErrorComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {msg: string}) { }
  
  ngOnInit(): void {
  }

}
