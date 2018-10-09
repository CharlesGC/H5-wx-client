import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { MamenDataProvider } from '../../../providers/mamen-data/mamen-data';
import { ProjectConsultantBrowserPage } from '../../my-project/client/project-consultant-browser/project-consultant-browser';
import { getRecommendListUrl } from '../../../providers/requestUrl';

/**
 * Generated class for the RecommendClientListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recommend-client-list',
  templateUrl: 'recommend-client-list.html',
})
export class RecommendClientListPage {

  public projectConsultantListData = [];
  public isCont = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,private Provider:MamenDataProvider,public sanitizer:DomSanitizer) {
  }
  /*转换html标签处理*/
  assembleHTML(strHTML:any){
    return this.sanitizer.bypassSecurityTrustHtml(strHTML);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectConsultantListPage');
    // this.getProjectListData();
  }

  ionViewDidEnter() {
    this.getProjectListData();
  }

  /*跳转到顾问详情页面*/
  goConsultantBrowserClick(uid,pid) {
    this.navCtrl.push(ProjectConsultantBrowserPage,{uid:uid,pid:pid});
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

   /*项目顾问数据请求*/
   getProjectListData() {
    // let projectListsDataUrl = 'http://mamon.yemindream.com/mamon/recommend/getRecommendList';
    const openId = window.sessionStorage.getItem('openId')|| this.getUrlParam('openId')
    let projectListsDataUrl = getRecommendListUrl + '?openId=' + openId;
    this.Provider.getMamenSwiperData(projectListsDataUrl).subscribe(res=>{
      if(res.code==200) {
        this.projectConsultantListData = res.data || [];
        this.isCont = this.projectConsultantListData.length<1 ? true : false;
      }else if(res.code == 207) {
        window.localStorage.removeItem('openId');
      }else{
        alert('请求出错:'+res.msg);
      }
    },error=>{
      console.log('erros===',error);
    })
  }

}
