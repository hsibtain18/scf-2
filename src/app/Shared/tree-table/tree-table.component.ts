import { Component, OnInit, Input } from '@angular/core';
import { data } from './tempData'
import { TreeNode } from 'primeng/api';
@Component({
  selector: 'app-tree-table',
  templateUrl: './tree-table.component.html',
  styleUrls: ['./tree-table.component.scss']
})
export class TreeTableComponent implements OnInit {

  @Input() DetailList: any[]
  temp: any = data;
  files: any[];
  inputs: any[]=[{name:"Hassan",value:"Syed Hassan SIbtain"},{name:"Hassan",value:"Syed Hassan SIbtain"}]
  cols: any[];
  constructor() { }

  ngOnInit(): void {
    console.log(data)
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
          type: 'Type ' + i
        }
      );
    }

    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'size', header: 'Size' },
      { field: 'type', header: 'Type' }
    ];
    console.log(this.files)
  }

}
