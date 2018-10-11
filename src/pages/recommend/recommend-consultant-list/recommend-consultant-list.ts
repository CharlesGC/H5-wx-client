import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { MamenDataProvider } from '../../../providers/mamen-data/mamen-data';
import { ProjectBrowserPage } from '../../my-project/client/project-browser/project-browser';
import { ConsultantProjectBrowserPage } from '../../my-project/consultant/consultant-project-browser/consultant-project-browser';
import { getRecommendListUrl,hideAttentionMenuUrl, getAttentionUserInfo } from '../../../providers/requestUrl';
import { HttpClient, HttpParams } from '@angular/common/http';
declare var wx: any;
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
  constructor(public navCtrl: NavController, public navParams: NavParams,private Provider:MamenDataProvider,public sanitizer:DomSanitizer,private http: HttpClient) {
    this.selected = 2;
  }
  /*转换html标签处理*/
  assembleHTML(strHTML:any){
    return this.sanitizer.bypassSecurityTrustHtml(strHTML);
  }
  ionViewDidLoad() {
    console.log(1123123112,'推荐')
    // this.getProjectListData(this.selected);
    console.log('ionViewDidLoad DemandContentPage');
  }

  ionViewDidEnter() {
    this.getProjectListData(this.selected);
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
