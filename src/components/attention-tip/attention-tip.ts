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
  public isShowdata = false;
  public timeOutEvent :any
  text: string;
  constructor() {
    
  }

  isShow() {
    this.isShowdata = !this.isShowdata;
  }

  startTouch(event) {
    this.timeOutEvent = setTimeout(()=>{this.longPress()},500);//这里设置定时器，定义长按500毫秒触发长按事件，时间可以自己改，个人感觉500毫秒非常合适  
  }

  longPress(){
    window.localStorage.setItem('page',this.page);
  }
}
