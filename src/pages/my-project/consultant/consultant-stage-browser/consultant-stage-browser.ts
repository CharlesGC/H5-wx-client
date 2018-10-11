import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';

import { ConsultantDeliveryModelPage } from '../consultant-delivery-model/consultant-delivery-model';
import { ProjectPaymentRecordPage } from '../../client/project-payment-record/project-payment-record';
import { ConsultantInteractionSubmitPage } from '../consultant-interaction-submit/consultant-interaction-submit';
import { ConsultantStageEditPage } from '../consultant-stage-edit/consultant-stage-edit';
import { ConsultantDocumentBrowserPage } from '../consultant-document-browser/consultant-document-browser';
import { getAdviserProjectStageDetailUrl, changeStageStatusUrl, hideAttentionMenuUrl, getAttentionUserInfo } from '../../../../providers/requestUrl';
import { HttpClient, HttpParams } from '@angular/common/http';
declare var wx: any;
/**
 * Generated class for the ConsultantStageBrowserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-consultant-stage-browser',
  templateUrl: 'consultant-stage-browser.html',
})
export class ConsultantStageBrowserPage {
  public isStage = false
  public isNoStageBook = false
  public stageType: any;
  public projectStageDetail = {};
  public isdis: any;
  public isSubmitFailed = false
  constructor(public navCtrl: NavController, public navParams: NavParams, private Provider: MamenDataProvider, public sanitizer: DomSanitizer, private http: HttpClient) {
    this.stageType = 0;
  }
  /*转换html标签处理*/
  assembleHTML(strHTML: any) {
    return this.sanitizer.bypassSecurityTrustHtml(strHTML);
  }
  ionViewDidLoad() {
    // this.stageType = this.navParams.get('type') || 0;
    // console.log(this.stageType,'ionViewDidLoad ProjectStageBrowserPage');
    let id = this.navParams.get('id')
    this.getProjectStageDetail(id);
  }

  ionViewDidEnter() {
    let id = this.navParams.get('id')
    this.getProjectStageDetail(id);
    this.isAttention();
  }
  //隐藏底部分享菜单
  isAttention() {
    // let url = location.href.split('#')[0]; // 当前网页的URL，不包含#及其后面部分
    // let data = { url: url };
    this.http.get(hideAttentionMenuUrl).subscribe(res => {
      if (res['code'] == 200) {
        wx.config({
          debug: false,
          appId: res['data'].appid,
          timestamp: res['data'].timestamp,
          nonceStr: res['data'].nonceStr,
          signature: res['data'].signature,
          jsApiList: ['hideOptionMenu']
        });
        wx.ready(function () {
          //wx.showOptionMenu();
          wx.hideOptionMenu();
        });
      }
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

  /*跳转到添加支付记录页面*/
  goPaymentRecord(stageType) {
    let id = this.navParams.get('id')
    if (stageType == 3 || stageType == 8) {
      this.navCtrl.push(ConsultantInteractionSubmitPage, { isAdd: true, pid: this.projectStageDetail['pid'], psid: this.projectStageDetail['psid'] });
    } else if (stageType == 5) {
      this.navCtrl.push(ConsultantDeliveryModelPage, { pid: this.projectStageDetail['pid'], psid: this.projectStageDetail['psid'] });
    } else if (stageType == -1 || stageType == 1) {
      let programPrice = this.navParams.get('programPrice');
      this.navCtrl.push(ConsultantStageEditPage, { isAdd: false, pid: this.projectStageDetail['pid'], programPrice: programPrice, data: this.projectStageDetail });
    }

  }

  /*项目阶段详情数据请求*/
  getProjectStageDetail(id) {
    // let projectStageDetailUrl = 'http://mamon.yemindream.com/mamon/adviser/getProjectStageDetail';
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    let projectStageDetailUrl = getAdviserProjectStageDetailUrl + '?openId=' + openId + '&id=' + id;
    this.Provider.getMamenSwiperData(projectStageDetailUrl).subscribe(res => {
      if (res.code == 200) {
        console.log(res, '--------');
        this.projectStageDetail = res.data || {};
      } else if (res.code == 207) {
        window.localStorage.removeItem('openId');
      } else {
        console.log('请求出错:' + res.msg);
      }
    }, error => {
      console.log('erros===', error);
    })
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
  sureStageBook() {
    this.isNoStageBook = !this.isNoStageBook
    return
  }
  sureStage() {
    if (this.projectStageDetail['document'].length == 0) {
      this.isNoStageBook = true
      return
    }
    this.isStage = true
    return
  }
  returnStage() {
    this.isStage = !this.isStage
    return
  }
  onSubmitFailed() {
    this.isSubmitFailed = !this.isSubmitFailed;
    return
  }
  /*提交阶段请求*/
  onStageSubmit() {
    let psid = this.projectStageDetail['psid'];
    // let projectStageDetailUrl = 'http://mamon.yemindream.com/mamon/adviser/changeStageStatus';
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    let projectStageDetailUrl = changeStageStatusUrl + '?openId=' + openId + '&type=0' + '&psid=' + psid;
    this.Provider.getMamenSwiperData(projectStageDetailUrl).subscribe(res => {
      if (res.code == 200) {
        this.isStage = !this.isStage;
        this.navCtrl.pop();
      } else {
        this.isSubmitFailed = true;
        console.log('请求出错:' + res.msg);
      }
    }, error => {
      console.log('erros===', error);
    })
  }

  /*编辑详情*/
  goDocumentBrowser(id) {
    this.navCtrl.push(ConsultantDocumentBrowserPage, { id: id, adviserStatus: this.projectStageDetail['adviserStatus'] });
  }

}
