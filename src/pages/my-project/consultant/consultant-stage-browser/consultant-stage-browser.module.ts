import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConsultantStageBrowserPage } from './consultant-stage-browser';

@NgModule({
  declarations: [
    ConsultantStageBrowserPage,
  ],
  imports: [
    IonicPageModule.forChild(ConsultantStageBrowserPage),
  ],
})
export class ConsultantStageBrowserPageModule {}
