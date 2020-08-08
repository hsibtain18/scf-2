import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tree-table',
  templateUrl: './tree-table.component.html',
  styleUrls: ['./tree-table.component.scss']
})
export class TreeTableComponent implements OnInit {

  @Input() DetailList : any[]
  constructor() { }

  ngOnInit(): void {
  }

}