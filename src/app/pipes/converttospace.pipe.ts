import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'converttospace' })
export class ConverttospacePipe implements PipeTransform {
  transform(value: string, character: string): string {
    return value.replace(character, ' ');
  }
}
