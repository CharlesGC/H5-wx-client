import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';
import { programObjectionUrl, customerNayStagePlanUrl, customerNayDocumentUrl, hideAttentionMenuUrl, getAttentionUserInfo } from '../../../../providers/requestUrl';
import { HttpClient, HttpParams } from '@angular/common/http';
/**
 * Generated class for the ProjectProgramObjectionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var wx: any;
@IonicPage()
@Component({
  selector: 'page-project-program-objection',
  templateUrl: 'project-program-objection.html',
})
export class ProjectProgramObjectionPage {
  public isPosePrompt = false
  public inputName: any;
  public isreturnBtn = false
  public tiptext: any
  public title = '请写下您的修改意见';
  public isFailed: any
  constructor(public navCtrl: NavController, public navParams: NavParams, private Provider: MamenDataProvider, private http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectProgramObjectionPage');
  }

  ionViewDidEnter() {
    let type = this.navParams.get('type');
    if (type == 'program') {
      this.title = '请写下您对该方案的修改意见'
    } else if (type == 'arrStage') {
      this.title = '请写下您对阶段的修改意见'
    } else if (type == 'nayDocument') {
      this.title = '请写下您对该阶段交付物的修改意见'
    }
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

  getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象  
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数  
    if (r != null) {
      return encodeURI(r[2]);  //返回参数值 
    } else {
      return null;
    }
  }

  surePrompt() {
    if (this.isFailed == false) {
      this.isPosePrompt = !this.isPosePrompt
      this.navCtrl.pop()
    } else if (this.isFailed == true) {
      this.isPosePrompt = !this.isPosePrompt
      return
    }
  }
  ReturnBack() {
    this.isPosePrompt = !this.isPosePrompt
    return
  }

  /*提出异议请求*/
  onProgramObjectionSubmit(value) {
    let ppid = this.navParams.get('ppid');
    let pid = this.navParams.get('pid');
    let psid = this.navParams.get('psid');
    let type = this.navParams.get('type');
    let url = ''
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    // let projectDetailsUrl = url + '?openId=' + openId + '&ppid='+ppid+'&opinion='+value;
    if (type == 'program') {
      url = programObjectionUrl + '?openId=' + openId + '&ppid=' + ppid + '&opinion=' + value;;
    } else if (type == 'arrStage') {
      url = customerNayStagePlanUrl + '?openId=' + openId + '&pid=' + pid + '&opinion=' + value;
    } else if (type == 'nayDocument') {
      url = customerNayDocumentUrl + '?openId=' + openId + '&psid=' + psid + '&opinion=' + value;
    } else {
      url = url + '?openId=' + openId + '&ppid=' + ppid + '&opinion=' + value;
    }

    this.Provider.getMamenSwiperData(url).subscribe(res => {
      if (res.code == 200) {
        //alert('操作成功！');
        // this.isPosePrompt = true
        // this.tiptext = '操作成功'
        // this.isFailed = false
        this.navCtrl.pop();
      } else {
        //alert('请求出错:' + res.msg);
        this.isPosePrompt = true
        this.tiptext = '操作失败，请稍后再试'
        this.isreturnBtn = true
        this.isFailed = true
      }
    }, error => {
      console.log('erros===', error);
    })
  }

}
