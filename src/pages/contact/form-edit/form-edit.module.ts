import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormEditPage } from './form-edit';
import { MultiPickerModule } from 'ion-multi-picker';

@NgModule({
  declarations: [
    FormEditPage,
  ],
  imports: [
    MultiPickerModule,
    IonicPageModule.forChild(FormEditPage),
  ],
})
export class FormEditPageModule {}
