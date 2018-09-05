import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';

import { ProjectPaymentBrowserPage } from '../project-payment-browser/project-payment-browser';
import { getPaymentListUrl } from '../../../../providers/requestUrl';

/**
 * Generated class for the ProjectPaymentListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-project-payment-list',
  templateUrl: 'project-payment-list.html',
})
export class ProjectPaymentListPage {
  public paymentListData = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,private Provider:MamenDataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectPaymentListPage');
    let pid = this.navParams.get('pid');
    let status = this.navParams.get('status');
    this.getProjectDocumentListDataData(pid,status);
  }

  /*跳转到支付记录详情页面*/
  goPaymentBrowser(data) {
    this.navCtrl.push(ProjectPaymentBrowserPage,{id:data.id});
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

  /*项目文档列表数据请求*/
  getProjectDocumentListDataData(pid,status) {
    // let projectPaymentUrl = 'http://mamon.yemindream.com/mamon/customer/getPaymentList';
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    let projectPaymentUrl = getPaymentListUrl + '?openId=' + openId + '&pid='+pid;
    if(status !== ''){
      projectPaymentUrl = projectPaymentUrl + '&status='+status;
    }
    this.Provider.getMamenSwiperData(projectPaymentUrl).subscribe(res=>{
      if(res.code==200) {
        this.paymentListData = res.data;
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
