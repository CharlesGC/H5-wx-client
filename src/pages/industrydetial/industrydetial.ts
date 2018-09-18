import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MamenDataProvider } from '../../providers/mamen-data/mamen-data';
import { getindustryUrl, getskillUrl, getskilltwoUrl, getSearch, getdetialSearch, getfinanceAllUrl, getfinanceUrl, getoutstandingUrl } from '../../providers/dataUrl';
import { ProjectConsultantBrowserPage } from '../my-project/client/project-consultant-browser/project-consultant-browser';

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
  public skillAll: any;
  public industryId: number;
  public firstSkillId: number;
  public secondSkillId: number;
  public industryNameChecked: any;
  public skiiNameChecked: any;
  // public dataType: any;
  public type: any;
  public id: any;
  public name: any;
  public financeAllArr = [];
  // public financesArr = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public IndustryMoreData: MamenDataProvider,
    public SkillLabelMoreData: MamenDataProvider,
    public Skilltwolabel: MamenDataProvider, public IndustrySearch: MamenDataProvider,
    public DetialSearch: MamenDataProvider, public financedata: MamenDataProvider) {
  }
  ionViewDidLoad() {
    // this.getinstudryListData();
    // this.getSkillMoreData();

    // this.getSecondaryData('');
    //this.doRefresh('');
    this.search = '';
    this.type = this.navParams.get('type');
    this.id = this.navParams.get('id');
    this.name = this.navParams.get('name');
    /*行业更多*/
    if (this.type == 'indeustry') {
      this.skillChecked = this.id ? this.id : 0;
      console.log(this.id, this.skillChecked, '===')
      this.IndustryName['industryName'] = this.name || '全部行业';
      this.getSearchadviser(this.skillChecked, this.firstSkillId = 0, this.secondSkillId = 0, this.search = '', this.pageNum = 0, this.pageSize = 15);
    }
    /*技能更多*/
    if (this.type == 'skill') {
      this.skillCheckedSkill = this.id ? this.id : 0;
      this.skilldoubleData['fName'] = this.name || '全部领域';
      this.getSearchadviser(this.industryId = 0, this.skillCheckedSkill, this.secondSkillId = 0, this.search = '', this.pageNum = 0, this.pageSize = 15);
    }
    if (this.type == 'finance-count') {
      this.getfinanceAllInfo();
    }
    if (this.type == 'financemore') {
      this.getfinanceInfo();
    }
    if (this.type == 'indeustryOutstand') {
      this.getoutstandingInfo();
    }
  }
  // 行业更多数据
  getLabelMore(industryType, pageNum, pageSize) {
    this.IndustryMoreData.getIndustryMoreData(getindustryUrl, industryType, pageNum, pageSize).subscribe(
      res => {
        if (this.industryNameChecked == undefined) {
          this.IndustrydetialArr = res.data.list;
          // console.log(this.IndustrydetialArr, '行业更多数据');
        } else {
          for (var i = 0; i < res.data.list.length; i++) {
            if (res.data.list[i].industryName == this.industryNameChecked) {
              this.IndustrydetialArr.push(res.data.list[i]);
            }
          }
        }
      }, error => {
        console.log(error);
      }
    )
  }
  // 技能更多
  getSkillCheckd(Skilltype, pageNum, pageSize) {
    this.SkillLabelMoreData.getSkillLabelMoreData(getskillUrl, Skilltype, pageNum, pageSize).subscribe(
      res => {
        if (this.skiiNameChecked == undefined) {
          this.IndustrydetialArr = res.data.list;
          // console.log(this.IndustrydetialArr, '技能更多')
        } else {
          for (var i = 0; i < res.data.list.length; i++) {
            if (res.data.list[i].fName == this.skiiNameChecked) {
              this.IndustrydetialArr.push(res.data.list[i]);
            }
          }
        }
      }, error => {
        console.log(error);
      }
    )
  }
  // 行业翘楚
  getoutstandingInfo() {
    this.financedata.getoutstandingData(getoutstandingUrl, 1, 1, 999).subscribe(
      res => {
        // console.log(res);
        this.financeAllArr = res.data
        // console.log(this.financeAllArr, "行业翘楚");
      }, error => {
        console.log(error);
      }
    )
  }
  // 财务审计
  getfinanceInfo() {
    this.financedata.getfinanceData(getfinanceUrl, 1, 1, 999).subscribe(
      res => {
        // console.log(res);
        this.financeAllArr = res.data
        // console.log(this.financeAllArr, '财务审计');
      }, error => {
        console.log(error);
      }
    )
  }
  // 全部顾问更多
  getfinanceAllInfo() {
    this.financedata.getindustryAllData(getfinanceAllUrl, 1, 1, 999).subscribe(
      res => {
        this.financeAllArr = res.data
        // console.log(this.financeAllArr, '全部顾问');
      }, error => {
        console.log(error);
      }
    )
  }
  // 点击搜索按钮
  searchLabel(search, type) {
    this.type = type;
    // console.log(this.type, 'searchTypesearchTypesearchTypesearchType')
    this.search = search;
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
    this.type = type;
    this.skillLabel = !this.skillLabel;
    this.isIndustryLabel = true;
    this.getSkillMoreData();
  }
  // 获取筛选数据
  getSearchadviser(industryId, firstSkillId, secondSkillId, search, pageNum, pageSize) {
    this.IndustrySearch.getSearchAdviserList(getSearch, industryId, firstSkillId, secondSkillId, search, pageNum, pageSize).subscribe(
      res => {
        this.financeAllArr = res.data && res.data.list ? res.data.list : [];
        // console.log(res.data,res,this.financeAllArr,"123123213123")
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
      this.getSearchadviser(this.industryId = 0, this.firstSkillId = 0, this.secondSkillId = 0, this.search = '', this.pageNum = 0, this.pageSize = 15);
    } else {
      this.skillChecked = index;
      this.IndustryName = value;
      this.isIndustryLabel = true;
      this.getSearchadviser(this.industryId = this.IndustryName['ilid'], this.firstSkillId = 0, this.secondSkillId = 0, this.search = '', this.pageNum = '', this.pageSize = '');
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
      this.getSearchadviser(this.industryId = this.skilldoubleData['sfid'], this.firstSkillId = 1, this.secondSkillId = 0, '', '', '');
    }
  }
  // 点击二级选择技能
  infoSelectClick(value, index, type) {
    this.type = type;
    if (index == -1) {
      this.inputValue = { 'sName': value };
      this.skillLabel = true;
      this.skillBgcolor = index;
      this.getSearchadviser(this.industryId = 0, this.firstSkillId = 1, this.secondSkillId = 0, '', '', '');
    } else {
      this.inputValue = value;
      this.skillBgcolor = index;
      this.skillLabel = true;
      this.getSearchadviser(this.industryId = this.inputValue['ssid'], this.firstSkillId = 1, this.secondSkillId = 3, '', '', '');
    }

  }
  /*跳转到顾问详情*/
  goProjectConsultantBrowserPage(value, index) {
    const user = window.sessionStorage.getItem('user') ? JSON.parse(window.sessionStorage.getItem('user')) : {};
    this.navCtrl.push(ProjectConsultantBrowserPage, { uid: value.uid, type: 'homepage', userType: user.type });
  }
  //下拉刷型界面
  doRefresh(refresher) {
    setTimeout(() => {
      console.log('加载完成后，关闭刷新');
      refresher.complete();
      //toast提示
      //alert("加载成功");
    }, 2000);
  }

  //下滑动加载数据
  doInfinite(infiniteScroll) {
    setTimeout(() => {
      alert('加载完成后，关闭刷新');
      infiniteScroll.complete();
    }, 2000);
  }
}
