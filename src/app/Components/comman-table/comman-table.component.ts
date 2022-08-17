import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-comman-table',
  templateUrl: './comman-table.component.html',
  styleUrls: ['./comman-table.component.css'],
})
export class CommanTableComponent implements OnInit, OnChanges, AfterViewInit {
  @Input('data') table: Array<object> = [];
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource();
  filters: FormGroup = new FormGroup({});

  constructor() {}

  @ViewChild(MatSort)
  sort: MatSort = new MatSort();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngOnChanges(changes: SimpleChanges) {
    this.dataSource.data = changes['table'].currentValue;
    this.table = changes['table'].currentValue;
    if (this.table.length !== 0) {
      this.dataSource.data = this.table;

      this.displayedColumns =
        this.table.length !== 0 ? Object.keys(this.table[0] as object) : [];
      Object.keys(this.table[0]).map((text: string) =>
        this.filters.addControl(text, new FormControl(''))
      );
      this.filters.valueChanges.subscribe((data) => {
        this.dataSource.filter = JSON.stringify(data);
      });
    }
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data: any, filter: string): boolean => {
      let f = JSON.parse(filter);
      let filterTruthSet = this.displayedColumns.map((text) => {
        return data[text].toString().indexOf(f[text]) !== -1;
      });
      return filterTruthSet.indexOf(false) !== -1 ? false : true;
    };
  }

  ngOnInit(): void {
    this.dataSource.data = this.table;
    this.displayedColumns =
      this.table.length !== 0 ? Object.keys(this.table[0] as object) : [];
    this.displayedColumns.map((text: string) =>
      this.filters.addControl(text, new FormControl(''))
    );
    this.filters.valueChanges.subscribe((data) => {
      this.dataSource.filter = JSON.stringify(data);
    });
  }
}
