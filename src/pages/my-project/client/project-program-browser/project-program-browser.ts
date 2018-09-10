import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';
import { ProjectProgramObjectionPage } from '../project-program-objection/project-program-objection';
import { getProjectProgramDeatilUrl,confirmProgramUrl } from '../../../../providers/requestUrl';

/**
 * Generated class for the ProjectProgramBrowserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-project-program-browser',
  templateUrl: 'project-program-browser.html',
})
export class ProjectProgramBrowserPage {
  public projectProgramDetails = {};
  constructor(public navCtrl: NavController, public navParams: NavParams,private Provider:MamenDataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectProgramBrowserPage');
    let ppid = this.navParams.get('ppid');
    this.getProjectListData(ppid)
  }
  ionViewDidEnter() {
    let ppid = this.navParams.get('ppid');
    this.getProjectListData(ppid)
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

  /*项目方案详情数据请求*/
  getProjectListData(ppid) {
    // let projectDetailsUrl = 'http://mamon.yemindream.com/mamon/customer/getProjectProgramDeatil';
    const openId = window.sessionStorage.getItem('openId')|| this.getUrlParam('openId');
    let projectDetailsUrl = getProjectProgramDeatilUrl + '?openId=' + openId + '&ppid='+ppid;
    this.Provider.getMamenSwiperData(projectDetailsUrl).subscribe(res=>{
      if(res.code==200) {
        console.log(res,'--------');
        this.projectProgramDetails = res.data;
      }else if(res.code == 207) {
        window.localStorage.removeItem('openId');
      }else{
        alert('请求出错:'+res.msg);
      }
    },error=>{
      console.log('erros===',error);
    })
  }

  /*提出异议*/
  onObjectionClick() {
    let ppid = this.navParams.get('ppid');
    this.navCtrl.push(ProjectProgramObjectionPage,{type:'program',ppid:ppid});
  }

  /*确认方案请求*/
  onConfirmProgramSubmit() {
    let ppid = this.navParams.get('ppid');
    // let projectDetailsUrl = 'http://mamon.yemindream.com/mamon/customer/confirmProgram';
    const openId = window.sessionStorage.getItem('openId')|| this.getUrlParam('openId');
    let projectDetailsUrl = confirmProgramUrl + '?openId=' + openId + '&ppid='+ppid + '&status=2';
    this.Provider.getMamenSwiperData(projectDetailsUrl).subscribe(res=>{
      if(res.code==200) {
        alert('操作成功！');
        this.navCtrl.pop();
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
