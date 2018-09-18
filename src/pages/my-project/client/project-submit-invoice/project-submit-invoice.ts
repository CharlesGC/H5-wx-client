import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';

import { FormEditPage } from '../../../contact/form-edit/form-edit';
import { getInvoiceByPsidUrl, addInvoiceUrl } from '../../../../providers/requestUrl';

/**
 * Generated class for the ProjectSubmitInvoicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-project-submit-invoice',
  templateUrl: 'project-submit-invoice.html',
})
export class ProjectSubmitInvoicePage {
  public selected:any;
  public invoiceData = {}
  public isComplete = false;
  public isSubmit = true;
  constructor(public navCtrl: NavController, public navParams: NavParams,private Provider:MamenDataProvider) {
    this.selected = 0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectSubmitInvoicePage');
    let psid = this.navParams.get('id')
    this.getProjectInvoiceDetail(psid);
  }

  /*点击选择事件*/
  onSelectInvoice(type) {
    this.selected = type;
  }

  /*列表编辑*/
  goFormEditPage(field, value, type) {
    this.navCtrl.push(FormEditPage,{callback:this.setValue,value:value,field:field,type:type});
  }

  /*设置值（回调函数）*/
  setValue = (field,value)=> {
    
    this.invoiceData[field] = value;
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


  /*项目阶段详情数据请求*/
  getProjectInvoiceDetail(psid) {
    // let projectInvoiceDetailUrl = 'http://mamon.yemindream.com/mamon/customer/getInvoiceByPsid';
    const openId = window.sessionStorage.getItem('openId')|| this.getUrlParam('openId');
    let projectInvoiceDetailUrl = getInvoiceByPsidUrl + '?openId=' + openId + '&psid='+psid;
    this.Provider.getMamenSwiperData(projectInvoiceDetailUrl).subscribe(res=>{
      if(res.code==200) {
        console.log(res,'--------');
        this.invoiceData = res.data;
      }else if(res.code == 207) {
        window.localStorage.removeItem('openId');
      }else{
        alert('请求出错:'+res.msg);
      }
    },error=>{
      console.log('erros===',error);
    })
  }

  /*申请发票提交*/
  goInvoiceSubmit(){
    let psid = this.navParams.get('id');
    let invoiceData = this.invoiceData;
    // let projectInvoiceDetailUrl = 'http://mamon.yemindream.com/mamon/customer/addInvoice';
    if(this.selected == 1){
      if((!invoiceData['price'] && invoiceData['price'] !=0) || !invoiceData['invoiceLetterhead'] || 
      !invoiceData['taxNumber'] || !invoiceData['companyAddress'] || !invoiceData['recipient'] || !invoiceData['taxPhone']){
        this.isComplete = true;
        return
      }
    }else if(this.selected == 0){
      if((!invoiceData['price'] && invoiceData['price'] !=0) || !invoiceData['invoiceLetterhead'] || !invoiceData['companyPhone'] ||
       !invoiceData['openBank'] ||　!invoiceData['taxNumber'] || !invoiceData['companyAddress'] || !invoiceData['recipient'] || !invoiceData['taxPhone']){
        this.isComplete = true;
        return
      }
    }
    if(!this.isSubmit){
      return;
    }
    this.isSubmit = false;

    const openId = window.sessionStorage.getItem('openId')|| this.getUrlParam('openId');
    let projectInvoiceDetailUrl = addInvoiceUrl + '?openId=' + openId + '&psid='+psid + '&invoiceType='+this.selected+
                              '&invoiceLetterhead='+invoiceData['invoiceLetterhead']+
                              '&taxNumber='+invoiceData['taxNumber']+
                              '&price='+invoiceData['price']+
                              '&recipient='+invoiceData['recipient']+
                              '&phone='+invoiceData['taxPhone']+
                              '&bankName='+invoiceData['openBank']+
                              '&companyPhone='+invoiceData['companyPhone']+
                              '&companyAddress='+invoiceData['companyAddress']+
                              '&bankNumber='+invoiceData['account'];
    this.Provider.getMamenSwiperData(projectInvoiceDetailUrl).subscribe(res=>{
      if(res.code==200) {
        this.invoiceData = res.data;
        this.navCtrl.pop();
      }else if(res.code == 207) {
        window.localStorage.removeItem('openId');
      }else{
        alert('请求出错:'+res.msg);
      }
      this.isSubmit = true;
    },error=>{
      console.log('erros===',error);
    })
  }

  sureComplete(){
    this.isComplete = !this.isComplete
    return
  }

}
