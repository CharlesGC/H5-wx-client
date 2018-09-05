import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectBrowserPage } from './project-browser';

@NgModule({
  declarations: [
    ProjectBrowserPage,
  ],
  imports: [
    IonicPageModule.forChild(ProjectBrowserPage),
  ],
})
export class ProjectBrowserPageModule {}
