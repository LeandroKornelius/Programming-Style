const fs = require('fs'); // necessario para ler arquivos ja que n tem nativo

// lista global com pares [word, frequency]
let word_freqs = [];

// gera lista de palavras stop
const stop_words_t = fs.readFileSync('stop_words.txt', 'utf-8');
let stop_words = stop_words_t.split(',');
stop_words = stop_words.map(word => word.toLowerCase());
stop_words.push(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']); 

// gera lista de linhas do arquivo
const prideAndPrejudice = fs.readFileSync('pride-and-prejudice.txt', 'utf-8');
const lines = prideAndPrejudice.split('\n');

// itera sobre a lista de linhas
for (let line of lines) {
    const words = line.toLowerCase().match(/[a-z0-9]+/g); // gera palavras

    if (!words) continue; // verifica linhas vazias

    for (let word of words) { // itera sobre palavrass
        if (!stop_words.includes(word)) { // confere se n eh stop word
            let found = false;
            const lowercaseWord = word.toLowerCase();
            for (let pair of word_freqs) {
                if (lowercaseWord === pair[0]) {
                    pair[1] += 1; // caso a palavra exista na contagem adiciona
                    found = true;
                    break;
                }
            }
            if (!found) { // adiciona palavra na lista de contagem caso n exista
                word_freqs.push([lowercaseWord, 1]);
            }
        }
    }
}

word_freqs.sort((a, b) => b[1] - a[1]); // optei por realizar a ord for na func

for (let tf of word_freqs.slice(0, 25)) {
    console.log(tf[0], '-', tf[1]);
}