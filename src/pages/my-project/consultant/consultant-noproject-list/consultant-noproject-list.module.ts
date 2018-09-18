import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConsultantNoprojectListPage } from './consultant-noproject-list';

@NgModule({
  declarations: [
    ConsultantNoprojectListPage,
  ],
  imports: [
    IonicPageModule.forChild(ConsultantNoprojectListPage),
  ],
})
export class ConsultantNoprojectListPageModule {}
