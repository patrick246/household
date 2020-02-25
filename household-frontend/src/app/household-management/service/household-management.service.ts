import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Household} from "./household.model";
import {Observable, Subject} from "rxjs";
import {PaginationResult} from "../../api/PaginationResult";
import {environment} from "../../../environments/environment";
import {tap} from "rxjs/operators";

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

  public getById(id: string): Observable<Household> {
    return this.httpClient.get<Household>(environment.backends.management + '/household/' + id);
  }

  public deleteById(id: string): Observable<Household> {
    return this.httpClient.delete<Household>(environment.backends.management + '/household/' + id)
      .pipe(
        tap(() => this.onUpdate.next())
      );
  }

  public save(household: Household): Observable<Household> {
    return this.httpClient.put<Household>(environment.backends.management + '/household/' + household.id, household)
      .pipe(
        tap(() => this.onUpdate.next())
      );
  }

  public searchUsers(username: string): Observable<string[]> {
    const params = new HttpParams()
      .append('name', username);
    return this.httpClient.get<string[]>(environment.backends.management + '/users', {params});
  }
}
