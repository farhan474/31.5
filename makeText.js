/** Command-line tool to generate Markov text. */

const fs = require('fs').promises;
const axios = require('axios');
const MarkovMachine = require('./MarkovMachine');

async function generateText(inputType, input) {
    try {
        let text;

        if (inputType === 'file') {
            text = await fs.readFile(input, 'utf-8');
        } else if (inputType === 'url') {
            const response = await axios.get(input);
            text = response.data;
        } else {
            throw new Error('Invalid input type. Use "file" or "url".');
        }

        const mm = new MarkovMachine(text);
        const generatedText = mm.makeText();
        console.log(generatedText);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

if (process.argv.length !== 4) {
    console.error('Usage: node makeText.js <inputType> <input>');
    process.exit(1);
}

const inputType = process.argv[2];
const input = process.argv[3];

generateText(inputType, input);
