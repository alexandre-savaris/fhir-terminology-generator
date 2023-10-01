// For accessing utils functions.
import * as utils from './utils.js'
// For common definitions regarding CodeSystems e ValueSets.
import * as common from '../lib/common.js';

// The command related to the CodeSystem generation.
const command = 'codesystem'

// The command's description.
const describe = 'To generate a CodeSystem'

// The command's options.
const builder = {
    'content': {
        alias: 'c',
        describe: 'The extent of the content of the code system',
        type: 'string',
        choices: ['not-present', 'example', 'fragment', 'complete', 'supplement'],
        demandOption: true
    },
    'caseSensitive': {
        alias: 'S',
        describe: 'If code comparison is case sensitive',
        type: 'string',
        choices: ['true', 'false']
    },
    'valueSet': {
        alias: 'l',
        describe: 'Canonical reference to the value set with entire code system',
        type: 'string'
    },
    'hierarchyMeaning': {
        alias: 'h',
        describe: 'The meaning of the hierarchy of concepts',
        type: 'string',
        choices: ['grouped-by', 'is-a', 'part-of', 'classified-with']
    },
    'compositional': {
        alias: 'm',
        describe: 'If code system defines a compositional grammar',
        type: 'string',
        choices: ['true', 'false']
    },
    'versionNeeded': {
        alias: 'N',
        describe: 'If definitions are not stable',
        type: 'string',
        choices: ['true', 'false']
    },
    'supplements': {
        alias: 'U',
        describe: 'Canonical URL of Code System this adds designations and properties to',
        type: 'string'
    },
    'count': {
        alias: 'C',
        describe: 'Total concepts in the code system',
        type: 'number'
    }
}

// The handler function for the CodeSystem generation.
const handler = async function (argv) {

    try {

        // Read a CSV file content as JSON.
        const jsonArray = await utils.readCsv(argv.inputCsv);
        console.log(`Finished reading CSV from ${argv.inputCsv}`);

        // Read the Mustache templates.
        const template = await utils.readTemplate('templates/CodeSystem.mustache');
        const commonTemplate = await utils.readTemplate('templates/common.mustache');
        console.log('Finished reading Mustache templates');

        // Render the Mustache template.
        const filledTemplate = await utils.renderTemplate(template, {
            ...common.composeCommonAttributes(argv),
            caseSensitive: argv.caseSensitive,
            valueSet: argv.valueSet,
            hierarchyMeaning: argv.hierarchyMeaning,
            compositional: argv.compositional,
            versionNeeded: argv.versionNeeded,
            supplements: argv.supplements,
            count: argv.count,
            content: argv.content,
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

// Export the CodeSystem generation artifacts.
export {
    command,
    describe,
    builder,
    handler
}
