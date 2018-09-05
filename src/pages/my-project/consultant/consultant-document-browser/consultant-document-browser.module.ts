import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConsultantDocumentBrowserPage } from './consultant-document-browser';

@NgModule({
  declarations: [
    ConsultantDocumentBrowserPage,
  ],
  imports: [
    IonicPageModule.forChild(ConsultantDocumentBrowserPage),
  ],
})
export class ConsultantDocumentBrowserPageModule {}
