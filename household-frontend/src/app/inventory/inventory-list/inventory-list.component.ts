import {AfterViewInit, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {InventoryService} from "../service/inventory.service";
import {Item} from "../service/Item";
import {BehaviorSubject, combineLatest, concat, merge, Observable, of, Subject} from "rxjs";
import {debounceTime, distinctUntilChanged, flatMap, map} from "rxjs/operators";
import {ItemEditComponent} from "../item-edit/item-edit.component";
import {MatDialog, MatPaginator, PageEvent} from "@angular/material";
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {PaginationResult} from "../service/PaginationResult";

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})
export class InventoryListComponent implements OnInit, AfterViewInit {

  public items$: Observable<PaginationResult<Item[]>>;
  public shouldShowList: boolean;

  @ViewChild(ItemEditComponent, {static: false})
  public editor: ItemEditComponent;

  @ViewChild('itemEditOutlet', {static: false})
  public routerOutlet: RouterOutlet;

  @ViewChild('deleteVerification', {static: false})
  public deleteVerificationModal: TemplateRef<unknown>;

  @ViewChild(MatPaginator, {static: false})
  public pagination: MatPaginator;

  private searchTerm: Subject<string> = new BehaviorSubject<string>(null);

  constructor(
    private inventoryService: InventoryService,
    private dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
  ) {
  }

  ngOnInit() {
    console.log(this.routerOutlet);

    this.items$ = combineLatest(
      this.activatedRoute.paramMap.pipe(
        map(params => parseInt(params.get('page'), 10) || 0)
      ),
      this.searchTerm.pipe(
        distinctUntilChanged(),
        debounceTime(200)
      ),
      concat(of(undefined), this.inventoryService.itemUpdate$)
    ).pipe(
      flatMap(([page, searchTerm]) => this.inventoryService.getItemPage(page, 5, searchTerm))
    );
  }

  ngAfterViewInit(): void {
    this.updateListShouldShow();
    merge(this.routerOutlet.activateEvents, this.routerOutlet.deactivateEvents, this.breakpointObserver.observe(Breakpoints.Handset))
      .subscribe(() => {
        this.updateListShouldShow();
      });
  }

  private updateListShouldShow() {
    const isBiggerThanHandset = !this.breakpointObserver.isMatched(Breakpoints.Handset);
    const isOutletActivated = this.routerOutlet.isActivated;
    const shouldShowList = isBiggerThanHandset || (!isBiggerThanHandset && !isOutletActivated);
    // console.log('current state', 'bigger than handset', isBiggerThanHandset, 'outlet active', isOutletActivated, 'show list', shouldShowList);


    setTimeout(() => {
      this.shouldShowList = shouldShowList;
    }, 0)
  }

  public edit(item: Item) {
    this.router.navigate(['/inventory', {page: this.pagination.pageIndex}, item.id]);
  }

  public add() {
    this.router.navigate(['/inventory', {page: this.pagination.pageIndex}, 'new']);
  }

  public delete(item: Item) {
    this.dialog.open(this.deleteVerificationModal).afterClosed().subscribe(shouldDelete => {
      if (shouldDelete) {
        console.log(item);
        this.inventoryService.delete(item).subscribe(() => {
        });
      }
    });
  }

  public onNewPage(pageEvent: PageEvent) {
    this.router.navigate([{page: pageEvent.pageIndex}]);
  }

  public search(searchTerm: string) {
    this.searchTerm.next(searchTerm);
  }
}
