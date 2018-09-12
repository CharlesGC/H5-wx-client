import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';

import { FormEditPage } from '../../form-edit/form-edit';
import { addOrEditLanguageUrl,delLanguageUrl } from '../../../../providers/requestUrl';
/**
 * Generated class for the ConsultantLanguageExpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-consultant-language-exp',
  templateUrl: 'consultant-language-exp.html',
})
export class ConsultantLanguageExpPage {
  public languageListData:any;
  public isSubmit = false;
  public isDelete = false;
  public isComplete = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private Provider:MamenDataProvider) {
    this.languageListData = {};
  }
  sureBack() {
    this.isSubmit = !this.isSubmit;
    this.navCtrl.pop();
  }

  sureDelete() {
    this.isDelete = !this.isDelete;
    this.navCtrl.pop();
  }

  sureComplete() {
    this.isComplete = !this.isComplete;
  }
  ionViewDidLoad() {
    this.languageListData = this.navParams.get('data');
    console.log('ionViewDidLoad ConsultantLanguageExpPage');
  }

  /*跳转到数据处理页面*/
  goFormEditPage(field,value,type) {
    this.navCtrl.push(FormEditPage,{callback:this.setValue,value:value,field:field,type:type});
  }

  /*设置值（回调函数）*/
  setValue = (field,value)=> {
    this.languageListData[field] = value;
  }

  /*数据新增、编辑请求*/
  onLanguageExpSubmit() {
    const openId = window.sessionStorage.getItem('openId')||this.getUrlParam('openId');
    let languageListData = this.languageListData;
    let alid = languageListData.alid || 0;
    // let getlanguageExpUrl = 'http://mamon.yemindream.com/mamon/adviser/addOrEditLanguage';
    var arr = Object.keys(this.languageListData);
    if (arr.length < 2) {
      this.isComplete = true;
      return
    }
    let getlanguageExpUrl = addOrEditLanguageUrl + '?openId=' + openId + '&language='+languageListData.language+
                          '&grade='+languageListData.grade;
    if(alid){
      getlanguageExpUrl = getlanguageExpUrl + '&alid=' + alid;
    }
    
    this.Provider.getMamenSwiperData(getlanguageExpUrl).subscribe(res=>{
      if(res.code==200) {
        //alert((alid?'修改':'新增') + '成功');
        this.isSubmit = true;
      }else if(res.code == 207) {
        window.localStorage.removeItem('openId');
      }
    },error=>{
      console.log('erros===',error);
    })
  }

  /*数据删除请求*/
  onLanguageExpDel() {
    const openId = window.sessionStorage.getItem('openId')||this.getUrlParam('openId');
    let languageListData = this.languageListData;
    let alid = languageListData.alid || 0;
    // let getLanguageExpDellUrl = 'http://mamon.yemindream.com/mamon/adviser/delLanguage';
    
    let getLanguageExpDellUrl = delLanguageUrl + '?openId=' + openId  + '&alid='+alid
    
    this.Provider.getMamenSwiperData(getLanguageExpDellUrl).subscribe(res=>{
      if(res.code==200) {
        //alert('删除成功');
        this.isDelete = true;
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

}
