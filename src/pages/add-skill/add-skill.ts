import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ContactPage } from '../contact/contact';
// import {ReleasePage} from '../release/release';
import { HttpClient, HttpParams } from '@angular/common/http';
import { hideAttentionMenuUrl, getAttentionUserInfo } from '../../providers/requestUrl'
declare var wx: any;
@IonicPage()
@Component({
  selector: 'page-add-skill',
  templateUrl: 'add-skill.html',
})
export class AddSkillPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
  }
  ionViewDidEnter(){
    this.isAttention();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddSkillPage');
  }
  goback() {
    this.navCtrl.push(ContactPage);
  }
  // 跳转发布页
  gotoreleasePage() {
    // this.navCtrl.push(ReleasePage);
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
}
