import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { getMessageListUrl } from '../../providers/requestUrl';
import { MamenDataProvider } from '../../providers/mamen-data/mamen-data';

/**
 * Generated class for the MessageCenterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-message-center',
  templateUrl: 'message-center.html',
})
export class MessageCenterPage {
  public messageCenterList = []
  constructor(public navCtrl: NavController, public navParams: NavParams,private Provider:MamenDataProvider) {
  }

  ionViewDidLoad() {
    this.getProjectListData();
    console.log('ionViewDidLoad MessageCenterPage');
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
    // let projectListsDataUrl = 'http://mamon.yemindream.com/mamon/customer/getProjectSignUpAdviserList';
    const openId = window.sessionStorage.getItem('openId')|| this.getUrlParam('openId');
    let projectListsDataUrl = getMessageListUrl + '?openId=' + openId;
    this.Provider.getMamenSwiperData(projectListsDataUrl).subscribe(res=>{
      if(res.code==200) {
        this.messageCenterList = res.data;
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
