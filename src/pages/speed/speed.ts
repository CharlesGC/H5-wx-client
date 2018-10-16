import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { ReleaseThreePage } from '../release-three/release-three';
// import { ReleaseSuccessPage } from '../release-success/release-success';
import { MamenDataProvider } from '../../providers/mamen-data/mamen-data';
import { ProjectListPage } from '../../pages/my-project/client/project-list/project-list';
import { ProjectEditStep1Page } from '../my-project/client/project-edit-step1/project-edit-step1';
import { getWechatJsConfig, getUploadLocal, getSpeedrelease } from '../../providers/dataUrl';
import { HttpClient, HttpParams } from '@angular/common/http';
import { hideAttentionMenuUrl, getAttentionUserInfo } from '../../providers/requestUrl'
declare var wx: any;
// declare var $: any;
@IonicPage()
@Component({
  selector: 'page-speed',
  templateUrl: 'speed.html'
})
export class SpeedPage {
  public localId:any;
  public START:any;
  public END:any;
  // public Record = new Date().getTime();
  public recordTimer: any;
  public timer: any;
  public isRecord = false;//是否播放

  public isPause = false;
  public isRuning = true;
  public audioData = [];
  public audio: any;
  public duration: any;
  public audioUrl = {};
  public animationplay: any;
  public selected = -1;
  public speedVoiceReleaseArr: any;
  public description: any;
  public voice: any;
  public isShow = false;
  public isChange = false;
  public isComplete = false;
  public isTime = false;
  public isConcerned = false;
  public attstate:any;
  public isCompany = false;
  // public Url:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public WechatData: MamenDataProvider, public UploadData: MamenDataProvider,
    public changeDetectorRef: ChangeDetectorRef, public speedVoiceData: MamenDataProvider, private http: HttpClient) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SpeedPage');
    // this.audioData = [{ url: '../../assets/js/BmuN5wbnOdzRQpU0yUpKrFPy3CwgRPytCJs2GMc2AqX_m3WdOAEFqUge0muzNqqH.mp3' }, {
    //   url: '../../assets/js/fQcm5V91gRC5qhgG2btytH0f66LFP9LFlvm2LS7hHBQRumRJDK0UyJVvPvWbvceM.mp3'
    // }, { url: '../../assets/js/SKG4pSxf2yVhJ0aCBRAm_PVMyJaWG0uB6D700junb2HcQa4oH1EfIhn8ks0RJM0R.mp3' }, { url: '../../assets/js/XCiXTMcrw_PMtE1I0DnMS3TMbOlH0sxN3YrDNRsHkweoUK3ZPiqWPAnQriPMo4Hi.mp3' }];

  }
  ionViewDidEnter() {
    this.audioData = [];
    this.description = '';
    //当页面进入初始化的时候
    let elements = document.querySelectorAll(".tabbar");
    if (elements != null) {
      Object.keys(elements).map((key) => {
        elements[key].style.display = 'none';
      });
    }
    const openId = this.getUrlParam('openId') ||  window.sessionStorage.getItem('openId') || window.localStorage.getItem('openId');
    openId && window.localStorage.setItem('openId', openId);
    let getAttentionUserInfoUrl = getAttentionUserInfo + '?openId=' + openId;
    this.http.get(getAttentionUserInfoUrl).subscribe(res => {
      this.attstate = res['data'].subscribe;
      console.log(this.attstate ,'this.attstate this.attstate ')
      console.log(res, '1111222233334444')
    });
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
  //点击完整发布
  goRelease() {
    this.isChange = true;
  }
  // 跳转到完整发布
  goClientProjectEdit1Page() {
    this.navCtrl.push(ProjectEditStep1Page);
    this.isChange = false;
  }
  // 返回
  onCompanyDel() {
    this.isChange = false;
  }
  // 录音时间小于3ms返回
  surehidden() {
    this.isTime = !this.isTime;
  }
  // 语音播放
  autoPlay(e, index) {
    this.audio = document.getElementsByTagName('audio');
    //  总时长
    this.duration = this.audio[index].duration;
    var math = Math.round(this.duration);
    this.duration = math;
    // console.log(math);
    console.log(this.duration, '秒');
    this.audio[index].onended = () => {
      // alert('执行完成');
      spinner1[index]['style'].display = 'none';
      spinner[index]['style'].display = 'block';
    }
    // console.log(this.audio)
    let spinner = document.getElementsByClassName('audio-spinner');
    let spinner1 = document.getElementsByClassName('audio-spinner1');
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
  // 删除
  deletAudio(i) {
    console.log(i, '*************************8');
    this.audioData && this.audioData.length > 0 && this.audioData.splice(i, 1);
    this.changeDetectorRef.markForCheck();
    this.changeDetectorRef.detectChanges();
  }
  // 阻止默认事件
  // touchmoveDefault(event) {
  //   event.preventDefault();
  // }
  // 长按语音输入
  startTouch(event) {
    event.preventDefault();
    var _this = this;
    console.log(event, '=====')
    let url = location.href.split('#')[0]; // 当前网页的URL，不包含#及其后面部分
    this.localId = '';
    this.WechatData.getWechatJs(getWechatJsConfig, url).subscribe(
      res => {
        console.log(res);
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: res.data.appid, // 必填，公众号的唯一标识
          timestamp: res.data.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
          signature: res.data.signature, // 必填，签名
          jsApiList: ['startRecord', 'stopRecord', 'uploadVoice'] // 必填，需要使用的JS接口列表
        });
      }, error => {
        console.log(error);
      }
    )
    this.isRecord = true;//是否显示录音gif
    this.START = new Date().getTime();
    // console.log(this.START, 'getTime');
    // 判断是否关注
    if(this.attstate == 0) {
      this.isConcerned = true;
      return;
    }
    wx.startRecord({
      success: function () {
        localStorage.rainAllowRecord = 'true';
        // wx.startRecord();
        // //  alert('录音开始'); 
        // return;
      },
      cancel: function () {
        _this.isRecord = false;
      }
    })
    this.recordTimer = setTimeout(() => {
      wx.startRecord({
        success: function () {
          localStorage.rainAllowRecord = 'true';
          // wx.startRecord();
          //  alert('录音开始'); 
          // return;
        },
        cancel: function () {
          _this.isRecord = false;
        }
      })
      // localStorage.rainAllowRecord = 'true';
    }, 500);
  }
  /*结束录音*/
  endTouch(event) {
    console.log(event + "************")
    // event.preventDefault();
    this.isRecord = false;
    this.END = new Date().getTime();
    /*小于300ms，不录音*/
    if ((this.END  - this.START) < 300) {
      this.END = 0;
      this.START = 0;
      wx.stopRecord({
        success: function (res) {
          wx.stopRecord({
            success: function (res) {
              console.log(111111111111);
              // alert('录音结束');
            }
          })
        }
      });
      // alert('小于300ms，不录音');
      this.isTime = true;
      clearTimeout(this.recordTimer);
    } else {
      // var audioData = [];
      // var _this = this;
      wx.stopRecord({
        success: (res) => {
          this.localId = res.localId;
          // 上传语音
          if (this.localId != '') {
            wx.uploadVoice({
              localId: this.localId, // 需要上传的音频的本地ID，由stopRecord接口获得
              isShowProgressTips: 1, // 默认为1，显示进度提示
              success: (res) => {
                var serverId = res.serverId
                // var serverId = 0;
                //把录音在微信服务器上的id（res.serverId）发送到自己的服务器供下载。
                if (serverId != '') {
                  this.UploadData.getUpload(getUploadLocal, serverId).subscribe(
                    res => {
                      this.audioData.push(res.data);
                      this.changeDetectorRef.markForCheck();
                      this.changeDetectorRef.detectChanges();
                      console.log(this.audioData, 11111111111);
                      this.localId = '';
                    }, error => {
                      console.log(error);
                      this.isRecord = true;
                    }
                  )
                }
              }
            });
          }
          console.log(res);
        },
        fail: function (res) {
          // alert(JSON.stringify(res));
        }
      });
    }
  }
  /*动态获取openId*/
  getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象  
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数  
    if (r != null) {
      return encodeURI(r[2]);  //返回参数值 
    } else {
      return null;
    }
  }
  /*快速发布*/
  onSpeedReleaseSubmit(value) {
    console.log(value);
    // o2GZp1KSbS2Ab6zWjBurLzfcrAKk
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId') || window.localStorage.getItem('openId');
    this.description = value;
    let Arr = this.audioData || [];
    this.voice = Arr.length > 0 ? Arr.map(f => f.url).join(",") : '';
    if (!this.description && this.description != 0) {
      this.isComplete = true;
      return;
    }
    this.speedVoiceData.getSpeedReleaseData(getSpeedrelease, openId, this.description, this.voice).subscribe(
      res => {
        if (res.code == 200) {
          this.speedVoiceReleaseArr = res.data;
          console.log(this.speedVoiceReleaseArr);
          this.isShow = true;
        } else if(res.code == 212){
          this.isCompany = true;
        }else{
          console.log('请求出错：' + res.msg);
        }
      }, error => {
        console.log(error);
      }
    )
  }
  // 确定
  sureComplete() {
    this.isComplete = !this.isComplete;
  }
  // 未关注确定
  sureConcerned() {
    this.isConcerned = !this.isConcerned;
  }
  //未添加公司
  sureCompany() {
    this.isCompany = !this.isCompany
  }
  /*功能之后跳转*/
  goClientProjectPage() {
    this.navCtrl.push(ProjectListPage);
    this.isShow = false;
  }
  // 返回首页
  goback() {
    // this.navCtrl.goToRoot(HomePage); 
    this.navCtrl.parent.select(0);
  }
}

