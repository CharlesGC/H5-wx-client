import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectInvoiceListPage } from './project-invoice-list';

@NgModule({
  declarations: [
    ProjectInvoiceListPage,
  ],
  imports: [
    IonicPageModule.forChild(ProjectInvoiceListPage),
  ],
})
export class ProjectInvoiceListPageModule {}
