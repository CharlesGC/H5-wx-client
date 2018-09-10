import { Component } from '@angular/core';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
// import {ReleasePage} from '../release/release';
import { ProjectEditStep1Page } from '../my-project/client/project-edit-step1/project-edit-step1'; 
import { PhonebindPage } from '../phonebind/phonebind';
import { MessageCenterPage } from '../message-center/message-center';
import { DemandContentPage } from '../demand-content/demand-content';
import { RecommendConsultantListPage } from '../recommend/recommend-consultant-list/recommend-consultant-list';
import { RecommendClientListPage } from '../recommend/recommend-client-list/recommend-client-list';
import { SpeedPage } from '../speed/speed';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = HomePage;
  tab2Root = DemandContentPage;
  // tab3Root = ReleasePage;
  tab3Root = SpeedPage;
  // tab2Root = PhonebindPage;
  public tab4Root:any;
  tab5Root = ContactPage;
  public isshow = false;
  constructor() {
    this.tab4Root = RecommendConsultantListPage
  }
  // ionViewDidLoad() {
  //   console.log('执行！~~');
  // }
  ngOnInit() {
    console.log('进行')
    const user = window.sessionStorage.getItem('user') ? JSON.parse(window.sessionStorage.getItem('user')) : {};
    // user.type == 0
    if(user.type == 1){
      this.isshow = false;
    }else if(user.type == 0){
      this.isshow = true;
    }
    // this.tab4Root = RecommendClientListPage;
    console.log(user.type,'tabs')
    if(user.type == 1){
      this.tab4Root = RecommendConsultantListPage
    }else if(user.type == 0){
      this.tab4Root = RecommendClientListPage;
    }
  }
  
  // ngOnchanges(){
  //   console.log("父组件ngonchanges");
  // }
  // ngDoCheck (){
  //   console.log("父组件ngDocheck")
  // }
  // ngAfterContentInit(){
  //   console.log("父组件ngAfterContentInit")
  // }
  // ngAfterContentChecked(){
  //   console.log("父组件ngAfterContentChecked")
  // }
  // ngAfterViewInit(){
  //   console.log("父组件ngAfterViewInit")
  // }
  // ngAfterViewChecked(){
  //   console.log("父组件ngAfterViewChecked")
  // }
  // ngAfterViewInt(){
  //   console.log('改变时执行~~');
  // }

  ionViewDidEnter(){
    console.log('进行~~~~~~~~~~~~')
    const user = window.sessionStorage.getItem('user') ? JSON.parse(window.sessionStorage.getItem('user')) : {};
    // user.type == 0
    if(user.type == 1){
      this.isshow = false;
    }else if(user.type == 0){
      this.isshow = true;
    }
    // this.tab4Root = RecommendClientListPage;
    console.log(user.type,'tabs')
    if(user.type == 1){
      this.tab4Root = RecommendConsultantListPage
    }else if(user.type == 0){
      this.tab4Root = RecommendClientListPage;
    }
  }

}
