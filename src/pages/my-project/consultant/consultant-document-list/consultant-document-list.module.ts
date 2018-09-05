import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConsultantDocumentListPage } from './consultant-document-list';

@NgModule({
  declarations: [
    ConsultantDocumentListPage,
  ],
  imports: [
    IonicPageModule.forChild(ConsultantDocumentListPage),
  ],
})
export class ConsultantDocumentListPageModule {}
