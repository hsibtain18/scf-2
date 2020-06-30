import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-anchor-edit',
  templateUrl: './anchor-edit.component.html',
  styleUrls: ['./anchor-edit.component.scss']
})
export class AnchorEditComponent implements OnInit {

  active = 1;
  public anchorDetailForm: FormGroup;
  public anchorProgramForm: FormGroup;
  public anchorAgreementForm: FormGroup;
  anchorID: 0;
  programCheck: boolean = false
  public activeIndex: number;
  temp: any = {
    AnchorName: "name",
    Industry: "Industry",
    NTN: "NTN",
    Office: "Office",
    IBAN: "IBAN",
    ProgramSize: "Industry",
    ProductType: "0",
    Tenure: "Tenure",
    FinancingRate: "FinancingRate",
  };
  selectedFile: any = [];
  constructor(private _routerSnap: ActivatedRoute,
    private renderer: Renderer2,

  ) {
    this.anchorID = _routerSnap.snapshot.params.id
    this.anchorDetailForm = new FormGroup({
      ID: new FormControl(this.anchorID, [Validators.required]),
      AnchorName: new FormControl({ value: " ", disabled: true }, [Validators.required]),
      Industry: new FormControl({ value: " ", disabled: true }, [Validators.required]),
      NTN: new FormControl({ value: " ", disabled: true }, [Validators.required]),
      Office: new FormControl({ value: " ", disabled: true }, [Validators.required]),
      IBAN: new FormControl({ value: " ", disabled: true }, [Validators.required]),
    })

    this.anchorProgramForm = new FormGroup({
      ID: new FormControl(this.anchorID, [Validators.required]),
      ProgramSize: new FormControl(null, [Validators.required]),
      ProductType: new FormControl(null, [Validators.required]),
      Tenure: new FormControl(null, [Validators.required]),
      FinancingRate: new FormControl(null, [Validators.required]),
    })

  }

  openOffer() {

  }
  ngOnInit(): void {
    this.anchorDetailForm.patchValue(this.temp);
    this.anchorProgramForm.patchValue(this.temp);
  }
  onFileSelectOffer(event) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile != null || Math.round(this.selectedFile.size * 100 / (1024 * 1024) / 100) < 5) {
      if (this.selectedFile.type == "application/pdf") {
        alert("acasc");
      }
      return;
    }
  }
  onFileSelectAgreement(event) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile != null || Math.round(this.selectedFile.size * 100 / (1024 * 1024) / 100) < 5) {
      if (this.selectedFile.type == "application/pdf") {
        alert("acasc");
      }
      return;
    }
  }
  chooseUploadFile() {

    let event = new MouseEvent('click', { bubbles: true });
    // this.renderer.invokeElementMethod(this.myFle.nativeElement, 'dispatchEvent', [event]);
    // this.renderer.


  }
}
