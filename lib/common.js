// Define common options for CodeSystem and ValueSet resources.
const defineCommonOptions = (yargs) => {

    return yargs
        .option('url', {
            alias: 'u',
            describe: 'Canonical identifier for this terminology',
            type: 'string'
        })
        .option('vers', {
            alias: 'v',
            describe: 'Business version of the terminology',
            type: 'string'
        })
        .option('name', {
            alias: 'n',
            describe: 'Name for this terminology (computer friendly)',
            type: 'string'
        })
        .option('title', {
            alias: 't',
            describe: 'Name for this terminology (human friendly)',
            type: 'string'
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
            choices: ['true', 'false']
        })
        .option('date', {
            alias: 'd',
            describe: 'Date last changed (in the format YYYY, YYYY-MM, YYYY-MM-DD or YYYY-MM-DDThh:mm:ss+zz:zz)',
            type: 'string'
        })
        .option('publisher', {
            alias: 'p',
            describe: 'Name of the publisher/steward (organization or individual)',
            type: 'string'
        })
        .option('description', {
            alias: 'e',
            describe: 'Natural language description of the terminology',
            type: 'string'
        })
        .option('purpose', {
            alias: 'w',
            describe: 'Why this terminology is defined',
            type: 'string'
        })
        .option('copyright', {
            alias: 'y',
            describe: 'Use and/or publishing restrictions',
            type: 'string'
        })
        .option('copyrightLabel', {
            alias: 'L',
            describe: 'Copyright holder and year(s)',
            type: 'string'
        })
        .option('approvalDate', {
            alias: 'D',
            describe: 'When the terminology was approved by publisher (in the format YYYY, YYYY-MM, or YYYY-MM-DD)',
            type: 'string'
        })
        .option('lastReviewDate', {
            alias: 'R',
            describe: 'When the terminology was last reviewed by the publisher (in the format YYYY, YYYY-MM, or YYYY-MM-DD)',
            type: 'string'
        });
}

// Compose an object with common attributes and values for CodeSystem and ValueSet resources.
// The composed object is goig to be complemented and used for template rendering.
const composeCommonAttributes = (argv) => {

    return {
        url: argv.url,
        vers: argv.vers,
        name: argv.name,
        title: argv.title,
        status: argv.status,
        experimental: argv.experimental,
        date: argv.date,
        publisher: argv.publisher,
        description: argv.description,
        purpose: argv.purpose,
        copyright: argv.copyright,
        copyrightLabel: argv.copyrightLabel,
        approvalDate: argv.approvalDate,
        lastReviewDate: argv.lastReviewDate
    }
}

// Export the common functions.
export {
    defineCommonOptions,
    composeCommonAttributes
}
