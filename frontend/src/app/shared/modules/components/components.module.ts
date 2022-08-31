import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Components
import { NotfoundComponent } from '@etp/shared/components';

const components = [
  NotfoundComponent
]

@NgModule({
  declarations: [...components],
  imports: [CommonModule],
  exports: [...components]
})
export class ComponentsModule { }
