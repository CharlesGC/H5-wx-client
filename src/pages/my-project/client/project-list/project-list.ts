import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';
import { ProjectBrowserPage } from '../project-browser/project-browser';
import { getProjectByStatusUrl, myProjectCountUrl, hideAttentionMenuUrl, getAttentionUserInfo } from '../../../../providers/requestUrl';
import { ProjectSpeedReleasePage } from '../project-speed-release/project-speed-release';
import { SpeedPage } from '../../../speed/speed';
import { ContactPage } from '../../../contact/contact';
import { HttpClient, HttpParams } from '@angular/common/http';
declare var wx: any;
/**
 * Generated class for the ProjectListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-project-list',
  templateUrl: 'project-list.html',
})
export class ProjectListPage {
  public isShowNavMenu = false;
  public isShow = false;
  public showNavMenuName = '';
  public showNavMenuNumber = 0;
  public projectCount = {}
  public projectListData = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private Provider: MamenDataProvider, public sanitizer: DomSanitizer, private http: HttpClient) {
    this.navCtrl = navCtrl
  }
  /*转换html标签处理*/
  assembleHTML(strHTML: any) {
    return this.sanitizer.bypassSecurityTrustHtml(strHTML);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectListPage');
    // this.getMyProjectCount();
    // this.getProjectListData(0);
  }
  ionViewDidEnter() {
    this.getMyProjectCount();
    this.getProjectListData(0);
    this.isAttention();
  }
  /*点击展开、收起*/
  onNavMenuClick(value) {
    console.log(value, 'value');
    this.isShowNavMenu = value;
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
  /*点击菜单触发*/
  onNavMenuItemClick(type, typeName, number) {
    this.showNavMenuName = typeName;
    this.showNavMenuNumber = number
    this.isShowNavMenu = false;
    this.getProjectListData(type);
  }

  /*跳转到详情页面*/
  onProjectBrowserClick(data) {
    if (data.type == 0) {
      this.navCtrl.push(ProjectBrowserPage, { data: data });
    } else {
      this.navCtrl.push(ProjectSpeedReleasePage, { data: data });
    }

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
    // let projectListsDataUrl = 'http://mamon.yemindream.com/mamon/customer/getProjectByStatus';
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    let projectListsDataUrl = getProjectByStatusUrl + '?openId=' + openId + '&proStatus=' + type;
    this.Provider.getMamenSwiperData(projectListsDataUrl).subscribe(res => {
      if (res.code == 200) {
        this.projectListData = res.data;
        //TODO 格式化用服务
        // this.projectListData && this.projectListData.length>0 && this.projectListData.map(f=>{
        //   if(f.releaseTime){
        //     let date = new Date(f.releaseTime);
        //     f.releaseTime = date.getFullYear() + '/' + (date.getMonth()<10?'0'+date.getMonth():date.getMonth())+'/'+(date.getDate()<10?'0'+date.getDate():date.getDate());
        //   }
        // })
      } else if (res.code == 207) {
        window.localStorage.removeItem('openId');
      } else {
        alert('请求出错:' + res.msg);
      }
    }, error => {
      console.log('erros===', error);
    })
  }

  /*项目类型数量请求*/
  getMyProjectCount() {
    // let myProjectCountUrl = 'http://mamon.yemindream.com/mamon/customer/myProjectCount';
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    let cmyProjectCountUrl = myProjectCountUrl + '?openId=' + openId;
    this.Provider.getMamenSwiperData(cmyProjectCountUrl).subscribe(res => {
      if (res.code == 200) {
        console.log(res, '项目数量');
        this.projectCount = res.data || {};
        this.showNavMenuNumber = res.data ? res.data.allCount : 0;
      } else if (res.code == 207) {
        window.localStorage.removeItem('openId');
      } else {
        alert('请求出错:' + res.msg);
      }
    }, error => {
      console.log('erros===', error);
    })
  }

  // //下拉刷型界面
  // doRefresh(refresher){

  //   setTimeout(() => { 
  //       console.log('加载完成后，关闭刷新'); 
  //       refresher.complete();

  //       //toast提示
  //       alert("加载成功");
  //   }, 2000);
  // }

  // //下滑动加载数据
  // doInfinite(infiniteScroll){

  //   setTimeout(() => { 
  //       alert('加载完成后，关闭刷新'); 
  //       infiniteScroll.complete();
  //   }, 2000);
  // }

  // 添加项目跳转页
  onSpeedStageClick() {
    this.navCtrl.push(SpeedPage);
  }

  goback() {
    // this.isShowNavMenu = false;
    // this.navCtrl.goToRoot(this.navCtrl.getByIndex(4))
    this.navCtrl.setRoot(ContactPage);
    // this.navCtrl.popToRoot().then(()=>this.navCtrl.parent.select(4));
    // this.navCtrl.parent.select(4);
  }
}
