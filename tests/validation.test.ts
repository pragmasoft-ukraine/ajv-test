import { S3PayloadValidationService } from '../services/validation-service';

import validScenarioData from './validScenarioData.json';
import validApplyRequest from './validApplyRequest.json';
import invalidScenarioData from './invalidScenarioData.json';

describe('S3PayloadValidationService validation', () => {
  let validationService: S3PayloadValidationService;

  beforeEach(() => {
    validationService = new S3PayloadValidationService();
  });

  test('Validator should return true when payload is valid', () => {
    const validator = validationService.getObjectValidator('scenarioData');
    const valid = validator(validScenarioData);
    expect(valid).toEqual(true);
  });

  test('Validator should return false when payload is invalid for current object type', () => {
    const validator = validationService.getObjectValidator('scenarioData');
    const valid = validator(invalidScenarioData);
    expect(valid).toEqual(false);
  });

  test('Validator should return false when payload is valid but not for current object type', () => {
    const validator = validationService.getObjectValidator('scenarioData');
    const valid = validator(validApplyRequest);
    expect(valid).toEqual(false);
  });
});
