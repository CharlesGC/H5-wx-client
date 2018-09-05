import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConsultantProgramBrowserPage } from './consultant-program-browser';

@NgModule({
  declarations: [
    ConsultantProgramBrowserPage,
  ],
  imports: [
    IonicPageModule.forChild(ConsultantProgramBrowserPage),
  ],
})
export class ConsultantProgramBrowserPageModule {}
