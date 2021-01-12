import Ajv, { SchemaObject, ValidateFunction } from 'ajv';

import applyRequestScheme from '../json-schemas/schemas/apply-req.json';
import applyResultScheme from '../json-schemas/schemas/apply-result.json';
import laCalculationRequestScheme from '../json-schemas/schemas/la-calc-req.json';
import laResultScheme from '../json-schemas/schemas/la-result.json';
import scenarioDataScheme from '../json-schemas/schemas/scenariodata.json';

import scenarioModelScheme from '../json-schemas/defs/scenariomodel.json';
import scenarioFilterScheme from '../json-schemas/defs/scenariofilter.json';
import portfolioRequestFilterScheme from '../json-schemas/defs/portfolio-req-filter.json';
import nodeTreeScheme from '../json-schemas/defs/nodetree.json';
import settingsScheme from '../json-schemas/defs/settings.json';
import nodeScheme from '../json-schemas/defs/node.json';
import currencyTableScheme from '../json-schemas/defs/currency-table.json';
import laScenarioTableScheme from '../json-schemas/defs/la-scenario.json';
import scenarioGroupTableScheme from '../json-schemas/defs/scenario-group.json';
import statValueScheme from '../json-schemas/defs/stat-value.json';

export type S3ObjectSchemaId = 'applyRequest' | 'applyResult' | 'laCalculationRequest' | 'laResult' | 'scenarioData';

export class S3PayloadValidationService {
  private ajv = new Ajv({
    schemas: [
      applyRequestScheme,
      applyResultScheme,
      laCalculationRequestScheme,
      laResultScheme,
      scenarioDataScheme,
      scenarioModelScheme,
      scenarioFilterScheme,
      portfolioRequestFilterScheme,
      nodeTreeScheme,
      settingsScheme,
      nodeScheme,
      currencyTableScheme,
      laScenarioTableScheme,
      scenarioGroupTableScheme,
      statValueScheme,
    ],
  }).addFormat('uuid', '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}');

  private ojbectSchemeMap: {
    [key in S3ObjectSchemaId]: SchemaObject;
  } = {
    applyRequest: applyRequestScheme,
    applyResult: applyResultScheme,
    laCalculationRequest: laCalculationRequestScheme,
    laResult: laResultScheme,
    scenarioData: scenarioDataScheme,
  };

  getObjectValidator(objectType: S3ObjectSchemaId): ValidateFunction<object> {
    const schema = this.ojbectSchemeMap[objectType];
    return this.ajv.compile(schema);
  }
}
