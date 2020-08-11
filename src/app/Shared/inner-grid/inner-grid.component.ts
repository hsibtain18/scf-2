import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-inner-grid',
  templateUrl: './inner-grid.component.html',
  styleUrls: ['./inner-grid.component.scss']
})
export class InnerGridComponent implements OnInit {

  @Input() heading: string
  @Input() FileObject: [];
  @Input() panelDetailsHeaders :any = []
  @Input() Status: boolean;
  @Input() TotalAmount;
  headers: any;
  constructor() { }

  ngOnInit(): void {
    console.log(this.FileObject);
    console.log(this.panelDetailsHeaders);
    this.headers = this.panelDetailsHeaders.Headers
  }

}
