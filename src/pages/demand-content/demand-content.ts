import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MamenDataProvider } from '../../providers/mamen-data/mamen-data';

import { ProjectBrowserPage } from '../my-project/client/project-browser/project-browser';
import { ConsultantProjectBrowserPage } from '../my-project/consultant/consultant-project-browser/consultant-project-browser';
import { demandListUrl } from '../../providers/requestUrl';

@IonicPage()
@Component({
  selector: 'page-demand-content',
  templateUrl: 'demand-content.html',
})
export class DemandContentPage {
  public selected:any;
  public projectListData = [];
  public pageNum = 0;
  public pageSize = 999;
  constructor(public navCtrl: NavController, public navParams: NavParams,private Provider:MamenDataProvider) {
    this.selected = 2;
  }

  ionViewDidLoad() {
    // this.getProjectListData(this.selected);
    console.log('ionViewDidLoad DemandContentPage');
  }

  ionViewDidEnter() {
    this.getProjectListData(this.selected);
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
    const openId = window.sessionStorage.getItem('openId')|| this.getUrlParam('openId');
    let projectListsDataUrl = demandListUrl + '?openId=' + openId + '&type='+type + '&pageNum=' + this.pageNum + '&pageSize='+this.pageSize;
    this.Provider.getMamenSwiperData(projectListsDataUrl).subscribe(res=>{
      if(res.code==200) {
        this.projectListData = res.data &&res.data.list?res.data.list:[];
      }else if(res.code == 207) {
        window.localStorage.removeItem('openId');
      }else{
        alert('请求出错:'+res.msg);
      }
    },error=>{
      console.log('erros===',error);
    })
  }

  /*跳转到详情页面*/
  onProjectBrowserClick(data) {
    const user = window.sessionStorage.getItem('user') ? JSON.parse(window.sessionStorage.getItem('user')) : {};
    if(user.type == 0){
      this.navCtrl.push(ProjectBrowserPage,{data:data});
    }else if(user.type == 1){
      this.navCtrl.push(ConsultantProjectBrowserPage,{data:data,isApply:true});
    }
    
  }

}
