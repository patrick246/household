import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {PaginationResult} from "./PaginationResult";
import {Item} from "./Item";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http: HttpClient) {
  }

  public getItemPage(page: number, size: number): Observable<PaginationResult<Item[]>> {
    return this.http.get<PaginationResult<Item[]>>(environment.backends.inventory + '/items', {
      params: new HttpParams()
        .append('page', page.toString())
        .append('size', size.toString())
    });
  }
}
