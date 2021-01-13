import { S3PayloadValidationService } from './services/validation-service';

import validScenariosPostRequest4 from './tests/res/valid-scenarios-post-request4.json';

import Ajv from 'ajv';

import { loadSchema } from './services/validation-service';

import { UUID_REGEX } from './constants/constants';

export const ajv = new Ajv({
  loadSchema,
  allErrors: true,
}).addFormat('uuid', UUID_REGEX);

const validationService = new S3PayloadValidationService(ajv);

const cases = [
  {
    objectId: '../json-schemas/scenarios-post-request.json',
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

cases.forEach(run);
