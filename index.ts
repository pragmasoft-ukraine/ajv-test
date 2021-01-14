import { S3PayloadValidationService } from './services/validation-service';
import Ajv from 'ajv';
import { loadSchemaByUrl } from './services/validation-service';
import { UUID_REGEX } from './constants/constants';

import validScenariosPostRequest4 from './tests/res/valid-scenarios-post-request4.json';

export const ajv = new Ajv({
  loadSchema: loadSchemaByUrl,
  allErrors: true,
}).addFormat('uuid', UUID_REGEX);

const validationService = new S3PayloadValidationService(ajv);

const cases = [
  {
    objectId: 'scenarios-post-request.json',
    payload: validScenariosPostRequest4,
    expected: true,
  },
  {
    objectId: 'scenarios-post-request.json',
    payload: validScenariosPostRequest4,
    expected: true,
  },
];
const run = async ({ objectId, payload, expected }: any) => {
  const validator = await validationService.getObjectValidator(objectId);
  const valid = validator(payload);
  console.log(valid);
  console.log(validator.errors);
};

run(cases[0]).then(() => {
  run(cases[1]);
});
