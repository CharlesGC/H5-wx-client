import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AddIndustryPage} from '../add-industry/add-industry';
import { MamenDataProvider } from '../../providers/mamen-data/mamen-data';
import {getindustryUrl} from '../../providers/dataUrl';

/**
 * Generated class for the SearchIndustryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-industry',
  templateUrl: 'search-industry.html',
})
export class SearchIndustryPage {
  public industryArr:any;

  public field:any;
  public fieldType:any;
  public fieldValue:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public industryData:MamenDataProvider) {
  }

  ionViewDidLoad() {
    this.getSavaraftData();
  }
// 获取行业标签数据
  getSavaraftData() {
    this.industryData.getIndustryMoreData(getindustryUrl,1,1,10).subscribe(
      res=>{
        console.log(1111);
        console.log(res);
        this.industryArr = res.data.list;
        console.log(this.industryArr);
      },error=>{
        console.log(error);
      }
    )
  }
  // 保存
  // industrySubmit(data){
  //   console.log(data);
  //   let callback = this.navParams.get('callback');
  //   callback(this.field,this.fieldValue,data);
  //   this.navCtrl.pop();
  // }

  gotoaddIndustry () {
    this.navCtrl.push(AddIndustryPage);
  }
  getName(item) {
    console.log(item);
  }
}
