import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';

import { FormEditPage } from '../../form-edit/form-edit';
import { addOrEditWorkExpUrl, delWorkExpUrl } from '../../../../providers/requestUrl';

/**
 * Generated class for the ConsultantWorkExpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-consultant-work-exp',
  templateUrl: 'consultant-work-exp.html',
})
export class ConsultantWorkExpPage {
  public companyName = '公司 1'
  public workListData: any;
  public isSubmit = false;
  public isDelete = false;
  public isComplete = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private Provider: MamenDataProvider) {
    this.workListData = {}
  }

  ionViewDidLoad() {
    console.log(this.companyName, 'ionViewDidLoad ConsultantWorkExpPage');
    this.workListData = this.navParams.get('data');
    console.log(this.workListData, 123123);
  }

  /*跳转到数据处理页面*/
  goFormEditPage(field, value, type) {
    this.navCtrl.push(FormEditPage, { callback: this.setValue, value: value, field: field, type: type });
  }

  /*设置值（回调函数）*/
  setValue = (field, value) => {
    this.workListData[field] = value;
    console.log(this.workListData, value, field, 'this.workListData-----')
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

  /*数据新增、编辑请求*/
  onWorkExpSubmit() {
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    let workListData = this.workListData;
    let aweid = workListData.aweid || 0;
    //console.log(workListData.startTime, workListData.endTime, workListData.department)
    // let getWorkExpUrl = 'http://mamon.yemindream.com/mamon/adviser/addOrEditWorkExp';
    var arr = Object.keys(this.workListData);
    if (arr.length < 6) {
      this.isComplete = true;
      return
    }
    let getWorkExpUrl = addOrEditWorkExpUrl + '?openId=' + openId + '&companyName=' + workListData.companyName +
      '&startTime=' + (workListData.startTime || '') +
      '&endTime=' + (workListData.endTime || '') +
      '&department=' + workListData.department +
      '&role=' + workListData.role +
      '&workDescription=' + workListData.workDescription;
    if (aweid) {
      getWorkExpUrl = getWorkExpUrl + '&aweid=' + aweid;
    }
    this.Provider.getMamenSwiperData(getWorkExpUrl).subscribe(res => {
      if (res.code == 200) {
        //alert((aweid ? '修改' : '新增') + '成功');
        this.isSubmit = true;
      } else if (res.code == 207) {
        window.localStorage.removeItem('openId');
      }
    }, error => {
      console.log('erros===', error);
    })
  }
  /*数据删除请求*/
  onWorkExpDel() {
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    let workListData = this.workListData;
    let aweid = workListData.aweid || 0;
    // let getWorkExpDellUrl = 'http://mamon.yemindream.com/mamon/adviser/delWorkExp';

    let getWorkExpDellUrl = delWorkExpUrl + '?openId=' + openId + '&aweid=' + aweid

    this.Provider.getMamenSwiperData(getWorkExpDellUrl).subscribe(res => {
      if (res.code == 200) {
        //alert('删除成功');
        this.isDelete = true
      } else if (res.code == 207) {
        window.localStorage.removeItem('openId');
      }
    }, error => {
      console.log('erros===', error);
    })
  }


}
