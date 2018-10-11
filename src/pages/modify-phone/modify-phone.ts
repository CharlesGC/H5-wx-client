import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MamenDataProvider } from '../../providers/mamen-data/mamen-data';
import { ModifyPhone2Page } from '../modify-phone2/modify-phone2'
import { checkCodeUrl, sendSmsCodeUrl } from '../../providers/requestUrl';
import { HttpClient, HttpParams } from '@angular/common/http';
import { hideAttentionMenuUrl, getAttentionUserInfo } from '../../providers/requestUrl'
declare var wx: any;
/**
 * Generated class for the ModifyPhonePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modify-phone',
  templateUrl: 'modify-phone.html',
  viewProviders: [MamenDataProvider]
})
export class ModifyPhonePage {
  public uphone: any;
  public phoneCodeText = '获取验证码';
  public isFlag = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, private Provider: MamenDataProvider, private http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModifyPhonePage');
    this.uphone = this.navParams.get('uphone');
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
  getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象  
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数  
    if (r != null) {
      return encodeURI(r[2]);  //返回参数值 
    } else {
      return null;
    }
  }

  /*跳转页面（下一步），TODO 要放在一个页面进行*/
  goModifyPhone2Page(code) {
    // let checkCodeUrl = 'http://mamon.yemindream.com/mamon/user/checkCode'
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');

    let checkCodeDataUrl = checkCodeUrl + '?openId=' + openId + '&oldPhone=' + this.uphone + '&code=' + code.value;
    this.Provider.getMamenSwiperData(checkCodeDataUrl).subscribe(res => {
      if (res.code == 200) {
        this.navCtrl.push(ModifyPhone2Page);
      } else if (res.code == 205) {
        alert('验证码不正确！')
      } else {
        alert('网络异常！')
      }
    }, error => {
      console.log('erros===', error);
    })
  }

  /*获取验证码*/
  getVerificationCode() {
    let phone = this.uphone;
    // const openId = window.sessionStorage.getItem('openId')
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    // let getPhoneCodeUrl = 'http://mamon.yemindream.com/mamon/user/sendSmsCode'
    if (!this.isFlag) return;
    if (phone.length < 11) {
      alert('手机号格式错误')
      return;
    }

    let getPhoneCodeUrl = sendSmsCodeUrl + '?type=2&openId=' + openId + '&phone=' + phone
    this.Provider.getMamenSwiperData(getPhoneCodeUrl).subscribe(res => {
      if (res.code == 200) {
        this.isFlag && this.countdown();
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
        this.phoneCodeText = '获取验证码';
      }
    }, 1000);
    this.phoneCodeText = '获取验证码';
  }
}
