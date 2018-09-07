import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ImageCropperComponent, CropperSettings } from 'ngx-img-cropper';
import { HttpClient, HttpParams } from '@angular/common/http';

/**
 * Generated class for the ConsultantInfoAvatarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-consultant-info-avatar',
  templateUrl: 'consultant-info-avatar.html',
})
export class ConsultantInfoAvatarPage {
  public uploadUrl = 'http://100.168.1.48:8181/mafile/mamonfile/uploadAvatarPic';
  public Flagyingyezhizhao = true;
  public avatarUrl: string;
  data: any;
  cropper: ImageCropperComponent;
  cropperSettings: CropperSettings;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.noFileInput = true;
    this.cropperSettings.rounded = true;
    this.cropperSettings.width = 100;
    this.cropperSettings.height = 100;
    this.data = {};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConsultantInfoAvatarPage');
  }

  uploadFile() {
    const file = new HttpParams().set('file',this.data.image);
    //var file = this.data.image
    //console.log(this.data.image, 'post开始请求');
    this.http.post(this.uploadUrl, file, {
      // headers: {
      //   //'Content-Disposition': 'form-data; name="file"; filename="chrome.png"',
      //   'Content-Type': 'image/png',
      //   //'Access-Control-Allow-Origin':'*',
      //   //'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
      // }
    }).subscribe(res => {
      console.log('post请求结束', res);
      // this.avatarUrl = res['data'].url;
      // console.log(this.avatarUrl + '1')
      // let callback = this.navParams.get('callback');
      // callback(this.avatarUrl);
      // this.navCtrl.pop();
    });
  }

  fileChangeListener($event, cropperComp: ImageCropperComponent) {
    var image: any = new Image();
    var file: File = $event.target.files[0];
    var myReader: FileReader = new FileReader();
    var that = this;
    this.cropper = cropperComp;
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      that.cropper.setImage(image);
    };
    myReader.readAsDataURL(file);
  }

} 
