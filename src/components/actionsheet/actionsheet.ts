import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/**
 * Generated class for the ActionsheetComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'actionsheet',
  templateUrl: 'actionsheet.html'
})
export class ActionsheetComponent {

  text: string;
  public list = [];

  constructor(public navCtrl: NavController) {
    console.log('Hello ActionsheetComponent Component');
    this.text = '这是一个组件';

    for(let i=0;i<10;i++){
      this.list.push(`这是第${i}条记录`)
    }
  }

}
