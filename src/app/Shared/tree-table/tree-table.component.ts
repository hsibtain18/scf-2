import { Component, OnInit, Input } from '@angular/core';
import { data } from './tempData'
import { TreeNode } from 'primeng/api';
@Component({
  selector: 'app-tree-table',
  templateUrl: './tree-table.component.html',
  styleUrls: ['./tree-table.component.scss']
})
export class TreeTableComponent implements OnInit {

  @Input() DetailList: any;
  @Input() HeadersTotal :any[];
  temp: any = data;
  files: any[];
  inputs: any[]=[{name:"Hassan",value:"Syed Hassan SIbtain"},{name:"Hassan",value:"Syed Hassan SIbtain"}]
  cols: any;
  cols2: any;
  cols3: any;
  constructor() { }

  async ngOnInit(): Promise<any> {
    console.log(this.HeadersTotal)
    console.log(this.DetailList)
    this.cols = await this.getHeaders(1);
    this.cols2 = await this.getHeaders(2);
    this.cols3 = await this.getHeaders(3);
    this.files = [];
    // for (let i = 0; i < 50; i++) {
    //   let node = {
    //     data: {
    //       Company: 'Item ' + i,
    //       InvoiceID: Math.floor(Math.random() * 1000) + 1 + 'kb',
    //       InvoiceAmount: 'Type ' + i,
    //       PaymentDate: 'Item ' + i,
    //       LatePayment: Math.floor(Math.random() * 1000) + 1 + 'kb',
    //       ShortPayment: 'Type ' + i
    //     },
    //     children: [
    //       {
    //           data: {  
    //             Company: 'Item ' + i,
    //             InvoiceID: Math.floor(Math.random() * 1000) + 1 + 'kb',
    //             InvoiceAmount: 'Type ' + i,
    //             PaymentDate: 'Item ' + i,
    //             LatePayment: Math.floor(Math.random() * 1000) + 1 + 'kb',
    //             ShortPayment: 'Type ' + i
    //           }
    //       }
    //   ]
    //   };

    //   this.files.push(node);
    // }

    // this.cols = [
    //   { field: 'Company', header: 'Company' },
    //   { field: 'InvoiceID', header: 'Invoice ID' },
    //   { field: 'InvoiceAmount', header: 'Invoice Amount' },
    //   { field: 'PaymentDate', header: 'Payment Date' },
    //   { field: 'LatePayment', header: 'Late Payment' },
    //   { field: 'ShortPayment', header: 'Short Payment' }
    // ];
    this.files = [];
    for (let i = 0; i < 50; i++) {
      // let node = {
      //     data:{  
      //         name: 'Item ' + i,
      //         size: Math.floor(Math.random() * 1000) + 1 + 'kb',
      //         type: 'Type ' + i
      //     },
      //     children: [
      //         {
      //             data: {  
      //                 name: 'Item ' + i + ' - 0',
      //                 size: Math.floor(Math.random() * 1000) + 1 + 'kb',
      //                 type: 'Type ' + i
      //             }
      //         }
      //     ]
      // };

      this.files.push(
        {
          ID:i,
          name: 'Item ' + i,
          size: Math.floor(Math.random() * 1000) + 1 + 'kb',
          type: 'Type ' + i,
          Data:[{
            ID2:i+2,
            name2: 'Item2 ' + i,
            size2: Math.floor(Math.random() * 1000) + 1 + 'kb',
            type2: 'Type2222 ' + i,
          },
          {
            ID2:i+3,
            name2: 'Item2 ' + i,
            size2: Math.floor(Math.random() * 1000) + 1 + 'kb',
            type2: 'Type2222 ' + i,
            Data2:[{Data2:'Data2'}]
          }]
        }
      );
    }

    // this.cols = [
    //   { field: 'name', header: 'Name' },
    //   { field: 'size', header: 'Size' },
    //   { field: 'type', header: 'Type' }
    // ];

    // this.cols2 = [
    //   { field: 'name2', header: 'Name2' },
    //   { field: 'size2', header: 'Size2' },
    //   { field: 'type2', header: 'Type2' }
    // ];
  }


  getHeaders(index){
    return new Promise((resolve,reject)=>{
      let obj = this.HeadersTotal.filter(ele=>{
        if(ele.Level==index){
          return ele
        }
      })
      resolve(obj);
    })
  }
}
