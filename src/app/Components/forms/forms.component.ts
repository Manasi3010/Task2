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
    private route: Router
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

  newEmployee(): FormGroup {
    return this.fb.group({
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
  }

  addEmployee() {
    // console.log('Adding a employee');
    return this.employees().push(this.newEmployee());
  }

  removeEmployee(empIndex: number) {
    this.employees().removeAt(empIndex);
  }
  onSubmit() {
    console.log('hi');

    let empdata = this.empForm.value;
    this.route.navigate(['/display'], {
      queryParams: { data: JSON.stringify(empdata) },
    });

    const idata = {
      firstname: this.empForm.value.firstName,
      lastname: this.empForm.value.lastName,
      email: this.empForm.value.email,
      state: this.empForm.value.State,
      city: this.empForm.value.city,
    };
  }
  onSelect(val: string) {
    console.log(val);
    this.data.getCity(val).subscribe((res: any) => {
      this.city = res;
      // console.log(this.city);
    });
  }
}
