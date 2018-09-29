import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ClientTheHelpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-client-the-help',
  templateUrl: 'client-the-help.html',
})
export class ClientTheHelpPage {
  public tabbarTitle = '帮助详情';
  public type:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.type = this.navParams.get('type');
    this.tabbarTitle = this.navParams.get('title');
    console.log('ionViewDidLoad ClientTheHelpPage');
  }

}
