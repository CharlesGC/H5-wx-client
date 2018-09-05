import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';

import { ConsultantStageBrowserPage } from '../consultant-stage-browser/consultant-stage-browser';
import { ConsultantStageEditPage } from '../consultant-stage-edit/consultant-stage-edit';
import { ConsultantProgramListPage } from '../consultant-program-list/consultant-program-list';
import { ConsultantDocumentListPage } from '../consultant-document-list/consultant-document-list';
import { ConsultantCollectionListPage } from '../consultant-collection-list/consultant-collection-list';
import { ConsultantProjectBrowserPage } from '../consultant-project-browser/consultant-project-browser'
import { getAdviserProjectStageListUrl, changeStageStatusUrl,projectStageProposalListUrl } from '../../../../providers/requestUrl';

/**
 * Generated class for the ConsultantStageListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-consultant-stage-list',
  templateUrl: 'consultant-stage-list.html',
})
export class ConsultantStageListPage {

  public projectStageListData:any;
  public status=-1;
  public projectType=-1;
  public pid = -1;
  public isShowNavMenu = false;
  public showNavMenuName = '';
  public projectDetails={};
  public projectStageProposalList=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,private Provider:MamenDataProvider) {
  }

  ionViewDidLoad() {
    let pid = this.navParams.get('pid');
    let status = this.navParams.get('status');
    this.status = this.navParams.get('type');
    this.projectType = this.navParams.get('projectType');
    this.getProjectStageListData(pid,status);
    console.log(this.projectStageListData,!!this.projectStageListData && this.projectStageListData.length<1,'--------');
  }

  ionViewDidEnter() {
    let pid = this.navParams.get('pid');
    let status = this.navParams.get('status');
    this.getProjectStageListData(pid,status);
    this.getProjectStageProposalList(pid,status);
    this.projectDetails = this.navParams.get('data') || {};
    console.log(this.projectStageListData,!!this.projectStageListData && this.projectStageListData.length<1,'=======');
  }

  /*点击展开、收起*/
  onNavMenuClick(value) {
    this.isShowNavMenu = value;
  }

  /*点击菜单触发*/
  onNavMenuItemClick(type,typeName,status) {
    this.showNavMenuName = typeName;
    this.isShowNavMenu = false;
    //TODO 提示语
    if(type == 1){
      this.navCtrl.push(ConsultantProjectBrowserPage,{data:this.projectDetails,pid:this.projectDetails['pid'],status:status||''});
    }else if(type == 2){
      this.projectDetails['appStatus'] !=0 &&this.projectDetails['appStatus'] !=1 &&
      this.projectDetails['appStatus'] !=2 &&this.projectDetails['appStatus'] !=3 && 
      this.navCtrl.push(ConsultantProgramListPage,{pid:this.projectDetails['pid'],status:status||'',data:this.projectDetails});
    }else if(type == 3) {
      let pid = this.navParams.get('pid');
      let status = this.navParams.get('status');
      this.getProjectStageListData(pid,status);
      this.getProjectStageProposalList(pid,status)
      // this.projectDetails['appStatus'] !=6&&this.projectDetails['appStatus'] !=4&&
      // this.projectDetails['appStatus'] !=0 &&this.projectDetails['appStatus'] !=1 &&
      // this.projectDetails['appStatus'] !=2 &&this.projectDetails['appStatus'] !=3 && 
      // this.navCtrl.push(ConsultantStageListPage,{pid:this.projectDetails['pid'],status:status,
      // projectType:this.projectDetails['appStatus'],programPrice:this.projectDetails['finalPrice']});
    }else if(type == 4) {
      this.projectDetails['appStatus'] !=0 &&this.projectDetails['appStatus'] !=1 &&
      this.projectDetails['appStatus'] !=2 &&this.projectDetails['appStatus'] !=3 && 
      this.navCtrl.push(ConsultantDocumentListPage,{pid:this.projectDetails['pid'],status:status,data:this.projectDetails});
    }else if(type == 5) {
      this.projectDetails['appStatus'] !=6&&this.projectDetails['appStatus'] !=4&&
      this.projectDetails['appStatus'] !=0 &&this.projectDetails['appStatus'] !=1 &&
      this.projectDetails['appStatus'] !=2 &&this.projectDetails['appStatus'] !=3 && 
      this.navCtrl.push(ConsultantCollectionListPage,{pid:this.projectDetails['pid'],status:status,data:this.projectDetails});
    }
  }

  /*跳转到阶段详情页面*/
  goStageBrowser(data) {
    let pid = this.navParams.get('pid');
    let programPrice = this.navParams.get('programPrice');
    this.navCtrl.push(ConsultantStageBrowserPage,{type:data.customerStatus,id:data.id,pid:pid,programPrice:programPrice});
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
    // let projectStageListUrl = 'http://mamon.yemindream.com/mamon/adviser/getProjectStageList';
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    let projectStageListUrl = getAdviserProjectStageListUrl + '?openId=' + openId + '&pid='+pid;
    if(status !== ''){
      projectStageListUrl = projectStageListUrl + '&status='+status;
    }
    // console.log(projectStageListUrl,status != '',status,'有值');
    this.Provider.getMamenSwiperData(projectStageListUrl).subscribe(res=>{
      if(res.code==200) {
        if(res.data && res.data.length >0){
          console.log('有请求值')
          this.projectStageListData = res.data;
        }else {
          console.log('没有请求值')
          this.projectStageListData = [];
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

  /*项目阶段列表数据请求*/
  getProjectStageProposalList(pid,status) {
    // let projectStageListUrl = 'http://mamon.yemindream.com/mamon/adviser/getProjectStageList';
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    let projectStageListUrl = projectStageProposalListUrl + '?openId=' + openId + '&pid='+pid;
    this.Provider.getMamenSwiperData(projectStageListUrl).subscribe(res=>{
      if(res.code==200) {
        if(res.data && res.data.length >0){
          this.projectStageProposalList = res.data;
        }else {
          this.projectStageProposalList = [];
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

  

  /*添加阶段*/
  onAddStageClick() {
    let pid = this.navParams.get('pid')
    let programPrice = this.navParams.get('programPrice');
    this.navCtrl.push(ConsultantStageEditPage,{isAdd:true,pid:pid,programPrice:programPrice});
  }

  /*提交阶段*/
  onAllStageSubmit() {
    let pid = this.navParams.get('pid');
    // let projectStageDetailUrl = 'http://mamon.yemindream.com/mamon/adviser/changeStageStatus';
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    let projectStageDetailUrl = changeStageStatusUrl + '?openId=' + openId + '&type=1' +'&pid='+pid;
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

}
