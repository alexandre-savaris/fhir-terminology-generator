// For clearing the terminal output.
import clear from 'clear';
// For accessing the UI functionalities.
import * as ui from './lib/ui.js';
// For parsing command line arguments.
import _yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
const yargs = _yargs(hideBin(process.argv));
// For CSV to JSON conversion.
import csv from 'csvtojson';
// For reading/writing content from/to the filesystem.
import * as fs from 'fs/promises';
// For rendering templates.
import Mustache from 'mustache';

// Clear the terminal screen.
clear();

// Show the application title.
ui.showTitle();

// ???
const options = yargs
    .usage("Usage: --status <status>")
    .option("status", {
        describe: "The status of the code system",
        type: "string",
        choices: ['draft', 'active', 'retired', 'unknown'],
        demandOption: true
    })
    .option("content", {
        describe: "The extent of the content of the code system",
        type: "string",
        choices: ['not-present', 'example', 'fragment', 'complete', 'supplement'],
        demandOption: true
    })
    .argv;



/*
// Load the CSV as JSON.
const jsonArray = await csv().fromFile('tests/fixtures/cbo-grande-grupo.csv');
//console.log(jsonArray);

// Load the Mustache template
const template = await fs.readFile('templates/R5/CodeSystem.mustache', { encoding: 'utf8' });

// Render the template.
const filledTemplate = Mustache.render(template, {
    status: 'active',
    content: 'complete',
    concept: JSON.stringify(jsonArray, null, 4)
});
console.log(filledTemplate);
*/
