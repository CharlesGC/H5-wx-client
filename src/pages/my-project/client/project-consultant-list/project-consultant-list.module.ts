import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectConsultantListPage } from './project-consultant-list';

@NgModule({
  declarations: [
    ProjectConsultantListPage,
  ],
  imports: [
    IonicPageModule.forChild(ProjectConsultantListPage),
  ],
})
export class ProjectConsultantListPageModule {}
