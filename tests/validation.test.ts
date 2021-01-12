import { S3ObjectSchemaId, S3PayloadValidationService } from '../services/validation-service';

import validApplyRequest from './res/validApplyRequest.json';
import validApplyResultRequest from './res/validApplyResultRequest.json';
import validLaCalcRequest from './res/validLaCalcRequest.json';
import validLaResultRequest from './res/validLaResultRequest.json';
import validScenariosPostRequest1 from './res/validScenariosPostRequest1.json';
import validScenariosPostRequest2 from './res/validScenariosPostRequest2.json';
import validScenariosPostRequest3 from './res/validScenariosPostRequest3.json';

import invalidRequest from './res/invalidRequest.json';

interface SchemaTestCase {
  objectId: string;
  payloadName: string;
  payload: object;
  expected: boolean;
}

describe('S3PayloadValidationService validation', () => {
  let validationService: S3PayloadValidationService;

  beforeEach(() => {
    validationService = new S3PayloadValidationService();
  });

  const validTestCases: SchemaTestCase[] = [
    {
      objectId: 'http://example.com/schemas/scenariodata.json',
      payload: validScenariosPostRequest1,
      payloadName: 'valid scenarios post request 1',
      expected: true,
    },
    {
      objectId: 'http://example.com/schemas/scenariodata.json',
      payload: validScenariosPostRequest2,
      payloadName: 'valid scenarios post request 2',
      expected: true,
    },
    {
      objectId: 'http://example.com/schemas/scenariodata.json',
      payload: validScenariosPostRequest3,
      payloadName: 'valid scenarios post request 3',
      expected: true,
    },
  ];

  const invalidTestCases: SchemaTestCase[] = [
    {
      objectId: 'http://example.com/schemas/scenariodata.json',
      payload: invalidRequest,
      payloadName: 'invalid scenarios post request',
      expected: false,
    },
  ];

  validTestCases.forEach((testCase) => {
    test(`Validator for object ${testCase.objectId} with payload '${testCase.payloadName}' should return true`, () => {
      run(testCase);
    });
  });

  invalidTestCases.forEach((testCase) => {
    test(`Validator for object ${testCase.objectId} with payload '${testCase.payloadName}'should return false`, () => {
      run(testCase);
    });
  });

  const run = ({ objectId, payload, expected }: SchemaTestCase) => {
    const validator = validationService.getObjectValidator(objectId as S3ObjectSchemaId);
    const valid = validator(payload);
    expect(valid).toEqual(expected);
  };

  // test('Validator should return errors when payload is invaild', () => {
    
  // });
});
