import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientPaymentInfoPage } from './client-payment-info';

@NgModule({
  declarations: [
    ClientPaymentInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(ClientPaymentInfoPage),
  ],
})
export class ClientPaymentInfoPageModule {}
