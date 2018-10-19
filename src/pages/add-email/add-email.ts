import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MamenDataProvider } from '../../providers/mamen-data/mamen-data';
import { ContactPage } from '../contact/contact';
import { getAddEmailUrl } from '../../providers/requestUrl';
import { hideAttentionMenuUrl, getAttentionUserInfo } from '../../providers/requestUrl'
import { HttpClient, HttpParams } from '@angular/common/http';
declare var wx: any;
/**
 * 
 * Generated class for the AddEmailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-email',
  templateUrl: 'add-email.html',
})
export class AddEmailPage {
  public isEmail = false;
  public isEmailType = false;
  public promptText = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, private Provider: MamenDataProvider, private http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEmailPage');
  }
  ionViewDidEnter() {
    this.isAttention();
  }
  sureEmailBack() {
    this.isEmail = !this.isEmail
    //this.navCtrl.push(ContactPage);
    this.navCtrl.popToRoot();
  }
  sureEmailType() {
    this.isEmailType = !this.isEmailType
    return
  }

  addEmailSubmit(mail) {
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId')
    // let getPhoneCodeUrl = 'http://mamon.yemindream.com/mamon/user/sendMail'
    var pattern = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/;
    if (pattern.test(mail.value) == false) {
      this.promptText = '请填写正确的邮箱格式';
      this.isEmailType = true
      return
    }

    let getPhoneCodeUrl = getAddEmailUrl + '?openId=' + openId + '&mail=' + mail.value;
    this.Provider.getMamenSwiperData(getPhoneCodeUrl).subscribe(res => {
      if (res.code == 200) {
        // this.navCtrl.push(ChooseIdentityPage);
        // alert('绑定成功！');
        // this.navCtrl.push(ContactPage);
        this.isEmail = true
      }else if(res.code == 209){
        this.promptText = '此邮箱已存在！';
        this.isEmailType = true
        return
      } else {
        this.promptText = '操作错误：'+res.msg;
        this.isEmailType = true
        return
      }
    }, error => {
      console.log('erros===', error);
    })

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
  //隐藏底部分享菜单
  isAttention() {
    // let url = location.href.split('#')[0]; // 当前网页的URL，不包含#及其后面部分
    // let wUrl = hideAttentionMenuUrl + '?url=' + url;
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
          // wx.showOptionMenu();
          wx.hideOptionMenu();
        });
      }
    })
  }
}
