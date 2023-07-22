import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class NumberTransformPipe implements PipeTransform<string, number> {
  transform(value: string): number {
    const num = parseInt(value, 10);
    if (isNaN(num)) {
      throw new BadRequestException('Invalid number');
    }
    return num;
  }
}
