import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientPaymentInfoEditPage } from './client-payment-info-edit';

@NgModule({
  declarations: [
    ClientPaymentInfoEditPage,
  ],
  imports: [
    IonicPageModule.forChild(ClientPaymentInfoEditPage),
  ],
})
export class ClientPaymentInfoEditPageModule {}
