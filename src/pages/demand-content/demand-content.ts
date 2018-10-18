import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { MamenDataProvider } from '../../providers/mamen-data/mamen-data';
import { ProjectBrowserPage } from '../my-project/client/project-browser/project-browser';
import { ConsultantProjectBrowserPage } from '../my-project/consultant/consultant-project-browser/consultant-project-browser';
import { demandListUrl, getAttentionUserInfo, hideAttentionMenuUrl,sourceHistoryUrl } from '../../providers/requestUrl';
import { HttpClient, HttpParams } from '@angular/common/http';
declare var wx: any;
@IonicPage()
@Component({
  selector: 'page-demand-content',
  templateUrl: 'demand-content.html',
})
export class DemandContentPage {
  public selected: any;
  public projectListData = [];
  public pageNum = 0;
  public pageSize = 999;
  public attstate: any
  constructor(public navCtrl: NavController, public navParams: NavParams, private Provider: MamenDataProvider, public sanitizer: DomSanitizer, private http: HttpClient) {
    this.selected = 2;
  }
  /*转换html标签处理*/
  assembleHTML(strHTML: any) {
    return this.sanitizer.bypassSecurityTrustHtml(strHTML);
  }

  ionViewDidLoad() {
    let elements = document.querySelectorAll(".tabbar");
    if (elements != null) {
      Object.keys(elements).map((key) => {
        elements[key].style.display = 'flex';
      });
    }
    // this.getProjectListData(this.selected);
  }

  ionViewDidEnter() {
    let elements = document.querySelectorAll(".tabbar");
    if (elements != null) {
      Object.keys(elements).map((key) => {
        elements[key].style.display = 'flex';
      });
    }
    console.log('ionViewDidLoad DemandContentPage');
    const openId = window.sessionStorage.getItem('openId');
    let getAttentionUserInfoUrl = getAttentionUserInfo + '?openId=' + openId;
    //console.log(getAttentionUserInfo)
    this.http.get(getAttentionUserInfoUrl).subscribe(res => {
      this.attstate = res['data'].subscribe;
    });
    this.isAttention();
    this.getProjectListData(this.selected);
  }
  //隐藏底部分享菜单
  isAttention() {
    let url = encodeURIComponent(location.href.split('#')[0]); // 当前网页的URL，不包含#及其后面部分
    let wUrl = hideAttentionMenuUrl + '?url=' + url;
    this.Provider.getMamenSwiperData(wUrl).subscribe(res => {
      if (res['code'] == 200) {
        wx.config({
          debug: false,
          appId: res['data'].appid,
          timestamp: res['data'].timestamp,
          nonceStr: res['data'].nonceStr,
          signature: res['data'].signature,
          jsApiList: ['showOptionMenu','onMenuShareAppMessage']
        });
        wx.ready(function () {
          wx.showOptionMenu();
          wx.onMenuShareAppMessage({
            // 分享标题
            title: '麦盟自由顾问平台',
            // 分享描述 
            desc: '麦盟自由顾问平台',
            // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            link: sourceHistoryUrl + '&page=7',
            // 分享图标 
            imgUrl: '../../assets/imgs/logobig.png',
          }, function (res) {
            //alert(res)
          });
        });
      }
    }, error => {
      console.log('erros===', error);
    })
  }
  /*标签切换时调用*/
  onSelectClick(type) {
    this.selected = type;
    this.getProjectListData(type);
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

  /*项目列表数据请求*/
  getProjectListData(type) {
    // let projectListsDataUrl = 'http://mamon.yemindream.com/mamon/adviser/demandList';
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId') || '';
    let projectListsDataUrl = demandListUrl + '?openId=' + openId + '&type=' + type + '&pageNum=' + this.pageNum + '&pageSize=' + this.pageSize;
    this.Provider.getMamenSwiperData(projectListsDataUrl).subscribe(res => {
      if (res.code == 200) {
        this.projectListData = res.data && res.data.list ? res.data.list : [];
      } else if (res.code == 207) {
        window.localStorage.removeItem('openId');
      } else {
        alert('请求出错:' + res.msg);
      }
    }, error => {
      console.log('erros===', error);
    })
  }

  /*跳转到详情页面*/
  onProjectBrowserClick(data) {
    const user = window.sessionStorage.getItem('user') ? JSON.parse(window.sessionStorage.getItem('user')) : {};
    if (user.type == 0) {
      this.navCtrl.push(ProjectBrowserPage, { data: data, isApply: true });
    } else if (user.type == 1) {
      this.navCtrl.push(ConsultantProjectBrowserPage, { data: data, isApply: true, selectType: this.selected });
    } else {
      this.navCtrl.push(ConsultantProjectBrowserPage, { data: data, isApply: true, selectType: 3 });
    }
  }
}
