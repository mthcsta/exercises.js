const path = require('path');

const fn = require('./functions');

const pathSubtitles = path.join(__dirname, '..', 'legendas');

const listCharsSymbolic = [
    '-','.',',', '–', '!', ':', '?',
    '"', '♪','_', '\r', '[', 
    ']', '(', ')', '<i>', '</i>'
];

const arrayToJsonString = (jsonContent) => JSON.stringify(jsonContent, null, 2);

fn.readDir(pathSubtitles)
    .then(fn.itemsEndsWith('srt'))
    .then(fn.readFiles)
    .then(fn.arrayToText)
    .then(fn.splitTextBy('\n'))
    .then(fn.removeLineIncludes('-->'))
    .then(fn.removeLineOnlyNumber)
    .then(fn.removeCharsSymbolic(listCharsSymbolic))
    .then(fn.arrayToText)
    .then(fn.splitTextBy(' '))
    .then(fn.removeItemEmpty)
    .then(fn.removeLineOnlyNumber)
    .then(fn.groupWords)
    .then(fn.orderBy('amount', 'desc'))
    .then(arrayToJsonString)
    .then(fn.writeFile('subtitlesContent'))
    .then(console.log)