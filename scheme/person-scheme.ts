import { JSONSchemaType } from "ajv";
import { Person } from "../dto/dto-types";

export const personSchema: JSONSchemaType<Person> = {
  type: "object",
  properties: {
    name: { type: "string" },
    surname: { type: "string" },
  },
  required: ["name", "surname"],
  additionalProperties: false,
};
