import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ReleaseThreePage } from '../release-three/release-three';
import { HttpClient, HttpParams } from '@angular/common/http';
import { hideAttentionMenuUrl, getAttentionUserInfo } from '../../providers/requestUrl'
declare var wx: any;
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DateStartPage');
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
  gotoreleasePage() {
    this.navCtrl.push(ReleaseThreePage);
  }
}
