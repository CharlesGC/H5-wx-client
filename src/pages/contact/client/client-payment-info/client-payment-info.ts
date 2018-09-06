import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';

import { ClientPaymentInfoEditPage } from '../client-payment-info-edit/client-payment-info-edit'
import { getPayerListUrl } from '../../../../providers/requestUrl';

/**
 * Generated class for the ClientPaymentInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-client-payment-info',
  templateUrl: 'client-payment-info.html',
})
export class ClientPaymentInfoPage {
  public paymentListData:any;
  public companyDetaiData:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private Provider:MamenDataProvider) {
    this.paymentListData = []
    this.companyDetaiData ={};
  }

  ionViewDidLoad() {
    this.getpaymentListData();
    this.companyDetaiData = this.navParams.get('companyDetaiData') || {}
    console.log('ionViewDidLoad ClientPaymentInfoPage');
  }

  ionViewDidEnter() {
    this.getpaymentListData();
  }

  /*跳转到付款人编辑页面*/
  goPaymentInfoEdit(data) {
    if(!data){
      this.navCtrl.push(ClientPaymentInfoEditPage,{data:this.companyDetaiData});
      return;
    }
    this.navCtrl.push(ClientPaymentInfoEditPage,{data:data});
  }

  getpaymentListData() {
    let companyDetaiData = this.companyDetaiData;
    // let getpaymentListUrl = 'http://mamon.yemindream.com/mamon/company/getPayerList';
    const openId = window.sessionStorage.getItem('openId')|| this.getUrlParam('openId');
    let getpaymentListUrl = getPayerListUrl + '?openId=' + openId + '&cid=' + (companyDetaiData['cid']||0);
    this.Provider.getMamenSwiperData(getpaymentListUrl).subscribe(res=>{
      if(res.code==200) {
        this.paymentListData = res.data;
        console.log(this.paymentListData,'##########')
      }else if(res.code == 207) {
        window.localStorage.removeItem('openId');
      }
    },error=>{
      console.log('erros===',error);
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
}


