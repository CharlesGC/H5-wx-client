import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModifyPhonePage } from '../modify-phone/modify-phone';
import { ModifyEmailPage } from '../modify-email/modify-email';
import { AddEmailPage } from '../add-email/add-email'

/**
 * Generated class for the SetAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-set-account',
  templateUrl: 'set-account.html',
})
export class SetAccountPage {
  public uphone:any;
  public email:any;
  public emailStatus:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    
    this.uphone = this.navParams.get('uphone');
    this.email = this.navParams.get('email');
    this.emailStatus = this.navParams.get('emailStatus');
    console.log('ionViewDidLoad SetAccountPage',this.uphone,this.email);
  }

  /*跳转到修改手机页面*/
  goModifyPhonePage() {
    this.navCtrl.push(ModifyPhonePage,{uphone:this.uphone});
  }

  /*跳转到修改手机页面*/
  goModifyEmailPage() {
    if(this.email && this.emailStatus == 2){
      this.navCtrl.push(ModifyEmailPage,{email:this.email});
    }else{
      this.navCtrl.push(AddEmailPage);
    }
    
  }

}
