import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ReleaseThreePage } from '../release-three/release-three';
import { HttpClient, HttpParams } from '@angular/common/http';
import { hideAttentionMenuUrl, getAttentionUserInfo } from '../../providers/requestUrl'
declare var wx: any;

/**
 * Generated class for the AptitudePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aptitude',
  templateUrl: 'aptitude.html',
})
export class AptitudePage {
  public junior = false;
  public middle = false;
  public senior = false;
  public expert = false;
  public field: any;
  public fieldType: any;
  public fieldValue = {
    id: '',
    key: ''
  };
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
  }
  ionViewDidEnter() {
    this.isAttention();
  }
  ionViewDidLoad() {
    this.field = this.navParams.get('field');
    this.fieldValue = this.navParams.get('value');
    this.fieldType = this.navParams.get('type');
    console.log(this.field, this.fieldValue, '==============')
  }
  Junior(value, key) {
    this.junior = true;
    this.middle = false;
    this.senior = false;
    this.expert = false;
    this.fieldValue = key;
  };
  Middle(value, key) {
    this.junior = false;
    this.middle = true;
    this.senior = false;
    this.expert = false;
    this.fieldValue = key;
  };
  Senior(value, key) {
    this.junior = false;
    this.middle = false;
    this.senior = true;
    this.expert = false;
    this.fieldValue = key;
  };
  Expert(value, key) {
    this.junior = false;
    this.middle = false;
    this.senior = false;
    this.expert = true;
    this.fieldValue = key;
  }
  onValueSubmit() {
    let callback = this.navParams.get('callback');
    callback(this.field, this.fieldValue);
    console.log(this.fieldValue);
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
