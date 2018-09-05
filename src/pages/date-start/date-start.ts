import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ReleaseThreePage} from '../release-three/release-three';

/**
 * Generated class for the DateStartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-date-start',
  templateUrl: 'date-start.html',
})
export class DateStartPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DateStartPage');
  }
  gotoreleasePage () {
    this.navCtrl.push(ReleaseThreePage);
  }
}
