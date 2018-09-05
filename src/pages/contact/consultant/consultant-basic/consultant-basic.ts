import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController  } from 'ionic-angular';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {FileTransfer, FileUploadOptions, FileTransferObject} from '@ionic-native/file-transfer';
import {File} from '@ionic-native/file';

import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';

import { ConsultantInfoUserPage } from '../consultant-info-user/consultant-info-user';
import { ConsultantProfessionalCertificationPage } from '../consultant-professional-certification/consultant-professional-certification';
import { ConsultantProjectExpPage } from '../consultant-project-exp/consultant-project-exp';
import { ConsultantWorkExpPage } from '../consultant-work-exp/consultant-work-exp';
import { ConsultantLanguageExpPage } from '../consultant-language-exp/consultant-language-exp';
import { ConsultantEducationExpPage } from '../consultant-education-exp/consultant-education-exp'
import { getAdviserDetailUrl } from '../../../../providers/requestUrl';

/**
 * Generated class for the ConsultantBasicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-consultant-basic',
  templateUrl: 'consultant-basic.html',
})
export class ConsultantBasicPage {
  path: string;
  fileTransfer: FileTransferObject = this.transfer.create();
  public consultantBasicData:any;
  public isLoading=true;
  constructor(public navCtrl: NavController, public navParams: NavParams, private Provider:MamenDataProvider,public loadingCtrl: LoadingController,private camera: Camera,
    private transfer: FileTransfer, private file: File,) {
    this.consultantBasicData={};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConsultantBasicPage');
    this.getConsultantBasicData();
    this.presentLoading(true);
  }
  ionViewDidEnter() {
    this.getConsultantBasicData();
  }

  presentLoading(isLoading) {
    console.log(isLoading,'===');
    let loader = this.loadingCtrl.create({
      content: "加载中",
      duration: 100
    });
    
    if(!isLoading){
      console.log(loader,'loader');
      loader && loader.dismiss();
    }else{
      loader.present();
    }
  }

  /*跳转页面*/
  onGoPages(type,data) {

    if(type==0) {
      //跳转至编辑用户基本信息
      this.navCtrl.push(ConsultantInfoUserPage,{consultantAdviser:this.consultantBasicData});

    }else if(type == 1){
      //跳转至编辑工作经验
      this.navCtrl.push(ConsultantWorkExpPage,{data:(data?data:{})});

    }else if(type == 2){
      //跳转至编辑项目经验
      this.navCtrl.push(ConsultantProjectExpPage,{data:(data?data:{})});

    }else if(type == 3){
      //跳转至编辑项目经验
      this.navCtrl.push(ConsultantEducationExpPage,{data:(data?data:{})});

    }else if(type == 4){
      //跳转至编辑项目经验
      this.navCtrl.push(ConsultantLanguageExpPage,{data:(data?data:{})});

    }else if(type == 5){
      //跳转至编辑专业认证
      console.log(data,'data~~~~');
      this.navCtrl.push(ConsultantProfessionalCertificationPage,{data:(data?data:{})});

    }
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

  /*顾问个人信息请求*/
  getConsultantBasicData(){
    // let getCompanyListUrl = 'http://mamon.yemindream.com/mamon/adviser/getAdviserDetail';
    const openId = window.sessionStorage.getItem('openId')|| this.getUrlParam('openId');
    let getCompanyListUrl = getAdviserDetailUrl + '?openId=' + openId;
    this.Provider.getMamenSwiperData(getCompanyListUrl).subscribe(res=>{
      if(res.code==200) {
        this.consultantBasicData = res.data;
        this.isLoading = false
        this.presentLoading(false);
      }else if(res.code == 207) {
        window.localStorage.removeItem('openId');
      }
    },error=>{
      console.log('erros===',error);
    })
  }

}