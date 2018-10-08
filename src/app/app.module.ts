//引入 angular以及ionic的系统组件
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';

import { MultiPickerModule } from 'ion-multi-picker';

//引入模块
import { ComponentsModule } from '../components/components.module';


//引入根组件
import { MyApp } from './app.component';
//引入http模块
import { HttpModule, Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

//页面 自定义的组件
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { IndustrydetialPage } from '../pages/home/industrydetial/industrydetial';
import { TabsPage } from '../pages/tabs/tabs';
// import { HomeSwiperComponent } from '../components/home-swiper/home-swiper';   
import { PhonebindPage } from '../pages/phonebind/phonebind';
import { RegisterPage } from '../pages/register/register';
import { ChooseIdentityPage } from '../pages/choose-identity/choose-identity';
import { SetAccountPage } from '../pages/set-account/set-account';
import { ModifyPhonePage } from '../pages/modify-phone/modify-phone';
import { ModifyPhone2Page } from '../pages/modify-phone2/modify-phone2';
import { ModifyEmailPage } from '../pages/modify-email/modify-email';
import { AddEmailPage } from '../pages/add-email/add-email';
import { AddSkillPage } from '../pages/add-skill/add-skill';
import { SwiperDetailPage } from '../pages/home/swiper-detail/swiper-detail';
// import {ReleasePage} from '../pages/release/release';
import { ReleaseTwoPage } from '../pages/release-two/release-two';
import { AddIndustryPage } from '../pages/add-industry/add-industry';
import { SearchIndustryPage } from '../pages/search-industry/search-industry';
import { SpeedPage } from '../pages/speed/speed';
import { ReleaseThreePage } from '../pages/release-three/release-three';
import { AptitudePage } from '../pages/aptitude/aptitude';
import { BudgetPage } from '../pages/budget/budget';
import { DateStartPage } from '../pages/date-start/date-start';
import { AppointDatePage } from '../pages/appoint-date/appoint-date';
import { ReleaseSuccessPage } from '../pages/release-success/release-success';
import { CompanyPage } from '../pages/company/company';
import { MessageCenterPage } from '../pages/message-center/message-center'
import { DemandContentPage } from '../pages/demand-content/demand-content'

/*个人中心页面组件（客户）*/
import { ClientBasicPage } from '../pages/contact/client/client-basic/client-basic';
import { ClientInfoEditPage } from '../pages/contact/client/client-info-edit/client-info-edit';
import { ClientInfoUserPage } from '../pages/contact/client/client-info-user/client-info-user';
import { ClientPaymentInfoPage } from '../pages/contact/client/client-payment-info/client-payment-info';
import { ClientPaymentInfoEditPage } from '../pages/contact/client/client-payment-info-edit/client-payment-info-edit';
import { ClientInvoiceEditPage } from '../pages/contact/client/client-invoice-edit/client-invoice-edit';

import { UseTheHelpPage } from '../pages/contact/use-the-help/use-the-help';
import { ClientTheHelpPage } from '../pages/contact/client-the-help/client-the-help';
import { ConsultantTheHelpPage } from '../pages/contact/consultant-the-help/consultant-the-help';

/*个人中心页面组件（顾问）*/
import { ConsultantBasicPage } from '../pages/contact/consultant/consultant-basic/consultant-basic';
import { ConsultantInfoUserPage } from '../pages/contact/consultant/consultant-info-user/consultant-info-user';
import { ConsultantProfessionalCertificationPage } from '../pages/contact/consultant/consultant-professional-certification/consultant-professional-certification';
import { ConsultantProjectExpPage } from '../pages/contact/consultant/consultant-project-exp/consultant-project-exp';
import { ConsultantWorkExpPage } from '../pages/contact/consultant/consultant-work-exp/consultant-work-exp';
import { ConsultantBankAccountPage } from '../pages/contact/consultant/consultant-bank-account/consultant-bank-account';
import { ConsultantBankAccountEditPage } from '../pages/contact/consultant/consultant-bank-account-edit/consultant-bank-account-edit';
import { ConsultantLanguageExpPage } from '../pages/contact/consultant/consultant-language-exp/consultant-language-exp';
import { ConsultantEducationExpPage } from '../pages/contact/consultant/consultant-education-exp/consultant-education-exp';

/*我的项目-客户*/
import { ProjectListPage } from '../pages/my-project/client/project-list/project-list';
import { ProjectBrowserPage } from '../pages/my-project/client/project-browser/project-browser';
import { ProjectConsultantListPage } from '../pages/my-project/client/project-consultant-list/project-consultant-list';
import { ProjectConsultantBrowserPage } from '../pages/my-project/client/project-consultant-browser/project-consultant-browser';
import { ProjectProgramListPage } from '../pages/my-project/client/project-program-list/project-program-list'
import { ProjectProgramBrowserPage } from '../pages/my-project/client/project-program-browser/project-program-browser';
import { ProjectStageBrowserPage } from '../pages/my-project/client/project-stage-browser/project-stage-browser';
import { ProjectStageListPage } from '../pages/my-project/client/project-stage-list/project-stage-list';
import { ProjectPaymentRecordPage } from '../pages/my-project/client/project-payment-record/project-payment-record';
import { ProjectSubmitInvoicePage } from '../pages/my-project/client/project-submit-invoice/project-submit-invoice';
import { ProjectDecumentListPage } from '../pages/my-project/client/project-decument-list/project-decument-list';
import { ProjectDecumentBrowserPage } from '../pages/my-project/client/project-decument-browser/project-decument-browser';
import { ProjectPaymentListPage } from '../pages/my-project/client/project-payment-list/project-payment-list';
import { ProjectPaymentBrowserPage } from '../pages/my-project/client/project-payment-browser/project-payment-browser';
import { ProjectInvoiceListPage } from '../pages/my-project/client/project-invoice-list/project-invoice-list';
import { ProjectInvoiceBrowserPage } from '../pages/my-project/client/project-invoice-browser/project-invoice-browser';
import { ProjectEditStep1Page } from '../pages/my-project/client/project-edit-step1/project-edit-step1';
import { ProjectEditStep2Page } from '../pages/my-project/client/project-edit-step2/project-edit-step2';
import { ProjectEditStep3Page } from '../pages/my-project/client/project-edit-step3/project-edit-step3';
import { ProjectCompanyListPage } from '../pages/my-project/client/project-company-list/project-company-list';
import { ProjectTimeSelectPage } from '../pages/my-project/project-time-select/project-time-select';
import { ProjectCollectBankPage } from '../pages/my-project/project-collect-bank/project-collect-bank';
import { ProjectProgramObjectionPage } from '../pages/my-project/client/project-program-objection/project-program-objection';
import { ProjectSpeedReleasePage } from '../pages/my-project/client/project-speed-release/project-speed-release'

/*我的项目-顾问*/
import { ConsultantProjectListPage } from '../pages/my-project/consultant/consultant-project-list/consultant-project-list';
import { ConsultantProjectBrowserPage } from '../pages/my-project/consultant/consultant-project-browser/consultant-project-browser';
import { ConsultantStageListPage } from '../pages/my-project/consultant/consultant-stage-list/consultant-stage-list';
import { ConsultantStageBrowserPage } from '../pages/my-project/consultant/consultant-stage-browser/consultant-stage-browser';
import { ConsultantProgramListPage } from '../pages/my-project/consultant/consultant-program-list/consultant-program-list';
import { ConsultantProgramBrowserPage } from '../pages/my-project/consultant/consultant-program-browser/consultant-program-browser';
import { ConsultantDocumentListPage } from '../pages/my-project/consultant/consultant-document-list/consultant-document-list';
import { ConsultantDocumentBrowserPage } from '../pages/my-project/consultant/consultant-document-browser/consultant-document-browser';
import { ConsultantCollectionListPage } from '../pages/my-project/consultant/consultant-collection-list/consultant-collection-list';
import { ConsultantCollectionBorswerPage } from '../pages/my-project/consultant/consultant-collection-borswer/consultant-collection-borswer';
import { ApplicationProjectPage } from '../pages/my-project/application-project/application-project';
import { ConsultantStageEditPage } from '../pages/my-project/consultant/consultant-stage-edit/consultant-stage-edit';
import { ConsultantDeliveryModelPage } from '../pages/my-project/consultant/consultant-delivery-model/consultant-delivery-model';
import { ConsultantInteractionSubmitPage } from '../pages/my-project/consultant/consultant-interaction-submit/consultant-interaction-submit';
import { ConsultantProgramEditPage } from '../pages/my-project/consultant/consultant-program-edit/consultant-program-edit';
import { PorjectEvalutionPage } from '../pages/my-project/porject-evalution/porject-evalution';
import { ConsultantInfoAvatarPage } from '../pages/contact/consultant/consultant-info-avatar/consultant-info-avatar';
import { ConsultantNoprojectListPage } from '../pages/my-project/consultant/consultant-noproject-list/consultant-noproject-list';

/*推荐*/
import { RecommendConsultantListPage } from '../pages/recommend/recommend-consultant-list/recommend-consultant-list';
import { RecommendClientListPage } from '../pages/recommend/recommend-client-list/recommend-client-list';

/*表单编辑页面*/
import { FormEditPage } from '../pages/contact/form-edit/form-edit';
import { SelectTagsPage } from '../pages/contact/select-tags/select-tags';


// import { ListPage } from '../pages/list/list';

//ionic打包成app以后配置启动画面 以及导航条的服务
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MamenDataProvider } from '../providers/mamen-data/mamen-data';

/* 上传和裁剪组件 */
import { FileUploadModule } from 'ng2-file-upload';
import { UploadfilePage } from '../pages/uploadfile/uploadfile'
import { ImageCropperModule } from 'ngx-image-cropper';

/* 个人中心页的联系我们 */
import { ContactusPage } from '../pages/contact/contactus/contactus';

/**个人中心的关于我们 */
import { AboutusPage } from "../pages/contact/aboutus/aboutus";

/* 更多案例 */
import { CasemorePage } from "../pages/home/casemore/casemore";

/* 使用协议 */
import { UseAgreementPage } from "../pages/contact/aboutus/use-agreement/use-agreement"

/** 案例附件列表 */
import { ApplicationProjectListPage } from "../pages/my-project/application-project/application-project-list/application-project-list"
@NgModule({
  /*申明组件*/
  declarations: [
    MyApp,
    ContactPage,
    HomePage,
    IndustrydetialPage,
    TabsPage,
    PhonebindPage,
    RegisterPage,
    ChooseIdentityPage,
    SetAccountPage,
    ModifyPhonePage,
    ModifyPhone2Page,
    ModifyEmailPage,
    AddEmailPage,
    ClientBasicPage,
    ClientInfoEditPage,
    ClientInfoUserPage,
    ConsultantBasicPage,
    ConsultantInfoUserPage,
    ConsultantProfessionalCertificationPage,
    ConsultantProjectExpPage,
    ConsultantWorkExpPage,
    FormEditPage,
    ConsultantBankAccountPage,
    ConsultantBankAccountEditPage,
    ClientPaymentInfoPage,
    ClientPaymentInfoEditPage,
    ClientInvoiceEditPage,
    ConsultantLanguageExpPage,
    ConsultantEducationExpPage,
    SelectTagsPage,
    MessageCenterPage,
    DemandContentPage,
    SwiperDetailPage,

    AddSkillPage,
    // ReleasePage,
    ReleaseTwoPage,
    AddIndustryPage,
    SearchIndustryPage,
    SpeedPage,
    ReleaseThreePage,
    AptitudePage,
    BudgetPage,
    DateStartPage,
    AppointDatePage,
    ReleaseSuccessPage,
    CompanyPage,

    UseTheHelpPage,
    ClientTheHelpPage,
    ConsultantTheHelpPage,

    ProjectListPage,
    ProjectBrowserPage,
    ProjectConsultantListPage,
    ProjectConsultantBrowserPage,
    ProjectProgramListPage,
    ProjectProgramBrowserPage,
    ProjectStageBrowserPage,
    ProjectStageListPage,
    ProjectPaymentRecordPage,
    ProjectSubmitInvoicePage,
    ProjectDecumentListPage,
    ProjectDecumentBrowserPage,
    ProjectPaymentListPage,
    ProjectPaymentBrowserPage,
    ProjectInvoiceListPage,
    ProjectInvoiceBrowserPage,
    ProjectEditStep1Page,
    ProjectEditStep2Page,
    ProjectEditStep3Page,
    ProjectCompanyListPage,
    ProjectTimeSelectPage,
    ProjectCollectBankPage,
    ProjectProgramObjectionPage,
    ProjectSpeedReleasePage,

    ConsultantProjectListPage,
    ConsultantProjectBrowserPage,
    ConsultantStageListPage,
    ConsultantStageBrowserPage,
    ConsultantProgramListPage,
    ConsultantProgramBrowserPage,
    ConsultantDocumentListPage,
    ConsultantDocumentBrowserPage,
    ConsultantCollectionListPage,
    ConsultantCollectionBorswerPage,
    ApplicationProjectPage,
    ConsultantStageEditPage,
    ConsultantDeliveryModelPage,
    ConsultantInteractionSubmitPage,
    ConsultantProgramEditPage,
    PorjectEvalutionPage,
    ConsultantInfoAvatarPage,
    ConsultantNoprojectListPage,


    RecommendConsultantListPage,
    RecommendClientListPage,
    UploadfilePage,

    ContactusPage,
    AboutusPage,
    CasemorePage,
    UseAgreementPage,
    ApplicationProjectListPage
  ],
  /*引入的模块 依赖的模块*/
  imports: [
    BrowserModule,
    ComponentsModule,
    HttpModule,
    HttpClientModule,
    MultiPickerModule, //选择器
    // IonicModule.forRoot(MyApp)
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: 'true', //隐藏全部子页面
      backButtonText: '返回'  //配置返回按钮
    }),
    FileUploadModule,
    ImageCropperModule
  ],
  /*启动的模块*/
  bootstrap: [IonicApp],
  /*配置不会在模板中使用的组件*/
  entryComponents: [
    MyApp,
    ContactPage,
    HomePage,
    IndustrydetialPage,
    TabsPage,
    PhonebindPage,
    RegisterPage,
    ChooseIdentityPage,
    SetAccountPage,
    ModifyPhonePage,
    ModifyPhone2Page,
    ModifyEmailPage,
    AddEmailPage,
    ClientBasicPage,
    ClientInfoEditPage,
    ClientInfoUserPage,
    ConsultantBasicPage,
    ConsultantInfoUserPage,
    ConsultantProfessionalCertificationPage,
    ConsultantProjectExpPage,
    ConsultantWorkExpPage,
    FormEditPage,
    ConsultantBankAccountPage,
    ConsultantBankAccountEditPage,
    ClientPaymentInfoPage,
    ClientPaymentInfoEditPage,
    ClientInvoiceEditPage,
    ConsultantLanguageExpPage,
    ConsultantEducationExpPage,
    SelectTagsPage,
    MessageCenterPage,
    DemandContentPage,
    SwiperDetailPage,

    AddSkillPage,
    // ReleasePage,
    ReleaseTwoPage,
    AddIndustryPage,
    SearchIndustryPage,
    SpeedPage,
    ReleaseThreePage,
    AptitudePage,
    BudgetPage,
    DateStartPage,
    AppointDatePage,
    ReleaseSuccessPage,
    CompanyPage,

    UseTheHelpPage,
    ClientTheHelpPage,
    ConsultantTheHelpPage,

    ProjectListPage,
    ProjectBrowserPage,
    ProjectConsultantListPage,
    ProjectConsultantBrowserPage,
    ProjectProgramListPage,
    ProjectProgramBrowserPage,
    ProjectStageBrowserPage,
    ProjectStageListPage,
    ProjectPaymentRecordPage,
    ProjectSubmitInvoicePage,
    ProjectDecumentListPage,
    ProjectDecumentBrowserPage,
    ProjectPaymentListPage,
    ProjectPaymentBrowserPage,
    ProjectInvoiceListPage,
    ProjectInvoiceBrowserPage,
    ProjectEditStep1Page,
    ProjectEditStep2Page,
    ProjectEditStep3Page,
    ProjectCompanyListPage,
    ProjectTimeSelectPage,
    ProjectCollectBankPage,
    ProjectProgramObjectionPage,
    ProjectSpeedReleasePage,

    ConsultantProjectListPage,
    ConsultantProjectBrowserPage,
    ConsultantStageListPage,
    ConsultantStageBrowserPage,
    ConsultantProgramListPage,
    ConsultantProgramBrowserPage,
    ConsultantDocumentListPage,
    ConsultantDocumentBrowserPage,
    ConsultantCollectionListPage,
    ConsultantCollectionBorswerPage,
    ApplicationProjectPage,
    ConsultantStageEditPage,
    ConsultantDeliveryModelPage,
    ConsultantInteractionSubmitPage,
    ConsultantProgramEditPage,
    PorjectEvalutionPage,
    ConsultantInfoAvatarPage,
    ConsultantNoprojectListPage,

    RecommendConsultantListPage,
    RecommendClientListPage,
    UploadfilePage,

    ContactusPage,
    AboutusPage,
    CasemorePage,
    UseAgreementPage,
    ApplicationProjectListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    MamenDataProvider,
    Camera,
    File,
    FileTransfer
  ]
})
export class AppModule { }
