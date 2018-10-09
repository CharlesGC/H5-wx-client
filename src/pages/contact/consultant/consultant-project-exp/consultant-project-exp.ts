import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';

import { FormEditPage } from '../../form-edit/form-edit';
import { addOrEditProjectExpUrl, delProjectExpUrl } from '../../../../providers/requestUrl';
/**
 * Generated class for the ConsultantProjectExpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-consultant-project-exp',
  templateUrl: 'consultant-project-exp.html',
})
export class ConsultantProjectExpPage {
  public projecListData: any;
  public isSubmit = false;
  public isDelete = false;
  public isComplete = false;
  public isBigTime =false
  constructor(public navCtrl: NavController, public navParams: NavParams, private Provider: MamenDataProvider) {
    this.projecListData = {};
  }
  sureBack() {
    this.isSubmit = !this.isSubmit;
    this.navCtrl.pop();
  }

  sureDelete() {
    this.isDelete = !this.isDelete;
    this.navCtrl.pop();
  }
  sureComplete() {
    this.isComplete = !this.isComplete
  }
  ionViewDidLoad() {
    this.projecListData = this.navParams.get('data') || {};
    this.projecListData['projectDetails'] = this.projecListData['projectDetails'] ? this.projecListData['projectDetails'].replace(/<br>/g, "\n") : '';
    this.projecListData['responsibility'] = this.projecListData['responsibility'] ? this.projecListData['responsibility'].replace(/<br>/g, "\n") : '';
    console.log('ionViewDidLoad ConsultantProjectExpPage');
  }
  ionViewWillEnter(){
    this.projecListData['projectDetails'] = this.projecListData['projectDetails'] ? this.projecListData['projectDetails'].replace(/<br>/g, "\n") : '';
    this.projecListData['responsibility'] = this.projecListData['responsibility'] ? this.projecListData['responsibility'].replace(/<br>/g, "\n") : '';
  }
  sureBigTime(){
    this.isBigTime = !this.isBigTime
    return
  }
  /*跳转到数据处理页面*/
  goFormEditPage(field, value, type) {
    this.navCtrl.push(FormEditPage, { callback: this.setValue, value: value, field: field, type: type });
  }

  /*设置值（回调函数）*/
  setValue = (field, value) => {
    if(field == 'projectDetails' ||　field == 'responsibility') {
      this.projecListData[field] = value ? value.replace(/<br>/g, "\n") : '';
    }else{
      this.projecListData[field] = value;
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
  /*时间格式转换*/
  getMyDate(date) {
    let myDate = new Date(date);
    let myYear = myDate.getFullYear();
    var myMonth = myDate.getMonth() + 1;
    let newMyMonth = myMonth>=10?myMonth:'0'+myMonth;
    let myDay = myDate.getDate();
    let newMyDay = myDay>=10?myDay:'0'+myDay;
    return myYear + '-' + newMyMonth + '-' + newMyDay;
  }

  /*数据新增、编辑请求*/
  onProjectExpSubmit() {
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    let projecListData = this.projecListData;
    let apeid = projecListData.apeid || 0;
    // let getProjectExpUrl = 'http://mamon.yemindream.com/mamon/adviser/addOrEditProjectExp';
    var arr = Object.keys(this.projecListData);
    if (arr.length < 7) {
      this.isComplete = true;
      return
    }
    if(new Date(projecListData.endTime)< new Date(projecListData.startTime)){
      this.isBigTime = true
      return
    }
    let startTime = this.getMyDate(projecListData.startTime);
    let endTime = this.getMyDate(projecListData.endTime);
    let reg=new RegExp("\n","g");
    let projectDetails = projecListData.projectDetails ? projecListData.projectDetails.replace(reg,"<br>") : ''; 
    let responsibility = projecListData.responsibility ? projecListData.responsibility.replace(reg,"<br>") : ''; 

    let getProjectExpUrl = addOrEditProjectExpUrl + '?openId=' + openId + '&projectName=' + projecListData.projectName +
      '&companyName=' + projecListData.companyName +
      '&startTime=' + startTime +
      '&endTime=' + endTime +
      '&projectDetails=' + projectDetails +
      '&role=' + projecListData.role +
      '&responsibility=' + responsibility;
    if (apeid) {
      getProjectExpUrl = getProjectExpUrl + '&apeid=' + apeid;
    }

    this.Provider.getMamenSwiperData(getProjectExpUrl).subscribe(res => {
      if (res.code == 200) {
        //alert((apeid ? '修改' : '新增') + '成功');
        this.isSubmit = true
      } else if (res.code == 207) {
        window.localStorage.removeItem('openId');
      }
    }, error => {
      console.log('erros===', error);
    })
  }

  /*页面准备离开时触发*/
  ionViewWillLeave(){
    let reg=new RegExp("\n","g");
    this.projecListData.projectDetails = this.projecListData.projectDetails ? this.projecListData.projectDetails.replace(reg,"<br>") : ''; 
    this.projecListData.responsibility = this.projecListData.responsibility ? this.projecListData.responsibility.replace(reg,"<br>") : '';  
  }

  /*数据删除请求*/
  onProjectExpDel() {
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    let projecListData = this.projecListData;
    let apeid = projecListData.apeid || 0;
    // let getProjectExpDellUrl = 'http://mamon.yemindream.com/mamon/adviser/delProjectExp';

    let getProjectExpDellUrl = delProjectExpUrl + '?openId=' + openId + '&apeid=' + apeid

    this.Provider.getMamenSwiperData(getProjectExpDellUrl).subscribe(res => {
      if (res.code == 200) {
        //alert('删除成功');
        this.isDelete = true;
      } else if (res.code == 207) {
        window.localStorage.removeItem('openId');
      }
    }, error => {
      console.log('erros===', error);
    })
  }
}
