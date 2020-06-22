import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-anchor-edit',
  templateUrl: './anchor-edit.component.html',
  styleUrls: ['./anchor-edit.component.scss']
})
export class AnchorEditComponent implements OnInit {

  active = 1;
  constructor() { }

  ngOnInit(): void {
  }

}
