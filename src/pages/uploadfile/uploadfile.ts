import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FileUploader } from 'ng2-file-upload';
import globalConfig from '../../config.js';
import { HttpClient, HttpParams } from '@angular/common/http';
/**
* Generated class for the UploadfilePage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-uploadfile',
  templateUrl: 'uploadfile.html',
})
export class UploadfilePage {
  public uploadUrl = globalConfig.filesUpload;
  public Flagyingyezhizhao = true;
  private filestatus = false;
  private fileUrl = '';
  private filetitle = '';
  private filesize: any;
  private filetypeicon = '';
  private fileData: any;
  private pagetype: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
    this.filetitle = navParams.get('title');
    this.filesize = navParams.get('size');
    this.filestatus = navParams.get('status')
    this.filetypeicon = navParams.get('typeicon')

    this.pagetype = navParams.get('type')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadfilePage');
  }

  public uploader: FileUploader = new FileUploader({
    url: this.uploadUrl,
    method: "POST",
    itemAlias: "file",
    //配置选项
    // filters: [{
    //   name: "", fn: (item): any => {
    //     var numer = item.size
    //     if (numer > 10000000000000000) {
    //       //文件格式大小限制
    //       // this.http.showAlert("提示", "请上传小于1M的文件", "确定", "", "", false);
    //       console.log('请上传小于1M的文件')
    //       return false
    //     }
    //     //文件类型限制
    //     var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
    //     let temp = '|jpg|png|jpeg|bmp|gif|docx|doc|pdf'.indexOf(type) !== -1;
    //     if (!temp) {
    //       this.Flagyingyezhizhao = false
    //       //this.http.showAlert("提示", "请上传格式为jpg、png、jpeg、bmp、gif的文件", "确定", "", "", false);
    //       alert('请上传格式为jpg、png、jpeg、bmp、gif的文件')
    //     } else {
    //       this.Flagyingyezhizhao = true;
    //     }
    //     return temp;
    //   }
    // }]
  });
  selectedFileOnChanged(event: any) {
    // 打印文件选择名称
    if (!event.target.files || event.target.files.length < 1) {
      return;
    }
    this.fileData = event.target.files[0]
    this.filetitle = event.target.files && event.target.files.length > 0 && event.target.files[0].name;
    var a = event.target.files[0].size / 1048576
    var types = event.target.files[0].type;
    this.filesize = a.toPrecision(3)
    this.filestatus = true;
    if (this.filesize > 1) {
      this.filesize = this.filesize + ' MB'
    } else {
      this.filesize = this.filesize * 1024 + ' KB'
    }
    if (types.indexOf('word') == 14 || types.indexOf('wordprocessingml') == 46) {
      this.filetypeicon = 'assets/imgs/' + 'doc.png'
    } else if (types.indexOf('powerpoint') == 19 || types.indexOf('presentationml') == 46) {
      this.filetypeicon = 'assets/imgs/' + 'ppt.png'
    } else if (types.indexOf('excel') == 19 || types.indexOf('spreadsheetml') == 46) {
      this.filetypeicon = 'assets/imgs/' + 'xls.png'
    } else if (types.indexOf('image') == 0) {
      this.filetypeicon = 'assets/imgs/' + 'png.png'
    } else if (types.indexOf('pdf') == 12) {
      this.filetypeicon = 'assets/imgs/' + 'pdf.png'
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

  uploadFile() {
    // 上传
    if (this.pagetype == 'resumePage') {
      let $this = this;
      if (!this.fileData) {
        return;
      }
      let file = this.fileData;
      let formData = new FormData();
      formData.append('file', file);

      this.http.post(this.uploadUrl, formData).subscribe(res => {
        console.log('请求结束', res);
        //let tempRes = JSON.parse(res);
        const openId = window.sessionStorage.getItem('openId')|| this.getUrlParam('openId');
        this.fileData = res;
        $this.navCtrl.pop()
      });
    } else {
      let $this = this;
      if (!this.fileData) {
        return;
      }
      let file = this.fileData;
      let formData = new FormData();
      formData.append('file', file);

      this.http.post(this.uploadUrl, formData).subscribe(res => {
        console.log('请求结束', res);
        //let tempRes = JSON.parse(res);
        this.fileData = res['data'];
        console.log(this.fileData,'+++')
        let callback = this.navParams.get('callback');
        callback(this.fileData, $this.filetitle);
        $this.navCtrl.pop()
      });
    }

    // $this.uploader.queue[0].upload(); // 开始上传
    // $this.uploader.queue[0].onSuccess = function (response, status, headers) {
    //   // 上传文件成功
    //   if (status == 200) {
    //     console.log(response)
    //     let tempRes = JSON.parse(response);
    //     this.fileData = tempRes.data;
    //     callback(this.fileData, $this.filetitle);
    //     $this.navCtrl.pop()
    //   } else {
    //     alert('上传失败请重新上传')
    //   }
    // }
  }
  returnpage() {
    this.navCtrl.pop()
  }

}
