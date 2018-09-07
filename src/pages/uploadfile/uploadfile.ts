import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FileUploader } from 'ng2-file-upload';
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
  public uploadUrl = 'http://100.168.1.48:8181/mafile/mamonfile/uploadFile';
  public Flagyingyezhizhao = true;
  private filestatus = false;
  private fileUrl = '';
  private filetitle = '';
  private filesize: any;
  private filetypeicon = '';
  private fileData: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.filetitle = navParams.get('title');
    this.filesize = navParams.get('size');
    this.filestatus = navParams.get('status')
    this.filetypeicon = navParams.get('typeicon')
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
  uploadFile() {
    // 上传
    let $this = this;
    let callback = this.navParams.get('callback');
    if (!$this.uploader.queue[0]) {
      return;
    }
    $this.uploader.queue[0].upload(); // 开始上传
    $this.uploader.queue[0].onSuccess = function (response, status, headers) {
      // 上传文件成功
      if (status == 200) {
        let tempRes = JSON.parse(response);
        this.fileData = tempRes.data;
        callback(this.fileData, $this.filetitle);
        $this.navCtrl.pop()
      } else {
        alert('上传失败请重新上传')
      }
    }
  }

  returnpage() {
    this.navCtrl.pop()
  }

}
