import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ArrayOfNumbersTransformPipe implements PipeTransform {
  transform(value: any): number[] {
    if (!Array.isArray(value)) {
      throw new BadRequestException('A sequência deve ser um array.');
    }

    const numbers = value.map((item) => {
      const num = Number(item);
      if (isNaN(num)) {
        throw new BadRequestException(
          'A sequência deve conter apenas números.',
        );
      }

      return num;
    });

    return numbers;
  }
}
