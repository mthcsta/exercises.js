
current = new Date();
beginDate = Date.UTC(current.getFullYear(), 0, 1);
nextDate = Date.UTC(current.getFullYear() + 1, 0, 1);
oneYear = nextDate - beginDate;

function getDate(){
    current = Date.now() - beginDate;
    rest = nextDate - Date.now();
    rest = Math.floor(rest / 1000) // convert para INT, tirando os microsegundos
    percent = current / oneYear * 100;
    return {rest, percent};
}

console.log(getDate())
