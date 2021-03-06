import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MamenDataProvider } from '../../providers/mamen-data/mamen-data';
import { ContactPage } from '../contact/contact'
import { changePhoneUrl, sendSmsCodeUrl } from '../../providers/requestUrl';
import { HttpClient, HttpParams } from '@angular/common/http';
import { hideAttentionMenuUrl, getAttentionUserInfo } from '../../providers/requestUrl'
declare var wx: any;
/**
 * Generated class for the ModifyPhone2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modify-phone2',
  templateUrl: 'modify-phone2.html',
  viewProviders: [MamenDataProvider]
})
export class ModifyPhone2Page {
  public phoneCodeText = '获取验证码';
  public isFlag = true;
  public isHavePhone = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private Provider: MamenDataProvider, private http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModifyPhone2Page');
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
  sureHavePhone() {
    this.isHavePhone = !this.isHavePhone;
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
  /*获取验证码*/
  getVerificationCode(uphone) {
    let phone = uphone.value;
    // const openId = window.sessionStorage.getItem('openId')
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId')
    // let getPhoneCodeUrl = 'http://mamon.yemindream.com/mamon/user/sendSmsCode'
    if (phone.length < 11) {
      alert('手机号格式错误')
      return;
    }

    let getPhoneCodeUrl = sendSmsCodeUrl + '?type=0&openId=' + openId + '&phone=' + phone
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

  /*修改手机号提交*/
  modifysubmit(phone, code) {
    // let checkCodeUrl = 'http://mamon.yemindream.com/mamon/user/changePhone'
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId')

    let checkCodeUrl = changePhoneUrl + '?openId=' + openId + '&newphone=' + phone.value + '&code=' + code.value;
    this.Provider.getMamenSwiperData(checkCodeUrl).subscribe(res => {
      if (res.code == 200) {
        this.navCtrl.popToRoot();
      } else if (res.code == 204) {
        this.isHavePhone = true;
      } else {
        alert(res.msg + ': 网络异常')
      }
    }, error => {
      console.log('erros===', error);
    })
  }
}
