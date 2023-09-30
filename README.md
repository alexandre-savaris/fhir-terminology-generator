# fhir-terminology-generator
A minimalistic CLI application to generate FHIR® terminology-related structures.  

It's minimalistic because:
1. It generates only __CodeSystem__ and __ValueSet__ instances;
2. the source CSV files have only 2 columns - the first one with __codes__ (text symbols that uniquely identify concepts within the terminology), and the second one with __display texts__ (human-readable strings related to codes);
3. it considers only attributes with a __maximum cardinality of 1__, represented by __simple datatypes__ (e.g. string, boolean, etc.);
4. the output is generated exclusively in __JSON__ format.

Node.js version = 18.17.0  
FHIR Specification = v5.0.0: R5 - STU

## Notes
The file [fhir.schema.json](schemas/R5/fhir.schema.json) (FHIR Schema) was modified to be used in the validation, as follows:
1. As recommended in https://ajv.js.org/guide/schema-language.html, the key $schema was removed;
2. "{1,9}}" was replaced by "{1,9}" due to syntax issues.
