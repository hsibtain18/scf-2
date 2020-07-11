import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-info-panel',
  templateUrl: './info-panel.component.html',
  styleUrls: ['./info-panel.component.scss']
})
export class InfoPanelComponent implements OnInit {

  @Output() onSubmit = new EventEmitter();
  @Input() fields: any[] = [];
  @Input() heading: string ="";
  form: FormGroup;
  constructor() { }

  ngOnInit(): void {
    // console.log(this.fields);
  }

}
