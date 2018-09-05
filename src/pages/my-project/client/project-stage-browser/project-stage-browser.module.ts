import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectStageBrowserPage } from './project-stage-browser';

@NgModule({
  declarations: [
    ProjectStageBrowserPage,
  ],
  imports: [
    IonicPageModule.forChild(ProjectStageBrowserPage),
  ],
})
export class ProjectStageBrowserPageModule {}
