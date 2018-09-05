import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';

import { ClientPaymentInfoPage } from '../client-payment-info/client-payment-info';
import { ClientInvoiceEditPage } from '../client-invoice-edit/client-invoice-edit';
import { FormEditPage } from '../../form-edit/form-edit';

import { delCompanyUrl,getCompanyDetailUrl,addOrUpdateCompanyUrl } from '../../../../providers/requestUrl';

/**
 * Generated class for the ClientInfoEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-client-info-edit',
  templateUrl: 'client-info-edit.html',
})
export class ClientInfoEditPage {
  public isShow = false;
  public companyDetaiData={};
  public user = {};
  public isdefault = true;
  constructor(public navCtrl: NavController, public navParams: NavParams,private Provider:MamenDataProvider) {
    // this.companyDetaiData = {}
  }

  ionViewDidLoad() {
    this.user = this.navParams.get('user') || {};
    this.getCompanyDetailData();
    console.log('ionViewDidLoad ClientInfoEditPage');
  }
  ionViewDidEnter() {
    //进行判断（在返回要重新拉取数据时回调）
    this.getCompanyDetailData();
  }

  /*跳转到付款人页面*/
  goPaymentInfo() {
    this.companyDetaiData['cid'] && this.navCtrl.push(ClientPaymentInfoPage,{companyDetaiData:this.companyDetaiData});
  }

  /*跳转到发票信息页面*/
  goInvoiceInfo() {
    this.companyDetaiData['cid'] && this.navCtrl.push(ClientInvoiceEditPage,{companyDetaiData:this.companyDetaiData});
  }

  /*点击删除弹出确认框*/
  onDeleteItem() {
    this.isShow = true;
  }

  /*跳转到数据处理页面*/
  goFormEditPage(field,value,type) {
    
    if(field == 'skillList') {
      value = value && value.length ? value.map(d=>({id:d.asId,text:d.asName})) : [];
    }else if(field == 'industryList') {
      value = value && value.length ? value.map(d=>({id:d.ilid,text:d.industryName})) : [];
    }
    // if(field == 'skillList') {
    //   value = value && value.length ? value.map(d=>({id:d.ssid,text:d.asName})) : [];
    // }else if(field == 'industryList') {
    //   value = value && value.length ? value.map(d=>({id:d.ilid,text:d.alName})) : [];
    // }
    this.navCtrl.push(FormEditPage,{callback:this.setValue,value:value,field:field,type:type});
  }

  /*设置值（回调函数）*/
  setValue = (field,value)=> {
    if(field == 'province-city'){
      this.companyDetaiData['province'] = value['province']
      this.companyDetaiData['city'] = value['city']
    }else if(field == 'industryList'){
      this.companyDetaiData[field] = value && value.length>0 ? value.map(f=>({...f,ilid:f.id,industryName:f.text})):[];
    }else{
      this.companyDetaiData[field] = value;
    }
    console.log(field,value,'设置值（回调函数）')
    
    console.log(this.companyDetaiData,'############333');
  }

  /*确定删除提交*/
  onCompanyDel() {
    let cid = this.navParams.get('cid') || 0;
    // let getCompanyDetailUrl = 'http://mamon.yemindream.com/mamon/company/delCompany';
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    let getCompanyDetailUrl = delCompanyUrl + '?openId=' + openId + '&cid=' + cid;
    this.Provider.getMamenSwiperData(getCompanyDetailUrl).subscribe(res=>{
      if(res.code==200) {
        this.isShow = false;
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

  /*点击弹框关闭*/
  onClose() {
    this.isShow = false;
  }

  getCompanyDetailData() {
    let cid = this.navParams.get('cid') || 0;
    // let getCompanyDetailUrl = 'http://mamon.yemindream.com/mamon/company/getCompanyDetail';
    const openId = window.sessionStorage.getItem('openId')|| this.getUrlParam('openId')
    let getCompanyDetailDataUrl = getCompanyDetailUrl + '?openId=' + openId + '&cid=' + cid;
    this.Provider.getMamenSwiperData(getCompanyDetailDataUrl).subscribe(res=>{
      if(res.code==200) {
        this.companyDetaiData = res.data||{};
        this.isdefault = this.companyDetaiData['priority']
      }else if(res.code == 207) {
        window.localStorage.removeItem('openId');
      }
    },error=>{
      console.log('erros===',error);
    })
  }

  /*获取行业其他值*/
  getOtherIndustrys(data){
    return data.map(d=>{
      if(d.id == -1){
        return d.text;
      }else{
        return 1;
      }
    })
  }


  /*公司的新增、编辑*/
  onCompanySubmit() {
    const openId = window.sessionStorage.getItem('openId')|| this.getUrlParam('openId') ||'o2GZp1Gsud1OVuaw5AH_e28m3kOw';
    let newCompanyDetaiData = this.companyDetaiData;
    let cid = newCompanyDetaiData['cid'] || 0;
    // let industryList = companyDetaiData.industryList ? companyDetaiData.industryList.map(f=>f.ilid).join(','):'';
    let industryList = newCompanyDetaiData['industryList'] ? newCompanyDetaiData['industryList'].map(f=>f.ilid).join(','):'';
    console.log(industryList,123);
    newCompanyDetaiData['otherIndustrys'] = this.getOtherIndustrys(newCompanyDetaiData['industryList']);
    let otherIndustrys = this.companyDetaiData['otherIndustrys'] && this.companyDetaiData['otherIndustrys'].length>0 ? this.companyDetaiData['otherIndustrys'].join(','): '';
    // let getCompanyDetailUrl = 'http://mamon.yemindream.com/mamon/company/addOrUpdateCompany';
    
    let getCompanyDetailUrl = addOrUpdateCompanyUrl + '?openId=' + openId + '&name='+newCompanyDetaiData['companyName']+
                          '&province='+newCompanyDetaiData['province']+
                          '&city='+newCompanyDetaiData['city']+
                          '&address='+newCompanyDetaiData['address']+
                          '&industryIds='+industryList+
                          '&scale='+newCompanyDetaiData['scale']+
                          '&stage='+newCompanyDetaiData['stage']+
                          '&priority='+(this.isdefault?1:0)+
                          '&phone='+newCompanyDetaiData['companyPhone']+
                          '&otherIndustrys='+otherIndustrys+
                          '&website='+newCompanyDetaiData['webSite'];
                          // '&zipCode='+companyDetaiData.webSite;
    if(cid){
      getCompanyDetailUrl = getCompanyDetailUrl + '&cid=' + cid;
    }
    
    this.Provider.getMamenSwiperData(getCompanyDetailUrl).subscribe(res=>{
      if(res.code==200) {
        alert((cid?'修改':'新增') + '成功');
        this.navCtrl.pop();
      }else if(res.code == 207) {
        window.localStorage.removeItem('openId');
      }
    },error=>{
      console.log('erros===',error);
    })

  }


}
