import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConsultantProjectBrowserPage } from './consultant-project-browser';

@NgModule({
  declarations: [
    ConsultantProjectBrowserPage,
  ],
  imports: [
    IonicPageModule.forChild(ConsultantProjectBrowserPage),
  ],
})
export class ConsultantProjectBrowserPageModule {}
