import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';
import { ProjectProgramObjectionPage } from '../project-program-objection/project-program-objection';
import { getProjectProgramDeatilUrl, confirmProgramUrl,hideAttentionMenuUrl, getAttentionUserInfo } from '../../../../providers/requestUrl';
import { HttpClient, HttpParams } from '@angular/common/http';
declare var wx: any;
/**
 * Generated class for the ProjectProgramBrowserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-project-program-browser',
  templateUrl: 'project-program-browser.html',
})
export class ProjectProgramBrowserPage {
  public isProgram = false
  public isdisabled :any
  public tiptext: any
  public isFailed: any
  public projectProgramDetails = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, private Provider: MamenDataProvider,public sanitizer:DomSanitizer,private http: HttpClient) {
  }
  /*转换html标签处理*/
  assembleHTML(strHTML:any){
    return this.sanitizer.bypassSecurityTrustHtml(strHTML);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectProgramBrowserPage');
    let ppid = this.navParams.get('ppid');
    this.getProjectListData(ppid)
  }
  ionViewDidEnter() {
    let ppid = this.navParams.get('ppid');
    this.getProjectListData(ppid);
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

  /*项目方案详情数据请求*/
  getProjectListData(ppid) {
    // let projectDetailsUrl = 'http://mamon.yemindream.com/mamon/customer/getProjectProgramDeatil';
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    let projectDetailsUrl = getProjectProgramDeatilUrl + '?openId=' + openId + '&ppid=' + ppid;
    this.Provider.getMamenSwiperData(projectDetailsUrl).subscribe(res => {
      if (res.code == 200) {
        console.log(res, '--------');
        this.projectProgramDetails = res.data;
        this.projectProgramDetails['size'] = (this.projectProgramDetails['size'] / 1048576).toPrecision(3)

        if (this.projectProgramDetails['size'] > 1) {
          this.projectProgramDetails['size'] = this.projectProgramDetails['size'] + ' MB'
        } else if (this.projectProgramDetails['size'] < 1) {
          this.projectProgramDetails['size'] = this.projectProgramDetails['size'] * 1024 + ' KB'
        }

        if (this.projectProgramDetails['format']) {
          if (this.projectProgramDetails['format'].search(/doc/) !== -1 || this.projectProgramDetails['format'].search(/docx/) !== -1) {
            this.projectProgramDetails['format'] = 'assets/imgs/' + 'doc.png'
          } else if (this.projectProgramDetails['format'].search(/ppt/) !== -1 || this.projectProgramDetails['format'].search(/pptx/) !== -1) {
            this.projectProgramDetails['format'] = 'assets/imgs/' + 'ppt.png'
          } else if (this.projectProgramDetails['format'].search(/xls/) !== -1 || this.projectProgramDetails['format'].search(/xlsx/) !== -1) {
            this.projectProgramDetails['format'] = 'assets/imgs/' + 'xls.png'
          } else if (this.projectProgramDetails['format'].search(/jpg/) !== -1 || this.projectProgramDetails['format'].search(/png/) !== -1 || this.projectProgramDetails['format'].search(/jpeg/) !== -1) {
            this.projectProgramDetails['format'] = 'assets/imgs/' + 'png.png'
          } else if (this.projectProgramDetails['format'].search(/pdf/) !== -1) {
            this.projectProgramDetails['format'] = 'assets/imgs/' + 'pdf.png'
          }
        }
      } else if (res.code == 207) {
        window.localStorage.removeItem('openId');
      } else {
        alert('请求出错:' + res.msg);
      }
    }, error => {
      console.log('erros===', error);
    })
  }

  /*提出异议*/
  onObjectionClick() {
    let ppid = this.navParams.get('ppid');
    this.navCtrl.push(ProjectProgramObjectionPage, { type: 'program', ppid: ppid });
  }
  onReturnBack() {
    this.isProgram = !this.isProgram
    return
  }
  sureProgram() {
    this.isProgram = true
    this.tiptext = "是否确定该方案？"
    return
  }
  /*确认方案请求*/
  onConfirmProgramSubmit() {
    if(this.isFailed == false){
      this.navCtrl.pop()
      return
    }else if (this.isFailed == true){
      this.isProgram = !this.isProgram
      return
    }
    let ppid = this.navParams.get('ppid');
    // let projectDetailsUrl = 'http://mamon.yemindream.com/mamon/customer/confirmProgram';
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    let projectDetailsUrl = confirmProgramUrl + '?openId=' + openId + '&ppid=' + ppid + '&status=2';
    this.Provider.getMamenSwiperData(projectDetailsUrl).subscribe(res => {
      if (res.code == 200) {
        //alert('操作成功！');
        this.navCtrl.pop()
      } else {
        this.tiptext = "操作失败，请稍后重试！"
        // this.isFailed = true
        //console.log('请求出错:' + res.msg);
      }
    }, error => {
      console.log('erros===', error);
    })
  }
}