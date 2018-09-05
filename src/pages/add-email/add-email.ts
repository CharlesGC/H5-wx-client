import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MamenDataProvider } from '../../providers/mamen-data/mamen-data';

import { ContactPage } from '../contact/contact';
import { getAddEmailUrl } from '../../providers/requestUrl';

/**
 * 
 * Generated class for the AddEmailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-email',
  templateUrl: 'add-email.html',
})
export class AddEmailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private Provider:MamenDataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEmailPage');
  }

  addEmailSubmit(mail) {
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId')
    // let getPhoneCodeUrl = 'http://mamon.yemindream.com/mamon/user/sendMail'
  
    let getPhoneCodeUrl = getAddEmailUrl+'?openId='+openId + '&mail=' + mail.value;
    this.Provider.getMamenSwiperData(getPhoneCodeUrl).subscribe(res=>{
      if(res.code==200) {
        // this.navCtrl.push(ChooseIdentityPage);
        alert('绑定成功！');
        this.navCtrl.push(ContactPage);
      }else{
        alert('请求出错：'+res.msg)
      }
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
  
}
