import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SwiperDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-swiper-detail',
  templateUrl: 'swiper-detail.html',
})
export class SwiperDetailPage {
  public index:any;
  public title:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SwiperDetailPage');
    this.index = this.navParams.get('index');
    
    console.log(this.index,"this.index this.index this.index this.index " );
    if(this.index == 0) {
      this.title = "麦盟-自由顾问精英聚集地";
    } else if (this.index == 1) {
      this.title = "一边是忙碌的工作，一边是更有趣的生活";
    } else if (this.index == 2) {
      this.title = "“麦盟趣镜”工作，更自由!";
    } else if (this.index == 3) {
      this.title = "“麦盟趣镜”自由，更挑战!";
    } else if (this.index == 4) {
      this.title = "顾问之路高大上？其实很简单";
    }else {
      this.title == "麦盟平台";
    }
  }
  // ionViewDidEnter() {
  //   let elements = document.querySelectorAll(".tabbar");
  //   if (elements != null) {
  //     Object.keys(elements).map((key) => {
  //       elements[key].style.display = 'flex';
  //       elements[key].style.zIndex = 999;
  //     });
  //   }
  // }

}
