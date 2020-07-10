import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  @Input() UIObject ;
  @Input() val ;
  @Output() Action = new EventEmitter<any>();

  public header = [];
  public options = [];
  page = 1;
  constructor() { }

  ngOnInit(): void {
    // this.header = this.col;
    this.options = this.UIObject.Options;
    this.header = this.UIObject.Headers;
    console.log("testing",this.UIObject,this.val);  
  }
  getFieldName(value){
    return this.val.reduce((el)=>{
     if(el.fieldName==value){
       return el.value;
     }
    })
  }
  paginate(event){
    console.log(event);
  }
  sendAction(col: any ,action :any){
    this.Action.emit({data:col,action:action})
  }
  checkCondition(data,option){
    return !eval(option);
  }

}
 