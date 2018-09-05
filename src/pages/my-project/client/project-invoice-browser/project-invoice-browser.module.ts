import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectInvoiceBrowserPage } from './project-invoice-browser';

@NgModule({
  declarations: [
    ProjectInvoiceBrowserPage,
  ],
  imports: [
    IonicPageModule.forChild(ProjectInvoiceBrowserPage),
  ],
})
export class ProjectInvoiceBrowserPageModule {}
