import { Component,Input } from '@angular/core';

/**
 * Generated class for the AttentionTipComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'attention-tip',
  templateUrl: 'attention-tip.html'
})

export class AttentionTipComponent {
  @Input() bottom:any;
  public isShowdata = false;
  text: string;

  constructor() {
    console.log('Hello AttentionTipComponent Component');
    // console.log(this.bottom)
  }

  isShow(){
    this.isShowdata = !this.isShowdata;
  }


}
