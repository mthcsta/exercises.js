const fs = require('fs')
const path = require('path')

const pipe = (value, ...fns) => fns.reduce((result, fn) => fn(result), value) 
const openFile = (path) => fs.readFileSync(path, 'utf8')
const hasCarriageReturn = (episodeRawFile) => (episodeRawFile.match(/\r\n/g).length == episodeRawFile.match(/\n/g).length)

// 'struct' para as palavras e a quantidade de vezes que foi encontrada 
const structOfWord = (word, amount) => ({word, amount}) 

// Dado um número de episodio, retorne a sua legenda em String
const openEpisode = (episodeNumber) => openFile(`./legendas/legendas_${episodeNumber.toString().padStart(2, 0)}.srt`)

// Dado um indice do Array de legenda, retorne as palavras contidas no indice
const getLineSubtitle = (subtitle) => subtitle.trim().split('\n').slice(2).join('\n').replace(/<.*>|[.?,\\"]|\B\W\B/g, '')
// Dado uma String de palavras, retorne um Array de palavra
const getWordsOfLineSubtitle = (lineSubtitle) => lineSubtitle.split(/\r|\n| /).filter((word) => word.length > 0)

// Dado uma legenda em String, retorne um Array de legendas
const subtitleRawToArrayOfSubtitles = (subtitleRaw) => {
    const arrayOfSubtitles = hasCarriageReturn(subtitleRaw) ? subtitleRaw.split('\r\n\r\n') : subtitleRaw.split('\n\n');
    const filteredArrayOfSubtitles = arrayOfSubtitles.filter((line) => !/<font/.test(line));
    return filteredArrayOfSubtitles;
}
// Dado um Array de legendas, retorne um Array de palavras
const arrayOfSubtitlesToArrayOfWords = (arrayOfSubtitles) => {
    return arrayOfSubtitles.reduce(
        (arrayOfWords, subtitle) => arrayOfWords.concat(
            pipe(
                subtitle,
                getLineSubtitle,
                getWordsOfLineSubtitle
            )
        ),
        []
    );
}
//arrayOfSubtitles.reduce((array, subtitle) => array.concat(getWordsOfLineSubtitle(getLineSubtitle(subtitle))), [])
// Dado um Array de legendas, retorne um Array de structOfWord
const makeStructOfWords = (arrayOfSubtitles) => {
    if (arrayOfSubtitles.length == 0) {
        return []
    } else {
        const currentSubtitle = arrayOfSubtitles[0];
        const restArrayOfSubtitles = arrayOfSubtitles.filter((subtitle) => subtitle != currentSubtitle);
        const currentSubtitleLength = arrayOfSubtitles.length - restArrayOfSubtitles.length 
        return [
            structOfWord(currentSubtitle, currentSubtitleLength), 
            ...makeStructOfWords(restArrayOfSubtitles)
        ]
    }
}
// Dado um episodio, concatene suas palavras com as de outros episodios
const episodesMergeWords = (seasonWords, episodeWords, episodeNumber) => {
    const cloneSeasonWords = JSON.parse(JSON.stringify(seasonWords));
    return episodeWords.reduce((arrayOfWords, word) => {
        const currentWord = arrayOfWords.find((current) => current.word == word.word)
        if (typeof currentWord != "undefined") {
            currentWord.amount += word.amount;
            currentWord[`episode_${episodeNumber}`] = word.amount;
            return arrayOfWords
        }
        return arrayOfWords.concat({
            ...word, 
            [`episode_${episodeNumber}`]: word.amount
        });
    }, cloneSeasonWords);
}
// Dado um episodio X e um Y, retorne um Array de palavras dos episodio X a episodio Y. 
const makeSeasonArrayOfWords = (episodeBehind, episodeAhead) => {
    const episodeWords = pipe(
        episodeAhead,
        openEpisode,
        subtitleRawToArrayOfSubtitles,
        arrayOfSubtitlesToArrayOfWords,
        makeStructOfWords
    );
    if (episodeAhead != episodeBehind) {
        return episodesMergeWords([], episodeWords, episodeAhead)
    }
    return episodesMergeWords(
        makeSeasonArrayOfWords(episodeBehind, episodeAhead-1),
        episodeWords,
        episodeAhead
    );
} 

const orderArrayOfWords = (ArrayOfWords) => ArrayOfWords.sort((a, b) => b.amount - a.amount);
const setFileOfWords = (filename, words) => fs.writeFileSync(`${filename}.json`, JSON.stringify(words, null, 2), 'utf8');
const getFileOfWords = (filename) => JSON.parse(openFile(`${filename}.json`));


// test ... 
/* // salvar arquivo:
const result = orderArrayOfWords(makeSeasonArrayOfWords(1, 18));

setFileOfWords('season', result);

console.log(getFileOfWords('season'))

*/

console.log(
    makeSeasonArrayOfWords(1, 3)
)

