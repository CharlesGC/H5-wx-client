import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConsultantCollectionListPage } from './consultant-collection-list';

@NgModule({
  declarations: [
    ConsultantCollectionListPage,
  ],
  imports: [
    IonicPageModule.forChild(ConsultantCollectionListPage),
  ],
})
export class ConsultantCollectionListPageModule {}
