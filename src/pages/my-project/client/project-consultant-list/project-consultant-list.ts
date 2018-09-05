import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';

import { ProjectConsultantBrowserPage } from '../project-consultant-browser/project-consultant-browser';
import { getProjectSignUpAdviserListUrl } from '../../../../providers/requestUrl';

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
  public projectConsultantListData = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,private Provider:MamenDataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectConsultantListPage');
    let pid = this.navParams.get('pid');
    let status = this.navParams.get('status');
    this.getProjectListData(pid,status);
  }

  /*跳转到顾问详情页面*/
  goConsultantBrowserClick(uid) {
    let pid = this.navParams.get('pid');
    this.navCtrl.push(ProjectConsultantBrowserPage,{uid:uid,pid:pid});
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
   getProjectListData(pid,status) {
    // let projectListsDataUrl = 'http://mamon.yemindream.com/mamon/customer/getProjectSignUpAdviserList';
    const openId = window.sessionStorage.getItem('openId')|| this.getUrlParam('openId');
    let projectListsDataUrl = getProjectSignUpAdviserListUrl + '?openId=' + openId + '&pid='+pid;
    if(status != ''){
      projectListsDataUrl = projectListsDataUrl + '&status='+status;
    }
    this.Provider.getMamenSwiperData(projectListsDataUrl).subscribe(res=>{
      if(res.code==200) {
        this.projectConsultantListData = res.data;
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
