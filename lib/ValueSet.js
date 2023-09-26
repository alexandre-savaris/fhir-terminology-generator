// For accessing utils functions.
import * as utils from './utils.js'
// For common definitions regarding CodeSystems e ValueSets.
import * as common from '../lib/common.js';

// The command related to the ValueSet generation.
const command = 'valueset'

// The command's description.
const describe = 'Generate a ValueSet.'

// The command's options.
const builder = {
    'immutable': {
        alias: 'm',
        describe: 'Indicates whether or not any change to the content logical definition may occur',
        type: 'string',
        choices: ['true', 'false']
    }
}

// The handler function for the ValueSet generation.
const handler = async function (argv) {

    console.log(argv)

    /// Read a CSV file content as JSON.
    const jsonArray = await utils.readCsv(argv.inputCsvFile);

    // Read the Mustache template.
    const template = await utils.readTemplate('templates/ValueSet.mustache');
    const commonTemplate = await utils.readTemplate('templates/common.mustache');

    // Render the Mustache template.
    const filledTemplate = await utils.renderTemplate(template, {
        ...common.composeCommonAttributes(argv),
        immutable: argv.immutable,
        valuesetComposeIncludeSystem: utils.extractFileName(argv.inputCsvFile),
        concept: JSON.stringify(jsonArray, null, 4)
    }, {
        common: commonTemplate
    });

    // Write the filled template to a JSON file.
    await utils.writeJson(argv.outputJsonFile, filledTemplate);
}

// Export the ValueSet generation artifacts.
export {
    command,
    describe,
    builder,
    handler
}
