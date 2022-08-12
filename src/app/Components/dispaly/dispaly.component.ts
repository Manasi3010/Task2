import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.empdetails = JSON.parse(params.data);
      localStorage.setItem('data', JSON.stringify(this.empdetails));
      this.Allemp.push(this.empdetails);
    });
    this.dataSource = this.Allemp;
    console.log(this.dataSource);
  }
}
