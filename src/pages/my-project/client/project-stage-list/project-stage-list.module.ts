import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectStageListPage } from './project-stage-list';

@NgModule({
  declarations: [
    ProjectStageListPage,
  ],
  imports: [
    IonicPageModule.forChild(ProjectStageListPage),
  ],
})
export class ProjectStageListPageModule {}
