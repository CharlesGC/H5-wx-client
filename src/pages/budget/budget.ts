import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ReleaseThreePage} from '../release-three/release-three';
/**
 * Generated class for the BudgetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-budget',
  templateUrl: 'budget.html',
})
export class BudgetPage {
  /*日期和固定切换状态*/ 
  public isShow = false;
  public ishidden = true;
  /*点击样式状态*/ 
  public isColor: string;
  public isBorder: string;
  public isDisabled: any = false;
  public isBgcolor: any = false;
   // checked状态
  public isCounsel = false;
  public isMoney = false;
  public isBudegt = true;
  public isMoneydate = true;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BudgetPage');
  }
  show() {
    this.isShow = !this.isShow;
    this.ishidden = true;
    this.isDisabled = !this.isDisabled;
    this.isBgcolor = false;
  }
  togger() {
    this.ishidden = !this.ishidden;
    this.isShow = false;
    this.isBgcolor = !this.isBgcolor;
    this.isDisabled = false;
  }
  counsel() {
    this.isBudegt = !this.isBudegt;
    this.isCounsel = true;
    this.isMoney = false;
    this.isMoneydate = true;
    console.log(this.isCounsel + '22222');
  }
  money() {
    this.isMoneydate = !this.isMoneydate;
    this.isMoney = true;
    this.isCounsel = false;
    this.isBudegt = true;
    
    
    console.log(this.isMoney + "=======");
  }
  /*保存到项目列表*/ 
  gotoreleasePage () {
    this.navCtrl.push(ReleaseThreePage);
  }
}
