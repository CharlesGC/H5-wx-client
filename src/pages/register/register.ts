import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MamenDataProvider } from '../../providers/mamen-data/mamen-data';
import { ChooseIdentityPage } from '../choose-identity/choose-identity';
import { HttpClient, HttpParams } from '@angular/common/http';
import { hideAttentionMenuUrl, getAttentionUserInfo } from '../../providers/requestUrl'
declare var wx: any;
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  viewProviders: [MamenDataProvider]
})
export class RegisterPage {
  public phoneCodeText = '获取验证码';
  public isFlag = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, private Provider: MamenDataProvider, private http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
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
  /*用户注册*/
  register(phone, smsCode, uCode, pwd) {
    let registerUrl = 'http://mamon.yemindream.com/mamon/user/addUser?';
    registerUrl = registerUrl + 'phone=' + phone.value + '&smsCode=' + smsCode.value + '&uCode=' + uCode.value + '&pwd=' + pwd.value;
    this.Provider.getIdentityData(registerUrl).subscribe(res => {
      if (res.code == 200) {
        //跳转选择身份页面
        window.localStorage.setItem('token', res.data.token);
        this.goChooseIdentityPage();
      }
    }, error => {
      console.log('erros===', error);
    })
  }

  goChooseIdentityPage() {
    this.navCtrl.push(ChooseIdentityPage);
  }

  /*获取验证码*/
  getVerificationCode(phone) {

    let getPhoneCodeUrl = 'http://mamon.yemindream.com/mamon/user/sendSmsCode'
    if (phone.value.length < 11) {
      alert('手机号格式错误')
      return;
    }
    getPhoneCodeUrl = getPhoneCodeUrl + '?phone=' + phone.value
    this.Provider.getIdentityData(getPhoneCodeUrl).subscribe(res => {
      if (res.code == 200) {
        this.isFlag && this.countdown();
      }
    }, error => {
      console.log('erros===', error);
    })
  }

  /*判断手机号是否重复*/
  onPhoneBlur(event, type) {
    let phoneRepeat = 'http://mamon.yemindream.com/mamon/user/checkUserInfo?'
    if (!event.value) {
      return;
    }
    if (type == 0) {
      if (event.value.length < 11) {
        return;
      }
    }
    phoneRepeat = phoneRepeat + 'type=' + type + '&checkStr=' + event.value;
    this.Provider.getIdentityData(phoneRepeat).subscribe(res => {
      if (res.code == 200) {
        console.log('===');
      }
    }, error => {
      console.log('erros===', error);
    })
  }

  /*倒计时*/
  countdown() {
    this.isFlag = false;
    let count = 60;
    let setTimeInter = setInterval(() => {
      this.phoneCodeText = '重新获取：' + count--;
      if (count < 1) {
        clearInterval(setTimeInter);
        this.isFlag = true;
      }
    }, 1000);
    this.phoneCodeText = '获取验证码';
  }

}
