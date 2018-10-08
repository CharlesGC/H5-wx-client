import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import globalConfig from '../../config.js';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MamenDataProvider } from '../../providers/mamen-data/mamen-data';
import { resumeUpLoadUrl, getApplicationProjectList } from '../../providers/requestUrl';
/**
* Generated class for the UploadfilePage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
	selector: 'page-uploadfile',
	templateUrl: 'uploadfile.html',
})
export class UploadfilePage {
	public uploadUrl = globalConfig.filesUpload;
	private filestatus = false;
	private fileUrl = '';
	private filetitle = '';
	private filesize: any;
	private filetypeicon = '';
	private fileData: any;
	private pagetype: any;
	public fid: any;
	public isSubmit = false;
	public isDelete = false;
	public isComplete = false;
	public loading: any;
	constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient, private Provider: MamenDataProvider, public loadingCtrl: LoadingController) {
		this.filetitle = navParams.get('title')
		this.filesize = navParams.get('size')
		this.filestatus = navParams.get('status')
		this.filetypeicon = navParams.get('typeicon')
		this.pagetype = navParams.get('type')
		//console.log(this.pagetype)
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad UploadfilePage');
	}

	presentLoadingDefault() {
		this.loading = this.loadingCtrl.create({
			content: '上传中.....'
		});

		this.loading.present();

	}

	sureBack() {
		if (this.pagetype == 'resumePage') {
			const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
			let resumeUpLoadFileUrl = resumeUpLoadUrl + '?openId=' + openId + '&fid=' + (this.fid || '')
			this.Provider.getMamenSwiperData(resumeUpLoadFileUrl).subscribe(res => {
				if (res.code == 200) {
					//alert((aweid ? '修改' : '新增') + '成功');
					//console.log(res, 'cccccc')
				} else if (res.code == 207) {
					window.localStorage.removeItem('openId');
				}
			}, error => {
				console.log('erros===', error);
			})
			this.navCtrl.pop();
			this.isSubmit = !this.isSubmit;
		} else if (this.pagetype == 'projectfilelist') {
			this.isSubmit = !this.isSubmit;
			this.navCtrl.pop();
			//console.log(callback)
		} else {
			this.navCtrl.pop();
			this.isSubmit = !this.isSubmit;
			this.filestatus = true;
		}
	}
	selectedFileOnChanged(event: any) {
		// 打印文件选择名称
		if (!event.target.files || event.target.files.length < 1) {
			return;
		}
		this.fileData = event.target.files[0]
		this.filetitle = event.target.files && event.target.files.length > 0 && event.target.files[0].name;
		var a = event.target.files[0].size / 1048576
		var types = event.target.files[0].type;
		this.filesize = a.toPrecision(3)
		this.filestatus = true;
		if (this.filesize > 1) {
			this.filesize = this.filesize + ' MB'
		} else {
			this.filesize = this.filesize * 1024 + ' KB'
		}
		if (types.indexOf('word') == 14 || types.indexOf('wordprocessingml') == 46) {
			this.filetypeicon = 'assets/imgs/' + 'doc.png'
		} else if (types.indexOf('powerpoint') == 19 || types.indexOf('presentationml') == 46) {
			this.filetypeicon = 'assets/imgs/' + 'ppt.png'
		} else if (types.indexOf('excel') == 19 || types.indexOf('spreadsheetml') == 46) {
			this.filetypeicon = 'assets/imgs/' + 'xls.png'
		} else if (types.indexOf('image') == 0) {
			this.filetypeicon = 'assets/imgs/' + 'png.png'
		} else if (types.indexOf('pdf') == 12) {
			this.filetypeicon = 'assets/imgs/' + 'pdf.png'
		}
	}

	getUrlParam(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象  
		var r = window.location.search.substr(1).match(reg);  //匹配目标参数  
		if (r != null) {
			return encodeURI(r[2]);  //返回参数值 
		} else {
			return null;
		}
	}

	uploadFile() {
		// 上传
		if (this.pagetype == 'resumePage') {
			let $this = this;
			if (!this.fileData) {
				return;
			}
			let file = this.fileData;
			let formData = new FormData();
			formData.append('file', file);
			this.presentLoadingDefault()
			this.http.post(this.uploadUrl, formData).subscribe(res => {
				console.log('请求结束', res);
				this.fid = res['data'].fid;
				this.loading.dismiss();
				setTimeout(() => {
					this.isSubmit = true;
				}, 1000)
			});
		} else if (this.pagetype == 'projectfilelist') {
			let $this = this;
			if (!this.fileData) {
				return;
			}
			let file = this.fileData;
			let formData = new FormData();
			formData.append('file', file);
			//console.log(this.fileData,'文件信息');
			this.presentLoadingDefault()
			this.http.post(this.uploadUrl, formData).subscribe(res => {
				this.fid = res['data'].fid;
				const openId = window.sessionStorage.getItem('openId') || this.getUrlParam('openId');
				let getApplicationProjectListUrl = getApplicationProjectList + '?openId=' + openId + '&fid=' + (this.fid || '')
				this.Provider.getMamenSwiperData(getApplicationProjectListUrl).subscribe(res => {
					let callback = this.navParams.get('callback');
					this.fileData.id = res.data
					callback(this.fileData)
					//console.log(res,'999999')
					this.loading.dismiss();
					setTimeout(() => {
						this.isSubmit = true;
					}, 1000)
				})
				//let callback = this.navParams.get('callback');
				//callback(this.fileData, $this.filetitle);
			});
		} else {
			let $this = this;
			if (!this.fileData) {
				return;
			}
			let file = this.fileData;
			let formData = new FormData();
			formData.append('file', file);
			this.presentLoadingDefault()
			this.http.post(this.uploadUrl, formData).subscribe(res => {
				//console.log('请求结束', res);
				//let tempRes = JSON.parse(res);
				this.fileData = res['data'];
				//console.log(this.fileData, '+++')
				let callback = this.navParams.get('callback');
				callback(this.fileData, $this.filetitle);
				this.loading.dismiss();
				setTimeout(() => {
					this.isSubmit = true;
				}, 1000)
				//alert('其他')
				//$this.navCtrl.pop()
			});
		}

		// $this.uploader.queue[0].upload(); // 开始上传
		// $this.uploader.queue[0].onSuccess = function (response, status, headers) {
		//   // 上传文件成功
		//   if (status == 200) {
		//     console.log(response)
		//     let tempRes = JSON.parse(response);
		//     this.fileData = tempRes.data;
		//     callback(this.fileData, $this.filetitle);
		//     $this.navCtrl.pop()
		//   } else {
		//     alert('上传失败请重新上传')
		//   }
		// }
	}
	returnpage() {
		this.navCtrl.pop()
	}
}
