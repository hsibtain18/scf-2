import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  @Input() col ;
  @Input() val ;
  @Output() Action = new EventEmitter<any>();

  header = []
  page = 1;
  constructor() { }

  ngOnInit(): void {
    // this.header = this.col;
    console.log("testing",this.col,this.val);  
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
}
 