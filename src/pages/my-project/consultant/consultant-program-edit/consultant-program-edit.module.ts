import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConsultantProgramEditPage } from './consultant-program-edit';

@NgModule({
  declarations: [
    ConsultantProgramEditPage,
  ],
  imports: [
    IonicPageModule.forChild(ConsultantProgramEditPage),
  ],
})
export class ConsultantProgramEditPageModule {}
