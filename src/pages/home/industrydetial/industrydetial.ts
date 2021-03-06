import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MamenDataProvider } from '../../../providers/mamen-data/mamen-data';
import { getindustryUrl, getskillUrl, getskilltwoUrl, getSearch, getfinanceAllUrl, getfinanceUrl, getoutstandingUrl } from '../../../providers/dataUrl';
import { ProjectConsultantBrowserPage } from '../../my-project/client/project-consultant-browser/project-consultant-browser';
import { hideAttentionMenuUrl, getAttentionUserInfo,sourceHistoryUrl } from '../../../providers/requestUrl'
import { HttpClient, HttpParams } from '@angular/common/http';
declare var wx: any;
@IonicPage()
@Component({
  selector: 'page-industrydetial',
  templateUrl: 'industrydetial.html',
})
export class IndustrydetialPage {
  public IndustrydetialArr = [];
  public IndustryTotal: any;
  public SkillLabelMoreArr: any;
  public SkillLabelTwoArr: any;
  public pageNum: any;//页数
  public pageSize: any;//每页个数
  public enabled: boolean;//能否上拉加载
  public isIndustryLabel = true;
  public skillLabel = true;
  public search: any;
  public skillChecked: any;
  public skillCheckedSkill: any;
  public skillBgcolor: any;
  public skilldoubleData = {};
  public inputValue = {};
  public IndustryName = {};
  public industryId: number;
  public firstSkillId: number;
  public secondSkillId: number;
  public industryNameChecked: any;
  public skiiNameChecked: any;
  public type: any;
  public value:any;
  public id: any;
  public name: any;
  public financeAllArr = [];
  public BlurInput: any;
  public attstate: boolean;
  public isSearch = false;
  public isSelect = false;
  public title:any;
  // public bottom = '11110'
  constructor(public navCtrl: NavController, public navParams: NavParams, public IndustryMoreData: MamenDataProvider,
    public SkillLabelMoreData: MamenDataProvider,
    public Skilltwolabel: MamenDataProvider, public IndustrySearch: MamenDataProvider,
    public financedata: MamenDataProvider, private http: HttpClient,public sanitizer:DomSanitizer,private Provider: MamenDataProvider,) {
  }
  /*转换html标签处理*/
  assembleHTML(strHTML:any){
    return this.sanitizer.bypassSecurityTrustHtml(strHTML);
  }
  ionViewDidLoad() {
    //this.doRefresh('');
    this.search = '';
    this.type = this.navParams.get('type');
    this.id = this.navParams.get('id');
    this.name = this.navParams.get('name');
    /*首页更多详情*/
    if (this.type == 'indeustry') {
      this.skillChecked = this.id ? this.id : 0;
      console.log(this.id, this.skillChecked, '===')
      this.IndustryName['industryName'] = this.name || '全部行业';
      this.getSearchadviser(this.skillChecked, this.firstSkillId = 0, this.secondSkillId = 0, this.search = '', this.pageNum = 0, this.pageSize = 15);
    } else if (this.type == 'skill') {
      this.title = '顾问筛选'
      this.skillCheckedSkill = this.id ? this.id : 0;
      console.log(this.skillCheckedSkill,'-------------------------')
      this.skilldoubleData['fName'] = this.name || '全部领域';
      this.getSearchadviser(this.industryId = 0, this.skillCheckedSkill, this.secondSkillId = 0, this.search = '', this.pageNum = 0, this.pageSize = 15);
    } else if (this.type == 'finance-count') {
      this.title = '全部顾问筛选'
      this.getfinanceAllInfo();
    } else if (this.type == 'financemore') {
      this.title = '采购与供应链顾问'
      this.isSearch = true;
      this.isSelect = true;
      this.getfinanceInfo();
    } else if (this.type == 'indeustryOutstand') {
      this.title = '明星顾问'
      this.isSearch = true;
      this.isSelect = true;
      this.getoutstandingInfo();
    }
  }
  ionViewDidEnter() {
    const openId = window.sessionStorage.getItem('openId');
    let getAttentionUserInfoUrl = getAttentionUserInfo + '?openId=' + openId;
    this.http.get(getAttentionUserInfoUrl).subscribe(res => {
      this.attstate = res['data'].subscribe;
    });
    this.isAttention();
  }
  // 行业翘楚
  getoutstandingInfo() {
    this.financedata.getoutstandingData(getoutstandingUrl, 1, 1, 999).subscribe(
      res => {
        this.financeAllArr = res.data
      }, error => {
        console.log(error);
      }
    )
  }
  // 财务审计
  getfinanceInfo() {
    this.financedata.getfinanceData(getfinanceUrl, 2, 1, 999).subscribe(
      res => {
        this.financeAllArr = res.data
      }, error => {
        console.log(error);
      }
    )
  }
  // 全部顾问更多
  getfinanceAllInfo() {
    this.financedata.getindustryAllData(getfinanceAllUrl, 1, 1, 999).subscribe(
      res => {
        this.financeAllArr = res.data;
      }, error => {
        console.log(error);
      }
    )
  }
  // 点击搜索按钮
  searchLabel(value, type) {
    // this.BlurInput = setTimeout(() => {
    //   this.blurInput()
    // }, 1000);
    this.type = type;
    this.search = value;
    this.isIndustryLabel = true;
    this.skillLabel = true;
    this.getSearchadviser(this.industryId = 0, this.firstSkillId = 0, this.secondSkillId = 0, this.search, '', '');
  }
  // 行业标签下拉
  downindustryShow(type) {
    this.type = type;
    this.isIndustryLabel = !this.isIndustryLabel;
    this.skillLabel = true;
    this.getinstudryListData();
  }
  // 技能下拉
  downSkill(type) {
    console.log(this.value,'this.value')
    this.type = type;
    this.skillLabel = !this.skillLabel;
    this.isIndustryLabel = true;
    this.getSkillMoreData();
    this.getSecondaryData(this.skillCheckedSkill || '');
  }
  // 获取筛选数据
  getSearchadviser(industryId, firstSkillId, secondSkillId, search, pageNum, pageSize) {
    this.IndustrySearch.getSearchAdviserList(getSearch, industryId, firstSkillId, secondSkillId, search, pageNum, pageSize).subscribe(
      res => {
        this.financeAllArr = res.data && res.data.list ? res.data.list : [];
        console.log(this.financeAllArr,'获取筛选数据获取筛选数据')
      }, error => {
        console.log(error);
      }
    )
  }
  //获取行业标签
  getinstudryListData() {
    // let getpaymentListUrl = 'http://mamon.yemindream.com/mamon/index/getIndustry';
    this.IndustryMoreData.getIndustryMoreData(getindustryUrl, 1, 1, 999).subscribe(
      res => {
        this.IndustryTotal = res.data.list;
        console.log(this.IndustryTotal,'this.IndustryTotalthis.IndustryTotal')
      }, error => {
        console.log(error);
      }
    )
  }
  // // 获取技能标签
  getSkillMoreData() {
    this.SkillLabelMoreData.getSkillLabelMoreData(getskillUrl, 2, 1, 999).subscribe(
      res => {
        this.SkillLabelMoreArr = res.data.list;
      }, error => {
        console.log(error);
      }
    )
  }
  // 二级技能
  getSecondaryData(id) {
    this.Skilltwolabel.getSkillSecondaryData(getskilltwoUrl, id, 0, 999).subscribe(
      res => {
        this.SkillLabelTwoArr = res.data.list;
      }, error => {
        console.log(error);
      }
    )
  }
  // 点击选择行业
  selsectIndustry(value, index, type) {
    this.type = type;
    if (index == -1) {
      this.IndustryName = { 'industryName': value };
      this.isIndustryLabel = true;
      this.skillChecked = 0;
      this.getSearchadviser(this.industryId = 0, this.firstSkillId =this.skilldoubleData['sfid'] || 0, this.secondSkillId = this.inputValue['ssid'] || 0, this.search = '', this.pageNum = 0, this.pageSize = 15);
    } else {
      this.skillChecked = index;
      this.IndustryName = value;
      this.isIndustryLabel = true;
      this.getSearchadviser(this.industryId = this.IndustryName['ilid'], this.firstSkillId = this.skilldoubleData['sfid'] || 0, this.secondSkillId = this.inputValue['ssid'] || 0, this.search = '', this.pageNum = '', this.pageSize = '');
    }
  }
  //点击一级获取二级技能
  infoSecondarySkill(value, index, type) {
    this.type = type;
    if (index == -1) {
      this.skillCheckedSkill = 0;
      this.skilldoubleData = { 'fName': value };
      this.getSecondaryData('');
    } else {
      this.skillCheckedSkill = index;
      this.inputValue = '';
      this.skillBgcolor = null;
      this.skilldoubleData = value;
      this.getSecondaryData(value.sfid);
      this.getSearchadviser(this.industryId = this.IndustryName['ilid'] || 0, this.firstSkillId = this.skilldoubleData['sfid'], this.secondSkillId =this.inputValue['ssid'] || 0, this.search = '', '', '');
    }
  }
  // 点击二级选择技能
  infoSelectClick(value, index, type) {
    this.type = type;
    if (index == -1) {
      this.inputValue = { 'sName': value };
      this.skillLabel = true;
      this.skillBgcolor = index;
      this.getSearchadviser(this.industryId = this.IndustryName['ilid'] || 0, this.firstSkillId =this.skilldoubleData['sfid'] || 0, this.secondSkillId = 0, '', '', '');
    } else {
      this.inputValue = value;
      this.skillBgcolor = index;
      this.skillLabel = true;
      this.getSearchadviser(this.industryId = this.IndustryName['ilid'] || 0, this.firstSkillId = this.inputValue['sfid'], this.secondSkillId = this.inputValue['ssid'], '', '', '');
    }
  }
  /*跳转到顾问详情*/
  goProjectConsultantBrowserPage(value, index) {
    const user = window.sessionStorage.getItem('user') ? JSON.parse(window.sessionStorage.getItem('user')) : {};
    this.navCtrl.push(ProjectConsultantBrowserPage, { uid: value.uid, type: 'homepage', userType: user.type });
  }
  //下拉刷新界面
  doRefresh(refresher) {
    this.pageNum = 0;
    this.enabled = true;
    this.IndustrySearch.getSearchAdviserList(getSearch, this.industryId = 0, this.firstSkillId = 0,
      this.secondSkillId = 0, this.search = '', this.pageNum = 0, this.pageSize = 15).subscribe(
        res => {
          this.financeAllArr = res.data && res.data.list ? res.data.list : [];
          /*如果已经是最后一页，则禁止上拉加载*/
          setTimeout(() => {
            this.IndustrydetialArr = res.data.list;
            refresher && refresher.cancel();
            console.log('刷新成功')
          }, 2000);
        }, error => {
          console.log(error);
          refresher && refresher.cancel();
        }
      )
  }
  // 上拉加载
  loadMore(loadEvent) {
    //   let newArr = [];
    this.pageNum++;
    this.IndustrySearch.getSearchAdviserList(getSearch, this.industryId = 0, this.firstSkillId = 0,
      this.secondSkillId = 0, this.search = '', this.pageNum = 0, this.pageSize = 15).subscribe(
        res => {
          this.financeAllArr = res.data && res.data.list ? res.data.list : [];
          setTimeout(() => {
            loadEvent.complete();
          }, 2000);
          /*如果已经是最后一页，则禁止上拉加载*/
          if (res.data.list == 0 || res.data.list < 15) {
            console.log('加载完');


            this.enabled = false;
          }
        }, error => {
          console.log(error);
          loadEvent.complete();
        }
      )
  }

  //隐藏底部分享菜单
  isAttention() {
    let url = encodeURIComponent(location.href.split('#')[0]); // 当前网页的URL，不包含#及其后面部分
    let wUrl = hideAttentionMenuUrl + '?url=' + url;
    this.Provider.getMamenSwiperData(wUrl).subscribe(res => {
      if (res['code'] == 200) {
        wx.config({
          debug: false,
          appId: res['data'].appid,
          timestamp: res['data'].timestamp,
          nonceStr: res['data'].nonceStr,
          signature: res['data'].signature,
          jsApiList: ['showOptionMenu','onMenuShareAppMessage']
        });
        wx.ready(function () {
          wx.showOptionMenu();
          wx.onMenuShareAppMessage({
            // 分享标题
            title: '麦盟自由顾问平台',
            // 分享描述 
            desc: '麦盟自由顾问平台',
            // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            link: sourceHistoryUrl + '&page=2',
            // 分享图标 
            imgUrl: '../../assets/imgs/logobig.png',
          }, function (res) {
            //alert(res)
          });
        });
      }
    }, error => {
      console.log('erros===', error);
    })
  }
}
