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
  constructor(public navCtrl: NavController, public navParams: NavParams,private Provider:MamenDataProvider) {
  }

  ionViewDidLoad() {
    this.programData = this.navParams.get('data') || {};
    
    console.log(this.programData,'ionViewDidLoad ConsultantProgramEditPage');

    this.fileUrlvalue = this.programData['certifiedUrl']
    //console.log(this.interactionData,'这是数据')
    this.programData['urlSize'] = (this.programData['urlSize'] / 1048576).toPrecision(3)

    if (this.programData['urlSize'] > 1) {
      this.programData['urlSize'] = this.programData['urlSize'] + ' MB'
    } else if (this.programData['urlSize'] < 1) {
      this.programData['urlSize'] = this.programData['urlSize'] * 1024 + ' KB'
    } else if (this.programData['urlSize'] == 'NaN') {
      this.programData = {};
      //console.log(this.programData['typeStr'])
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
  }
  /* 跳转到上传文件页面 */
  gouploadfile(){
    this.navCtrl.push(UploadfilePage,{
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

    this.programData['sourceName'] = this.filetitle
    this.programData['certifiedUrl'] = this.fileurl
    this.programData['urlSize'] = this.filesize
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
    this.programData['typeStr'] = this.filetypeicon
    //console.log(this.filetypeicon)
  }

  /*设置值（回调函数）*/
  setValue = (field,value)=> {
    if(field == 'workload_workloadUnit'){
      this.programData['workload'] = value[0];
      this.programData['workloadUnit'] = value[1];
    }
    this.programData[field] = value;
  }
  /*列表编辑*/
  goFormEditPage(field, value, type) {
    if(type == 'workload_workloadUnit'){
      this.navCtrl.push(ProjectTimeSelectPage,{callback:this.setValue,value:value,field:field,type:type});
    }else{
      this.navCtrl.push(FormEditPage,{callback:this.setValue,value:value,field:field,type:type});
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
  onProgramSubmitClick(ppid) {
    let pid = this.navParams.get('pid');
    let programData = this.programData;
    // let projectStageDetailUrl = 'http://mamon.yemindream.com/mamon/adviser/addOrEditProgram';
    const openId = window.sessionStorage.getItem('openId')|| this.getUrlParam('openId');
    let projectStageDetailUrl = addOrEditProgramUrl + '?openId=' + openId + '&pid='+pid +
                              '&programName='+programData['programName']+
                              '&programDescription='+programData['programDescription']+
                              '&workload='+programData['workload']+
                              '&workloadUnit='+programData['workloadUnit']+
                              '&deliverable='+programData['deliverable']+
                              '&price='+programData['price']+
                              '&planName='+(programData['planName'] || '')+
                              '&fid='+(programData['fid'] || '')+
                              '&planUrl='+(programData['planUrl'] || '');
    if(ppid) {
      projectStageDetailUrl = projectStageDetailUrl + '&ppid=' + ppid;
    }
    this.Provider.getMamenSwiperData(projectStageDetailUrl).subscribe(res=>{
      if(res.code==200) {
        alert('操作成功！');
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
