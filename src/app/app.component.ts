import { Component, OnInit, OnChanges } from '@angular/core';


import {map, filter } from 'rxjs/operators';
import { Observable ,of,pipe} from 'rxjs';
import { NUMBER_FORMAT_REGEXP } from '@angular/common/src/i18n/format_number';
import { Pessoa } from './pessoa/pessoa.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges{
 
  ngOnInit(){
   
   
  }
  ngOnChanges(){
   
  }

  sqrt(){
    const nums = of(1,2,3,4,5,6,7,8,10,11,12,13,14,15);
    const sqrt = map((val:number)=> val*val);
    const odd = filter((val:number)=> val%2 !==0);
    const sqrtNum = sqrt(nums);
    const oddSqrt = pipe(odd, sqrt);
    const double = map((val:number)=> 2*val);
    const oddDouble = pipe(odd, double, sqrt);
    
    let arr = new Array();
    sqrtNum.subscribe(r => arr.push(r));
    console.info(`sqrt: ${arr}`);

    arr = new Array();
    odd(nums).subscribe(r=>arr.push(r));
    console.info(`odd: ${arr}`);

    arr = new Array();
    oddSqrt(nums).subscribe(r=>arr.push(r));
    console.info(`odd sqrt: ${arr}`);

    
    arr = new Array();
    oddDouble(nums).subscribe(r=>arr.push(r));
    console.info(`odd double: ${arr}`);
  }
}
