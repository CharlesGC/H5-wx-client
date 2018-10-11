import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';
import { FormEditPage } from '../../form-edit/form-edit';
import { addOrEditCertificationUrl, delCertificationUrl, hideAttentionMenuUrl, getAttentionUserInfo } from '../../../../providers/requestUrl';
import { UploadfilePage } from '../../../uploadfile/uploadfile'
import { HttpClient, HttpParams } from '@angular/common/http';
declare var wx: any;
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
  public isSubmit = false;
  public isDelete = false;
  public isComplete = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private Provider: MamenDataProvider, private http: HttpClient
  ) {
    this.certificationListData = {};
  }
  sureBack() {
    this.isSubmit = !this.isSubmit;
    this.navCtrl.pop();
  }

  sureDelete() {
    this.isDelete = !this.isDelete;
    this.navCtrl.pop();
  }

  sureComplete() {
    this.isComplete = !this.isComplete;
  }
  ionViewDidLoad() {
    this.certificationListData = this.navParams.get('data');
    this.fileUrlvalue = this.certificationListData.certifiedUrl
    //console.log(this.certificationListData,'这是数据')
    this.certificationListData.urlSize = (this.certificationListData.urlSize / 1048576).toPrecision(3)

    if (this.certificationListData.urlSize > 1) {
      this.certificationListData.urlSize = this.certificationListData.urlSize + ' MB'
    } else if (this.certificationListData.urlSize < 1) {
      this.certificationListData.urlSize = this.certificationListData.urlSize * 1024 + ' KB'
    }

    if (this.certificationListData['typeStr']) {
      if (this.certificationListData['typeStr'].search(/doc/) !== -1 || this.certificationListData['typeStr'].search(/docx/) !== -1) {
        this.certificationListData['typeStr'] = 'assets/imgs/' + 'doc.png'
      } else if (this.certificationListData['typeStr'].search(/ppt/) !== -1 || this.certificationListData['typeStr'].search(/pptx/) !== -1) {
        this.certificationListData['typeStr'] = 'assets/imgs/' + 'ppt.png'
      } else if (this.certificationListData['typeStr'].search(/xls/) !== -1 || this.certificationListData['typeStr'].search(/xlsx/) !== -1) {
        this.certificationListData['typeStr'] = 'assets/imgs/' + 'xls.png'
      } else if (this.certificationListData['typeStr'].search(/jpg/) !== -1 || this.certificationListData['typeStr'].search(/png/) !== -1 || this.certificationListData['typeStr'].search(/jpeg/) !== -1) {
        this.certificationListData['typeStr'] = 'assets/imgs/' + 'png.png'
      } else if (this.certificationListData['typeStr'].search(/pdf/) !== -1) {
        this.certificationListData['typeStr'] = 'assets/imgs/' + 'pdf.png'
      }
    }
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
    var arr = Object.keys(this.certificationListData);
    if (arr.length < 4) {
      this.isComplete = true;
      return
    }
    let getProjectExpUrl = addOrEditCertificationUrl + '?openId=' + openId + '&certifiedTitle=' + certificationListData.certifiedTitle +
      '&issuingAgency=' + certificationListData.issuingAgency +
      '&issuedTime=' + (certificationListData.issuedTime || '') +
      '&fid=' + (this.certificationListData['fid'] || '') +
      '&certifiedUrl=' + certificationListData.certifiedUrl;
    if (acid) {
      getProjectExpUrl = getProjectExpUrl + '&acid=' + acid;
    }

    this.Provider.getMamenSwiperData(getProjectExpUrl).subscribe(res => {
      if (res.code == 200) {
        //alert((acid ? '修改' : '新增') + '成功');
        this.isSubmit = true;
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
        //alert('删除成功');
        this.isDelete = true;
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
    this.fileurl = obj.url;

    var a = obj.fileSize / 1048576;
    this.filesize = a.toPrecision(3);
    if (this.filesize > 1) {
      this.filesize = this.filesize + ' MB'
    } else {
      this.filesize = this.filesize * 1024 + ' KB'
    }

    this.certificationListData['sourceName'] = this.filetitle
    this.certificationListData['certifiedUrl'] = this.fileurl
    this.certificationListData['urlSize'] = this.filesize
    this.certificationListData['fid'] = obj.fid

    var types = obj.fileType;
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
    this.certificationListData['typeStr'] = this.filetypeicon
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
}
