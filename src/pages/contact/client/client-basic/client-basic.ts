import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClientInfoEditPage } from '../client-info-edit/client-info-edit';
import { ClientInfoUserPage } from '../client-info-user/client-info-user';
import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';
import { getCompanyListUrl } from '../../../../providers/requestUrl';
import { HttpClient, HttpParams } from '@angular/common/http';
import { hideAttentionMenuUrl, getAttentionUserInfo } from '../../../../providers/requestUrl'
declare var wx: any;

/**
 * Generated class for the ClientBasicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-client-basic',
  templateUrl: 'client-basic.html',
})
export class ClientBasicPage {
  public user: any;
  public companyList: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private Provider: MamenDataProvider, private http: HttpClient) {
    this.user = {};
    this.companyList = [];
  }

  ionViewDidLoad() {
    this.user = this.navParams.get('user') || {};
    this.getCompanyData();
  }

  ionViewDidEnter() {
    this.getCompanyData();
    this.isAttention();
  }

  getCompanyData() {
    // let getCompanyListUrl = 'http://mamon.yemindream.com/mamon/company/getCompanyList';
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId') || 'o2GZp1Gsud1OVuaw5AH_e28m3kOw'
    let getCompanyListDataUrl = getCompanyListUrl + '?openId=' + openId;
    this.Provider.getMamenSwiperData(getCompanyListDataUrl).subscribe(res => {
      if (res.code == 200) {
        this.companyList = res.data;
      } else if (res.code == 207) {
        window.localStorage.removeItem('openId');
      }
    }, error => {
      console.log('erros===', error);
    })
  }

  getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象  
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数  
    if (r != null) {
      return encodeURI(r[2]);  //返回参数值 
    } else {
      return null;
    }
  }

  onSelected(value, cid) {
    if (value == 0) {
      this.navCtrl.push(ClientInfoUserPage, { user: this.user });
      return;
    } else if (value == 1) {
      this.navCtrl.push(ClientInfoEditPage, { user: this.user, cid: cid });
    }
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
