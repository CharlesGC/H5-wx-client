import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UploadfilePage } from './uploadfile';

@NgModule({
  declarations: [
    UploadfilePage,
  ],
  imports: [
    IonicPageModule.forChild(UploadfilePage),
  ],
})
export class UploadfilePageModule {}
