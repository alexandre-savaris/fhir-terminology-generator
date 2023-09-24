// For accessing utils functions.
import * as utils from './utils.js'

// The command related to the ValueSet generation.
const command = 'valueset'

// The command's description.
const describe = 'Generate a ValueSet.'

// The command's options.
const builder = {
    'immutable': {
        alias: 'm',
        describe: 'Indicates whether or not any change to the content logical definition may occur',
        type: 'string',
        choices: ['true', 'false'],
        demandOption: false
    }
}

// The handler function for the ValueSet generation.
const handler = async function (argv) {

    console.log(argv)

    /// Read a CSV file content as JSON.
    const jsonArray = await utils.readCsv(argv.inputCsvFile);

    // Read the Mustache template.
    const template = await utils.readTemplate(`templates/${argv.release}/ValueSet.mustache`);

    // Render the Mustache template.
    const filledTemplate = await utils.renderTemplate(template, {
        url: argv.url,
        vers: argv.vers,
        name: argv.name,
        title: argv.title,
        status: argv.status,
        experimental: argv.experimental,
        date: argv.date,
        publisher: argv.publisher,
        description: argv.description,
        immutable: argv.immutable,
        purpose: argv.purpose,
        copyright: argv.copyright,
        copyrightLabel: argv.copyrightLabel,
        approvalDate: argv.approvalDate,
        lastReviewDate: argv.lastReviewDate,
        valuesetComposeIncludeSystem: utils.extractFileName(argv.inputCsvFile),
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
