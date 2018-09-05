import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConsultantStageListPage } from './consultant-stage-list';

@NgModule({
  declarations: [
    ConsultantStageListPage,
  ],
  imports: [
    IonicPageModule.forChild(ConsultantStageListPage),
  ],
})
export class ConsultantStageListPageModule {}
