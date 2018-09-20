import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { getMessageListUrl,readMessageUrl } from '../../providers/requestUrl';
import { MamenDataProvider } from '../../providers/mamen-data/mamen-data';
import { ProjectBrowserPage } from '../my-project/client/project-browser/project-browser';
import { ConsultantProjectBrowserPage } from '../my-project/consultant/consultant-project-browser/consultant-project-browser';

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
  public pageNum = 0;
  public pageSize = 999;
  constructor(public navCtrl: NavController, public navParams: NavParams,private Provider:MamenDataProvider) {
  }

  ionViewDidLoad() {
    this.getProjectListData();
    console.log('ionViewDidLoad MessageCenterPage');
  }

  ionViewDidEnter(){
    this.getProjectListData();
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
    let projectListsDataUrl = getMessageListUrl + '?openId=' + openId + '&pageNum=' + this.pageNum + '&pageSize='+this.pageSize;
    this.Provider.getMamenSwiperData(projectListsDataUrl).subscribe(res=>{
      if(res.code==200) {
        this.messageCenterList =  res.data &&res.data.list?res.data.list:[];
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
  goProjectBrowserPage(data) {
    const openId = window.sessionStorage.getItem('openId')|| this.getUrlParam('openId');
    let readMessageChangeUrl = readMessageUrl + '?openId=' + openId + '&mid='+data.mid;
    this.Provider.getMamenSwiperData(readMessageChangeUrl).subscribe(res=>{
      if(res.code==200) {
        if(data.userType == 0){
          this.navCtrl.push(ProjectBrowserPage,{data:data});
        }else{
          this.navCtrl.push(ConsultantProjectBrowserPage,{data:data});
        }
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
