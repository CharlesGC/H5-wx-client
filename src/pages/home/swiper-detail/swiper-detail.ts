import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { hideAttentionMenuUrl, getAttentionUserInfo,sourceHistoryUrl } from '../../../providers/requestUrl';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MamenDataProvider } from '../../../providers/mamen-data/mamen-data';
/**
 * Generated class for the SwiperDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var wx: any;
@IonicPage()
@Component({
  selector: 'page-swiper-detail',
  templateUrl: 'swiper-detail.html',
})
export class SwiperDetailPage {
  public index: any;
  public title: any;
  public attstate: any
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient,private Provider: MamenDataProvider,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SwiperDetailPage');
    this.index = this.navParams.get('index') || window.localStorage.getItem('index') ||0;
    if (this.index == 0) {
      this.title = "麦盟-自由顾问精英聚集地";
    } else if (this.index == 1) {
      this.title = "一边是忙碌的工作，一边是更有趣的生活";
    } else if (this.index == 2) {
      this.title = "“麦盟趣镜”工作，更自由！";
    } else if (this.index == 3) {
      this.title = "“麦盟趣镜”自由，更挑战！";
    } else if (this.index == 4) {
      this.title = "顾问之路高大上？其实很简单";
    } else {
      this.title = "麦盟-自由顾问精英聚集地";
    }
  }
  ionViewDidEnter() {
    // let elements = document.querySelectorAll(".tabbar");
    // if (elements != null) {
    //   Object.keys(elements).map((key) => {
    //     elements[key].style.display = 'flex';
    //     elements[key].style.zIndex = 999;
    //   });
    // }
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
            link: sourceHistoryUrl + '&page=9&index='+this.index,
            // 分享图标 
            imgUrl: '../../assets/imgs/logobig.png',
          }, function (res) {
            alert(res)
          });
        });
      }
    }, error => {
      console.log('erros===', error);
    })
  }
}
