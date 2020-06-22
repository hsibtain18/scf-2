import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  @Input() col ;
  @Input() val ;
  header = []
  constructor() { }

  ngOnInit(): void {
    this.header = this.col;
    console.log("testing",this.header);  
  }
  getFieldName(value){
    return this.val.reduce((el)=>{
     if(el.fieldName==value){
       return el.value;
     }
    })
  }
}
 