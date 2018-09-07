import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';
import { getAdviserDetailUrl, getApplicationDeatilUrl, changeApplicationStatusUrl } from '../../../../providers/requestUrl';
import { ProjectEditStep1Page } from '../project-edit-step1/project-edit-step1';
/**
 * Generated class for the ProjectConsultantBrowserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-project-consultant-browser',
  templateUrl: 'project-consultant-browser.html',
})
export class ProjectConsultantBrowserPage {
  public Selected:any;
  public consultantDetails={}
  public applicationDeatil={};
  public ishome='';
  constructor(public navCtrl: NavController, public navParams: NavParams,private Provider:MamenDataProvider) {
    this.Selected =0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectConsultantBrowserPage');
    let uid = this.navParams.get('uid');
    let pid = this.navParams.get('pid');
    this.ishome = this.navParams.get('type');
    if(this.ishome == 'homepage') {
      this.getProjectListData(uid)
    }else{
      this.getProjectListData(uid)
      this.getApplicationDeatil(uid,pid);
    }
    
  }

  /*点击选中*/
  onSelectClick(value){
    this.Selected = value;
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
  getProjectListData(uid) {
    // let projectDetailsUrl = 'http://mamon.yemindream.com/mamon/adviser/getAdviserDetail';
    const openId = window.sessionStorage.getItem('openId') ||this.getUrlParam('openId');
    let projectDetailsUrl = getAdviserDetailUrl + '?openId=' + openId + '&uid='+uid;
    this.Provider.getMamenSwiperData(projectDetailsUrl).subscribe(res=>{
      if(res.code==200) {
        console.log(res,'--------');
        this.consultantDetails = res.data;
      }else if(res.code == 207) {
        window.localStorage.removeItem('openId');
      }else{
        alert('请求出错:'+res.msg);
      }
    },error=>{
      console.log('erros===',error);
    })
  }

  /*项目申请数据请求*/
  getApplicationDeatil(uid,pid) {
    // let projectDetailsUrl = 'http://mamon.yemindream.com/mamon/recommend/getApplicationDeatil';
    const openId = window.sessionStorage.getItem('openId') ||this.getUrlParam('openId');
    let projectDetailsUrl = getApplicationDeatilUrl + '?openId=' + openId + '&uid='+uid + '&pid='+pid;
    this.Provider.getMamenSwiperData(projectDetailsUrl).subscribe(res=>{
      if(res.code==200) {
        console.log(res,'--------');
        this.applicationDeatil = res.data;
      }else if(res.code == 207) {
        window.localStorage.removeItem('openId');
      }else{
        alert('请求出错:'+res.msg);
      }
    },error=>{
      console.log('erros===',error);
    })
  }

  /*面试、确认、拒绝、忽略*/
  onInterviewOrGnoreSubmit(type){
    // let projectDetailsUrl = 'http://mamon.yemindream.com/mamon/customer/changeApplicationStatus';
    const openId = window.sessionStorage.getItem('openId') ||this.getUrlParam('openId');
    let projectDetailsUrl = changeApplicationStatusUrl + '?openId=' + openId + '&paid='+this.applicationDeatil['paid'] + '&status='+type;
    this.Provider.getMamenSwiperData(projectDetailsUrl).subscribe(res=>{
      if(res.code==200) {
        alert('操作成功！');
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

  /*向顾问发起项目*/
  goProjectStart(){
    let uid = this.navParams.get('uid');
    this.navCtrl.push(ProjectEditStep1Page,{uid:uid,isEdit:true});
  }

}
