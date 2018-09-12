import globalConfig from '../config.js';

const getAPIPath = globalConfig.api.host + globalConfig.api.path
// const url = "http://mamon.yemindream.com/mamon";
//轮播图
export const getswipreUrl = getAPIPath+"/index/getIndexBanner" ;

// export const getswipreUrl =url + "mamon/index/getIndexBanner" ;
//行业
export const getindustryUrl =getAPIPath+ "/index/getIndustry";
// export const getindustryUrl = url +"mamon/index/getIndustry";
//技能
export const getskillUrl =getAPIPath+"/index/getSkill";
// export const getskillUrl = url + "mamon/index/getSkill";
//技能二级标签
export const getskilltwoUrl =getAPIPath+"/index/getSkillSecondary?";
//案例
export const getcaseUrl =getAPIPath+"/index/getIndexBanner";
// export const getcaseUrl = url + "mamon/index/getIndexBanner" 

// 行业翘楚
export const getoutstandingUrl =getAPIPath+"/index/getAdviserList";
// export const getoutstandingUrl = url + "mamon/index/getAdviserList" 
// 财务审计
export const getfinanceUrl =getAPIPath+"/index/getAdviserList";
// export const getfinanceUrl = url + "mamon/index/getAdviserList"
// 全部顾问
export const getfinanceAllUrl =getAPIPath+"/index/getAdviserList?";
// export const getfinanceAllUrl = url + "mamon/index/getAdviserList?"
/*查询公司列表*/ 
export const getCompanyList=getAPIPath+"/company/getCompanyList";

/*存为草稿*/ 
export const getSavaraft=getAPIPath+"/customer/savaraft";

/*发布*/ 
export const getReleaseProject=getAPIPath+"/customer/releaseProject";

/*语音存放微信服务器*/
export const getWechatJsConfig = getAPIPath+"/wechat/wechatJsConfig";

/*上传语音*/
export const getUploadLocal = getAPIPath+"/wechat/uploadLocal";
/*行业技能筛选*/
export const getSearch= getAPIPath+"/index/searchAdviserList";
/*详情搜索*/
export const getdetialSearch = getAPIPath+"/index/searchAdviserListStr";
/*快速发布*/
export const getSpeedrelease = getAPIPath+"/customer/fastRelease"
export default {
    getswipreUrl,
    getindustryUrl,
    getskillUrl,
    getskilltwoUrl,
    getcaseUrl,
    getoutstandingUrl,
    getfinanceUrl,
    getfinanceAllUrl,
    getCompanyList,
    getSavaraft,
    getReleaseProject,
    getWechatJsConfig,
    getUploadLocal,
    getSearch,
    getdetialSearch,
    getSpeedrelease
}