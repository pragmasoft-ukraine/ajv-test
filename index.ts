import { S3PayloadValidationService } from './services/validation-service';

const cat = {
  name: 'kitty',
  age: 2,
};

const person = {
  name: 'ivan',
  surname: 'ivanov',
};

const validationService = new S3PayloadValidationService();

let validator = validationService.getObjectValidator('cat');
console.log(`cat is cat? ${validator(cat)}`);
console.log(validator.errors);

validator = validationService.getObjectValidator('cat');
console.log(`person is cat? ${validator(person)}`);
console.log(validator.errors);

validator = validationService.getObjectValidator('person');
console.log(`cat is person? ${validator(cat)}`);
console.log(validator.errors);

validator = validationService.getObjectValidator('person');
console.log(`person is person? ${validator(person)}`);
console.log(validator.errors);
