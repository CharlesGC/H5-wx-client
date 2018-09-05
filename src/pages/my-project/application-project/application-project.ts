import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MamenDataProvider } from '../../../providers/mamen-data/mamen-data';

import { FormEditPage } from '../../contact/form-edit/form-edit';
import { DemandContentPage } from '../../demand-content/demand-content';
import { submitApplicationUrl } from '../../../providers/requestUrl';

/**
 * Generated class for the ApplicationProjectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-application-project',
  templateUrl: 'application-project.html',
})
export class ApplicationProjectPage {
  public projectData = {};
  public tip_isShow = false;
  public success_isShow = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,private Provider:MamenDataProvider) {
  }

  ionViewDidLoad() {
    this.projectData = this.navParams.get('data');
    console.log('ionViewDidLoad ApplicationProjectPage');
  }

  /*列表编辑*/
  goFormEditPage(field, value, type) {
    this.navCtrl.push(FormEditPage,{callback:this.setValue,value:value,field:field,type:type});
  }

  /*设置值（回调函数）*/
  setValue = (field,value)=> {
    
    this.projectData[field] = value;
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

  /*提交申请*/
  onApplicationSubmit() {
    this.tip_isShow = true;
  }

  /*确定提交*/
  onDetermine() {
    let projectData = this.projectData;
    // let projectDetailsUrl = 'http://mamon.yemindream.com/mamon/adviser/submitApplication';
    const openId = window.sessionStorage.getItem('openId')|| this.getUrlParam('openId')
    let projectDetailsUrl = submitApplicationUrl + '?openId=' + openId + '&pid='+projectData['pid']+
                        '&introduction='+projectData['introduction']+
                        '&proposal='+projectData['proposal']+
                        '&pacids='+(projectData['pacids'] || '');
    this.Provider.getMamenSwiperData(projectDetailsUrl).subscribe(res=>{
      if(res.code==200) {
        this.success_isShow = true;
        // this.projectDetails = res.data;
      }else if(res.code == 207) {
        window.localStorage.removeItem('openId');
      }else{
        alert('请求出错:'+res.msg);
      }
    },error=>{
      console.log('erros===',error);
    })
  }

  /*关闭弹出窗*/
  onClose(){
    this.tip_isShow = false;
  }

  /*成功时选择*/
  onGoProjectPage() {
    this.success_isShow = false;
    // this.navCtrl.push(DemandContentPage);
    this.navCtrl.popToRoot()
  }

}
