import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';

import { ProjectConsultantBrowserPage } from '../project-consultant-browser/project-consultant-browser';
import { getProjectSignUpAdviserListUrl, getProjectSignUpAdviserCountUrl, hideAttentionMenuUrl, getAttentionUserInfo } from '../../../../providers/requestUrl';

import { ProjectProgramListPage } from '../project-program-list/project-program-list';
import { ProjectStageListPage } from '../project-stage-list/project-stage-list';
import { ProjectDecumentListPage } from '../project-decument-list/project-decument-list';
import { ProjectPaymentListPage } from '../project-payment-list/project-payment-list';
import { ProjectInvoiceListPage } from '../project-invoice-list/project-invoice-list';
import { ProjectBrowserPage } from '../project-browser/project-browser';
import { HttpClient, HttpParams } from '@angular/common/http';
declare var wx: any;
/**
 * Generated class for the ProjectConsultantListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-project-consultant-list',
  templateUrl: 'project-consultant-list.html',
})
export class ProjectConsultantListPage {
  public isEmpty: any;
  public projectConsultantListData = [];
  public typeName = '';
  public showNavMenuName = '';
  public showNavMenuNumber = 0;
  public isShowNavMenu = false;
  public projectDetails = {}
  public projectSignCount = {};
  public isConsultantListShow = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private Provider: MamenDataProvider,
    public sanitizer: DomSanitizer, private http: HttpClient) {
  }

  /*转换html标签处理*/
  assembleHTML(strHTML: any) {
    return this.sanitizer.bypassSecurityTrustHtml(strHTML);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectConsultantListPage111');
    // let pid = this.navParams.get('pid');
    // let status = this.navParams.get('status');
    // this.getProjectListData(pid,status);
    let status = this.navParams.get('status');
    if (status === '') {
      this.typeName = '您还没有顾问列表';
      this.showNavMenuName = '顾问/全部顾问'
    } else if (status == 0) {
      this.typeName = "您还没有推荐顾问!";
      this.showNavMenuName = '顾问/已推荐'
    } else if (status == 1) {
      this.typeName = "您还没有待面试顾问!";
      this.showNavMenuName = '顾问/待面试'
    } else if (status == 6) {
      this.typeName = "您还没有待确认方案!";
      this.showNavMenuName = '顾问/方案待确认'
    } else if (status == 5) {
      this.typeName = "您还没有已聘用顾问!";
      this.showNavMenuName = '顾问/已聘用'
    }
    console.log(status, this.showNavMenuName, '你点击的是：' + this.typeName);
  }

  ionViewDidEnter() {
    let pid = this.navParams.get('pid');
    let status = this.navParams.get('status');
    this.getProjectListData(pid, status);
    this.getProjectSignCount(pid);
    // if(status === '') {
    //   this.typeName = '您还没有顾问列表';
    //   this.showNavMenuName = '顾问/全部顾问'
    // }else if (status == 0) {
    //   this.typeName = "您还没有推荐顾问!";
    //   this.showNavMenuName = '顾问/已推荐'
    // }else if (status == 1) {
    //   this.typeName = "您还没有待面试顾问!";
    //   this.showNavMenuName = '顾问/待面试'
    // }else if (status == 6) {
    //   this.typeName = "您还没有待确认方案!";
    //   this.showNavMenuName = '顾问/方案待确认'
    // }else if (status == 5) {
    //   this.typeName = "您还没有已聘用顾问!";
    //   this.showNavMenuName = '顾问/已聘用'
    // }
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
      this.showNavMenuNumber = number;
      let pid = this.navParams.get('pid');
      this.getProjectListData(pid, status);
    } else if (type == 2) {
      this.navCtrl.push(ProjectProgramListPage, { pid: this.projectDetails['pid'], status: status, data: this.projectDetails });
    } else if (type == 3) {
      this.navCtrl.push(ProjectStageListPage, { pid: this.projectDetails['pid'], status: status, type: this.projectDetails['status'], data: this.projectDetails });
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
        let status = this.navParams.get('status');
        this.projectSignCount = res.data || {};
        this.projectSignCount['allCount'] && this.setProjectCount(this.projectSignCount, status);
      } else {
        alert('请求出错');
      }
    }, error => {
      console.log('erros===', error);
    })
  }

  /*点击时设置状态统计的值*/
  setProjectCount(count, status) {
    if (status === '') {
      this.showNavMenuNumber = count.allCount;
    } else if (status == 0) {
      this.showNavMenuNumber = count.recommendedCount;
    } else if (status == 1) {
      this.showNavMenuNumber = count.interviewCount;
    } else if (status == 6) {
      this.showNavMenuNumber = count.programConfirmedCount;
    } else if (status == 5) {
      this.showNavMenuNumber = count.employCount;
    }
  }

  /*跳转到顾问详情页面*/
  goConsultantBrowserClick(uid) {
    let pid = this.navParams.get('pid');
    this.navCtrl.push(ProjectConsultantBrowserPage, { uid: uid, pid: pid });
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

  /*项目顾问数据请求*/
  getProjectListData(pid, status) {
    // let projectListsDataUrl = 'http://mamon.yemindream.com/mamon/customer/getProjectSignUpAdviserList';
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    let projectListsDataUrl = getProjectSignUpAdviserListUrl + '?openId=' + openId + '&pid=' + pid;
    if (status !== '') {
      projectListsDataUrl = projectListsDataUrl + '&status=' + status;
    }
    this.Provider.getMamenSwiperData(projectListsDataUrl).subscribe(res => {
      if (res.code == 200) {
        this.projectConsultantListData = res.data;
        if (!this.projectConsultantListData || this.projectConsultantListData.length < 1) {
          this.isEmpty = true;
        } else {
          this.isEmpty = false;
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

  /*返回项目列表页*/
  goback() {
    this.navCtrl.popTo(this.navCtrl.getByIndex(1))
  }

}
