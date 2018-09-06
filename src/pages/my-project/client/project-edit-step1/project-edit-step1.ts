import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';
import { ProjectEditStep2Page } from '../project-edit-step2/project-edit-step2';
import { ProjectCompanyListPage } from '../project-company-list/project-company-list';
import { FormEditPage } from '../../../contact/form-edit/form-edit';
import { ProjectListPage } from '../project-list/project-list';
import { savaraftUrl } from '../../../../providers/requestUrl';
import { SpeedPage } from '../../../speed/speed';

/**
 * Generated class for the ProjectEditStep1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-project-edit-step1',
  templateUrl: 'project-edit-step1.html',
})
export class ProjectEditStep1Page {
  public isEdit=false;
  public projectData:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private Provider:MamenDataProvider) {
    this.projectData = {}
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectEditStep1Page');
    this.projectData = this.navParams.get('projectData') || {};
    //当页面进入初始化的时候
      let elements = document.querySelectorAll(".tabbar");
      if(elements != null) {
          Object.keys(elements).map((key) => {
              elements[key].style.display ='none';
          });
      }  
    this.isEdit = this.navParams.get('isEdit') || false;
  }
  
  ionViewDidEnter(){
    //当页面进入初始化的时候
    let elements = document.querySelectorAll(".tabbar");
    if(elements != null) {
        Object.keys(elements).map((key) => {
            elements[key].style.display ='none';
        });
    }  
  }

  //当退出页面的时候
  // ionViewWillLeave() {
  //   let elements = document.querySelectorAll(".tabbar");
  //   if(elements != null) {
  //       Object.keys(elements).map((key) => {
  //           elements[key].style.display ='flex';
  //       });
  //   }
  // }   

  /*跳转到下一步*/
  goStep2Page() {
    this.navCtrl.push(ProjectEditStep2Page,{projectData:this.projectData,isEdit:this.isEdit});
  }

  /*列表编辑*/
  goFormEditPage(field, value, type) {
    if(type == 'selectList') {
      this.navCtrl.push(ProjectCompanyListPage,{field:field,data:this.projectData,callback:this.setValue})
    }else {
      this.navCtrl.push(FormEditPage,{callback:this.setValue,value:value,field:field,type:type});
    }
  }

  /*设置值（回调函数）*/
  setValue = (field,value)=> {
    console.log(field,value,'------')
    if(field == 'companyName'){
      this.projectData['cid'] = value[0];
      this.projectData['companyName'] = value[1];
    }else{
      this.projectData[field] = value;
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

  /*存为草稿*/
  onDraftSubmit() {
    let pid = this.projectData['pid'];
    let projectData = this.projectData;
    // let projectStageDetailUrl = 'http://mamon.yemindream.com/mamon/customer/savaraft';
    const openId = window.sessionStorage.getItem('openId')|| this.getUrlParam('openId');
    let projectStageDetailUrl = savaraftUrl + '?openId=' + openId +
                              '&cid='+projectData['cid']+
                              '&principalName='+projectData['principalName']+
                              '&principalPosition='+projectData['principalPosition']+
                              '&principalPhone='+projectData['principalPhone']+
                              '&principalEmail='+projectData['principalEmail'];
    if(pid) {
      projectStageDetailUrl = projectStageDetailUrl + '&pid=' + pid;
    }
    this.Provider.getMamenSwiperData(projectStageDetailUrl).subscribe(res=>{
      if(res.code==200) {
        alert('操作成功！');
        this.navCtrl.push(ProjectListPage);
      }else if(res.code == 207) {
        window.localStorage.removeItem('openId');
      }else{
        alert('请求出错:'+res.msg);
      }
    },error=>{
      console.log('erros===',error);
    })
  }

  /*跳转到快速发布页面*/
  goSpeedPage() {
    this.navCtrl.push(SpeedPage);
  }
  /* 返回到首页 */
  goback(){
    // this.navCtrl.goToRoot(HomePage); 
    this.navCtrl.parent.select(0);
  }

}
