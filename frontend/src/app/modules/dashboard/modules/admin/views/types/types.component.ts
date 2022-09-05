import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
// Interfaces
import { Type } from '@etp/dashboard/interfaces';
// Services
import { TypeServiceService } from '@etp/dashboard/services';
import { ModalErrorComponent } from 'src/app/shared/components/modal-error/modal-error.component';
import { ModalToChangePhotoTypeComponent } from 'src/app/modules/dashboard/components/modal-to-change-photo-type/modal-to-change-photo-type.component';
import { ModalMsgComponent } from '@etp/shared/components';

@Component({
  selector: 'etp-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.scss']
})
export class TypesComponent implements OnInit {

  initTypesList: Type[] = [{
    id: 0,
    type: '',
  }]
  selectedType!: Type
  changeFotoDisabled: boolean = true

  typeForm = new FormGroup({
    type: new FormControl('', {validators: [Validators.required]}),
    id: new FormControl(''),
  })

  constructor(
    private typeService: TypeServiceService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getTypes();
    this.typeForm.controls['id'].disable();
  }

  // Get types from BE
  getTypes(){
    this.typeService.getTypes()
    .subscribe({
      next: res => {        
        if (res.types[0].type) {
          this.initTypesList = res.types
          this.initTypesList.sort(
            function(a, b) {                 
              return b.id < a.id? 1 : -1;
            });
        } else {
        }
      }
    })
  }

  // Add or edit type functionality
  addOdrEditType(): void{
    if (this.typeForm.status === 'VALID') {
      if(this.typeForm.controls.id.value && this.typeForm.controls.type.value){
        // Edit Type        
          this.typeService.updateType(parseInt(this.typeForm.controls.id.value, 10), this.typeForm.controls.type.value)
          .subscribe(_ => {this.getTypes();})
        } else if (this.typeForm.controls.type.value) {
          // Add Type          
          this.typeService.createType(this.typeForm.controls.type.value)
          .subscribe(_ => { this.getTypes();})
      }
    }

  }

  // Delete type functionality
  deleteType(id:number){
    this.typeService.deleteType(id)
    .subscribe({
      next: (res) => { this.getTypes() },
      error: ((err) => { this.openErrorDialog(err.error.msg) }) 
    })
  }

  // Open error dialog
  openErrorDialog(msg: string) {
    this.dialog.open(ModalErrorComponent, { data: { msg } });
  }


  // Fill form with data
  editType(type: Type){
    this.selectedType = type;
    this.changeFotoDisabled = false
    this.typeForm.controls.id.setValue((type.id).toString()) 
    this.typeForm.controls.type.setValue(type.type)     
  }
  
  resetForm(){
    this.typeForm.reset()
    this.changeFotoDisabled = true
  }
  
  openDialog(msg: string) {
    this.dialog.open(ModalMsgComponent, {
      data: { msg },
    });
    this.changeFotoDisabled = true
  }

  changePhoto(){
    const dialogRef = this.dialog.open(ModalToChangePhotoTypeComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.openDialog('Event Photo Updated')
    }
    });
  }

}
