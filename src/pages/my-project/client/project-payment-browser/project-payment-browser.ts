import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';
import { getPaymentDetailUrl } from '../../../../providers/requestUrl';

/**
 * Generated class for the ProjectPaymentBrowserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-project-payment-browser',
  templateUrl: 'project-payment-browser.html',
})
export class ProjectPaymentBrowserPage {
  public projectPaymentDetails = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, private Provider: MamenDataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectPaymentBrowserPage');
    let id = this.navParams.get('id');
    this.getProjectPaymentDetails(id);
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

  /*项目支付记录详情数据请求*/
  getProjectPaymentDetails(id) {
    // let projectPaymentDetailsUrl = 'http://mamon.yemindream.com/mamon/customer/getPaymentDetail';
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('getUrlParam');
    let projectPaymentDetailsUrl = getPaymentDetailUrl + '?openId=' + openId + '&id=' + id;
    this.Provider.getMamenSwiperData(projectPaymentDetailsUrl).subscribe(res => {
      if (res.code == 200) {
        console.log(res, '--------');
        this.projectPaymentDetails = res.data;
        console.log(this.projectPaymentDetails, '这是数据')
        this.projectPaymentDetails['size'] = (this.projectPaymentDetails['size'] / 1048576).toPrecision(3)

        if (this.projectPaymentDetails['size'] > 1) {
          this.projectPaymentDetails['size'] = this.projectPaymentDetails['size'] + ' MB'
        } else if (this.projectPaymentDetails['size'] < 1) {
          this.projectPaymentDetails['size'] = this.projectPaymentDetails['size'] * 1024 + ' KB'
        }

        if (this.projectPaymentDetails['typeStr']) {
          if (this.projectPaymentDetails['typeStr'].search(/doc/) !== -1 || this.projectPaymentDetails['typeStr'].search(/docx/) !== -1) {
            this.projectPaymentDetails['typeStr'] = 'assets/imgs/' + 'doc.png'
          } else if (this.projectPaymentDetails['typeStr'].search(/ppt/) !== -1 || this.projectPaymentDetails['typeStr'].search(/pptx/) !== -1) {
            this.projectPaymentDetails['typeStr'] = 'assets/imgs/' + 'ppt.png'
          } else if (this.projectPaymentDetails['typeStr'].search(/xls/) !== -1 || this.projectPaymentDetails['typeStr'].search(/xlsx/) !== -1) {
            this.projectPaymentDetails['typeStr'] = 'assets/imgs/' + 'xls.png'
          } else if (this.projectPaymentDetails['typeStr'].search(/jpg/) !== -1 || this.projectPaymentDetails['typeStr'].search(/png/) !== -1 || this.projectPaymentDetails['typeStr'].search(/jpeg/) !== -1) {
            this.projectPaymentDetails['typeStr'] = 'assets/imgs/' + 'png.png'
          } else if (this.projectPaymentDetails['typeStr'].search(/pdf/) !== -1) {
            this.projectPaymentDetails['typeStr'] = 'assets/imgs/' + 'pdf.png'
          }
        }
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
