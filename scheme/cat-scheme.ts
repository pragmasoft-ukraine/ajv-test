import { JSONSchemaType } from "ajv";
import { Cat } from "../dto/dto-types";

export const catSchema: JSONSchemaType<Cat> = {
  type: "object",
  properties: {
    name: { type: "string" },
    age: { type: "number" },
  },
  required: ["name", "age"],
  additionalProperties: false,
};