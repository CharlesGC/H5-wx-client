import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';

import { FormEditPage } from '../../form-edit/form-edit'
import { editCompanyPayTaxesUrl,delPayTaxesUrl } from '../../../../providers/requestUrl';

/**
 * Generated class for the ClientInvoiceEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-client-invoice-edit',
  templateUrl: 'client-invoice-edit.html',
})
export class ClientInvoiceEditPage {
  public invoiceData:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private Provider:MamenDataProvider) {
    this.invoiceData = {}
  }
  

  ionViewDidLoad() {
    this.invoiceData = this.navParams.get('companyDetaiData') || {};
    console.log(this.invoiceData,'this.invoiceData');
    console.log(this.invoiceData,'ionViewDidLoad ClientInvoiceEditPage');
  }

  /*跳转到数据处理页面*/
  goFormEditPage(field,value,type) {
    this.navCtrl.push(FormEditPage,{callback:this.setValue,value:value,field:field,type:type});
  }

  /*设置值（回调函数）*/
  setValue = (field,value)=> {
    this.invoiceData[field] = value;
  }

  /*编辑提交*/
  onInvoiceSubmit() {
    let invoiceData = this.invoiceData;
    let cid = invoiceData.cid;
    // let getCompanyListUrl = 'http://mamon.yemindream.com/mamon/company/editCompanyPayTaxes';
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId')
    let getCompanyListUrl = editCompanyPayTaxesUrl + '?openId=' + openId + '&cid=' + cid + '&taxNumber='+invoiceData.taxNumber + '&taxPhone='+invoiceData.taxPhone+
    '&taxAccount='+invoiceData.taxAccount + '&taxBank='+invoiceData.taxBank;
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

  /*删除纳税信息*/
  onInvoiceDel() {
    let invoiceData = this.invoiceData;
    let cid = invoiceData.cid;
    // let getCompanyListUrl = 'http://mamon.yemindream.com/mamon/company/delPayTaxes';
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId') ||'o2GZp1Gsud1OVuaw5AH_e28m3kOw'
    let getCompanyListUrl = delPayTaxesUrl + '?openId=' + openId + '&cid=' + cid;
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
