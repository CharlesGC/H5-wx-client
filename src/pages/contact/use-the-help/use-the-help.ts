import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConsultantTheHelpPage } from '../consultant-the-help/consultant-the-help';
import { ClientTheHelpPage } from '../client-the-help/client-the-help';

/**
 * Generated class for the UseTheHelpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-use-the-help',
  templateUrl: 'use-the-help.html',
})
export class UseTheHelpPage {
  public userType:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.userType = this.navParams.get('userType');
    // this.userType = 1;
  }

  /*跳转到帮助详情页面*/
  goUseHelpDaiPage(type,title) {
    if(this.userType == 1){
      this.navCtrl.push(ConsultantTheHelpPage,{type:type,title:title});
    }else if(this.userType == 0){
      this.navCtrl.push(ClientTheHelpPage,{type:type,title:title});
    }
    
  }
}
