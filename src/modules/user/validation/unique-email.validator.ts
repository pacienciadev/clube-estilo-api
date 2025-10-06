import { Injectable, NotFoundException } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { UserService } from '../user.service';
import { CryptoService } from 'src/crypto/crypto.service'; 

@Injectable()
@ValidatorConstraint({ async: true })
export class HasUniqueEmailHashValidator implements ValidatorConstraintInterface {
  constructor(
    private userService: UserService,
    private cryptoService: CryptoService,
  ) {}

  async validate(value: string): Promise<boolean> {
    const emailHash = this.cryptoService.createUniqueHash(value); // Método que gera o SHA-256

    try {
      const userHasEmail = await this.userService.searchByEmailHash(emailHash);

      return !userHasEmail;
    } catch (error) {
      if (error instanceof NotFoundException) {
        return true; // É único!
      }

      throw error;
    }
  }
}

export const HasUniqueEmailHash = (validationOptions: ValidationOptions) => {
  return (object: object, property: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: property,
      options: validationOptions,
      constraints: [],
      validator: HasUniqueEmailHashValidator,
    });
  };
};
