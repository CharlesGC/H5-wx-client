import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {MamenDataProvider} from '../../providers/mamen-data/mamen-data';

import { data,ma_gw } from '../../Mock/data.js'
/**
 * Generated class for the HomeSwiperComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

@Component({
  selector: 'home-swiper',
  templateUrl: 'home-swiper.html',
  viewProviders:[MamenDataProvider]//服务声明
})
export class HomeSwiperComponent {
  private swiperArr:Array<any>;
  private swiperdata:any;

  constructor( public navCtrl: NavController,swiperdata:MamenDataProvider) {
    // console.log('Hello HomeSwiperComponent Component');
    // this.text = 'Hello World';
    this.swiperdata = swiperdata;
    
  }
  ngOnInit () {
    var dataArr = [];
    dataArr.push(data);
    console.log(dataArr)
    // this.swiperdata.getMamenSwiperData('').subscribe(
  	// 	res=>{
		// 	console.log(res);
  	// 		this.swiperArr = res.data;
		// 	  console.log(this.swiperArr);
  	// 	},error=>{
  	// 		console.log(error);
  	// 	}
  	// )
  }
}
