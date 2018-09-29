import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MamenDataProvider } from '../../../providers/mamen-data/mamen-data';
import { ProjectBrowserPage } from '../../my-project/client/project-browser/project-browser';
import { ConsultantProjectBrowserPage } from '../../my-project/consultant/consultant-project-browser/consultant-project-browser';
import { getRecommendListUrl } from '../../../providers/requestUrl';

/**
 * Generated class for the RecommendConsultantListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recommend-consultant-list',
  templateUrl: 'recommend-consultant-list.html',
})
export class RecommendConsultantListPage {

  public selected:any;
  public projectListData = [];
  public pageNum = 0;
  public pageSize = 999;
  public isCont = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,private Provider:MamenDataProvider) {
    this.selected = 2;
  }

  ionViewDidLoad() {
    console.log(1123123112,'推荐')
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
    // let projectListsDataUrl = 'http://mamon.yemindream.com/mamon/recommend/getRecommendList';
    const openId = window.sessionStorage.getItem('openId')|| this.getUrlParam('openId');
    let projectListsDataUrl = getRecommendListUrl + '?openId=' + openId + '&type='+type + '&pageNum=' + this.pageNum + '&pageSize='+this.pageSize;
    this.Provider.getMamenSwiperData(projectListsDataUrl).subscribe(res=>{
      if(res.code==200) {
        this.projectListData = res.data || [];
        this.isCont = this.projectListData.length<1 ? true : false;
      }else if(res.code == 207) {
        window.localStorage.removeItem('openId');
      }else{
        //alert('请求出错:'+res.msg);
      }
    },error=>{
      console.log('erros===',error);
    })
  }

  /*跳转到详情页面*/
  onProjectBrowserClick(data) {
    this.navCtrl.push(ConsultantProjectBrowserPage,{data:data,isApply:true});
  }

}
