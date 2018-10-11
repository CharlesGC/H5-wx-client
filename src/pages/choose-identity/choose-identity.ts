import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MamenDataProvider } from '../../providers/mamen-data/mamen-data';
import { HomePage } from '../home/home';
import { HttpClient, HttpParams } from '@angular/common/http';
import { hideAttentionMenuUrl, getAttentionUserInfo } from '../../providers/requestUrl'
declare var wx: any;

import { PhonebindPage } from '../phonebind/phonebind'

@IonicPage()
@Component({
  selector: 'page-choose-identity',
  templateUrl: 'choose-identity.html',
  viewProviders: [MamenDataProvider]
})
export class ChooseIdentityPage {
  public pepperoni: boolean;
  public sausage: boolean;
  public mushrooms: boolean;
  public relationship: any;
  public isDisabled = true;
  public userType = { friends: 0, enemies: 1, family: 2 }

  public Selected = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private Provider: MamenDataProvider, private http: HttpClient) {
  }
  ionViewDidEnter() {
    this.isAttention();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChooseIdentityPage');
  }

  /*选择身份提交*/
  onChooseSubmit() {
    // let openId = window.sessionStorage.getItem('openId');
    // let chooseIdentyUrl = 'http://mamon.yemindream.com/mamon/user/choiceUserType?';
    // // chooseIdentyUrl = chooseIdentyUrl + 'token=' + token + '&type=' + this.userType[this.relationship];
    // chooseIdentyUrl = chooseIdentyUrl + 'openId=' + openId + '&type=' + this.Selected;
    // this.Provider.getMamenSwiperData(chooseIdentyUrl).subscribe(res=>{
    //   if(res.code==200) {
    //     //跳转选择身份页面
    //     window.sessionStorage.setItem('user',JSON.stringify(res.data))
    //     window.sessionStorage.setItem('status','0');
    //     this.navCtrl.push(PhonebindPage);
    //   }else if(res.code == 207) {
    //     window.localStorage.removeItem('openId');
    //     this.navCtrl.push(LoginPage);
    //   }
    // },error=>{
    //   console.log('erros===',error);
    // })
    this.navCtrl.push(PhonebindPage, { parmens: this.Selected });
  }

  /*判断是否已选择*/
  onSelectChange() {
    if (!this.isDisabled) {
      return;
    }
    this.isDisabled = !this.relationship
  }

  onSelected(value) {
    this.Selected = value
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
