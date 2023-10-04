import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../services/data.service';
import {
  Subscription,
  debounceTime,
  forkJoin,
  fromEvent,
  map,
  race,
  repeat,
  take,
} from 'rxjs';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-table',
  templateUrl: './post-table.component.html',
  styleUrls: ['./post-table.component.css'],
})

/**
 * @class PostTableComponent
 * @description Class used for displaying user list
 */
export class PostTableComponent implements OnInit {
  public isLoading: boolean = true;
  private dataList: any = [];
  public dataSource!: MatTableDataSource<any>;
  public displayedColumns: string[] = ['userId', 'id', 'title', 'body'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private inputSubscription!: Subscription;
  @ViewChild('searchInput') searchInput!: ElementRef;

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    //this.loadNewStory();
    this.loadDataList();
  }

  /**
   * @description This method is used to load data
   * @memberof PostTableComponent
   */
  private loadDataList() {
    this.dataService.getDataList().subscribe((data) => {
      this.dataList = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.customFilterPredicate;
      this.isLoading = false;
    });
  }

  // Define a custom filter predicate function
  customFilterPredicate(dataItem: any, filterText: string): boolean {
    // Convert the filter text to lowercase for case-insensitive filtering
    const filterTextLower = filterText.toLowerCase();

    // Check if either the userid or title contains the filter text
    return (
      dataItem.userId.toString() == filterTextLower ||
      dataItem.title.toLowerCase().includes(filterTextLower)
    );
  }

  ngAfterViewInit() {
    this.processSearchInput();
  }

  /**
   * @description This method is used to process the search input, handle debounce and keyup/blur event
   * @memberof PostTableComponent
   */
  private processSearchInput() {
    const searchTermKeyup = fromEvent<any>(
      this.searchInput.nativeElement,
      'keyup'
    ).pipe(
      map((event) => event.target.value),
      debounceTime(500)
    );
    const searchTermBlur = fromEvent<any>(
      this.searchInput.nativeElement,
      'blur'
    ).pipe(
      map((event) => event.target.value),
      debounceTime(0)
    );
    this.inputSubscription = race(searchTermKeyup, searchTermBlur)
      .pipe(take(1), repeat())
      .subscribe((item) => {
        this.onSearch(item);
      });
  }

  /**
   * @description This method is used to filter stories based on search input data
   * @memberof PostTableComponent
   */
  private onSearch(filterValue: string) {
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public onRowClick(rowData: any) {
    this.dataService.setRowDetails(rowData);
    this.router.navigate(['/detail', rowData.id]);
  }

  ngOnDestroy() {
    this.inputSubscription.unsubscribe();
  }
}
