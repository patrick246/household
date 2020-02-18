import {Component, Input, OnInit} from '@angular/core';
import {Household} from "../service/household.model";

@Component({
  selector: 'app-household-card',
  templateUrl: './household-card.component.html',
  styleUrls: ['./household-card.component.scss']
})
export class HouseholdCardComponent implements OnInit {

  @Input()
  public household: Household;

  constructor() {
  }

  ngOnInit() {
  }

}
