import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';

import { ProjectStageBrowserPage } from '../project-stage-browser/project-stage-browser';
import { ProjectProgramObjectionPage } from '../project-program-objection/project-program-objection';
import { getProjectStageListUrl, customerConfirmStagePlanUrl } from '../../../../providers/requestUrl';

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
  public projectStageListData =[];
  public stageType = -1;
  constructor(public navCtrl: NavController, public navParams: NavParams,private Provider:MamenDataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectStageListPage');
    let pid = this.navParams.get('pid');
    let status = this.navParams.get('status');
    this.stageType = this.navParams.get('type');
    console.log(status,'status');
    this.getProjectStageListData(pid,status);
  }
  ionViewDidEnter() {
    console.log('ionViewDidEnter ProjectStageListPage');
    let pid = this.navParams.get('pid');
    let status = this.navParams.get('status');
    this.stageType = this.navParams.get('type');
    this.getProjectStageListData(pid,status);
  }

  /*跳转到阶段详情页面*/
  goStageBrowser(data) {
    this.navCtrl.push(ProjectStageBrowserPage,{type:data.customerStatus,id:data.id});
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
  getProjectStageListData(pid,status) {
    // let projectStageListUrl = 'http://mamon.yemindream.com/mamon/customer/getProjectStageList';
    const openId = window.sessionStorage.getItem('openId')|| this.getUrlParam('openId');
    let projectStageListUrl = getProjectStageListUrl + '?openId=' + openId + '&pid='+pid;
    if(status !== ''){
      projectStageListUrl = projectStageListUrl + '&status='+status;
    }
    console.log(projectStageListUrl,status != '',status,'有值');
    this.Provider.getMamenSwiperData(projectStageListUrl).subscribe(res=>{
      if(res.code==200) {
        this.projectStageListData = res.data;
      }else if(res.code == 207) {
        window.localStorage.removeItem('openId');
      }else{
        alert('请求出错:'+res.msg);
      }
    },error=>{
      console.log('erros===',error);
    })
  }

  /*确认阶段*/
  onAllStageSubmit() {
    let pid = this.navParams.get('pid');
    // let projectStageDetailUrl = 'http://mamon.yemindream.com/mamon/customer/customerConfirmStagePlan';
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    let projectStageDetailUrl = customerConfirmStagePlanUrl + '?openId=' + openId +'&pid='+pid;
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
  onCustomerNayStagePlan() {
    let pid = this.navParams.get('pid');
    this.navCtrl.push(ProjectProgramObjectionPage,{type:'arrStage',pid:pid});
  }
}
