import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModifyEmailPage } from './modify-email';

@NgModule({
  declarations: [
    ModifyEmailPage,
  ],
  imports: [
    IonicPageModule.forChild(ModifyEmailPage),
  ],
})
export class ModifyEmailPageModule {}
