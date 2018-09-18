import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SwiperDetailPage } from './swiper-detail';

@NgModule({
  declarations: [
    SwiperDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(SwiperDetailPage),
  ],
})
export class SwiperDetailPageModule {}
