import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MamenDataProvider } from '../../../providers/mamen-data/mamen-data';

import { FormEditPage } from '../../contact/form-edit/form-edit';
import { DemandContentPage } from '../../demand-content/demand-content';
import { submitApplicationUrl } from '../../../providers/requestUrl';
import { UploadfilePage } from '../../uploadfile/uploadfile'

/**
 * Generated class for the ApplicationProjectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-application-project',
  templateUrl: 'application-project.html',
})
export class ApplicationProjectPage {
  private filetypeicon: any;
  private filetitle: any;
  private filesize: any;
  private filestatus = false;
  private fileurl: any;
  public fileUrlvalue: any

  public projectData = {};
  public tip_isShow = false;
  public success_isShow = false;
  public isComplete = false
  constructor(public navCtrl: NavController, public navParams: NavParams, private Provider: MamenDataProvider) {
  }

  ionViewDidLoad() {
    this.projectData = this.navParams.get('data');
    this.fileUrlvalue = this.projectData['certifiedUrl']
    console.log(this.projectData, '这是数据')
    this.projectData['certifiedUrl'] = (this.projectData['certifiedUrl'] / 1048576).toPrecision(3)

    if (this.projectData['certifiedUrl'] > 1) {
      this.projectData['certifiedUrl'] = this.projectData['certifiedUrl'] + ' MB'
    } else if (this.projectData['certifiedUrl'] < 1) {
      this.projectData['certifiedUrl'] = this.projectData['certifiedUrl'] * 1024 + ' KB'
    } else if (this.projectData['certifiedUrl'] == 'NaN') {
      // this.projectData = {};
      //console.log(this.certificationListData['typeStr'])
    }

    if (this.projectData['typeStr']) {
      if (this.projectData['typeStr'].search(/doc/) !== -1 || this.projectData['typeStr'].search(/docx/) !== -1) {
        this.projectData['typeStr'] = 'assets/imgs/' + 'doc.png'
      } else if (this.projectData['typeStr'].search(/ppt/) !== -1 || this.projectData['typeStr'].search(/pptx/) !== -1) {
        this.projectData['typeStr'] = 'assets/imgs/' + 'ppt.png'
      } else if (this.projectData['typeStr'].search(/xls/) !== -1 || this.projectData['typeStr'].search(/xlsx/) !== -1) {
        this.projectData['typeStr'] = 'assets/imgs/' + 'xls.png'
      } else if (this.projectData['typeStr'].search(/jpg/) !== -1 || this.projectData['typeStr'].search(/png/) !== -1 || this.projectData['typeStr'].search(/jpeg/) !== -1) {
        this.projectData['typeStr'] = 'assets/imgs/' + 'png.png'
      } else if (this.projectData['typeStr'].search(/pdf/) !== -1) {
        this.projectData['typeStr'] = 'assets/imgs/' + 'pdf.png'
      }
    }
    console.log('ionViewDidLoad ApplicationProjectPage');
  }

  /*列表编辑*/
  goFormEditPage(field, value, type) {
    this.navCtrl.push(FormEditPage, { callback: this.setValue, value: value, field: field, type: type });
  }
  /* 跳转到上传页面 */
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
    if (this.filesize > 1) {
      this.filesize = this.filesize + ' MB'
    } else {
      this.filesize = this.filesize * 1024 + ' KB'
    }

    this.projectData['sourceName'] = this.filetitle
    this.projectData['certifiedUrl'] = this.fileurl
    this.projectData['urlSize'] = this.filesize
    this.projectData['fid'] = obj.fid

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
    this.projectData['typeStr'] = this.filetypeicon
  }
  /*设置值（回调函数）*/
  setValue = (field, value) => {

    this.projectData[field] = value;
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

  /*提交申请*/
  onApplicationSubmit() {
    console.log(this.projectData['introduction']);
    if (!this.projectData['introduction'] || !this.projectData['proposal'] || !this.projectData['fid']) {
      this.isComplete = true
      return
    }
    this.tip_isShow = true;
  }
  sureComplete() {
    this.isComplete = !this.isComplete
    return
  }
  /*确定提交*/
  onDetermine() {
    let projectData = this.projectData;
    // let projectDetailsUrl = 'http://mamon.yemindream.com/mamon/adviser/submitApplication';
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId')
    let projectDetailsUrl = submitApplicationUrl + '?openId=' + openId + '&pid=' + projectData['pid'] +
      '&introduction=' + projectData['introduction'] +
      '&proposal=' + projectData['proposal'] +
      '&fid=' + projectData['fid'] +
      '&pacids=' + (projectData['pacids'] || '');

    this.Provider.getMamenSwiperData(projectDetailsUrl).subscribe(res => {
      if (res.code == 200) {
        this.success_isShow = true;
        // this.projectDetails = res.data;
        return
      } else if (res.code == 207) {
        window.localStorage.removeItem('openId');
      } else {
        alert('请求出错:' + res.msg);
      }
    }, error => {
      console.log('erros===', error);
    })
  }

  /*关闭弹出窗*/
  onClose() {
    this.tip_isShow = false;
  }

  /*成功时选择*/
  onGoProjectPage() {
    this.success_isShow = false;
    // this.navCtrl.push(DemandContentPage);
    this.navCtrl.popToRoot()
  }

}
