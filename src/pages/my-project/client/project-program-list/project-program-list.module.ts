import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectProgramListPage } from './project-program-list';

@NgModule({
  declarations: [
    ProjectProgramListPage,
  ],
  imports: [
    IonicPageModule.forChild(ProjectProgramListPage),
  ],
})
export class ProjectProgramListPageModule {}
