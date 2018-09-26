import { Component } from '@angular/core';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
// import {ReleasePage} from '../release/release';
import { ProjectEditStep1Page } from '../my-project/client/project-edit-step1/project-edit-step1'; 
import { PhonebindPage } from '../phonebind/phonebind';
import { MessageCenterPage } from '../message-center/message-center';
import { DemandContentPage } from '../demand-content/demand-content';
import { RecommendConsultantListPage } from '../recommend/recommend-consultant-list/recommend-consultant-list';
import { RecommendClientListPage } from '../recommend/recommend-client-list/recommend-client-list';
import { SpeedPage } from '../speed/speed';
import { getUserByopenIdUrl,getWxOpenidUrl } from '../../providers/requestUrl';
import { MamenDataProvider } from '../../providers/mamen-data/mamen-data';

@Component({
  selector: 'page-tabs',  
  templateUrl: 'tabs.html'
})
export class TabsPage {
  public user ={}
  tab1Root = HomePage;
  tab2Root = DemandContentPage;
  // tab3Root = ReleasePage;
  tab3Root = SpeedPage;
  // tab2Root = PhonebindPage;
  public tab4Root:any;
  tab5Root = ContactPage;
  public isshow = false;
  constructor(private Provider:MamenDataProvider) {
    this.tab4Root = RecommendConsultantListPage
  }
 
  ngOnInit() {
    // console.log('我最先执行~~')
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId') || window.localStorage.getItem('openId');
    if(openId){
      this.getUserInfo(openId)
      !window.sessionStorage.getItem('openId') && window.sessionStorage.setItem('openId',openId);
    }else{

    }
    
  }

  /*获取url上的参数*/
  getUrlParam(name) {  
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象  
      var r = window.location.search.substr(1).match(reg);  //匹配目标参数  
      if (r != null) {
          return encodeURI(r[2]);  //返回参数值 
      } else {
          return null; 
      }
  }

  onSelectFriend(e) {
    const user = window.sessionStorage.getItem('user') ? JSON.parse(window.sessionStorage.getItem('user')) : {type:-1};
    if(user.type == -1){
      this.onLogin();
    }
  }

  /*判断用户身份请求*/
  onLogin() {
    var ua = navigator.userAgent.toLowerCase();
    var isWeixin = ua.indexOf('micromessenger') != -1;
    if (isWeixin) {
      const appid = 'wxc7d4e3e94ad5b330';
      const code = this.getUrlParam('code') || window.localStorage.getItem('code');
      const local = window.location.href;
      const openidUrl = getWxOpenidUrl;
      if(code == null || code == '') {
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${openidUrl}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
      }else{
        window.localStorage.setItem('code',code);
        let url = `${openidUrl}?code=${code}`;
        this.Provider.getMamenSwiperData(url).subscribe(res=>{
        },error=>{
          console.log('erros===',error);
        })
      }
    }else{
      alert('请用微信登录')
    }

  }

  /*获取用户信息*/
  getUserInfo(openId) {

    let chooseIdentyUrl = getUserByopenIdUrl + '?openId=' + openId;
    this.Provider.getMamenSwiperData(chooseIdentyUrl).subscribe(res=>{
      if(res.code==200) {
        this.user = res.data;
        window.sessionStorage.setItem('user',JSON.stringify(res.data))
        window.localStorage.setItem('user',JSON.stringify(res.data));
        if(this.user['type'] && this.user['type'] == 1){
          this.isshow = false;
          this.tab4Root = RecommendConsultantListPage
        }else if(this.user['type'] && this.user['type'] == 0){
          this.isshow = true;
          this.tab4Root = RecommendClientListPage;
        }
      }else if(res.code == 207) {
        window.localStorage.removeItem('openId');
        window.sessionStorage.removeItem('openId');
      }else if(res.code == 203) {
        window.localStorage.removeItem('openId');
        window.sessionStorage.removeItem('openId');
        // this.onLogin();
      }
    },error=>{
      console.log('erros===',error);
    })
  }

  ngDoCheck (){
    // console.log('我最先执行~~改变时')
    // console.log('ngDoCheck','ngDoCheck进行时');
    const user = window.sessionStorage.getItem('user') ? JSON.parse(window.sessionStorage.getItem('user')) : {type:-1};
    // user.type == 0
    if(user.type == 1){
      this.isshow = false;
      this.tab4Root = RecommendConsultantListPage
    }else if(user.type == 0 || user.type == -1){
      this.isshow = true;
      this.tab4Root = RecommendClientListPage;
    }
   
  }
  // ngAfterContentInit(){
  //   console.log("父组件ngAfterContentInit")
  // }
  // ngAfterContentChecked(){
  //   console.log("父组件ngAfterContentChecked")
  // }
  // ngAfterViewInit(){
  //   console.log("父组件ngAfterViewInit")
  // }
  // ngAfterViewChecked(){
  //   console.log("父组件ngAfterViewChecked")
  // }
  // ngAfterViewInt(){
  //   console.log('改变时执行~~');
  // }

}
