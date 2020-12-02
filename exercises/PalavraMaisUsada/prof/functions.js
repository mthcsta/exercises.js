const fs = require('fs');
const path = require('path');

path.join(__dirname, 'path');

// readDir: String -> PromiseArrayOrError
function readDir(pathFiles) {
    return new Promise((resolve, reject) => {
        try {
            const files = fs.readdirSync(pathFiles);
            const filesWithPath = files.map(file => path.join(pathFiles, file));
            resolve(filesWithPath);
        } catch (e) {
            reject(e);
        }
    });
}
// itemsEndsWith: Array, String -> Array
function itemsEndsWith(value) {
    return function(items) {
        return items.filter(item => item.endsWith(value));
    }
}

// readFile: String -> PromiseArrayOrError
function readFile(pathFile) {
    return new Promise((resolve, reject) => {
        try {
            fileContent = fs.readFileSync(pathFile, 'utf8');
            resolve(fileContent);
        } catch (e) {
            reject(e);
        }
    });
}

// readFiles: Array -> PromiseArray
function readFiles(filesPath) {
    return Promise.all(filesPath.map(filePath => readFile(filePath)));
}

// writeFile: String -> fn(String)
function writeFile(filename) {
    // fn: String -> String 
    return function(text){
        try {
            const fileWithpath = path.join(__dirname, `${filename}.json`);
            fs.writeFileSync(fileWithpath, text, 'utf8');
            return text;
        } catch (e) {
            return e;
        }    
    }
}

// removeItemEmpty: Array -> ArrayFiltered
function removeItemEmpty(array) {
    return array.filter(item => item.trim());
}

// removeLineIncludes: String -> Function
function removeLineIncludes(value) {
    // Function: Array -> ArrayFiltered
    return function(array) {
        return array.filter(item => !item.includes(value));
    }
}

// removeLineOnlyNumber: Array -> ArrayFiltered
function removeLineOnlyNumber(array) {
    return array.filter(item => isNaN(item));
}

// removeCharsSymbolic: symbols -> Function
function removeCharsSymbolic(symbols) {
    const reduceItemSymbols = Array.prototype.reduce.bind(symbols);
    const iterate = (item) => reduceItemSymbols((text, symbol) => text.split(symbol).join(''), item);
    // Function: Array -> ArrayMapped 
    return function(array) {
        return array.map(item => iterate(item));
    }
}

// arrayToText: Array -> String
function arrayToText(array) {
    return array.join(' ');
}

// splitTextBy: Char -> Function
function splitTextBy(symbol) {
    // Function: String -> ArrayOfSplit 
    return function(text) {
        return text.split(symbol);
    }
}

// groupWords: ArrayOfString -> ArrayOfObjects
function groupWords(wordsArray){
    return Object.values(wordsArray.reduce((group, word) => {
        const w = word.toLowerCase();
        if(group[w]) {
            group[w].amount++;
        } else {
            group[w] = { word: w, amount: 1 };
        }
        return group;
    }, {}));
}

// orderBy: StringObjectAttribute StringOrderKey -> Function
function orderBy(attr, order = 'asc') {
    const orders = new Map([
        ['asc', (o1, o2) => o1[attr] - o2[attr]], 
        ['desc', (o1, o2) => o2[attr] - o1[attr]]
    ]);
    const orderSelected = orders.get(order) || orders.get('asc');
    // Function: Array -> ArrayOrderly
    return function(array) {
        return array.sort((orderSelected));
    }
}


module.exports = {
    readDir,
    itemsEndsWith,
    readFiles,
    removeItemEmpty,
    removeLineIncludes,
    removeLineOnlyNumber,
    removeCharsSymbolic,
    arrayToText,
    splitTextBy,
    groupWords,
    orderBy,
    writeFile,
    
};