import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SpeedPage } from '../speed/speed';
import { AptitudePage } from '../aptitude/aptitude';
import { BudgetPage } from '../budget/budget';
import { DateStartPage } from '../date-start/date-start';
import { AppointDatePage } from '../appoint-date/appoint-date';
import { SearchIndustryPage } from '../search-industry/search-industry';
import { HttpClient, HttpParams } from '@angular/common/http';
import { hideAttentionMenuUrl, getAttentionUserInfo } from '../../providers/requestUrl'
declare var wx: any;
/**
 * Generated class for the ReleaseThreePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-release-three',
  templateUrl: 'release-three.html',
})
export class ReleaseThreePage {
  public releaseData = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReleaseThreePage');
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
  /*跳转到行业搜索*/
  gosearchIndustry(field, value) {
    console.log(field, value, '==========')
    this.navCtrl.push(SearchIndustryPage, { callback: this.setValue, field: field, value: value });
  }

  setValue = (field, value) => {
    console.log(field, value, 1231312);
    // if (field == 'uid') {
    //   this.industryData[field] = value.cid;
    //   this.industryData['name'] = value.name;
    // }
    this.releaseData[field] = value;
  }

  // 跳转到资质需求
  goaptitude() {
    this.navCtrl.push(AptitudePage);
  }
  gotoSpeedPage() {
    this.navCtrl.push(SpeedPage);
  }
  goBudgetPage() {
    this.navCtrl.push(BudgetPage);
  }
  // 跳转到开始时间
  godatestart() {
    this.navCtrl.push(DateStartPage);
  }
  // 跳转到项目时间
  goappiontPage() {
    this.navCtrl.push(AppointDatePage);
  }
  /*跳转到行业搜索*/
}
