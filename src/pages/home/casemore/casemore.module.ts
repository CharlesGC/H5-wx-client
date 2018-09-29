import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CasemorePage } from './casemore';

@NgModule({
  declarations: [
    CasemorePage,
  ],
  imports: [
    IonicPageModule.forChild(CasemorePage),
  ],
})
export class CasemorePageModule {}
