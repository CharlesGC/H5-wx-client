import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';

import { ConsultantBankAccountPage } from '../consultant-bank-account/consultant-bank-account'
import { FormEditPage } from '../../form-edit/form-edit'
import { editAdviserUrl,getAdviserInfoUrl } from '../../../../providers/requestUrl';

/**
 * Generated class for the ConsultantInfoUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-consultant-info-user',
  templateUrl: 'consultant-info-user.html',
})
export class ConsultantInfoUserPage {
  public userInfoData:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private Provider:MamenDataProvider) {
    this.userInfoData={};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConsultantInfoUserPage');
    this.userInfoData = this.navParams.get('consultantAdviser') || {}
  }

  //跳转到银行账号页面
  goBankAccount() {
    this.navCtrl.push(ConsultantBankAccountPage);
  }

  /*跳转到数据处理页面*/
  goFormEditPage(field,value,type) {
    if(field == 'skillList') {
      value = value && value.length ? value.map(d=>({id:d.ssid,text:d.asName})) : [];
    }else if(field == 'industryList') {
      value = value && value.length ? value.map(d=>({id:d.ilid,text:d.alName})) : [];
    }
    this.navCtrl.push(FormEditPage,{callback:this.setValue,value:value,field:field,type:type});
  }

  /*设置值（回调函数）*/
  setValue = (field,value)=> {
    if(field == 'salaryDown-salaryUp') {
      this.userInfoData['salaryDown'] = value[0];
      this.userInfoData['salaryUp'] = value[1];
    }else if(field == 'skillList'){
      this.userInfoData[field] = value && value.length>0 ? value.map(f=>({...f,ssid:f.id,asName:f.text})):[];
    }else if(field == 'industryList'){
      this.userInfoData[field] = value && value.length>0 ? value.map(f=>({...f,ilid:f.id,alName:f.text})):[];
    }else{
      this.userInfoData[field] = value;
    }
    
  }

  /*获取行业其他值*/
  getOtherIndustrys(data){
    return data.map(d=>{
      if(d.id == -1){
        return d.text;
      }else{
        return 1;
      }
    })
  }

  /*提交请求*/
  onInfoUserSubmit() {
    
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    let userInfoData = this.userInfoData;
    let uid = userInfoData.uid || 0;
    console.log(userInfoData,'userInfoData');
    userInfoData['otherIndustrys'] = this.getOtherIndustrys(userInfoData['industryList']);
    userInfoData['otherSkills'] = this.getOtherIndustrys(userInfoData['skillList']);
    let industryList = userInfoData.industryList ? userInfoData.industryList.map(f=>f.ilid).join(','):'';
    let skillList = userInfoData.skillList ? userInfoData.skillList.map(f=>f.ssid).join(','):'';
    let otherIndustrys = this.userInfoData['otherIndustrys'] && this.userInfoData['otherIndustrys'].length>0 ? this.userInfoData['otherIndustrys'].join(','): '';
    let otherSkills = this.userInfoData['otherSkills'] && this.userInfoData['otherSkills'].length>0 ? this.userInfoData['otherSkills'].join(','): '';
    console.log(industryList,123);
    // let getCompanyDetailUrl = 'http://mamon.yemindream.com/mamon/adviser/editAdviser';
    
    let getCompanyDetailUrl = editAdviserUrl + '?openId=' + openId + '&avatar='+userInfoData.avatar+
                          '&uname='+userInfoData.uname+
                          '&gender='+userInfoData.gender+
                          '&years='+userInfoData.years+
                          '&industrys='+industryList+
                          '&skills='+skillList+
                          '&salaryDown='+userInfoData.salaryUp+
                          '&salaryUp='+userInfoData.salaryDown+
                          '&address='+userInfoData.address+
                          '&otherIndustrys='+otherIndustrys+
                          '&otherSkills='+otherSkills+
                          '&introduction='+userInfoData.introduction || '';
                          // '&zipCode='+companyDetaiData.webSite;
    if(uid){
      getCompanyDetailUrl = getCompanyDetailUrl + '&uid=' + uid;
    }
    
    this.Provider.getMamenSwiperData(getCompanyDetailUrl).subscribe(res=>{
      if(res.code==200) {
        alert((uid?'修改':'新增') + '成功');
        this.navCtrl.pop();
      }else if(res.code == 207) {
        window.localStorage.removeItem('openId');
      }
    },error=>{
      console.log('erros===',error);
    })

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

  /*请求详情数据*/
  getConsultantInfoData() {
    let url = getAdviserInfoUrl;
    // let url = 'http://mamon.yemindream.com/mamon/adviser/getAdviserInfo'
  }
}
