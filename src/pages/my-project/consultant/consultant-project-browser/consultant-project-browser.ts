import { Component, ViewChild } from '@angular/core';

import { IonicPage, NavController, NavParams, Nav, Platform, App, ModalController } from 'ionic-angular';
// import { StatusBar, Splashscreen } from 'ionic-native';

import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';
import { ApplicationProjectPage } from '../../application-project/application-project';
import { ConsultantProgramListPage } from '../consultant-program-list/consultant-program-list';
import { ConsultantStageListPage } from '../consultant-stage-list/consultant-stage-list';
import { ConsultantDocumentListPage } from '../consultant-document-list/consultant-document-list';
import { ConsultantCollectionListPage } from '../consultant-collection-list/consultant-collection-list';
import { PorjectEvalutionPage } from '../../porject-evalution/porject-evalution';
import { demandDeatilUrl } from '../../../../providers/requestUrl';
import { ConsultantProjectListPage } from '../consultant-project-list/consultant-project-list';

/**
 * Generated class for the ConsultantProjectBrowserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-consultant-project-browser',
  templateUrl: 'consultant-project-browser.html',
})

export class ConsultantProjectBrowserPage {
  // @ViewChild(Nav) nav: Nav;
  // rootPage: any = ConsultantProgramListPage;

  // pages: Array<{title: string, component: any}>;
  // public pages =  [];

  public isShowNavMenu = false;
  public showNavMenuName = '';
  public showNavMenuNumber = 0;
  public projectDetails = {}
  public projectSignCount = {};
  public projectProgramCount = {};
  public projectStageCount = {};
  public projectDocumentCount = {};
  public menu = [
    { name: 'navMenu1', isShow: true }
  ];
  public isApply = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private Provider: MamenDataProvider, public platform: Platform, private app: App, public modalCtrl: ModalController) {

    // this.initializeApp();

    // used for an example of ngFor and navigation
    // this.pages = [
    //   { title: '方案', component: ConsultantProgramListPage  },
    //   { title: '阶段', component: ConsultantStageListPage },
    //   { title: '文档', component: ConsultantDocumentListPage },
    //   { title: '收款记录', component: ConsultantCollectionListPage },
    // ];
  }

  // initializeApp() {
  //   this.platform.ready().then(() => {
  //     // Okay, so the platform is ready and our plugins are available.
  //     // Here you can do any higher level native things you might need.
  //     StatusBar.styleDefault();
  //     Splashscreen.hide();
  //   });
  // }

  // openPage(page) {
  //   // Reset the content nav to have just this page
  //   // we wouldn't want the back button to show in this scenario
  //   this.nav.setRoot(page.component,{pid:this.projectDetails['pid'],status:-1,projectType:this.projectDetails['appStatus'],programPrice:this.projectDetails['finalPrice']});
  //   console.log(12312321)
  // }



  ionViewDidLoad() {
    this.isApply = this.navParams.get('isApply');
    console.log(this.navParams.get('data'), 'ionViewDidLoad ProjectBrowserPage');
    let data = this.navParams.get('data')
    this.getProjectListData(data.pid);
  }
  ionViewDidEnter() {
    console.log(this.navParams.get('data'), 'ionViewDidEnter ProjectBrowserPage');
    let data = this.navParams.get('data')
    this.getProjectListData(data.pid);
    window.sessionStorage.setItem('pid', data.pid || 0);


  }
  /*点击展开、收起*/
  onNavMenuClick(value) {
    console.log(value, 'value');
    this.isShowNavMenu = value;
  }

  isGoBack(appStatus) {
    if (appStatus == 0) {

    }
  }

  /*点击菜单触发*/
  onNavMenuItemClick(type, typeName, status) {
    this.showNavMenuName = typeName;
    this.isShowNavMenu = false;
    this.showNavMenuNumber = 2
    //TODO 提示语
    if (type == 1) {
      let data = this.navParams.get('data');
      this.getProjectListData(data.pid);
    } else if (type == 2) {
      this.projectDetails['appStatus'] != 0 && this.projectDetails['appStatus'] != 1 &&
        this.projectDetails['appStatus'] != 2 && this.projectDetails['appStatus'] != 3 &&
        this.navCtrl.push(ConsultantProgramListPage, { pid: this.projectDetails['pid'], status: status || '', data: this.projectDetails });
      // console.log(this.navCtrl['index'],'----',this.app)
      // this.app.getRootNav().push(ConsultantProjectListPage);
      // this.navCtrl.setRoot(ConsultantProjectListPage);
      // this.navCtrl.parent.select(3)
      // this.navCtrl.remove(12)
      // this.app.navPop().
      // this.navCtrl.popToRoot().then(()=>{
      //   this.navCtrl.push(ConsultantProjectListPage);
      // });
      // this.navCtrl.popToRoot().push(ConsultantProjectListPage);
      // let SecondPage = this.modalCtrl.create(ConsultantProjectListPage);
      // SecondPage.present;
      // this.navCtrl.setRoot(ConsultantProjectListPage);
      // this.app.getRootNav().setRoot("LoginPage");
    } else if (type == 3) {
      this.projectDetails['appStatus'] != 6 && this.projectDetails['appStatus'] != 4 &&
        this.projectDetails['appStatus'] != 0 && this.projectDetails['appStatus'] != 1 &&
        this.projectDetails['appStatus'] != 2 && this.projectDetails['appStatus'] != 3 &&
        this.navCtrl.push(ConsultantStageListPage, {
          pid: this.projectDetails['pid'], status: status, projectType: this.projectDetails['appStatus'],
          programPrice: this.projectDetails['finalPrice'], data: this.projectDetails
        });
    } else if (type == 4) {
      this.projectDetails['appStatus'] != 0 && this.projectDetails['appStatus'] != 1 &&
        this.projectDetails['appStatus'] != 2 && this.projectDetails['appStatus'] != 3 &&
        this.navCtrl.push(ConsultantDocumentListPage, { pid: this.projectDetails['pid'], status: status, data: this.projectDetails });
    } else if (type == 5) {
      this.projectDetails['appStatus'] != 6 && this.projectDetails['appStatus'] != 4 &&
        this.projectDetails['appStatus'] != 0 && this.projectDetails['appStatus'] != 1 &&
        this.projectDetails['appStatus'] != 2 && this.projectDetails['appStatus'] != 3 &&
        this.navCtrl.push(ConsultantCollectionListPage, { pid: this.projectDetails['pid'], status: status, data: this.projectDetails });
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

  /*项目详情数据请求*/
  getProjectListData(pid) {
    // let projectDetailsUrl = 'http://mamon.yemindream.com/mamon/adviser/demandDeatil';
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    let projectDetailsUrl = demandDeatilUrl + '?openId=' + openId + '&pid=' + pid;
    this.Provider.getMamenSwiperData(projectDetailsUrl).subscribe(res => {
      if (res.code == 200) {
        console.log(res, '--------');
        this.projectDetails = res.data || {};
      } else if (res.code == 207) {
        window.localStorage.removeItem('openId');
      } else {
        alert('请求出错:' + res.msg);
      }
    }, error => {
      console.log('erros===', error);
    })
  }

  // /*项目申请发上请求*/
  // onProjectReleaseSubmit(pid) {
  //   let releaseProjectUrl = 'http://mamon.yemindream.com/mamon/customer/releaseProject';
  //   const openId = window.sessionStorage.getItem('openId') ||'o2GZp1Gsud1OVuaw5AH_e28m3kOw'
  //   releaseProjectUrl = releaseProjectUrl + '?openId=' + openId + '&pid='+pid;
  //   this.Provider.getMamenSwiperData(releaseProjectUrl).subscribe(res=>{
  //     if(res.code==200) {
  //       alert('发布成功！');
  //       this.navCtrl.pop();
  //     }else if(res.code == 207) {
  //       window.localStorage.removeItem('openId');
  //     }else{
  //       alert('请求出错:'+res.msg);
  //     }
  //   },error=>{
  //     console.log('erros===',error);
  //   })
  // }



  /*申请项目请求*/
  onApplicationProject() {
    this.navCtrl.push(ApplicationProjectPage, { data: this.projectDetails });
  }

  /*跳转到项目评价*/
  goEvalutionPage() {
    this.navCtrl.push(PorjectEvalutionPage, { pid: this.projectDetails['pid'], type: 'consultantEvalution' });
  }
  // 返回项目列表页
  goback() {
    this.navCtrl.popTo(this.navCtrl.getByIndex(1))
  }
}
