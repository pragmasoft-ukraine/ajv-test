import { S3ObjectSchemaId, S3PayloadValidationService } from './services/validation-service';

import validApplyRequest from './tests/res/validApplyRequest.json';
import validApplyResultRequest from './tests/res/validApplyResultRequest.json';
import validLaCalcRequest from './tests/res/validLaCalcRequest.json';
import validLaResultRequest from './tests/res/validLaResultRequest.json';
import validScenarioDataRequest from './tests/res/validScenarioDataRequest.json';

import invalidRequest from './tests/res/invalidRequest.json';

const validationService = new S3PayloadValidationService();

const cases = [
  {
    objectId: 'laCalculationRequest',
    payload: validLaCalcRequest,
    expected: true,
  },
];
const run = ({ objectId, payload, expected }: any) => {
  const validator = validationService.getObjectValidator(objectId as S3ObjectSchemaId);
  const valid = validator(payload);
  console.log(valid);
  console.log(validator.errors);
};

cases.forEach(run);
