import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { hideAttentionMenuUrl, getAttentionUserInfo,sourceHistoryUrl } from '../../../providers/requestUrl';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MamenDataProvider } from '../../../providers/mamen-data/mamen-data';
/**
 * Generated class for the CasemorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var wx: any;
@IonicPage()
@Component({
  selector: 'page-casemore',
  templateUrl: 'casemore.html',
})
export class CasemorePage {
  public attstate: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient,private Provider: MamenDataProvider,) {
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad CasemorePage');
    const openId = window.sessionStorage.getItem('openId');
    let getAttentionUserInfoUrl = getAttentionUserInfo + '?openId=' + openId;
    //console.log(getAttentionUserInfo)
    this.http.get(getAttentionUserInfoUrl).subscribe(res => {
      this.attstate = res['data'].subscribe;
      //console.log(res,'ccc')
    });
    this.isAttention();
  }
  //隐藏底部分享菜单
  isAttention() {
    let url = encodeURIComponent(location.href.split('#')[0]); // 当前网页的URL，不包含#及其后面部分
    let wUrl = hideAttentionMenuUrl + '?url=' + url;
    this.Provider.getMamenSwiperData(wUrl).subscribe(res => {
      if (res['code'] == 200) {
        wx.config({
          debug: false,
          appId: res['data'].appid,
          timestamp: res['data'].timestamp,
          nonceStr: res['data'].nonceStr,
          signature: res['data'].signature,
          jsApiList: ['showOptionMenu','onMenuShareAppMessage']
        });
        wx.ready(function () {
          wx.showOptionMenu();
          wx.onMenuShareAppMessage({
            // 分享标题
            title: '麦盟自由顾问平台',
            // 分享描述 
            desc: '麦盟自由顾问平台',
            // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            link: sourceHistoryUrl + '&page=5',
            // 分享图标 
            imgUrl: '../../assets/imgs/logobig.png',
          }, function (res) {
            //alert(res)
          });
        });
      }
    }, error => {
      console.log('erros===', error);
    })
  }
}
