// For accessing utils functions.
import * as utils from './utils.js'

// The command related to the CodeSystem generation.
const command = 'codesystem'

// The command's description.
const describe = 'Generate a CodeSystem.'

// The command's options.
const builder = {
    'status': {
        alias: 's',
        describe: 'The status of the code system.',
        type: 'string',
        choices: ['draft', 'active', 'retired', 'unknown'],
        demandOption: true
    },
    'content': {
        alias: 'c',
        describe: 'The extent of the content of the code system.',
        type: 'string',
        choices: ['not-present', 'example', 'fragment', 'complete', 'supplement'],
        demandOption: true
    }
}

// The handler function for the CodeSystem generation.
const handler = async function (argv) {

    // Read a CSV file content as JSON.
    const jsonArray = await utils.readCsv(argv.inputCsvFile);

    // Read the Mustache template.
    const template = await utils.readTemplate(`templates/${argv.release}/CodeSystem.mustache`);

    // Render the Mustache template.
    const filledTemplate = await utils.renderTemplate(template, {
        url: argv.url,
        vers: argv.vers,
        name: argv.name,
        title: argv.title,
        experimental: argv.experimental,
        date: argv.date,
        publisher: argv.publisher,
        description: argv.description,
        status: argv.status,
        content: argv.content,
        concept: JSON.stringify(jsonArray, null, 4)
    });

    // Write the filled template to a JSON file.
    await utils.writeJson(argv.outputJsonFile, filledTemplate);
}

// Export the CodeSystem generation artifacts.
export {
    command,
    describe,
    builder,
    handler
}
