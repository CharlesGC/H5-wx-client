import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchIndustryPage } from './search-industry';

@NgModule({
  declarations: [
    SearchIndustryPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchIndustryPage),
  ],
})
export class SearchIndustryPageModule {}
