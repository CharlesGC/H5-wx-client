import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ContactPage} from '../contact/contact';
// import {ReleasePage} from '../release/release';

@IonicPage()
@Component({
  selector: 'page-add-skill',
  templateUrl: 'add-skill.html',
})
export class AddSkillPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddSkillPage');
  }
  goback () {
    this.navCtrl.push(ContactPage);
  }
  // 跳转发布页
  gotoreleasePage() {
    // this.navCtrl.push(ReleasePage);
  }
}
