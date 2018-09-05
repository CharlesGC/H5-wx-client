import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';
import { ConsultantStageListPage } from '../consultant-stage-list/consultant-stage-list';

import { FormEditPage } from '../../../contact/form-edit/form-edit';
import { addOrEditStageUrl, delStageUrl } from '../../../../providers/requestUrl';

/**
 * Generated class for the ConsultantStageEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-consultant-stage-edit',
  templateUrl: 'consultant-stage-edit.html',
})
export class ConsultantStageEditPage {
  public isAdd = false;
  public stageData = {};
  public programPrice = 0;
  public dateTime: Date;
  constructor(public navCtrl: NavController, public navParams: NavParams,private Provider:MamenDataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConsultantStageEditPage');
    this.isAdd = this.navParams.get('isAdd') || false;
    this.programPrice = this.navParams.get('programPrice') || 0;
    this.stageData = this.navParams.get('data') || {};
  }

  /*列表编辑*/
  goFormEditPage(field, value, type) {
    this.navCtrl.push(FormEditPage,{callback:this.setValue,value:value,field:field,type:type});
  }

  /*设置值（回调函数）*/
  setValue = (field,value)=> {
    if(field == 'percentage'){
      this.stageData['price'] = (value || 0) * this.programPrice;
    }
    this.stageData[field] = value;
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

  /*新增、编辑请求*/
  onStageSubmitClick(psid) {
    let date = new Date();
    let pid = this.navParams.get('pid');
    let stageData = this.stageData;
    let startTime = stageData['startTime'] ?(new Date(stageData['startTime']).getFullYear() + '-' + (new Date(stageData['startTime']).getMonth() + 1) +'-'+ new Date(stageData['startTime']).getDate()) :'';
    let endTime = stageData['endTime'] ? (new Date(stageData['endTime']).getFullYear() + '-' + (new Date(stageData['endTime']).getMonth() + 1) +'-'+ new Date(stageData['endTime']).getDate()) : '';
    // let projectStageDetailUrl = 'http://mamon.yemindream.com/mamon/adviser/addOrEditStage';
    const openId = window.sessionStorage.getItem('openId')|| this.getUrlParam('openId');
    let projectStageDetailUrl = addOrEditStageUrl + '?openId=' + openId + '&pid='+pid +
                              '&stageName='+stageData['stageName']+
                              '&startTime='+startTime+
                              '&endTime='+endTime+
                              '&stageDescription='+(stageData['stageDescription'] || '')+
                              '&deliverable='+(stageData['deliverable'] || '')+
                              '&note='+(stageData['note'] || '')+
                              '&percentage='+(stageData['percentage'] || 0)+
                              '&price='+(stageData['price'] || 0)+
                              '&paymentMethod='+(stageData['paymentMethod'] || '');
    if(psid) {
      projectStageDetailUrl = projectStageDetailUrl + '&psid=' + psid;
    }
    this.Provider.getMamenSwiperData(projectStageDetailUrl).subscribe(res=>{
      if(res.code==200) {
        console.log(res,'--------');
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

  /*删除操作请求*/
  onStageDelClick(psid) {
    let stageData = this.stageData;
    // let projectStageDellUrl = 'http://mamon.yemindream.com/mamon/adviser/delStage';
    const openId = window.sessionStorage.getItem('openId')|| this.getUrlParam('openId');
    let projectStageDellUrl = delStageUrl + '?openId=' + openId + '&psid='+psid;
    this.Provider.getMamenSwiperData(projectStageDellUrl).subscribe(res=>{
      if(res.code==200) {
        alert('删除成功！')
        this.navCtrl.push(ConsultantStageListPage,{pid:this.stageData['pid'],status:-1});
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