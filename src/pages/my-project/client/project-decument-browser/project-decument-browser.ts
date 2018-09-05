import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';

import { ConsultantInteractionSubmitPage } from '../../consultant/consultant-interaction-submit/consultant-interaction-submit';
import { getDocumentDetailUrl } from '../../../../providers/requestUrl';

/**
 * Generated class for the ProjectDecumentBrowserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-project-decument-browser',
  templateUrl: 'project-decument-browser.html',
})
export class ProjectDecumentBrowserPage {
  public invoiceType:any;
  public consultantDocumentDetailData = {};
  constructor(public navCtrl: NavController, public navParams: NavParams,private Provider:MamenDataProvider) {
    this.invoiceType =0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectInvoiceBrowserPage');
    let id = this.navParams.get('id');
    this.getConsultantDocumentDetails(id);
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
   getConsultantDocumentDetails(id) {
    // let consultantDocumentDetailsUrl = 'http://mamon.yemindream.com/mamon/adviser/getDocumentDetail';
    const openId = window.sessionStorage.getItem('openId')|| this.getUrlParam('openId');
    let consultantDocumentDetailsUrl = getDocumentDetailUrl + '?openId=' + openId + '&id='+id;
    this.Provider.getMamenSwiperData(consultantDocumentDetailsUrl).subscribe(res=>{
      if(res.code==200) {
        console.log(res,'--------');
        this.consultantDocumentDetailData = res.data;
      }else if(res.code == 207) {
        window.localStorage.removeItem('openId');
      }else{
        alert('请求出错:'+res.msg);
      }
    },error=>{
      console.log('erros===',error);
    })
  }

  /*编辑操作*/
  onDocumentEditClick() {
    this.navCtrl.push(ConsultantInteractionSubmitPage,{data:this.consultantDocumentDetailData});
  }

  /*删除操作*/
  onDocumentDel() {

  }

}
