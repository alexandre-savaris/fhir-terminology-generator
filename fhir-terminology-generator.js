// For clearing the terminal output.
import clear from 'clear';
// For accessing the UI functionalities.
import * as ui from './lib/ui.js';
// For CSV to JSON conversion.
import csv from 'csvtojson';

// Clear the terminal screen.
clear();

// Show the application title.
ui.showTitle();

// Testing the CSV loading.
const jsonArray = await csv().fromFile('tests/fixtures/cbo-grande-grupo.csv');
console.log(jsonArray);
