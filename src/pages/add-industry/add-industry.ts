import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SearchIndustryPage } from '../search-industry/search-industry';
import { ReleaseTwoPage } from '../release-two/release-two';
import { HttpClient, HttpParams } from '@angular/common/http';
import { hideAttentionMenuUrl, getAttentionUserInfo } from '../../providers/requestUrl'
declare var wx: any;
/** 
 * Generated class for the AddIndustryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-industry',
  templateUrl: 'add-industry.html',
})
export class AddIndustryPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
  }
  ionViewDidEnter(){
   this.isAttention();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddIndustryPage');
  }
  addindustry() {
    this.navCtrl.push(SearchIndustryPage);
  }
  gotoreleasePage() {
    this.navCtrl.push(ReleaseTwoPage);
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
