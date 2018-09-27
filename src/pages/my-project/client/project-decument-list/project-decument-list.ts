import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';

import { ProjectDecumentBrowserPage } from '../project-decument-browser/project-decument-browser'
import { getDocumentListUrl,getProjectSignUpAdviserCountUrl } from '../../../../providers/requestUrl';

import { ProjectProgramListPage } from '../project-program-list/project-program-list';
import { ProjectStageListPage } from '../project-stage-list/project-stage-list';
import { ProjectPaymentListPage } from '../project-payment-list/project-payment-list';
import { ProjectInvoiceListPage } from '../project-invoice-list/project-invoice-list';
import { ProjectBrowserPage } from '../project-browser/project-browser';
import { ProjectConsultantListPage } from '../project-consultant-list/project-consultant-list';

/**
 * Generated class for the ProjectDecumentListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-project-decument-list',
  templateUrl: 'project-decument-list.html',
})
export class ProjectDecumentListPage {
  public documentListData = [];
  public isModal = false;
  public showNavMenuName = '';
  public showNavMenuNumber = 0;
  public isShowNavMenu = false;
  public projectDetails = {}
  public projectSignCount = {};
  public isConsultantListShow = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,private Provider:MamenDataProvider) {
  }

  ionViewDidLoad() {
    let pid = this.navParams.get('pid');
    let status = this.navParams.get('status');
    this.getProjectDocumentListDataData(pid,status);
    console.log('ionViewDidLoad ProjectDecumentListPage');
  }

  ionViewDidEnter() {
    let pid = this.navParams.get('pid');
    let status = this.navParams.get('status');
    this.getProjectDocumentListDataData(pid,status);
    this.getProjectSignCount(pid);
    this.projectDetails = this.navParams.get('data') || {};
  }

  /*跳转到文档详情页面*/
  goDocumentBrowser(data) {
    this.navCtrl.push(ProjectDecumentBrowserPage,{type:data.type})
  }

  /*点击展开、收起*/
  onNavMenuClick(value) {
    this.isShowNavMenu = value;
  }
  /*顾问状态展开*/
  onConsultantToggle(){
    this.isConsultantListShow = !this.isConsultantListShow;
  }
  /*点击菜单触发*/
  onNavMenuItemClick(type,typeName,status,number) {
    this.showNavMenuName = typeName;
    this.isShowNavMenu = false;
    if(type == 0){
      this.navCtrl.push(ProjectBrowserPage,{pid:this.projectDetails['pid'],status:status,data:this.projectDetails});
    }else if(type == 1){
      this.navCtrl.push(ProjectConsultantListPage,{pid:this.projectDetails['pid'],status:status,data:this.projectDetails});
    }else if(type == 2){
      this.navCtrl.push(ProjectProgramListPage,{pid:this.projectDetails['pid'],status:status,data:this.projectDetails});
    }else if(type == 3) {
      this.navCtrl.push(ProjectStageListPage,{pid:this.projectDetails['pid'],status:status,type:this.projectDetails['status'],data:this.projectDetails});
    }else if(type == 4) {
      let pid = this.navParams.get('pid');
      let status = this.navParams.get('status');
      this.getProjectDocumentListDataData(pid,status);
    }else if(type == 5) {
      this.navCtrl.push(ProjectPaymentListPage,{pid:this.projectDetails['pid'],status:status,data:this.projectDetails});
    }else if(type == 6) {
      this.navCtrl.push(ProjectInvoiceListPage,{pid:this.projectDetails['pid'],status:status,data:this.projectDetails});
    }
  }

  /*项目顾问类型数量请求*/
  getProjectSignCount(pid) {
    const openId = window.sessionStorage.getItem('openId')|| this.getUrlParam('openId')
    let projectSignCountUrl = getProjectSignUpAdviserCountUrl + '?openId=' + openId + '&pid='+pid;
    this.Provider.getMamenSwiperData(projectSignCountUrl).subscribe(res=>{
      if(res.code==200) {
       this.projectSignCount = res.data || {};
      }else{
        alert('请求出错');
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

  /*项目阶段列表数据请求*/
  getProjectDocumentListDataData(pid,status) {
    // let projectStageListUrl = 'http://mamon.yemindream.com/mamon/customer/getDocumentList';
    const openId = window.sessionStorage.getItem('openId')|| this.getUrlParam('openId');
    let projectStageListUrl = getDocumentListUrl + '?openId=' + openId + '&pid='+pid;
    if(status !== ''){
      projectStageListUrl = projectStageListUrl + '&type='+status;
    }
    this.Provider.getMamenSwiperData(projectStageListUrl).subscribe(res=>{
      if(res.code==200) {
        this.documentListData = res.data;
        if(!this.documentListData || this.documentListData.length < 1){
          this.isModal = true;
        }
      }else if(res.code == 207) {
        window.localStorage.removeItem('openId');
      }else{
        alert('请求出错:'+res.msg);
      }
    },error=>{
      console.log('erros===',error);
    })
  }

  /*返回项目列表页*/
  goback() {
    this.navCtrl.popTo(this.navCtrl.getByIndex(1))
  }

}
