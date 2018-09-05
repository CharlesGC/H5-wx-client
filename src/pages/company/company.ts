import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MamenDataProvider} from '../../providers/mamen-data/mamen-data';
import {getCompanyList,getSavaraft} from '../../providers/dataUrl';
// import {ReleasePage} from '../release/release';

/**
 * Generated class for the CompanyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company',
  templateUrl: 'company.html',
})
export class CompanyPage {
  public companyArr:any;//获取数据数组
  public companyId:any;//公司id
  public savaraftArr:any; // 获取存为草稿数据
  public field:any;
  public fieldType:any;
  public fieldValue:any;
 

  constructor(public navCtrl: NavController, public navParams: NavParams,public CompanylistData:MamenDataProvider,
    public SavaraftData:MamenDataProvider) {
  
  }

  ionViewDidLoad(navParams: NavParams) {
    //{callback:this.setValue,field:field,value:value,type:type}
    this.getcompanyData();
    // this.getSavaraftData();
    this.field = this.navParams.get('field');
    this.fieldType = this.navParams.get('type');
    this.fieldValue = this.navParams.get('value');
    console.log(this.field,this.fieldType,this.fieldValue)
   
  }

  onValueSubmit(){
    let callback = this.navParams.get('callback');
    callback(this.field,this.fieldValue);
    this.navCtrl.pop();
  }
  //调接口 获取数据
  getcompanyData() {
    this.CompanylistData.getCompanyData(getCompanyList,'o2GZp1Gsud1OVuaw5AH_e28m3kOw').subscribe(
      res=>{
        console.log(1111)
      console.log(res);
        this.companyArr = res.data;
        console.log(this.companyArr);
      },error=>{
        console.log(error);
      }
    )
  }
  /*调存为测试草稿接口*/ 
  // getSavaraftData() {
  //   this.SavaraftData.getSavaraftTestData(getSavaraft,0,'fdf','fdf','123','123','o2GZp1Gsud1OVuaw5AH_e28m3kOw',
  // 'projectname','description','biaodi','beizhu','length6','start1','zhuchang','budgetType','budgetDay','budgeta','language','grade','qualification').subscribe(
  //     res=>{
  //     console.log(1111 +'======================');
  //     console.log(res);
  //       this.savaraftArr = res.data;
  //       console.log(this.savaraftArr);
  //     },error=>{
  //       console.log(error);
  //     }
  //   )
  // }
  /*跳转到公司选择和电话输入等页面*/
  goProject(data) {
    let callback = this.navParams.get('callback');
    callback(this.field,data);
    console.log(data.name);
    this.navCtrl.pop();
  }
 }
