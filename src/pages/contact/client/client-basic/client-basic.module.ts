import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientBasicPage } from './client-basic';

@NgModule({
  declarations: [
    ClientBasicPage,
  ],
  imports: [
    IonicPageModule.forChild(ClientBasicPage),
  ],
})
export class ClientBasicPageModule {}
