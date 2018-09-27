import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';
import { ProjectProgramObjectionPage } from '../project-program-objection/project-program-objection';
import { getProjectProgramDeatilUrl, confirmProgramUrl } from '../../../../providers/requestUrl';

/**
 * Generated class for the ProjectProgramBrowserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-project-program-browser',
  templateUrl: 'project-program-browser.html',
})
export class ProjectProgramBrowserPage {
  public isProgram = false
  public isdisabled :any
  public tiptext: any
  public isFailed: any
  public projectProgramDetails = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, private Provider: MamenDataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectProgramBrowserPage');
    let ppid = this.navParams.get('ppid');
    this.getProjectListData(ppid)
  }
  ionViewDidEnter() {
    let ppid = this.navParams.get('ppid');
    this.getProjectListData(ppid)
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
  getProjectListData(ppid) {
    // let projectDetailsUrl = 'http://mamon.yemindream.com/mamon/customer/getProjectProgramDeatil';
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    let projectDetailsUrl = getProjectProgramDeatilUrl + '?openId=' + openId + '&ppid=' + ppid;
    this.Provider.getMamenSwiperData(projectDetailsUrl).subscribe(res => {
      if (res.code == 200) {
        console.log(res, '--------');
        this.projectProgramDetails = res.data;
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
      } else if (res.code == 207) {
        window.localStorage.removeItem('openId');
      } else {
        alert('请求出错:' + res.msg);
      }
    }, error => {
      console.log('erros===', error);
    })
  }

  /*提出异议*/
  onObjectionClick() {
    let ppid = this.navParams.get('ppid');
    this.navCtrl.push(ProjectProgramObjectionPage, { type: 'program', ppid: ppid });
  }
  onReturnBack() {
    this.isProgram = !this.isProgram
    return
  }
  sureProgram() {
    this.isProgram = true
    this.tiptext = "是否确定该方案？"
    return
  }
  /*确认方案请求*/
  onConfirmProgramSubmit() {
    if(this.isFailed == false){
      this.navCtrl.pop()
      return
    }else if (this.isFailed == true){
      this.isProgram = !this.isProgram
      return
    }
    let ppid = this.navParams.get('ppid');
    // let projectDetailsUrl = 'http://mamon.yemindream.com/mamon/customer/confirmProgram';
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    let projectDetailsUrl = confirmProgramUrl + '?openId=' + openId + '&ppid=' + ppid + '&status=2';
    this.Provider.getMamenSwiperData(projectDetailsUrl).subscribe(res => {
      if (res.code == 200) {
        //alert('操作成功！');
        this.navCtrl.pop()
      } else {
        this.tiptext = "操作失败，请稍后重试！"
        // this.isFailed = true
        //console.log('请求出错:' + res.msg);
      }
    }, error => {
      console.log('erros===', error);
    })
  }
}