import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';
import { getCompanyListUrl, hideAttentionMenuUrl, getAttentionUserInfo } from '../../../../providers/requestUrl';
import { HttpClient, HttpParams } from '@angular/common/http';
/**
 * Generated class for the ProjectCompanyListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var wx: any;
@IonicPage()
@Component({
  selector: 'page-project-company-list',
  templateUrl: 'project-company-list.html',
})
export class ProjectCompanyListPage {
  public selectCompany = {};
  public companyListData = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private Provider: MamenDataProvider, private http: HttpClient) {
  }

  ionViewDidLoad() {
    this.selectCompany = this.navParams.get('data');
    console.log(this.selectCompany, 'ionViewDidLoad ProjectCompanyListPage');
    this.getCompanyListData();
  }
  ionViewDidEnter() {
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
  /*选中事件*/
  onSelectClick(id, name) {

    let callback = this.navParams.get('callback');
    let field = this.navParams.get('field');
    this.selectCompany['cid'] = id;
    this.selectCompany['companyName'] = name;
    callback(field, [this.selectCompany['cid'], this.selectCompany['companyName']]);
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

  /*公司列表数据请求*/
  getCompanyListData() {
    // let projectListsDataUrl = 'http://mamon.yemindream.com/mamon/company/getCompanyList';
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    let projectListsDataUrl = getCompanyListUrl + '?openId=' + openId;
    this.Provider.getMamenSwiperData(projectListsDataUrl).subscribe(res => {
      if (res.code == 200) {
        this.companyListData = res.data;
      } else if (res.code == 207) {
        window.localStorage.removeItem('openId');
      } else {
        alert('请求出错:' + res.msg);
      }
    }, error => {
      console.log('erros===', error);
    })
  }


}
