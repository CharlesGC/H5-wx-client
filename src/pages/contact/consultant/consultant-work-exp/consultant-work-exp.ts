import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';//引入
import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';
import { FormEditPage } from '../../form-edit/form-edit';
import { addOrEditWorkExpUrl, delWorkExpUrl, hideAttentionMenuUrl, getAttentionUserInfo } from '../../../../providers/requestUrl';
import { HttpClient, HttpParams } from '@angular/common/http';
declare var wx: any;
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
  public isBigTime = false
  constructor(public navCtrl: NavController, public navParams: NavParams, private Provider: MamenDataProvider, public sanitizer: DomSanitizer,private http: HttpClient) {
    this.workListData = {}
  }

  ionViewDidLoad() {
    console.log(this.companyName, 'ionViewDidLoad ConsultantWorkExpPage');
    this.workListData = this.navParams.get('data');
    this.workListData['workDescription'] = this.workListData['workDescription'] ? this.workListData['workDescription'].replace(/<br>/g, "\n") : '';
  }
  ionViewWillEnter() {
    this.workListData['workDescription'] = this.workListData['workDescription'] ? this.workListData['workDescription'].replace(/<br>/g, "\n") : '';
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
  assembleHTML(strHTML) {
    return this.sanitizer.bypassSecurityTrustHtml(strHTML);
  }

  /*跳转到数据处理页面*/
  goFormEditPage(field, value, type) {
    this.navCtrl.push(FormEditPage, { callback: this.setValue, value: value, field: field, type: type });
  }

  /*设置值（回调函数）*/
  setValue = (field, value) => {
    this.workListData[field] = value;
    this.workListData['workDescription'] = this.workListData['workDescription'] ? this.workListData['workDescription'].replace(/<br>/g, "\n") : '';
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
  sureBigTime() {
    this.isBigTime = !this.isBigTime
    return
  }
  /*时间格式转换*/
  getMyDate(date) {
    let myDate = new Date(date);
    let myYear = myDate.getFullYear();
    var myMonth = myDate.getMonth() + 1;
    let newMyMonth = myMonth >= 10 ? myMonth : '0' + myMonth;
    let myDay = myDate.getDate();
    let newMyDay = myDay >= 10 ? myDay : '0' + myDay;
    return myYear + '-' + newMyMonth + '-' + newMyDay;
  }
  /*数据新增、编辑请求*/
  onWorkExpSubmit() {
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    let workListData = this.workListData; 0
    let aweid = workListData.aweid || 0;
    //console.log(workListData.startTime, workListData.endTime, workListData.department)
    // let getWorkExpUrl = 'http://mamon.yemindream.com/mamon/adviser/addOrEditWorkExp';
    var arr = Object.keys(this.workListData);
    if (arr.length < 6) {
      this.isComplete = true;
      return
    }
    if (new Date(workListData.endTime) < new Date(workListData.startTime)) {
      this.isBigTime = true
      return
    }
    let startTime = this.getMyDate(workListData.startTime);
    let endTime = this.getMyDate(workListData.endTime);
    let reg = new RegExp("\n", "g"); //new RegExp("\r\n","g")
    let workDescription = workListData.workDescription ? workListData.workDescription.replace(reg, "<br>") : '';

    let getWorkExpUrl = addOrEditWorkExpUrl + '?openId=' + openId + '&companyName=' + workListData.companyName +
      '&startTime=' + startTime +
      '&endTime=' + endTime +
      '&department=' + workListData.department +
      '&role=' + workListData.role +
      '&workDescription=' + workDescription;
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
  /*页面准备离开时触发*/
  ionViewWillLeave() {
    let reg = new RegExp("\n", "g");
    this.workListData.workDescription = this.workListData.workDescription ? this.workListData.workDescription.replace(reg, "<br>") : '';
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
