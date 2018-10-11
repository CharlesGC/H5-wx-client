import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddIndustryPage } from '../add-industry/add-industry';
import { MamenDataProvider } from '../../providers/mamen-data/mamen-data';
import { getindustryUrl } from '../../providers/dataUrl';
import { HttpClient, HttpParams } from '@angular/common/http';
import { hideAttentionMenuUrl, getAttentionUserInfo } from '../../providers/requestUrl'
declare var wx: any;
/**
 * Generated class for the SearchIndustryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-industry',
  templateUrl: 'search-industry.html',
})
export class SearchIndustryPage {
  public industryArr: any;

  public field: any;
  public fieldType: any;
  public fieldValue: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public industryData: MamenDataProvider, private http: HttpClient) {
  }

  ionViewDidLoad() {
    this.getSavaraftData();
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
  // 获取行业标签数据
  getSavaraftData() {
    this.industryData.getIndustryMoreData(getindustryUrl, 1, 1, 10).subscribe(
      res => {
        console.log(1111);
        console.log(res);
        this.industryArr = res.data.list;
        console.log(this.industryArr);
      }, error => {
        console.log(error);
      }
    )
  }
  // 保存
  // industrySubmit(data){
  //   console.log(data);
  //   let callback = this.navParams.get('callback');
  //   callback(this.field,this.fieldValue,data);
  //   this.navCtrl.pop();
  // }

  gotoaddIndustry() {
    this.navCtrl.push(AddIndustryPage);
  }
  getName(item) {
    console.log(item);
  }
}
