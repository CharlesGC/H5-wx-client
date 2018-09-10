import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormEditPage } from '../../../contact/form-edit/form-edit';
import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';
import { submitDocumentUrl,delDocumentUrl } from '../../../../providers/requestUrl';

/**
 * Generated class for the ConsultantInteractionSubmitPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-consultant-interaction-submit',
  templateUrl: 'consultant-interaction-submit.html',
})
export class ConsultantInteractionSubmitPage {
  public interactionData = {}
  public isAdd = false;
  public type = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams,private Provider:MamenDataProvider) {
  }

  ionViewDidLoad() {
    this.isAdd = this.navParams.get('isAdd');
    console.log('ionViewDidLoad ConsultantInteractionSubmitPage');
    this.type = this.navParams.get('type') || 0;
    this.interactionData = this.navParams.get('data') || {}
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

  /*附件、交互物*/
  onInteractionClick() {
    let fid = 1; //上传文件返回的id;
    let pid = this.navParams.get('pid') || this.interactionData['pid'];
    let psid = this.navParams.get('psid') || this.interactionData['psid'];
    let pdid = this.navParams.get('pdid') || this.interactionData['pdid'];
    let interactionData = this.interactionData;
    // let projectStageDetailUrl = 'http://mamon.yemindream.com/mamon/adviser/submitDocument';
    const openId = window.sessionStorage.getItem('openId')|| this.getUrlParam('openId');
    let projectStageDetailUrl = submitDocumentUrl + '?openId=' + openId + '&pid='+pid +
                              '&name='+interactionData['name']+
                              '&introduction='+interactionData['introduction']+
                              '&type=' +this.type+
                              '&fid='+fid;
    if(pdid){
      projectStageDetailUrl = projectStageDetailUrl+ '&pdid='+pdid;
    }                        
    if(psid){
      projectStageDetailUrl = projectStageDetailUrl+ '&psid='+psid;
    }
    this.Provider.getMamenSwiperData(projectStageDetailUrl).subscribe(res=>{
      if(res.code==200) {
        alert('操作功能！');
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

  /*列表编辑*/
  goFormEditPage(field, value, type) {
    this.navCtrl.push(FormEditPage,{callback:this.setValue,value:value,field:field,type:type});
  }

  /*设置值（回调函数）*/
  setValue = (field,value)=> {
    this.interactionData[field] = value;
  }

  /*删除文档*/
  onDocumentDel() {
    const pdid = this.interactionData['pdid']
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');;
    let consultantDocumentDetailsUrl = delDocumentUrl + '?openId=' + openId + '&pdid ='+pdid;
    this.Provider.getMamenSwiperData(consultantDocumentDetailsUrl).subscribe(res=>{
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
