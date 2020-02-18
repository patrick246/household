import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Household} from "./household.model";
import {Observable, Subject} from "rxjs";
import {PaginationResult} from "../../api/PaginationResult";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HouseholdManagementService {
  public update$: Observable<void>;
  private onUpdate: Subject<void> = new Subject<void>();

  constructor(private httpClient: HttpClient) {
    this.update$ = this.onUpdate.asObservable();
  }

  public getPage(page: number, size: number): Observable<PaginationResult<Household[]>> {
    let params = new HttpParams()
      .append('page', page.toString(10))
      .append('size', size.toString(10));
    return this.httpClient.get<PaginationResult<Household[]>>(environment.backends.management + '/household', {params});
  }
}
