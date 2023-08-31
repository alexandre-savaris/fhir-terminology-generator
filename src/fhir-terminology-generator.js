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

// ???
yargs
    .command(codesystem)
    .command(valueset)
    .help()
    .argv;




// ???
// const args = yargs
//     .usage("Usage: [command] <options>")
//     .command('codesystem', 'Generate a CodeSystem', (y) => {
//         return y
//             .option("status", {
//                 describe: "The status of the code system",
//                 type: "string",
//                 choices: ['draft', 'active', 'retired', 'unknown'],
//                 demandOption: true
//             })
//             .option("content", {
//                 describe: "The extent of the content of the code system",
//                 type: "string",
//                 choices: ['not-present', 'example', 'fragment', 'complete', 'supplement'],
//                 demandOption: true
//             });
//         }, async (y) => {

//             // Load the CSV as JSON.
//             const jsonArray = await csv().fromFile('tests/fixtures/cbo-grande-grupo.csv');

//             // Load the Mustache template
//             const template = await fs.readFile('templates/R5/CodeSystem.mustache', { encoding: 'utf8' });

//             // Render the template.
//             const filledTemplate = Mustache.render(template, {
//                 status: y.status,
//                 content: y.content,
//                 concept: JSON.stringify(jsonArray, null, 4)
//             });
//             console.log(filledTemplate);

//         })
//         .help()
//         .argv;
