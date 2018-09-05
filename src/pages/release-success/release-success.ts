import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ReleaseThreePage} from '../release-three/release-three';
import {ReleaseTwoPage} from '../release-two/release-two';


@IonicPage()
@Component({
  selector: 'page-release-success',
  templateUrl: 'release-success.html',
})
export class ReleaseSuccessPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReleaseSuccessPage');
  }
  // 返回项目列表
  goreleasethree () {
    this.navCtrl.push(ReleaseThreePage);
  }
  // 继续发布项目
  gorelease () {
    this.navCtrl.push(ReleaseTwoPage);
  }
}
