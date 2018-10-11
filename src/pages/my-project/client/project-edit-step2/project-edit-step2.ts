import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';

import { ProjectEditStep3Page } from '../project-edit-step3/project-edit-step3';
import { FormEditPage } from '../../../contact/form-edit/form-edit';
import { ProjectListPage } from '../project-list/project-list';
import { savaraftUrl,hideAttentionMenuUrl, getAttentionUserInfo  } from '../../../../providers/requestUrl';
import { SpeedPage } from '../../../speed/speed';
import { ProjectBrowserPage } from '../project-browser/project-browser'
import { HttpClient, HttpParams } from '@angular/common/http';
declare var wx: any;
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
  constructor(public navCtrl: NavController, public navParams: NavParams, private Provider: MamenDataProvider, private http: HttpClient) {
    this.projectData = {};
  }

  ionViewDidLoad() {
    this.projectData = this.navParams.get('projectData');
    this.isEdit = this.navParams.get('isEdit') || false;
    console.log(this.projectData, 'ionViewDidLoad ProjectEditStep2Page');

    this.projectData['description'] = this.projectData['description'] ? this.projectData['description'].replace(/<br>/g, "\n") : '';
    this.projectData['target'] = this.projectData['target'] ? this.projectData['target'].replace(/<br>/g, "\n") : '';
    this.projectData['note'] = this.projectData['note'] ? this.projectData['note'].replace(/<br>/g, "\n") : '';
  }

  ionViewWillEnter() {
    this.projectData['description'] = this.projectData['description'] ? this.projectData['description'].replace(/<br>/g, "\n") : '';
    this.projectData['target'] = this.projectData['target'] ? this.projectData['target'].replace(/<br>/g, "\n") : '';
    this.projectData['note'] = this.projectData['note'] ? this.projectData['note'].replace(/<br>/g, "\n") : '';
  }
  ionViewDidEnter() {
    this.isAttention();
  }

  //隐藏底部分享菜单
  isAttention() {
    // let url = location.href.split('#')[0]; // 当前网页的URL，不包含#及其后面部分
    // let data = { url: url };
    this.http.get(hideAttentionMenuUrl).subscribe(res => {
      if (res['code'] == 200) {
        wx.config({
          debug: false,
          appId: res['data'].appid,
          timestamp: res['data'].timestamp,
          nonceStr: res['data'].nonceStr,
          signature: res['data'].signature,
          jsApiList: ['hideOptionMenu']
        });
        wx.ready(function () {
          //wx.showOptionMenu();
          wx.hideOptionMenu();
        });
      }
    })
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
    if (field == 'description' || field == 'target' || field == 'note') {
      this.projectData[field] = value ? value.replace(/<br>/g, "\n") : '';
    } else {
      this.projectData[field] = value;
    }
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
    return
    // if(this.gotype == 1){
    //   this.navCtrl.push(ProjectBrowserPage);
    //   return
    // }else{
    //   this.navCtrl.push(ProjectListPage);
    //   return
    // }
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
    let reg = new RegExp("\n", "g");
    let description = projectData['description'] ? projectData['description'].replace(reg, "<br>") : '';
    let target = projectData['target'] ? projectData['target'].replace(reg, "<br>") : '';
    let note = projectData['note'] ? projectData['note'].replace(reg, "<br>") : '';

    let projectStageDetailUrl = savaraftUrl + '?openId=' + openId +
      '&cid=' + projectData['cid'] +
      '&principalName=' + (projectData['principalName'] || '') +
      '&principalPosition=' + (projectData['principalPosition'] || '') +
      '&principalPhone=' + (projectData['principalPhone'] || '') +
      '&principalEmail=' + (projectData['principalEmail'] || '') +
      '&projectName=' + (projectData['projectName'] || '') +
      '&description=' + description +
      '&target=' + target +
      '&note=' + note;
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
  /*页面准备离开时触发*/
  ionViewWillLeave() {
    let reg = new RegExp("\n", "g");
    this.projectData['description'] = this.projectData['description'] ? this.projectData['description'].replace(reg, "<br>") : '';
    this.projectData['target'] = this.projectData['target'] ? this.projectData['target'].replace(reg, "<br>") : '';
    this.projectData['note'] = this.projectData['note'] ? this.projectData['note'].replace(reg, "<br>") : '';
  }

}
