const url = "http://100.168.1.48:8080/";
//轮播图
export const getswipreUrl = "http://mamon.yemindream.com/mamon/index/getIndexBanner" ;
// export const getswipreUrl =url + "mamon/index/getIndexBanner" ;
//行业
export const getindustryUrl = "http://mamon.yemindream.com/mamon/index/getIndustry";
// export const getindustryUrl = url +"mamon/index/getIndustry";
//技能
export const getskillUrl ="http://mamon.yemindream.com/mamon/index/getSkill";
// export const getskillUrl = url + "mamon/index/getSkill";
//技能二级标签
export const getskilltwoUrl ="http://mamon.yemindream.com/mamon/index/getSkillSecondary?";
//案例
export const getcaseUrl ="http://mamon.yemindream.com/mamon/index/getIndexBanner";
// export const getcaseUrl = url + "mamon/index/getIndexBanner" 

// 行业翘楚
export const getoutstandingUrl ="http://mamon.yemindream.com/mamon/index/getAdviserList";
// export const getoutstandingUrl = url + "mamon/index/getAdviserList" 
// 财务审计
export const getfinanceUrl ="http://mamon.yemindream.com/mamon/index/getAdviserList";
// export const getfinanceUrl = url + "mamon/index/getAdviserList"
// 全部顾问
export const getfinanceAllUrl ="http://mamon.yemindream.com/mamon/index/getAdviserList?";
// export const getfinanceAllUrl = url + "mamon/index/getAdviserList?"
/*查询公司列表*/ 
export const getCompanyList="http://mamon.yemindream.com/mamon/company/getCompanyList";

/*存为草稿*/ 
export const getSavaraft="http://mamon.yemindream.com/mamon/customer/savaraft";

/*发布*/ 
export const getReleaseProject="http://mamon.yemindream.com/mamon/customer/releaseProject";

/*语音存放微信服务器*/
export const getWechatJsConfig = "http://mamon.yemindream.com/mamon/wechat/wechatJsConfig";

/*上传语音*/
export const getUploadLocal = "http://mamon.yemindream.com/mamon/wechat/uploadLocal";
/*行业技能筛选*/
export const getSearch= "http://mamon.yemindream.com/mamon/index/searchAdviserList";
/*详情搜索*/
export const getdetialSearch = "http://mamon.yemindream.com/mamon/index/searchAdviserListStr";
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
    getdetialSearch
}