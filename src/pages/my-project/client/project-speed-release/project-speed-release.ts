import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { getProjectDetailUrl, hideAttentionMenuUrl, getAttentionUserInfo } from '../../../../providers/requestUrl';
import { MamenDataProvider } from '../../../../providers/mamen-data/mamen-data';
import { HttpClient, HttpParams } from '@angular/common/http';
declare var wx: any;
/**
 * Generated class for the ProjectSpeedReleasePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-project-speed-release',
  templateUrl: 'project-speed-release.html',
})
export class ProjectSpeedReleasePage {
  public audio: any;
  public duration: any;
  public projectDetails = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public changeDetectorRef: ChangeDetectorRef, 
    public Provider: MamenDataProvider, private http: HttpClient, public sanitizer: DomSanitizer) {
  }
  /*转换html标签处理*/
  assembleHTML(strHTML: any) {
    return this.sanitizer.bypassSecurityTrustHtml(strHTML);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectSpeedReleasePage');
    let data = this.navParams.get('data') || {};
    this.getProjectListData(data.pid);
  }
  ionViewDidEnter() {
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
  /*项目详情数据请求*/
  getProjectListData(pid) {
    // let projectDetailsUrl = 'http://mamon.yemindream.com/mamon/customer/getProjectDetail';
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
    let projectDetailsUrl = getProjectDetailUrl + '?openId=' + openId + '&pid=' + pid;
    this.Provider.getMamenSwiperData(projectDetailsUrl).subscribe(res => {
      if (res.code == 200) {
        this.projectDetails.push(res.data);
      } else if (res.code == 207) {
        window.localStorage.removeItem('openId');
      } else {
        alert('请求出错:' + res.msg);
      }
    }, error => {
      console.log('erros===', error);
    })
  }
  // 语音播放
  autoPlay(e, index) {
    console.log(111111111111)
    // this.audio = document.getElementsByTagName('audio')[0];
    this.audio = document.getElementsByTagName('audio');
    console.log(this.audio, '语音')
    //  总时长
    // this.duration = this.audio[index].duration;
    // var math = Math.round(this.duration); 
    // this.duration = math;
    // // console.log(math);
    // console.log( this.duration,'秒');
    /*播放完成事件*/
    this.audio[index].onended = () => {
      // alert('执行完成');
      spinner1[index]['style'].display = 'none';
      spinner[index]['style'].display = 'block';
    }
    console.log(this.audio)
    // let spinner = document.getElementsByClassName('audio-spinner')[0];
    // let spinner1 = document.getElementsByClassName('audio-spinner1')[0];
    let spinner = document.getElementsByClassName('audio-spinner');
    let spinner1 = document.getElementsByClassName('audio-spinner1');
    console.log(spinner, spinner1, 2222222222222);
    for (let i = 0; i < this.audio.length; i++) {
      if (index === i) {
        // spinner1[i]['style'].display = 'block';
        // spinner[i]['style'].display = 'none';
        if (this.audio[i].paused) {
          this.audio[i].play();
          spinner1[i]['style'].display = 'block';
          spinner[i]['style'].display = 'none';
        } else {
          this.audio[i].pause();
          spinner1[i]['style'].display = 'none';
          spinner[i]['style'].display = 'block';
        }

      } else {
        spinner1[i]['style'].display = 'none';
        spinner[i]['style'].display = 'block';
        this.audio[i].pause();
        if (this.audio[i].paused) {
          this.audio[i].load();
        }
      }
    }
  }

  // 请求openId
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
