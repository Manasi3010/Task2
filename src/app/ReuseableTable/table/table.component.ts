import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Column } from 'src/app/Model/Column';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit, AfterViewInit {
  @Input()
  tableColumns: Array<Column> = [];

  @Input()
  tableData: any = [];

  displayedColumns: Array<string> = [];
  dataSource = new MatTableDataSource();
  obs!: Observable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() {}
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();
  }

  ngOnInit(): void {
    this.displayedColumns = this.tableColumns.map((c) => c.columnDef);
    this.dataSource = new MatTableDataSource(this.tableData);
    this.dataSource.data = this.tableData;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
