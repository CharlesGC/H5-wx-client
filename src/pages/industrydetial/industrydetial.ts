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
  public dataType: any;
  public type: any;
  public financeAllArr = [];
  public financesArr = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public IndustryMoreData: MamenDataProvider,
    public SkillLabelMoreData: MamenDataProvider,
    public Skilltwolabel: MamenDataProvider, public IndustrySearch: MamenDataProvider,
    public DetialSearch: MamenDataProvider, public financedata: MamenDataProvider) {
    let name = navParams.get('name')
    this.industryNameChecked = name;
    this.IndustryName['industryName'] = name;

    let name1 = navParams.get('name1');
    this.skiiNameChecked = name1;
    this.skilldoubleData['fName'] = name1;
    console.log(this.skilldoubleData['fName'], '技能1111');

    // this.type = this.navParams.get('type');
    // console.log(this.type,'this.type111');
    // this.type=''
  }
  ionViewDidLoad() {
    // this.getinstudryListData();
    // this.getSkillMoreData();

    // this.getSecondaryData('');
    //this.doRefresh('');
    this.search = '';
    this.type = this.navParams.get('type');
    console.log(this.type, 'typetypetypetypetype')
    if (this.type == 'indeustry') {
      this.getLabelMore(this.dataType = 1, this.pageNum = 0, this.pageSize = 6);
    } else {
      this.getSkillCheckd(this.dataType = 1, this.pageNum = 0, this.pageSize = 6);
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
          console.log(this.IndustrydetialArr, '行业更多数据');
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
          console.log(this.IndustrydetialArr, '技能更多')
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
        console.log(res);
        this.financeAllArr = res.data
        console.log(this.financeAllArr, "行业翘楚");
      }, error => {
        console.log(error);
      }
    )
  }
  // 财务审计
  getfinanceInfo() {
    this.financedata.getfinanceData(getfinanceUrl, 1, 1, 999).subscribe(
      res => {
        console.log(res);
        this.financeAllArr = res.data
        console.log(this.financeAllArr, '财务审计');
      }, error => {
        console.log(error);
      }
    )
  }
  // 全部顾问更多
  getfinanceAllInfo() {
    this.financedata.getindustryAllData(getfinanceAllUrl, 1, 1, 999).subscribe(
      res => {
        console.log(1111)
        console.log(res);
        this.financeAllArr = res.data
        console.log(this.financeAllArr, '全部顾问');
      }, error => {
        console.log(error);
      }
    )
  }
  // 下拉刷新
  // doRefresh(refresher) {
  //   //初始化或下拉刷新时设置默认值
  //   // console.log(refresher+1111111);
  //   this.pageNum = 0;
  //   this.enabled=true;
  //   this.IndustryMoreData.getIndustryMoreData(getindustryUrl,1,this.pageNum,this.pageSize).subscribe(
  //       res=>{
  //         // this.IndustrydetialArr = res.data.list;
  //       //触发下拉刷新完成事件
  //       setTimeout(() => {
  //         this.IndustrydetialArr = res.data.list;
  //         refresher && refresher.cancel();
  //         console.log('刷新成功')
  //       }, 2000);
  //       // console.log( this.IndustrydetialArr);
  //       },error=>{
  //         console.log(error);
  //         refresher && refresher.cancel();
  //       }
  //   )

  // }
  // 上拉加载
  loadMore(loadEvent) {
    let newArr = [];
    this.pageNum++;
    this.IndustryMoreData.getIndustryMoreData(getindustryUrl, 1, this.pageNum, this.pageSize).subscribe(
      res => {
        newArr = this.IndustrydetialArr.concat(res.data.list);
        this.IndustrydetialArr = newArr;
        setTimeout(() => {
          loadEvent.complete();
        }, 2000);
        /*如果已经是最后一页，则禁止上拉加载*/
        if (res.data.list == 0) {
          console.log('加载完');
          this.enabled = false;
        }
      }, error => {
        console.log(error);
        this.pageNum--;
        loadEvent.complete();
        console.log('加载失败');
      }
    )
  }
  // 详情页搜索
  getSearchDetail(search) {
    this.DetialSearch.getDetialSearch(getdetialSearch, search).subscribe(
      res => {
        // this.IndustrySearchData = res.data;
        this.financeAllArr = res.data;
      }, error => {
        console.log(error);
      }
    )
  }
  // 点击搜索按钮
  searchLabel(search, type) {
    this.type = type;
    console.log(this.type, 'searchTypesearchTypesearchTypesearchType')
    this.search = search;
    this.getSearchDetail(this.search);
  }
  // 行业标签下拉
  downindustryShow(type) {
    this.type = type;
    this.isIndustryLabel = !this.isIndustryLabel;
    this.skillLabel = true;
    // this.getLabelMore(this.dataType =2,this.pageNum = 1,this.pageSize = 999);
    this.getinstudryListData();

  }
  // 技能下拉
  downSkill(type) {
    this.type = type;
    this.skillLabel = !this.skillLabel;
    this.isIndustryLabel = true;
    // this.getSkillCheckd(this.dataType=2,this.pageNum=1,this.pageSize=999);
    this.getSkillMoreData();
  }
  // 获取筛选数据
  getSearchadviser(industryId, firstSkillId, secondSkillId) {
    this.IndustrySearch.getSearchAdviserList(getSearch, industryId, firstSkillId, secondSkillId).subscribe(
      res => {
        this.financeAllArr = res.data;
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
    if(index == undefined) {
      this.IndustryName = value;
      this.getSearchadviser(this.industryId = 1, this.firstSkillId = 0, this.secondSkillId = 0);
    }else {
      this.skillChecked = index;
      this.IndustryName = value;
      this.isIndustryLabel = true;
      this.getSearchadviser(this.industryId = 1, this.firstSkillId = 0, this.secondSkillId = 0);
    }
  }
  // 点击全部领域
  // allSkill(value,index) {
  //   this.skillAll = value;
  //   if(value == this.skillAll)
  //   this.skilldoubleData['fName'] =value; 
  //   console.log(this.skillAll,'***************');
  //   this.skillChecked = index;
  //   this.getSecondaryData('');
  // }
  //点击一级获取二级技能
  infoSecondarySkill(value, index, type) {
    this.type = type;
    if (value == '全部领域') {
      // this.skilldoubleData = value;
      this.skilldoubleData['fName'] =value; 
      this.getSecondaryData('');
    } else {
      this.skillChecked = index;
      this.inputValue = '';
      this.skillBgcolor = null;
      this.skilldoubleData = value;
      this.getSecondaryData(value.sfid);
      this.getSearchadviser(this.industryId = 0, this.firstSkillId = 1, this.secondSkillId = 0);
    }
  }
  // 点击二级选择技能
  infoSelectClick(value, index, type) {
    this.type = type;
    this.inputValue = value;
    this.skillBgcolor = index;
    this.skillLabel = true;
    this.getSearchadviser(this.industryId = 0, this.firstSkillId = 1, this.secondSkillId = 3);
  }
  /*跳转到顾问详情*/
  goProjectConsultantBrowserPage(value, index) {
    const user = window.sessionStorage.getItem('user') ? JSON.parse(window.sessionStorage.getItem('user')) : {};
    if (user.type == 1) {
      this.navCtrl.push(ProjectConsultantBrowserPage, { uid: value.uid })
    } else if (user.type == 0) {
      this.navCtrl.push(ProjectConsultantBrowserPage, { uid: value.uid, type: 'homepage' })
    } else {
      this.navCtrl.push(ProjectConsultantBrowserPage, { uid: value.uid })
    }
  }
}
