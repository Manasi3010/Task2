import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountrystateService {
  constructor(private http: HttpClient) {}

  getState() {
    return this.http
      .get('https://countriesnow.space/api/v0.1/countries/states')
      .pipe(
        map((state: any) => {
          return {
            ...state.data,
          };
        })
      );
  }

  getCity(state: string) {
    return this.http
      .post('https://countriesnow.space/api/v0.1/countries/state/cities', {
        state: state,
        country: 'India',
      })
      .pipe(
        map((city: any) => {
          return {
            ...city.data,
          };
        })
      );
  }
  getEmployee() {
    return this.http.get('http://localhost:3000/employee');
  }
}
