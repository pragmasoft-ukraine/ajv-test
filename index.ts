import { S3ObjectSchemaId, S3PayloadValidationService } from './services/validation-service';

import validApplyRequest from './tests/res/validApplyRequest.json';
import validApplyResultRequest from './tests/res/validApplyResultRequest.json';
import validLaCalcRequest from './tests/res/validLaCalcRequest.json';
import validLaResultRequest from './tests/res/validLaResultRequest.json';
import validScenariosPostRequest1 from './tests/res/validScenariosPostRequest1.json';
import validScenariosPostRequest2 from './tests/res/validScenariosPostRequest2.json';
import validScenariosPostRequest3 from './tests/res/validScenariosPostRequest3.json';

import invalidRequest from './tests/res/invalidRequest.json';

const validationService = new S3PayloadValidationService();

const cases = [
  {
    objectId: 'http://example.com/schemas/scenariodata.json',
    payload: validScenariosPostRequest3,
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
