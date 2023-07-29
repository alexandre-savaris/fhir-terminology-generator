// For colorising string output.
import chalk from 'chalk';
// For generating ASCII character art.
import figlet from 'figlet';

// Show the application title.
const showTitle = () => {

    console.log(`${
        chalk.white(
            figlet.textSync('fhir-trmy-gen', {
                horizontalLayout: 'full',
            }
        )
    )}\n`);
}

// Export the UI functions.
export {
    showTitle
}
