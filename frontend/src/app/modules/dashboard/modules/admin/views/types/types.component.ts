import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Type } from '@etp/dashboard/interfaces';
import { TypeServiceService } from '@etp/dashboard/services';

@Component({
  selector: 'etp-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.scss']
})
export class TypesComponent implements OnInit {

  // initTypesList!: Type[]
  initTypesList!: Type[]
  selectedType!: Type

  typeForm = new FormGroup({
    type: new FormControl('', {validators: [Validators.required]}),
    id: new FormControl(''),
  })

  constructor(
    private typeService: TypeServiceService
  ) { }

  ngOnInit(): void {
    this.getTypes();
    this.typeForm.controls['id'].disable();
  }

  getTypes(){
    this.typeService.getTypes()
    .subscribe({
      next: type => {
        this.initTypesList = type
        this.initTypesList.sort(
          function(a, b) {                 
            return b.id > a.id? 1 : -1;
          });
      },
      error: (err) => {}
    })
  }

  addOdrEditType(): void{
    if (this.typeForm.status === 'VALID') {
      if(this.typeForm.controls.id.value){
        // Edit Type
        this.typeService.updateType(parseInt(this.typeForm.controls.id.value, 10), this.typeForm.controls.type.value || '')
          .subscribe(_ => {this.getTypes();})
      } else {
        // Add employee
        this.typeService.createType(this.typeForm.controls.type.value || '')
          .subscribe(_ => {this.getTypes();})
      }
    }

  }

  deleteType(id:number){
    this.typeService.deleteType(id).subscribe()
  }

  editType(type: Type){
    this.selectedType = type;
    this.typeForm.controls.id.setValue((type.id).toString()) 
    this.typeForm.controls.type.setValue(type.type)     
  }
  
  resetForm(){
    this.typeForm.reset()
  }
  
}
