import { NgModule } from '@angular/core';
import { ActionsheetComponent } from './actionsheet/actionsheet';

//引入BrowserModule 解决nofor 等报错的问题
import { BrowserModule } from '@angular/platform-browser';
import { UserlistComponent } from './userlist/userlist';
import { HomeSwiperComponent } from './home-swiper/home-swiper';
import { IndustryComponent } from './industry/industry';
import { IndustrprfileComponent } from './industrprfile/industrprfile';
import { AttentionTipComponent } from './attention-tip/attention-tip';
import { TellphoneTipComponent } from './tellphone-tip/tellphone-tip';


@NgModule({
	declarations: [
		ActionsheetComponent,
		UserlistComponent,
		HomeSwiperComponent,
		IndustryComponent,
		IndustrprfileComponent,
		AttentionTipComponent,
		TellphoneTipComponent,
	],
	imports: [BrowserModule],
	exports: [
		ActionsheetComponent,
		UserlistComponent,
		HomeSwiperComponent,
		IndustryComponent,
		IndustrprfileComponent,
		AttentionTipComponent,
		TellphoneTipComponent,
	]
})
export class ComponentsModule {
	constructor() {

	}

	ngOnInit() {
		//判断是否受权

	}

	//判断是否受权
	isAuthorized() {
		let url = '';
		let isLogin = '';
		if (isLogin) {

		} else {

		}
	}
}
