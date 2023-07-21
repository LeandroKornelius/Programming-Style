const fs = require('fs'); // needed since js doesnt have native file reader 

// lista global com pares [palavra, freq]
let word_freqs = [];

const stop_words_t = fs.readFileSync('stop_words.txt', 'utf-8').split(',');
const stop_words = stop_words_t.map(word => {
    return word.toLowerCase();
});

// console.log(stop_words);

const prideAndPrejudice = fs.readFileSync('pride-and-prejudice.txt', 'utf-8').split('\n');

// console.log(prideAndPrejudice);

for (let line of prideAndPrejudice) {
    let start_char = null;
    let i = 0;
    for (let c of line) {

        if (start_char === null) {
            if (c.match(/[A-Za-z0-9]/)) {
                start_char = i;
            }

        } else {
            if (!(c.match(/[A-Za-z0-9]/))) {
                let found = false;
                let word = line.slice(start_char, i).toLowerCase(); 

                if (!(stop_words.includes(word))) {
                    let pair_index = 0;
                    for (let pair of word_freqs) {
                        if (word === pair[0]) {
                            pair[1] += 1;
                            found = true;
                            break;
                        }
                        pair_index += 1;
                    };
                    if (!found) {
                        word_freqs.push([word, 1]);
                    } else if (word_freqs.length > 1) {
                        for (let n = pair_index - 1; n >= 0; n--) {
                            if (word_freqs[pair_index][1] > word_freqs[n][1]) {
                                [word_freqs[n], word_freqs[pair_index]] = [word_freqs[pair_index], word_freqs[n]];
                                pair_index = n;
                            }
                        }
                    }
                }
                start_char = null;
            }

        }
        i += 1;
    };
};

for (let tf of word_freqs.slice(0, 25)) {
    console.log(tf[0], '-', tf[1]);
}