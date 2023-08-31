// For CSV to JSON conversion.
import csv from 'csvtojson';
// For reading/writing content from/to the filesystem.
import * as fs from 'fs/promises';
// For rendering templates.
import Mustache from 'mustache';

const command = 'valueset'

const describe = 'Generate a ValueSet.'

const builder = {
    'status': {
        describe: 'The status of the value set.',
        type: 'string',
        choices: ['draft', 'active', 'retired', 'unknown'],
        demandOption: true
    }
}

const handler = async function (argv) {

    // Load the CSV as JSON.
    const jsonArray = await csv().fromFile('tests/fixtures/cbo-grande-grupo.csv');

    // Load the Mustache template
    const template = await fs.readFile('templates/R5/ValueSet.mustache', { encoding: 'utf8' });

    // Render the template.
    const filledTemplate = Mustache.render(template, {
        status: argv.status,
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
