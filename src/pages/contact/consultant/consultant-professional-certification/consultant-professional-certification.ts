import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';

import { FormEditPage } from '../../form-edit/form-edit';
import { addOrEditCertificationUrl, delCertificationUrl } from '../../../../providers/requestUrl';
import { UploadfilePage } from '../../../uploadfile/uploadfile'
/**
 * Generated class for the ConsultantProfessionalCertificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-consultant-professional-certification',
  templateUrl: 'consultant-professional-certification.html',
})
export class ConsultantProfessionalCertificationPage {
  private filetypeicon: any;
  private filetitle: any;
  private filesize: any;
  private filestatus = false;
  private fileurl: any;
  public certificationListData: any;
  public formatvalue: any;
  public fileUrlvalue: any
  constructor(public navCtrl: NavController, public navParams: NavParams, private Provider: MamenDataProvider) {
    this.certificationListData = {};
  }

  ionViewDidLoad() {
    this.certificationListData = this.navParams.get('data');
    console.log(this.certificationListData.certifiedUrl, '赛迪斯--------------------------------------');
    this.fileUrlvalue = this.certificationListData.certifiedUrl
    //this.formatTypes(this.fileUrlvalue);
  }

  /*跳转到数据处理页面*/
  goFormEditPage(field, value, type) {
    this.navCtrl.push(FormEditPage, { callback: this.setValue, value: value, field: field, type: type });
  }

  /*设置值（回调函数）*/
  setValue = (field, value) => {
    this.certificationListData[field] = value;
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

  /*数据新增、编辑请求*/
  oncertificationExpSubmit() {
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    let certificationListData = this.certificationListData;
    let acid = certificationListData.acid || 0;
    // let getProjectExpUrl = 'http://mamon.yemindream.com/mamon/adviser/addOrEditCertification';

    let getProjectExpUrl = addOrEditCertificationUrl + '?openId=' + openId + '&certifiedTitle=' + certificationListData.certifiedTitle +
      '&issuingAgency=' + certificationListData.issuingAgency +
      '&issuedTime=' + (certificationListData.issuedTime || '') +
      '&certifiedUrl=' + certificationListData.certifiedUrl;
    if (acid) {
      getProjectExpUrl = getProjectExpUrl + '&acid=' + acid;
    }

    this.Provider.getMamenSwiperData(getProjectExpUrl).subscribe(res => {
      if (res.code == 200) {
        alert((acid ? '修改' : '新增') + '成功');
        this.navCtrl.pop();
      } else if (res.code == 207) {
        window.localStorage.removeItem('openId');
      }
    }, error => {
      console.log('erros===', error);
    })
  }
  /*数据删除请求*/
  oncertificationExpDel() {
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    let certificationListData = this.certificationListData;
    let acid = certificationListData.acid || 0;
    // let getProjectExpDellUrl = 'http://mamon.yemindream.com/mamon/adviser/delCertification';

    let getProjectExpDellUrl = delCertificationUrl + '?openId=' + openId + '&acid=' + acid

    this.Provider.getMamenSwiperData(getProjectExpDellUrl).subscribe(res => {
      if (res.code == 200) {
        alert('删除成功');
        this.navCtrl.pop();
      } else if (res.code == 207) {
        window.localStorage.removeItem('openId');
      }
    }, error => {
      console.log('erros===', error);
    })
  }
  /* 跳转到上传文件页面 */
  gouploadfile() {
    this.navCtrl.push(UploadfilePage, {
      callback: this.setuploadfile,
      title: this.filetitle,
      typeicon: this.filetypeicon,
      status: this.filestatus,
      size: this.filesize
    })
  }

  setuploadfile = (obj, name) => {
    this.filestatus = true;
    this.filetitle = name;
    console.log(obj)
    var a = obj.fileSize / 1048576;
    this.filesize = a.toPrecision(3);
    this.fileurl = obj.url;
    this.certificationListData['certifiedUrl'] = this.fileurl
    this.certificationListData['size'] = this.filesize

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
    this.certificationListData['format'] = this.filetypeicon
  }

  formatTypes(fileUrlvalue) {
    //console.log(typeof(fileUrlvalue))
    if (fileUrlvalue.search(/doc/) !== -1 || fileUrlvalue.search(/docx/) !== -1) {
      this.formatvalue = 'doc';
    } else if (fileUrlvalue.search(/ppt/) !== -1 || fileUrlvalue.search(/pptx/) !== -1) {
      this.formatvalue = 'ppt'
    } else if (fileUrlvalue.search(/xls/) !== -1 || fileUrlvalue.search(/xlsx/) !== -1) {
      this.formatvalue = 'xls'
    } else if (fileUrlvalue.search(/jpg/) !== -1 || fileUrlvalue.search(/png/) !== -1 || fileUrlvalue.search(/jpeg/) !== -1) {
      this.formatvalue = 'jpg'
    } else if (fileUrlvalue.search(/pdf/) !== -1) {
      this.formatvalue = 'pdf'
    }
  }
}
