import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';

import { ConsultantInteractionSubmitPage } from '../../consultant/consultant-interaction-submit/consultant-interaction-submit';
import { getDocumentDetailUrl } from '../../../../providers/requestUrl';

/**
 * Generated class for the ProjectDecumentBrowserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-project-decument-browser',
  templateUrl: 'project-decument-browser.html',
})
export class ProjectDecumentBrowserPage {
  public isDelBook =false
  public invoiceType: any;
  public consultantDocumentDetailData = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, private Provider: MamenDataProvider) {
    this.invoiceType = 0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectInvoiceBrowserPage');
    let id = this.navParams.get('id');
    this.getConsultantDocumentDetails(id);
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
  getConsultantDocumentDetails(id) {
    // let consultantDocumentDetailsUrl = 'http://mamon.yemindream.com/mamon/adviser/getDocumentDetail';
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    let consultantDocumentDetailsUrl = getDocumentDetailUrl + '?openId=' + openId + '&id=' + id;
    this.Provider.getMamenSwiperData(consultantDocumentDetailsUrl).subscribe(res => {
      if (res.code == 200) {
        console.log(res, '--------');
        this.consultantDocumentDetailData = res.data;
        this.consultantDocumentDetailData['size'] = (this.consultantDocumentDetailData['size'] / 1048576).toPrecision(3)

        if (this.consultantDocumentDetailData['size'] > 1) {
          this.consultantDocumentDetailData['size'] = this.consultantDocumentDetailData['size'] + ' MB'
        } else if (this.consultantDocumentDetailData['size'] < 1) {
          this.consultantDocumentDetailData['size'] = this.consultantDocumentDetailData['size'] * 1024 + ' KB'
        }

        if (this.consultantDocumentDetailData['format']) {
          if (this.consultantDocumentDetailData['format'].search(/doc/) !== -1 || this.consultantDocumentDetailData['format'].search(/docx/) !== -1) {
            this.consultantDocumentDetailData['format'] = 'assets/imgs/' + 'doc.png'
          } else if (this.consultantDocumentDetailData['format'].search(/ppt/) !== -1 || this.consultantDocumentDetailData['format'].search(/pptx/) !== -1) {
            this.consultantDocumentDetailData['format'] = 'assets/imgs/' + 'ppt.png'
          } else if (this.consultantDocumentDetailData['format'].search(/xls/) !== -1 || this.consultantDocumentDetailData['format'].search(/xlsx/) !== -1) {
            this.consultantDocumentDetailData['format'] = 'assets/imgs/' + 'xls.png'
          } else if (this.consultantDocumentDetailData['format'].search(/jpg/) !== -1 || this.consultantDocumentDetailData['format'].search(/png/) !== -1 || this.consultantDocumentDetailData['format'].search(/jpeg/) !== -1) {
            this.consultantDocumentDetailData['format'] = 'assets/imgs/' + 'png.png'
          } else if (this.consultantDocumentDetailData['format'].search(/pdf/) !== -1) {
            this.consultantDocumentDetailData['format'] = 'assets/imgs/' + 'pdf.png'
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

  /*编辑操作*/
  onDocumentEditClick() {
    this.navCtrl.push(ConsultantInteractionSubmitPage, { data: this.consultantDocumentDetailData });
  }

  /*删除操作*/
  onDocumentDel() {

  }

}
