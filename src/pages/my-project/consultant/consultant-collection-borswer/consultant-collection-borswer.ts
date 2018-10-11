import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';
import { applyMoneyDetailUrl, hideAttentionMenuUrl, getAttentionUserInfo } from '../../../../providers/requestUrl';
import { HttpClient, HttpParams } from '@angular/common/http';
declare var wx: any;
/**
 * Generated class for the ConsultantCollectionBorswerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-consultant-collection-borswer',
  templateUrl: 'consultant-collection-borswer.html',
})
export class ConsultantCollectionBorswerPage {

  public invoiceType: any;
  public projectInvoiceDetails = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, private Provider: MamenDataProvider, private http: HttpClient) {
    this.invoiceType = 0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectInvoiceBrowserPage');
    let id = this.navParams.get('id');
    this.getProjectInvoiceDetails(id);
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
  getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象  
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数  
    if (r != null) {
      return encodeURI(r[2]);  //返回参数值 
    } else {
      return null;
    }
  }

  /*项目支付记录详情数据请求*/
  getProjectInvoiceDetails(id) {
    // let projectInvoiceDetailsUrl = 'http://mamon.yemindream.com/mamon/adviser/applyMoneyDetail';
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    let projectInvoiceDetailsUrl = applyMoneyDetailUrl + '?openId=' + openId + '&mpid=' + id;
    this.Provider.getMamenSwiperData(projectInvoiceDetailsUrl).subscribe(res => {
      if (res.code == 200) {
        console.log(res, '--------');
        this.projectInvoiceDetails = res.data;
      } else if (res.code == 207) {
        window.localStorage.removeItem('openId');
      } else {
        alert('请求出错:' + res.msg);
      }
    }, error => {
      console.log('erros===', error);
    })
  }


}
