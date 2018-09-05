import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectTagsPage } from './select-tags';

@NgModule({
  declarations: [
    SelectTagsPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectTagsPage),
  ],
})
export class SelectTagsPageModule {}
