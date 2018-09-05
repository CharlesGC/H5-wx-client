import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';

import { FormEditPage } from '../../form-edit/form-edit';
import { addOrEditCertificationUrl,delCertificationUrl } from '../../../../providers/requestUrl';
/**
 * Generated class for the ConsultantProfessionalCertificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-consultant-professional-certification',
  templateUrl: 'consultant-professional-certification.html',
})
export class ConsultantProfessionalCertificationPage {
  public certificationListData:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private Provider:MamenDataProvider) {
    this.certificationListData = {};
  }

  ionViewDidLoad() {
    this.certificationListData = this.navParams.get('data');
    console.log(this.certificationListData,'ionViewDidLoad ConsultantProfessionalCertificationPage');
  }

  /*跳转到数据处理页面*/
  goFormEditPage(field,value,type) {
    this.navCtrl.push(FormEditPage,{callback:this.setValue,value:value,field:field,type:type});
  }

  /*设置值（回调函数）*/
  setValue = (field,value)=> {
    this.certificationListData[field] = value;
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
  oncertificationExpSubmit() {
    const openId = window.sessionStorage.getItem('openId')|| this.getUrlParam('openId');
    let certificationListData = this.certificationListData;
    let acid = certificationListData.acid || 0;
    // let getProjectExpUrl = 'http://mamon.yemindream.com/mamon/adviser/addOrEditCertification';
    
    let getProjectExpUrl = addOrEditCertificationUrl + '?openId=' + openId + '&certifiedTitle='+certificationListData.certifiedTitle+
                          '&issuingAgency='+certificationListData.issuingAgency+
                          '&issuedTime='+(certificationListData.issuedTime||'')+
                          '&certifiedUrl='+certificationListData.certifiedUrl;
    if(acid){
      getProjectExpUrl = getProjectExpUrl + '&acid=' + acid;
    }
    
    this.Provider.getMamenSwiperData(getProjectExpUrl).subscribe(res=>{
      if(res.code==200) {
        alert((acid?'修改':'新增') + '成功');
        this.navCtrl.pop();
      }else if(res.code == 207) {
        window.localStorage.removeItem('openId');
      }
    },error=>{
      console.log('erros===',error);
    })
  }
  /*数据删除请求*/
  oncertificationExpDel() {
    const openId = window.sessionStorage.getItem('openId')|| this.getUrlParam('openId');
    let certificationListData = this.certificationListData;
    let acid = certificationListData.acid || 0;
    // let getProjectExpDellUrl = 'http://mamon.yemindream.com/mamon/adviser/delCertification';
    
    let getProjectExpDellUrl = delCertificationUrl + '?openId=' + openId  + '&acid='+acid
    
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
