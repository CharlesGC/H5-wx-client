import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientInvoiceEditPage } from './client-invoice-edit';

@NgModule({
  declarations: [
    ClientInvoiceEditPage,
  ],
  imports: [
    IonicPageModule.forChild(ClientInvoiceEditPage),
  ],
})
export class ClientInvoiceEditPageModule {}
