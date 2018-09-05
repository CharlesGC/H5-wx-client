import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';
import { programObjectionUrl,customerNayStagePlanUrl,customerNayDocumentUrl } from '../../../../providers/requestUrl';
/**
 * Generated class for the ProjectProgramObjectionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-project-program-objection',
  templateUrl: 'project-program-objection.html',
})
export class ProjectProgramObjectionPage {
  public inputName:any;
  public title = '请写下您的修改意见';
  constructor(public navCtrl: NavController, public navParams: NavParams,private Provider:MamenDataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectProgramObjectionPage');
  }

  ionViewDidEnter() {
    let type = this.navParams.get('type');
    if(type=='program'){
      this.title = '请写下您对该方案的修改意见'
    }else if(type == 'arrStage'){
      this.title = '请写下您对阶段的修改意见'
    }else if(type == 'nayDocument') {
      this.title = '请写下您对该阶段交付物的修改意见'
    }
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

  /*提出异议请求*/
  onProgramObjectionSubmit(value) {
    let ppid = this.navParams.get('ppid');
    let pid = this.navParams.get('pid');
    let psid = this.navParams.get('psid');
    let type = this.navParams.get('type');
    let url = ''
    const openId = window.sessionStorage.getItem('openId')|| this.getUrlParam('openId');
    // let projectDetailsUrl = url + '?openId=' + openId + '&ppid='+ppid+'&opinion='+value;
    if(type=='program'){
      url = programObjectionUrl + '?openId=' + openId + '&ppid='+ppid+'&opinion='+value;;
    }else if(type == 'arrStage'){
      url = customerNayStagePlanUrl + '?openId=' + openId + '&pid='+pid+'&opinion='+value;
    }else if(type == 'nayDocument'){
      url = customerNayDocumentUrl + '?openId=' + openId + '&psid='+psid+'&opinion='+value;
    }else{
      url = url + '?openId=' + openId + '&ppid='+ppid+'&opinion='+value;
    }
    
    this.Provider.getMamenSwiperData(url).subscribe(res=>{
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
