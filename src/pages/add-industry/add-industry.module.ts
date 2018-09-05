import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddIndustryPage } from './add-industry';

@NgModule({
  declarations: [
    AddIndustryPage,
  ],
  imports: [
    IonicPageModule.forChild(AddIndustryPage),
  ],
})
export class AddIndustryPageModule {}
