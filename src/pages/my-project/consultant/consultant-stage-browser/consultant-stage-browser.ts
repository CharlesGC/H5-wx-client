import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';

import { ConsultantDeliveryModelPage } from '../consultant-delivery-model/consultant-delivery-model';
import { ProjectPaymentRecordPage } from '../../client/project-payment-record/project-payment-record';
import { ConsultantInteractionSubmitPage } from '../consultant-interaction-submit/consultant-interaction-submit';
import { ConsultantStageEditPage } from '../consultant-stage-edit/consultant-stage-edit';
import { ConsultantDocumentBrowserPage } from '../consultant-document-browser/consultant-document-browser';
import { getAdviserProjectStageDetailUrl, changeStageStatusUrl } from '../../../../providers/requestUrl';

/**
 * Generated class for the ConsultantStageBrowserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-consultant-stage-browser',
  templateUrl: 'consultant-stage-browser.html',
})
export class ConsultantStageBrowserPage {

  public stageType:any;
  public projectStageDetail = {};
  constructor(public navCtrl: NavController, public navParams: NavParams,private Provider:MamenDataProvider) {
    this.stageType = 0;
  }

  ionViewDidLoad() {
    // this.stageType = this.navParams.get('type') || 0;
    // console.log(this.stageType,'ionViewDidLoad ProjectStageBrowserPage');
    let id = this.navParams.get('id')
    this.getProjectStageDetail(id);
  }

  ionViewDidEnter(){
    let id = this.navParams.get('id')
    this.getProjectStageDetail(id);
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

  /*跳转到添加支付记录页面*/
  goPaymentRecord(stageType){
    let id = this.navParams.get('id')
    if(stageType == 3 || stageType == 8) {
      this.navCtrl.push(ConsultantInteractionSubmitPage,{isAdd:true,pid:this.projectStageDetail['pid'],psid:this.projectStageDetail['psid']});
    }else if(stageType == 5){
      this.navCtrl.push(ConsultantDeliveryModelPage,{pid:this.projectStageDetail['pid'],psid:this.projectStageDetail['psid']});
    }else if(stageType == -1 || stageType == 1) {
      let programPrice = this.navParams.get('programPrice');
      this.navCtrl.push(ConsultantStageEditPage,{isAdd:false,pid:this.projectStageDetail['pid'],programPrice:programPrice,data:this.projectStageDetail});
    }
    
  }

  /*项目阶段详情数据请求*/
  getProjectStageDetail(id) {
    // let projectStageDetailUrl = 'http://mamon.yemindream.com/mamon/adviser/getProjectStageDetail';
    const openId = window.sessionStorage.getItem('openId')|| this.getUrlParam('openId');
    let projectStageDetailUrl = getAdviserProjectStageDetailUrl + '?openId=' + openId + '&id='+id;
    this.Provider.getMamenSwiperData(projectStageDetailUrl).subscribe(res=>{
      if(res.code==200) {
        console.log(res,'--------');
        this.projectStageDetail = res.data || {};
        var a = this.projectStageDetail['size'] / 1048576;
        console.log(this.projectStageDetail['size'])
        // this.filesize = a.toPrecision(3);
        // if (this.projectStageDetail['size'] > 1) {
        //   this.projectStageDetail['size'] = this.projectStageDetail['size'] + ' MB'
        // } else if (this.projectStageDetail['size'] < 1) {
        //   this.projectStageDetail['size'] = this.projectStageDetail['size'] * 1024 + ' KB'
        // } else if (this.projectStageDetail['size'] == 'NaN') {
        //   // this.projectStageDetail = {};
        //   //console.log(this.projectStageDetail['typeStr'])
        // }
    
        if (this.projectStageDetail['format']) {
          if (this.projectStageDetail['format'].search(/doc/) !== -1 || this.projectStageDetail['format'].search(/docx/) !== -1) {
            this.projectStageDetail['format'] = 'assets/imgs/' + 'doc.png'
          } else if (this.projectStageDetail['format'].search(/ppt/) !== -1 || this.projectStageDetail['format'].search(/pptx/) !== -1) {
            this.projectStageDetail['format'] = 'assets/imgs/' + 'ppt.png'
          } else if (this.projectStageDetail['format'].search(/xls/) !== -1 || this.projectStageDetail['format'].search(/xlsx/) !== -1) {
            this.projectStageDetail['format'] = 'assets/imgs/' + 'xls.png'
          } else if (this.projectStageDetail['format'].search(/jpg/) !== -1 || this.projectStageDetail['format'].search(/png/) !== -1 || this.projectStageDetail['format'].search(/jpeg/) !== -1) {
            this.projectStageDetail['format'] = 'assets/imgs/' + 'png.png'
          } else if (this.projectStageDetail['format'].search(/pdf/) !== -1) {
            this.projectStageDetail['format'] = 'assets/imgs/' + 'pdf.png'
          }
        }
      }else if(res.code == 207) {
        window.localStorage.removeItem('openId');
      }else{
        alert('请求出错:'+res.msg);
      }
    },error=>{
      console.log('erros===',error);
    })
  }

  /*提交阶段请求*/
  onStageSubmit() {
    let psid = this.projectStageDetail['psid'];
    // let projectStageDetailUrl = 'http://mamon.yemindream.com/mamon/adviser/changeStageStatus';
    const openId = window.sessionStorage.getItem('openId')|| this.getUrlParam('openId');
    let projectStageDetailUrl = changeStageStatusUrl + '?openId=' + openId + '&type=0' +'&psid='+psid;
    this.Provider.getMamenSwiperData(projectStageDetailUrl).subscribe(res=>{
      if(res.code==200) {
        alert('提交成功！');
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

  /*编辑详情*/
  goDocumentBrowser(id){
    this.navCtrl.push(ConsultantDocumentBrowserPage,{id:id,adviserStatus:this.projectStageDetail['adviserStatus']});
  }

}
