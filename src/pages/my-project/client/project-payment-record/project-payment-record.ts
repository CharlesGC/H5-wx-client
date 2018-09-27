import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FormEditPage } from '../../../contact/form-edit/form-edit';
import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';

import { ProjectCollectBankPage } from '../../project-collect-bank/project-collect-bank';
import { getPayMentByPsidUrl, addPayMentUrl } from '../../../../providers/requestUrl';

import { UploadfilePage } from '../../../uploadfile/uploadfile'

/**
 * Generated class for the ProjectPaymentRecordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-project-payment-record',
  templateUrl: 'project-payment-record.html',
})
export class ProjectPaymentRecordPage {
  private filetypeicon: any;
  private filetitle: any;
  private filesize: any;
  private filestatus = false;
  private fileurl: any;
  public fileUrlvalue: any
  public paymentRecordData = {}
  public payerList = {};
  public isComplete = false;
  public data = {};
  public isCompleteRecord = false
  public tipstext :any
  public isFailed :any
  constructor(public navCtrl: NavController, public navParams: NavParams, private transfer: FileTransfer, private file: File, private Provider: MamenDataProvider) {
  }

  ionViewDidLoad() {
    let psid = this.navParams.get('id')
    this.getProjectPaymentRecordDetail(psid);
    this.data = this.navParams.get('data');
    console.log('ionViewDidLoad ProjectPaymentRecordPage');
  }

  fileupload() {
    // ionic 官方文档例子漏写了这句话
    // http://ionicframework.com/docs/native/file-transfer/
    //
    const fileTransfer: FileTransferObject = this.transfer.create();
    // 更多的 Options 可以点进去自己看看，不懂的就谷歌翻译他的注释
    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: 'name.jpg',  // 文件类型
      headers: {},
      params: {}    // 如果要传参数，写这里
    }

    console.log(12312);
    fileTransfer.upload('', 'http://100.168.1.48:8181/mafile/upload.jsp', options)
      .then((data) => {
        // success
      }, (err) => {
        // error
      })
  }

  filedownload() {
    console.log(3123);
    const fileTransfer: FileTransferObject = this.transfer.create();
    const url = 'http://www.example.com/file.pdf';
    fileTransfer.download(url, this.file.dataDirectory + 'file.pdf').then((entry) => {
      console.log('download complete: ' + entry.toURL());
    }, (error) => {
      // handle error
    });
  }

  /** 跳转到上传页面 */
  gouploadfile() {
    this.navCtrl.push(UploadfilePage, {
      callback: this.setuploadfile,
    })
  }
  // 弹框提示确定返回
  sureComplete() {
    this.isComplete = !this.isComplete;
  }
  setuploadfile = (obj, name) => {
    this.filestatus = true;
    this.filetitle = name;
    console.log(obj)
    var a = obj.fileSize / 1048576;
    this.filesize = a.toPrecision(3);
    this.fileurl = obj.url;
    this.paymentRecordData['sourceName'] = this.filetitle
    this.paymentRecordData['size'] = this.filesize
    this.paymentRecordData['certifiedUrl'] = this.fileurl
    this.paymentRecordData['fid'] = obj.fid

    var types = obj.fileType;
    if (this.filesize > 1) {
      this.filesize = this.filesize + ' MB'
    } else {
      this.filesize = this.filesize * 1024 + ' KB'
    }
    if (types.indexOf('doc') == 0 || types.indexOf('docx') == 0) {
      this.filetypeicon = 'assets/imgs/' + 'doc.png'
    } else if (types.indexOf('ppt') == 0 || types.indexOf('pptx') == 0) {
      this.filetypeicon = 'assets/imgs/' + 'ppt.png'
    } else if (types.indexOf('xls') == 0 || types.indexOf('xlsx') == 0) {
      this.filetypeicon = 'assets/imgs/' + 'xls.png'
    } else if (types.indexOf('jpg') == 0 || types.indexOf('png') == 0) {
      this.filetypeicon = 'assets/imgs/' + 'png.png'
    } else if (types.indexOf('pdf') == 0) {
      this.filetypeicon = 'assets/imgs/' + 'pdf.png'
    }
    //this.paymentRecordData['typeStr'] = this.filetypeicon
    //console.log(this.filetypeicon)
  }

  /*列表编辑*/
  goFormEditPage(field, value, type) {
    let cid = this.navParams.get('cid')
    if (type == 'selectPaymentBank') {
      this.navCtrl.push(ProjectCollectBankPage, { callback: this.setValue, field: field, data: this.paymentRecordData, type: 'clientType', cid: cid });
    } else {
      this.navCtrl.push(FormEditPage, { callback: this.setValue, value: value, field: field, type: type });
    }

  }

  /*设置值（回调函数）*/
  // setValue = (field,value)=> {

  //   this.paymentRecordData[field] = value;
  // }
  /*设置值（回调函数）*/
  setValue = (field, value) => {
    if (field == 'taxNumber' && value) {
      this.paymentRecordData['payer'] = value.name;
      this.paymentRecordData['payerBank'] = value.bankName;
      this.paymentRecordData['payerAccount'] = value.account;
    } else {
      this.paymentRecordData[field] = value;
    }
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

  /*项目申请发票附加信息数据请求*/
  getProjectPaymentRecordDetail(psid) {
    // let projectInvoiceDetailUrl = 'http://mamon.yemindream.com/mamon/customer/getPayMentByPsid';
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    let projectInvoiceDetailUrl = getPayMentByPsidUrl + '?openId=' + openId + '&psid=' + psid;
    this.Provider.getMamenSwiperData(projectInvoiceDetailUrl).subscribe(res => {
      if (res.code == 200) {
        this.paymentRecordData = res.data;
        console.log('paymentRecordData',this.paymentRecordData)
        this.paymentRecordData['size'] = (this.paymentRecordData['size'] / 1048576).toPrecision(3)

        if (this.paymentRecordData['size'] > 1) {
          this.paymentRecordData['size'] = this.paymentRecordData['size'] + ' MB'
        } else if (this.paymentRecordData['size'] < 1) {
          this.paymentRecordData['size'] = this.paymentRecordData['size'] * 1024 + ' KB'
        }

        if (this.paymentRecordData['typeStr']) {
          if (this.paymentRecordData['typeStr'].search(/doc/) !== -1 || this.paymentRecordData['typeStr'].search(/docx/) !== -1) {
            this.paymentRecordData['typeStr'] = 'assets/imgs/' + 'doc.png'
          } else if (this.paymentRecordData['typeStr'].search(/ppt/) !== -1 || this.paymentRecordData['typeStr'].search(/pptx/) !== -1) {
            this.paymentRecordData['typeStr'] = 'assets/imgs/' + 'ppt.png'
          } else if (this.paymentRecordData['typeStr'].search(/xls/) !== -1 || this.paymentRecordData['typeStr'].search(/xlsx/) !== -1) {
            this.paymentRecordData['typeStr'] = 'assets/imgs/' + 'xls.png'
          } else if (this.paymentRecordData['typeStr'].search(/jpg/) !== -1 || this.paymentRecordData['typeStr'].search(/png/) !== -1 || this.paymentRecordData['typeStr'].search(/jpeg/) !== -1) {
            this.paymentRecordData['typeStr'] = 'assets/imgs/' + 'png.png'
          } else if (this.paymentRecordData['typeStr'].search(/pdf/) !== -1) {
            this.paymentRecordData['typeStr'] = 'assets/imgs/' + 'pdf.png'
          }
        }
        this.paymentRecordData && this.paymentRecordData['payerList'] && this.paymentRecordData['payerList'].length > 0 && this.paymentRecordData['payerList'].map(d => {
          if (d.type == 1) {
            this.paymentRecordData['payer'] = d.name;
            this.paymentRecordData['payerBank'] = d.bankName;
            this.paymentRecordData['payerAccount'] = d.account;
          }
        })
        // this.payerList = this.paymentRecordData && this.paymentRecordData['payerList'] && this.paymentRecordData['payerList'].length>0 ?
      } else if (res.code == 207) {
        window.localStorage.removeItem('openId');
      } else {
        //alert('请求出错:' + res.msg);
      }
    }, error => {
      console.log('erros===', error);
    })
  }
  sureCompleteRecord(){
    this.isCompleteRecord = true
    let invoiceData = this.paymentRecordData;
    // let projectInvoiceDetailUrl = 'http://mamon.yemindream.com/mamon/customer/addPayMent';
    if(!invoiceData['realPrice'] || !invoiceData['payer'] || !invoiceData['payerBank'] || 
    !invoiceData['payerAccount'] || !invoiceData['payee'] || !invoiceData['payeeBank'] || !invoiceData['payeeAccount']) {
      this.tipstext = '请填写完整信息';
      return;
    }
    this.tipstext = '确认提交支付信息吗？'
    return
  }
  onCompanyDel(){
    this.isCompleteRecord = !this.isCompleteRecord
    return
  }
  /*添加支付记录提交*/
  goPaymentRecord() {
    if(this.isFailed == true){
      this.isCompleteRecord = !this.isCompleteRecord
      return
    }
    let psid = this.navParams.get('id');
    let invoiceData = this.paymentRecordData;
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    let projectInvoiceDetailUrl = addPayMentUrl + '?openId=' + openId + '&psid=' + psid +
      '&payer=' + invoiceData['payer'] +
      '&payerBank=' + invoiceData['payerBank'] +
      '&payerAccount=' + invoiceData['payerAccount'] +
      '&payee=' + invoiceData['payee'] +
      '&payeeBank=' + invoiceData['payeeBank'] +
      '&payeeAccount=' + invoiceData['payeeAccount'] +
      '&paymentUrl=' + (invoiceData['paymentUrl'] || '') +
      '&fid=' + (invoiceData['fid'] || '') +
      '&price=' + (invoiceData['price'] || '') +
      '&realPrice=' + invoiceData['realPrice'];
    this.Provider.getMamenSwiperData(projectInvoiceDetailUrl).subscribe(res => {
      if (res.code == 200) {
        console.log(res, '--------');
        this.paymentRecordData = res.data || {};
        this.navCtrl.pop();
      } else {
        //alert('请求出错:' + res.msg);
        this.tipstext = '操作错误，请稍后再试'
        this.isFailed = true
      }
    }, error => {
      console.log('erros===', error);
    })
  }
}
