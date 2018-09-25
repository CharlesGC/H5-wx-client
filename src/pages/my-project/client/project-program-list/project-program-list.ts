import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';

import { ProjectProgramBrowserPage } from '../project-program-browser/project-program-browser';
import { getProjectProgramListUrl } from '../../../../providers/requestUrl';

/**
 * Generated class for the ProjectProgramListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-project-program-list',
  templateUrl: 'project-program-list.html',
})
export class ProjectProgramListPage {
  public projectProgramListData = [];
  public isModel = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,private Provider:MamenDataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectProgramListPage');
    let pid = this.navParams.get('pid');
    let status = this.navParams.get('status');
    this.getProjectProgramListData(pid,status);
  }

  /*跳转到方案详情页面*/
  goProgramBrowser(ppid) {
    this.navCtrl.push(ProjectProgramBrowserPage,{ppid:ppid});
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
  getProjectProgramListData(pid,status) {
    // let projectListsDataUrl = 'http://mamon.yemindream.com/mamon/customer/getProjectProgramList';
    const openId = window.sessionStorage.getItem('openId')|| this.getUrlParam('openId');
    let projectListsDataUrl = getProjectProgramListUrl + '?openId=' + openId + '&pid='+pid;
    if(status != ''){
      projectListsDataUrl = projectListsDataUrl + '&status='+status;
    }
    this.Provider.getMamenSwiperData(projectListsDataUrl).subscribe(res=>{
      if(res.code==200) {
        this.projectProgramListData = res.data;
        if(!this.projectProgramListData || this.projectProgramListData.length<1) {
          this.isModel = true;
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
}
