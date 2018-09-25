import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {IndustrydetialPage} from '../../pages/home/industrydetial/industrydetial';
/**
 * Generated class for the IndustrprfileComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'industrprfile',
  templateUrl: 'industrprfile.html'
})
export class IndustrprfileComponent {

  text: string;

  constructor(public navCtrl: NavController) {
    console.log('Hello IndustrprfileComponent Component');
    this.text = 'Hello World';
  }
  goToOtherPage () {
    this.navCtrl.push(IndustrydetialPage);
  }
}
