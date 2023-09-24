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
    .option('status', {
        alias: 's',
        describe: 'The status of the terminology',
        type: 'string',
        choices: ['draft', 'active', 'retired', 'unknown'],
        demandOption: true
    })
    .option('experimental', {
        alias: 'x',
        describe: 'For testing purposes, not real usage',
        type: 'string',
        choices: ['true', 'false'],
        demandOption: false
    })
    .option('date', {
        alias: 'd',
        describe: 'Date last changed (in the format YYYY, YYYY-MM, YYYY-MM-DD or YYYY-MM-DDThh:mm:ss+zz:zz)',
        type: 'string',
        demandOption: false
    })
    .option('publisher', {
        alias: 'p',
        describe: 'Name of the publisher/steward (organization or individual)',
        type: 'string',
        demandOption: false
    })
    .option('description', {
        alias: 'e',
        describe: 'Natural language description of the terminology',
        type: 'string',
        demandOption: false
    })
    .option('purpose', {
        alias: 'w',
        describe: 'Why this terminology is defined',
        type: 'string',
        demandOption: false
    })
    .option('copyright', {
        alias: 'y',
        describe: 'Use and/or publishing restrictions',
        type: 'string',
        demandOption: false
    })
    .option('copyrightLabel', {
        alias: 'L',
        describe: 'Copyright holder and year(s)',
        type: 'string',
        demandOption: false
    })
    .option('approvalDate', {
        alias: 'D',
        describe: 'When the terminology was approved by publisher (in the format YYYY, YYYY-MM, or YYYY-MM-DD)',
        type: 'string',
        demandOption: false
    })
    .option('lastReviewDate', {
        alias: 'R',
        describe: 'When the terminology was last reviewed by the publisher (in the format YYYY, YYYY-MM, or YYYY-MM-DD)',
        type: 'string',
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
