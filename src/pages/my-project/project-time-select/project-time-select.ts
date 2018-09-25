import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormEditPage } from '../../contact/form-edit/form-edit';

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
  customPopoverOptions: any = {
    header: 'Hair Color',
    subHeader: 'Select your hair color',
    message: 'Only select your dominant hair color'
  };
  public headerTitle = '信息编辑'

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
      this.budgetData.budget = (this.budgetData.workload || 0) * (this.budgetData.budgetDay || 0);
      this.budgetData.workload = null;
    } else {
      this.budgetData.budget = this.budgetData.budget;
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
  sureBudgetDays(){
    this.isBudgetDays = !this.isBudgetDays
    return
  }
  /*保存数据并返回页面*/
  onSelectSubmit() {
    let callback = this.navParams.get('callback');
    var isnum = /^[0-9]*$/;
    if (this.field == 'workload_workloadUnit') {
      if (isnum.test(this.inputName) == false) {
        this.isBudgetDays = true
        return
      }
      callback(this.field, [this.inputName, this.typeTxt]);
    } else if (this.field == 'projectTime') {
      let typeTxt = this.typeTxt == 0 ? '天' : (this.typeTxt == 1 ? '月' : '年')
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
      } else if (this.selected == 1) {
        if (!this.budgetData.budget) {
          this.isBudget = true
          return
        }
      }
      callback(this.field, [this.selected, this.budgetData.budgetDay, this.budgetData.workload, this.budgetData.budget || '']);
    } else if (this.field == 'planguage') {
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
