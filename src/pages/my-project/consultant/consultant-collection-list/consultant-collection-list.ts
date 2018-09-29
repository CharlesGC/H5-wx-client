import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';

import { ConsultantCollectionBorswerPage } from '../consultant-collection-borswer/consultant-collection-borswer';
import { applyMoneyListUrl } from '../../../../providers/requestUrl';

import { ConsultantProjectBrowserPage } from '../consultant-project-browser/consultant-project-browser'
import { ConsultantStageListPage } from '../consultant-stage-list/consultant-stage-list';
import { ConsultantDocumentListPage } from '../consultant-document-list/consultant-document-list';
import { ConsultantProgramListPage } from '../consultant-program-list/consultant-program-list';

/**
 * Generated class for the ConsultantCollectionListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-consultant-collection-list',
  templateUrl: 'consultant-collection-list.html',
})
export class ConsultantCollectionListPage {
  public isShowNavMenu = false;
  public showNavMenuName = '';
  public projectInvoiceListData = [];
  public projectDetails = {}
  public isCont = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private Provider: MamenDataProvider) {
  }

  ionViewDidLoad() {
    let pid = this.navParams.get('pid');
    let status = this.navParams.get('status');
    this.getProjectInvoiceListDataData(pid, status);
    console.log('ionViewDidLoad ProjectInvoiceListPage');
  }

  ionViewDidEnter() {
    let pid = this.navParams.get('pid');
    let status = this.navParams.get('status');
    this.getProjectInvoiceListDataData(pid, status);
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
      // this.projectDetails['appStatus'] != 0 && this.projectDetails['appStatus'] != 1 &&
      //   this.projectDetails['appStatus'] != 2 && this.projectDetails['appStatus'] != 3 &&
        this.navCtrl.push(ConsultantProgramListPage, { pid: this.projectDetails['pid'], status: status || '', data: this.projectDetails });
    } else if (type == 3) {
      // this.projectDetails['appStatus'] != 6 && this.projectDetails['appStatus'] != 4 &&
      //   this.projectDetails['appStatus'] != 0 && this.projectDetails['appStatus'] != 1 &&
      //   this.projectDetails['appStatus'] != 2 && this.projectDetails['appStatus'] != 3 &&
        this.navCtrl.push(ConsultantStageListPage, {
          pid: this.projectDetails['pid'], status: status,
          projectType: this.projectDetails['appStatus'], programPrice: this.projectDetails['finalPrice'], data: this.projectDetails
        });
    } else if (type == 4) {
      // this.projectDetails['appStatus'] != 0 && this.projectDetails['appStatus'] != 1 &&
      //   this.projectDetails['appStatus'] != 2 && this.projectDetails['appStatus'] != 3 &&
        this.navCtrl.push(ConsultantDocumentListPage, { pid: this.projectDetails['pid'], status: status, data: this.projectDetails });
    } else if (type == 5) {
      // this.projectDetails['appStatus'] !=6&&this.projectDetails['appStatus'] !=4&&
      // this.projectDetails['appStatus'] !=0 &&this.projectDetails['appStatus'] !=1 &&
      // this.projectDetails['appStatus'] !=2 &&this.projectDetails['appStatus'] !=3 && 
      // this.navCtrl.push(ConsultantCollectionListPage,{pid:this.projectDetails['pid'],status:status,data:this.projectDetails});
      let pid = this.navParams.get('pid');
      let status = this.navParams.get('status');
      this.getProjectInvoiceListDataData(pid, status);
    }
  }

  /*跳转到发票详情页面*/
  goInvoiceBrowser(data) {
    this.navCtrl.push(ConsultantCollectionBorswerPage, { id: data.mpid })
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

  /*项目发票列表数据请求*/
  getProjectInvoiceListDataData(pid, status) {
    // let projectPaymentUrl = 'http://mamon.yemindream.com/mamon/adviser/applyMoneyList';
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    let projectPaymentUrl = applyMoneyListUrl + '?openId=' + openId + '&pid=' + pid;
    // if(status !== ''){
    //   projectPaymentUrl = projectPaymentUrl + '&type='+status;
    // }
    this.Provider.getMamenSwiperData(projectPaymentUrl).subscribe(res => {
      if (res.code == 200) {
        this.projectInvoiceListData = res.data || []
        this.isCont = this.projectInvoiceListData.length<1 ? true : false;
      } else if (res.code == 207) {
        window.localStorage.removeItem('openId');
      } else {
        alert('请求出错:' + res.msg);
      }
    }, error => {
      console.log('erros===', error);
    })
  }
  // 返回项目列表页
  goback() {
    this.navCtrl.popTo(this.navCtrl.getByIndex(1))
  }
  gotodo() {
    this.navCtrl.pop();
  }
}
