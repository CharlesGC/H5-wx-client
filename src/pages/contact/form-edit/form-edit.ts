import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MultiPickerModule } from 'ion-multi-picker';
import { Http } from '@angular/http';

import { MamenDataProvider } from '../../../providers/mamen-data/mamen-data';

import { SelectTagsPage } from '../select-tags/select-tags';

/**
 * Generated class for the FormEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-form-edit',
  templateUrl: 'form-edit.html',
})

export class FormEditPage {
  public inputName: any;
  public parentColumns: any;
  public genderColumns: any;
  public industryListColumns: any;
  public scale: any;
  public selectField: any;
  public fieldType: any;
  public selectList: any;
  public skillList: any;
  public skillSecondaryList: any;
  //定义省市区数据源变量
  public cityList = {
    area: []
  };
  //userInfo即为最终选中的省市区数据
  public userInfo = {
    province: "",
    city: "",
    district: ""
  };
  public scaleData = [
    {
      name: 'scale',
      parentCol: 'parent',
      options: [
        { text: '0-50人', value: '0' },
        { text: '50-100人', value: '1' },
        { text: '100-500人', value: '2' },
        { text: '500以上人', value: '3' },
      ]
    }
  ]
  public stageData = [
    {
      name: 'stage',
      parentCol: 'parent',
      options: [
        { text: '起步期', value: '0' },
        { text: '快速成长期', value: '1' },
        { text: '变革期', value: '2' },
      ]
    }
  ]
  public grade = [
    {
      name: 'grade',
      parentCol: 'parent',
      options: [
        { text: '较差', value: '0' },
        { text: '一般', value: '1' },
        { text: '熟练', value: '2' },
        { text: '精通', value: '3' },
      ]
    }
  ]
  public degree = [
    {
      name: 'degree',
      parentCol: 'parent',
      options: [
        { text: '初中及以下', value: '0' },
        { text: '高中', value: '1' },
        { text: '大专', value: '2' },
        { text: '本科', value: '3' },
        { text: '研究生', value: '4' },
        { text: '博士', value: '5' },
      ]
    }
  ]
  public paymentMethod = [
    {
      name: 'paymentMethod',
      parentCol: 'parent',
      options: [
        { text: '线上', value: '0' },
        { text: '线下', value: '1' },
      ]
    }
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private Provider: MamenDataProvider) {
    this.parentColumns = [];
    // this.industryListColumns =[];
    this.genderColumns = [
      {
        name: 'gender',
        parentCol: 'parent',
        options: [
          { text: '未知', value: '0' },
          { text: '男', value: '1' },
          { text: '女', value: '2' },
        ]
      }
    ]

    this.industryListColumns = [
      {
        name: 'industryList',
        parentCol: 'parent',
        options: []
      }
    ];

  }

  ionViewDidLoad() {
    let value = this.navParams.get('value');
    let field = this.navParams.get('field');
    let type = this.navParams.get('type');
    this.selectField = field;
    this.fieldType = type;
    this.inputName = value;
    console.log(value, '----123====-----');
    // this.inputName = 2;
    // this.value = 2;
    if (this.fieldType == 'province-city') {
      this.userInfo.province = value[0] || undefined;
      this.userInfo.city = value[1] || undefined;
      console.log(this.userInfo, 'this.userInfo');
      this.getCityData();
    } else if (this.selectField == 'scale') {
      this.parentColumns = this.scaleData;
    } else if (this.selectField == 'stage') {
      this.parentColumns = this.stageData
    } else if (this.selectField == 'grade') {
      this.parentColumns = this.grade
    } else if (this.selectField == 'degree') {
      this.parentColumns = this.degree
    } else if (this.selectField == 'paymentMethod') {
      this.parentColumns = this.paymentMethod
    }
    else if (this.selectField == 'industryList') {
      this.getpaymentListData();
      this.selectList = (value && value.length) ? value.map(f => ({ ...f, id: (f.ilid || f.alId) })) : [{ id: 0 }];
    } else if (this.fieldType == 'date') {
      this.inputName = new Date(value);

    }
  }

  /*进入页面时加载*/
  ionViewDidEnter() {
    let value = this.navParams.get('value');
    let field = this.navParams.get('field');
    let type = this.navParams.get('type');
    this.selectField = field;
    this.fieldType = type;
    this.inputName = value;
    if (this.fieldType == 'province-city') {
      this.userInfo.province = value[0] || undefined;
      this.userInfo.city = value[1] || undefined;
      console.log(this.userInfo, 'this.userInfo');
      //this.getCityData();
    } else if (this.selectField == 'scale') {
      this.parentColumns = this.scaleData;
    } else if (this.selectField == 'stage') {
      this.parentColumns = this.stageData
    } else if (this.selectField == 'grade') {
      this.parentColumns = this.grade
    } else if (this.selectField == 'degree') {
      this.parentColumns = this.degree
    } else if (this.selectField == 'paymentMethod') {
      this.parentColumns = this.paymentMethod
    } else if (this.selectField == 'industryList') {
      //this.getpaymentListData();
      this.selectList = (value && value.length) ? value.map(f => ({ ...f, id: (f.ilid || f.alId) })) : [{ id: 0 }];
      console.log(value, this.selectList, '=========-----========');
      // this.inputName = [{ilid:2,industryName:'办公服务/办公用品'},{ilid:6,industryName:'航空/航天'}];
    } else if (this.fieldType == 'date') {
      this.inputName = new Date(value);

    }
    console.log(this.fieldType, value, this.selectList, 'ionViewDidLoad FormEditPage');
  }

  /*保存把数据传回上一层*/
  addEmailSubmit(inValue) {
    let value,
      citystr,
      callback = this.navParams.get('callback');
    let index = this.navParams.get('index');
    if (this.fieldType == 'text' || this.fieldType == 'gender' || this.fieldType == 'select' || this.fieldType == 'textarea' || this.fieldType == 'ranger' || this.fieldType == 'date') {
      value = inValue;
    } else if (this.fieldType == 'province-city') {
      citystr = document.getElementById("cities").innerText;
      let cityArr = citystr ? citystr.split(' ') : [];
      this.userInfo.province = cityArr[0]
      this.userInfo.city = cityArr[1]
      value = this.userInfo;
    } else if (this.fieldType == 'selectArr') {
      citystr = document.querySelectorAll(".cities");
      for (let i = 0; i < citystr.length; i++) {
        if ('industryName' in inValue[i]) {
          inValue[i].industryName = this.strTrim(citystr[i].innerText)
          inValue[i].ilid = this.selectList[i].id
        } else {
          inValue[i].alName = this.strTrim(citystr[i].innerText)
          inValue[i].alId = this.selectList[i].id
        }


      }
      value = inValue;
      console.log(inValue, 'citystr');
    }
    if (index || index == 0) {
      callback(this.selectField, value, index);
    } else {
      callback(this.selectField, value);
    }
    console.log(citystr, this.userInfo, inValue, 'value');
    this.navCtrl.pop();
  }
  /*去空格*/
  strTrim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
  }

  /*获取省、市数据源*/
  getCityData() {
    this.http.get("../../../assets/chinese-cities.json").subscribe(res => {
      this.parentColumns = JSON.parse(res['_body']);
      this.parentColumns.pop();
    }, err => {
      console.log(err);
    })
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

  /*行业请求*/
  getpaymentListData() {
    let getpaymentListUrl = 'http://mamon.yemindream.com/mamon/company/getIndustryList';
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId') || 'o2GZp1Gsud1OVuaw5AH_e28m3kOw'
    getpaymentListUrl = getpaymentListUrl + '?openId=' + openId;
    this.Provider.getMamenSwiperData(getpaymentListUrl).subscribe(res => {
      if (res.code == 200) {
        this.industryListColumns[0].options = res.data.length > 0 ? res.data.map(f => ({ text: f.industryName, id: f.ilid })) : [];
      } else if (res.code == 207) {
        window.localStorage.removeItem('openId');
      }
    }, error => {
      console.log('erros===', error);
    })
  }

  /*技能 请求*/
  getSkillData(sfid) {
    let getpaymentListUrl = 'http://mamon.yemindream.com/mamon/index/getSkill?type=1';
    if (sfid) {
      getpaymentListUrl = 'http://mamon.yemindream.com/mamon/index/getSkillSecondary?sfid=' + sfid;
    }

    getpaymentListUrl = getpaymentListUrl;
    this.Provider.getMamenSwiperData(getpaymentListUrl).subscribe(res => {
      if (res.code == 200) {
        if (sfid) {
          this.skillList = res.data.length > 0 ? res.data.map(f => ({ text: f.industryName, value: f.ilid })) : [];
        } else {
          this.skillSecondaryList = res.data.length > 0 ? res.data.map(f => ({ text: f.industryName, value: f.ilid })) : [];
        }
      } else if (res.code == 207) {
        window.localStorage.removeItem('openId');
      }
    }, error => {
      console.log('erros===', error);
    })
  }

  /*跳转到选择标签页面*/
  goSelectTags(value, index, type) {

    if (value == 0) {
      this.navCtrl.push(SelectTagsPage, { data: {}, callback: this.setValue, type: type })
    } else {
      this.navCtrl.push(SelectTagsPage, { data: value, callback: this.setValue, index: index, type: type })
    }
  }

  setValue = (isAdd, obj, index) => {
    if (obj == 'del') {
      if (!isAdd) {
        (index || index == 0) && this.inputName.splice(index, 1);
      }
    } else {
      if (isAdd && this.inputName.length < 3) {
        this.inputName.push(obj)
      } else {
        this.inputName[index] = obj;
      }
    }

  }
}
