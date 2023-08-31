// For CSV to JSON conversion.
import csv from 'csvtojson';
// For reading/writing content from/to the filesystem.
import * as fs from 'fs/promises';
// For rendering templates.
import Mustache from 'mustache';

const command = 'codesystem'

const describe = 'Generate a CodeSystem.'

const builder = {
    'status': {
        describe: 'The status of the code system.',
        type: 'string',
        choices: ['draft', 'active', 'retired', 'unknown'],
        demandOption: true
    },
    'content': {
        describe: 'The extent of the content of the code system.',
        type: 'string',
        choices: ['not-present', 'example', 'fragment', 'complete', 'supplement'],
        demandOption: true
    }
}

const handler = async function (argv) {

    // Load the CSV as JSON.
    const jsonArray = await csv().fromFile('tests/fixtures/cbo-grande-grupo.csv');

    // Load the Mustache template
    const template = await fs.readFile('templates/R5/CodeSystem.mustache', { encoding: 'utf8' });

    // Render the template.
    const filledTemplate = Mustache.render(template, {
        status: argv.status,
        content: argv.content,
        concept: JSON.stringify(jsonArray, null, 4)
    });
    console.log(filledTemplate);
}

export {
    command,
    describe,
    builder,
    handler
}
