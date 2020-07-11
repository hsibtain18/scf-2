import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  @Input() file:any;
  @Input() form:any;
  @Input() heading:any;
  
  constructor() { }

  ngOnInit(): void {
  }

}
