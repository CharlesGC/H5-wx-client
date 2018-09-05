import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';

import { FormEditPage } from '../../form-edit/form-edit';
import { addOrEditProjectExpUrl,delProjectExpUrl } from '../../../../providers/requestUrl';
/**
 * Generated class for the ConsultantProjectExpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-consultant-project-exp',
  templateUrl: 'consultant-project-exp.html',
})
export class ConsultantProjectExpPage {
  public projecListData:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private Provider:MamenDataProvider) {
    this.projecListData = {};
  }

  ionViewDidLoad() {
    this.projecListData = this.navParams.get('data') || {};
    console.log('ionViewDidLoad ConsultantProjectExpPage');
  }

  /*跳转到数据处理页面*/
  goFormEditPage(field,value,type) {
    this.navCtrl.push(FormEditPage,{callback:this.setValue,value:value,field:field,type:type});
  }

  /*设置值（回调函数）*/
  setValue = (field,value)=> {
    this.projecListData[field] = value;
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

  /*数据新增、编辑请求*/
  onProjectExpSubmit() {
    const openId = window.sessionStorage.getItem('openId') ||this.getUrlParam('openId');
    let projecListData = this.projecListData;
    let apeid = projecListData.apeid || 0;
    // let getProjectExpUrl = 'http://mamon.yemindream.com/mamon/adviser/addOrEditProjectExp';
    
    let getProjectExpUrl = addOrEditProjectExpUrl + '?openId=' + openId + '&projectName='+projecListData.projectName+
                          '&companyName='+projecListData.companyName+
                          '&startTime='+(projecListData.startTime||'')+
                          '&endTime='+(projecListData.endTime||'')+
                          '&projectDetails='+projecListData.projectDetails+
                          '&role='+projecListData.role+
                          '&responsibility='+projecListData.responsibility;
    if(apeid){
      getProjectExpUrl = getProjectExpUrl + '&apeid=' + apeid;
    }
    
    this.Provider.getMamenSwiperData(getProjectExpUrl).subscribe(res=>{
      if(res.code==200) {
        alert((apeid?'修改':'新增') + '成功');
        this.navCtrl.pop();
      }else if(res.code == 207) {
        window.localStorage.removeItem('openId');
      }
    },error=>{
      console.log('erros===',error);
    })
  }

  /*数据删除请求*/
  onProjectExpDel() {
    const openId = window.sessionStorage.getItem('openId') ||this.getUrlParam('openId');
    let projecListData = this.projecListData;
    let apeid = projecListData.apeid || 0;
    // let getProjectExpDellUrl = 'http://mamon.yemindream.com/mamon/adviser/delProjectExp';
    
    let getProjectExpDellUrl = delProjectExpUrl + '?openId=' + openId  + '&apeid='+apeid
    
    this.Provider.getMamenSwiperData(getProjectExpDellUrl).subscribe(res=>{
      if(res.code==200) {
        alert('删除成功');
        this.navCtrl.pop();
      }else if(res.code == 207) {
        window.localStorage.removeItem('openId');
      }
    },error=>{
      console.log('erros===',error);
    })
  }
}
