import { Component } from '@angular/core';

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
  public isShowdata = false;
  text: string;

  constructor() {
    console.log('Hello AttentionTipComponent Component');
  }

  isShow(){
    this.isShowdata = !this.isShowdata;
  }
}
