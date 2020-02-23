import {AfterViewInit, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {InventoryService} from "../service/inventory.service";
import {Item} from "../service/Item";
import {BehaviorSubject, combineLatest, concat, merge, Observable, of, Subject} from "rxjs";
import {debounceTime, distinctUntilChanged, flatMap, map, shareReplay, tap} from "rxjs/operators";
import {ItemEditComponent} from "../item-edit/item-edit.component";
import {MatDialog} from "@angular/material/dialog";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {PaginationResult} from "../../api/PaginationResult";
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        display: 'block',
        transform: 'translateX(0%)'
      })),
      state('closed', style({
        display: 'none',
        transform: 'translateX(100%)'
      })),
      transition('open => closed', [
        animate('0.2s', keyframes([
          style({transform: 'translateX(0%)', offset: 0}),
          style({transform: 'translateX(100%)', display: 'none', offset: 1})
        ]))
      ]),
      transition('closed => open', [
        animate('0.2s', keyframes([
          style({transform: 'translateX(100%)', display: 'block', offset: 0}),
          style({transform: 'translateX(0%)', offset: 1})
        ]))
      ])
    ])
  ]
})
export class InventoryListComponent implements OnInit, AfterViewInit {

  public items$: Observable<PaginationResult<Item[]>>;
  public shouldShowList: boolean;
  public isHandset$: Observable<boolean>;

  @ViewChild(ItemEditComponent)
  public editor: ItemEditComponent;

  @ViewChild('itemEditOutlet')
  public routerOutlet: RouterOutlet;

  @ViewChild('deleteVerification')
  public deleteVerificationModal: TemplateRef<unknown>;

  @ViewChild(MatPaginator)
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

    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        tap(event => console.log(event)),
        map(result => result.matches),
        shareReplay()
      );

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
