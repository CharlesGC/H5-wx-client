import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';
import { ProjectEditStep2Page } from '../project-edit-step2/project-edit-step2';
import { ProjectCompanyListPage } from '../project-company-list/project-company-list';
import { FormEditPage } from '../../../contact/form-edit/form-edit';
import { ProjectListPage } from '../project-list/project-list';
import { savaraftUrl } from '../../../../providers/requestUrl';
import { SpeedPage } from '../../../speed/speed';
import {ProjectBrowserPage } from '../project-browser/project-browser'
/**
 * Generated class for the ProjectEditStep1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-project-edit-step1',
  templateUrl: 'project-edit-step1.html',
})
export class ProjectEditStep1Page {
  public isEdit = false;
  public projectData: any;
  public isShow = false;
  public isComplete = false;
  public isEmailProper = false;
  public isPhoneProper = false;
  public isSubmit = false
  public isfailed =false
  public gotype = 0
  constructor(public navCtrl: NavController, public navParams: NavParams, private Provider: MamenDataProvider) {
    this.projectData = {}
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectEditStep1Page');
    this.projectData = this.navParams.get('projectData') || {};
    //当页面进入初始化的时候
    let elements = document.querySelectorAll(".tabbar");
    if (elements != null) {
      Object.keys(elements).map((key) => {
        elements[key].style.display = 'none';
      });
    }
    this.isEdit = this.navParams.get('isEdit') || false;
    if (this.navParams.get('uid')) {
      this.projectData['uid'] = this.navParams.get('uid');
    }
  }

  ionViewDidEnter() {
    //当页面进入初始化的时候
    let elements = document.querySelectorAll(".tabbar");
    if (elements != null) {
      Object.keys(elements).map((key) => {
        elements[key].style.display = 'none';
      });
    }
  }

  //当退出页面的时候
  // ionViewWillLeave() {
  //   let elements = document.querySelectorAll(".tabbar");
  //   if(elements != null) {
  //       Object.keys(elements).map((key) => {
  //           elements[key].style.display ='flex';
  //       });
  //   }
  // }   

  /*跳转到下一步*/
  goStep2Page() {
    var pattern = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/;
    var regPhone = /^[0-9]{8,11}$/;
    let projectData = this.projectData;
    console.log(projectData.principalPhone);
    if (!projectData.companyName || !projectData.principalName || !projectData.principalPhone || !projectData.principalEmail) {
      this.isComplete = true;
      return;
    } else if (pattern.test(projectData.principalEmail) == false) {
      this.isEmailProper = true;
    } else if (regPhone.test(projectData.principalPhone) == false) {
      this.isPhoneProper = true;
    } else {
      this.navCtrl.push(ProjectEditStep2Page, { projectData: this.projectData, isEdit: this.isEdit });
    }
  }
  // 确定
  sureComplete() {
    this.isComplete = !this.isComplete;
    return
  }
  // 邮箱确定
  sureEmail() {
    this.isEmailProper = !this.isEmailProper;
    return
  }
  // 电话确定
  surePhone() {
    this.isPhoneProper = !this.isPhoneProper;
    return
  }
  sureSubmit(){
    this.isSubmit = !this.isSubmit
    return
    // if(this.gotype == 1){
    //   this.navCtrl.push(ProjectBrowserPage);
    // }else{
    //   this.navCtrl.push(ProjectListPage);
    //   return
    // }
  }
  sureFailed(){
    this.isfailed = !this.isfailed
    return
  }
  /*列表编辑*/
  goFormEditPage(field, value, type) {
    if (type == 'selectList') {
      this.navCtrl.push(ProjectCompanyListPage, { field: field, data: this.projectData, callback: this.setValue })
    } else {
      this.navCtrl.push(FormEditPage, { callback: this.setValue, value: value, field: field, type: type });
    }
  }

  /*设置值（回调函数）*/
  setValue = (field, value) => {
    // console.log(field,value,'------')
    if (field == 'companyName') {
      this.projectData['cid'] = value[0];
      this.projectData['companyName'] = value[1];
    } else {
      this.projectData[field] = value;
    }
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

  /*存为草稿*/
  onDraftSubmit(type) {
    let pid = this.projectData['pid'];
    let projectData = this.projectData;
    //console.log(projectData)
    // let projectStageDetailUrl = 'http://mamon.yemindream.com/mamon/customer/savaraft';
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    let projectStageDetailUrl = savaraftUrl + '?openId=' + openId +
      '&cid=' + (projectData['cid'] || '') +
      '&principalName=' + (projectData['principalName'] || '') +
      '&principalPosition=' +( projectData['principalPosition'] || '') +
      '&principalPhone=' + (projectData['principalPhone'] || '') +
      '&principalEmail=' + (projectData['principalEmail'] || '');
    if (pid) {
      projectStageDetailUrl = projectStageDetailUrl + '&pid=' + pid;
    }
    if (projectData['uid']) {
      //projectStageDetailUrl = projectStageDetailUrl + '&uid=' + projectData['uid'];
    }
    this.Provider.getMamenSwiperData(projectStageDetailUrl).subscribe(res => {
      if (res.code == 200) {
        //alert('操作成功！');
        this.isSubmit = true
        this.gotype =type
      } else {
        //alert('请求出错:' + res.msg);
        this.isfailed = true
      }
    }, error => {
      console.log('erros===', error);
    })
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
  /* 返回到首页 */
  goback() {
    // this.navCtrl.goToRoot(HomePage); 
    this.navCtrl.parent.select(0);
  }
}
