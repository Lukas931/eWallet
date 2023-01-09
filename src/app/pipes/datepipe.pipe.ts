import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datepipe'
})
export class DatepipePipe implements PipeTransform {

  transform(value: string[], ...args: unknown[]): Date {
    
    let date = new Date(Number(value[0]));
   // console.log(date);
    return date;
  }

}
