import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'etp-modal-notice',
  templateUrl: './modal-notice.component.html',
  styleUrls: ['./modal-notice.component.scss']
})
export class ModalNoticeComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {msg: string}) { }
  
  ngOnInit(): void {
  }

}
