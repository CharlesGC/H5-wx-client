import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectCompanyListPage } from './project-company-list';

@NgModule({
  declarations: [
    ProjectCompanyListPage,
  ],
  imports: [
    IonicPageModule.forChild(ProjectCompanyListPage),
  ],
})
export class ProjectCompanyListPageModule {}
