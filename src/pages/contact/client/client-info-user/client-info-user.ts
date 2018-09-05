import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';
import { FormEditPage } from '../../form-edit/form-edit';
import { editUserUrl } from '../../../../providers/requestUrl';

/**
 * Generated class for the ClientInfoUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-client-info-user',
  templateUrl: 'client-info-user.html',
})
export class ClientInfoUserPage {
  public user:any;
  public fromData:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private Provider:MamenDataProvider) {
    this.user = {};
    this.fromData = {}
  }

  ionViewDidLoad() {
    this.user = this.navParams.get('user');
    console.log('ionViewDidLoad ClientInfoUserPage');
  }


  /*基本信息提交*/
  onCustomerSubmit() {
    // let customerUrl = 'http://mamon.yemindream.com/mamon/user/editUser';
    let user = this.user;
    const openId = window.sessionStorage.getItem('openId')|| this.getUrlParam('openId');
    let customerUrl = editUserUrl + '?openId=' + openId + '&avatar='+user.avatar + '&name='+user.nickName+'&gender='+user.gender;
    this.Provider.getMamenSwiperData(customerUrl).subscribe(res=>{
      if(res.code==200) {
        alert('编辑成功');
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

  // /*跳转到数据处理页面*/
  // goFormEditPage(field,value) {
  //   this.navCtrl.push(FormEditPage,{callback:this.setValue,value:value,field:field});
  // }

  // /*设置值（回调函数）*/
  // setValue = (field,value)=> {
  //   this.user[field] = value;
  // }

   /*跳转到数据处理页面*/
   goFormEditPage(field,value,type) {
    this.navCtrl.push(FormEditPage,{callback:this.setValue,value:value,field:field,type:type});
  }

  /*设置值（回调函数）*/
  setValue = (field,value)=> {
    this.user[field] = value;
  }

}