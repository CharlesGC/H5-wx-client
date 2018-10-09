import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormEditPage } from '../../../contact/form-edit/form-edit';
import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';
import { ProjectTimeSelectPage } from '../../project-time-select/project-time-select';
import { addOrEditProgramUrl } from '../../../../providers/requestUrl';
import { UploadfilePage } from '../../../uploadfile/uploadfile'

/**
 * Generated class for the ConsultantProgramEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-consultant-program-edit',
  templateUrl: 'consultant-program-edit.html',
})
export class ConsultantProgramEditPage {
  private filetypeicon: any;
  private filetitle: any;
  private filesize: any;
  private filestatus = false;
  private fileurl: any;
  public fileUrlvalue: any

  public programData = {}
  public tipstext: any
  public isTipPrompt = false
  public isdisabled = ''
  public isFailed: any
  public ppid: any
  public checkFailed  = false
  public isAdd:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private Provider: MamenDataProvider) {
  }

  ionViewDidLoad() {
    this.programData = this.navParams.get('data') || {};
    this.isAdd = this.navParams.get('isAdd');
    console.log(this.isAdd,this.programData, 'ionViewDidLoad ConsultantProgramEditPage');

    this.fileUrlvalue = this.programData['certifiedUrl']
    //console.log(this.interactionData,'这是数据')
    this.programData['urlSize'] = (this.programData['urlSize'] / 1048576).toPrecision(3)

    if (this.programData['urlSize'] > 1) {
      this.programData['urlSize'] = this.programData['urlSize'] + ' MB'
    } else if (this.programData['urlSize'] < 1) {
      this.programData['urlSize'] = this.programData['urlSize'] * 1024 + ' KB'
    }

    if (this.programData['typeStr']) {
      if (this.programData['typeStr'].search(/doc/) !== -1 || this.programData['typeStr'].search(/docx/) !== -1) {
        this.programData['typeStr'] = 'assets/imgs/' + 'doc.png'
      } else if (this.programData['typeStr'].search(/ppt/) !== -1 || this.programData['typeStr'].search(/pptx/) !== -1) {
        this.programData['typeStr'] = 'assets/imgs/' + 'ppt.png'
      } else if (this.programData['typeStr'].search(/xls/) !== -1 || this.programData['typeStr'].search(/xlsx/) !== -1) {
        this.programData['typeStr'] = 'assets/imgs/' + 'xls.png'
      } else if (this.programData['typeStr'].search(/jpg/) !== -1 || this.programData['typeStr'].search(/png/) !== -1 || this.programData['typeStr'].search(/jpeg/) !== -1) {
        this.programData['typeStr'] = 'assets/imgs/' + 'png.png'
      } else if (this.programData['typeStr'].search(/pdf/) !== -1) {
        this.programData['typeStr'] = 'assets/imgs/' + 'pdf.png'
      }
    }
    this.programData['programDescription'] = this.programData['programDescription'] ? this.programData['programDescription'].replace(/<br>/g, "\n") : '';
    this.programData['deliverable'] = this.programData['deliverable'] ? this.programData['deliverable'].replace(/<br>/g, "\n") : '';
  }
  ionViewWillEnter(){
    this.programData['programDescription'] = this.programData['programDescription'] ? this.programData['programDescription'].replace(/<br>/g, "\n") : '';
    this.programData['deliverable'] = this.programData['deliverable'] ? this.programData['deliverable'].replace(/<br>/g, "\n") : '';
  }
  ionViewDidEnter(){
    this.isAdd = this.navParams.get('isAdd');
    console.log(this.isAdd,'修改')
  }
  /* 跳转到上传文件页面 */
  gouploadfile() {
    this.navCtrl.push(UploadfilePage, {
      callback: this.setuploadfile,
    })
  }

  setuploadfile = (obj, name) => {
    this.filestatus = true;
    this.filetitle = name;
    var a = obj.fileSize / 1048576;
    this.filesize = a.toPrecision(3);
    this.fileurl = obj.url;

    var types = obj.fileType;
    if (this.filesize > 1) {
      this.filesize = this.filesize + ' MB'
    } else {
      this.filesize = this.filesize * 1024 + ' KB'
    }

    this.programData['planName'] = this.filetitle
    this.programData['planUrl'] = this.fileurl
    this.programData['size'] = this.filesize
    this.programData['fid'] = obj.fid

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
    this.programData['format'] = this.filetypeicon;
    //console.log(this.filetypeicon)
  }

  /*设置值（回调函数）*/
  setValue = (field, value) => {
    if (field == 'workload_workloadUnit') {
      this.programData['workload'] = value[0];
      this.programData['workloadUnit'] = value[1];
    }
    if(field == 'programDescription' || field == 'deliverable'){
      this.programData[field] = value ? value.replace(/<br>/g, "\n") : '';
    }else{
      this.programData[field] = value;
    }
    
  }
  /*列表编辑*/
  goFormEditPage(field, value, type) {
    if (type == 'workload_workloadUnit') {
      this.navCtrl.push(ProjectTimeSelectPage, { callback: this.setValue, value: value, field: field, type: type });
    } else {
      this.navCtrl.push(FormEditPage, { callback: this.setValue, value: value, field: field, type: type });
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

  /*新增、编辑请求*/
  onProgramSubmitClick(value) {
    let programData = this.programData;
    if (!programData['programName']) {
      this.isTipPrompt = true
      this.tipstext = '方案名称不能为空'
      this.checkFailed =false
      return
    }
    if (!programData['programDescription']) {
      this.isTipPrompt = true
      this.tipstext = '方案描述不能为空'
      this.checkFailed =false
      return
    }
    if (!programData['workload']) {
      this.isTipPrompt = true
      this.tipstext = '方案周期不能为空'
      this.checkFailed =false
      return
    }
    if (!programData['deliverable']) {
      this.isTipPrompt = true
      this.tipstext = '项目规划不能为空'
      this.checkFailed =false
      return
    }
    if (!programData['price']) {
      this.isTipPrompt = true
      this.tipstext = '项目总价不能为空'
      this.checkFailed =false
      return
    }
    if (!programData['planUrl'] && !programData['fid']) {
      this.isTipPrompt = true
      this.tipstext = '方案计划书不能为空'
      this.checkFailed =false
      return
    }
    if(value){
      this.tipstext = '确认保存该方案吗？'
      this.ppid = value
    }else{
      this.tipstext = '确认提交该方案吗？'
    }
    this.isTipPrompt = true
    this.checkFailed = true
  }

  sureTipPrompt() {
    if(this.checkFailed == false){
      this.isTipPrompt = !this.isTipPrompt
      return
    }
    if(this.isFailed == false){
      this.isTipPrompt = !this.isTipPrompt
      this.navCtrl.pop()
      return
    }else if (this.isFailed == true){
      this.isTipPrompt = !this.isTipPrompt
      return
    }
    let programData = this.programData;
    let pid = this.navParams.get('pid');
    let reg=new RegExp("\n","g");
    let programDescription = programData['programDescription'] ? programData['programDescription'].replace(reg,"<br>") : '';
    let deliverable = programData['deliverable'] ? programData['deliverable'].replace(reg,"<br>") : '';

    // let projectStageDetailUrl = 'http://mamon.yemindream.com/mamon/adviser/addOrEditProgram';
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    let projectStageDetailUrl = addOrEditProgramUrl + '?openId=' + openId + '&pid=' + pid + '&status=-2' +
      '&programName=' + programData['programName'] +
      '&programDescription=' + programDescription +
      '&workload=' + programData['workload'] +
      '&workloadUnit=' + programData['workloadUnit'] +
      '&deliverable=' + deliverable +
      '&price=' + programData['price'] +
      '&planName=' + (programData['planName'] || '') +
      '&fid=' + (programData['fid'] || '') +
      '&planUrl=' + (programData['planUrl'] || '');
    if (this.ppid) {
      projectStageDetailUrl = projectStageDetailUrl + '&ppid=' + this.ppid;
    }
    this.Provider.getMamenSwiperData(projectStageDetailUrl).subscribe(res => {
      if (res.code == 200) {
        //alert('操作成功！');
        //this.tipstext = '操作成功！'
        //his.isdisabled = ''
        // this.isFailed = false
        this.isTipPrompt = !this.isTipPrompt
        this.navCtrl.pop();
      } else {
        this.tipstext = '操作失败，请稍后重试！'
        //alert('请求出错:' + res.msg);
        this.isFailed = true
        this.isdisabled = ''
      }
    }, error => {
      console.log('erros===', error);
    })
  }
  /*页面准备离开时触发*/
  ionViewWillLeave(){
    let reg=new RegExp("\n","g");
    this.programData['programDescription'] = this.programData['programDescription'] ? this.programData['programDescription'].replace(reg,"<br>") : '';
    this.programData['deliverable'] = this.programData['deliverable'] ? this.programData['deliverable'].replace(reg,"<br>") : '';
  }

  onReturnBack() {
    this.isTipPrompt = !this.isTipPrompt
    this.isdisabled = ''
    return
  }
}
