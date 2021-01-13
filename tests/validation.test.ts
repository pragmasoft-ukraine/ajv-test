import { LoadMainSchemaError, LoadReferenceSchemaError, S3PayloadValidationService } from '../services/validation-service';

import validScenariosPostRequest1 from './res/valid-scenarios-post-request1.json';
import validScenariosPostRequest2 from './res/valid-scenarios-post-request2.json';
import validScenariosPostRequest3 from './res/valid-scenarios-post-request3.json';
import validScenariosPostRequest4 from './res/valid-scenarios-post-request4.json';
import validLossallocationPostRequest1 from './res/valid-lossallocation-post-request1.json';
import validLossallocationPostRequest2 from './res/valid-lossallocation-post-request2.json';

import invalidRequest from './res/invalidRequest.json';

import { loadSchema } from '../services/validation-service';

import { UUID_REGEX } from '../constants/constants';

import Ajv from 'ajv';

interface SchemaTestCase {
  objectUrl: string;
  payloadName: string;
  payload: object;
  expected: boolean;
}

let validationService: S3PayloadValidationService;
let ajv: Ajv;
beforeEach(() => {
  ajv = new Ajv({
    loadSchema,
    allErrors: true,
  }).addFormat('uuid', UUID_REGEX);
  validationService = new S3PayloadValidationService(ajv);
});

describe('S3PayloadValidationService validation', () => {
  const scenarioPostRequestSchemaLocation = '../json-schemas/scenarios-post-request.json';
  const lossallocationPostRequestSchemaLocation = '../json-schemas/lossallocation-post-request.json';

  const validTestCases: SchemaTestCase[] = [
    {
      objectUrl: scenarioPostRequestSchemaLocation,
      payload: validScenariosPostRequest1,
      payloadName: 'valid scenarios post request 1',
      expected: true,
    },
    {
      objectUrl: scenarioPostRequestSchemaLocation,
      payload: validScenariosPostRequest2,
      payloadName: 'valid scenarios post request 2',
      expected: true,
    },
    {
      objectUrl: scenarioPostRequestSchemaLocation,
      payload: validScenariosPostRequest3,
      payloadName: 'valid scenarios post request 3',
      expected: true,
    },
    {
      objectUrl: scenarioPostRequestSchemaLocation,
      payload: validScenariosPostRequest4,
      payloadName: 'valid scenarios post request 4',
      expected: true,
    },
    {
      objectUrl: lossallocationPostRequestSchemaLocation,
      payload: validLossallocationPostRequest1,
      payloadName: 'valid lossallocation post request 1',
      expected: true,
    },
    {
      objectUrl: lossallocationPostRequestSchemaLocation,
      payload: validLossallocationPostRequest2,
      payloadName: 'valid lossallocation post request 2',
      expected: true,
    },
  ];

  const invalidTestCases: SchemaTestCase[] = [
    {
      objectUrl: scenarioPostRequestSchemaLocation,
      payload: invalidRequest,
      payloadName: 'invalid scenarios post request',
      expected: false,
    },
    {
      objectUrl: lossallocationPostRequestSchemaLocation,
      payload: invalidRequest,
      payloadName: 'invalid lossallocation post request',
      expected: false,
    },
  ];

  validTestCases.forEach((testCase) => {
    test(`Validator for object ${testCase.objectUrl} with payload '${testCase.payloadName}' should return true`, () => {
      return run(testCase);
    });
  });

  invalidTestCases.forEach((testCase) => {
    test(`Validator for object ${testCase.objectUrl} with payload '${testCase.payloadName}'should return false`, () => {
      return run(testCase);
    });
  });

  const run = async ({ objectUrl: objectUrl, payload, expected }: SchemaTestCase) => {
    const validator = await validationService.getObjectValidator(objectUrl);
    const valid = validator(payload);
    expect(valid).toEqual(expected);
  };

  test('Validator should return list of errors when payload is invalid', async () => {
    const validator = await validationService.getObjectValidator(scenarioPostRequestSchemaLocation);
    const valid = validator(invalidRequest);
    expect(valid).toBeFalsy();
    expect(validator.errors).toBeTruthy();
    expect(validator.errors!.length).toBeGreaterThan(1);
  });
});

describe('S3PayloadValidationService error handling', () => {
  const validUrlWithInvalidSchema = '../tests/res/invalid-schema.json';
  const schemaWithInvalidReferenceUrl = '../tests/res/schema-with-invalid-reference-url.json';
  const schemaWithInvalidReferenceSchema = '../tests/res/schema-with-invalid-reference-schema.json';
  const invalidUrl = 'invalidUrl';
  test('Service shoul throw error when cannot find object by url', () => {
    return expect(validationService.getObjectValidator(invalidUrl)).rejects.toThrow(LoadMainSchemaError);
  });
  test('Service shoul throw error when there is an error in loaded main schema', () => {
    return expect(validationService.getObjectValidator(validUrlWithInvalidSchema)).rejects.toThrow(LoadMainSchemaError);
  });
  test('Service shoul throw error when reference url is not found', () => {
    return expect(validationService.getObjectValidator(schemaWithInvalidReferenceUrl)).rejects.toThrow(LoadReferenceSchemaError);
  });
  test('Service shoul throw error when reference schema is invalid', () => {
    return expect(validationService.getObjectValidator(schemaWithInvalidReferenceSchema)).rejects.toThrow(LoadReferenceSchemaError);
  });
});
