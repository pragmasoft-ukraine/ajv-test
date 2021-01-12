import { S3PayloadValidationService } from './services/validation-service';

import validScenarioData from './tests/validScenarioData.json';

const testObject = {
};

const validationService = new S3PayloadValidationService();

// let validator = validationService.getObjectValidator('applyRequest');
// console.log(validator(testObject));
// console.log(validator.errors);

// validator = validationService.getObjectValidator('laCalculationRequest');
// console.log(validator(testObject));
// console.log(validator.errors);

// validator = validationService.getObjectValidator('applyResult');
// console.log(validator(testObject));
// console.log(validator.errors);

// validator = validationService.getObjectValidator('laResult');
// console.log(validator(testObject));
// console.log(validator.errors);

// validator = validationService.getObjectValidator('scenarioData');
// console.log(validator(testObject));
// console.log(validator.errors);

const validator = validationService.getObjectValidator('scenarioData');
const valid = validator(validScenarioData);
console.log(typeof validScenarioData.scenario.buildModel.fullTree.customers[0]);

console.log(valid);
console.log(validator.errors);

