import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import globalConfig from '../../../../config.js';
import { hideAttentionMenuUrl, getAttentionUserInfo } from '../../../../providers/requestUrl'

/**
 * Generated class for the ConsultantInfoAvatarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var wx: any;
@IonicPage()
@Component({
  selector: 'page-consultant-info-avatar',
  templateUrl: 'consultant-info-avatar.html',
})
export class ConsultantInfoAvatarPage {
  public uploadUrl = globalConfig.avatarUpload
  public avatarUrl: string;
  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {

  }
  ionViewDidEnter() {
    this.isAttention();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ConsultantInfoAvatarPage');
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(image: string) {
    this.croppedImage = image;
  }
  imageLoaded() {
    // show cropper
  }
  loadImageFailed() {
    // show message
  }

  uploadFile() {
    //const file = new HttpParams().set('file',this.data.image);
    var file = this.croppedImage
    console.log('post开始请求');
    console.log(file)
    this.http.post(this.uploadUrl, file, {
      headers: {
        'Content-Type': 'image/png',
      }
    }).subscribe(res => {
      console.log('post请求结束', res);
      this.avatarUrl = res['data'].url;
      // console.log(this.avatarUrl + '1')
      let callback = this.navParams.get('callback');
      callback(this.avatarUrl);
      this.navCtrl.pop();
    });
  }

  // fileChangeListener($event, cropperComp: ImageCropperComponent) {
  //   var image: any = new Image();
  //   var file: File = $event.target.files[0];
  //   var myReader: FileReader = new FileReader();
  //   var that = this;
  //   this.cropper = cropperComp;
  //   myReader.onloadend = function (loadEvent: any) {
  //     image.src = loadEvent.target.result;
  //     that.cropper.setImage(image);
  //   };
  //   myReader.readAsDataURL(file);
  // }
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
} 
