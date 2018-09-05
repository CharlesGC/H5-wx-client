import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhonebindPage } from './phonebind';

@NgModule({
  declarations: [
    PhonebindPage,
  ],
  imports: [
    IonicPageModule.forChild(PhonebindPage),
  ],
})
export class PhonebindPageModule {}
