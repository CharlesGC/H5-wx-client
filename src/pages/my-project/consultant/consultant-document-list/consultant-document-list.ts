import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';

import { ConsultantDocumentBrowserPage } from '../consultant-document-browser/consultant-document-browser';
import { ConsultantInteractionSubmitPage } from '../consultant-interaction-submit/consultant-interaction-submit';
import { getAdviserDocumentListUrl } from '../../../../providers/requestUrl';

import { ConsultantProjectBrowserPage } from '../consultant-project-browser/consultant-project-browser'
import { ConsultantStageListPage } from '../consultant-stage-list/consultant-stage-list';
import { ConsultantCollectionListPage } from '../consultant-collection-list/consultant-collection-list';
import { ConsultantProgramListPage } from '../consultant-program-list/consultant-program-list';


/**
 * Generated class for the ConsultantDocumentListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-consultant-document-list',
  templateUrl: 'consultant-document-list.html',
})
export class ConsultantDocumentListPage {
  public isShowNavMenu = false;
  public showNavMenuName = '';
  public documentListData = [];
  public projectDetails = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, private Provider: MamenDataProvider) {
  }

  ionViewDidLoad() {
    let pid = this.navParams.get('pid');
    let status = this.navParams.get('status');
    this.getProjectDocumentListDataData(pid, status);
    console.log('ionViewDidLoad ProjectDecumentListPage');
  }

  ionViewDidEnter() {
    let pid = this.navParams.get('pid');
    let status = this.navParams.get('status');
    this.getProjectDocumentListDataData(pid, status);
    this.projectDetails = this.navParams.get('data') || {};
  }

  /*点击展开、收起*/
  onNavMenuClick(value) {
    this.isShowNavMenu = value;
  }

  /*点击菜单触发*/
  onNavMenuItemClick(type, typeName, status) {
    this.showNavMenuName = typeName;
    this.isShowNavMenu = false;
    //TODO 提示语
    if (type == 1) {
      this.navCtrl.push(ConsultantProjectBrowserPage, { data: this.projectDetails, pid: this.projectDetails['pid'], status: status || '' });
    } else if (type == 2) {
        this.projectDetails['appStatus'] != 0 && this.projectDetails['appStatus'] != 1 &&
        this.projectDetails['appStatus'] != 2 && this.projectDetails['appStatus'] != 3 &&
        this.navCtrl.push(ConsultantProgramListPage, { pid: this.projectDetails['pid'], status: status || '', data: this.projectDetails });
    } else if (type == 3) {
        this.projectDetails['appStatus'] != 6 && this.projectDetails['appStatus'] != 4 &&
        this.projectDetails['appStatus'] != 0 && this.projectDetails['appStatus'] != 1 &&
        this.projectDetails['appStatus'] != 2 && this.projectDetails['appStatus'] != 3 &&
        this.navCtrl.push(ConsultantStageListPage, {
          pid: this.projectDetails['pid'], status: status,
          projectType: this.projectDetails['appStatus'], programPrice: this.projectDetails['finalPrice'], data: this.projectDetails
        });
    } else if (type == 4) {
      // this.projectDetails['appStatus'] !=0 &&this.projectDetails['appStatus'] !=1 &&
      // this.projectDetails['appStatus'] !=2 &&this.projectDetails['appStatus'] !=3 && 
      // this.navCtrl.push(ConsultantDocumentListPage,{pid:this.projectDetails['pid'],status:status,data:this.projectDetails});
      let pid = this.navParams.get('pid');
      let status = this.navParams.get('status');
      this.getProjectDocumentListDataData(pid, status);
    } else if (type == 5) {
        this.projectDetails['appStatus'] != 6 && this.projectDetails['appStatus'] != 4 &&
        this.projectDetails['appStatus'] != 0 && this.projectDetails['appStatus'] != 1 &&
        this.projectDetails['appStatus'] != 2 && this.projectDetails['appStatus'] != 3 &&
        this.navCtrl.push(ConsultantCollectionListPage, { pid: this.projectDetails['pid'], status: status, data: this.projectDetails });
    }
  }

  /*跳转到文档详情页面*/
  goDocumentBrowser(data) {
    this.navCtrl.push(ConsultantDocumentBrowserPage, { id: data.id });
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

  /*项目文档列表数据请求*/
  getProjectDocumentListDataData(pid, status) {
    // let projectStageListUrl = 'http://mamon.yemindream.com/mamon/adviser/getDocumentList';
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    let projectStageListUrl = getAdviserDocumentListUrl + '?openId=' + openId + '&pid=' + pid;
    if (status !== '') {
      projectStageListUrl = projectStageListUrl + '&type=' + status;
    }
    console.log(projectStageListUrl, status != '', status, '有值');
    this.Provider.getMamenSwiperData(projectStageListUrl).subscribe(res => {
      if (res.code == 200) {
        this.documentListData = res.data;
        //console.log(this.documentListData,'这里的值')
      } else if (res.code == 207) {
        window.localStorage.removeItem('openId');
      } else {
        alert('请求出错:' + res.msg);
      }
    }, error => {
      console.log('erros===', error);
    })
  }

  /*新增附件*/
  onAddDocumentClick() {
    this.navCtrl.push(ConsultantInteractionSubmitPage, { type: 1, pid: this.projectDetails['pid'] });
  }

}
