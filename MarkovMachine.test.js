
const MarkovMachine = require('./MarkovMachine');

describe('MarkovMachine', () => {
    it('should initialize correctly', () => {
        const text = 'This is a test text';
        const mm = new MarkovMachine(text);
        expect(mm.words).toEqual(['This', 'is', 'a', 'test', 'text']);
    });

    it('should generate random text', () => {
        const text = 'This is a test text';
        const mm = new MarkovMachine(text);
        const generatedText = mm.makeText(5);
        expect(generatedText.split(' ')).toHaveLength(5);
    });

    it('should handle empty input', () => {
        const text = '';
        const mm = new MarkovMachine(text);
        expect(mm.words).toEqual([]);
    });
});
