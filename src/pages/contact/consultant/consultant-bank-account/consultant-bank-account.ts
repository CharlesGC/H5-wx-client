import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';

import { ConsultantBankAccountEditPage } from '../consultant-bank-account-edit/consultant-bank-account-edit';
import { getBankListUrl } from '../../../../providers/requestUrl';

/**
 * Generated class for the ConsultantBankAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-consultant-bank-account',
  templateUrl: 'consultant-bank-account.html',
})
export class ConsultantBankAccountPage {
  public consultantBankList: any;
  public ReceiptNum: any
  constructor(public navCtrl: NavController, public navParams: NavParams, private Provider: MamenDataProvider) {
    this.consultantBankList = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConsultantBankAccountPage');
    this.getpaymentListData();
  }
  ionViewDidEnter() {
    this.getpaymentListData();
  }

  /*跳转到账号编辑页面*/
  goAccountEdit(data) {
    this.navCtrl.push(ConsultantBankAccountEditPage, { data: data });
  }

  /*请求*/
  getpaymentListData() {
    let companyDetaiData = this.navParams.get('companyDetaiData') || {};
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    let getpaymentListUrl = getBankListUrl + '?openId=' + openId;
    this.Provider.getMamenSwiperData(getpaymentListUrl).subscribe(res => {
      if (res.code == 200) {
        this.consultantBankList = res.data;
        this.ReceiptNum = this.consultantBankList.length
        //console.log(this.consultantBankList,'##########')
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

  goback() {
    let callback = this.navParams.get('callback')
    callback(this.ReceiptNum)
    this.navCtrl.pop()
  }
}
