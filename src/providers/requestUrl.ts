import globalConfig from '../config.js';

const getAPIPath = globalConfig.api.host + globalConfig.api.path
const getAPIPath1 = globalConfig.api.host+':'+globalConfig.api.port + globalConfig.api.path

/*获取用户登录信息*/
export const getUserByopenIdUrl = getAPIPath + 'wechat/getUserByopenId';

/*新增邮箱请求*/
export const getAddEmailUrl = getAPIPath + 'user/sendMail';

/*客户公司列表请求*/
export const getCompanyListUrl = getAPIPath + 'company/getCompanyList';

/*删除公司提请求*/
export const delCompanyUrl = getAPIPath + 'company/delCompany';

/*获取客户公司详情请求*/
export const getCompanyDetailUrl = getAPIPath + 'company/getCompanyDetail';

/*新增、编辑公司请求*/
export const addOrUpdateCompanyUrl = getAPIPath + 'company/addOrUpdateCompany';

/*客户用户基本信息编辑请求*/
export const editUserUrl = getAPIPath + 'user/editUser';

/*客户发票信息新增、编辑*/
export const editCompanyPayTaxesUrl = getAPIPath + 'company/editCompanyPayTaxes';

/*客户发票信息删除*/
export const delPayTaxesUrl = getAPIPath + 'company/delPayTaxes';

/*客户公司付款列表请求*/
export const getPayerListUrl = getAPIPath + 'company/getPayerList';

/*客户公司付款信息编辑请求*/
export const editCompanyPayerUrl = getAPIPath + 'company/editCompanyPayer';

/*客户公司付款信息新增请求*/
export const addCompanyPayerUrl = getAPIPath + 'company/addCompanyPayer';

/*客户公司付款信息删除请求*/
export const delPayerUrl = getAPIPath + 'company/delPayer';

/*顾问收款列表请求*/
export const getBankListUrl = getAPIPath + 'adviser/getBankList'

/*顾问收款信息新增、编辑请求*/
export const addOrEditBankUrl= getAPIPath + 'adviser/addOrEditBank';

/*顾问收款信息删除请求*/
export const delBankUrl= getAPIPath + 'adviser/delBank';

/*顾问个人信息详情请求*/
export const getAdviserDetailUrl= getAPIPath + 'adviser/getAdviserDetail';

/*顾问教育经历信息新增、编辑请求*/
export const addOrEditEducationalExpUrl= getAPIPath + 'adviser/addOrEditEducationalExp';

/*顾问教育经历信息删除请求*/
export const delEducationalExpUrl = getAPIPath + 'adviser/delEducationalExp';

/*顾问基本信息新增、编辑请求*/
export const editAdviserUrl = getAPIPath + 'adviser/editAdviser';

/*顾问基本信息详情请求*/
export const getAdviserInfoUrl = getAPIPath + 'adviser/getAdviserInfo';

/*顾问教育经历新增、编辑请求*/
export const addOrEditLanguageUrl = getAPIPath + 'adviser/addOrEditLanguage';

/*顾问教育经历删除请求*/
export const delLanguageUrl = getAPIPath + 'adviser/delLanguage';

/*顾问专业认证新增、编辑请求*/
export const addOrEditCertificationUrl = getAPIPath + 'adviser/addOrEditCertification';

/*顾问专业认证删除请求*/
export const delCertificationUrl = getAPIPath + 'adviser/delCertification';

/*顾问项目经历新增、编辑请求*/
export const addOrEditProjectExpUrl = getAPIPath + 'adviser/addOrEditProjectExp';

/*顾问项目经历删除请求*/
export const delProjectExpUrl = getAPIPath + 'adviser/delProjectExp';

/*顾问工作经历新增、编辑请求*/
export const addOrEditWorkExpUrl = getAPIPath + 'adviser/addOrEditWorkExp';

/*顾问工作经历删除请求*/
export const delWorkExpUrl = getAPIPath + 'adviser/delWorkExp';

/*顾问行业列表请求*/
export const getIndustryListUrl = getAPIPath + 'company/getIndustryList';

/*顾问一级技能列表请求*/
export const getSkillUrl = getAPIPath + 'index/getSkill';

/*顾问二级技能列表请求*/
export const getSkillSecondaryUrl = getAPIPath + 'index/getSkillSecondary';

/*顾问需求列表请求*/
export const demandListUrl = getAPIPath + 'adviser/demandList';

/*修改手机号请求(modify-phone1)*/
export const checkCodeUrl = getAPIPath + 'user/checkCode';

/*获取验证码请求*/
export const sendSmsCodeUrl = getAPIPath + 'user/sendSmsCode';

/*修改手机号请求(modify-phone2)*/
export const changePhoneUrl = getAPIPath + 'user/changePhone';

/*绑定手机号请求*/
export const bindPhoneUrl = getAPIPath + 'user/bindPhone';

/*推荐列表数据*/
export const getRecommendListUrl = getAPIPath + 'recommend/getRecommendList';

/*顾问申请项目提交*/
export const submitApplicationUrl = getAPIPath + 'adviser/submitApplication';

/*我的项目-客户-项目详情数据请求*/
export const getProjectDetailUrl = getAPIPath + 'customer/getProjectDetail';

/*我的项目-客户-项目申请发布请求*/
export const releaseProjectUrl = getAPIPath + 'customer/releaseProject';

/*我的项目-客户-项目顾问类型数量请求*/
export const getProjectSignUpAdviserCountUrl = getAPIPath + 'customer/getProjectSignUpAdviserCount';

/*我的项目-客户-项目方案类型数量请求*/
export const getProjectProgramCountUrl = getAPIPath + 'customer/getProjectProgramCount';

/*我的项目-客户-项目阶段类型数量请求*/
export const getProjectStageCountUrl = getAPIPath + 'customer/projectStageCount';

/*我的项目-客户-项目文档类型数量请求*/
export const getProjectDocumentCountUrl = getAPIPath + 'customer/projectDocumentCount';

/*我的项目-客户-项目顾问详情数据请求*/
// export const getAdviserDetailUrl = getAPIPath + 'adviser/getAdviserDetail';

/*我的项目-客户-项目顾问申请信息数据请求*/
export const getApplicationDeatilUrl = getAPIPath + 'recommend/getApplicationDeatil';

/*我的项目-客户-项目顾问面试、确认、拒绝、忽略请求*/
export const changeApplicationStatusUrl = getAPIPath + 'customer/changeApplicationStatus';

/*我的项目-客户-项目顾问列表数据请求*/
export const getProjectSignUpAdviserListUrl = getAPIPath + 'customer/getProjectSignUpAdviserList';

/*我的项目-客户-项目文档详情数据请求*/
export const getDocumentDetailUrl = getAPIPath + 'customer/getDocumentDetail';

/*我的项目-客户-项目文档列表数据请求*/
export const getDocumentListUrl = getAPIPath + 'customer/getDocumentList';

/*我的项目-客户-保存为草稿箱*/
export const savaraftUrl = getAPIPath + 'customer/savaraft';

/*我的项目-客户-发票记录详情数据请求*/
export const getInvoiceDetailUrl = getAPIPath + 'customer/getInvoiceDetail';

/*我的项目-客户-发票记录列表数据请求*/
export const getInvoiceListUrl = getAPIPath + 'customer/getInvoiceList';

/*我的项目-客户-项目列表数据请求*/
export const getProjectByStatusUrl = getAPIPath + 'customer/getProjectByStatus';

/*我的项目-客户-项目类型数量请求*/
export const myProjectCountUrl = getAPIPath + 'customer/myProjectCount';

/*我的项目-客户-项目支付记录详情数据*/
export const getPaymentDetailUrl = getAPIPath + 'customer/getPaymentDetail';

/*我的项目-客户-项目支付记录列表数据*/
export const getPaymentListUrl = getAPIPath + 'customer/getPaymentList';

/*我的项目-客户-项目申请发票附加信息数据请求*/
export const getPayMentByPsidUrl = getAPIPath + 'customer/getPayMentByPsid';

/*我的项目-客户-项目申请发票提交请求*/
export const addPayMentUrl = getAPIPath + 'customer/addPayMent';

/*我的项目-客户-项目方案详情请求*/
export const getProjectProgramDeatilUrl = getAPIPath + 'customer/getProjectProgramDeatil';

/*我的项目-客户-项目确认方案请求*/
export const confirmProgramUrl = getAPIPath + 'customer/confirmProgram';

/*我的项目-客户-项目方案列表数据请求*/
export const getProjectProgramListUrl = getAPIPath + 'customer/getProjectProgramList';

/*我的项目-客户-项目方案提出异议请求*/
// export const programObjectionUrl = getAPIPath + 'customer/getProjectProgramList';

/*我的项目-客户-项目方案提出异议请求*/
export const programObjectionUrl = getAPIPath + 'customer/customerNayProgramPlan';

/*我的项目-客户-项目阶段详情数据请求*/
export const getProjectStageDetailUrl = getAPIPath + 'customer/getProjectStageDetail';

/*我的项目-客户-项目阶段确认、提出异议*/
export const confirmStageUrl = getAPIPath + 'customer/confirmStage';

/*我的项目-客户-项目阶段列表数据请求*/
export const getProjectStageListUrl = getAPIPath + 'customer/getProjectStageList';

/*我的项目-客户-项目整个阶段确认请求*/
export const customerConfirmStagePlanUrl = getAPIPath + 'customer/customerConfirmStagePlan';

/*我的项目-客户-项目提交发票带出附加信息请求*/
export const getInvoiceByPsidUrl = getAPIPath + 'customer/getInvoiceByPsid';

/*我的项目-客户-项目发票提交请求*/
export const addInvoiceUrl = getAPIPath + 'customer/addInvoice';

/*我的项目-客户-对整个阶段提出异议*/
export const customerNayStagePlanUrl = getAPIPath + 'customer/customerNayStagePlan';

/*我的项目-客户-对单个阶段提出异议（交付物）*/
export const customerNayDocumentUrl = getAPIPath + 'customer/customerNayDocument';


/*我的项目-顾问-收款记录详情数据请求*/
export const applyMoneyDetailUrl = getAPIPath + 'adviser/applyMoneyDetail';

/*我的项目-顾问-收款记录列表数据请求*/
export const applyMoneyListUrl = getAPIPath + 'adviser/applyMoneyList';

/*我的项目-顾问-获取付款申请信息请求*/
export const applyMoneyInfoUrl = getAPIPath + 'adviser/applyMoneyInfo';

/*我的项目-顾问-付款申请提交请求*/
export const applyMoneyUrl = getAPIPath + 'adviser/applyMoney';

/*我的项目-顾问-文档详情请求*/
export const getAdviserDocumentDetailUrl = getAPIPath + 'adviser/getDocumentDetail';

/*我的项目-顾问-文档列表请求*/
export const getAdviserDocumentListUrl = getAPIPath + 'adviser/getDocumentList';

/*我的项目-顾问-文档、交互物提交*/
export const submitDocumentUrl = getAPIPath + 'adviser/submitDocument';

/*我的项目-顾问-方案提交请求*/
export const addOrEditProgramUrl = getAPIPath + 'adviser/addOrEditProgram';

/*我的项目-顾问-方案详情数据请求*/
export const getProjectProgramDetailUrl = getAPIPath + 'adviser/getProjectProgramDetail';

/*我的项目-顾问-项目详情请求*/
export const demandDeatilUrl = getAPIPath + 'adviser/demandDeatil';

/*我的项目-顾问-项目列表数据请求*/
export const getAdviserProjectByStatusUrl = getAPIPath + 'adviser/getProjectByStatus';

/*我的项目-顾问-项目类型数量请求*/
export const myAdviserProjectCountUrl = getAPIPath + 'adviser/myProjectCount';

/*我的项目-顾问-阶段详情数据请求*/
export const getAdviserProjectStageDetailUrl = getAPIPath + 'adviser/getProjectStageDetail';

/*我的项目-顾问-阶段提交请求*/
export const changeStageStatusUrl = getAPIPath + 'adviser/changeStageStatus';

/*我的项目-顾问-阶段新增、编辑请求*/
export const addOrEditStageUrl = getAPIPath + 'adviser/addOrEditStage';

/*我的项目-顾问-阶段删除请求*/
export const delStageUrl = getAPIPath + 'adviser/delStage';

/*我的项目-顾问-阶段列表数据请求*/
export const getAdviserProjectStageListUrl = getAPIPath + 'adviser/getProjectStageList';

/*我的项目-顾问-确认整个阶段*/
// export const changeStageStatusUrl = getAPIPath + 'adviser/changeStageStatus';

/*我的项目-顾问-项目文档删除请求*/
export const delDocumentUrl = getAPIPath + 'adviser/delDocument';

/*我的项目-评价请求*/
export const evalutionSubmitUrl = getAPIPath + 'customer/getProjectProgramDeatil';

/*我的项目-顾问-整个阶段异议列表*/
export const projectStageProposalListUrl = getAPIPath + 'adviser/projectStageProposalList';

/*我的项目-顾问-项目评价*/
export const projectEvaluateUrl = getAPIPath + '/adviser/projectEvaluate';

/*我的项目-客户-项目评价*/
export const clientprojectEvaluateUrl = getAPIPath + '/customer/projectEvaluate';

/*我的项目-消息中心*/
export const getMessageListUrl = getAPIPath + '/message/getMessageList';

/* 简历上传 */
export const resumeUpLoadUrl = getAPIPath + '/adviser/addOrEditResume';

/* 简历删除 */
export const resumeDeleteUrl = getAPIPath + 'adviser/delResume';

/*消息中心状态更改*/
export const readMessageUrl = getAPIPath + 'message/readMessage';

/*项目忽略请求*/
export const  ignoreProjectUrl = getAPIPath + '/adviser/ignoreProject';




