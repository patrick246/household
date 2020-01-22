import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {PaginationResult} from "./PaginationResult";
import {Item} from "./Item";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private itemUpdate: Subject<void> = new Subject<void>();
  public itemUpdate$: Observable<void> = this.itemUpdate.asObservable();

  constructor(private http: HttpClient) {
  }

  public getItemPage(page: number, size: number, search?: string): Observable<PaginationResult<Item[]>> {
    let params = new HttpParams()
      .append('page', page.toString(10))
      .append('size', size.toString(10));

    if (search) {
      params = params.append('search', search);
    }

    return this.http.get<PaginationResult<Item[]>>(environment.backends.inventory + '/items', {params});
  }

  public getItem(id: string): Observable<Item> {
    return this.http.get<Item>(environment.backends.inventory + '/items/id/' + id);
  }

  public update(item: Item): Observable<Item> {
    return this.http.put<Item>(environment.backends.inventory + '/items/id/' + item.id, item)
      .pipe(
        tap(() => this.itemUpdate.next())
      );
  }

  public create(item: Item): Observable<Item> {
    return this.http.post<Item>(environment.backends.inventory + '/items', item)
      .pipe(
        tap(() => this.itemUpdate.next())
      )
  }

  public delete(item: Item): Observable<void> {
    return this.http.delete<void>(environment.backends.inventory + '/items/id/' + item.id)
      .pipe(
        tap(() => this.itemUpdate.next())
      );
  }
}
