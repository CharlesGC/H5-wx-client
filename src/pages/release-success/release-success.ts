import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ReleaseThreePage } from '../release-three/release-three';
import { ReleaseTwoPage } from '../release-two/release-two';
import { HttpClient, HttpParams } from '@angular/common/http';
import { hideAttentionMenuUrl, getAttentionUserInfo } from '../../providers/requestUrl'
declare var wx: any;

@IonicPage()
@Component({
  selector: 'page-release-success',
  templateUrl: 'release-success.html',
})
export class ReleaseSuccessPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReleaseSuccessPage');
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
  // 返回项目列表
  goreleasethree() {
    this.navCtrl.push(ReleaseThreePage);
  }
  // 继续发布项目
  gorelease() {
    this.navCtrl.push(ReleaseTwoPage);
  }
}
