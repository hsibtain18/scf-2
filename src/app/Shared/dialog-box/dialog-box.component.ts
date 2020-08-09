import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit {

  @Input() DataObject: any
  constructor(
    public activeModal: NgbActiveModal,
  ) { 

    setTimeout(()=>{
      activeModal.close();
    },2000);
  }

  ngOnInit(): void {
    console.log(this.DataObject);
  }

}
