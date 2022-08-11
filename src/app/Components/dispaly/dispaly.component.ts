import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dispaly',
  templateUrl: './dispaly.component.html',
  styleUrls: ['./dispaly.component.css'],
})
export class DispalyComponent implements OnInit {
  empdetails: any;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.empdetails = JSON.parse(params.data);
      console.log(this.empdetails);
    });
  }
}
