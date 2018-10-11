import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UploadfilePage } from '../../../uploadfile/uploadfile'
import { HttpClient, HttpParams } from '@angular/common/http';
import { hideAttentionMenuUrl, getAttentionUserInfo } from '../../../../providers/requestUrl'
declare var wx: any;
/**
 * Generated class for the ApplicationProjectListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-application-project-list',
  templateUrl: 'application-project-list.html',
})
export class ApplicationProjectListPage {
  public list = []

  constructor(public navCtrl: NavController, public navParams: NavParams,private http: HttpClient) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ApplicationProjectListPeage');
    let listdata = this.navParams.get('data') || '';
    console.log(listdata);
    if(listdata){
      this.list = listdata;
    }
  }
  ionViewDidEnter(){
    let listdata = this.navParams.get('data') || '';
    console.log(listdata);
    if(listdata){
      this.list = listdata;
    }
    this.isAttention();
  }
  //隐藏底部分享菜单
  isAttention() {
    // let url = location.href.split('#')[0]; // 当前网页的URL，不包含#及其后面部分
    // let data = { url: url };
    this.http.get(hideAttentionMenuUrl).subscribe(res => {
      if (res['code'] == 200) {
        wx.config({
          debug: false,
          appId: res['data'].appid,
          timestamp: res['data'].timestamp,
          nonceStr: res['data'].nonceStr,
          signature: res['data'].signature,
          jsApiList: ['hideOptionMenu']
        });
        wx.ready(function () {
          //wx.showOptionMenu();
	  wx.hideOptionMenu();
        });
      }
    })
  }
  gouploadfile(value) {
    this.navCtrl.push(UploadfilePage,{type:value,callback:this.setProjectList})
  }
  setProjectList = (value) =>{
    this.list.push(value)
    console.log(this.list)
  }
  saveProjectFile(){
    let callback = this.navParams.get('callback');
    callback(this.list)
    this.navCtrl.pop()
  }
  onDelItem(value){
    this.list.splice(value,1)
  }
  /* 根据url来判断文件类型 */
  formatTypes(value) {
    if(!value) return '';
    if (value.search(/doc/) !== -1 || value.search(/docx/) !== -1) {
      return 'doc';
    } else if (value.search(/ppt/) !== -1 || value.search(/pptx/) !== -1) {
      return 'ppt'
    } else if (value.search(/xls/) !== -1 || value.search(/xlsx/) !== -1) {
      return 'xls'
    } else if (value.search(/jpg/) !== -1 || value.search(/png/) !== -1 || value.search(/jpeg/) !== -1) {
      return 'jpg'
    } else if (value.search(/pdf/) !== -1) {
      return 'pdf'
    }
  }
}
