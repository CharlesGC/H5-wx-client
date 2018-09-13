module.exports = {
    mode: 'development',
    name: '管理测试',
    footer: '',
    api: {
        // host: 'http://mamon.yemindream.com',
        host: 'http://100.168.1.149:8181',
        // port: 8080,
        port: 8181,
        // path: '/mamon/',
        path: '/mamon/',
        timeout: 15000
    },
    //文件上传地址
    // filesUpload: 'http://matest.mf-tal.com/mafile/mamonfile/uploadFile',
    filesUpload: 'http://100.168.1.149:8181/mafile/mamonfile/uploadFile',
    // filesUpload: 'http://mamon.yemindream.com/mafile/mamonfile/uploadFile',
    // filesUpload: 'http://100.168.1.48:8100/mafile/mamonfile/uploadFile',
    //文件查看地址
    filesUrl: 'http://100.168.1.199:8080/files',

    getAPIPathFun() {
        if (this.tmpApiPath) { // 缓存
          return this.tmpApiPath;
        }
    
        const paths = [];
    
        // js的字符串处理真是麻烦
        if (this.isCrossDomain()) {
          // 去除结尾的'/'
          const tmp = this.api.host+':'+this.api.port;
          let index = tmp.length - 1;
          // 如果超出指定的 index 范围，charAt返回一个空字符串
          while (tmp.charAt(index) === '/') {
            index--;
          }
          if (index < 0)
            paths.push('');
          else
            paths.push(tmp.substring(0, index + 1));
        } else {
          paths.push('');
        }
    
        if (this.api.path) {
          const tmp = this.api.path;
          let begin = 0;
          let end = tmp.length - 1;
    
          while (tmp.charAt(begin) === '/') {
            begin++;
          }
          while (tmp.charAt(end) === '/') {
            end--;
          }
          if (begin > end)
            paths.push('');
          else
            paths.push(tmp.substring(begin, end + 1));
        } else {
          paths.push('');
        }
    
        const tmpApiPath = paths.join('/')+'/';
        this.tmpApiPath = tmpApiPath;
        return tmpApiPath;
      },
      
}