import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';
import { addOrEditBankUrl, delBankUrl } from '../../../../providers/requestUrl';
import { HttpClient, HttpParams } from '@angular/common/http';
import { hideAttentionMenuUrl, getAttentionUserInfo } from '../../../../providers/requestUrl'
declare var wx: any;
/**
 * Generated class for the ConsultantBankAccountEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-consultant-bank-account-edit',
  templateUrl: 'consultant-bank-account-edit.html',
})
export class ConsultantBankAccountEditPage {
  public bankname: any;
  public bankaccount: any;
  public isdefault: any;
  public bankDateil: any;
  public inputName: any;
  public isSubmit = false;
  public isDelete = false
  public isComplete = false
  constructor(public navCtrl: NavController, public navParams: NavParams, private Provider: MamenDataProvider, private http: HttpClient) {
    this.bankDateil = {}
  }

  ionViewDidLoad() {
    this.inputName = '123213123'
    this.bankDateil = this.navParams.get('data') || {}
    this.isdefault = this.bankDateil.type == 1;
    // this.bankname = this.bankDateil;
  }
  ionViewDidEnter(){
    this.isAttention();
   }
  sureSubmitBack() {
    this.isSubmit = !this.isSubmit
    this.navCtrl.pop();
  }
  sureDeleteBack() {
    this.isDelete = !this.isDelete
    this.navCtrl.pop()
  }
  sureCompleteBack() {
    this.isComplete = !this.isComplete
    return
  }
  /*提交数据*/
  onBankAccountSubmit(bankname, bankaccount) {
    console.log(bankname, bankaccount, '-----');
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    let bankDateil = this.bankDateil;
    let abid = bankDateil.abid || 0;
    // let getBankAccountlUrl = 'http://mamon.yemindream.com/mamon/adviser/addOrEditBank';

    let getBankAccountlUrl = addOrEditBankUrl + '?openId=' + openId + '&bankAccount=' + bankname +
      '&account=' + bankaccount +
      '&type=' + (this.isdefault ? 1 : 0);
    if (abid) {
      getBankAccountlUrl = getBankAccountlUrl + '&abid=' + abid;
    }
    if (!bankname) {
      this.isComplete = true
      return
    }
    if (!bankaccount) {
      this.isComplete = true
      return
    }
    this.Provider.getMamenSwiperData(getBankAccountlUrl).subscribe(res => {
      if (res.code == 200) {
        //alert((abid?'修改':'新增') + '成功');
        this.isSubmit = true;
      } else if (res.code == 207) {
        window.localStorage.removeItem('openId');
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
  /*删除提交*/
  onBankAccountDel() {
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    let bankDateil = this.bankDateil;
    let abid = bankDateil.abid || 0;
    // let getBankAccountDellUrl = 'http://mamon.yemindream.com/mamon/adviser/delBank';

    let getBankAccountDellUrl = delBankUrl + '?openId=' + openId + '&abid=' + abid

    this.Provider.getMamenSwiperData(getBankAccountDellUrl).subscribe(res => {
      if (res.code == 200) {
        //alert('删除成功');
        //this.navCtrl.pop();
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
