import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChooseIdentityPage } from './choose-identity';

@NgModule({
  declarations: [
    ChooseIdentityPage,
  ],
  imports: [
    IonicPageModule.forChild(ChooseIdentityPage),
  ],
})
export class ChooseIdentityPageModule {}
