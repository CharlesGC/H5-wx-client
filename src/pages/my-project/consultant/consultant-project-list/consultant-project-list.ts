import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';

import { ConsultantProjectBrowserPage } from '../consultant-project-browser/consultant-project-browser';
import { getAdviserProjectByStatusUrl, myAdviserProjectCountUrl } from '../../../../providers/requestUrl';
import { SpeedPage } from '../../../speed/speed';

/**
 * Generated class for the ConsultantProjectListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-consultant-project-list',
  templateUrl: 'consultant-project-list.html',
})
export class ConsultantProjectListPage {

  public isShowNavMenu = false;
  public isShow = false;
  public showNavMenuName = '';
  public showNavMenuNumber = 0;
  public projectCount = {}
  public projectListData = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,private Provider:MamenDataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectListPage');
    // this.getMyProjectCount();
    // this.getProjectListData(-1);
  }
  ionViewDidEnter() {
    this.getMyProjectCount();
    this.getProjectListData(-1);
  }
  /*点击展开、收起*/
  onNavMenuClick(value) {
    console.log(value,'value');
    this.isShowNavMenu = value;
  }

  /*点击菜单触发*/
  onNavMenuItemClick(type,typeName,number) {
    this.showNavMenuName = typeName;
    this.showNavMenuNumber = number
    this.isShowNavMenu = false;
    this.getProjectListData(type);
  }

  /*跳转到详情页面*/
  onProjectBrowserClick(data) {
    this.navCtrl.push(ConsultantProjectBrowserPage,{data:data});
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
    // let projectListsDataUrl = 'http://mamon.yemindream.com/mamon/adviser/getProjectByStatus';
    const openId = window.sessionStorage.getItem('openId')|| this.getUrlParam('openId');
    let projectListsDataUrl = getAdviserProjectByStatusUrl + '?openId=' + openId + '&proStatus='+type;
    this.Provider.getMamenSwiperData(projectListsDataUrl).subscribe(res=>{
      if(res.code==200) {
        this.projectListData = res.data;
        //TODO 格式化用服务
        // this.projectListData && this.projectListData.length>0 && this.projectListData.map(f=>{
        //   if(f.releaseTime){
        //     let date = new Date(f.releaseTime);
        //     f.releaseTime = date.getFullYear() + '/' + (date.getMonth()<10?'0'+date.getMonth():date.getMonth())+'/'+(date.getDate()<10?'0'+date.getDate():date.getDate());
        //     console.log(f.releaseTime,'----');
        //   }
        // })
      }else if(res.code == 207) {
        window.localStorage.removeItem('openId');
      }else{
        alert('请求出错:'+res.msg);
      }
    },error=>{
      console.log('erros===',error);
    })
  }

  /*项目类型数量请求*/
  getMyProjectCount() {
    // let myProjectCountUrl = 'http://mamon.yemindream.com/mamon/adviser/myProjectCount';
    const openId = window.sessionStorage.getItem('openId')|| this.getUrlParam('openId');
    let myProjectCountUrl = myAdviserProjectCountUrl + '?openId=' + openId;
    this.Provider.getMamenSwiperData(myProjectCountUrl).subscribe(res=>{
      if(res.code==200) {
       this.projectCount = res.data || {};
       this.showNavMenuNumber = res.data ? res.data.allCount : 0;
      }else if(res.code == 207) {
        window.localStorage.removeItem('openId');
      }else{
        alert('请求出错:'+res.msg);
      }
    },error=>{
      console.log('erros===',error);
    })
  }

  //下拉刷型界面
  doRefresh(refresher){

    setTimeout(() => { 
        console.log('加载完成后，关闭刷新'); 
        refresher.complete();

        //toast提示
        alert("加载成功");
    }, 2000);
  }

  //下滑动加载数据
  doInfinite(infiniteScroll){

    setTimeout(() => { 
        alert('加载完成后，关闭刷新'); 
        infiniteScroll.complete();
    }, 2000);
  }
  // 返回页面
  onSpeedStageClick() {
    this.navCtrl.pop();
  }
  goback(){
    this.isShowNavMenu = false;
    this.navCtrl.popToRoot();
  }
}
