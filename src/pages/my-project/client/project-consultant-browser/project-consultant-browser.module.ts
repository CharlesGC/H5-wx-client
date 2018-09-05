import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectConsultantBrowserPage } from './project-consultant-browser';

@NgModule({
  declarations: [
    ProjectConsultantBrowserPage,
  ],
  imports: [
    IonicPageModule.forChild(ProjectConsultantBrowserPage),
  ],
})
export class ProjectConsultantBrowserPageModule {}
