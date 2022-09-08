import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalBeforeDeleteComponent, ModalToChangePhotoTypeComponent } from '@etp/dashboard/components';
// Interfaces
import { Type } from '@etp/dashboard/interfaces';
// Services
import { TypeServiceService } from '@etp/dashboard/services';
// Components
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
  msg!:string

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
    const dialogRef = this.dialog.open(ModalBeforeDeleteComponent, { data: { model: 'evento', id: id } });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.typeService.deleteType(id).subscribe({
          next: res => {
            this.initTypesList = this.initTypesList.filter(type => type.id !== id);
            this.msg = `Tipo de evento con ID ${id} eliminado`;
            setTimeout(()=>{ this.msg = '' }, 3000);     
          },
          error: (err) => {
            this.dialog.open(ModalMsgComponent, { data: { title: 'Error', msg: 'Ocurrió un error al intentar borrar el tipo de evento.' } });
          }
        }) 
      }}
    )
  }

  // Fill form with data
  editType(type: Type){
    this.selectedType = type;
    this.changeFotoDisabled = false
    this.typeForm.controls.id.setValue((type.id).toString()) 
    this.typeForm.controls.type.setValue(type.type)     
  }
  
  // Reset Form
  resetForm(){
    this.typeForm.reset()
    this.changeFotoDisabled = true
  }

  // Change photo
  changePhoto(){
    const dialogRef = this.dialog.open(ModalToChangePhotoTypeComponent, { data: { typeId: this.typeForm.controls.id.value } });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialog.open(ModalMsgComponent, { data: { title: 'Éxito', msg: 'Foto de evento actualizada'} });
    }
    });
  }

}
