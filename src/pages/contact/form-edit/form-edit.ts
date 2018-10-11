import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MultiPickerModule } from 'ion-multi-picker';
import { Http } from '@angular/http';
import { MamenDataProvider } from '../../../providers/mamen-data/mamen-data';
import { getSkillUrl, getSkillSecondaryUrl, getIndustryListUrl } from '../../../providers/requestUrl';
import { SelectTagsPage } from '../select-tags/select-tags';
import { HttpClient, HttpParams } from '@angular/common/http';
import { hideAttentionMenuUrl, getAttentionUserInfo } from '../../../providers/requestUrl'
declare var wx: any;

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
  public isSave = false;
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
        { text: '母语', value: '0' },
        { text: '精通', value: '1' },
        { text: '熟练', value: '2' },
        { text: '一般', value: '3' },
      ]
    }
  ]
  public degree = [
    {
      name: 'degree',
      parentCol: 'parent',
      options: [
        { text: '博士', value: '0' },
        { text: '硕士', value: '1' },
        { text: '本科', value: '2' },
        // { text: '本科', value: '3' },
        // { text: '研究生', value: '4' },
        // { text: '博士', value: '5' },
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
  public deliverMethod = [
    {
      name: 'deliverMethod',
      parentCol: 'parent',
      options: [
        { text: '驻场', value: '0' },
        { text: '非驻场', value: '1' },
        { text: '待商议', value: '2' },
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
          { text: '保密', value: '0' },
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
    } else if (this.selectField == 'deliverMethod') {
      this.parentColumns = this.deliverMethod
    } else if (this.fieldType == 'textarea') {
      var str = value ? value.replace(/<br>/g, "\n") : '';
      this.inputName = str;
    }
    else if (this.selectField == 'industryList') {
      // this.getpaymentListData();
      this.selectList = (value && value.length) ? value.map(f => ({ ...f, id: (f.ilid || f.alId) })) : [{ id: 0 }];
    } else if (this.fieldType == 'date') {
      this.inputName = new Date(value);
    } else if (this.fieldType == 'percentage') {
      if (value < 1) {
        this.inputName = value * 100
      } else if (value > 1) {
        this.inputName = value
      }
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
    } else if (this.selectField == 'deliverMethod') {
      this.parentColumns = this.deliverMethod
    } else if (this.fieldType == 'textarea') {
      var str = value ? value.replace(/<br>/g, "\n") : '';
      this.inputName = str;
      console.log(this.inputName, str, 'this.inputName')
    } else if (this.selectField == 'industryList') {
      //this.getpaymentListData();
      this.selectList = (value && value.length) ? value.map(f => ({ ...f, id: (f.ilid || f.alId) })) : [{ id: 0 }];
      console.log(value, this.selectList, '=========-----========');
      // this.inputName = [{ilid:2,industryName:'办公服务/办公用品'},{ilid:6,industryName:'航空/航天'}];
    } else if (this.fieldType == 'date') {
      this.inputName = new Date(value);

      // else if(this.fieldType == 'textarea') {
      //   console.log(this.inputName,'未开始时')
      //   this.inputName=this.inputName.replaceAll("<br>", "\n");
      //   console.log(this.inputName,'转换后开始时')
      // }
    } else if (this.fieldType == 'percentage') {
      if (value < 1) {
        this.inputName = value * 100
      } else if (value > 1) {
        this.inputName = value
      }
    }
    this.isAttention();
    console.log(this.fieldType, value, this.selectList, 'ionViewDidLoad FormEditPage');
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
  /*保存把数据传回上一层*/
  addEmailSubmit(inValue) {
    let value,
      citystr,
      callback = this.navParams.get('callback');
    let index = this.navParams.get('index');
    if (this.fieldType == 'percentage' || this.fieldType == 'price' || this.fieldType == 'text' || this.fieldType == 'gender' || this.fieldType == 'select' || this.fieldType == 'ranger' || this.fieldType == 'date') {
      value = inValue;
    } else if (this.fieldType == 'textarea') {
      console.log(inValue, '未开始时')
      var reg = new RegExp("\n", "g"); //new RegExp("\r\n","g")
      inValue = inValue.replace(reg, "<br>");
      // inValue=inValue.replaceAll("<br>", "\n");
      console.log(inValue, '转换后开始时')
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
      console.log(inValue, this.inputName, 'citystr');
      if (this.inputName.length > 0 && this.arrRepeat(this.inputName.map(d => d.id))) {
        console.log(111111, this.inputName);
        this.isSave = true;
      }
    }
    if (index || index == 0) {
      callback(this.selectField, value, index);
    } else {
      callback(this.selectField, value);
    }
    console.log(citystr, this.userInfo, !this.isSave, inValue, 'value');
    !this.isSave && this.navCtrl.pop();
  }

  /*判断数组是否重复*/
  arrRepeat(arr) {
    var hash = {};
    for (var i in arr) {
      if (hash[arr[i]]) {
        return true;
      }
      hash[arr[i]] = true;
    }
    return false;
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
    // let getpaymentListUrl = 'http://mamon.yemindream.com/mamon/company/getIndustryList';
    // const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId') || 'o2GZp1Gsud1OVuaw5AH_e28m3kOw'
    let getpaymentListUrl = getIndustryListUrl; //'http://mamon.yemindream.com/mamon/company/getIndustryList';
    const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
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
    let getpaymentListUrl = `${getSkillUrl}?type=1`; //'http://mamon.yemindream.com/mamon/index/getSkill?type=1';
    if (sfid) {
      getpaymentListUrl = `${getSkillSecondaryUrl}?sfid=${sfid}`; //'http://mamon.yemindream.com/mamon/index/getSkillSecondary?sfid='+sfid;
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

  /*关闭弹出框*/
  onClose() {
    this.isSave = false;
  }

}
