import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { getMessageListUrl,readMessageUrl } from '../../providers/requestUrl';
import { MamenDataProvider } from '../../providers/mamen-data/mamen-data';
import { ProjectBrowserPage } from '../my-project/client/project-browser/project-browser';
import { ConsultantProjectBrowserPage } from '../my-project/consultant/consultant-project-browser/consultant-project-browser';
import { ProjectConsultantListPage } from '../my-project/client/project-consultant-list/project-consultant-list';
import { ConsultantProgramListPage } from '../my-project/consultant/consultant-program-list/consultant-program-list';
import { ProjectProgramBrowserPage } from '../my-project/client/project-program-browser/project-program-browser';
import { ProjectStageListPage } from '../my-project/client/project-stage-list/project-stage-list';
import { ConsultantStageListPage } from '../my-project/consultant/consultant-stage-list/consultant-stage-list';
import { ConsultantStageBrowserPage } from '../my-project/consultant/consultant-stage-browser/consultant-stage-browser';
import { ProjectStageBrowserPage } from '../my-project/client/project-stage-browser/project-stage-browser'; 
import { ProjectInvoiceListPage } from '../my-project/client/project-invoice-list/project-invoice-list';

/**
 * Generated class for the MessageCenterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-message-center',
  templateUrl: 'message-center.html',
})
export class MessageCenterPage {
  public messageCenterList = []
  public pageNum = 0;
  public pageSize = 999;
  constructor(public navCtrl: NavController, public navParams: NavParams,private Provider:MamenDataProvider) {
  }

  ionViewDidLoad() {
    this.getProjectListData();
    console.log('ionViewDidLoad MessageCenterPage');
  }

  ionViewDidEnter(){
    this.getProjectListData();
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
   getProjectListData() {
    // let projectListsDataUrl = 'http://mamon.yemindream.com/mamon/customer/getProjectSignUpAdviserList';
    const openId = window.sessionStorage.getItem('openId')|| this.getUrlParam('openId');
    let projectListsDataUrl = getMessageListUrl + '?openId=' + openId + '&pageNum=' + this.pageNum + '&pageSize='+this.pageSize;
    this.Provider.getMamenSwiperData(projectListsDataUrl).subscribe(res=>{
      if(res.code==200) {
        this.messageCenterList =  res.data &&res.data.list?res.data.list:[];
        this.messageCenterList.map(f=>{
          f.params = f.params ? JSON.parse(f.params) : {};
        })
      }else if(res.code == 207) {
        window.localStorage.removeItem('openId');
      }else{
        alert('请求出错:'+res.msg);
      }
    },error=>{
      console.log('erros===',error);
    })
  }

  /*页面跳转判断*/
  goToBack(data,type) {
    if(!data.backType && data.backType != 0){
      return;
    }
    // let params = data.params ? JSON.parse(data.params) : {}
    let params = data.params;
    //跳转到顾问列表backType:0
    if(data.backType == 0){
      this.navCtrl.push(ProjectBrowserPage,{data:data});
    }
    //跳转到顾问详情backType:1
    else if(data.backType == 1){
        // this.props.history.push(`/project/${data.pid}`);
    }
    //跳转到项目详情backType:2
    else if(data.backType == 2){
        // this.props.history.push(`/project/${data.pid}`);
    }
    //跳转到项目详情backType:3
    else if(data.backType == 3){
      type == 0 ? this.navCtrl.push(ProjectBrowserPage,{data:data}) : this.navCtrl.push(ConsultantProjectBrowserPage,{data:data});
    }
    //跳转到项目详情backType:4
    else if(data.backType == 4){
        // this.props.history.push(`/project/${data.pid}`);
    }
    //跳转到backType:5 (顾问：项目详情页，客户：顾问列表页)
    else if(data.backType == 5){
      type == 0 ? this.navCtrl.push(ProjectConsultantListPage,{pid:data.pid,status:'',data:{pid:data.pid,status:params?params.status:''}}) : this.navCtrl.push(ConsultantProjectBrowserPage,{data:data});
    }
    //跳转到项目详情backType:6
    else if(data.backType == 6){
      if(type == 0){
        this.navCtrl.push(ProjectProgramBrowserPage,{pid:data.pid,ppid:params.ppid})
      }else{
        this.navCtrl.push(ConsultantProgramListPage,{pid:data.pid,data:{pid:data.pid,appStatus:params.appStatus,finalPrice:params.finalPrice}});
      }
    }
    //跳转到阶段列表backType:7
    else if(data.backType == 7){
      if(type == 0){
        this.navCtrl.push(ProjectStageListPage,{pid:data.pid,status:-1,type:params.status,data:{pid:data.pid}})
      }else{
        this.navCtrl.push(ConsultantStageListPage,{
          pid:data.pid,
          status:'',
          projectType:params.appStatus,
          type:params.appStatus,
          programPrice:params.finalPrice,
          data:{pid:data.pid,appStatus:params.appStatus,finalPrice:params.finalPrice}});
      }
    }
    //跳转到阶段详情backType:8
    else if(data.backType == 8){
      if(type == 0){
        this.navCtrl.push(ProjectStageBrowserPage,{id: params.psid});
      }else{
        this.navCtrl.push(ConsultantStageBrowserPage,{id: params.psid, pid: data.pid, programPrice: params.finalPrice});
      }
    }
    //跳转到发票列表backType:10
    else if(data.backType == 10){
      if(type == 0){
        this.navCtrl.push(ProjectInvoiceListPage,{pid:data.pid,status:-1,data:{pid:data.pid}});
      }else{
        // this.navCtrl.push(ConsultantStageBrowserPage,{id: params.psid, pid: data.pid, programPrice: params.finalPrice});
      }
    }
}

  /*跳转到详情页面*/
  goProjectBrowserPage(data) {
    const openId = window.sessionStorage.getItem('openId')|| this.getUrlParam('openId');
    let readMessageChangeUrl = readMessageUrl + '?openId=' + openId + '&mid='+data.mid;
    this.Provider.getMamenSwiperData(readMessageChangeUrl).subscribe(res=>{
      if(res.code==200) {
        this.goToBack(data,data.userType);
        // if(data.userType == 0){
        //   this.navCtrl.push(ProjectBrowserPage,{data:data});
        // }else{
        //   this.navCtrl.push(ConsultantProjectBrowserPage,{data:data});
        // }
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
