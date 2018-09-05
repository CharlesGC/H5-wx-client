import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';
import { addOrEditBankUrl,delBankUrl } from '../../../../providers/requestUrl';

/**
 * Generated class for the ConsultantBankAccountEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-consultant-bank-account-edit',
  templateUrl: 'consultant-bank-account-edit.html',
})
export class ConsultantBankAccountEditPage {
  public bankname:any;
  public bankaccount:any;
  public isdefault:any;
  public bankDateil:any;
  public inputName:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private Provider:MamenDataProvider) {
    this.bankDateil = {}
  }

  ionViewDidLoad() {
    this.inputName = '123213123'
    this.bankDateil = this.navParams.get('data') || {}
    this.isdefault = this.bankDateil.type == 1;
    // this.bankname = this.bankDateil;
  }

  /*提交数据*/
  onBankAccountSubmit(bankname,bankaccount) {
    console.log(bankname,bankaccount,'-----');
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    let bankDateil = this.bankDateil;
    let abid = bankDateil.abid || 0;
    // let getBankAccountlUrl = 'http://mamon.yemindream.com/mamon/adviser/addOrEditBank';
    
    let getBankAccountlUrl = addOrEditBankUrl + '?openId=' + openId + '&bankAccount='+bankname+
                          '&account='+bankaccount+
                          '&type='+(this.isdefault ? 1 : 0);
    if(abid){
      getBankAccountlUrl = getBankAccountlUrl + '&abid=' + abid;
    }
    
    this.Provider.getMamenSwiperData(getBankAccountlUrl).subscribe(res=>{
      if(res.code==200) {
        alert((abid?'修改':'新增') + '成功');
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
  /*删除提交*/
  onBankAccountDel() {
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    let bankDateil = this.bankDateil;
    let abid = bankDateil.abid || 0;
    // let getBankAccountDellUrl = 'http://mamon.yemindream.com/mamon/adviser/delBank';
    
    let getBankAccountDellUrl = delBankUrl + '?openId=' + openId  + '&abid='+abid
    
    this.Provider.getMamenSwiperData(getBankAccountDellUrl).subscribe(res=>{
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
