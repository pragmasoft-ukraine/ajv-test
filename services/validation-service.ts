import Ajv, { ValidateFunction } from 'ajv';
import { Cat, Person } from '../dto/dto-types';

import catSchema from '../scheme/cat-schema.json';
import { personSchema } from '../scheme/person-scheme';

export type S3ObjectType = 'cat' | 'person';

export class S3PayloadValidationService {
  private ajv = new Ajv();

  private ojbectSchemeMap: {
    [key in S3ObjectType]: ValidateFunction<Cat | Person>;
  } = {
    cat: this.ajv.compile(catSchema),
    person: this.ajv.compile(personSchema),
  };

  getObjectValidator(objectType: S3ObjectType): ValidateFunction<Cat | Person> {
    return this.ojbectSchemeMap[objectType];
  }
}
