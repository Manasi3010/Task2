import { Component, OnInit, Output } from '@angular/core';
import { CountrystateService } from './service/countrystate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'rectform';
  state: any;
  city: any;
  finaldata: any;
  employee: any;

  constructor(private service: CountrystateService) {}
  ngOnInit() {
    this.getci();
    this.getstate();
    this.getemp();
  }

  getci() {
    this.service.getcity().subscribe((city: any) => {
      this.city = city.data;
      let json = this.city.map(function (item: string, i: number) {
        return {
          id: i + 1,
          name: item,
        };
      });
      this.finaldata = json;
    });
  }

  getstate() {
    this.service.getState().subscribe((res: any) => {
      this.state = res.states;
    });
  }

  getemp() {
    this.service.getEmployee().subscribe((emp: any) => {
      this.employee = emp;
    });
  }
}
