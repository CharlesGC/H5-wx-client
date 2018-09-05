import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FormEditPage } from '../../../contact/form-edit/form-edit';
import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';

import { ProjectCollectBankPage } from '../../project-collect-bank/project-collect-bank';
import { getPayMentByPsidUrl,addPayMentUrl } from '../../../../providers/requestUrl';

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
  public paymentRecordData = {}
  public payerList = {};
  constructor(public navCtrl: NavController, public navParams: NavParams,private transfer: FileTransfer,private file: File,private Provider:MamenDataProvider) {
  }

  ionViewDidLoad() {
    let psid = this.navParams.get('id')
    this.getProjectPaymentRecordDetail(psid);
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

  /*列表编辑*/
  goFormEditPage(field, value, type) {
    if(type == 'selectPaymentBank') {
      this.navCtrl.push(ProjectCollectBankPage,{callback:this.setValue,field:field,data:this.paymentRecordData});
    }else{
      this.navCtrl.push(FormEditPage,{callback:this.setValue,value:value,field:field,type:type});
    }
    
  }

  /*设置值（回调函数）*/
  setValue = (field,value)=> {

    this.paymentRecordData[field] = value;
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
    const openId = window.sessionStorage.getItem('openId')|| this.getUrlParam('openId');
    let projectInvoiceDetailUrl = getPayMentByPsidUrl + '?openId=' + openId + '&psid='+psid;
    this.Provider.getMamenSwiperData(projectInvoiceDetailUrl).subscribe(res=>{
      if(res.code==200) {
        console.log(res,'--------');
        this.paymentRecordData = res.data;
        this.paymentRecordData && this.paymentRecordData['payerList'] && this.paymentRecordData['payerList'].length>0 && this.paymentRecordData['payerList'].map(d=>{
          if(d.type == 1){
            this.paymentRecordData['payer'] = d.name;
            this.paymentRecordData['payerBank'] = d.bankName;
            this.paymentRecordData['payerAccount'] = d.account;
          }
        })
        // this.payerList = this.paymentRecordData && this.paymentRecordData['payerList'] && this.paymentRecordData['payerList'].length>0 ?
      }else if(res.code == 207) {
        window.localStorage.removeItem('openId');
      }else{
        alert('请求出错:'+res.msg);
      }
    },error=>{
      console.log('erros===',error);
    })
  }

  /*申请发票提交*/
  goPaymentRecord(){
    let psid = this.navParams.get('id');
    let invoiceData = this.paymentRecordData;
    // let projectInvoiceDetailUrl = 'http://mamon.yemindream.com/mamon/customer/addPayMent';
    const openId = window.sessionStorage.getItem('openId')|| this.getUrlParam('openId');
    let projectInvoiceDetailUrl = addPayMentUrl + '?openId=' + openId + '&psid='+psid +
                              '&payer='+invoiceData['payer']+
                              '&payerBank='+invoiceData['payerBank']+
                              '&payerAccount='+invoiceData['payerAccount']+
                              '&payee='+invoiceData['payee']+
                              '&payeeBank='+invoiceData['payeeBank']+
                              '&payeeAccount='+invoiceData['payeeAccount']+
                              '&paymentUrl='+(invoiceData['paymentUrl'] || '')+
                              '&realPrice='+invoiceData['realPrice'];
    this.Provider.getMamenSwiperData(projectInvoiceDetailUrl).subscribe(res=>{
      if(res.code==200) {
        console.log(res,'--------');
        this.paymentRecordData = res.data;
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
