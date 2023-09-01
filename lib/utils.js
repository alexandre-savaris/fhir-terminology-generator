// For CSV to JSON conversion.
import csv from 'csvtojson';
// For reading/writing content from/to the filesystem.
import * as fs from 'fs/promises';
// For rendering templates.
import Mustache from 'mustache';

// Read a CSV file content as JSON.
const readCsv = async (inputCsvFile) => {

    return await csv().fromFile(inputCsvFile);
}

// Read the Mustache template.
const readTemplate = async (inputTemplateFile) => {

    return await fs.readFile(inputTemplateFile, { encoding: 'utf8' });
}

// Render the Mustache template.
const renderTemplate = async (template, content) => {

    return Mustache.render(template, content);
}

// Write the filled template to a JSON file.
const writeJson = async (outputJsonFile, filledTemplate) => {

    await fs.writeFile(outputJsonFile, filledTemplate, { encoding: 'utf8' }, (err) => {
        if (err) {
            console.log(err);
        }
    })
    console.log(filledTemplate);
}

// Export the utils functions.
export {
    readCsv,
    readTemplate,
    renderTemplate,
    writeJson
}
