import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';

import { ProjectCollectBankPage } from '../../project-collect-bank/project-collect-bank';
import { FormEditPage } from '../../../contact/form-edit/form-edit';
import { applyMoneyInfoUrl,applyMoneyUrl } from '../../../../providers/requestUrl';

/**
 * Generated class for the ConsultantDeliveryModelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-consultant-delivery-model',
  templateUrl: 'consultant-delivery-model.html',
})
export class ConsultantDeliveryModelPage {
  public deliveryModelData = {}
  constructor(public navCtrl: NavController, public navParams: NavParams,private Provider:MamenDataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConsultantDeliveryModelPage');
    let psid = this.navParams.get('psid');
    this.getProjectStageListData(psid);
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
  /*获取付款申请信息请求*/
  getProjectStageListData(psid) {
    // let projectStageListUrl = 'http://mamon.yemindream.com/mamon/adviser/applyMoneyInfo';
    const openId = window.sessionStorage.getItem('openId')|| this.getUrlParam('openId');
    let projectStageListUrl = applyMoneyInfoUrl + '?openId=' + openId + '&psid='+psid;
    
    this.Provider.getMamenSwiperData(projectStageListUrl).subscribe(res=>{
      if(res.code==200) {
        this.deliveryModelData = res.data;
      }else if(res.code == 207) {
        window.localStorage.removeItem('openId');
      }else{
        alert('请求出错:'+res.msg);
      }
    },error=>{
      console.log('erros===',error);
    })
  }

  /*付款申请信息提交*/
  onDeliveryModelClick() {
    let pid = this.navParams.get('pid');
    let psid = this.navParams.get('psid');
    let deliveryModelData = this.deliveryModelData;
    // let projectStageDetailUrl = 'http://mamon.yemindream.com/mamon/adviser/applyMoney';
    const openId = window.sessionStorage.getItem('openId')|| this.getUrlParam('openId');
    let projectStageDetailUrl = applyMoneyUrl + '?openId=' + openId + '&pid='+pid + '&psid=' + psid +
                              '&payerBank='+deliveryModelData['bankAccount']+
                              '&payerAccount='+deliveryModelData['account']+
                              '&logisticsCompany='+deliveryModelData['logisticsCompany']+
                              '&logisticsNumber='+deliveryModelData['logisticsNumber'];
    
    this.Provider.getMamenSwiperData(projectStageDetailUrl).subscribe(res=>{
      if(res.code==200) {
        alert('操作功能！');
        this.navCtrl.pop();
      }else if(res.code == 207) {
        window.localStorage.removeItem('openId');
      }else{
        alert('请求出错:'+res.msg);
      }
    },error=>{
      console.log('erros===',error);
    })
  }

  /*列表编辑*/
  goFormEditPage(field, value, type) {
    if(type == 'selectPaymentBank') {
      this.navCtrl.push(ProjectCollectBankPage,{callback:this.setValue,field:field,data:this.deliveryModelData});
    }else{
      this.navCtrl.push(FormEditPage,{callback:this.setValue,value:value,field:field,type:type});
    }
    
  }

  /*设置值（回调函数）*/
  setValue = (field,value)=> {
    if(field == 'taxNumber' && value){
      this.deliveryModelData['bankAccount'] =value.bankAccount;
      this.deliveryModelData['account'] =value.account;
    }else{
      this.deliveryModelData[field] = value;
    }
  }


}
