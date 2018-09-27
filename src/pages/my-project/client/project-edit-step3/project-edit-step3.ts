import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';

import { FormEditPage } from '../../../contact/form-edit/form-edit';
import { ProjectTimeSelectPage } from '../../project-time-select/project-time-select';
import { ProjectListPage } from '../project-list/project-list';
import { savaraftUrl, releaseProjectUrl } from '../../../../providers/requestUrl';
import { SpeedPage } from '../../../speed/speed';
import { ProjectBrowserPage } from '../project-browser/project-browser'

/**
 * Generated class for the ProjectEditStep3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-project-edit-step3',
  templateUrl: 'project-edit-step3.html',
})
export class ProjectEditStep3Page {
  public projectData: any;
  public isShow = false;
  public isEdit = false;
  public isSpeed = false;
  public isComplete = false;
  public isSubmit = false
  public isfailed = false
  public gotype = 0
  constructor(public navCtrl: NavController, public navParams: NavParams, private Provider: MamenDataProvider) {
    this.projectData = {};
  }

  ionViewDidLoad() {
    this.projectData = this.navParams.get('projectData') || {};
    this.projectData['industryList'] = this.projectData['pIndustry'] ? this.projectData['pIndustry'] : [];
    this.projectData['skillList'] = this.projectData['pSkill'] ? this.projectData['pSkill'] : [];
    this.isEdit = this.navParams.get('isEdit') || false;
    console.log(this.projectData, 'ionViewDidLoad ProjectEditStep3Page');
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
  sureSubmit() {
    this.isSubmit = !this.isSubmit
    if(this.gotype == 1){
      this.navCtrl.push(ProjectBrowserPage);
    }else{
      this.navCtrl.push(ProjectListPage);
    }
    
  }
  sureFailed() {
    this.isfailed = !this.isfailed
    return
  }
  /*保存提交*/
  goProjectSubmit() {
    this.projectData['otherIndustrys'] = this.getOtherIndustrys(this.projectData['industryList']);
    this.projectData['otherSkills'] = this.getOtherIndustrys(this.projectData['skillList']);
    let industrys = this.projectData['industryList'] && this.projectData['industryList'].length > 0 ? this.projectData['industryList'].map(f => f.id).join(',') : '';
    let skills = this.projectData['skillList'] && this.projectData['skillList'].length > 0 ? this.projectData['skillList'].map(f => f.id).join(',') : '';
    let otherIndustrys = this.projectData['otherIndustrys'] && this.projectData['otherIndustrys'].length > 0 ? this.projectData['otherIndustrys'].join(',') : '';
    let otherSkills = this.projectData['otherSkills'] && this.projectData['otherSkills'].length > 0 ? this.projectData['otherSkills'].join(',') : '';
    let projectData = this.projectData;
    let language = this.projectData['planguage'] && this.projectData['planguage'].length > 0 ? this.projectData['planguage'].map(f => f.language).join(',') : '';
    let grade = this.projectData['planguage'] && this.projectData['planguage'].length > 0 ? this.projectData['planguage'].map(f => f.grade).join(',') : '';
    let pid = projectData['pid'];
    // 必填项校验
    if((!projectData.startTimeType && projectData.startTimeType !=0) || (!projectData.deliverMethod && projectData.deliverMethod !=0) || !projectData.province  || (!projectData.budgetType && projectData.budgetType !=0) || (!projectData.planguage || projectData.planguage.length<1)) {
      this.isComplete = true;
      return;
    }
    // let projectStageDetailUrl = 'http://mamon.yemindream.com/mamon/customer/releaseProject';
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    let projectStageDetailUrl = releaseProjectUrl + '?openId=' + openId +
      '&cid=' + projectData['cid'] +
      '&principalName=' + projectData['principalName'] +
      '&principalPosition=' + projectData['principalPosition'] +
      '&principalPhone=' + (projectData['principalPhone'] || '') +
      '&principalEmail=' + (projectData['principalEmail'] || '') +
      '&projectName=' + (projectData['projectName'] || '') +
      '&description=' + (projectData['description'] || '') +
      '&target=' + (projectData['target'] || '') +
      '&industrys=' + industrys +
      '&skills=' + skills +
      '&projectLengthType=' + projectData['projectLengthType'] +
      '&projectLength=' + projectData['projectLength'] +
      '&startTimeType=' + projectData['startTimeType'] +
      '&startTime=' + projectData['startTime'] +
      '&deliverMethod=' + projectData['deliverMethod'] +
      '&budgetType=' + projectData['budgetType'] +
      '&budgetDay=' + (projectData['budgetDay'] || 0) +
      '&workload=' + (projectData['workload'] || 0) +
      '&budget=' + projectData['budget'] +
      '&languages=' + language +
      '&grades=' + grade +
      '&otherIndustrys=' + otherIndustrys +
      '&otherSkills=' + otherSkills +
      '&province=' + projectData['province'] +
      '&city=' + projectData['city'] +
      '&qualification=' + projectData['qualification'];

    if (pid) {
      projectStageDetailUrl = projectStageDetailUrl + '&pid=' + pid;
    }

   
    
    this.Provider.getMamenSwiperData(projectStageDetailUrl).subscribe(res => {
      if (res.code == 200) {
        this.isShow = true;
      } else if (res.code == 213) {
        //alert(res.msg);
      } else {
        //alert('请求出错:' + res.msg);
      }
    }, error => {
      console.log('erros===', error);
    })
  }
  // 确定填写完整
  sureComplete() {
    this.isComplete = !this.isComplete;
  }
  /*获取行业其他值*/
  getOtherIndustrys(data) {
    return data.map(d => {
      if (d.id == -1) {
        return d.text;
      } else {
        return 1;
      }
    })
  } 

  /*列表编辑*/
  goFormEditPage(field, value, type) {
    
    if (field == 'skillList') {
      
      value = value && value.length ? value.map(d => ({ id: d.psid || d.id, text: d.skillName||d.text })) : [];
      console.log(value,'============');
    } else if (field == 'industryList') {
      console.log(value,'industryListindustryListindustryListindustryList');
      value = value && value.length ? value.map(d => ({ id: d.piid || d.id, text: d.industryName||d.text })) : [];
    }
    if (type == 'timeSelect') {
      this.navCtrl.push(ProjectTimeSelectPage, { callback: this.setValue, value: value, field: field, type: type });
    } else {
      this.navCtrl.push(FormEditPage, { callback: this.setValue, value: value, field: field, type: type });
    }

  }

  // /*设置值（回调函数）*/
  // setValue = (field,value)=> {
  //   if(field == 'province-city'){
  //     this.projectData['province'] = value['province'] || ''
  //     this.projectData['city'] = value['city'] || ''
  //     return;
  //   }else if(field == 'projectTime'){
  //     this.projectData['projectLengthType'] = value[0] || 0;
  //     this.projectData['projectLength'] = value[1] || '';
  //   }else if(field == 'startTime') {
  //     this.projectData['startTimeType'] = value[0] || 0;
  //   if (type == 'timeSelect') {
  //     this.navCtrl.push(ProjectTimeSelectPage, { callback: this.setValue, value: value, field: field, type: type });
  //   } else {
  //     this.navCtrl.push(FormEditPage, { callback: this.setValue, value: value, field: field, type: type });
  //   }

  // }

  /*设置值（回调函数）*/
  setValue = (field, value) => {
    console.log(field, value, 11112312);
    if (field == 'province-city') {
      this.projectData['province'] = value['province'] || ''
      this.projectData['city'] = value['city'] || ''
      return;
    } else if (field == 'projectTime') {
      this.projectData['projectLengthType'] = value[0] || 0;
      this.projectData['projectLength'] = value[1] || '';
    } else if (field == 'startTime') {
      console.log(value,'valuevaluevaluevaluevaluevalue');
      this.projectData['startTimeType'] = value[0] || 0;
      this.projectData['startTime'] = value[1] || '';
    } else if (field == 'deliverMethod') {
      this.projectData[field] = value
    } else if (field == 'qualification') {
      this.projectData[field] = value;
    } else if (field == 'project_budget') {
      this.projectData['budgetType'] = value[0] || 0;
      this.projectData['budgetDay'] = value[1] || '';
      this.projectData['workload'] = value[2] || '';
      this.projectData['budget'] = value[3] || '';
    } else {
      this.projectData[field] = value;
    }

  }

  /*存为草稿*/
  onDraftSubmit(type) {
    this.projectData['otherIndustrys'] = this.getOtherIndustrys(this.projectData['industryList']);
    this.projectData['otherSkills'] = this.getOtherIndustrys(this.projectData['skillList']);
    let industrys = this.projectData['industryList'] && this.projectData['industryList'].length > 0 ? this.projectData['industryList'].map(f => f.id).join(',') : '';
    let skills = this.projectData['skillList'] && this.projectData['skillList'].length > 0 ? this.projectData['skillList'].map(f => f.id).join(',') : '';
    let otherIndustrys = this.projectData['otherIndustrys'] && this.projectData['otherIndustrys'].length > 0 ? this.projectData['otherIndustrys'].join(',') : '';
    let otherSkills = this.projectData['otherSkills'] && this.projectData['otherSkills'].length > 0 ? this.projectData['otherSkills'].join(',') : '';
    let projectData = this.projectData;
    let language = this.projectData['planguage'] && this.projectData['planguage'].length > 0 ? this.projectData['planguage'].map(f => f.language).join(',') : '';
    let grade = this.projectData['planguage'] && this.projectData['planguage'].length > 0 ? this.projectData['planguage'].map(f => f.grade).join(',') : '';
    let pid = projectData['pid'];
    // let projectStageDetailUrl = 'http://mamon.yemindream.com/mamon/customer/savaraft';
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId') || 'o2GZp1Gsud1OVuaw5AH_e28m3kOw'
    let projectStageDetailUrl = savaraftUrl + '?openId=' + openId +
      '&cid=' + projectData['cid'] +
      '&principalName=' + (projectData['principalName'] || '') +
      '&principalPosition=' + (projectData['principalPosition'] || '') +
      '&principalPhone=' + (projectData['principalPhone'] || '')+
      '&principalEmail=' +( projectData['principalEmail'] || '') +
      '&projectName=' + (projectData['projectName'] || '') +
      '&description=' + (projectData['description'] || '') +
      '&target=' + (projectData['target'] || '')+
      '&industrys=' + (industrys || '') +
      '&skills=' + (skills || '')+
      '&projectLengthType=' + projectData['projectLengthType']+
      '&projectLength=' + (projectData['projectLength'] || '')+
      '&startTimeType=' + (projectData['startTimeType'])+
      '&startTime=' + (projectData['startTime'] || '')+
      '&deliverMethod=' + (projectData['deliverMethod']) +
      '&budgetType=' + (projectData['budgetType'])+
      '&budgetDay=' + (projectData['budgetDay'] || 0) +
      '&workload=' + (projectData['workload'] || 0) +
      '&budget=' + (projectData['budget']) +
      '&languages=' + (language || '') +
      '&grades=' + (grade || '')+
      '&otherIndustrys=' + (otherIndustrys || '')+
      '&otherSkills=' + (otherSkills || '')+
      '&province=' + (projectData['province'] || '')+
      '&city=' + (projectData['city'] || '')+
      '&qualification=' + (projectData['qualification'] || '');
    if (pid) {
      projectStageDetailUrl = projectStageDetailUrl + '&pid=' + pid;
    }
    this.Provider.getMamenSwiperData(projectStageDetailUrl).subscribe(res => {
      if (res.code == 200) {
        // this.isShow = true;
        //alert('保存成功！')
        this.gotype = type;
        this.isSubmit = true
      }else {
        this.isfailed = true
      }
    }, error => {
      console.log('erros===', error);
    })
  }

  /*功能之后跳转*/
  goClientProjectPage() {
    this.navCtrl.push(ProjectListPage);
    this.isShow = false;
  }
  /*点击返回快速发布*/
  goSpeedPage() {
    console.log(111111111111111111)
    this.isSpeed = true;
  }
  /*跳转到快速发布页面*/
  goClientProjectSpeedPage() {
    this.navCtrl.push(SpeedPage);
    this.isSpeed = false;
  }
  /*点击返回*/
  onCompanyDel() {
    this.isSpeed = false;
  }
}
