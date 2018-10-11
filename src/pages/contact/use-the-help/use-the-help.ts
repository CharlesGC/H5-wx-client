import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConsultantTheHelpPage } from '../consultant-the-help/consultant-the-help';
import { ClientTheHelpPage } from '../client-the-help/client-the-help';
import { HttpClient, HttpParams } from '@angular/common/http';
import { hideAttentionMenuUrl, getAttentionUserInfo } from '../../../providers/requestUrl'
declare var wx: any;
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
  public userType: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
  }

  ionViewDidLoad() {
    this.userType = this.navParams.get('userType');
    // this.userType = 1;
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
  /*跳转到帮助详情页面*/
  goUseHelpDaiPage(type, title) {
    if (this.userType == 1) {
      this.navCtrl.push(ConsultantTheHelpPage, { type: type, title: title });
    } else if (this.userType == 0) {
      this.navCtrl.push(ClientTheHelpPage, { type: type, title: title });
    }

  }
}
