// For CSV to JSON conversion.
import csv from 'csvtojson';
// For reading/writing content from/to the filesystem.
import * as fs from 'fs/promises';
// For extracting the content's original filename.
import * as path from 'path';
// For rendering templates.
import Mustache from 'mustache';
// For validating JSON content using schemas.
import Ajv from 'ajv';

// Extract the contsnt's original filename.
const extractFileName = (filePath) => {

    return path.basename(filePath, path.extname(filePath));
}

// Read a CSV file content as JSON.
const readCsv = async (inputCsvFile) => {

    return await csv().fromFile(inputCsvFile);
}

// Read the Mustache template.
const readTemplate = async (inputTemplateFile) => {

    return await fs.readFile(inputTemplateFile, { encoding: 'utf8' });
}

// Render the Mustache template.
const renderTemplate = async (template, content, partials) => {

    return Mustache.render(template, content, partials);
}

// Validate the filled template using a JSON schema.
const validateFilledTemplate = async (filledTemplate) => {

    // Load the FHIR schema for JSON validation.
    const fhirSchema = await fs.readFile('./schemas/R5/fhir.schema.json', { encoding: 'utf8' });

    // Validate the filled template using the JSON schema.
    // The use of 'strict: false' is suggested in: https://json-schema.org/implementations#validator-javascript .
    const ajv = new Ajv( { strict: false });
    const validate = ajv.compile(JSON.parse(fhirSchema));
    const valid = validate(JSON.parse(filledTemplate));
    return {
        valid,
        errors: validate.errors

    };
}

// Write the filled template to a JSON file.
const writeJson = async (outputJsonFile, filledTemplate) => {

    await fs.writeFile(outputJsonFile, filledTemplate, { encoding: 'utf8' }, (err) => {
        if (err) {
            console.log(err);
        }
    })
}

// Export the utils functions.
export {
    extractFileName,
    readCsv,
    readTemplate,
    renderTemplate,
    validateFilledTemplate,
    writeJson
}
