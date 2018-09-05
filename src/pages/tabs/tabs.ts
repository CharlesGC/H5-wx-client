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

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = HomePage;
  tab2Root = DemandContentPage;
  // tab3Root = ReleasePage;
  tab3Root = ProjectEditStep1Page;
  // tab2Root = PhonebindPage;
  public tab4Root:any;
  tab5Root = ContactPage;
  public isshow = false;
  constructor() {

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
}