// For clearing the terminal output.
import clear from 'clear';
// For accessing the UI functionalities.
import * as ui from '../lib/ui.js';
// For parsing command line arguments.
import _yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
const yargs = _yargs(hideBin(process.argv));
// For CodeSystem generation.
import * as codesystem from '../lib/CodeSystem.js'
// For ValueSet generation.
import * as valueset from '../lib/ValueSet.js'

// Clear the terminal screen.
clear();

// Show the application title.
ui.showTitle();

// Execute the CLI.
yargs
    .command(codesystem)
    .command(valueset)
    .option('release', {
        alias: 'r',
        describe: 'Release of FHIR to be used.',
        type: 'string',
        choices: ['R5'],
        default: 'R5',
        demandOption: true
    })
    .option('url', {
        alias: 'u',
        describe: 'Canonical identifier for this terminology.',
        type: 'string',
        demandOption: false
    })
    .option('vers', {
        alias: 'v',
        describe: 'Business version of the terminology.',
        type: 'string',
        demandOption: false
    })
    .option('name', {
        alias: 'n',
        describe: 'Name for this terminology (computer friendly)',
        type: 'string',
        demandOption: false
    })
    .option('title', {
        alias: 't',
        describe: 'Name for this terminology (human friendly)',
        type: 'string',
        demandOption: false
    })
    .option('experimental', {
        alias: 'x',
        describe: 'For testing purposes, not real usage',
        type: 'string',
        choices: ['true', 'false'],
        demandOption: false
    })
    .option('input-csv-file', {
        alias: 'i',
        describe: 'Path to the input CSV file.',
        type: 'string',
        demandOption: true
    })
    .option('output-json-file', {
        alias: 'o',
        describe: 'Path to the output JSON file.',
        type: 'string',
        demandOption: true
    })
    .help()
    .argv;
