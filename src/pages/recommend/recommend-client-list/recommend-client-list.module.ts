import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecommendClientListPage } from './recommend-client-list';

@NgModule({
  declarations: [
    RecommendClientListPage,
  ],
  imports: [
    IonicPageModule.forChild(RecommendClientListPage),
  ],
})
export class RecommendClientListPageModule {}
