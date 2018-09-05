import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConsultantBasicPage } from './consultant-basic';

@NgModule({
  declarations: [
    ConsultantBasicPage,
  ],
  imports: [
    IonicPageModule.forChild(ConsultantBasicPage),
  ],
})
export class ConsultantBasicPageModule {}
