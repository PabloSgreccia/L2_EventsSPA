import { Injectable } from '@angular/core';
import { FeedComponent } from '@etp/dashboard/views';

@Injectable({
  providedIn: 'root'
})
export class EventServiceService {

  constructor(
    // private feedComponent: FeedComponent
  ) { }

  getvalor(){
    // console.log(this.feedComponent.valor);
    console.log("ok");
    
    
  }

}
