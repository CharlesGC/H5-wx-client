import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SearchIndustryPage} from '../search-industry/search-industry';
import {ReleaseTwoPage} from '../release-two/release-two';
/** 
 * Generated class for the AddIndustryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-industry',
  templateUrl: 'add-industry.html',
})
export class AddIndustryPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddIndustryPage');
  }
  addindustry () {
    this.navCtrl.push(SearchIndustryPage);
  }
  gotoreleasePage () {
    this.navCtrl.push(ReleaseTwoPage);
  }
 }
