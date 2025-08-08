import { Injectable, NotFoundException } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { UserService } from '../user.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class HasUniqueEmailValidator implements ValidatorConstraintInterface {
  constructor(private userService: UserService) {}

  async validate(value: string): Promise<boolean> {
    console.log('1.' + !!this.userService);

    try {
      const userHasEmail = await this.userService.searchByEmail(value);

      return !userHasEmail;
    } catch (error) {
      if (error instanceof NotFoundException) {
        return true;
      }

      throw error;
    }
  }
}

export const HasUniqueEmail = (validationOptions: ValidationOptions) => {
  return (object: object, property: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: property,
      options: validationOptions,
      constraints: [],
      validator: HasUniqueEmailValidator,
    });
  };
};
