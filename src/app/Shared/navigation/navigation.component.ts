import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  
  @Output() navToggling = new EventEmitter();
  @Input() navigationState: boolean;
  public SideNav : any;
  constructor() { }

  ngOnInit(): void {

    this.SideNav = JSON.parse(sessionStorage.getItem("SCFMenuItem"))
  }


  navToggle() {
    if(this.navigationState){
      this.navToggling.emit(!this.navigationState);
    }
  }
}
