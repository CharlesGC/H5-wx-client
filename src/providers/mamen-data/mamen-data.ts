import { Http } from '@angular/http';
import { Injectable, AnimationStyles } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
/*
  Generated class for the MamenDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MamenDataProvider {

  constructor(private http: Http) {
    console.log('Hello MamenDataProvider Provider');
  }

  public getIdentityData(dataUrl:string){
		return this.http.get(dataUrl).map(res=>res.json())
		.catch(error=>Observable.throw(error||'Server error'));//抛出异常
  }
  public getMamenSwiperData(dataUrl:string){
		return this.http.get(dataUrl).map(res=>res.json())
		.catch(error=>Observable.throw(error||'Server error'));//抛出异常
  }
  // 轮播图
  public  getBannerSwiperData(dataUrl:string,type:number){
		return this.http.get(dataUrl + "?type=" + type).map(res=>res.json())
		.catch(error=>Observable.throw(error||'Server error'));//抛出异常
  }
// 行业
  public getIndustryData(dataUrl:string,type:number){
		return this.http.get(dataUrl +'?type=' + type).map(res=>res.json())
		.catch(error=>Observable.throw(error||'Server error'));//抛出异常
  }

  // 行业更多
  public getIndustryMoreData(dataUrl:string,type:number,pageNum:number,pageSize:number ){
		return this.http.get(dataUrl +'?type='+ type +'&pageNum='+pageNum +'&pageSize='+pageSize,).map(res=>res.json())
		.catch(error=>Observable.throw(error||'Server error'));//抛出异常
  }
  // 技能
  public getSkillLabelData(dataUrl:string,type:number){
		return this.http.get(dataUrl+"?type=" + type).map(res=>res.json())
		.catch(error=>Observable.throw(error||'Server error'));//抛出异常
  }
  // 技能更多
  public getSkillLabelMoreData(dataUrl:string,type:number,pageNum:number,pageSize:number){
		return this.http.get(dataUrl+"?type="+type+"&pageNum="+pageNum+"&pageSize="+pageSize).map(res=>res.json())
		.catch(error=>Observable.throw(error||'Server error'));//抛出异常
  }
  // 技能二级标签
  public getSkillSecondaryData(dataUrl:string,sfid:number,pageNum:number,pageSize:number){
		return this.http.get(dataUrl+"&sfid="+sfid+"&pageNum="+pageNum+"&pageSize="+pageSize).map(res=>res.json())
		.catch(error=>Observable.throw(error||'Server error'));//抛出异常
  }
  // 行业技能筛选
  public getSearchAdviserList (dataUrl:string,industryId:number,firstSkillId:number,secondSkillId :number,search:any,pageNum:number,pageSize:number){
    return this.http.get(dataUrl + "?industryId="+industryId+
    "&firstSkillId="+firstSkillId+"&secondSkillId="+secondSkillId+"&search="+search+"&pageNum="+pageNum+"&pageSize="+pageSize).map(res=>res.json())
		.catch(error=>Observable.throw(error||'Server error'));//抛出异常
  }
  //详情搜索
  public getDetialSearch (dataUrl:string,search:string){
		return this.http.get(dataUrl + "?search="+search).map(res=>res.json())
		.catch(error=>Observable.throw(error||'Server error'));//抛出异常
  }
  //案例
  public getcaseData(dataUrl:string,type:number){
		return this.http.get(dataUrl + "?type=" +type).map(res=>res.json())
		.catch(error=>Observable.throw(error||'Server error'));//抛出异常
  }
  // 翘楚
  public getoutstandingData(dataUrl:string,type:number,pageNum:any,pageSize:any){
		return this.http.get(dataUrl + "?type=" +type +'&pageNum='+pageNum+'&pageSize='+pageSize).map(res=>res.json())
		.catch(error=>Observable.throw(error||'Server error'));//抛出异常
  }
  // 财务审计
  public getfinanceData(dataUrl:string,type:any,pageNum:any,pageSize:any){
		return this.http.get(dataUrl + "?type=" +type+'&pageNum='+pageNum+'&pageSize='+pageSize).map(res=>res.json())
		.catch(error=>Observable.throw(error||'Server error'));//抛出异常
  }
  /*公司选择*/ 
  public getCompanyData(dataUrl:string,openId:any){
		return this.http.get(dataUrl + "?openId=" +openId).map(res=>res.json())
		.catch(error=>Observable.throw(error||'Server error'));//抛出异常
  }
  /*存为草稿*/ 
  public getSavaraftData(dataUrl:string,cid:any,pid:any,principalName:any,
    principalPosition:any,principalPhone:any,principalEmail:any,openId:any
  ){
    console.log(dataUrl,cid,principalName,
      principalPosition,principalPhone,principalEmail,openId,'===');
    return this.http.get(dataUrl +"?cid="+cid+"&pid="+pid+"&principalName="+principalName+
    "&principalPosition="+principalPosition+"&principalPhone="+principalPhone+"&principalEmail="+principalEmail+"&openId="+openId).map(res=>res.json())
		.catch(error=>Observable.throw(error||'Server error'));//抛出异常
  }

  /*项目第二步*/
  public getSavaraftTwoData(dataUrl:string,pid:any,projectName:any,description:any,target:any,note:any,openId:any){
    return this.http.get(dataUrl +"?pid="+pid+"&projectName="+projectName+"&description="+description+"&target="+target+"&note="+note+"&openId="+openId).map(res=>res.json())
		.catch(error=>Observable.throw(error||'Server error'));//抛出异常
  }
   /*项目第三步*/
   public getSavaraftlastData(dataUrl:string,industrys:string,skills:string,
    projectLengthType:string,projectLength:any,startTimeType:string,startTime:string,deliverMethod:any,budgetType:any,
    budgetDay:any,workload:any,budget:any,language:any,grade:any,qualification:any,pid:any,openId:any){

    return this.http.get(dataUrl +"?industrys="+industrys+"&skills="+skills+"&projectLengthType="+
    projectLengthType+"&projectLength="+projectLength+"&startTimeType="+startTimeType+"&startTime="+startTime+'&deliverMethod='+deliverMethod+
    '&budgetType='+budgetType+'&budgetDay='+budgetDay+'&workload='+workload+'&budget='+budget+'&languages='+language+'&grades='+grade+
    '&qualification='+qualification+'&pid='+pid+"&openId="+openId).map(res=>res.json())
		.catch(error=>Observable.throw(error||'Server error'));//抛出异常
  }

  /*发布*/ 
  public getReleaseData(dataUrl:string,openId:any,pid:any) {
    return this.http.get(dataUrl + "?openId=" +openId+"&pid="+pid).map(res=>res.json())
		.catch(error=>Observable.throw(error||'Server error'));//抛出异常
  }
  /*快速发布*/ 
  public getSpeedReleaseData(dataUrl:string,openId:any,description:any,voice:any) {
    return this.http.get(dataUrl + "?openId=" +openId+"&description="+description+"&voice="+voice).map(res=>res.json())
		.catch(error=>Observable.throw(error||'Server error'));//抛出异常
  }
  /*语音存放微信*/ 
  public getWechatJs(dataUrl:string,url:any) {
    return this.http.get(dataUrl+"?url=" +url).map(res=>res.json())
		.catch(error=>Observable.throw(error||'Server error'));//抛出异常
  }
  /*上传语音*/
  public getUpload(dataUrl:string,serverId:any) {
    return this.http.get(dataUrl+"?serverId=" +serverId).map(res=>res.json())
		.catch(error=>Observable.throw(error||'Server error'));//抛出异常
  }

  // 全部顾问
  public getindustryAllData(dataUrl,type:any,page:any,pageSize:any){
		return this.http.get(dataUrl+"?type=" +type+'&page='+page+'&pageSize='+pageSize).map(res=>res.json())
		.catch(error=>Observable.throw(error||'Server error'));//抛出异常
  }
}
