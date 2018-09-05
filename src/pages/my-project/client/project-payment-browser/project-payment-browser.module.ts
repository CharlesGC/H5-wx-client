import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectPaymentBrowserPage } from './project-payment-browser';

@NgModule({
  declarations: [
    ProjectPaymentBrowserPage,
  ],
  imports: [
    IonicPageModule.forChild(ProjectPaymentBrowserPage),
  ],
})
export class ProjectPaymentBrowserPageModule {}
