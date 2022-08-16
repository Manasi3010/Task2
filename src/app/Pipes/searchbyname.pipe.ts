import { Pipe, PipeTransform } from '@angular/core';
import { employee } from '../Model/Employee';

@Pipe({
  name: 'searchbyname',
})
export class SearchbynamePipe implements PipeTransform {
  transform(Employee: employee[], serchValue: string): employee[] {
    if (!Employee || !serchValue) {
      return Employee;
    }
    return Employee.filter((emp) =>
      emp.Name.toLocaleLowerCase().includes(serchValue.toLocaleLowerCase())
    );
  }
}
