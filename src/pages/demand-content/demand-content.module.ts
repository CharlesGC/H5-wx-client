import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DemandContentPage } from './demand-content';

@NgModule({
  declarations: [
    DemandContentPage,
  ],
  imports: [
    IonicPageModule.forChild(DemandContentPage),
  ],
})
export class DemandContentPageModule {}
