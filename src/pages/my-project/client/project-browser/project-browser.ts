import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';

import { ProjectConsultantListPage } from '../project-consultant-list/project-consultant-list'
import { ProjectProgramListPage } from '../project-program-list/project-program-list';
import { ProjectStageListPage } from '../project-stage-list/project-stage-list';
import { ProjectDecumentListPage } from '../project-decument-list/project-decument-list';
import { ProjectPaymentListPage } from '../project-payment-list/project-payment-list';
import { ProjectInvoiceListPage } from '../project-invoice-list/project-invoice-list';
import { ProjectEditStep1Page } from '../project-edit-step1/project-edit-step1';
import { ApplicationProjectPage } from '../../application-project/application-project';
import { PorjectEvalutionPage } from '../../porject-evalution/porject-evalution';
import { getProjectDetailUrl, releaseProjectUrl, getProjectSignUpAdviserCountUrl,
  getProjectProgramCountUrl,getProjectStageCountUrl,getProjectDocumentCountUrl,hideAttentionMenuUrl,getAttentionUserInfo} from '../../../../providers/requestUrl';
  import { HttpClient, HttpParams } from '@angular/common/http';

/**
 * Generated class for the ProjectBrowserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var wx: any;
@IonicPage()
@Component({
  selector: 'page-project-browser',
  templateUrl: 'project-browser.html',
})
export class ProjectBrowserPage {
  public isShowNavMenu = false;
  public isAllTypes =false
  public showNavMenuName = '';
  public showNavMenuNumber = 0;
  public projectDetails = {}
  public projectSignCount = {};
  public projectProgramCount = {};
  public projectStageCount = {};
  public projectDocumentCount = {};
  public menu = [
    {name:'navMenu1',isShow:true}
  ];
  public isApply = false;
  public isSuccess = false
  public isFailed = false
  public isConsultantListShow = false;
  public attstate:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private Provider:MamenDataProvider,private http:HttpClient,public sanitizer:DomSanitizer) {
  }
  /*转换html标签处理*/
  assembleHTML(strHTML:any){
    return this.sanitizer.bypassSecurityTrustHtml(strHTML);
  }
  ionViewDidLoad() {
    this.isApply = this.navParams.get('isApply');
    console.log(this.navParams.get('data'),'ionViewDidLoad ProjectBrowserPage');
    let data = this.navParams.get('data')
    this.getProjectListData(data.pid);
    this.getProjectSignCount(data.pid);
    // this.getProjectProgramCount(data.pid);
    // this.getProjectStageCount(data.pid);
    // this.getProjectDocumentCount(data.pid);
  }

  //
  ionViewDidEnter() {
    this.isApply = this.navParams.get('isApply');
    console.log(this.navParams.get('data'),'ionViewDidLoad ProjectBrowserPage');
    let data = this.navParams.get('data')
    this.getProjectListData(data.pid);
    this.getProjectSignCount(data.pid);
    const openId = window.sessionStorage.getItem('openId');
    let getAttentionUserInfoUrl = getAttentionUserInfo + '?openId=' + openId;
    //console.log(getAttentionUserInfo)
    this.http.get(getAttentionUserInfoUrl).subscribe(res => {
      this.attstate = res['data'].subscribe;
      //console.log(res,'ccc')
    });
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
          jsApiList: ['showOptionMenu']
        });
        wx.ready(function () {
          wx.showOptionMenu();
        });
      }
    })
  }
  /*点击展开、收起*/
  onNavMenuClick(value) {
    console.log(value,'value');
    this.isShowNavMenu = value;
  }
  sureSuccess(){
    this.isSuccess =!this.isSuccess
    // this.navCtrl.pop()
    this.navCtrl.popTo(this.navCtrl.getByIndex(1))
  }
  sureFailed(){
    this.isFailed = !this.isFailed
    return
  }
  sureAllTypes(){
    this.isAllTypes = !this.isAllTypes
    return
  }
  /*点击菜单触发*/
  onNavMenuItemClick(type,typeName,status) {
    this.showNavMenuName = typeName;
    this.isShowNavMenu = false;
    // this.showNavMenuNumber = 2
    if(type == 1){
      this.navCtrl.push(ProjectConsultantListPage,{pid:this.projectDetails['pid'],status:status,data:this.projectDetails});
    }else if(type == 2){
      this.navCtrl.push(ProjectProgramListPage,{pid:this.projectDetails['pid'],status:status,data:this.projectDetails});
    }else if(type == 3) {
      this.navCtrl.push(ProjectStageListPage,{pid:this.projectDetails['pid'],status:status,type:this.projectDetails['status'],data:this.projectDetails});
    }else if(type == 4) {
      this.navCtrl.push(ProjectDecumentListPage,{pid:this.projectDetails['pid'],status:status,data:this.projectDetails});
    }else if(type == 5) {
      this.navCtrl.push(ProjectPaymentListPage,{pid:this.projectDetails['pid'],status:status,data:this.projectDetails});
    }else if(type == 6) {
      this.navCtrl.push(ProjectInvoiceListPage,{pid:this.projectDetails['pid'],status:status,data:this.projectDetails});
    }
  }
  /*顾问状态展开*/
  onConsultantToggle(){
    this.isConsultantListShow = !this.isConsultantListShow;
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

  /*项目详情数据请求*/
  getProjectListData(pid) {
    // let projectDetailsUrl = 'http://mamon.yemindream.com/mamon/customer/getProjectDetail';
    const openId = window.sessionStorage.getItem('openId')|| this.getUrlParam('openId')
    let projectDetailsUrl = getProjectDetailUrl + '?openId=' + openId + '&pid='+pid;
    this.Provider.getMamenSwiperData(projectDetailsUrl).subscribe(res=>{
      if(res.code==200) {
        console.log(res,'--------');
        this.projectDetails = res.data;
        console.log(this.projectDetails,'123456')
      }else if(res.code == 207) {
        window.localStorage.removeItem('openId');
      }else{
        //alert('请求出错:'+res.msg);
      }
    },error=>{
      console.log('erros===',error);
    })
  }

  /*项目申请发布请求*/
  onProjectReleaseSubmit(pid) {
    // let releaseProjectUrl = 'http://mamon.yemindream.com/mamon/customer/releaseProject';
    const openId = window.sessionStorage.getItem('openId')|| this.getUrlParam('openId');
    let creleaseProjectUrl = releaseProjectUrl + '?openId=' + openId + '&pid='+pid;

    /** 第一步校验 */
    if(!this.projectDetails['companyName'] || !this.projectDetails['principalName'] || !this.projectDetails['principalPhone'] || !this.projectDetails['principalEmail']){
      this.isAllTypes = true
      return
    }

    /** 第二步校验 */
    if(!this.projectDetails['projectName'] || !this.projectDetails['description']){
      this.isAllTypes = true
      return
    }

    /** 第三步校验 */
    if((!this.projectDetails['startTimeType'] && this.projectDetails['startTimeType'] != 0) || (!this.projectDetails['deliverMethod'] && this.projectDetails['deliverMethod'] != 0) || (!this.projectDetails['province']) || (!this.projectDetails['budgetType'] && this.projectDetails['budgetType'] != 0)){
      this.isAllTypes = true
      return
    }

    this.Provider.getMamenSwiperData(creleaseProjectUrl).subscribe(res=>{
      if(res.code==200) {
        //alert('发布成功！');
        //this.navCtrl.pop();
        this.isSuccess = true
      }else{
        //alert('请求出错:'+res.msg);
        this.isFailed =true
      }
    },error=>{
      console.log('erros===',error);
    })
  }

   /*项目顾问类型数量请求*/
   getProjectSignCount(pid) {
    // let ProjectSignCountUrl = 'http://mamon.yemindream.com/mamon/customer/getProjectSignUpAdviserCount';
    const openId = window.sessionStorage.getItem('openId')|| this.getUrlParam('openId')
    let projectSignCountUrl = getProjectSignUpAdviserCountUrl + '?openId=' + openId + '&pid='+pid;
    this.Provider.getMamenSwiperData(projectSignCountUrl).subscribe(res=>{
      if(res.code==200) {
       console.log(res,'项目数量');
       this.projectSignCount = res.data || {};
      //  this.showNavMenuNumber = res.data ? res.data.allCount : 0;
      }else if(res.code == 207) {
        window.localStorage.removeItem('openId'); 
      }else{
        //alert('请求出错:'+res.msg);
      }
    },error=>{
      console.log('erros===',error);
    })
  }

  /*项目方案类型数量请求*/
  getProjectProgramCount(pid) {
    // let projectProgramCountUrl = 'http://mamon.yemindream.com/mamon/customer/getProjectProgramCount';
    const openId = window.sessionStorage.getItem('openId')|| this.getUrlParam('openId')
    let projectProgramCountUrl = getProjectProgramCountUrl + '?openId=' + openId + '&pid='+pid;
    this.Provider.getMamenSwiperData(projectProgramCountUrl).subscribe(res=>{
      if(res.code==200) {
       console.log(res,'项目数量');
       this.projectProgramCount = res.data;
      //  this.showNavMenuNumber = res.data ? res.data.allCount : 0;
      }else if(res.code == 207) {
        window.localStorage.removeItem('openId');
      }else{
       // alert('请求出错:'+res.msg);
      }
    },error=>{
      console.log('erros===',error);
    })
  }

  /*项目阶段类型数量请求*/
  getProjectStageCount(pid) {
    // let projectStageCountUrl = 'http://mamon.yemindream.com/mamon/customer/projectStageCount';
    const openId = window.sessionStorage.getItem('openId')|| this.getUrlParam('openId')
    let projectStageCountUrl = getProjectStageCountUrl + '?openId=' + openId + '&pid='+pid;
    this.Provider.getMamenSwiperData(projectStageCountUrl).subscribe(res=>{
      if(res.code==200) {
       console.log(res,'项目数量');
       this.projectStageCount = res.data;
      //  this.showNavMenuNumber = res.data ? res.data.allCount : 0;
      }else if(res.code == 207) {
        window.localStorage.removeItem('openId');
      }else{
        //alert('请求出错:'+res.msg);
      }
    },error=>{
      console.log('erros===',error);
    })
  }

  /*项目文档类型数量请求*/
  getProjectDocumentCount(pid) {
    // let projectStageCountUrl = 'http://mamon.yemindream.com/mamon/customer/projectDocumentCount';
    const openId = window.sessionStorage.getItem('openId')|| this.getUrlParam('openId');
    let projectStageCountUrl = getProjectDocumentCountUrl + '?openId=' + openId + '&pid='+pid;
    this.Provider.getMamenSwiperData(projectStageCountUrl).subscribe(res=>{
      if(res.code==200) {
       console.log(res,'项目数量');
       this.projectDocumentCount = res.data;
      //  this.showNavMenuNumber = res.data ? res.data.allCount : 0;
      }else if(res.code == 207) {
        window.localStorage.removeItem('openId');
      }else{
        //alert('请求出错:'+res.msg);
      }
    },error=>{
      console.log('erros===',error);
    })
  }

  /*申请项目请求*/
  onApplicationProject() {
    this.navCtrl.push(ApplicationProjectPage,{data:this.projectDetails});
  }

  /*项目编辑跳转*/
  onProjectEditStep1() {
    this.navCtrl.push(ProjectEditStep1Page,{projectData:this.projectDetails,isEdit:true});
  }

  /*跳转到项目评价*/
  goEvalutionPage(){
    this.navCtrl.push(PorjectEvalutionPage,{pid:this.projectDetails['pid'],type:'clientEvalution'});
  }

}
