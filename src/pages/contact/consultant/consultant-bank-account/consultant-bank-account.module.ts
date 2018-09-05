import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConsultantBankAccountPage } from './consultant-bank-account';

@NgModule({
  declarations: [
    ConsultantBankAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(ConsultantBankAccountPage),
  ],
})
export class ConsultantBankAccountPageModule {}
