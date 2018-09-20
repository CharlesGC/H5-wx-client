import { Component } from '@angular/core';
import { NavController,LoadingController  } from 'ionic-angular';
import { PhonebindPage } from '../phonebind/phonebind';
import { RegisterPage } from '../register/register';
import { ChooseIdentityPage } from '../choose-identity/choose-identity';
import { MamenDataProvider } from '../../providers/mamen-data/mamen-data';
import { SetAccountPage } from '../set-account/set-account';
import { AddEmailPage } from '../add-email/add-email';
import { ClientBasicPage } from './client/client-basic/client-basic';
import { ConsultantBasicPage } from './consultant/consultant-basic/consultant-basic';
import { ProjectListPage } from '../my-project/client/project-list/project-list';
import { ConsultantProjectListPage } from '../my-project/consultant/consultant-project-list/consultant-project-list';
import { ProjectProgramObjectionPage } from '../my-project/client/project-program-objection/project-program-objection';
import { MessageCenterPage } from '../message-center/message-center';
import { getUserByopenIdUrl,getWxOpenidUrl } from '../../providers/requestUrl';


// 引入微信服务
declare let Wechat;

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
  viewProviders: [MamenDataProvider]
})
export class ContactPage {
  // public url="http://mamon.yemindream.com/mamon/wechat/WxLogin";
  public items =[];
  public isLogin = false;
  public user ={};
  public singleValue =10
  // public isshow=true;
  public isGoto = false;
  constructor(public navCtrl: NavController,private Provider:MamenDataProvider,public loadingCtrl:LoadingController) {
    
  }

  ionViewDidLoad(){
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId') || window.localStorage.getItem('openId');;
    if(!openId) {
      this.onLogin();
    }else{
      this.getUserInfo(openId);
    }
    
  }

  itemSelected(item){

  }

  //跳转到我的项目页面
  goMyProjectPage() {
    // this.navCtrl.push(ConsultantProjectListPage);
    // this.navCtrl.push(ProjectProgramObjectionPage);
    // this.navCtrl.push(ProjectListPage);
    const user = window.sessionStorage.getItem('user') ? JSON.parse(window.sessionStorage.getItem('user')) : {};
    if(user.type == 1){
      this.navCtrl.push(ConsultantProjectListPage);
    }else if(user.type == 0){
      // user.projectCount>0 && this.navCtrl.push(ProjectListPage);
     this.navCtrl.push(ProjectListPage);
    }
    
  }

  //跳转到消息中心
  goMessageCenterPage() {
    this.navCtrl.push(MessageCenterPage);
  }

  
  //判断是否跳转页面
  goPhonebind(){
    this.navCtrl.push(PhonebindPage);
    
  }
  goToOtherPage() {

  }
  //跳转注册页面
  goRegisterPage() {
    this.navCtrl.push(RegisterPage);
  }

  //跳转选择身份页面
  goChooseIdentityPage() {
    this.navCtrl.push(ChooseIdentityPage);
  }

  //跳转设置账号页面
  goSetAccount() {
    if(this.user){
      console.log(this.user['uphone'],this.user['email'],'**')
      this.navCtrl.push(SetAccountPage,{uphone:this.user['uphone'],email:this.user['email'],emailStatus:this.user['emailStatus']});
    }
  }

  //跳转绑定邮箱页面
  goAddEmailPage(){
    this.navCtrl.push(AddEmailPage);
  }

  //跳转到个人信息（客户）
  goClientBasic() {
    const user = window.sessionStorage.getItem('user') ? JSON.parse(window.sessionStorage.getItem('user')) : {};
    if(user.type == 1){
      this.navCtrl.push(ConsultantBasicPage);
    }else if(user.type == 0){
      this.navCtrl.push(ClientBasicPage,{user:user});
    }
  }

  ionViewDidEnter() {
    let elements = document.querySelectorAll(".tabbar");
    if (elements != null) {
      Object.keys(elements).map((key) => {
        if(elements[key].style.display == 'none'){
          elements[key].style.display = 'flex'
        }
      });
    }
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId') || window.localStorage.getItem('openId');
    const user = window.sessionStorage.getItem('user') ? JSON.parse(window.sessionStorage.getItem('user')) : {'status':1};
    const usertype = window.sessionStorage.getItem('status') ? Number(window.sessionStorage.getItem('status')) : this.getUrlParam('status');
    if(openId){
      window.sessionStorage.setItem('openId',openId);
      window.localStorage.setItem('openId',openId);
      this.getUserInfo(openId);
    }
    // if(openId) {
    //   window.sessionStorage.setItem('openId',openId);
    //   if(Number(user.status) == 1){
    //     this.navCtrl.push(ChooseIdentityPage);
    //   }else if(Number(user.status) == 2) {
    //     this.navCtrl.push(ChooseIdentityPage);
    //   }else{
    //     this.getUserInfo(openId);
    //   }
    // }
    if(openId && user) {
      this.isLogin = true;
      this.user = user
    }
  }

  getUserInfo(openId) {
    // let chooseIdentyUrl = 'http://mamon.yemindream.com/mamon/wechat/getUserByopenId?';
    // chooseIdentyUrl = chooseIdentyUrl + 'token=' + token + '&type=' + this.userType[this.relationship];

    let chooseIdentyUrl = getUserByopenIdUrl + '?openId=' + openId;
    this.Provider.getMamenSwiperData(chooseIdentyUrl).subscribe(res=>{
      if(res.code==200) {
        this.user = res.data;
        if(!this.user || this.user['status'] == 1 || this.user['status'] == 2){
          !this.isGoto && this.navCtrl.push(ChooseIdentityPage);
          this.isGoto = true;
        }
        window.sessionStorage.setItem('user',JSON.stringify(res.data))
        window.localStorage.setItem('user',JSON.stringify(res.data));
      }else if(res.code == 207) {
        window.localStorage.removeItem('openId');
        window.sessionStorage.removeItem('openId');
      }else if(res.code == 203) {
        window.localStorage.removeItem('openId');
        window.sessionStorage.removeItem('openId');
        this.onLogin();
      }
    },error=>{
      console.log('erros===',error);
    })
  }
  
  onLogin() {
    // var ua = navigator.userAgent.toLowerCase();
    // var isWeixin = ua.indexOf('micromessenger') != -1;
    // if (isWeixin) {
    //   const appid = 'wxc7d4e3e94ad5b330';
    //   const code = this.getUrlParam('code') || window.localStorage.getItem('code');
    //   const local = window.location.href;
    //   if(code == null || code == '') {
    //     window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+appid + '&redirect_uri=http://mamon.yemindream.com/mamon/wechat/getWxOpenid&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
    //   }else{
    //     window.localStorage.setItem('code',code);
    //     let url = 'http://mamon.yemindream.com/mamon/wechat/getWxOpenid?code=' +code;
    //     this.Provider.getMamenSwiperData(url).subscribe(res=>{
    //       console.log(res,'-----------');
    //     },error=>{
    //       console.log('erros===',error);
    //     })
    //   }
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
            console.log(res,'-----------');
          },error=>{
            console.log('erros===',error);
          })
        }
    }else{
      alert('请用微信登录')
    }

    // let url = "http://mamon.yemindream.com/mamon/backstageuser/login?bucode=1241423&pwd=1111"
    
    // let url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc7d4e3e94ad5b330&redirect_uri=http://mamon.yemindream.com/mamon/wechat/getWxOpenid&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"
    // this.Provider.getMamenSwiperData(this.url).subscribe(res=>{
    //   console.log(res,'-----------');
    // },error=>{
    //   console.log('erros===',error);
    // })
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
 weChatAuth() {
  let loading = this.loadingCtrl.create({
    content: "跳转微信登录中...",//loading框显示的内容
    dismissOnPageChange: true, // 是否在切换页面之后关闭loading框
    showBackdrop: true  //是否显示遮罩层
  });
  loading.present();
  try {
    let scope = "snsapi_userinfo",
      state = "_" + (+new Date());
    Wechat.auth(scope, state, (response) => {
      alert(JSON.stringify(response));
    }, (reason) => {
      alert("Failed: " + reason);
    });
  } catch (error) {
    console.log(error);
  } finally {
    loading.dismiss();
  }
}

goPhonebindPage(){
  this.navCtrl.push(PhonebindPage);
}


//  weChatAuth() {
//   let loading = this.loadingCtrl.create({
//       content: "跳转微信登录中...",//loading框显示的内容
//       dismissOnPageChange: true, // 是否在切换页面之后关闭loading框
//       showBackdrop: true  //是否显示遮罩层
//   });
//   loading.present();
//   try {
//       let scope = "snsapi_userinfo",
//           state = "_" + (+new Date());
//       // 1. 获取code
//       Wechat.auth(scope, state, (response) => {
//           var appId = "wxc7d4e3e94ad5b330";
//           let appSecret = "a530d135d97dd51cc73659e3874cb254";
//           // 2. 获取token，openID
//           Wechat.auth('https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + appId + '&secret=' + appSecret + '&code=' + response.code + '&grant_type=authorization_code', function (accessTokenResponse) {
//               var accessToken = accessTokenResponse.access_token;
//               var openId = accessTokenResponse.openid;
//               console.log(accessTokenResponse);
//               // 3. 获取用户信息
//               Wechat.auth('https://api.weixin.qq.com/sns/userinfo?access_token=' + accessToken + '&openid=' + openId + '&lang=zh_CN', function (userInfoResponse) {
//                   console.log(userInfoResponse); // 用户信息

//                   // openid    普通用户的标识，对当前开发者帐号唯一
//                   // nickname    普通用户昵称
//                   // sex    普通用户性别，1为男性，2为女性
//                   // province    普通用户个人资料填写的省份
//                   // city    普通用户个人资料填写的城市
//                   // country    国家，如中国为CN
//                   // headimgurl    用户头像，最后一个数值代表正方形头像大小（有0、46、64、96、132数值可选，0代表640*640正方形头像），用户没有头像时该项为空
//                   // privilege    用户特权信息，json数组，如微信沃卡用户为（chinaunicom）
//                   // unionid    用户统一标识。针对一个微信开放平台帐号下的应用，同一用户的unionid是唯一的。
//               });
//           });
//       }, (reason) => {
//           alert("Failed: " + reason);
//       });
//   } catch (error) {
//       console.log(error);
//   } finally {
//       loading.dismiss();
//   }

// }

}
