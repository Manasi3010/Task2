import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { FormsComponent } from '../forms/forms.component';

@Component({
  selector: 'app-dispaly',
  templateUrl: './dispaly.component.html',
  styleUrls: ['./dispaly.component.css'],
})
export class DispalyComponent implements OnInit {
  empdetails: any;
  Allemp: any = [];
  dataSource = new MatTableDataSource();

  displayedColumns: string[] = ['Name', 'Email', 'State', 'City'];
  constructor(private route: ActivatedRoute, private dialog: MatDialog) {}
  data: any;
  iFdata: any;
  ngOnInit(): void {
    if (localStorage.getItem('Fdata')) {
      this.iFdata = localStorage.getItem('Fdata');
      this.Allemp = JSON.parse(this.iFdata);
      console.log(this.Allemp);
    }

    this.route.queryParams.subscribe((params: any) => {
      this.empdetails = JSON.parse(params.data);
      console.log(this.empdetails);

      this.Allemp.push(this.empdetails);
      console.log(this.Allemp);
      const idata = JSON.stringify(this.Allemp);
      localStorage.setItem('Fdata', idata);
    });
    this.dataSource = this.Allemp;
    // console.log(this.dataSource);
  }
}
