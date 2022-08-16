import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { CountrystateService } from 'src/app/service/countrystate.service';

export interface State {
  name: string;
  iso3: string;
  iso2: string;
  state: Array<JSON>;
}
export interface State {
  firstname: string;
  lastname: string;
  email: string;
  State: string;
  city: string;
}
@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
})
export class FormsComponent implements OnInit {
  empForm: FormGroup;
  states: any;
  city: Array<JSON>;
  empdata: any = [];
  ydata: any;
  constructor(
    private fb: FormBuilder,

    private data: CountrystateService,
    private route: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.ydata = localStorage.getItem('key');
    this.empdata = JSON.parse(this.ydata);
    this.empForm = this.fb.group({
      firstName: [
        '',
        [Validators.required, Validators.minLength(5), Validators.maxLength(8)],
      ],
      lastName: [
        '',
        [Validators.required, Validators.minLength(5), Validators.maxLength(8)],
      ],
      State: ['', [Validators.required]],
      city: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
    });
    this.data.getState().subscribe((st) => {
      this.states = st;
    });
  }

  employees(): FormArray {
    return this.empForm.get('employees') as FormArray;
  }

  onSubmit() {
    this.http
      .post<any>('http://localhost:3000/employee', this.empForm.value)
      .subscribe((res) => {});
    this.route.navigate(['/display']);
  }
  onSelect(val: string) {
    console.log(val);
    this.data.getCity(val).subscribe((res: any) => {
      this.city = res;
    });
  }
}
