import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';

import { ConsultantProgramEditPage } from '../consultant-program-edit/consultant-program-edit';
import { getProjectProgramDetailUrl, addOrEditProgramUrl } from '../../../../providers/requestUrl';
import { ConsultantProjectBrowserPage } from '../consultant-project-browser/consultant-project-browser'
import { ConsultantStageListPage } from '../consultant-stage-list/consultant-stage-list';
import { ConsultantDocumentListPage } from '../consultant-document-list/consultant-document-list';
import { ConsultantCollectionListPage } from '../consultant-collection-list/consultant-collection-list';

import { ProjectListPage } from '../../client/project-list/project-list'
import { HttpClient, HttpParams } from '@angular/common/http';
import { hideAttentionMenuUrl, getAttentionUserInfo } from '../../../../providers/requestUrl'
declare var wx: any;
/**
 * Generated class for the ConsultantProgramListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-consultant-program-list',
  templateUrl: 'consultant-program-list.html',
})
export class ConsultantProgramListPage {
  public isShowNavMenu = false;
  public showNavMenuName = '';
  public projectProgramDetails = {};
  public projectDetails = {};

  public isTipPrompt = false
  public tiptext: any
  public isFailed: any
  public isdisabled: any
  public isAction: any;
  public isCont: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private Provider: MamenDataProvider,
    public sanitizer: DomSanitizer, private http: HttpClient) {
  }
  /*转换html标签处理*/
  assembleHTML(strHTML: any) {
    return this.sanitizer.bypassSecurityTrustHtml(strHTML);
  }

  /*点击展开、收起*/
  onNavMenuClick(value) {
    this.isShowNavMenu = value;
  }

  /*点击菜单触发*/
  onNavMenuItemClick(type, typeName, status) {
    this.showNavMenuName = typeName;
    this.isShowNavMenu = false;
    //TODO 提示语
    if (type == 1) {
      this.navCtrl.push(ConsultantProjectBrowserPage, { data: this.projectDetails, pid: this.projectDetails['pid'], status: status || '' });
    } else if (type == 2) {
      // this.projectDetails['appStatus'] !=0 &&this.projectDetails['appStatus'] !=1 &&
      // this.projectDetails['appStatus'] !=2 &&this.projectDetails['appStatus'] !=3 && 
      // this.navCtrl.push(ConsultantProgramListPage,{pid:this.projectDetails['pid'],status:status||''});
      let pid = this.navParams.get('pid');
      this.getProjectListData(pid);
    } else if (type == 3) {
      // this.projectDetails['appStatus'] != 6 && this.projectDetails['appStatus'] != 4 &&
      //   this.projectDetails['appStatus'] != 0 && this.projectDetails['appStatus'] != 1 &&
      //   this.projectDetails['appStatus'] != 2 && this.projectDetails['appStatus'] != 3 &&
      this.navCtrl.push(ConsultantStageListPage, {
        pid: this.projectDetails['pid'], status: status,
        projectType: this.projectDetails['appStatus'], programPrice: this.projectDetails['finalPrice'], data: this.projectDetails
      });
    } else if (type == 4) {
      // this.projectDetails['appStatus'] != 0 && this.projectDetails['appStatus'] != 1 &&
      //   this.projectDetails['appStatus'] != 2 && this.projectDetails['appStatus'] != 3 &&
      this.navCtrl.push(ConsultantDocumentListPage, { pid: this.projectDetails['pid'], status: status, data: this.projectDetails });
    } else if (type == 5) {
      // this.projectDetails['appStatus'] != 6 && this.projectDetails['appStatus'] != 4 &&
      //   this.projectDetails['appStatus'] != 0 && this.projectDetails['appStatus'] != 1 &&
      //   this.projectDetails['appStatus'] != 2 && this.projectDetails['appStatus'] != 3 &&
      this.navCtrl.push(ConsultantCollectionListPage, { pid: this.projectDetails['pid'], status: status, data: this.projectDetails });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectProgramBrowserPage');
    let pid = this.navParams.get('pid');
    this.getProjectListData(pid);
    let data = this.navParams.get('data') || {};
    this.getIsAction(data);
  }
  ionViewDidEnter() {
    let pid = this.navParams.get('pid');
    this.getProjectListData(pid);
    this.projectDetails = this.navParams.get('data') || {};
    this.getIsAction(this.projectDetails);
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
  getIsAction(data) {
    if (data.appStatus != 0 && data.appStatus != 1 && data.appStatus != 2 && data.appStatus != 3) {
      this.isAction = true;
    } else {
      this.isAction = false;
    }
    console.log(this.isAction, 'this.isActionthis.isAction')
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

  /*项目方案详情数据请求*/
  getProjectListData(pid) {
    // let projectDetailsUrl = 'http://mamon.yemindream.com/mamon/adviser/getProjectProgramDetail';
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    let projectDetailsUrl = getProjectProgramDetailUrl + '?openId=' + openId + '&pid=' + pid;
    this.Provider.getMamenSwiperData(projectDetailsUrl).subscribe(res => {
      if (res.code == 200) {
        this.projectProgramDetails = res.data;
        if (!this.projectProgramDetails) {
          this.isCont = true;
          this.projectProgramDetails = {};
        } else {
          this.isCont = false;
        }
        if (!this.projectProgramDetails) return;
        this.projectProgramDetails['size'] = (this.projectProgramDetails['size'] / 1048576).toPrecision(3)

        if (this.projectProgramDetails['size'] > 1) {
          this.projectProgramDetails['size'] = this.projectProgramDetails['size'] + ' MB'
        } else if (this.projectProgramDetails['size'] < 1) {
          this.projectProgramDetails['size'] = this.projectProgramDetails['size'] * 1024 + ' KB'
        }

        if (this.projectProgramDetails['format']) {
          if (this.projectProgramDetails['format'].search(/doc/) !== -1 || this.projectProgramDetails['format'].search(/docx/) !== -1) {
            this.projectProgramDetails['format'] = 'assets/imgs/' + 'doc.png'
          } else if (this.projectProgramDetails['format'].search(/ppt/) !== -1 || this.projectProgramDetails['format'].search(/pptx/) !== -1) {
            this.projectProgramDetails['format'] = 'assets/imgs/' + 'ppt.png'
          } else if (this.projectProgramDetails['format'].search(/xls/) !== -1 || this.projectProgramDetails['format'].search(/xlsx/) !== -1) {
            this.projectProgramDetails['format'] = 'assets/imgs/' + 'xls.png'
          } else if (this.projectProgramDetails['format'].search(/jpg/) !== -1 || this.projectProgramDetails['format'].search(/png/) !== -1 || this.projectProgramDetails['format'].search(/jpeg/) !== -1) {
            this.projectProgramDetails['format'] = 'assets/imgs/' + 'png.png'
          } else if (this.projectProgramDetails['format'].search(/pdf/) !== -1) {
            this.projectProgramDetails['format'] = 'assets/imgs/' + 'pdf.png'
          }
        }
      } else {
        console.log('请求出错:' + res.msg);
      }
    }, error => {
      console.log('erros===', error);
    })
  }

  /*添加方案请求*/
  onAddProgramClick(data) {
    let pid = this.navParams.get('pid');
    if (data) {
      this.navCtrl.push(ConsultantProgramEditPage, { isAdd: false, pid: pid, data: data });
    } else {
      this.navCtrl.push(ConsultantProgramEditPage, { isAdd: true, pid: pid });
    }

  }
  sureTipPrompt() {
    this.isTipPrompt = true
    this.tiptext = '确认提交该方案吗？'
    return
  }
  /*提交方案*/
  onProgramSubmitted() {
    let pid = this.navParams.get('pid');
    // let projectStageDetailUrl = 'http://mamon.yemindream.com/mamon/adviser/addOrEditProgram';
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    let projectStageDetailUrl = addOrEditProgramUrl + '?openId=' + openId + '&pid=' + pid + '&status=-1&ppid=' + this.projectProgramDetails['ppid'];

    this.Provider.getMamenSwiperData(projectStageDetailUrl).subscribe(res => {
      if (res.code == 200) {
        // this.tiptext = '提交成功'
        // this.isFailed = false
        // this.isdisabled = ''
        //console.log('操作成功！');
        this.isTipPrompt = !this.isTipPrompt;
        this.navCtrl.pop();
      } else {
        this.tiptext = '操作失败，请稍后再试'
        this.isFailed = true
        // this.isdisabled = ''
        //console.log('请求出错:' + res.msg);
      }
    }, error => {
      console.log('erros===', error);
    })
  }
  // 返回项目列表页
  goback() {
    let isTabs = this.navParams.get('isTabs');
    if(isTabs){
      this.navCtrl.pop();
      return;
    }
    this.navCtrl.popTo(this.navCtrl.getByIndex(1))
  }
  onReturnBack() {
    this.isTipPrompt = !this.isTipPrompt
    return
  }

  gotodo() {
    this.navCtrl.pop();
  }
}
