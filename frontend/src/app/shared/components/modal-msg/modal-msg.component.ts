import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'etp-modal-msg',
  templateUrl: './modal-msg.component.html',
  styleUrls: ['./modal-msg.component.scss']
})
export class ModalMsgComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {title: string, msg: string}) { }
  
  ngOnInit(): void {
  }

}
