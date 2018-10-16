import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
import { ChooseIdentityPage } from '../choose-identity/choose-identity';
import { getUserByopenIdUrl, getWxOpenidUrl, hideAttentionMenuUrl } from '../../providers/requestUrl';
import { MamenDataProvider } from '../../providers/mamen-data/mamen-data';
import { HttpClient, HttpParams } from '@angular/common/http';

import { ProjectBrowserPage } from '../my-project/client/project-browser/project-browser';
import { ConsultantProjectBrowserPage } from '../my-project/consultant/consultant-project-browser/consultant-project-browser';
import { ProjectConsultantListPage } from '../my-project/client/project-consultant-list/project-consultant-list';
import { ConsultantProgramListPage } from '../my-project/consultant/consultant-program-list/consultant-program-list';
import { ProjectProgramBrowserPage } from '../my-project/client/project-program-browser/project-program-browser';
import { ProjectStageListPage } from '../my-project/client/project-stage-list/project-stage-list';
import { ConsultantStageListPage } from '../my-project/consultant/consultant-stage-list/consultant-stage-list';
import { ConsultantStageBrowserPage } from '../my-project/consultant/consultant-stage-browser/consultant-stage-browser';
import { ProjectStageBrowserPage } from '../my-project/client/project-stage-browser/project-stage-browser'; 
import { ProjectInvoiceListPage } from '../my-project/client/project-invoice-list/project-invoice-list';

import { IndustrydetialPage } from '../home/industrydetial/industrydetial';
import { ProjectConsultantBrowserPage } from '../my-project/client/project-consultant-browser/project-consultant-browser';
import { CasemorePage } from '../home/casemore/casemore';
import { SwiperDetailPage } from '../home/swiper-detail/swiper-detail';


declare var wx: any;
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  public user = {}
  tab1Root = HomePage;
  tab2Root = DemandContentPage;
  // tab3Root = SpeedPage;
  public tab3Root: any;
  public tab4Root: any;
  tab5Root = ContactPage;
  public isshow = false;
  public selectedIndex = 0;
  constructor(public navCtrl: NavController, private Provider: MamenDataProvider,private http:HttpClient) {
    // this.tab4Root = RecommendConsultantListPage
  }
  // @ViewChild('myTabs') tabRef: Tabs;

  ionViewDidLoad() {
    console.log('第一个执行')
    this.goToBack({},1);
  }
  ngOnInit() {
    console.log(Location,'我最先执行~~')
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId') || window.localStorage.getItem('openId');
    let backType = this.getUrlParam('backType');
    let type = this.getUrlParam('type');
    let pid = this.getUrlParam('pid');
    let status = this.getUrlParam('pStatus');
    let appStatus = this.getUrlParam('appStatus');
    let ppid  = this.getUrlParam('ppid');
    let finalPrice = this.getUrlParam('finalPrice');
    let psid =  this.getUrlParam('psid');

    //获取判断是否为关注后跳转的地址
    let source = this.getUrlParam('source');

    let data = {
      backType: backType,
      pid: pid,
      status: status,
      appStatus:appStatus,
      ppid:ppid,
      finalPrice:finalPrice,
      psid:psid,
    };
    if (openId) {
      if(source == 'history'){
        this.gotoSource();
      }else{
        this.goToBack(data,type);
      }

      this.getUserInfo(openId)
      !window.sessionStorage.getItem('openId') && window.sessionStorage.setItem('openId', openId);
    } else {
      
    }
    this.isAttention();
  }

  /*关注后返回历史页面*/
  gotoSource() {
    let page = window.localStorage.getItem('page') || 0;
    if(page == 1){

    }else if(page == 2){
      this.navCtrl.push(IndustrydetialPage);
    }else if(page == 4){
      const user = window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : {};
      let uid = window.localStorage.getItem('cuid');
      this.navCtrl.push(ProjectConsultantBrowserPage, { uid: uid, type: 'homepage', userType: user.type });
    }else if(page == 5){
      this.navCtrl.push(CasemorePage);
    }else if(page == 7){
      this.selectedIndex = 1;
    }else if(page == 8){
      let pid = window.localStorage.getItem('pid');
      this.navCtrl.push(ProjectBrowserPage, { data: {pid:pid}, isApply: true });
    }else if(page == 9){
      this.navCtrl.push(SwiperDetailPage);
    }else if(page == 10){
      let selectType = window.localStorage.getItem('selectType');
      let pid = window.localStorage.getItem('pid');
      this.navCtrl.push(ConsultantProjectBrowserPage, { data: {pid:pid}, isApply: true, selectType: selectType });
    }
  }

  /*页面跳转判断*/
  goToBack(data,type) {
    if(!data.backType && data.backType != 0){
      return;
    }
    // let params = data.params ? JSON.parse(data.params) : {}
    let params = data.params;
    //跳转到顾问列表backType:0
    if(data.backType == 0){
      this.navCtrl.push(ProjectBrowserPage,{data:data});
    }
    //跳转到顾问详情backType:1
    else if(data.backType == 1){
        // this.props.history.push(`/project/${data.pid}`);
    }
    //跳转到项目详情backType:2
    else if(data.backType == 2){
      this.selectedIndex = 1;
    }
    //跳转到项目详情backType:3
    else if(data.backType == 3){
      type == 0 ? this.navCtrl.push(ProjectBrowserPage,{data:data,isTabs:true}) : this.navCtrl.push(ConsultantProjectBrowserPage,{data:data,isTabs:true});
    }
    //跳转到项目详情backType:4
    else if(data.backType == 4){
        // this.props.history.push(`/project/${data.pid}`);
    }
    //跳转到backType:5 (顾问：项目详情页，客户：顾问列表页)
    else if(data.backType == 5){
      type == 0 ? this.navCtrl.push(ProjectConsultantListPage,{pid:data.pid,status:'',data:{pid:data.pid,status:data.status},isTabs:true}) : this.navCtrl.push(ConsultantProjectBrowserPage,{data:data});
    }
    //跳转到方案backType:6
    else if(data.backType == 6){
      if(type == 0){
        this.navCtrl.push(ProjectProgramBrowserPage,{pid:data.pid,ppid:data.ppid})
      }else{
        this.navCtrl.push(ConsultantProgramListPage,{pid:data.pid,data:{pid:data.pid,appStatus:data.appStatus,finalPrice:data.finalPrice},isTabs:true});
      }
    }
    //跳转到阶段列表backType:7
    else if(data.backType == 7){
      if(type == 0){
        this.navCtrl.push(ProjectStageListPage,{pid:data.pid,status:-1,type:data.status,data:{pid:data.pid},isTabs:true})
      }else{
        this.navCtrl.push(ConsultantStageListPage,{
          pid:data.pid,
          status:'',
          projectType:data.appStatus,
          type:data.appStatus,
          programPrice:data.finalPrice,
          data:{pid:data.pid,appStatus:data.appStatus,finalPrice:data.finalPrice},isTabs:true});
      }
    }
    //跳转到阶段详情backType:8
    else if(data.backType == 8){
      if(type == 0){
        this.navCtrl.push(ProjectStageBrowserPage,{id: data.psid});
      }else{
        this.navCtrl.push(ConsultantStageBrowserPage,{id: data.psid, pid: data.pid, programPrice: data.finalPrice});
      }
    }
    //跳转到发票列表backType:10
    else if(data.backType == 10){
      if(type == 0){
        this.navCtrl.push(ProjectInvoiceListPage,{pid:data.pid,status:-1,data:{pid:data.pid},isTabs:true});
      }else{
        // this.navCtrl.push(ConsultantStageBrowserPage,{id: params.psid, pid: data.pid, programPrice: params.finalPrice});
      }
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
    const user = window.sessionStorage.getItem('user') ? JSON.parse(window.sessionStorage.getItem('user')) : { type: -1 };
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId') || window.localStorage.getItem('openId');
    if (!openId && user.status == 1) {
      this.navCtrl.push(ChooseIdentityPage);
    } else if (openId) {
      this.getUserInfoEd(openId);
      !window.sessionStorage.getItem('openId') && window.sessionStorage.setItem('openId', openId);
    } else {
      this.onLogin();
    }

    // if(user.type == -1){
    //   this.onLogin();
    // }
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
      if (code == null || code == '') {
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${openidUrl}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
      } else {
        window.localStorage.setItem('code', code);
        let url = `${openidUrl}?code=${code}`;
        this.Provider.getMamenSwiperData(url).subscribe(res => {
        }, error => {
          console.log('erros===', error);
        })
      }
    } else {
      alert('请用微信登录')
    }

  }

  /*获取用户信息*/
  getUserInfo(openId) {

    let chooseIdentyUrl = getUserByopenIdUrl + '?openId=' + openId;
    this.Provider.getMamenSwiperData(chooseIdentyUrl).subscribe(res => {
      if (res.code == 200) {
        this.user = res.data;
        window.sessionStorage.setItem('user', JSON.stringify(res.data))
        window.localStorage.setItem('user', JSON.stringify(res.data));
        // if(!this.user || this.user['status'] == 1 || this.user['status'] == 2){
        //   this.navCtrl.push(ChooseIdentityPage);
        // }
        
        if (this.user['type'] && this.user['type'] == 1) {
          this.isshow = false;
          this.tab4Root = RecommendConsultantListPage
        } else if (this.user['type'] && this.user['type'] == 0) {
          this.isshow = true;
          this.tab4Root = RecommendClientListPage;
        }
        
      } else if (res.code == 207) {
        window.localStorage.removeItem('openId');
        window.sessionStorage.removeItem('openId');
      } else if (res.code == 203) {
        window.localStorage.removeItem('openId');
        window.sessionStorage.removeItem('openId');
        // this.onLogin();
      }
    }, error => {
      console.log('erros===', error);
    })
  }

  getUserInfoEd(openId) {

    let chooseIdentyUrl = getUserByopenIdUrl + '?openId=' + openId;
    this.Provider.getMamenSwiperData(chooseIdentyUrl).subscribe(res => {
      if (res.code == 200) {
        this.user = res.data;
        window.sessionStorage.setItem('user', JSON.stringify(res.data))
        window.localStorage.setItem('user', JSON.stringify(res.data));
        if (!this.user || this.user['status'] == 1 || this.user['status'] == 2) {
          this.navCtrl.push(ChooseIdentityPage);
        }
        if (this.user['type'] && this.user['type'] == 1) {
          this.isshow = false;
          this.tab4Root = RecommendConsultantListPage
        } else if (this.user['type'] && this.user['type'] == 0) {
          this.isshow = true;
          this.tab4Root = RecommendClientListPage;
        }
      } else if (res.code == 207) {
        window.localStorage.removeItem('openId');
        window.sessionStorage.removeItem('openId');
      } else if (res.code == 203) {
        this.navCtrl.push(ChooseIdentityPage);
        window.localStorage.removeItem('openId');
        window.sessionStorage.removeItem('openId');
      }
    }, error => {
      console.log('erros===', error);
    })
  }

  ngDoCheck() {
    console.log('改变时执行')
    const user = window.sessionStorage.getItem('user') ? JSON.parse(window.sessionStorage.getItem('user')) : { type: -1 };
    if (user.type == 1) {
      this.isshow = false;
      this.tab4Root = RecommendConsultantListPage
      // }else if(user.type == 0 || user.type == -1){
    } else if (user.type == 0) {
      this.isshow = true;
      this.tab3Root = SpeedPage;
      this.tab4Root = RecommendClientListPage;
    } else if (user.type == -1) {
      this.isshow = true;
      this.tab4Root = ''
    }

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
          wx.hideOptionMenu();
        });
      }
    })
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
