# fhir-terminology-generator
A CLI application to generate FHIR® terminology-related structures.

Node.js version = 18.17.0

## Notes
The file [fhir.schema.json](schemas/R5/fhir.schema.json) (FHIR Schema) was modified to be used in the validation of instances of CodeSystem and ValueSet structures, as follows:
1. As recommended in https://ajv.js.org/guide/schema-language.html, the key $schema was removed;
2. "{1,9}}" was replaced by "{1,9}" due to syntax issues.
