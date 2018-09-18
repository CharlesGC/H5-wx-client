import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';

import { ConsultantProgramEditPage } from '../consultant-program-edit/consultant-program-edit';
import { getProjectProgramDetailUrl,addOrEditProgramUrl } from '../../../../providers/requestUrl';
import { ConsultantProjectBrowserPage } from '../consultant-project-browser/consultant-project-browser'
import { ConsultantStageListPage } from '../consultant-stage-list/consultant-stage-list';
import { ConsultantDocumentListPage } from '../consultant-document-list/consultant-document-list';
import { ConsultantCollectionListPage } from '../consultant-collection-list/consultant-collection-list';

/**
 * Generated class for the ConsultantProgramListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-consultant-program-list',
  templateUrl: 'consultant-program-list.html',
})
export class ConsultantProgramListPage {
  public isShowNavMenu = false;
  public showNavMenuName = '';
  public projectProgramDetails = {};
  public projectDetails = {};
  constructor(public navCtrl: NavController, public navParams: NavParams,private Provider:MamenDataProvider) {
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
      // this.projectDetails['appStatus'] !=0 &&this.projectDetails['appStatus'] !=1 &&
      // this.projectDetails['appStatus'] !=2 &&this.projectDetails['appStatus'] !=3 && 
      // this.navCtrl.push(ConsultantProgramListPage,{pid:this.projectDetails['pid'],status:status||''});
      let pid = this.navParams.get('pid');
      this.getProjectListData(pid);
    }else if(type == 3) {
      this.projectDetails['appStatus'] !=6&&this.projectDetails['appStatus'] !=4&&
      this.projectDetails['appStatus'] !=0 &&this.projectDetails['appStatus'] !=1 &&
      this.projectDetails['appStatus'] !=2 &&this.projectDetails['appStatus'] !=3 && 
      this.navCtrl.push(ConsultantStageListPage,{pid:this.projectDetails['pid'],status:status,
      projectType:this.projectDetails['appStatus'],programPrice:this.projectDetails['finalPrice'],data:this.projectDetails});
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectProgramBrowserPage');
    let pid = this.navParams.get('pid');
    this.getProjectListData(pid);
  }
  ionViewDidEnter() {
    let pid = this.navParams.get('pid');
    this.getProjectListData(pid);
    this.projectDetails = this.navParams.get('data') || {};
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

  /*项目方案详情数据请求*/
  getProjectListData(pid) {
    // let projectDetailsUrl = 'http://mamon.yemindream.com/mamon/adviser/getProjectProgramDetail';
    const openId = window.sessionStorage.getItem('openId')|| this.getUrlParam('openId');
    let projectDetailsUrl = getProjectProgramDetailUrl + '?openId=' + openId + '&pid='+pid;
    this.Provider.getMamenSwiperData(projectDetailsUrl).subscribe(res=>{
      if(res.code==200) {
        this.projectProgramDetails = res.data;
      }else{
        alert('请求出错:'+res.msg);
      }
    },error=>{
      console.log('erros===',error);
    })
  }

  /*添加方案请求*/
  onAddProgramClick(data) {
    let pid = this.navParams.get('pid');
    if(data){
      this.navCtrl.push(ConsultantProgramEditPage,{isAdd:true,pid:pid,data:data});
    }else{
      this.navCtrl.push(ConsultantProgramEditPage,{isAdd:false,pid:pid});
    }
     
  }

  /*提交方案*/
  onProgramSubmitted() {
    let pid = this.navParams.get('pid');
    
    // let projectStageDetailUrl = 'http://mamon.yemindream.com/mamon/adviser/addOrEditProgram';
    const openId = window.sessionStorage.getItem('openId')|| this.getUrlParam('openId');
    let projectStageDetailUrl = addOrEditProgramUrl + '?openId=' + openId + '&pid='+pid + '&status=-1&ppid='+ this.projectProgramDetails['ppid'];
    
    this.Provider.getMamenSwiperData(projectStageDetailUrl).subscribe(res=>{
      if(res.code==200) {
        alert('操作成功！');
        this.navCtrl.pop();
      }else{
        alert('请求出错:'+res.msg);
      }
    },error=>{
      console.log('erros===',error);
    })
  }

}
