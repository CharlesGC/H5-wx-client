import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MamenDataProvider } from '../../../providers/mamen-data/mamen-data';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ConsultantBankAccountEditPage } from '../../contact/consultant/consultant-bank-account-edit/consultant-bank-account-edit';
import { ClientPaymentInfoEditPage } from '../../contact/client/client-payment-info-edit/client-payment-info-edit';
import { getBankListUrl, getPayerListUrl, hideAttentionMenuUrl, getAttentionUserInfo } from '../../../providers/requestUrl';
declare var wx: any;
/**
 * Generated class for the ProjectCollectBankPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-project-collect-bank',
  templateUrl: 'project-collect-bank.html',
})
export class ProjectCollectBankPage {
  public consultantBankList = [];
  public paymentListData = [];
  public type = ''
  constructor(public navCtrl: NavController, public navParams: NavParams, private Provider: MamenDataProvider, private http: HttpClient) {
  }

  ionViewDidLoad() {
    let type = this.navParams.get('type');
    let cid = this.navParams.get('cid');
    this.type = this.navParams.get('type');
    if (type == 'consultantType') {
      this.getbankListData();
    } else {
      this.getpaymentListData(cid)
    }

  }

  ionViewDidEnter() {
    let type = this.navParams.get('type');
    let cid = this.navParams.get('cid');
    this.type = this.navParams.get('type');
    if (type == 'consultantType') {
      this.getbankListData();
    } else {
      this.getpaymentListData(cid)
    }
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
  /*跳转到账号编辑页面*/
  onCollectBankClick(data) {
    let callback = this.navParams.get('callback');
    let field = this.navParams.get('field');
    callback(field, data);
    this.navCtrl.pop();
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

  /*请求收款账号*/
  getbankListData() {
    let companyDetaiData = this.navParams.get('companyDetaiData') || {};
    // let getpaymentListUrl = 'http://mamon.yemindream.com/mamon/adviser/getBankList';
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    let getpaymentListUrl = getBankListUrl + '?openId=' + openId;
    this.Provider.getMamenSwiperData(getpaymentListUrl).subscribe(res => {
      if (res.code == 200) {
        this.consultantBankList = res.data;
      } else if (res.code == 207) {
        window.localStorage.removeItem('openId');
      }
    }, error => {
      console.log('erros===', error);
    })
  }

  /*请求付款人信息*/
  getpaymentListData(cid) {
    let companyDetaiData = this.navParams.get('data') || {};
    // let getpaymentListUrl = 'http://mamon.yemindream.com/mamon/company/getPayerList';
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    let getpaymentListUrl = getPayerListUrl + '?openId=' + openId + '&cid=' + cid;
    this.Provider.getMamenSwiperData(getpaymentListUrl).subscribe(res => {
      if (res.code == 200) {
        this.paymentListData = res.data;
      } else if (res.code == 207) {
        window.localStorage.removeItem('openId');
      }
    }, error => {
      console.log('erros===', error);
    })
  }

  /*跳转到账号编辑页面*/
  goAccountEdit() {
    this.navCtrl.push(ConsultantBankAccountEditPage);
  }

  /*付款人编辑页面*/
  goPaymentInfoEdit() {
    let cid = this.navParams.get('cid');
    this.navCtrl.push(ClientPaymentInfoEditPage, { data: { cid: cid } });
  }

}
