import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';
import { ConsultantInteractionSubmitPage } from '../consultant-interaction-submit/consultant-interaction-submit';
import { getAdviserDocumentDetailUrl,delDocumentUrl } from '../../../../providers/requestUrl';

/**
 * Generated class for the ConsultantDocumentBrowserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-consultant-document-browser',
  templateUrl: 'consultant-document-browser.html',
})
export class ConsultantDocumentBrowserPage {

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

   /*项目文档详情数据请求*/
   getConsultantDocumentDetails(id) {
    // let consultantDocumentDetailsUrl = 'http://mamon.yemindream.com/mamon/adviser/getDocumentDetail';
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');;
    let consultantDocumentDetailsUrl = getAdviserDocumentDetailUrl + '?openId=' + openId + '&id='+id;
    this.Provider.getMamenSwiperData(consultantDocumentDetailsUrl).subscribe(res=>{
      if(res.code==200) {
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
  getUrlParam(name) {  
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象  
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数  
    if (r != null) {
        return encodeURI(r[2]);  //返回参数值 
    } else {
        return null; 
    }
 }

  /*编辑操作*/
  onDocumentEditClick() {
    this.navCtrl.push(ConsultantInteractionSubmitPage,{data:this.consultantDocumentDetailData,pid:this.consultantDocumentDetailData['pid'],psid:this.consultantDocumentDetailData['psid']});
  }

  /*删除操作*/
  onDocumentDel() {
    const pdid = this.consultantDocumentDetailData['pdid']
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');;
    let consultantDocumentDetailsUrl = delDocumentUrl + '?openId=' + openId + '&pdid ='+pdid;
    this.Provider.getMamenSwiperData(consultantDocumentDetailsUrl).subscribe(res=>{
      if(res.code==200) {
        alert('操作成功！');
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


}
