import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController  } from 'ionic-angular';
import { MamenDataProvider } from '../../providers/mamen-data/mamen-data';
import { ChooseIdentityPage } from '../choose-identity/choose-identity';
import { ContactPage } from '../contact/contact';
import { bindPhoneUrl,sendSmsCodeUrl } from '../../providers/requestUrl';
// import { Keyboard } from '@ionic-native/keyboard';

/**
 * Generated class for the PhonebindPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-phonebind',
  templateUrl: 'phonebind.html',
  viewProviders: [MamenDataProvider]
  
})
export class PhonebindPage {
  public title = '手机号绑定'
  public phoneCodeText = '获取验证码';
  public isFlag = true;
  public isAgreed = false;
  public isShow = false;
  public isSend = true;

  constructor(public navCtrl: NavController, public navParams: NavParams,private Provider:MamenDataProvider,public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhonebindPage',this.navParams.get('parmens'),'---==---');
    // this.keyboard.show();
  }

  

  /*获取验证码*/
  getVerificationCode(phone){
    
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    // let getPhoneCodeUrl = 'http://mamon.yemindream.com/mamon/user/sendSmsCode';
    if(!this.isSend || !this.isFlag){
      return;
    }
    this.isSend = false;
    if(phone.value.length < 11) {
      alert('手机号格式错误')
      return;
    }
    
    let getPhoneCodeUrl = sendSmsCodeUrl+'?openId='+openId + '&phone=' + phone.value
    this.Provider.getMamenSwiperData(getPhoneCodeUrl).subscribe(res=>{
      if(res.code==200) {
        this.isFlag && this.countdown();
      }else if(res.code == 204){
        alert('手机号已存在！');
      }else{
        alert('网络异常！')
      }
      this.isSend = true;
    },error=>{
      console.log('erros===',error);
    })
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

  /*倒计时*/
  countdown(){
    this.isFlag = false;
    let count = 60;
    let setTimeInter = setInterval(()=>{
      this.phoneCodeText = '重新获取：'+ count--;
      if(count<1){
        clearInterval(setTimeInter);
        this.isFlag = true;
        this.phoneCodeText = '获取验证码';
      }
    },1000);
    this.phoneCodeText = '获取验证码';
  }

  //绑定手机号
  bindSubmit(phone, code) {
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    // let getPhoneCodeUrl = 'http://mamon.yemindream.com/mamon/user/bindPhone';
    let userType = this.navParams.get('parmens');
   
    let getPhoneCodeUrl = bindPhoneUrl+'?openId='+openId + '&phone=' + phone.value + '&code=' + code.value + '&userType='+userType;
    this.Provider.getMamenSwiperData(getPhoneCodeUrl).subscribe(res=>{
      if(res.code==200) {
        // this.navCtrl.push(ContactPage);
        this.navCtrl.popToRoot();
        alert('绑定成功！')
      }
    },error=>{
      console.log('erros===',error);
    })
  }

  showAlert() {
    if(!this.isShow) {
      this.isShow = true;
    }
  }

  onClose() {
    this.isShow = false;
  }

  onAgreedSubmit() {
    this.isAgreed = true;
    this.isShow = false;
  }

  onSelectChange() {
    
  }


  // showAlert() {
  //   const alert = this.alertCtrl.create({
  //     title: '《麦盟 XXX 条款》',
  //     subTitle: '本服务条款是您或您代表的商业实体（统称为“您”）与 MF 麦盟咨询网站 www.mf-tal.com 所有者麦理企业咨询（深圳）有限公司（统称为“我们”）之间的约定。您必须阅读、同意并接受本服务条款中包含的所有条款和条件，才能使用MF 麦盟咨询网站、相关软件和服务（统称为“ MF 麦盟咨询网站服务”）的网站。我们保留自行决定随时通过在网站上发布变更来更改本服务条款及其他相关规定的权利。如果我们自行决定对本服务条款进行任何重大更改，我们会通过MF 麦盟咨询网站上的通知或向您注册的地址发送电子邮件通知您此类更改，任何更改在发布到网站后立即生效。在任何版本的条款的修订生效日期之后继续使用MF 麦盟咨询网站服务即表示您接受修订后的条款。无论是否事先通知，我们都可以终止本服务条款授予的任何权利，您应立即遵守终止通知或其他通知，包括（如适用）停止所有对本网站的使用。',
  //     buttons: ['同意']
  //   });
  //   alert.present();
  // }

}
