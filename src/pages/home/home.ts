import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import {IndustrydetialPage} from '../industrydetial/industrydetial';
import {MamenDataProvider} from '../../providers/mamen-data/mamen-data';
import { PhonebindPage } from '../phonebind/phonebind';
import { ChooseIdentityPage } from '../choose-identity/choose-identity';

import {ViewChild } from '@angular/core';

import { Slides } from 'ionic-angular';

// import { data,mamen_hy,mamen_jn,ma_qiaochu,finance,ma_case ,financeAll} from '../../Mock/data.js';
import {getswipreUrl,getindustryUrl,getskillUrl,getcaseUrl,getoutstandingUrl,getfinanceUrl, getfinanceAllUrl} from '../../providers/dataUrl';
// const guwenType = [
//   {
//     type: 'A',
//     title: ''
//   },
//   {
//     type:'B',
//     title:''
//   }
// ]
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  @ViewChild(Slides) slides: Slides;
  private swiperArr:Array<any>;
  private IndustryArr=[];
  public skillArr: Array<any>;
  public caseArr: Array<any>;
  public outstandingArr:any;
  public financesArr:any;
  public financesArrLength:any;
  public financeAllArr:any;
  public financeAllArrlength:any;
  public pepperoni:boolean;
  public sausage:boolean;
  public mushrooms:boolean;
  
  constructor(public navCtrl: NavController,private swiperdata:MamenDataProvider,private industrydata:MamenDataProvider,
    private skilldata:MamenDataProvider,private casedata:MamenDataProvider,private outstanddata:MamenDataProvider,private financedata:MamenDataProvider,
     private financeAlldata:MamenDataProvider) {
       this.IndustryArr = [];
  }
  ionViewDidLoad(){
    // console.log(getswipreUrl);
    this.getswiperInfo ();
    this.getindustryInfo ();
    this.getskillInfo();
    this.getcaseInfo();
    this.getoutstandingInfo();
    this.getfinanceInfo();
    this.getfinanceAllInfo ();
  }
  //  轮播图数据
  getswiperInfo () {
    this.swiperdata.getBannerSwiperData(getswipreUrl,1).subscribe(
  		res=>{
			console.log(res);
  			this.swiperArr = res.data;
			console.log(this.swiperArr);
  		},error=>{
  			console.log(error);
  		}
  	)
  }
 // 行业数据 
 getindustryInfo () {
    this.industrydata.getIndustryData(getindustryUrl,0).subscribe(
      res=>{
      console.log(res);
        this.IndustryArr = res.data.list;
       console.log(this.IndustryArr);
      },error=>{
        console.log(error);
      }
    )
 }
//技能数据
getskillInfo () {
  this.skilldata.getSkillLabelData(getskillUrl,0).subscribe(
        res=>{
        console.log(res);
          this.skillArr = res.data.list;
        console.log(this.skillArr);
        },error=>{
          console.log(error);
        }
    )
}
// 案例数据
getcaseInfo () {
  this.casedata.getcaseData(getcaseUrl,2).subscribe(
        res=>{
        console.log(res);
          this.caseArr = res.data;
        console.log( this.caseArr);
        },error=>{
          console.log(error);
        }
    )
}
 
// 翘楚
getoutstandingInfo () {
  this.outstanddata.getcaseData(getoutstandingUrl,1).subscribe(
        res=>{
        console.log(res);
          this.outstandingArr = {
            type: 1,
            title: '行业翘楚',
            data: res.data
          };
          console.log(this.outstandingArr.data)
        },error=>{
          console.log(error);
        }
    )
  }

  // 财务审计
  getfinanceInfo () {
   this.financedata.getcaseData(getfinanceUrl,2).subscribe(
        res=>{
        console.log(res);
          this.financesArr = {
            type: 2,
            title: '财务审计顾问',
            data: res.data
          };
          // this.financesArr = res.data;
          this.financesArrLength = this.financesArr.data.filter((f,i)=>i<3);
          console.log(this.financesArrLength);
        },error=>{
          console.log(error);
        }
    )
  } 
// 全部顾问
 getfinanceAllInfo () {
  this.financedata.getindustryAllData(getfinanceAllUrl,0).subscribe(
        res=>{
          console.log(1111)
        console.log(res);
          this.financeAllArr =  {
            type: 0,
            title: '全部顾问',
            data: res.data
          };;
          this.financeAllArrlength = this.financeAllArr.data.filter((f,i)=>i<4);
        console.log( this.financeAllArr);
        },error=>{
          console.log(error);
        }
    )
}
   //解决切换其他页面回去轮播图不动问题
    ionViewWillEnter(){
      this.slides.startAutoplay();
    }
    ionViewWillLeave(){
      this.slides.stopAutoplay();
    }
    
  //进入时执行
  ionViewDidEnter() {
    let elements = document.querySelectorAll(".tabbar");
    console.log(elements,'=======')
    if(elements != null) {
        Object.keys(elements).map((key) => {
            elements[key].style.display ='flex';
        });
    }
    const token = this.getUrlParam('token');
    const usertype = this.getUrlParam('status');
    const openId = this.getUrlParam('openId');
    openId && window.localStorage.setItem('openId',openId);
    console.log(token,usertype,9999999);
    if(token) {
      console.log('获取 ', usertype);
      if(Number(usertype) == 1){
        window.sessionStorage.setItem('token',token)
        this.navCtrl.push(PhonebindPage);
      }else if(Number(usertype) == 1) {
        // this.navCtrl.push(ChooseIdentityPage);
      }
    }else {

    }
  }
   //行业
   goToOtherPage (value,index,type) {
    if(value == '' && index == '' && type == 'indeustry') {
      this.navCtrl.push(IndustrydetialPage,{
        type:type
      })
    }else {
      this.navCtrl.push(IndustrydetialPage,{
        type:type,
        id:this.IndustryArr[index].ilid,
        name:this.IndustryArr[index].industryName,
      });
    } 
   
  }
  // 技能
  InfoskillMore (value,index,type) {
    if(value == '' && index == '' && type == 'skill') {
      this.navCtrl.push(IndustrydetialPage,{
        type:type
      });
    }else {
      this.navCtrl.push(IndustrydetialPage,{
        id1:this.skillArr[index].sfid,
        type:type,
        name1:this.skillArr[index].fName
      });
    } 
  }

  goOtherPage() {
    this.navCtrl.push(IndustrydetialPage);
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
}
