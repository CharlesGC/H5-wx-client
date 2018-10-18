import { Component, Input } from '@angular/core';

/**
 * Generated class for the AttentionTipComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'attention-tip',
  templateUrl: 'attention-tip.html'
})

export class AttentionTipComponent {
  @Input() bottom: any;
  @Input() page: any;
  @Input() uid: any;
  @Input() pid: any;
  @Input() selectType: any;
  public isShowdata = false;
  public timeOutEvent :any
  text: string;
  constructor() {
  }

  isShow() {
    this.isShowdata = !this.isShowdata;
  }

  startTouch(event) {
    //这里设置定时器，定义长按500毫秒触发长按事件，时间可以自己改，个人感觉500毫秒非常合适  
    this.timeOutEvent = setTimeout(()=>{this.longPress()},500);
  }

  longPress(){
    window.localStorage.setItem('page',this.page);
    if(this.page == 4){
      window.localStorage.setItem('cuid',this.uid);
    }else if(this.page == 8){
      window.localStorage.setItem('pid',this.pid);
    }else if(this.page == 10){
      window.localStorage.setItem('pid',this.pid);
      window.localStorage.setItem('pid',this.selectType);
    }
  }
}
