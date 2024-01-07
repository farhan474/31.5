/** Textual markov chain generator */


class MarkovMachine {

    /** build markov machine; read in text.*/
    constructor(text) {
        let words = text.split(/[ \r\n]+/);
        this.words = words.filter(c => c !== "");
        this.makeChains();
    }

    /** set markov chains:
     *
     *  for text of "the cat in the hat", chains will be
     *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

    makeChains() {
        this.chains = {};
        for (let i = 0; i < this.words.length; i++) {
            let word = this.words[i];
            let nextWord = this.words[i + 1] || null;
            if (!this.chains[word]) {
                this.chains[word] = [];
            }
            this.chains[word].push(nextWord);
        }
    }


    /** return random text from chains */

    makeText(numWords = 100) {
        let text = [];
        let startWord = this.getRandomWord();
        for (let i = 0; i < numWords; i++) {
            text.push(startWord);
            if (startWord === null) {
                startWord = this.getRandomWord();
            } else {
                startWord = this.getRandomNextWord(startWord);
            }
        }
        return text.join(" ");
    }

    getRandomWord() {
        const keys = Object.keys(this.chains);
        return keys[Math.floor(Math.random() * keys.length)];
    }

    getRandomNextWord(word) {
        const nextWords = this.chains[word];
        return nextWords[Math.floor(Math.random() * nextWords.length)];
    }


}
module.exports = MarkovMachine;
