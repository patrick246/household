import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'roleFilter'
})
export class RoleFilterPipe implements PipeTransform {

  transform(value: { [username: string]: string }, ...args: string[]): string[] {
    console.log(value, args);
    return Object.entries(value).filter(([_, value]) => value == args[0]).map(([key, _]) => key);
  }

}
