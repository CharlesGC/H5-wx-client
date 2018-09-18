import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';

import { ProjectBrowserPage } from '../project-browser/project-browser';
import { getProjectByStatusUrl, myProjectCountUrl } from '../../../../providers/requestUrl';
import { ProjectSpeedReleasePage } from '../project-speed-release/project-speed-release';
import { SpeedPage } from '../../../speed/speed';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, private Provider: MamenDataProvider) {
    this.navCtrl = navCtrl
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectListPage');
    // this.getMyProjectCount();
    // this.getProjectListData(0);
  }
  ionViewDidEnter() {
    this.getMyProjectCount();
    this.getProjectListData(0);
  }
  /*点击展开、收起*/
  onNavMenuClick(value) {
    console.log(value, 'value');
    this.isShowNavMenu = value;
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
        console.log(res, '--------');
        this.projectListData = res.data;
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
        this.projectCount = res.data;
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
    this.isShowNavMenu = false;
    this.navCtrl.popToRoot();
  }
}
