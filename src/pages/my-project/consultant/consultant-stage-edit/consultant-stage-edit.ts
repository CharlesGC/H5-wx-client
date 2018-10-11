import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';
import { ConsultantStageListPage } from '../consultant-stage-list/consultant-stage-list';

import { FormEditPage } from '../../../contact/form-edit/form-edit';
import { addOrEditStageUrl, delStageUrl, hideAttentionMenuUrl, getAttentionUserInfo } from '../../../../providers/requestUrl';
import { HttpClient, HttpParams } from '@angular/common/http';
declare var wx: any;
/**
 * Generated class for the ConsultantStageEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-consultant-stage-edit',
  templateUrl: 'consultant-stage-edit.html',
})
export class ConsultantStageEditPage {
  public isAdd = false;
  public stageData = {};
  public programPrice = 0;
  public dateTime: Date;
  public isInteger = false
  public isComplete = false
  public isDateRepeat = false
  public isBigTime = false
  constructor(public navCtrl: NavController, public navParams: NavParams, private Provider: MamenDataProvider, private http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConsultantStageEditPage');
    this.isAdd = this.navParams.get('isAdd') || false;
    this.programPrice = this.navParams.get('programPrice') || 0;
    this.stageData = this.navParams.get('data') || {};

    this.stageData['stageDescription'] = this.stageData['stageDescription'] ? this.stageData['stageDescription'].replace(/<br>/g, "\n") : '';
    this.stageData['deliverable'] = this.stageData['deliverable'] ? this.stageData['deliverable'].replace(/<br>/g, "\n") : '';
    this.stageData['note'] = this.stageData['note'] ? this.stageData['note'].replace(/<br>/g, "\n") : '';
  }

  ionViewWillEnter() {
    this.stageData['stageDescription'] = this.stageData['stageDescription'] ? this.stageData['stageDescription'].replace(/<br>/g, "\n") : '';
    this.stageData['deliverable'] = this.stageData['deliverable'] ? this.stageData['deliverable'].replace(/<br>/g, "\n") : '';
    this.stageData['note'] = this.stageData['note'] ? this.stageData['note'].replace(/<br>/g, "\n") : '';
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
  /*列表编辑*/
  goFormEditPage(field, value, type) {
    this.navCtrl.push(FormEditPage, { callback: this.setValue, value: value, field: field, type: type });
  }

  /*设置值（回调函数）*/
  setValue = (field, value) => {
    if (field == 'percentage') {
      this.stageData['price'] = ((value / 100) || 0) * this.programPrice;
    }
    if (field == 'stageDescription' || field == 'deliverable' || field == 'note') {
      this.stageData[field] = value ? value.replace(/<br>/g, "\n") : '';
    } else {
      this.stageData[field] = value;
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
  sureInteger() {
    this.isInteger = !this.isInteger
    return
  }
  sureComplete() {
    this.isComplete = !this.isComplete
    return
  }
  sureDateRepeat() {
    this.isDateRepeat = !this.isDateRepeat
    return
  }
  sureBigTime() {
    this.isBigTime = !this.isBigTime
    return
  }
  /*新增、编辑请求*/
  onStageSubmitClick(psid) {
    let date = new Date();
    let pid = this.navParams.get('pid');
    let stageData = this.stageData;
    var monthDate = (new Date(stageData['startTime']).getMonth() + 1).toString()
    var lessDate = (new Date(stageData['startTime']).getDate()).toString()
    if (lessDate.length < 2) {
      lessDate = '0' + lessDate
    }
    if (monthDate.length < 2) {
      monthDate = '0' + monthDate
    }
    let startTime = stageData['startTime'] ? (new Date(stageData['startTime']).getFullYear() + '-' + monthDate + '-' + lessDate) : '';
    let endTime = stageData['endTime'] ? (new Date(stageData['endTime']).getFullYear() + '-' + (new Date(stageData['endTime']).getMonth() + 1) + '-' + new Date(stageData['endTime']).getDate()) : '';
    // let projectStageDetailUrl = 'http://mamon.yemindream.com/mamon/adviser/addOrEditStage';

    var arr = Object.keys(stageData);
    if (arr.length < 9) {
      this.isComplete = true;
      return
    }
    var rule = /^([1-9][0-9]{0,1}|100)$/;
    if (rule.test(stageData['percentage']) == false) {
      this.isInteger = true
      return
    }
    if (new Date(endTime) < new Date(startTime)) {
      this.isBigTime = true
      return
    }

    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    let reg = new RegExp("\n", "g");
    let stageDescription = stageData['stageDescription'] ? stageData['stageDescription'].replace(reg, "<br>") : '';
    let deliverable = stageData['deliverable'] ? stageData['deliverable'].replace(reg, "<br>") : '';
    let note = stageData['note'] ? stageData['note'].replace(reg, "<br>") : '';

    let projectStageDetailUrl = addOrEditStageUrl + '?openId=' + openId + '&pid=' + pid +
      '&stageName=' + stageData['stageName'] +
      '&startTime=' + startTime +
      '&endTime=' + endTime +
      '&stageDescription=' + stageDescription +
      '&deliverable=' + deliverable +
      '&note=' + note +
      '&percentage=' + ((stageData['percentage']) || 0) +
      '&price=' + (stageData['price'] || 0) +
      '&paymentMethod=' + (stageData['paymentMethod'] || '');
    if (psid) {
      projectStageDetailUrl = projectStageDetailUrl + '&psid=' + psid;
    }
    this.Provider.getMamenSwiperData(projectStageDetailUrl).subscribe(res => {
      if (res.code == 200) {
        this.navCtrl.pop();
      } else if (res.code == 214) {
        this.isDateRepeat = true
      } else {
        console.log('请求出错:' + res.msg);
      }
    }, error => {
      console.log('erros===', error);
    })
  }

  /*页面准备离开时触发*/
  ionViewWillLeave() {
    let reg = new RegExp("\n", "g");
    this.stageData['stageDescription'] = this.stageData['stageDescription'] ? this.stageData['stageDescription'].replace(reg, "<br>") : '';
    this.stageData['deliverable'] = this.stageData['deliverable'] ? this.stageData['deliverable'].replace(reg, "<br>") : '';
    this.stageData['note'] = this.stageData['note'] ? this.stageData['note'].replace(reg, "<br>") : '';
  }

  /*删除操作请求*/
  onStageDelClick(psid) {
    let stageData = this.stageData;
    // let projectStageDellUrl = 'http://mamon.yemindream.com/mamon/adviser/delStage';
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    let projectStageDellUrl = delStageUrl + '?openId=' + openId + '&psid=' + psid;
    this.Provider.getMamenSwiperData(projectStageDellUrl).subscribe(res => {
      if (res.code == 200) {
        console.log('删除成功！')
        this.navCtrl.push(ConsultantStageListPage, { pid: this.stageData['pid'], status: -1 });
      } else if (res.code == 207) {
        window.localStorage.removeItem('openId');
      } else {
        console.log('请求出错:' + res.msg);
      }
    }, error => {
      console.log('erros===', error);
    })
  }

}
