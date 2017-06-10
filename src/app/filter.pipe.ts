import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], args?: string): any {
    console.log(args);

    switch (args) {
      case 'all':
        return value;
      case 'active':
        return value.filter(data => !data.done);
      case 'completed':
        return value.filter(data => data.done);
    }

    return value;
  }

}
