import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { DomSanitizer } from '@angular/platform-browser';
import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';
import { ConsultantInfoUserPage } from '../consultant-info-user/consultant-info-user';
import { ConsultantProfessionalCertificationPage } from '../consultant-professional-certification/consultant-professional-certification';
import { ConsultantProjectExpPage } from '../consultant-project-exp/consultant-project-exp';
import { ConsultantWorkExpPage } from '../consultant-work-exp/consultant-work-exp';
import { ConsultantLanguageExpPage } from '../consultant-language-exp/consultant-language-exp';
import { ConsultantEducationExpPage } from '../consultant-education-exp/consultant-education-exp'
import { getAdviserDetailUrl, hideAttentionMenuUrl, getAttentionUserInfo } from '../../../../providers/requestUrl';
import { UploadfilePage } from '../../../uploadfile/uploadfile'
import { resumeDeleteUrl } from '../../../../providers/requestUrl';
import { HttpClient, HttpParams } from '@angular/common/http';
declare var wx: any;
/**
 * Generated class for the ConsultantBasicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-consultant-basic',
  templateUrl: 'consultant-basic.html',
})
export class ConsultantBasicPage {
  path: string;
  fileTransfer: FileTransferObject = this.transfer.create();
  public consultantBasicData: any;
  public isLoading = true;
  public format: boolean;
  public isDelete = false;
  public arid: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private Provider: MamenDataProvider,
    public loadingCtrl: LoadingController, private camera: Camera, public sanitizer: DomSanitizer,
    private transfer: FileTransfer, private file: File, private http: HttpClient) {
    this.consultantBasicData = {};
  }

  /*转换html标签处理*/
  assembleHTML(strHTML: any) {
    return this.sanitizer.bypassSecurityTrustHtml(strHTML);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConsultantBasicPage');
    this.getConsultantBasicData();
    this.presentLoading(true);
  }
  ionViewDidEnter() {
    console.log(this.consultantBasicData, 'this.consultantBasicData----')
    this.getConsultantBasicData();
    this.isAttention();
  }

  presentLoading(isLoading) {
    console.log(isLoading, '===');
    let loader = this.loadingCtrl.create({
      content: "加载中",
      duration: 100
    });

    if (!isLoading) {
      console.log(loader, 'loader');
      loader && loader.dismiss();
    } else {
      loader.present();
    }
  }
  sureDeleteBack() {
    /* 删除简历 */
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    let arid = this.arid || 0;
    // let getBankAccountDellUrl = 'http://mamon.yemindream.com/mamon/adviser/delBank';
    let resumeDeletefILEUrl = resumeDeleteUrl + '?openId=' + openId + '&arid=' + arid;
    this.Provider.getMamenSwiperData(resumeDeletefILEUrl).subscribe(res => {
      if (res.code == 200) {
        //alert('删除成功');
        //this.navCtrl.pop();
        this.isDelete = true
        this.getConsultantBasicData();
        this.isDelete = !this.isDelete
      } else if (res.code == 207) {
        window.localStorage.removeItem('openId');
      }
    }, error => {
      console.log('erros===', error);
    })
  }
  onResumeDel(value) {
    this.isDelete = true;
    this.arid = value;
  }
  cancelDeleteBack() {
    this.isDelete = !this.isDelete;
  }

  /*跳转页面*/
  onGoPages(type, data) {

    if (type == 0) {
      //跳转至编辑用户基本信息
      this.navCtrl.push(ConsultantInfoUserPage, { consultantAdviser: this.consultantBasicData });

    } else if (type == 1) {
      //跳转至编辑工作经验
      this.navCtrl.push(ConsultantWorkExpPage, { data: (data ? data : {}) });

    } else if (type == 2) {
      //跳转至编辑项目经验
      this.navCtrl.push(ConsultantProjectExpPage, { data: (data ? data : {}) });

    } else if (type == 3) {
      //跳转至编辑项目经验
      this.navCtrl.push(ConsultantEducationExpPage, { data: (data ? data : {}) });

    } else if (type == 4) {
      //跳转至编辑项目经验
      this.navCtrl.push(ConsultantLanguageExpPage, { data: (data ? data : {}) });

    } else if (type == 5) {
      //跳转至编辑专业认证
      console.log(data, 'data~~~~');
      this.navCtrl.push(ConsultantProfessionalCertificationPage, { data: (data ? data : {}) });

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

  /*顾问个人信息请求*/
  getConsultantBasicData() {
    // let getCompanyListUrl = 'http://mamon.yemindream.com/mamon/adviser/getAdviserDetail';
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    let getCompanyListUrl = getAdviserDetailUrl + '?openId=' + openId;
    this.Provider.getMamenSwiperData(getCompanyListUrl).subscribe(res => {
      if (res.code == 200) {
        this.consultantBasicData = res.data;
        this.isLoading = false
        this.presentLoading(false);
        for (var i = 0; i < this.consultantBasicData.length; i++) {
          this.consultantBasicData[i].urlSize = (this.consultantBasicData[i].urlSize / 1048576).toPrecision(3)
          if (this.consultantBasicData[i].urlSize > 1) {
            this.consultantBasicData[i].urlSize = this.consultantBasicData[i].urlSize + 'MB'
          } else {
            this.consultantBasicData[i].urlSize = this.consultantBasicData[i].urlSize + 'KB'
          }
        }
      } else if (res.code == 207) {
        window.localStorage.removeItem('openId');
      }
    }, error => {
      console.log('erros===', error);
    })
  }

  /* 根据url来判断文件类型 */
  formatTypes(value) {
    if (!value) return '';
    if (value.search(/doc/) !== -1 || value.search(/docx/) !== -1) {
      return 'doc';
    } else if (value.search(/ppt/) !== -1 || value.search(/pptx/) !== -1) {
      return 'ppt'
    } else if (value.search(/xls/) !== -1 || value.search(/xlsx/) !== -1) {
      return 'xls'
    } else if (value.search(/jpg/) !== -1 || value.search(/png/) !== -1 || value.search(/jpeg/) !== -1) {
      return 'jpg'
    } else if (value.search(/pdf/) !== -1) {
      return 'pdf'
    }
  }

  /* 上传页面 */
  gouploadfile(value) {
    this.navCtrl.push(UploadfilePage, { type: value })
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
