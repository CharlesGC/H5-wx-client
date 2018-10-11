import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MamenDataProvider } from '../../providers/mamen-data/mamen-data';
import { getCompanyList, getSavaraft } from '../../providers/dataUrl';
import { HttpClient, HttpParams } from '@angular/common/http';
import { hideAttentionMenuUrl, getAttentionUserInfo } from '../../providers/requestUrl'
declare var wx: any;
// import {ReleasePage} from '../release/release';

/**
 * Generated class for the CompanyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company',
  templateUrl: 'company.html',
})
export class CompanyPage {
  public companyArr: any;//获取数据数组
  public companyId: any;//公司id
  public savaraftArr: any; // 获取存为草稿数据
  public field: any;
  public fieldType: any;
  public fieldValue: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public CompanylistData: MamenDataProvider,
    public SavaraftData: MamenDataProvider, private http: HttpClient) {

  }
  ionViewDidLoad(navParams: NavParams) {
    //{callback:this.setValue,field:field,value:value,type:type}
    this.getcompanyData();
    // this.getSavaraftData();
    this.field = this.navParams.get('field');
    this.fieldType = this.navParams.get('type');
    this.fieldValue = this.navParams.get('value');
    console.log(this.field, this.fieldType, this.fieldValue)
  }
  onValueSubmit() {
    let callback = this.navParams.get('callback');
    callback(this.field, this.fieldValue);
    this.navCtrl.pop();
  }
  //调接口 获取数据
  getcompanyData() {
    let openid = this.getUrlParam('openId');
    this.CompanylistData.getCompanyData(getCompanyList, openid).subscribe(
      res => {
        console.log(1111)
        console.log(res);
        this.companyArr = res.data;
        console.log(this.companyArr);
      }, error => {
        console.log(error);
      }
    )
  }
  /*调存为测试草稿接口*/
  // getSavaraftData() {
  //   this.SavaraftData.getSavaraftTestData(getSavaraft,0,'fdf','fdf','123','123','o2GZp1Gsud1OVuaw5AH_e28m3kOw',
  // 'projectname','description','biaodi','beizhu','length6','start1','zhuchang','budgetType','budgetDay','budgeta','language','grade','qualification').subscribe(
  //     res=>{
  //     console.log(1111 +'======================');
  //     console.log(res);
  //       this.savaraftArr = res.data;
  //       console.log(this.savaraftArr);
  //     },error=>{
  //       console.log(error);
  //     }
  //   )
  // }
  /*跳转到公司选择和电话输入等页面*/
  goProject(data) {
    let callback = this.navParams.get('callback');
    callback(this.field, data);
    console.log(data.name);
    this.navCtrl.pop();
  }
  // 获取openId
  getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象  
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数  
    if (r != null) {
      return encodeURI(r[2]);  //返回参数值 
    } else {
      return null;
    }
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
}
