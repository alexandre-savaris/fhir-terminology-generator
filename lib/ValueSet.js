// For accessing utils functions.
import * as utils from './utils.js'

// The command related to the ValueSet generation.
const command = 'valueset'

// The command's description.
const describe = 'Generate a ValueSet.'

// The command's options.
const builder = {
    'status': {
        alias: 's',
        describe: 'The status of the value set.',
        type: 'string',
        choices: ['draft', 'active', 'retired', 'unknown'],
        demandOption: true
    }
}

// The handler function for the ValueSet generation.
const handler = async function (argv) {

    /// Read a CSV file content as JSON.
    const jsonArray = await utils.readCsv(argv.inputCsvFile);

    // Read the Mustache template.
    const template = await utils.readTemplate('templates/R5/ValueSet.mustache');

    // Render the Mustache template.
    const filledTemplate = await utils.renderTemplate(template, {
        status: argv.status,
        concept: JSON.stringify(jsonArray, null, 4)
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
