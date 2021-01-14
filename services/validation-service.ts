import Ajv, { SchemaObject, ValidateFunction } from 'ajv';

export class LoadMainSchemaError extends Error {}
export class LoadReferenceSchemaError extends Error {}

/**
 * TODO:
 * load schema from remote
 *
 */
export class S3PayloadValidationService {
  constructor(private ajv: Ajv) {}

  /**
   * @param objectSchemaUrl url of object schema, also id of schema
   * @returns validation function for giving shcema url
   * @throws LoadMainSchemaError when cannot load main schema or LoadReferenceSchemaError when cannot load reference schema
   */
  async getObjectValidator(objectSchemaUrl: string): Promise<ValidateFunction<any>> {
    let schema: SchemaObject;
    try {
      const schemaFunction = this.ajv.getSchema(objectSchemaUrl);
      if (schemaFunction) {
        return schemaFunction;
      } else {
        schema = (await this.ajv.opts.loadSchema!(objectSchemaUrl)!) as SchemaObject;
        this.ajv.addSchema(schema);
      }
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

export const loadSchemaByUrl = async (url: string): Promise<SchemaObject> => {
  return import(`../json-schemas/${url}`); //TODO get schema from remote
};

export const loadSchemaFromLocale = async (path: string): Promise<SchemaObject> => {
  return import(path);
};
