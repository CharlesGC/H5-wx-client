import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientInfoUserPage } from './client-info-user';

@NgModule({
  declarations: [
    ClientInfoUserPage,
  ],
  imports: [
    IonicPageModule.forChild(ClientInfoUserPage),
  ],
})
export class ClientInfoUserPageModule {}
