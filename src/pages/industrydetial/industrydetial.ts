import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MamenDataProvider} from '../../providers/mamen-data/mamen-data';
import { getindustryUrl,getskillUrl,getskilltwoUrl,getSearch,getdetialSearch} from '../../providers/dataUrl';

@IonicPage()
@Component({
  selector: 'page-industrydetial',
  templateUrl: 'industrydetial.html',
})
export class IndustrydetialPage {
  public IndustrydetialArr  =[];
  public IndustryTotal:any;
  public SkillLabelMoreArr:any;
  public SkillLabelTwoArr:any;
  public selectField:any;
  public pageNum = 0;//页数
  public pageSize = 6;//每页个数
  public enabled:boolean;//能否上拉加载
  public isIndustry = false;
  public isSkill =false;
  public isIndustryMore = true;
  public isSkillMore = true;
  public IndustrySearchData = [];
  public infoSkillMore = [];
  public SearchData = [];
  public isFiltersearch = true;
  public search:any;
  public isSearch = true;
  public skillChecked:any;
  public skillBgcolor:any;
  public skilldoubleData={};
  public inputValue = {};
  public IndustryName = {};
  public isBgcolor: any = false;
  public skillAll:any;
  public industryId:number;
  public firstSkillId:number;
  public secondSkillId:number;
  public industryNameChecked:any;
  public skiiNameChecked:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public IndustryMoreData:MamenDataProvider,
    public SkillLabelMoreData:MamenDataProvider,
    public Skilltwolabel:MamenDataProvider,public IndustrySearch:MamenDataProvider,public DetialSearch:MamenDataProvider  ) {
      let name = navParams.get('name')
      this.industryNameChecked =name;
      this.IndustryName['industryName']= name;

      let name1 = navParams.get('name1');
      this.skiiNameChecked =name1;
      this.skilldoubleData['fName'] = name1;
      console.log(this.skilldoubleData['fName'],'技能1111');
  }
  ionViewDidLoad() {
    this.getinstudryListData();
    this.getSkillMoreData();
    this.getSkillCheckd();
    // this.getSecondaryData('');
    this.getLabelMore();
    //this.doRefresh('');
    this.search = '';
  }
  // 行业更多数据
  getLabelMore() {
    this.IndustryMoreData.getIndustryMoreData(getindustryUrl,1,this.pageNum,this.pageSize).subscribe(
      res=>{
        if(this.industryNameChecked == undefined) {
          this.IndustrydetialArr = res.data.list;
          console.log(this.IndustrydetialArr,'全部');
        }else {
          for(var i =0;i < res.data.list.length;i++){
            if(res.data.list[i].industryName == this.industryNameChecked){
              this.IndustrydetialArr.push(res.data.list[i]);
            }
          }
        }
      },error=>{
        console.log(error);
      }
    )
    // this.isSkillMore = false;
  }
  // 技能更多
  getSkillCheckd() {
    this.SkillLabelMoreData.getSkillLabelMoreData(getskillUrl,1,this.pageNum,this.pageSize).subscribe(
      res=>{
        // console.log(res.data,'1111111111')
        if(this.skiiNameChecked == undefined) {
          this.infoSkillMore = res.data.list;
          console.log(this.infoSkillMore,'全部技能');
        }else {
          for(var i =0;i < res.data.list.length;i++){
            if(res.data.list[i].fName == this.skiiNameChecked){
              this.infoSkillMore.push(res.data.list[i]);
            }
          }
        }
      },error=>{
        console.log(error);
      }
    )
    // this.isIndustryMore = false;
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
  loadMore(loadEvent){
    let newArr = [];
    console.log(loadEvent+ 'rwerwerwerwrwrwrwr') 
    console.log(11111 +'=================');
    this.pageNum++;
    this.IndustryMoreData.getIndustryMoreData(getindustryUrl,1,this.pageNum,this.pageSize).subscribe(
        res=>{
          newArr = this.IndustrydetialArr.concat(res.data.list);
        this.IndustrydetialArr = newArr;
        setTimeout(() => {
          // console.log(22222);
          loadEvent.complete();
          console.log('加载更多');
        }, 2000);
        
        /*如果已经是最后一页，则禁止上拉加载*/
          if( res.data.list == 0){
            console.log('加载完');
            this.enabled=false;
          }
        },error=>{
          console.log(error);
          this.pageNum--;
          loadEvent.complete();  
          console.log('加载失败');
        }
    )
  }
  // 详情页搜索
  getSearchDetail (search) {
    this.DetialSearch.getDetialSearch(getdetialSearch,search).subscribe(
      res=>{
        this.SearchData = res.data;
        // console.log(this.SearchData,'================1111');
      },error=>{
        console.log(error);
      }
    )
  }
  // 点击搜索按钮
  searchLabel (search) {
    this.search = search;
    this.getSearchDetail(this.search);
    // console.log(search,'搜索字段');
    this.isIndustryMore = false;
    this.isSkillMore =false;
    this.isFiltersearch = false;
    this.isSearch = true;
    // if(this.SearchData.length <1) {
    //   this.isIndustryMore = true;
    // }
  }
  // 行业标签下拉
  downindustryShow() {
    this.isIndustry = !this.isIndustry;
    this.isSkill = false;
    this.isIndustryMore = false;
    this.isSkillMore =false;
    // if(this.isIndustry) {
    //   this.isIndustryMore = true;
    // }
    
  }
  // 获取行业筛选数据
  getSearchadviser(industryId,firstSkillId,secondSkillId) {
    this.IndustrySearch.getSearchAdviserList(getSearch,industryId,firstSkillId,secondSkillId).subscribe(
      res=>{
        this.IndustrySearchData = res.data;
        console.log(this.IndustrySearchData)
      },error=>{
        console.log(error);
      }
    )
  }

  // 技能下拉
  downSkill() {
    this.isSkill =  !this.isSkill;
    this.isIndustry = false;
    this.isIndustryMore = false;
    this.isSkillMore =false;
  }
  //获取行业标签
  getinstudryListData() {
    // let getpaymentListUrl = 'http://mamon.yemindream.com/mamon/index/getIndustry';
    this.IndustryMoreData.getIndustryMoreData(getindustryUrl,2,1,999).subscribe(
        res=>{
          this.IndustryTotal = res.data.list;
          // console.log(this.IndustryTotal);
        },error=>{
          console.log(error);
        }
      )
  }
  // 点击选择行业
  selsectIndustry(value,index) {
    this.skillChecked = index;
    this.IndustryName = value;
    this.isIndustry = false;
    // this.isIndustryMore = false;
    this.getSearchadviser(this.industryId=1,this.firstSkillId=0,this.secondSkillId=0);
    // console.log(this.IndustryName,'000000000000');
    this.isSearch = false;
    this.isFiltersearch = true;
    this.isIndustryMore = false;
    this.isSkillMore =false;
  }
   //获取技能标签
   getSkillMoreData () {
    this.SkillLabelMoreData.getSkillLabelMoreData(getskillUrl,1,1,999).subscribe(
      res=>{
        this.SkillLabelMoreArr = res.data.list;
        console.log(this.SkillLabelMoreArr,'行业技能');
      //   this.financeAllArrlength = this.financeAllArr.data.filter((f,i)=>i<4);
      // console.log( this.SkillLabelMoreArr);
      },error=>{
        console.log(error);
      }
    )
  } 
  // 二级技能
  getSecondaryData(id) {
    this.Skilltwolabel.getSkillSecondaryData(getskilltwoUrl,id,0,999).subscribe(
      res=>{
        // console.log(1111);
      // console.log(res);
        this.SkillLabelTwoArr = res.data.list;
        // console.log(this.SkillLabelTwoArr,'二级技能');
      },error=>{
        console.log(error);
      }
    )
  }
  // 点击全部领域
  // allSkill(value,index) {
  //   this.skillAll = value;
  //   // this.skilldoubleData['fName'] =value; 
  //   console.log(this.skillAll,'***************');
  //   this.skillChecked = index;
  //   this.getSecondaryData('');
  //   this.isFiltersearch = true;
  // }
  //点击一级获取二级技能
  infoSecondarySkill(value,index) {
    if(index == undefined){
      this.skilldoubleData = value;
      this.getSecondaryData('');
      console.log(this.skilldoubleData,'=======')
    }else if (index !== undefined){
    this.skillChecked = index;
    this.inputValue = ''; 
    this.skillBgcolor = null;
    this.skilldoubleData = value;
    this.getSecondaryData(value.sfid);
      console.log(this.skilldoubleData,'++++++++++++++++')
    this.isFiltersearch = true;
    this.isSearch = false;
    this.getSearchadviser(this.industryId=0,this.firstSkillId=1,this.secondSkillId=0);
    }
  }
  // 点击二级选择技能
  infoSelectClick (value,index) {
    this.inputValue = value;
    this.skillBgcolor = index;
    this.isSkill = false;
    this.isSearch = false;
    this.isFiltersearch = true;
    this.isIndustryMore = false;
    this.isSkillMore =false;
    this.getSearchadviser(this.industryId=0,this.firstSkillId=1,this.secondSkillId=3);
  }
 }