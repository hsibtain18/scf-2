import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-limit-view',
  templateUrl: './limit-view.component.html',
  styleUrls: ['./limit-view.component.scss']
})
export class LimitViewComponent implements OnInit {

  public BuyerDetails : FormGroup
  constructor() { 
    this.BuyerDetails = new FormGroup({
      
    })
  }

  ngOnInit(): void {
  }

}
