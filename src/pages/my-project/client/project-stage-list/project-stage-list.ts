import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';

import { ProjectStageBrowserPage } from '../project-stage-browser/project-stage-browser';
import { ProjectProgramObjectionPage } from '../project-program-objection/project-program-objection';
import { getProjectStageListUrl, getProjectDetailUrl, customerConfirmStagePlanUrl, getProjectSignUpAdviserCountUrl, hideAttentionMenuUrl, getAttentionUserInfo } from '../../../../providers/requestUrl';

import { ProjectBrowserPage } from '../project-browser/project-browser';
import { ProjectProgramListPage } from '../project-program-list/project-program-list';
import { ProjectConsultantListPage } from '../project-consultant-list/project-consultant-list';
import { ProjectDecumentListPage } from '../project-decument-list/project-decument-list';
import { ProjectInvoiceListPage } from '../project-invoice-list/project-invoice-list';
import { ProjectPaymentListPage } from '../project-payment-list/project-payment-list';
import { HttpClient, HttpParams } from '@angular/common/http';
declare var wx: any;
/**
 * Generated class for the ProjectStageListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-project-stage-list',
  templateUrl: 'project-stage-list.html',
})
export class ProjectStageListPage {
  public projectStageListData = [];
  public stageType = -1;
  public isModel = false;
  public showNavMenuName = '';
  public showNavMenuNumber = 0;
  public isShowNavMenu = false;
  public projectDetails = {}
  public projectSignCount = {};
  public isConsultantListShow = false;
  public isTipPrompt = false
  public tiptext: any
  public isFaild: any
  constructor(public navCtrl: NavController, public navParams: NavParams, private Provider: MamenDataProvider, private http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectStageListPage');
    let pid = this.navParams.get('pid');
    let status = this.navParams.get('status');
    this.stageType = this.navParams.get('type');
    console.log(status, 'status');
    this.getProjectStageListData(pid, status);
  }
  ionViewDidEnter() {
    console.log('ionViewDidEnter ProjectStageListPage');
    let pid = this.navParams.get('pid');
    let status = this.navParams.get('status');
    this.stageType = this.navParams.get('type');
    this.getProjectListData(pid);
    this.getProjectStageListData(pid, status);
    this.getProjectSignCount(pid);
    this.projectDetails = this.navParams.get('data') || {};
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
  /*点击展开、收起*/
  onNavMenuClick(value) {
    this.isShowNavMenu = value;
  }
  /*顾问状态展开*/
  onConsultantToggle() {
    this.isConsultantListShow = !this.isConsultantListShow;
  }
  /*点击菜单触发*/
  onNavMenuItemClick(type, typeName, status, number) {
    this.showNavMenuName = typeName;
    this.isShowNavMenu = false;
    if (type == 0) {
      this.navCtrl.push(ProjectBrowserPage, { pid: this.projectDetails['pid'], status: status, data: this.projectDetails });
    } else if (type == 1) {
      this.navCtrl.push(ProjectConsultantListPage, { pid: this.projectDetails['pid'], status: status, data: this.projectDetails });
    } else if (type == 2) {
      this.navCtrl.push(ProjectProgramListPage, { pid: this.projectDetails['pid'], status: status, data: this.projectDetails });
    } else if (type == 3) {
      let pid = this.navParams.get('pid');
      let status = this.navParams.get('status');
      this.stageType = this.navParams.get('type');
      this.getProjectStageListData(pid, status);
    } else if (type == 4) {
      this.navCtrl.push(ProjectDecumentListPage, { pid: this.projectDetails['pid'], status: status, data: this.projectDetails });
    } else if (type == 5) {
      this.navCtrl.push(ProjectPaymentListPage, { pid: this.projectDetails['pid'], status: status, data: this.projectDetails });
    } else if (type == 6) {
      this.navCtrl.push(ProjectInvoiceListPage, { pid: this.projectDetails['pid'], status: status, data: this.projectDetails });
    }
  }

  /*项目顾问类型数量请求*/
  getProjectSignCount(pid) {
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId')
    let projectSignCountUrl = getProjectSignUpAdviserCountUrl + '?openId=' + openId + '&pid=' + pid;
    this.Provider.getMamenSwiperData(projectSignCountUrl).subscribe(res => {
      if (res.code == 200) {
        this.projectSignCount = res.data || {};
      } else {
        alert('请求出错');
      }
    }, error => {
      console.log('erros===', error);
    })
  }

  /*跳转到阶段详情页面*/
  goStageBrowser(data) {
    this.navCtrl.push(ProjectStageBrowserPage, { type: data.customerStatus, id: data.id });
    // if(type == 3){
    //   this.navCtrl.push(ProjectStageBrowserPage,{type:3});
    // }else if(type == 4){
    //   this.navCtrl.push(ProjectStageBrowserPage,{type:4});
    // }else{
    //   this.navCtrl.push(ProjectStageBrowserPage);
    // }

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

  /*项目阶段列表数据请求*/
  getProjectStageListData(pid, status) {
    // let projectStageListUrl = 'http://mamon.yemindream.com/mamon/customer/getProjectStageList';
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    let projectStageListUrl = getProjectStageListUrl + '?openId=' + openId + '&pid=' + pid;
    if (status !== '') {
      projectStageListUrl = projectStageListUrl + '&status=' + status;
    }
    console.log(projectStageListUrl, status != '', status, '有值');
    this.Provider.getMamenSwiperData(projectStageListUrl).subscribe(res => {
      if (res.code == 200) {
        this.projectStageListData = res.data;
        if (!this.projectStageListData || this.projectStageListData.length < 1) {
          this.isModel = true;
        }
      } else if (res.code == 207) {
        window.localStorage.removeItem('openId');
      } else {
        alert('请求出错:' + res.msg);
      }
    }, error => {
      console.log('erros===', error);
    })
  }
  sureTipPrompt() {
    this.isTipPrompt = true
    this.tiptext = '确认阶段吗？确认阶段后，请返回到阶段列表进行付款操作，并添加支付记录。'
    return
  }
  onReturnBack() {
    this.isTipPrompt = !this.isTipPrompt
    return
  }
  /*确认阶段*/
  onAllStageSubmit() {
    if (this.isFaild == true) {
      this.isTipPrompt = !this.isTipPrompt
      return
    }
    let pid = this.navParams.get('pid');
    // let projectStageDetailUrl = 'http://mamon.yemindream.com/mamon/customer/customerConfirmStagePlan';
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    let projectStageDetailUrl = customerConfirmStagePlanUrl + '?openId=' + openId + '&pid=' + pid;
    this.Provider.getMamenSwiperData(projectStageDetailUrl).subscribe(res => {
      if (res.code == 200) {
        //alert('提交成功！');
        this.navCtrl.pop();
      } else {
        this.tiptext = '确认失败，请重新确认！'
        //alert('请求出错:'+res.msg);
        this.isFaild = true
      }
    }, error => {
      console.log('erros===', error);
    })
  }

  /*项目详情数据请求*/
  getProjectListData(pid) {
    // let projectDetailsUrl = 'http://mamon.yemindream.com/mamon/customer/getProjectDetail';
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId')
    let projectDetailsUrl = getProjectDetailUrl + '?openId=' + openId + '&pid=' + pid;
    this.Provider.getMamenSwiperData(projectDetailsUrl).subscribe(res => {
      if (res.code == 200) {
        this.projectDetails = res.data;
        if (this.projectDetails) {
          this.stageType = this.projectDetails['status'];
        }
      } else if (res.code == 207) {
        window.localStorage.removeItem('openId');
      } else {
        //alert('请求出错:'+res.msg);
      }
    }, error => {
      console.log('erros===', error);
    })
  }

  /*提出异议跳转*/
  onCustomerNayStagePlan() {
    let pid = this.navParams.get('pid');
    this.navCtrl.push(ProjectProgramObjectionPage, { type: 'arrStage', pid: pid });
  }

  /*返回项目列表页*/
  goback() {
    let isTabs = this.navParams.get('isTabs');
    if(isTabs){
      this.navCtrl.pop();
      return;
    }
    this.navCtrl.popTo(this.navCtrl.getByIndex(1))
  }
}
