import { S3ObjectSchemaId, S3PayloadValidationService } from '../services/validation-service';

import validApplyRequest from './res/validApplyRequest.json';
import validApplyResultRequest from './res/validApplyResultRequest.json';
import validLaCalcRequest from './res/validLaCalcRequest.json';
import validLaResultRequest from './res/validLaResultRequest.json';
import validScenarioDataRequest from './res/validScenarioDataRequest.json';

import invalidRequest from './res/invalidRequest.json';

interface SchemaTestCase {
  objectId: string;
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
      objectId: 'applyRequest',
      payload: validApplyRequest,
      expected: true,
    },
    {
      objectId: 'applyResult',
      payload: validApplyResultRequest,
      expected: true,
    },
    {
      objectId: 'laCalculationRequest',
      payload: validLaCalcRequest,
      expected: true,
    },
    {
      objectId: 'laResult',
      payload: validLaResultRequest,
      expected: true,
    },
    {
      objectId: 'scenarioData',
      payload: validScenarioDataRequest,
      expected: true,
    },
  ];

  const invalidTestCases: SchemaTestCase[] = [
    {
      objectId: 'applyRequest',
      payload: invalidRequest,
      expected: false,
    },
    {
      objectId: 'applyResult',
      payload: invalidRequest,
      expected: false,
    },
    {
      objectId: 'laCalculationRequest',
      payload: invalidRequest,
      expected: false,
    },
    {
      objectId: 'laResult',
      payload: invalidRequest,
      expected: false,
    },
    {
      objectId: 'scenarioData',
      payload: invalidRequest,
      expected: false,
    },
  ];

  validTestCases.forEach((testCase) => {
    test(`Validator for ${testCase.objectId} with valid payload should return true`, () => {
      run(testCase);
    });
  });

  invalidTestCases.forEach((testCase) => {
    test(`Validator for ${testCase.objectId} with invalid payload should return false`, () => {
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
