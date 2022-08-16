import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

import { CountrystateService } from 'src/app/service/countrystate.service';

@Component({
  selector: 'app-dispaly',
  templateUrl: './dispaly.component.html',
  styleUrls: ['./dispaly.component.css'],
})
export class DispalyComponent implements OnInit, AfterViewInit {
  empdetails: any;
  Allemp: any = [];
  searchKey = '';
  dataSource1: MatTableDataSource<any> = new MatTableDataSource();
  obs!: Observable<any>;
  filterValues: any = {};
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['firstName', 'email', 'State', 'city'];
  filterSelectObj: any = [];
  constructor(private emp: CountrystateService) {
    this.filterSelectObj = [
      {
        name: 'email',
        columnProp: 'email',
        options: [],
      },
      {
        name: 'State',
        columnProp: 'State',
        options: [],
      },
      {
        name: 'City',
        columnProp: 'city',
        options: [],
      },
    ];
  }

  ngOnInit() {
    this.emp.getEmployee().subscribe((data: any) => {
      this.Allemp = data;
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.obs = this.dataSource.connect();

      this.filterSelectObj.filter((o: any) => {
        o.options = this.getFilterObject(this.Allemp, o.columnProp);
      });
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.filterPredicate = this.createFilter();
  }
  filterChange(filter: any, event: any) {
    this.filterValues[filter.columnProp] = event.target.value
      .trim()
      .toLowerCase();
    this.filterValues['firstName'] =
      this.filterValues['firstName'] && this.filterValues['firstName'] !== ''
        ? this.filterValues['firstName']
        : '';
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }
  getFilterObject(fullObj: any, key: any) {
    const uniqChk: any[] = [];
    fullObj.filter((obj: any) => {
      if (!uniqChk.includes(obj[key])) {
        uniqChk.push(obj[key]);
      }
      return obj;
    });
    return uniqChk;
  }

  createFilter() {
    let filterFunction = function (data: any, filter: string): boolean {
      let searchTerms: any;
      try {
        searchTerms = JSON.parse(filter);
      } catch (error) {
        searchTerms = filter;
      }
      let isFilterSet = false;
      for (const col in searchTerms) {
        if (searchTerms[col].toString() !== '') {
          isFilterSet = true;
        } else {
          delete searchTerms[col];
        }
      }
      let nameSearch = () => {
        let found = false;
        if (isFilterSet) {
          for (const col in searchTerms) {
            searchTerms[col]
              .trim()
              .toLowerCase()
              .split(' ')
              .forEach((word: any) => {
                if (
                  data[col].toString().toLowerCase().indexOf(word) != -1 &&
                  isFilterSet
                ) {
                  found = true;
                }
              });
          }
          return found;
        } else {
          return true;
        }
      };
      return nameSearch();
    };
    return filterFunction;
  }
  applyFilter(event: any) {
    if (this.searchKey == '') {
      this.ngOnInit();
    } else {
      this.filterValues['firstName'] = event.target.value.toLowerCase();
      this.dataSource.filter = JSON.stringify(this.filterValues);
    }
  }

  // Reset table filters
  resetFilters() {
    this.filterValues = {};
    this.filterSelectObj.forEach((value: any, key: any) => {
      value.modelValue = undefined;
    });
    this.dataSource.filter = '';
  }
}
