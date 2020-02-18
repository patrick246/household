import {Component, OnInit} from '@angular/core';
import {HouseholdManagementService} from "./service/household-management.service";
import {PaginationResult} from "../api/PaginationResult";
import {Household} from "./service/household.model";
import {Observable} from "rxjs";
import {flatMap, map} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-household-management',
  templateUrl: './household-management.component.html',
  styleUrls: ['./household-management.component.scss']
})
export class HouseholdManagementComponent implements OnInit {

  public households$: Observable<PaginationResult<Household[]>>;

  constructor(private householdService: HouseholdManagementService,
              private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.households$ = this.activatedRoute.paramMap.pipe(
      map(params => parseInt(params.get('page'), 10) || 0),
      flatMap(page => this.householdService.getPage(page, 5))
    );

  }

}
