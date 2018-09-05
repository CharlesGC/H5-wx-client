import { Component,ChangeDetectorRef  } from '@angular/core';
import { IonicPage, NavController, NavParams  } from 'ionic-angular'; 
import {ReleaseThreePage} from '../release-three/release-three';
import {ReleaseSuccessPage} from '../release-success/release-success';
import { MamenDataProvider } from '../../providers/mamen-data/mamen-data';
import {getWechatJsConfig,getUploadLocal} from '../../providers/dataUrl';

declare var wx: any;
declare var $:any;
@IonicPage()
@Component({
  selector: 'page-speed',
  templateUrl: 'speed.html'
})
export class SpeedPage {
  public localId = '';
  public START = new Date().getTime();
  public END = new Date().getTime();
  // public Record = new Date().getTime();
  public recordTimer:any;
  public timer:any;
  public isRecord = false;//是否播放
  
  public isPause = false;
  public isRuning = true;
  public audioData = [];
  public audio:any;
  public duration:any;
  public audioUrl= {};
  public animationplay:any;
  public selected = -1;
  constructor(public navCtrl: NavController, public navParams: NavParams,public WechatData:MamenDataProvider,public UploadData:MamenDataProvider,public changeDetectorRef:ChangeDetectorRef ) {
  }
  ionViewDidLoad() { 
    console.log('ionViewDidLoad SpeedPage');
    // this.audioData = [{url:'../../assets/js/BmuN5wbnOdzRQpU0yUpKrFPy3CwgRPytCJs2GMc2AqX_m3WdOAEFqUge0muzNqqH.mp3'},{
    //   url:'../../assets/js/fQcm5V91gRC5qhgG2btytH0f66LFP9LFlvm2LS7hHBQRumRJDK0UyJVvPvWbvceM.mp3'},{url:'../../assets/js/SKG4pSxf2yVhJ0aCBRAm_PVMyJaWG0uB6D700junb2HcQa4oH1EfIhn8ks0RJM0R.mp3'},{url:'../../assets/js/XCiXTMcrw_PMtE1I0DnMS3TMbOlH0sxN3YrDNRsHkweoUK3ZPiqWPAnQriPMo4Hi.mp3'}];
    
    // console.log(audio,'========')
    // audio.onended = () =>{
    //   alert('执行完成')
    // }
  }
  goback() {
    this.navCtrl.push(ReleaseThreePage);
  }
  /*到发布成功页面*/ 
  // gotosuccess () {
  //   this.navCtrl.push(ReleaseSuccessPage);  
  // }
  // 语音播放
  autoPlay(e,index) {
    this.audio = document.getElementsByTagName('audio');
      //  总时长
      this.duration = this.audio[index].duration;
      var math = Math.round(this.duration); 
      this.duration = math;
      // console.log(math);
      console.log( this.duration,'秒');
    this.audio[index].onended = () =>{
      // alert('执行完成');
      spinner1[index]['style'].display = 'none';
      spinner[index]['style'].display = 'block';
    }
    // console.log(this.audio)
    let spinner = document.getElementsByClassName('audio-spinner');
    let spinner1 = document.getElementsByClassName('audio-spinner1');
    for(let i=0;i<this.audio.length;i++) {
        if(index === i) {
          // spinner1[i]['style'].display = 'block';
          // spinner[i]['style'].display = 'none';
          if(this.audio[i].paused) {
            this.audio[i].play();
            spinner1[i]['style'].display = 'block';
            spinner[i]['style'].display = 'none';
          }else {
            this.audio[i].pause();
            spinner1[i]['style'].display = 'none';
            spinner[i]['style'].display = 'block';
          }
        
        }else {
          spinner1[i]['style'].display = 'none';
          spinner[i]['style'].display = 'block'; 
          this.audio[i].pause();
          if(this.audio[i].paused) {
            this.audio[i].load();
          }
        }
      } 
    }
  // 删除
  deletAudio (i) {
    console.log(i);
    this.audioData && this.audioData.length > 0 && this.audioData.splice(i,1);
    this.changeDetectorRef.markForCheck();
    this.changeDetectorRef.detectChanges();
  }
  // 阻止默认事件
  touchmoveDefault (event) {
    event.preventDefault();
  }
  // 长按语音输入
  startTouch(event) {
    // var _this = this;
    console.log(event,'=====')
    let url = location.href.split('#')[0]; // 当前网页的URL，不包含#及其后面部分
    this.localId = '';
    $.ajax({
        type : "get",
        url : "/mamon/wechat/wechatJsConfig",
        dataType : "json",
        data : {"url" : url},
        async : false, 
        success : function(res) {
          console.log(res);
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: res.data.appid, // 必填，公众号的唯一标识
            timestamp: res.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
            signature: res.data.signature, // 必填，签名
            jsApiList: ['startRecord', 'stopRecord', 'uploadVoice'] // 必填，需要使用的JS接口列表
          });
        }
    });
      this.isRecord = true;//是否显示录音gif
      this.START = new Date().getTime();
      console.log(this.START,'getTime');
      this.recordTimer = setTimeout(()=>{
      wx.startRecord({
            success: function(){
                localStorage.rainAllowRecord = 'true';
                wx.startRecord();
              //  alert('录音开始'); 
              return;
            },
            cancel: function () {
                alert('用户拒绝授权录音');
                this.isRecord = false;
            }
        })
      localStorage.rainAllowRecord = 'true';
      },300);
    event.preventDefault();
  }
  /*结束录音*/ 
  endTouch (event) {
    console.log(event + "************")
    // event.preventDefault();
    this.isRecord = false;
     /*小于300ms，不录音*/
    if((new Date().getTime() - this.START) < 300){
      // this.END = 0;
      this.START = 0;
      wx.stopRecord({
        success:function(res) {
          wx.stopRecord({
            success:function(res) {
              console.log(111111111111);
              alert('录音结束');
            }
          })
        }
      });  
      alert('小于300ms，不录音');
      clearTimeout(this.recordTimer);  
  }else{
    // var audioData = [];
    var _this = this;
      wx.stopRecord({
        success: function (res) {
          this.localId = res.localId;
          alert(this.localId);
          // 上传语音
          if(this.localId != '') {
              wx.uploadVoice({
                localId: this.localId, // 需要上传的音频的本地ID，由stopRecord接口获得
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success: function (res) {
                    var serverId = res.serverId
                    // var serverId = 0;
                    alert(serverId);
              //把录音在微信服务器上的id（res.serverId）发送到自己的服务器供下载。
              if(serverId !='') {  
                    $.ajax({
                      url: '/mamon/wechat/uploadLocal',
                      type: 'post',
                      data: {'serverId':serverId},
                      dataType: "json", 
                      async:false,
                      success: (data) => {
                        // let audioData = [];
                        console.log(_this.audioData);
                        console.log(data , '******');
                        _this.audioData.push(data.data);
                        
                        _this.changeDetectorRef.markForCheck();
                        _this.changeDetectorRef.detectChanges();
                          alert(_this.audioData);
                          console.log(_this.audioData,11111111111);
                          alert('文件已经保存到自己的服务器');
                          _this.localId = '';
                      },
                      error: function (xhr, errorType, error) {
                          console.log(error);
                          this.isRecord = true;
                      }
                  })  
              }
            }
          });
         }
           console.log(res);
        },
        fail: function (res) {
          alert(JSON.stringify(res));
      } 
      });
    }
  }

}
  
 