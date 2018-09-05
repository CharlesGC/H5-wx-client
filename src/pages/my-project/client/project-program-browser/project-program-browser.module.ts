import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectProgramBrowserPage } from './project-program-browser';

@NgModule({
  declarations: [
    ProjectProgramBrowserPage,
  ],
  imports: [
    IonicPageModule.forChild(ProjectProgramBrowserPage),
  ],
})
export class ProjectProgramBrowserPageModule {}
