import Ajv, { SchemaObject, ValidateFunction } from 'ajv';

export class LoadMainSchemaError extends Error {}
export class LoadReferenceSchemaError extends Error {}

/* TODO:
 * Change loadShema function to get data by url
 * exception tests
 */
export class S3PayloadValidationService {
  constructor(private ajv: Ajv) {}

  /**
   * @param objectSchemaUrl url of object schema
   * @returns validation function for giving shcema url
   * @throws Error when cannot load schema or schema is invalid
   */
  async getObjectValidator(objectSchemaUrl: string): Promise<ValidateFunction<any>> {
    let schema: SchemaObject;
    try {
      schema = await loadSchema(objectSchemaUrl, true);
    } catch (err) {
      console.log(err);
      throw new LoadMainSchemaError('Load main schema error: ' + err);
    }
    try {
      return await this.ajv.compileAsync(schema);
    } catch (err) {
      console.log(err);
      throw new LoadReferenceSchemaError('Load reference schema error: ' + err);
    }
  }
}

export const loadSchema = async (url: string, absolutePath = false): Promise<SchemaObject> => {
  if (absolutePath) {
    return import(url); // TODO load from remote
  }
  return import(`../json-schemas/${url}`);
};
