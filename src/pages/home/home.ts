import { Component, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';
import { IndustrydetialPage } from '../industrydetial/industrydetial';
import { MamenDataProvider } from '../../providers/mamen-data/mamen-data';
import { PhonebindPage } from '../phonebind/phonebind';
import { ProjectConsultantBrowserPage } from '../my-project/client/project-consultant-browser/project-consultant-browser';
import { ChooseIdentityPage } from '../../pages/choose-identity/choose-identity';
import { SwiperDetailPage } from './swiper-detail/swiper-detail';
// declare var onBridgeReady;

// import { ViewChild } from '@angular/core';

// import { Slides } from 'ionic-angular';

import { getswipreUrl, getindustryUrl, getskillUrl, getcaseUrl, getoutstandingUrl, getfinanceUrl, getfinanceAllUrl } from '../../providers/dataUrl';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  @ViewChild('slides ') slides: Slides;
  private swiperArr: Array<any>;
  private IndustryArr = [];
  public skillArr: Array<any>;
  public caseArr: Array<any>;
  public outstandingArr: any;
  public financesArr: any;
  public financesArrLength: any;
  public financeAllArr: any;
  public financeAllArrlength: any;
  public pepperoni: boolean;
  public sausage: boolean;
  public mushrooms: boolean;

  constructor(public navCtrl: NavController, private swiperdata: MamenDataProvider, private industrydata: MamenDataProvider,
    private skilldata: MamenDataProvider, private casedata: MamenDataProvider, private outstanddata: MamenDataProvider, private financedata: MamenDataProvider,private financeAlldata: MamenDataProvider) {
    this.IndustryArr = [];
  }
  ionViewDidLoad() {
    this.getswiperInfo();
    this.getindustryInfo();
    this.getskillInfo();
    this.getcaseInfo();
    this.getoutstandingInfo();
    this.getfinanceInfo();
    this.getfinanceAllInfo();
  }
  //  轮播图数据
  getswiperInfo() {
    this.swiperdata.getBannerSwiperData(getswipreUrl, 1).subscribe(
      res => {
        // console.log(res);
        this.swiperArr = res.data;
        // console.log(this.swiperArr);
      }, error => {
        console.log(error);
      }
    )
  }
  // 行业数据 
  getindustryInfo() {
    this.industrydata.getIndustryData(getindustryUrl, 0).subscribe(
      res => {
        // console.log(res);
        this.IndustryArr = res.data.list;
        // console.log(this.IndustryArr);
      }, error => {
        console.log(error);
      }
    )
  }
  //技能数据
  getskillInfo() {
    this.skilldata.getSkillLabelData(getskillUrl, 0).subscribe(
      res => {
        // console.log(res);
        this.skillArr = res.data.list;
        // console.log(this.skillArr);
      }, error => {
        console.log(error);
      }
    )
  }
  // 案例数据
  getcaseInfo() {
    this.casedata.getcaseData(getcaseUrl, 2).subscribe(
      res => {
        // console.log(res);
        this.caseArr = res.data;
        // console.log(this.caseArr);
      }, error => {
        console.log(error);
      }
    )
  }
  // 翘楚
  getoutstandingInfo() {
    this.outstanddata.getoutstandingData(getoutstandingUrl, 1, '', '').subscribe(
      res => {
        console.log(res);
        this.outstandingArr = {
          type: 1,
          title: '行业翘楚',
          data: res.data
        };
      }, error => {
        console.log(error);
      }
    )
  }
  // 财务审计
  getfinanceInfo() {
    this.financedata.getfinanceData(getfinanceUrl, 2, 1, 6).subscribe(
      res => {
        this.financesArr = {
          type: 2,
          title: '财务审计顾问',
          data: res.data
        };
        // this.financesArr = res.data;
        this.financesArrLength = this.financesArr.data.filter((f, i) => i < 3);
        // console.log(this.financesArrLength);
      }, error => {
        console.log(error);
      }
    )
  }
  // 全部顾问
  getfinanceAllInfo() {
    this.financedata.getindustryAllData(getfinanceAllUrl, 0, 1, 4).subscribe(
      res => {
        this.financeAllArr = {
          type: 0,
          title: '全部顾问',
          data: res.data
        };
        this.financeAllArrlength = this.financeAllArr.data.filter((f, i) => i < 4);
      }, error => {
        console.log(error);
      }
    )
  }
  //解决切换其他页面回去轮播图不动问题
  // ionViewWillEnter() {
  //   this.slides.startAutoplay();
  // }
  // ionViewWillLeave() {
  //   this.slides.stopAutoplay();
  // }

  //进入时执行
  ionViewDidEnter() {
    let elements = document.querySelectorAll(".tabbar");
    if (elements != null) {
      Object.keys(elements).map((key) => {
        elements[key].style.display = 'flex';
      });
    }
    const token = this.getUrlParam('token');
    const usertype = this.getUrlParam('status');
    const openId = this.getUrlParam('openId');
    openId && window.localStorage.setItem('openId', openId);
    if (token) {
      if (Number(usertype) == 1) {
        window.sessionStorage.setItem('token', token)
        this.navCtrl.push(ChooseIdentityPage);
      } else if (Number(usertype) == 1) {
        // this.navCtrl.push(ChooseIdentityPage);
      }
    } else {

    }
  }
  //行业
  goToOtherPage(value, index, type) {
    this.navCtrl.push(IndustrydetialPage, {
      type: type,
      id: value ? this.IndustryArr[index].ilid : '',
      name: value ? this.IndustryArr[index].industryName : '',
    });
  }
  // 技能
  InfoskillMore(value, index, type) {
    this.navCtrl.push(IndustrydetialPage, {
      type: type,
      id: value ? this.skillArr[index].sfid : '',
      name: value ? this.skillArr[index].fName : '',
    });
  }
  // 行业翘楚
  outstanding(value, index, type) {
    this.navCtrl.push(IndustrydetialPage, {
      // type: 'indeustryOutstand'
      type:type
    });
  }
  // 财务审计
  financemore(value, index, type) {
    this.navCtrl.push(IndustrydetialPage, {
      // type: 'financemore'
      type:type
    });
  }
  // 全部顾问更多
  FinancCount(value, index, type) {
    this.navCtrl.push(IndustrydetialPage, {
      // type: 'finance-count'
      type:type
    });
  }
  // 全部顾问列表
  financeAllList(value, index) {
    // type=1代表顾问 0 代表客户
    const user = window.sessionStorage.getItem('user') ? JSON.parse(window.sessionStorage.getItem('user')) : {};
    this.navCtrl.push(ProjectConsultantBrowserPage, { uid: value.uid, type: 'homepage', userType: user.type });
  }
  // 获取openId
  getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象  
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数  
    if (r != null) {
      return encodeURI(r[2]);  //返回参数值 
    } else {
      return null;
    }
  }
  /*点击图片跳转到注册页*/
  goContactPage(e) {
    const user = window.sessionStorage.getItem('user') ? JSON.parse(window.sessionStorage.getItem('user')) : {};
    if (user.type == 0 || user.type == 1) {
      e.stopPropatation = true || e.cancelBubble;

    } else {
      this.navCtrl.push(ChooseIdentityPage);
    }
  }
  // 点击跳转到轮播图详情
  goSwiperDetail () {
    this.navCtrl.push(SwiperDetailPage);
  }
}
