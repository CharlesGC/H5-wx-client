import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormEditPage } from '../../contact/form-edit/form-edit';
import { HttpClient, HttpParams } from '@angular/common/http';
import { hideAttentionMenuUrl, getAttentionUserInfo } from '../../../providers/requestUrl'
declare var wx: any;
/**
 * Generated class for the ProjectTimeSelectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-project-time-select',
  templateUrl: 'project-time-select.html',
})
export class ProjectTimeSelectPage {
  public selected: any;
  public typeTxt: any;
  public field = '';
  public inputName = '';
  public budgetSelected = 0;
  public languageList = [];
  public budgetData = {
    budgetType: 0,
    budgetDay: 0,
    workload: 0,
    budget: 0,
  }
  public isBudgetDay = false
  public isBudget = false
  public isBudgetDays = false
  public isBudgetPrice = false
  public isNoLanguage = false
  public isMaxBudget = false
  public isMaxBudgetData = false
  customPopoverOptions: any = {
    header: 'Hair Color',
    subHeader: 'Select your hair color',
    message: 'Only select your dominant hair color'
  };
  public headerTitle = '信息编辑'
  public isProjectTime = false

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
  }

  ionViewDidLoad() {
    this.field = this.navParams.get('field');
    let value = this.navParams.get('value');
    console.log(this.field, 'ionViewDidLoad ProjectTimeSelectPage');
    if (this.field == 'workload_workloadUnit') {
      this.inputName = value[0];
      this.typeTxt = value[1];
      this.headerTitle = '项目周期信息'
    } else if (this.field == 'projectTime') {
      this.selected = value['projectLengthType'];
      this.inputName = value['projectLength'];
    } else if (this.field == 'startTime') {
      this.selected = value['startTimeType'];
      this.inputName = value['startTime'];
    } else if (this.field == 'deliverMethod') {
      this.typeTxt = value;
    } else if (this.field == 'qualification') {
      this.selected = value;
    } else if (this.field == 'project_budget') {
      this.selected = value['budgetType'];
      this.budgetData.budgetDay = value['budgetDay'];
      this.budgetData.workload = value['workload'];
      this.budgetData.budget = value['budget'];
    } else if (this.field == 'planguage') {
      this.languageList = value || [];
    }
  }

  ionViewDidEnter() {
    this.field = this.navParams.get('field');
    let value = this.navParams.get('value');
    console.log(this.field, 'ionViewDidEnter ProjectTimeSelectPage');
    if (this.field == 'workload_workloadUnit') {
      this.inputName = value[0];
      this.typeTxt = value[1];
      this.headerTitle = '项目周期信息'
    } else if (this.field == 'projectTime') {
      this.selected = value['projectLengthType'];
      this.inputName = value['projectLength'];
    } else if (this.field == 'startTime') {
      this.selected = value['startTimeType'];
      this.inputName = value['startTime'];
    } else if (this.field == 'deliverMethod') {
      this.typeTxt = value;
    } else if (this.field == 'qualification') {
      this.selected = value;
    } else if (this.field == 'project_budget') {
      this.selected = value['budgetType'];
      this.budgetData.budgetDay = value['budgetDay'];
      this.budgetData.workload = value['workload'];
      this.budgetData.budget = value['budget'];
    } else if (this.field == 'planguage') {
      // this.languageList = value || [];
    }
    console.log(this.field, 'this.field');
    this.isAttention();
  }
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
  /*额度、天数改变时*/
  onInputChange(type) {
    if (type == 0) {
      this.budgetData.budget = (this.budgetData.workload || 0) * (this.budgetData.budgetDay || 0);
    } else {
      this.budgetData.budget = this.budgetData.budget;
    }
  }

  /*选择发生变化时执行*/
  onSelectedClick(type) {
    this.selected = type;
    //预算方式改变时重置默认值
    if (type == 0) {
      this.budgetData.budgetDay = null;
      this.budgetData.budget = (this.budgetData.workload || 0) * (this.budgetData.budgetDay || 0);
      this.budgetData.workload = null;
    } else {
      // this.budgetData.budget = this.budgetData.budget;
      this.budgetData.budget = null;
    }
  }

  /*选择select的value*/
  switchType() {
    console.log(this.typeTxt);
  }
  sureBudgetDay() {
    this.isBudgetDay = !this.isBudgetDay
    return
  }
  sureBudget() {
    this.isBudget = !this.isBudget
    return
  }
  sureBudgetDays() {
    this.isBudgetDays = !this.isBudgetDays
    return
  }
  sureHaveLanguage() {
    this.isNoLanguage = !this.isNoLanguage
    return
  }
  sureProjectTime() {
    this.isProjectTime = !this.isProjectTime
    return
  }
  sureMaxBudget() {
    this.isMaxBudget = !this.isMaxBudget
    return
  }
  sureMaxBudgetData() {
    this.isMaxBudgetData = !this.isMaxBudgetData
    return
  }
  /*保存数据并返回页面*/
  onSelectSubmit() {
    let callback = this.navParams.get('callback');
    var isnum = /^[0-9]*$/;
    var tennum = /^\d{1,2}$/;
    var fivenum = /^\d{1,5}$/;
    var ninenum = /^\d{1,9}$/;
    if (this.field == 'workload_workloadUnit') {
      if (isnum.test(this.inputName) == false) {
        this.isBudgetDays = true
        return
      }
      callback(this.field, [this.inputName, this.typeTxt]);
    } else if (this.field == 'projectTime') {
      let typeTxt = this.typeTxt == 0 ? '天' : (this.typeTxt == 1 ? '月' : '年')
      if (this.inputName) {
        console.log(this.inputName)
        if (tennum.test(this.inputName) == false) {
          this.isProjectTime = true
          return
        }
      }
      callback(this.field, [this.selected, (this.inputName ? this.inputName : 0)]);
    } else if (this.field == 'startTime') {
      callback(this.field, [this.selected, this.inputName]);
    } else if (this.field == 'deliverMethod') {
      callback(this.field, this.typeTxt);
    } else if (this.field == 'qualification') {
      callback(this.field, this.selected);
    } else if (this.field == 'project_budget') {
      if (this.selected == 0) {
        if (!this.budgetData.budgetDay || !this.budgetData.workload) {
          this.isBudgetDay = true
          return
        }
        console.log(this.budgetData.budgetDay.toString())
        if (fivenum.test((this.budgetData.budgetDay).toString()) == false) {
          this.isMaxBudget = true
          return
        }
      } else if (this.selected == 1) {
        if (!this.budgetData.budget) {
          this.isBudget = true
          return
        }
        if (ninenum.test((this.budgetData.budget).toString()) == false) {
          this.isMaxBudgetData = true
          return
        }
      }
      callback(this.field, [this.selected, this.budgetData.budgetDay, this.budgetData.workload, this.budgetData.budget || '']);
    } else if (this.field == 'planguage') {
      for (var i = 0; i < this.languageList.length; i++) {
        if (!this.languageList[i].language) {
          this.isNoLanguage = true
          return
        }
      }
      callback(this.field, this.languageList);
    }
    this.navCtrl.pop();
  }


  /*列表编辑*/
  goFormEditPage(field, value, type, index) {
    this.navCtrl.push(FormEditPage, { callback: this.setValue, value: value, field: field, type: type, index: index });
  }

  /*设置值（回调函数）*/
  setValue = (field, value, index) => {
    this.languageList[index][field] = value;
    // if(field == 'percentage'){
    //   this.stageData['price'] = (value || 0) * this.programPrice;
    // }
    // this.languageList[field] = value;
  }

  /*亲增一项目*/
  onAddLanguageClick() {
    this.languageList.push({ language: '', grade: 0 });
  }

  /*删除上一项*/
  onDelLanguageClick() {
    this.languageList && this.languageList.length > 0 && this.languageList.pop();
  }

}
