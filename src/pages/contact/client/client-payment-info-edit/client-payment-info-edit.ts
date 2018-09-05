import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';
import { FormEditPage } from '../../form-edit/form-edit'
import { editCompanyPayerUrl,addCompanyPayerUrl,delPayerUrl } from '../../../../providers/requestUrl';
/**
 * Generated class for the ClientPaymentInfoEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-client-payment-info-edit',
  templateUrl: 'client-payment-info-edit.html',
})
export class ClientPaymentInfoEditPage {
  public isdefault:any;
  public paymentDetail:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private Provider:MamenDataProvider) {
    this.paymentDetail={}
  }

  ionViewDidLoad() {
    this.paymentDetail = this.navParams.get('data') || {};
    this.isdefault = this.paymentDetail.type == 1;
    console.log(this.isdefault,this.paymentDetail,'ionViewDidLoad ClientPaymentInfoEditPage');
  }

  /*跳转到数据处理页面*/
  goFormEditPage(field,value,type) {
    this.navCtrl.push(FormEditPage,{callback:this.setValue,value:value,field:field,type:type});
  }

  /*设置值（回调函数）*/
  setValue = (field,value)=> {
    this.paymentDetail[field] = value;
  }

  /*编辑公司付款人信息*/
  onPaymentSubmit() {
    let paymentDetail = this.paymentDetail;
    let type = this.isdefault ? 1:0;
    let cpid = paymentDetail.cpid;
    let cid = paymentDetail.cid;
    let getCompanyListUrl = editCompanyPayerUrl + '?cpid='+cpid; 
    if(!cpid){
      getCompanyListUrl = addCompanyPayerUrl + '?cid=' +cid;
    }
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId') ||'o2GZp1Gsud1OVuaw5AH_e28m3kOw'
    getCompanyListUrl = getCompanyListUrl + '&openId=' + openId  + '&payerName='+paymentDetail.name + '&payerBank='+paymentDetail.bankName+
    '&payerAccount='+paymentDetail.account + '&type='+type;
   
    this.Provider.getMamenSwiperData(getCompanyListUrl).subscribe(res=>{
      if(res.code==200) {
        alert('修改成功')
        this.navCtrl.pop();
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

  /*删除纳税信息*/
  onPaymentDel() {
    let paymentDetail = this.paymentDetail;
    let cpid = paymentDetail.cpid;
    // let getCompanyListUrl = 'http://mamon.yemindream.com/mamon/company/delPayer';
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId') ||'o2GZp1Gsud1OVuaw5AH_e28m3kOw'
    let getCompanyListUrl = delPayerUrl + '?openId=' + openId + '&cpid=' + cpid;
    this.Provider.getMamenSwiperData(getCompanyListUrl).subscribe(res=>{
      if(res.code==200) {
        alert('删除成功！')
        this.navCtrl.pop();
      }else if(res.code == 207) {
        window.localStorage.removeItem('openId');
      }
    },error=>{
      console.log('erros===',error);
    })
  }

}
