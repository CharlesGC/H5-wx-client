import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ReleaseThreePage } from '../release-three/release-three';
import { HttpClient, HttpParams } from '@angular/common/http';
import { hideAttentionMenuUrl, getAttentionUserInfo } from '../../providers/requestUrl'
declare var wx: any;
@IonicPage()
@Component({
  selector: 'page-appoint-date',
  templateUrl: 'appoint-date.html',
})
export class AppointDatePage {
  public isShow = true;
  public field: any;
  // public fieldType:any;
  public fieldValue: any;
  public budgetTrue1 = false;
  public budgetTrue2 = false;
  public budgetTrue3 = false;
  public otherDate = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
  }
  ionViewDidEnter(){
    this.isAttention();
   }
  ionViewDidLoad() {
    this.field = this.navParams.get('field');
    this.fieldValue = this.navParams.get('value');
    console.log(this.field, this.fieldValue, '==============')
  }
  show() {
    this.isShow = !this.isShow;
  }
  onChange(value) {
    console.log(value, '****')
  }
  updateCucumber1(value) {
    this.budgetTrue1 = true;
    this.budgetTrue2 = false;
    this.budgetTrue3 = false;
    this.otherDate = false;
  }
  updateCucumber2(value) {
    this.budgetTrue1 = false;
    this.budgetTrue2 = true;
    this.budgetTrue3 = false;
    this.otherDate = false;
  }
  updateCucumber3(value) {
    this.budgetTrue1 = false;
    this.budgetTrue2 = false;
    this.budgetTrue3 = true;
    this.otherDate = false;
  }
  updateCucumber4(value) {
    this.budgetTrue1 = false;
    this.budgetTrue2 = false;
    this.budgetTrue3 = false;
    this.otherDate = true;
    console.log(value, 'valuevaluevalue');
  }
  // 保存
  onValueSubmit() {
    let callback = this.navParams.get('callback');
    callback(this.field, this.fieldValue);
    this.navCtrl.pop();
  }
  // 返回页面
  gotoreleasePage(data) {
    let callback = this.navParams.get('callback');
    callback(this.field, data);
    this.navCtrl.pop();
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
