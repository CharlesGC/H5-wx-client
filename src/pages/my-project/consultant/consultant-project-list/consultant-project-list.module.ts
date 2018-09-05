import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConsultantProjectListPage } from './consultant-project-list';

@NgModule({
  declarations: [
    ConsultantProjectListPage,
  ],
  imports: [
    IonicPageModule.forChild(ConsultantProjectListPage),
  ],
})
export class ConsultantProjectListPageModule {}
