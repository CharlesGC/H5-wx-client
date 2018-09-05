import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AptitudePage } from './aptitude';

@NgModule({
  declarations: [
    AptitudePage,
  ],
  imports: [
    IonicPageModule.forChild(AptitudePage),
  ],
})
export class AptitudePageModule {}
