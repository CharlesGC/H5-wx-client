import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConsultantProgramListPage } from './consultant-program-list';

@NgModule({
  declarations: [
    ConsultantProgramListPage,
  ],
  imports: [
    IonicPageModule.forChild(ConsultantProgramListPage),
  ],
})
export class ConsultantProgramListPageModule {}
