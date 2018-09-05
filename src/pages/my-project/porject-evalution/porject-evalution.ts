import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MamenDataProvider } from '../../../providers/mamen-data/mamen-data';
import { projectEvaluateUrl } from '../../../providers/requestUrl';

/**
 * Generated class for the PorjectEvalutionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-porject-evalution',
  templateUrl: 'porject-evalution.html',
})
export class PorjectEvalutionPage {

  public inputName:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private Provider:MamenDataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectProgramObjectionPage');
  }

  /*取消请求*/
  onCancelClick() {
    this.navCtrl.pop();
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

  /*评价请求*/
  onProgramObjectionSubmit(value) {
    let pid = this.navParams.get('pid');
    // let projectDetailsUrl = 'http://mamon.yemindream.com/mamon/customer/getProjectProgramDeatil';
    const openId = window.sessionStorage.getItem('openId')|| this.getUrlParam('openId');
    let projectDetailsUrl = projectEvaluateUrl + '?openId=' + openId + '&pid='+pid + '&evaluation='+value;
    this.Provider.getMamenSwiperData(projectDetailsUrl).subscribe(res=>{
      if(res.code==200) {
        alert('操作成功！');
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
