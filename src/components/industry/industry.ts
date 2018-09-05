import { Component } from '@angular/core';
import {mamen_hy} from '../../Mock/data.js';


import {MamenDataProvider} from '../../providers/mamen-data/mamen-data';
/** 
 * Generated class for the IndustryComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'industry',
  templateUrl: 'industry.html'
})
export class IndustryComponent {
  private industrydataArr:Array<any>;
  private industrydata:any;
  public industryArr = [];
  text: string;

  constructor(industrydata:MamenDataProvider ) {
    console.log('Hello IndustryComponent Component');
    this.text = 'Hello World';
    this.industrydata = industrydata;
  }
  // ngOnInit () {
  //   console.log(mamen_hy);
  //   this.industryArr = mamen_hy.filter((f,i)=>i<4);

  //   console.log(this.industryArr,'===========')
  // }
  
}
