import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectTimeSelectPage } from './project-time-select';

@NgModule({
  declarations: [
    ProjectTimeSelectPage,
  ],
  imports: [
    IonicPageModule.forChild(ProjectTimeSelectPage),
  ],
})
export class ProjectTimeSelectPageModule {}
