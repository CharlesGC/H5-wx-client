import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UploadfilePage } from '../../../uploadfile/uploadfile'

/**
 * Generated class for the ApplicationProjectListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-application-project-list',
  templateUrl: 'application-project-list.html',
})
export class ApplicationProjectListPage {
  public list = []

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ApplicationProjectListPeage');
  }
  gouploadfile(value) {
    this.navCtrl.push(UploadfilePage,{type:value,callback:this.setProjectList})
  }
  setProjectList = (value) =>{
    this.list.push(value)
    console.log(this.list)
  }
  saveProjectFile(){
    let callback = this.navParams.get('callback');
    callback(this.list)
    this.navCtrl.pop()
  }
  /* 根据url来判断文件类型 */
  formatTypes(value) {
    if(!value) return '';
    if (value.search(/doc/) !== -1 || value.search(/docx/) !== -1) {
      return 'doc';
    } else if (value.search(/ppt/) !== -1 || value.search(/pptx/) !== -1) {
      return 'ppt'
    } else if (value.search(/xls/) !== -1 || value.search(/xlsx/) !== -1) {
      return 'xls'
    } else if (value.search(/jpg/) !== -1 || value.search(/png/) !== -1 || value.search(/jpeg/) !== -1) {
      return 'jpg'
    } else if (value.search(/pdf/) !== -1) {
      return 'pdf'
    }
  }
}
