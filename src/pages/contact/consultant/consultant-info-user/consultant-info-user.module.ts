import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConsultantInfoUserPage } from './consultant-info-user';

@NgModule({
  declarations: [
    ConsultantInfoUserPage,
  ],
  imports: [
    IonicPageModule.forChild(ConsultantInfoUserPage),
  ],
})
export class ConsultantInfoUserPageModule {}
