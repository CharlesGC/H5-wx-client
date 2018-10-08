import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApplicationProjectListPage } from './application-project-list';

@NgModule({
  declarations: [
    ApplicationProjectListPage,
  ],
  imports: [
    IonicPageModule.forChild(ApplicationProjectListPage),
  ],
})
export class ApplicationProjectListPageModule {}
