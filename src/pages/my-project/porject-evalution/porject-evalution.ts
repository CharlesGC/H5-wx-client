import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MamenDataProvider } from '../../../providers/mamen-data/mamen-data';
import { projectEvaluateUrl, clientprojectEvaluateUrl, hideAttentionMenuUrl, getAttentionUserInfo } from '../../../providers/requestUrl';
import { HttpClient, HttpParams } from '@angular/common/http';
declare var wx: any;
/**
 * Generated class for the PorjectEvalutionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-porject-evalution',
  templateUrl: 'porject-evalution.html',
})
export class PorjectEvalutionPage {
  public evalutionType = '';
  public inputName: any;
  public isEvaluation = false
  public tipstext: any
  public isFailed: any
  constructor(public navCtrl: NavController, public navParams: NavParams, private Provider: MamenDataProvider,private http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectProgramObjectionPage');
    this.evalutionType = this.navParams.get('type');
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
  /*取消请求*/
  onCancelClick() {
    this.navCtrl.pop();
  }
  sureEvaluation() {
    if (this.isFailed == false) {
      this.isEvaluation = !this.isEvaluation
      this.navCtrl.pop()
    } else {
      this.isEvaluation = !this.isEvaluation
      return
    }
  }
  onReturn() {
    this.isEvaluation = !this.isEvaluation
    return
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

  /*评价请求*/
  onProgramObjectionSubmit(value) {
    let pid = this.navParams.get('pid');
    // let projectDetailsUrl = 'http://mamon.yemindream.com/mamon/customer/getProjectProgramDeatil';
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    let url = this.evalutionType == 'consultantEvalution' ? projectEvaluateUrl : clientprojectEvaluateUrl;
    let projectDetailsUrl = url + '?openId=' + openId + '&pid=' + pid + '&evaluation=' + value;
    this.Provider.getMamenSwiperData(projectDetailsUrl).subscribe(res => {
      if (res.code == 200) {
        this.isEvaluation = true
        this.tipstext = '操作成功'
        this.isFailed = false
        //alert('操作成功！');
        //this.navCtrl.pop();
      } else {
        this.isEvaluation = true
        this.tipstext = '操作失败，请稍后再试'
        this.isFailed = true
        //alert('请求出错:' + res.msg);
      }
    }, error => {
      console.log('erros===', error);
    })
  }

}
