import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// import {ReleasePage} from '../release/release';
import { SearchIndustryPage } from '../search-industry/search-industry';
import { ReleaseSuccessPage } from '../release-success/release-success';
import { ReleaseThreePage } from '../release-three/release-three';
import { CompanyPage } from '../company/company';
import { MamenDataProvider } from '../../providers/mamen-data/mamen-data';
import { getSavaraft } from '../../providers/dataUrl';
import { HttpClient, HttpParams } from '@angular/common/http';
import { hideAttentionMenuUrl, getAttentionUserInfo } from '../../providers/requestUrl'
declare var wx: any;
/**
 * Generated class for the ReleaseTwoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-release-two',
  templateUrl: 'release-two.html',
})
export class ReleaseTwoPage {
  public releaseData = {};
  public SavaraftTwoArr: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public SavaraftTwoData: MamenDataProvider, private http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReleaseTwoPage');
    // this.getSavaraftData();
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
  gotoAddindustry() {
    this.navCtrl.push(ReleaseThreePage);
  }
  // 跳转到输入详情
  gocompany(field, value, type) {
    this.navCtrl.push(CompanyPage, { callback: this.setValue, field: field, value: value, type: type });

  }
  // 获取数据
  // getSavaraftData() {
  //   this.SavaraftTwoData.getSavaraftTwoData(getSavaraft,'erwer','er','ere','ere').subscribe(
  //     res=>{
  //       console.log(1111);
  //       console.log(res);
  //       this.SavaraftTwoArr = res.data;
  //       console.log(this.SavaraftTwoArr);
  //     },error=>{
  //       console.log(error);
  //     }
  //   )
  // }
  setValue = (field, value) => {
    console.log(field, value, 1231312);
    // if (field == 'uid') {
    //   this.releaseData[field] = value.cid;
    //   this.releaseData['name'] = value.name;
    // }
    this.releaseData[field] = value;
  }
  // 存为草稿
  keepdraft() {
    //   console.log(this.releaseData);
    //   this.SavaraftTwoData.getSavaraftTwoData(getSavaraft,this.releaseData['projectName'],
    //   this.releaseData['description'],this.releaseData['target'],this.releaseData['note']).subscribe(
    //     res=>{
    //       console.log(1111);
    //       console.log(res);
    //       this.SavaraftTwoArr = res.data;
    //       console.log(this.SavaraftTwoArr);
    //     },error=>{
    //       console.log(error);
    //     }
    //   )
  }
}
