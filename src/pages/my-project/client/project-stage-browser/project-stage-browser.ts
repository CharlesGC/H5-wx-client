import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';

import { ProjectPaymentRecordPage } from '../project-payment-record/project-payment-record';
import { ProjectSubmitInvoicePage } from '../project-submit-invoice/project-submit-invoice';
import { ProjectProgramObjectionPage } from '../project-program-objection/project-program-objection';
import { getProjectStageDetailUrl, confirmStageUrl } from '../../../../providers/requestUrl';

/**
 * Generated class for the ProjectStageBrowserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-project-stage-browser',
  templateUrl: 'project-stage-browser.html',
})
export class ProjectStageBrowserPage {
  public stageType:any;
  public projectStageDetail = {};
  constructor(public navCtrl: NavController, public navParams: NavParams,private Provider:MamenDataProvider) {
    this.stageType = 0;
  }

  ionViewDidLoad() {
    this.stageType = this.navParams.get('type') || 0;
    console.log(this.stageType,'ionViewDidLoad ProjectStageBrowserPage');
    let id = this.navParams.get('id')
    this.getProjectStageDetail(id);
  }

  ionViewDidEnter(){
    let id = this.navParams.get('id')
    this.getProjectStageDetail(id);
  }

  /*跳转到添加支付记录页面*/
  goPaymentRecord(stageType){
    let id = this.navParams.get('id')
    if(stageType == 2){
      this.navCtrl.push(ProjectPaymentRecordPage,{id:id,cid:this.projectStageDetail['cid']});
    }else if(stageType == 6){
      this.navCtrl.push(ProjectSubmitInvoicePage,{id:id});
    }
    
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
  getProjectStageDetail(psid) {
    // let projectStageDetailUrl = 'http://mamon.yemindream.com/mamon/customer/getProjectStageDetail';
    const openId = window.sessionStorage.getItem('openId')|| this.getUrlParam('openId');
    let projectStageDetailUrl = getProjectStageDetailUrl + '?openId=' + openId + '&id='+psid;
    this.Provider.getMamenSwiperData(projectStageDetailUrl).subscribe(res=>{
      if(res.code==200) {
        console.log(res,'--------');
        this.projectStageDetail = res.data || {};
      }else if(res.code == 207) {
        window.localStorage.removeItem('openId');
      }else{
        alert('请求出错:'+res.msg);
      }
    },error=>{
      console.log('erros===',error);
    })
  }

  /*确认阶段 、提出异议*/
  onAllStageSubmit(psid,type) {
    // let projectStageDetailUrl = 'http://mamon.yemindream.com/mamon/customer/confirmStage';
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    let projectStageDetailUrl = confirmStageUrl + '?openId=' + openId +'&psid='+psid + '&status='+type;
    this.Provider.getMamenSwiperData(projectStageDetailUrl).subscribe(res=>{
      if(res.code==200) {
        alert('提交成功！');
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

  /*提出异议跳转*/
  onCustomerNayDocument(psid) {
    this.navCtrl.push(ProjectProgramObjectionPage,{type:'nayDocument',psid:psid});
  }

  
}
