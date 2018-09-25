import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';

import { ProjectDecumentBrowserPage } from '../project-decument-browser/project-decument-browser'
import { getDocumentListUrl } from '../../../../providers/requestUrl';

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
  constructor(public navCtrl: NavController, public navParams: NavParams,private Provider:MamenDataProvider) {
  }

  ionViewDidLoad() {
    let pid = this.navParams.get('pid');
    let status = this.navParams.get('status');
    this.getProjectDocumentListDataData(pid,status);
    console.log('ionViewDidLoad ProjectDecumentListPage');
  }

  /*跳转到文档详情页面*/
  goDocumentBrowser(data) {
    this.navCtrl.push(ProjectDecumentBrowserPage,{type:data.type})
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
    console.log(projectStageListUrl,status != '',status,'有值');
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

}
