import { Component } from '@angular/core';

/**
 * Generated class for the TellphoneTipComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'tellphone-tip',
  templateUrl: 'tellphone-tip.html'
})
export class TellphoneTipComponent {

  text: string;

  constructor() {
    console.log('Hello TellphoneTipComponent Component');
    this.text = 'Hello World';
  }

}
