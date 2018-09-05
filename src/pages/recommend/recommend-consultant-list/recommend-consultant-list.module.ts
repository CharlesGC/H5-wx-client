import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecommendConsultantListPage } from './recommend-consultant-list';

@NgModule({
  declarations: [
    RecommendConsultantListPage,
  ],
  imports: [
    IonicPageModule.forChild(RecommendConsultantListPage),
  ],
})
export class RecommendConsultantListPageModule {}
