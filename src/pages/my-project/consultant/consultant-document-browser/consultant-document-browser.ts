import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';
import { ConsultantInteractionSubmitPage } from '../consultant-interaction-submit/consultant-interaction-submit';
import { getAdviserDocumentDetailUrl, delDocumentUrl, hideAttentionMenuUrl, getAttentionUserInfo } from '../../../../providers/requestUrl';
import { HttpClient, HttpParams } from '@angular/common/http';
declare var wx: any;
/**
 * Generated class for the ConsultantDocumentBrowserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-consultant-document-browser',
  templateUrl: 'consultant-document-browser.html',
})
export class ConsultantDocumentBrowserPage {
  public isDelBook = false
  public invoiceType: any;
  public consultantDocumentDetailData = {};
  public adviserStatus = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, private Provider: MamenDataProvider, private http: HttpClient) {
    this.invoiceType = 0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectInvoiceBrowserPage');
    let id = this.navParams.get('id');
    this.adviserStatus = this.navParams.get('adviserStatus') || ''
    this.getConsultantDocumentDetails(id);

  }
  ionViewWillEnter() {
    this.consultantDocumentDetailData['introduction'] = this.consultantDocumentDetailData['introduction'] ? this.consultantDocumentDetailData['introduction'].replace(/<br>/g, "\n") : '';
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
  /*项目文档详情数据请求*/
  getConsultantDocumentDetails(id) {
    // let consultantDocumentDetailsUrl = 'http://mamon.yemindream.com/mamon/adviser/getDocumentDetail';
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');;
    let consultantDocumentDetailsUrl = getAdviserDocumentDetailUrl + '?openId=' + openId + '&id=' + id;
    this.Provider.getMamenSwiperData(consultantDocumentDetailsUrl).subscribe(res => {
      if (res.code == 200) {
        this.consultantDocumentDetailData = res.data;
        this.consultantDocumentDetailData['introduction'] = this.consultantDocumentDetailData['introduction'] ? this.consultantDocumentDetailData['introduction'].replace(/<br>/g, "\n") : '';
        this.consultantDocumentDetailData['size'] = (Number(this.consultantDocumentDetailData['size']) / 1048576).toPrecision(3)

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
        console.log('请求出错:' + res.msg);
      }
    }, error => {
      console.log('erros===', error);
    })
  }
  /*页面准备离开时触发*/
  ionViewWillLeave() {
    let reg = new RegExp("\n", "g");
    this.consultantDocumentDetailData['introduction'] = this.consultantDocumentDetailData['introduction'] ? this.consultantDocumentDetailData['introduction'].replace(reg, "<br>") : '';
  }
  getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象  
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数  
    if (r != null) {
      return encodeURI(r[2]);  //返回参数值 
    } else {
      0
      return null;
    }
  }

  /*编辑操作*/
  onDocumentEditClick() {
    this.navCtrl.push(ConsultantInteractionSubmitPage, { data: this.consultantDocumentDetailData, pid: this.consultantDocumentDetailData['pid'], psid: this.consultantDocumentDetailData['psid'] });
  }

  /* 根据format来判断文件类型 */
  // formatTypes(value) {
  //   if (value.search(/doc/) !== -1 || value.search(/docx/) !== -1) {
  //     return 'doc';
  //   } else if (value.search(/ppt/) !== -1 || value.search(/pptx/) !== -1) {
  //     return 'ppt'
  //   } else if (value.search(/xls/) !== -1 || value.search(/xlsx/) !== -1) {
  //     return 'xls'
  //   } else if (value.search(/jpg/) !== -1 || value.search(/png/) !== -1 || value.search(/jpeg/) !== -1) {
  //     return 'jpg'
  //   } else if (value.search(/pdf/) !== -1) {
  //     return 'pdf'
  //   }
  // }
  sureDelBook() {
    this.isDelBook = !this.isDelBook
    this.navCtrl.pop();
  }
  /*删除操作*/
  onDocumentDel() {
    const pdid = this.consultantDocumentDetailData['pdid']
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    let consultantDocumentDetailsUrl = delDocumentUrl + '?openId=' + openId + '&pdid=' + pdid;
    this.Provider.getMamenSwiperData(consultantDocumentDetailsUrl).subscribe(res => {
      if (res.code == 200) {
        this.isDelBook = true
        //console.log('操作成功！');
        //this.navCtrl.pop();
      } else if (res.code == 207) {
        window.localStorage.removeItem('openId');
      } else {
        //console.log('请求出错:' + res.msg);
      }
    }, error => {
      console.log('erros===', error);
    })
  }
}
