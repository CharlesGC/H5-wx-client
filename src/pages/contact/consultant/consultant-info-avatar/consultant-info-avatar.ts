import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  public uploadUrl = 'http://matest.mf-tal.com/mafile/mamonfile/uploadAvatarPic';
  public Flagyingyezhizhao = true;
  public avatarUrl: string;
  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {

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
        //'Content-Disposition': 'form-data; name="file"; filename="chrome.png"',
        'Content-Type': 'image/png',
        //'Access-Control-Allow-Origin':'*',
        //'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
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

} 
