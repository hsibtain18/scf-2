import { Component, OnInit, ViewChild ,Renderer2} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-anchor-edit',
  templateUrl: './anchor-edit.component.html',
  styleUrls: ['./anchor-edit.component.scss']
})
export class AnchorEditComponent implements OnInit {

  active = 1;
  @ViewChild('myFle')
  public anchorDetailForm : FormGroup;
  public anchorProgramForm : FormGroup;
  public anchorAgreementForm : FormGroup;
  myFle: any;
  anchorID : 0;
  program
  constructor( private _routerSnap : ActivatedRoute ,
    private renderer: Renderer2,

  ) { 
    this.anchorID = _routerSnap.snapshot.params.id
    this.anchorDetailForm = new FormGroup({
      ID: new FormControl(this.anchorID ,[Validators.required]),
      AnchorName: new FormControl({value:"Syed Hassan Sibtain",disabled:true},[Validators.required]),
      Industry: new FormControl({value:"Syed Hassan Sibtain",disabled:true},[Validators.required]),
      NTN: new FormControl({value:"Syed Hassan Sibtain",disabled:true},[Validators.required]),
      Office: new FormControl({value:"Syed Hassan Sibtain",disabled:true},[Validators.required]),
      IBAN: new FormControl({value:"Syed Hassan Sibtain",disabled:true},[Validators.required]),
      ProgramSize: new FormControl(null,[Validators.required]),
      ProductType: new FormControl(0,[Validators.required]),
      Tenure: new FormControl(null,[Validators.required]),
      FinancingRate: new FormControl(null,[Validators.required]),
    })

    this.anchorProgramForm = new FormGroup({
      ID: new FormControl(this.anchorID ,[Validators.required]),
      ProgramSize: new FormControl(null,[Validators.required]),
      ProductType: new FormControl(null,[Validators.required]),
      Tenure: new FormControl(null,[Validators.required]),
      FinancingRate: new FormControl(null,[Validators.required]),
    })

  }

  ngOnInit(): void {
  }
  fileEvent(event) {

  }
  chooseUploadFile() {

    let event = new MouseEvent('click', { bubbles: true });
    // this.renderer.invokeElementMethod(this.myFle.nativeElement, 'dispatchEvent', [event]);
    // this.renderer.


  }
}
