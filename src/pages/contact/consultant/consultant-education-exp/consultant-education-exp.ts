import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';
import { FormEditPage } from '../../form-edit/form-edit';
import { addOrEditEducationalExpUrl, delEducationalExpUrl, hideAttentionMenuUrl, getAttentionUserInfo } from '../../../../providers/requestUrl';
import { HttpClient, HttpParams } from '@angular/common/http';
/**
 * Generated class for the ConsultantEducationExpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var wx: any;
@IonicPage()
@Component({
  selector: 'page-consultant-education-exp',
  templateUrl: 'consultant-education-exp.html',
})
export class ConsultantEducationExpPage {
  public educationListData: any;
  public isSubmit = false;
  public isDelete = false;
  public isComplete = false;
  public isBigTime = false
  constructor(public navCtrl: NavController, public navParams: NavParams, private Provider: MamenDataProvider, private http: HttpClient) {
    this.educationListData = {};
  }
  ionViewDidEnter() {
    this.isAttention();
  }
  ionViewDidLoad() {
    this.educationListData = this.navParams.get('data');
    console.log('ionViewDidLoad ConsultantEducationExpPage');
  }

  /*跳转到数据处理页面*/
  goFormEditPage(field, value, type) {
    this.navCtrl.push(FormEditPage, { callback: this.setValue, value: value, field: field, type: type });
  }

  /*设置值（回调函数）*/
  setValue = (field, value) => {
    this.educationListData[field] = value;
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
    this.isComplete = !this.isComplete;
  }
  sureBigTime() {
    this.isBigTime = !this.isBigTime
    return
  }

  /*数据新增、编辑请求*/
  onEducationExpSubmit() {
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    let educationListData = this.educationListData;
    let aeeid = educationListData.aeeid || 0;
    // let getEducationExpUrl = 'http://mamon.yemindream.com/mamon/adviser/addOrEditEducationalExp';
    var arr = Object.keys(this.educationListData);
    if (arr.length < 5) {
      this.isComplete = true;
      return
    }
    if (new Date(educationListData.endTime) < new Date(educationListData.startTime)) {
      this.isBigTime = true
      return
    }
    let getEducationExpUrl = addOrEditEducationalExpUrl + '?openId=' + openId + '&schoolName=' + educationListData.schoolName +
      '&startTime=' + (educationListData.startTime || '') +
      '&endTime=' + (educationListData.endTime || '') +
      '&profession=' + educationListData.profession +
      '&degree=' + educationListData.degree;
    if (aeeid) {
      getEducationExpUrl = getEducationExpUrl + '&aeeid=' + aeeid;
    }

    this.Provider.getMamenSwiperData(getEducationExpUrl).subscribe(res => {
      if (res.code == 200) {
        //alert((aeeid?'修改':'新增') + '成功');
        //this.navCtrl.pop();
        this.isSubmit = true
      } else if (res.code == 207) {
        window.localStorage.removeItem('openId');
      }
    }, error => {
      console.log('erros===', error);
    })
  }

  /*数据删除请求*/
  onEducationExpDel() {
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    let educationListData = this.educationListData;
    let aeeid = educationListData.aeeid || 0;
    // let getEducationExpDellUrl = 'http://mamon.yemindream.com/mamon/adviser/delEducationalExp';

    let getEducationExpDellUrl = delEducationalExpUrl + '?openId=' + openId + '&aeeid=' + aeeid

    this.Provider.getMamenSwiperData(getEducationExpDellUrl).subscribe(res => {
      if (res.code == 200) {
        // alert('删除成功');
        // this.navCtrl.pop();
        this.isDelete = true
      } else if (res.code == 207) {
        window.localStorage.removeItem('openId');
      }
    }, error => {
      console.log('erros===', error);
    })
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
}
