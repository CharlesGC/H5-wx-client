import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';

import { ProjectEditStep3Page } from '../project-edit-step3/project-edit-step3';
import { FormEditPage } from '../../../contact/form-edit/form-edit';
import { ProjectListPage } from '../project-list/project-list';
import { savaraftUrl } from '../../../../providers/requestUrl';
import { SpeedPage } from '../../../speed/speed';
import { ProjectBrowserPage } from '../project-browser/project-browser'
/**
 * Generated class for the ProjectEditStep2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-project-edit-step2',
  templateUrl: 'project-edit-step2.html',
})
export class ProjectEditStep2Page {
  public projectData: any;
  public isEdit = false;
  public isShow = false;
  public isComplete = false;
  public isSubmit = false
  public isfailed = false
  public gotype = 0
  constructor(public navCtrl: NavController, public navParams: NavParams, private Provider: MamenDataProvider) {
    this.projectData = {};
  }

  ionViewDidLoad() {
    this.projectData = this.navParams.get('projectData');
    this.isEdit = this.navParams.get('isEdit') || false;
    console.log(this.projectData, 'ionViewDidLoad ProjectEditStep2Page');
  }

  /*跳转到下一步页面*/
  goStep3Page() {
    let projectData = this.projectData;
    if (!projectData.projectName || !projectData.description) {
      this.isComplete = true;
    } else {
      this.navCtrl.push(ProjectEditStep3Page, { projectData: this.projectData, isEdit: this.isEdit });
    }

  }
  // 弹框确定
  sureComplete() {
    this.isComplete = !this.isComplete;
  }
  /*列表编辑*/
  goFormEditPage(field, value, type) {
    this.navCtrl.push(FormEditPage, { callback: this.setValue, value: value, field: field, type: type });
  }

  /*设置值（回调函数）*/
  setValue = (field, value) => {
    this.projectData[field] = value;
  }
  /*点击返回快速发布*/
  goSpeedPage() {
    this.isShow = true;
  }
  /*跳转到快速发布页面*/
  goClientProjectSpeedPage() {
    this.navCtrl.push(SpeedPage);
    this.isShow = false;
  }
  /*点击返回*/
  onCompanyDel() {
    this.isShow = false;
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

  sureSubmit() {
    this.isSubmit = !this.isSubmit
    if(this.gotype == 1){
      this.navCtrl.push(ProjectBrowserPage);
    }else{
      this.navCtrl.push(ProjectListPage);
    }
  }
  sureFailed() {
    this.isfailed = !this.isfailed
  }
  /*存为草稿*/
  onDraftSubmit(type) {
    let pid = this.projectData['pid'];
    let projectData = this.projectData;
    // let projectStageDetailUrl = 'http://mamon.yemindream.com/mamon/customer/savaraft';
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    let projectStageDetailUrl = savaraftUrl + '?openId=' + openId +
      '&cid=' + projectData['cid'] +
      '&principalName=' + (projectData['principalName'] || '') +
      '&principalPosition=' + (projectData['principalPosition'] || '') +
      '&principalPhone=' + (projectData['principalPhone'] || '') +
      '&principalEmail=' + (projectData['principalEmail'] || '') +
      '&projectName=' + (projectData['projectName'] || '') +
      '&description=' + projectData['description'] +
      '&target=' + (projectData['target'] || '') +
      '&note=' + (projectData['note'] || '');
    if (pid) {
      projectStageDetailUrl = projectStageDetailUrl + '&pid=' + pid;
    }
    this.Provider.getMamenSwiperData(projectStageDetailUrl).subscribe(res => {
      if (res.code == 200) {
        //alert('操作成功！');
        this.isSubmit = true
        this.gotype = type
      } else {
        this.isfailed = true
      }
    }, error => {
      console.log('erros===', error);
    })
  }

}
