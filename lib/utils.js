// For CSV to JSON conversion.
import csv from 'csvtojson';
// For reading/writing content from/to the filesystem.
import * as fs from 'fs/promises';
// For extracting the content's original filename.
import * as path from 'path';
// For rendering templates.
import Mustache from 'mustache';

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
    extractFileName,
    readCsv,
    readTemplate,
    renderTemplate,
    writeJson
}
