import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';

import { ProjectPaymentRecordPage } from '../project-payment-record/project-payment-record';
import { ProjectSubmitInvoicePage } from '../project-submit-invoice/project-submit-invoice';
import { ProjectProgramObjectionPage } from '../project-program-objection/project-program-objection';
import { getProjectStageDetailUrl, confirmStageUrl } from '../../../../providers/requestUrl';
import { ProjectDecumentBrowserPage } from '../project-decument-browser/project-decument-browser';

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
  public isTipsPrompt =false
  public tipstext : any 
  public isFailed : any
  public tiptext: any
  public isdisabled: any
  public stageType: any;
  public projectStageDetail = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, private Provider: MamenDataProvider,public sanitizer:DomSanitizer) {
    this.stageType = 0;
  }
  /*转换html标签处理*/
  assembleHTML(strHTML:any){
    return this.sanitizer.bypassSecurityTrustHtml(strHTML);
  }
  ionViewDidLoad() {
    this.stageType = this.navParams.get('type') || 0;
    console.log(this.stageType, 'ionViewDidLoad ProjectStageBrowserPage');
    let id = this.navParams.get('id')
    this.getProjectStageDetail(id);
  }

  ionViewDidEnter() {
    let id = this.navParams.get('id')
    this.getProjectStageDetail(id);
  }

  /*跳转到添加支付记录页面*/
  goPaymentRecord(stageType) {
    let id = this.navParams.get('id')
    if (stageType == 2) {
      this.navCtrl.push(ProjectPaymentRecordPage, { id: id, cid: this.projectStageDetail['cid'] ,data:this.projectStageDetail});
    } else if (stageType == 6) {
      this.navCtrl.push(ProjectSubmitInvoicePage, { id: id, data: this.projectStageDetail});
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
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    let projectStageDetailUrl = getProjectStageDetailUrl + '?openId=' + openId + '&id=' + psid;
    this.Provider.getMamenSwiperData(projectStageDetailUrl).subscribe(res => {
      if (res.code == 200) {
        console.log(res, '--------');
        this.projectStageDetail = res.data || {};
      } else if (res.code == 207) {
        window.localStorage.removeItem('openId');
      } else {
        alert('请求出错:' + res.msg);
      }
    }, error => {
      console.log('erros===', error);
    })
  }
  sureTipsPrompt(){
    this.isTipsPrompt = true
    this.tipstext = `确认该阶段吗？<br>确认该阶段后，请返回到阶段列表进行付款操作。`
  }
  onReturnBack(){
    this.isTipsPrompt = !this.isTipsPrompt
    return
  }
  /*确认阶段 、提出异议*/
  onAllStageSubmit(psid, type) {
    if(this.isFailed == true){
      this.isTipsPrompt =!this.isTipsPrompt
      return
    }
    // let projectStageDetailUrl = 'http://mamon.yemindream.com/mamon/customer/confirmStage';
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    let projectStageDetailUrl = confirmStageUrl + '?openId=' + openId + '&psid=' + psid + '&status=' + type;
    this.Provider.getMamenSwiperData(projectStageDetailUrl).subscribe(res => {
      if (res.code == 200) {
        this.isTipsPrompt = !this.isTipsPrompt
        this.navCtrl.pop()
      }else {
        this.tipstext = '操作失败，请稍后重试'
        this.isFailed = true
        //alert('请求出错:' + res.msg);
      }
    }, error => {
      console.log('erros===', error);
    })
  }

  /*提出异议跳转*/
  onCustomerNayDocument(psid) {
    this.navCtrl.push(ProjectProgramObjectionPage, { type: 'nayDocument', psid: psid });
  }

  /*查看交付物*/
  goDocumentBrowser(id) {
    this.navCtrl.push(ProjectDecumentBrowserPage, { id: id });
  }
  /* 根据format来判断文件类型 */
  formatTypes(value) {
    if (value.search(/doc/) !== -1 || value.search(/docx/) !== -1) {
      return 'doc';
    } else if (value.search(/ppt/) !== -1 || value.search(/pptx/) !== -1) {
      return 'ppt'
    } else if (value.search(/xls/) !== -1 || value.search(/xlsx/) !== -1) {
      return 'xls'
    } else if (value.search(/jpg/) !== -1 || value.search(/png/) !== -1 || value.search(/jpeg/) !== -1) {
      return 'jpg'
    } else if (value.search(/pdf/) !== -1) {
      return 'pdf'
    }
  }

}
