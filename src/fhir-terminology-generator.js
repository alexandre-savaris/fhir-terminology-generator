// For clearing the terminal output.
import clear from 'clear';
// For accessing the UI functionalities.
import * as ui from '../lib/ui.js';
// For parsing command line arguments.
import _yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
let yargs = _yargs(hideBin(process.argv));
// For common definitions regarding CodeSystems e ValueSets.
import * as common from '../lib/common.js';
// For CodeSystem generation.
import * as codesystem from '../lib/CodeSystem.js';
// For ValueSet generation.
import * as valueset from '../lib/ValueSet.js';

// Clear the terminal screen.
clear();

// Show the application title.
ui.showTitle();

// Configure commands.
yargs
    .command(codesystem)
    .command(valueset);

// Configure options unrelated to the structure of CodeSystem or ValueSet resources.
yargs
    .option('input-csv', {
        describe: 'Path + filename of the input CSV',
        type: 'string',
        demandOption: true
    })
    .option('output-json', {
        describe: 'Path + filename for the output JSON',
        type: 'string',
        demandOption: true
    });

// Retrieve options that are common to CodeSystems and ValueSets.
yargs = common.defineCommonOptions(yargs);

// Execute the CLI.
yargs
    .help()
    .argv;
