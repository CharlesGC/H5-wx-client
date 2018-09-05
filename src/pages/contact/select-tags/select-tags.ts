import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MamenDataProvider } from '../../../providers/mamen-data/mamen-data';
import { getIndustryListUrl,getSkillUrl,getSkillSecondaryUrl } from '../../../providers/requestUrl';

/**
 * Generated class for the SelectTagsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-tags',
  templateUrl: 'select-tags.html',
})
export class SelectTagsPage {
  public selectListData:any;
  public inputName:any;
  public checkedData:any;
  public isAdd:boolean;
  public type:any;
  public skillList = [];
  public skillSecondaryList = [];
  public skillChecked:any;
  public isSkillSecondary=true;
  constructor(public navCtrl: NavController, public navParams: NavParams, private Provider:MamenDataProvider) {
    this.selectListData = []
    this.inputName = ''
    this.checkedData = {};
    this.type=''
    this.skillChecked = 0;
  }

  ionViewDidLoad() {
    this.checkedData = this.navParams.get('data') || {};
    this.isAdd = this.checkedData['id'] ? false : true
    this.inputName = this.checkedData['text'];
    this.type = this.navParams.get('type')
    if(this.type=='industryList'){
      this.getpaymentListData('');
    }else{
      this.getSkillData('','');
    }

    console.log(this.type,this.isAdd,this.inputName,this.checkedData,'ionViewDidLoad SelectTagsPage');
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

  /*行业请求*/
  getpaymentListData(value) {
    // let getpaymentListUrl = 'http://mamon.yemindream.com/mamon/company/getIndustryList';
    
    const openId = window.sessionStorage.getItem('openId') ||this.getUrlParam('openId');
    let getpaymentListUrl = getIndustryListUrl + '?openId=' + openId;
    if(value){
      getpaymentListUrl = getpaymentListUrl+ '&search='+value;
    }
    this.Provider.getMamenSwiperData(getpaymentListUrl).subscribe(res=>{
      if(res.code==200) {
        this.selectListData = res.data.length>0 ? res.data.map(f=>({text:f.industryName,id:f.ilid})):[];
      }else if(res.code == 207) {
        window.localStorage.removeItem('openId');
      }
    },error=>{
      console.log('erros===',error);
    })
  }

  /*技能 请求*/
  getSkillData(sfid,search) {
    // let getpaymentListUrl = 'http://mamon.yemindream.com/mamon/index/getSkill?type=1';
    let getpaymentListUrl = getSkillUrl + '?type=1';
    if(sfid) {
      // getpaymentListUrl = 'http://mamon.yemindream.com/mamon/index/getSkillSecondary?sfid='+sfid;
      getpaymentListUrl = getSkillSecondaryUrl + '?sfid='+sfid;
    }
    if(search){
      // getpaymentListUrl = 'http://mamon.yemindream.com/mamon/index/getSkillSecondary?search='+search;
      getpaymentListUrl =  getSkillSecondaryUrl + '?search='+search;
    }
    
    getpaymentListUrl = getpaymentListUrl;
    this.Provider.getMamenSwiperData(getpaymentListUrl).subscribe(res=>{
      if(res.code==200) {
        if(!search && !sfid) {
          this.skillList = res.data && res.data.list.length>0 ? res.data.list.map(f=>({text:f.fName,id:f.sfid})):[];
          console.log(this.skillList,'this.skillList')
        }else{
          this.skillSecondaryList = res.data && res.data.list.length>0 ? res.data.list.map(f=>({text:f.sName,id:f.sfid})):[];
          if(this.skillSecondaryList.length<1){
            this.isSkillSecondary=false;
          }else{
            this.isSkillSecondary=true;
          }
          console.log(this.skillSecondaryList,'this.skillSecondaryList')
        }
        
      }else if(res.code == 207) {
        window.localStorage.removeItem('openId');
      }
    },error=>{
      console.log('erros===',error);
    })
  }

  /*请求二级技能*/
  onSkillSecondaryList(value,index)  {
    console.log(value,'点击一级技能 ');
    this.skillChecked = index;
    this.getSkillData(value.id,'');
  }

  /*输入框改变时执行*/
  onInputChange(type) {
    console.log(type,'typetypetypetype')
    if(type == 'industryList'){
      this.getpaymentListData(this.inputName)
    }else {
      this.getSkillData('',this.inputName);
    }
  }

  /*点击选择行业*/
  onSelectClick(valueObj){
    this.inputName = valueObj.text || '';
    let callback = this.navParams.get('callback');
    let index = this.navParams.get('index') || 0;
    callback(this.isAdd,valueObj,index);
    this.navCtrl.pop();
  }

  /*删除*/
  onSelectDel() {
    let callback = this.navParams.get('callback');
    let index = this.navParams.get('index') || 0;
    callback(this.isAdd,'del',index);
    this.navCtrl.pop();
  }

  /*保存返回上一层*/
  onGoFormEditSubmit() {
    
  }

}
