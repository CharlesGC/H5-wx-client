import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';

import { ProjectInvoiceBrowserPage } from '../project-invoice-browser/project-invoice-browser'
import { getInvoiceListUrl } from '../../../../providers/requestUrl';
/**
 * Generated class for the ProjectInvoiceListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-project-invoice-list',
  templateUrl: 'project-invoice-list.html',
})
export class ProjectInvoiceListPage {
  public projectInvoiceListData =[];
  public isModel = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,private Provider:MamenDataProvider) {
  }

  ionViewDidLoad() {
    let pid = this.navParams.get('pid');
    let status = this.navParams.get('status');
    this.getProjectInvoiceListDataData(pid,status);
    console.log('ionViewDidLoad ProjectInvoiceListPage');
  }

  /*跳转到发票详情页面*/
  goInvoiceBrowser(data) {
    this.navCtrl.push(ProjectInvoiceBrowserPage,{id:data.id})
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

  /*项目发票列表数据请求*/
  getProjectInvoiceListDataData(pid,status) {
    // let projectPaymentUrl = 'http://mamon.yemindream.com/mamon/customer/getInvoiceList';
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    let projectPaymentUrl = getInvoiceListUrl + '?openId=' + openId + '&pid='+pid;
    if(status !== ''){
      projectPaymentUrl = projectPaymentUrl + '&type='+status;
    }
    this.Provider.getMamenSwiperData(projectPaymentUrl).subscribe(res=>{
      if(res.code==200) {
        this.projectInvoiceListData = res.data;
        if(!this.projectInvoiceListData ||  this.projectInvoiceListData.length <1) {
          this.isModel = true;
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
