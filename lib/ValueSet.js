// For accessing utils functions.
import * as utils from './utils.js'
// For common definitions regarding CodeSystems e ValueSets.
import * as common from '../lib/common.js';

// The command related to the ValueSet generation.
const command = 'valueset'

// The command's description.
const describe = 'To generate a ValueSet'

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

    try {

        // Read a CSV file content as JSON.
        const jsonArray = await utils.readCsv(argv.inputCsv);
        console.log(`Finished reading CSV from ${argv.inputCsv}`);

        // Read the Mustache templates.
        const template = await utils.readTemplate('templates/ValueSet.mustache');
        const commonTemplate = await utils.readTemplate('templates/common.mustache');
        console.log('Finished reading Mustache templates');

        // Render the Mustache template.
        const filledTemplate = await utils.renderTemplate(template, {
            ...common.composeCommonAttributes(argv),
            immutable: argv.immutable,
            valuesetComposeIncludeSystem: utils.extractFileName(argv.inputCsv),
            concept: JSON.stringify(jsonArray, null, 4)
        }, {
            common: commonTemplate
        });
        console.log('Finished filling Mustache templates');

        // Validate the filled template using a JSON schema.
        const { valid, errors } = await utils.validateFilledTemplate(filledTemplate);
        if (!valid) {
            throw new Error(errors);
        }
        console.log('Finished validating the filled templates using the FHIR JSON Schema');

        // Write the filled template to a JSON file.
        await utils.writeJson(argv.outputJson, filledTemplate);
        console.log(`Finished writing JSON to ${argv.outputJson}`);

    } catch (e) {
        console.error(e);
    }
}

// Export the ValueSet generation artifacts.
export {
    command,
    describe,
    builder,
    handler
}
