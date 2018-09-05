import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectPaymentListPage } from './project-payment-list';

@NgModule({
  declarations: [
    ProjectPaymentListPage,
  ],
  imports: [
    IonicPageModule.forChild(ProjectPaymentListPage),
  ],
})
export class ProjectPaymentListPageModule {}
