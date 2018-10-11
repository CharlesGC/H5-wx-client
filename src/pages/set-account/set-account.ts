import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModifyPhonePage } from '../modify-phone/modify-phone';
import { ModifyEmailPage } from '../modify-email/modify-email';
import { AddEmailPage } from '../add-email/add-email'
import { HttpClient, HttpParams } from '@angular/common/http';
import { hideAttentionMenuUrl, getAttentionUserInfo } from '../../providers/requestUrl'
declare var wx: any;
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
  public uphone: any;
  public email: any;
  public emailStatus: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
  }

  ionViewDidLoad() {
    this.uphone = this.navParams.get('uphone');
    this.email = this.navParams.get('email');
    this.emailStatus = this.navParams.get('emailStatus');
    console.log('ionViewDidLoad SetAccountPage', this.uphone, this.email);
  }
  ionViewDidEnter() {
    this.isAttention();
  }

  //隐藏底部分享菜单
  isAttention() {
    // let url = location.href.split('#')[0]; // 当前网页的URL，不包含#及其后面部分
    // let data = { url: url };
    this.http.get(hideAttentionMenuUrl).subscribe(res => {
      if (res['code'] == 200) {
        wx.config({
          debug: false,
          appId: res['data'].appid,
          timestamp: res['data'].timestamp,
          nonceStr: res['data'].nonceStr,
          signature: res['data'].signature,
          jsApiList: ['hideOptionMenu']
        });
        wx.ready(function () {
          //wx.showOptionMenu();
          wx.hideOptionMenu();
        });
      }
    })
  }
  /*跳转到修改手机页面*/
  goModifyPhonePage() {
    this.navCtrl.push(ModifyPhonePage, { uphone: this.uphone });
  }

  /*跳转到修改手机页面*/
  goModifyEmailPage() {
    if (this.email && this.emailStatus == 2) {
      this.navCtrl.push(ModifyEmailPage, { email: this.email });
    } else {
      this.navCtrl.push(AddEmailPage);
    }

  }

}
