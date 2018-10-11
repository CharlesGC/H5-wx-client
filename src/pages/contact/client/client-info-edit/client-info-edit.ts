import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';

import { ClientPaymentInfoPage } from '../client-payment-info/client-payment-info';
import { ClientInvoiceEditPage } from '../client-invoice-edit/client-invoice-edit';
import { FormEditPage } from '../../form-edit/form-edit';

import { delCompanyUrl, getCompanyDetailUrl, addOrUpdateCompanyUrl } from '../../../../providers/requestUrl';
import { STATE_NEW } from 'ionic-angular/umd/navigation/nav-util';
import { HttpClient, HttpParams } from '@angular/common/http';
import { hideAttentionMenuUrl, getAttentionUserInfo } from '../../../../providers/requestUrl'
declare var wx: any;


/**
 * Generated class for the ClientInfoEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-client-info-edit',
  templateUrl: 'client-info-edit.html',
})
export class ClientInfoEditPage {
  public isShow = false;
  public companyDetaiData = {};
  public user = {};
  public isdefault = true;
  public cid = '';
  public isPhoneProper = false;
  public isComplete = false
  public isSuccess = false
  public isDisabled: any
  public isfailed = false
  constructor(public navCtrl: NavController, public navParams: NavParams, private Provider: MamenDataProvider, private http: HttpClient) {
    // this.companyDetaiData = {}
  }

  ionViewDidLoad() {
    this.user = this.navParams.get('user') || {};
    this.getCompanyDetailData();
    console.log('ionViewDidLoad ClientInfoEditPage');
  }
  ionViewDidEnter() {
    this.isAttention();
    this.cid = this.navParams.get('cid') || ''
    //进行判断（在返回要重新拉取数据时回调）
    // this.getCompanyDetailData();
  }

  /*跳转到付款人页面*/
  goPaymentInfo() {
    this.companyDetaiData['cid'] && this.navCtrl.push(ClientPaymentInfoPage, { companyDetaiData: this.companyDetaiData });
  }

  /*跳转到发票信息页面*/
  goInvoiceInfo() {
    this.companyDetaiData['cid'] && this.navCtrl.push(ClientInvoiceEditPage, { companyDetaiData: this.companyDetaiData });
  }

  /*点击删除弹出确认框*/
  onDeleteItem() {
    this.isShow = !this.isShow;
    //this.navCtrl.pop()
  }

  // 电话确定
  surePhone() {
    this.isPhoneProper = !this.isPhoneProper;
    return
  }
  sureComplete() {
    this.isComplete = !this.isComplete
    return
  }
  sureSuccess() {
    this.isSuccess = !this.isSuccess
    this.navCtrl.pop()
  }
  sureFailed() {
    this.isfailed = !this.isfailed
    return
  }

  /*跳转到数据处理页面*/
  goFormEditPage(field, value, type) {

    if (field == 'skillList') {
      value = value && value.length ? value.map(d => ({ id: d.asId, text: d.asName })) : [];
    } else if (field == 'industryList') {
      value = value && value.length ? value.map(d => ({ id: d.ilid, text: d.industryName })) : [];
    }
    // if(field == 'skillList') {
    //   value = value && value.length ? value.map(d=>({id:d.ssid,text:d.asName})) : [];
    // }else if(field == 'industryList') {
    //   value = value && value.length ? value.map(d=>({id:d.ilid,text:d.alName})) : [];
    // }
    this.navCtrl.push(FormEditPage, { callback: this.setValue, value: value, field: field, type: type });
  }

  /*设置值（回调函数）*/
  setValue = (field, value) => {
    if (field == 'province-city') {
      this.companyDetaiData['province'] = value['province']
      this.companyDetaiData['city'] = value['city']
    } else if (field == 'industryList') {
      this.companyDetaiData[field] = value && value.length > 0 ? value.map(f => ({ ...f, ilid: f.id, industryName: f.text })) : [];
    } else {
      this.companyDetaiData[field] = value;
    }
    console.log(field, value, '设置值（回调函数）')
  }

  /*确定删除提交*/
  onCompanyDel() {
    let cid = this.navParams.get('cid') || 0;
    // let getCompanyDetailUrl = 'http://mamon.yemindream.com/mamon/company/delCompany';
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    let getCompanyDetailUrl = delCompanyUrl + '?openId=' + openId + '&cid=' + cid;
    this.Provider.getMamenSwiperData(getCompanyDetailUrl).subscribe(res => {
      if (res.code == 200) {
        this.isShow = !this.isShow;
        this.navCtrl.pop()
      } else if (res.code == 207) {
        window.localStorage.removeItem('openId');
      }
    }, error => {
      console.log('erros===', error);
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

  /*点击弹框关闭*/
  onClose() {
    this.isShow = !this.isShow;
  }

  getCompanyDetailData() {
    let cid = this.navParams.get('cid') || 0;
    // let getCompanyDetailUrl = 'http://mamon.yemindream.com/mamon/company/getCompanyDetail';
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId')
    let getCompanyDetailDataUrl = getCompanyDetailUrl + '?openId=' + openId + '&cid=' + cid;
    this.Provider.getMamenSwiperData(getCompanyDetailDataUrl).subscribe(res => {
      if (res.code == 200) {
        this.companyDetaiData = res.data || {};
        this.isdefault = this.companyDetaiData['priority']
      } else if (res.code == 207) {
        window.localStorage.removeItem('openId');
      }
    }, error => {
      console.log('erros===', error);
    })
  }

  /*获取行业其他值*/
  getOtherIndustrys(data) {
    if (!data) { return '' }
    return data.map(d => {
      if (d.id == -1) {
        return d.text;
      } else {
        return 1;
      }
    })
  }


  /*公司的新增、编辑*/
  onCompanySubmit() {
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId') || 'o2GZp1Gsud1OVuaw5AH_e28m3kOw';
    let newCompanyDetaiData = this.companyDetaiData || {};
    let cid = newCompanyDetaiData['cid'] || 0;
    // let industryList = companyDetaiData.industryList ? companyDetaiData.industryList.map(f=>f.ilid).join(','):'';
    let industryList = newCompanyDetaiData['industryList'] ? newCompanyDetaiData['industryList'].map(f => f.ilid).join(',') : '';
    //console.log(industryList, 123);
    newCompanyDetaiData['otherIndustrys'] = this.getOtherIndustrys(newCompanyDetaiData['industryList']);
    let otherIndustrys = this.companyDetaiData['otherIndustrys'] && this.companyDetaiData['otherIndustrys'].length > 0 ? this.companyDetaiData['otherIndustrys'].join(',') : '';
    // let getCompanyDetailUrl = 'http://mamon.yemindream.com/mamon/company/addOrUpdateCompany';
    if (Object.keys(this.companyDetaiData).length < 8) {
      this.isComplete = true
      console.log('cancel')
      return
    }
    var regPhone = /^[0-9]{8,11}$/;
    if (regPhone.test(newCompanyDetaiData['companyPhone']) == false) {
      this.isPhoneProper = true;
      return;
    }
    this.isDisabled = 'disabled'
    let getCompanyDetailUrl = addOrUpdateCompanyUrl + '?openId=' + openId + '&name=' + newCompanyDetaiData['companyName'] +
      '&province=' + newCompanyDetaiData['province'] +
      '&city=' + newCompanyDetaiData['city'] +
      '&address=' + newCompanyDetaiData['address'] +
      '&industryIds=' + industryList +
      '&scale=' + newCompanyDetaiData['scale'] +
      '&stage=' + newCompanyDetaiData['stage'] +
      '&priority=' + (this.isdefault ? 1 : 0) +
      '&phone=' + newCompanyDetaiData['companyPhone'] +
      '&otherIndustrys=' + otherIndustrys +
      '&website=' + (newCompanyDetaiData['webSite'] || '');
    // '&zipCode='+companyDetaiData.webSite;
    if (cid) {
      getCompanyDetailUrl = getCompanyDetailUrl + '&cid=' + cid;
    }

    this.Provider.getMamenSwiperData(getCompanyDetailUrl).subscribe(res => {
      if (res.code == 200) {
        //alert((cid?'修改':'新增') + '成功');
        this.isSuccess = true
      } else {
        this.isfailed = true
        this.isDisabled = ''
      }
    }, error => {
      console.log('erros===', error);
    })
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
